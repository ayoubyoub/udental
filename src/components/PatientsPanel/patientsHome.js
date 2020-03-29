// Addons
import {isEmpty, trim, filter, find, map, values, orderBy, now, debounce, escapeRegExp} from "lodash";
import {withNamespaces} from "react-i18next";
import {ToastContainer} from "react-toastify";
import {notifyAdd, notifyEdit, notifyDelete} from "../../services/notify";
// React
import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
// Actions
import {eventPatient, deletePatient} from "../../actions/patientsAction";
// Semantic
import {
  Header,
  Button,
  Image,
  Statistic,
  Dimmer,
  Loader,
  Modal,
  Form,
  Search,
  Dropdown,
  Icon,
  Input,
  Popup,
  Message
} from "semantic-ui-react";
import {DateInput} from "semantic-ui-calendar-react";
// Images
import people from "../../images/people.png";
// Begin
class patientsHome extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: "",
      cin: "",
      civility: "",
      nom: "",
      prenom: "",
      sexe: "",
      datenaissance: "",
      telport: "",
      action: "",
      search: "",
      active: true,
      isLoading: false,
      modal: false,
      results: [],
      errors: [],
      lstPatients: [],
      optSexe: [],
      optCivility: [],
      by: this.props.currentUser.displayName
    };
  }

  componentDidMount () {
    const {patients, settings} = this.props;
    // Sexe load...
    this.handleSettings(settings.sexe, "sexe");
    // Civility load...
    this.handleSettings(settings.civility, "civility");
    // Patients load...
    this.handleListePatients(patients);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.patients !== this.props.patients) {
      this.handleListePatients(nextProps.patients);
    }
    if (nextProps.settings.sexe !== this.props.settings.sexe || nextProps.params !== this.props.params) {
      this.handleSettings(nextProps.settings.sexe, "sexe");
    }
    if (nextProps.settings.civility !== this.props.settings.civility || nextProps.params !== this.props.params) {
      this.handleSettings(nextProps.settings.civility, "civility");
    }
  }

  handleSettings (settings, from) {
    const {t} = this.props;
    const active = filter(settings, "active");
    const select = t("select");
    let option = [];
    map(orderBy(active, ["id"], ["asc"]), (val) => {
      let id = val.id;
      let label = val.label;
      if (id === 0) {
        option.push({
          key: id,
          text: `--- ${select} ---`,
          value: ""
        });
      } else {
        option.push({
          key: id,
          text: label,
          value: label
        });
      }
    });
    if (from === "sexe") {
      this.setState({optSexe: option});
    }

    if (from === "civility") {
      this.setState({optCivility: option});
    }
  }

  handleListePatients = (patients) => {
    this.setState({
      lstPatients: patients,
      active: false
    });
  };

  resetComponent = () => {
    this.setState({
      isLoading: false,
      results: [],
      search: ""
    });
  };

  handleSearchChange = (event, {value}) => {
    const timeOut = 300;
    const {lstPatients} = this.state;
    this.setState({
      isLoading: true,
      search: value
    });
    setTimeout(() => {
      if (this.state.search.length < 1) {
        return this.resetComponent();
      }
      const source = map(lstPatients, (patient) => ({
        id: patient.id,
        title: `${patient.prenom} ${patient.nom}`,
        price: patient.cin,
        description: patient.datenaissance,
        nom: patient.nom,
        prenom: patient.prenom,
        cin: patient.cin,
        sexe: patient.sexe,
        civility: patient.civility,
        telport: patient.telport,
        datenaissance: patient.datenaissance
      }));
      const res = new RegExp(escapeRegExp(this.state.search), "i");
      const isMatch = (result) => res.test(result.title);
      this.setState({
        isLoading: false,
        results: filter(source, isMatch)
      });
    }, timeOut);
  };

  handleResultSelect = (event, {result}) => {
    this.setState({
      id: result.id,
      cin: result.cin,
      civility: result.civility,
      nom: result.nom,
      prenom: result.prenom,
      sexe: result.sexe,
      telport: result.telport,
      datenaissance: result.datenaissance,
      search: result.title
    });
  };

  handleEventPatient = () => {
    const {
      id,
      cin,
      civility,
      nom,
      prenom,
      sexe,
      datenaissance,
      telport,
      by,
      action
    } = this.state;
    let key = "";
    let on = now();
    let patient = null;
    if (action === "add") {
      key = on;
      patient = {
        id: key,
        cin,
        civility,
        nom,
        prenom,
        sexe,
        datenaissance,
        telport,
        created: {
          by,
          on
        }
      };
      this.props.eventPatient(key, patient);
      notifyAdd("🚀 L'insertion a été effectué.", "top-right");
    }
    if (action === "edit") {
      key = id;
      patient = {
        id: key,
        cin,
        civility,
        nom,
        prenom,
        sexe,
        datenaissance,
        telport,
        edited: {
          by,
          on
        }
      };
      this.props.eventPatient(key, patient);
      notifyEdit("🚀 La modification a été effectué.", "top-right");
    }
    if (action === "remove") {
      key = id;
      this.props.deletePatient(key);
      notifyDelete("🚀 La suppression a été effectué.", "top-right");
    }

    this.setState({
      id: "",
      cin: "",
      civility: "",
      nom: "",
      prenom: "",
      sexe: "",
      datenaissance: "",
      telport: "",
      search: "",
      action: "",
      errors: [],
      modal: false,
      active: false
    });
  };

  handleErrors = (nom, prenom) => {
    let err = [];
    if (isEmpty(trim(nom))) {
      err.push({
        nom: true,
        message: "Le champ nom est oblégatoire!"
      });
    }
    if (isEmpty(trim(prenom))) {
      err.push({
        prenom: true,
        message: "Le champ prenom est oblégatoire!"
      });
    }
    return err;
  }

  displayErrors = (errors) => errors.map((error, ind) => <Message.Item key={ind}>{error.message}</Message.Item>);

  handleSubmit = (event) => {
    event.preventDefault();
    const {nom, prenom} = this.state;
    let err = this.handleErrors(nom, prenom);
    if (err.length === 0) {
      this.handleEventPatient();
    } else {
      this.setState({errors: err});
    }
  };

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({[name]: value});
    }
  };

  handleModelAdd = () => {
    this.setState({
      modal: true,
      active: true,
      action: "add"
    });
  };

  handleModelEdit = () => {
    this.setState({
      modal: true,
      active: true,
      action: "edit"
    });
  };

  handleModelRemove = () => {
    this.setState({
      modal: true,
      active: true,
      action: "remove"
    });
  };

  handleClose = () => {
    this.setState({
      id: "",
      cin: "",
      civility: "",
      nom: "",
      prenom: "",
      sexe: "",
      datenaissance: "",
      telport: "",
      search: "",
      action: "",
      errors: [],
      results: [],
      isLoading: false,
      modal: false,
      active: false
    });
  };

  handleListPatinets = () => {
    this.props.history.push("/patients");
  };

  render () {
    const {
      cin,
      nom,
      civility,
      prenom,
      sexe,
      datenaissance,
      telport,
      modal,
      active,
      search,
      isLoading,
      results,
      errors,
      action,
      optSexe,
      optCivility,
      lstPatients
    } = this.state;
    const timeOut = 500;
    return (
      <div>
        <ToastContainer />
        <Dimmer
          active={active}
          inverted
        >
          <Loader
            inverted
            size="huge"
          > Loading... </Loader>
        </Dimmer>
        <Header as="h2">
          <Image
            circular
            size="tiny"
            src={people}
          />
          <Statistic color="grey">
            <Statistic.Value>{values(lstPatients).length}</Statistic.Value>
            <Statistic.Label>Patients</Statistic.Label>
          </Statistic>
        </Header>
        <Popup
          content="Add"
          inverted
          trigger={<Button
            circular
            color="blue"
            icon="add"
            onClick={this.handleModelAdd}
          />}
        />
        <Popup
          content="Edit"
          inverted
          trigger={<Button
            circular
            color="green"
            icon="edit"
            onClick={this.handleModelEdit}
          />}
        />
        <Popup
          content="Remove"
          inverted
          trigger={<Button
            circular
            color="red"
            icon="remove"
            onClick={this.handleModelRemove}
          />}
        />
        <Popup
          content="Liste des patients"
          inverted
          trigger={<Button
            circular
            color="pink"
            icon="list layout"
            onClick={this.handleListPatinets}
          />}
        />
        <Modal
          basic
          onClose={this.handleClose}
          open={modal}
        >
          <Modal.Header>Accès rapide</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              {action !== "add" && (
                <Form.Field>
                  <Search
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={debounce(this.handleSearchChange, timeOut, {leading: true})}
                    placeholder="Search"
                    results={results}
                    value={search}
                  />
                </Form.Field>
              )}
              {action !== "remove" && (
                <div>
                  <Form.Field>
                    <Dropdown
                      fluid
                      name="sexe"
                      onChange={this.handleChange}
                      options={optSexe}
                      placeholder="Gender"
                      selection
                      value={sexe}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Dropdown
                      fluid
                      name="civility"
                      onChange={this.handleChange}
                      options={optCivility}
                      placeholder="Civility"
                      selection
                      value={civility}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Input
                      autoComplete="off"
                      fluid
                      label="CIN"
                      name="cin"
                      onChange={this.handleChange}
                      value={cin}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Input
                      autoComplete="off"
                      fluid
                      icon={find(errors, "nom") ? <Icon
                        color="red"
                        name="exclamation circle"
                      /> : <Icon
                        color="grey"
                        name="exclamation circle"
                      />}
                      label="Nom de patient"
                      name="nom"
                      onChange={this.handleChange}
                      value={nom}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Input
                      autoComplete="off"
                      fluid
                      icon={find(errors, "prenom") ? <Icon
                        color="red"
                        name="exclamation circle"
                      /> : <Icon
                        color="grey"
                        name="exclamation circle"
                      />}
                      label="Prénom de patient"
                      name="prenom"
                      onChange={this.handleChange}
                      value={prenom}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Input
                      autoComplete="off"
                      fluid
                      label="Numéro de téléphone"
                      name="telport"
                      onChange={this.handleChange}
                      value={telport}
                    />
                  </Form.Field>
                  <Form.Field>
                    <DateInput
                      autoComplete="off"
                      closable
                      dateFormat="DD/MM/YYYY"
                      iconPosition="left"
                      name="datenaissance"
                      onChange={this.handleChange}
                      placeholder="Date de naissance"
                      startMode="year"
                      value={datenaissance}
                    />
                  </Form.Field>
                </div>
              )}
            </Form>
            {errors.length > 0 && (
              <Message warning>
                <Message.List>
                  {this.displayErrors(errors)}
                </Message.List>
              </Message>
            )}
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="green"
              inverted
              onClick={this.handleSubmit}
            >
              <Icon name="checkmark" />
              {action === "add" && "Add"}
              {action === "edit" && "Edit"}
              {action === "remove" && "Remove"}
            </Button>
            <Button
              color="red"
              inverted
              onClick={this.handleClose}
            >
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  patients: state.patients,
  settings: state.settings,
  params: state.params
});
patientsHome.propTypes = {
  currentUser: PropTypes.object.isRequired,
  patients: PropTypes.object,
  settings: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  history: PropTypes.object,
  t: PropTypes.func.isRequired,
  eventPatient: PropTypes.func.isRequired,
  deletePatient: PropTypes.func.isRequired
};
export default withRouter(connect(mapStateToProps, {
  eventPatient,
  deletePatient
})(withNamespaces()(patientsHome)));
