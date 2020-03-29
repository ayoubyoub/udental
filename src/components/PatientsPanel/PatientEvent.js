/* eslint-disable react/no-unused-state */
// Addons
import {isEmpty, trim, now, map, has, filter, keys, toString, assign} from "lodash";
import {withNamespaces} from "react-i18next";
import {ToastContainer} from "react-toastify";
import {notifyAdd, notifyEdit} from "../../services/notify";
// React
import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
// Import
import HeaderPatients from "./Common/HeaderPatients";
import BreadPatients from "./Common/BreadPatients";
import FormPatients from "./Common/FormPatients";
import ModalPatients from "./Common/ModalPatients";
// Semantic
import {Segment, Message} from "semantic-ui-react";
// Actions
import {eventPatient, uploadImage} from "../../actions/patientsAction";
// Begin
class PatientEvent extends Component {
  constructor (props) {
    super(props);
    this.state = {
      page: "Ajouter un patient",
      id: this.props.match.params.id,
      image: "",
      cin: "",
      civility: "",
      nom: "",
      prenom: "",
      conjoint: "",
      conjointRelation: "",
      charges: [],
      chargesRelation: [],
      sexe: "",
      datenaissance: "",
      email: "",
      telport: "",
      telprof: "",
      telfixe: "",
      situation: "",
      nbrenf: "",
      profession: "",
      job: "",
      assurance: "",
      adresse: "",
      ville: "",
      remarque: "",
      modal: false,
      active: false,
      errors: [],
      optCivility: [],
      optSexe: [],
      optSituations: [],
      optJobs: [],
      optAssurances: [],
      optVilles: [],
      optRelations: [],
      patients: [],
      by: this.props.currentUser.displayName
    };
  }

  componentDidMount () {
    const {patients, settings} = this.props;
    const {id} = this.state;
    // Load patient for editing
    if (!isEmpty(id)) {
      this.handleLoadInfoPatient(patients, id);
    }
    // Settings load...
    this.handleSettings(settings);
    // Patients load...
    this.handleListePatients(patients);
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const {id} = this.state;
    if (nextProps.patients !== this.props.patients) {
      if (!isEmpty(id)) {
        this.handleLoadInfoPatient(nextProps.patients, id);
      }
      this.handleListePatients(nextProps.patients);
    }
    if (nextProps.settings !== this.props.settings || nextProps.params !== this.props.params) {
      this.handleSettings(nextProps.settings);
    }
  }

  handleLoadInfoPatient = (patients, id) => {
    if (has(patients, id)) {
      this.setState({
        page: "Modifier un patient",
        cin: patients[id].cin || "",
        image: patients[id].image || "",
        civility: patients[id].civility || "",
        nom: patients[id].nom || "",
        prenom: patients[id].prenom || "",
        conjoint: patients[id].conjoint || "",
        conjointRelation: patients[id].conjointRelation || "",
        charges: patients[id].charges || [],
        chargesRelation: patients[id].chargesRelation || [],
        sexe: patients[id].sexe || "",
        datenaissance: patients[id].datenaissance || "",
        email: patients[id].email || "",
        telport: patients[id].telport || "",
        telprof: patients[id].telprof || "",
        telfixe: patients[id].telfixe || "",
        situation: patients[id].situation || "",
        nbrenf: patients[id].nbrenf || "",
        profession: patients[id].profession || "",
        job: patients[id].job || "",
        assurance: patients[id].assurance || "",
        adresse: patients[id].adresse || "",
        ville: patients[id].ville || "",
        remarque: patients[id].remarque || ""
      });
    } else {
      this.props.history.push("/404");
    }
  };

  handleListePatients = (patients) => {
    const {t} = this.props;
    const loadedPatients = [];
    const select = t("select");
    loadedPatients.push({
      key: "0",
      text: `--- ${select} ---`,
      value: ""
    });
    map(patients, (val) => {
      loadedPatients.push({
        key: val.id,
        text: `${val.prenom} ${val.nom}`,
        value: val.id
      });
    });
    this.setState({patients: loadedPatients});
  };

  handleSettings = (settings) => {
    map(keys(settings), (val) => {
      let option = [];
      const active = filter(settings[val], "active");
      map(active, (setting) => {
        const label = setting.label;
        option.push({
          key: setting.id,
          text: !isEmpty(label) ? label : `--- ${this.props.t("select")} ---`,
          value: label
        });
      });
      switch (val) {
      case "sexe":
        this.setState({optSexe: option});
        break;
      case "civility":
        this.setState({optCivility: option});
        break;
      case "situations":
        this.setState({optSituations: option});
        break;
      case "jobs":
        this.setState({optJobs: option});
        break;
      case "assurances":
        this.setState({optAssurances: option});
        break;
      case "villes":
        this.setState({optVilles: option});
        break;
      case "relations":
        this.setState({optRelations: option});
        break;
      default:
        break;
      }
    });
  }

  handleToHome = () => {
    this.props.history.push("/");
  };

  handleToPatients = () => {
    this.props.history.push("/patients");
  };

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({[name]: value});
    }
  };

  handleImageProps = (blob) => {
    this.setState({
      image: blob,
      modal: false,
      blob
    });
  }

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

  handleDisplayErrors = (errors) => errors.map((error, ind) => <Message.Item key={ind}>{error.message}</Message.Item>);

  handleSubmit = (evt) => {
    evt.preventDefault();
    const metadata = {contentType: "image/jpeg"};
    this.setState({active: true});
    let on = now();
    let key = "";
    let event = "";
    let patient = {};
    let created = {};
    let edited = {};
    const {
      id,
      image,
      cin,
      civility,
      nom,
      prenom,
      conjoint,
      conjointRelation,
      charges,
      chargesRelation,
      sexe,
      datenaissance,
      email,
      telport,
      telprof,
      telfixe,
      situation,
      nbrenf,
      profession,
      job,
      assurance,
      adresse,
      ville,
      remarque,
      by
    } = this.state;
    // Handle Errors...
    let err = this.handleErrors(nom, prenom);
    if (err.length === 0) {
      patient = {
        cin,
        civility,
        nom,
        prenom,
        conjoint,
        conjointRelation,
        charges,
        chargesRelation,
        sexe,
        datenaissance,
        email,
        telport,
        telprof,
        telfixe,
        situation,
        nbrenf,
        profession,
        job,
        assurance,
        adresse,
        ville,
        remarque
      };

      if (isEmpty(id)) {
        key = on;
        created = {
          by,
          on
        };
        event = "add";
        assign(patient, {created}, {id: key});
      } else {
        key = id;
        edited = {
          by,
          on
        };
        event = "edit";
        assign(patient, {edited}, {id: key});
      }
      if (!isEmpty(conjoint)) {
        this.props.eventPatient(conjoint, {
          conjoint: key,
          conjointRelation
        });
      }
      this.props.eventPatient(key, patient).then(() => {
        if (image instanceof Blob) {
          this.props.uploadImage(toString(key), image, metadata).then((snap) => {
            snap.ref.getDownloadURL().then((downloadURL) => {
              this.props.eventPatient(key, {image: downloadURL});
            });
          });
        }
        if (event === "add") {
          notifyAdd("🚀 L'insertion a été effectué.", "bottom-center");
          this.clearAll();
        } else {
          notifyEdit("🚀 La modification a été effectué.", "bottom-center");
          this.setState({errors: []});
        }
      });
    } else {
      this.setState({errors: err});
    }
    this.setState({active: false});
  };

  clearAll = () => {
    this.setState({
      id: "",
      image: "",
      cin: "",
      civility: "",
      nom: "",
      prenom: "",
      conjoint: "",
      conjointRelation: "",
      charges: [],
      chargesRelation: [],
      sexe: "",
      datenaissance: "",
      email: "",
      telport: "",
      telprof: "",
      telfixe: "",
      situation: "",
      nbrenf: "",
      profession: "",
      job: "",
      assurance: "",
      adresse: "",
      ville: "",
      remarque: "",
      modal: false,
      errors: []
    });
    this.child.clearAll();
  };

  handleOpenModal = () => {
    this.setState({modal: true});
  };

  handleCloseModal = () => {
    this.setState({modal: false});
  };

  render () {
    const {
      page,
      active,
      modal,
      image
    } = this.state;
    return (
      <div>
        {!modal && (<ToastContainer />)}
        <HeaderPatients
          active={active}
          page={page}
        />
        {/* Breadcrum Patients */}
        <BreadPatients
          onHandleToHome={this.handleToHome}
          onHandleToPatients={this.handleToPatients}
          page={page}
        />
        <Segment>
          {/* Modal images Patients */}
          <ModalPatients
            image={image}
            modal={modal}
            onHandleCloseModal={this.handleCloseModal}
            onHandleImageProps={this.handleImageProps}
            onHandleOpenModal={this.handleOpenModal}
            ref={(instance) => {
              this.child = instance;
            }}
          />
          {/** Form events Patients */}
          <FormPatients
            onHandleChange={this.handleChange}
            onHandleDisplayErrors={this.handleDisplayErrors}
            onHandleSubmit={this.handleSubmit}
            onHandleToPatients={this.handleToPatients}
            state={this.state}
          />
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  patients: state.patients,
  settings: state.settings,
  params: state.params
});
PatientEvent.propTypes = {
  currentUser: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  eventPatient: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  history: PropTypes.object,
  patients: PropTypes.object,
  settings: PropTypes.object,
  match: PropTypes.object,
  t: PropTypes.func.isRequired
};
export default withRouter(connect(mapStateToProps, {
  eventPatient,
  uploadImage
})(withNamespaces()(PatientEvent)));
