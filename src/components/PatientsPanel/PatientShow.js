// Addons
import {isEmpty, has, map, values} from "lodash";
import {ToastContainer} from "react-toastify";
import {notifyError} from "../../services/notify";
// React
import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
// Semantic
import {
  Header,
  Breadcrumb,
  Segment,
  Form,
  Icon,
  Button,
  Image,
  Container,
  Dimmer,
  Loader,
  List
} from "semantic-ui-react";
// Images
import defaultImg from "../../images/default.png";
// Begin
class PatientShow extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      image: "",
      cin: "",
      civility: "",
      nom: "",
      prenom: "",
      conjoint: null,
      charges: null,
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
      optConjoint: [],
      optCharges: [],
      active: false
    };
  }

  componentDidMount () {
    const {patients} = this.props;
    const {id} = this.state;
    this.handleLoadInfoPatient(patients, id);
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const {id} = this.state;
    if (nextProps.patients !== this.props.patients) {
      this.handleLoadInfoPatient(nextProps.patients, id);
    }
  }

  getInfoRelations = (ids) => {
    let relation = [];
    const {patients} = this.props;
    map(values(ids), (id) => {
      let idRel = patients[id].conjoint;
      let prenomNom = `${patients[idRel].prenom} ${patients[idRel].nom}`;
      let rel = patients[id].conjointRelation;
      let image = patients[idRel].image;
      relation.push({
        id,
        prenomNom,
        rel,
        image
      });
    });
    return relation;
  }

  handleLoadInfoPatient = (patients, id) => {
    if (has(patients, id)) {
      this.setState({
        id: patients[id].id,
        image: patients[id].image,
        cin: patients[id].cin,
        civility: patients[id].civility,
        nom: patients[id].nom,
        prenom: patients[id].prenom,
        conjoint: patients[id].conjoint,
        charges: patients[id].charges,
        sexe: patients[id].sexe,
        datenaissance: patients[id].datenaissance,
        email: patients[id].email,
        telport: patients[id].telport,
        telprof: patients[id].telprof,
        telfixe: patients[id].telfixe,
        situation: patients[id].situation,
        nbrenf: patients[id].nbrenf,
        profession: patients[id].profession,
        job: patients[id].job,
        assurance: patients[id].assurance,
        adresse: patients[id].adresse,
        ville: patients[id].ville,
        remarque: patients[id].remarque
      });
      if (!isEmpty(patients[id].conjoint)) {
        let conjoint = [];
        let idConjoint = patients[id].conjoint;
        let prenomNom = `${patients[idConjoint].prenom} ${patients[idConjoint].nom}`;
        let relation = patients[id].conjointRelation;
        let image = patients[idConjoint].image;
        conjoint.push({
          id: idConjoint,
          prenomNom,
          relation,
          image
        });
        this.setState({optConjoint: conjoint});
      }
      if (!isEmpty(patients[id].charges)) {
        let charges = [];
        let idShow = id;
        map(patients[id].charges, (idCharge, key) => {
          let prenomNom = `${patients[idCharge].prenom} ${patients[idCharge].nom}`;
          let relation = patients[idShow].chargesRelation[key] || "None";
          let image = patients[idCharge].image;
          charges.push({
            id: idCharge,
            prenomNom,
            relation,
            image
          });
        });
        this.setState({optCharges: charges});
      }
    } else {
      notifyError("La cible n'existe pas dans votre base.", "top-center");
    }
  };

  handleToHome = () => {
    this.props.history.push("/");
  };

  handleToPatients = () => {
    this.props.history.push("/patients");
  };

  handleShow = (id) => {
    const {patients} = this.props;
    this.handleLoadInfoPatient(patients, id);
  };

  render () {
    const {
      id,
      image,
      cin,
      civility,
      nom,
      prenom,
      conjoint,
      charges,
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
      active,
      optConjoint,
      optCharges
    } = this.state;
    return (
      <div>
        <ToastContainer />
        <Dimmer
          active={active}
          inverted
        >
          <Loader size="huge" />
        </Dimmer>
        <Header
          as="h2"
          icon
          textAlign="left"
        >
          <Header.Content>Dossier d&apos;un patient</Header.Content>
        </Header>
        <Button
          icon
          onClick={this.handleToPatients}
        >
          <Icon name="reply" />
        </Button>
        <Breadcrumb>
          <Breadcrumb.Section
            link
            onClick={this.handleToHome}
          >
            Home
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section
            link
            onClick={this.handleToPatients}
          >
            Patients
          </Breadcrumb.Section>
          {!isEmpty(nom) && (
            <Breadcrumb.Section active>
              <Breadcrumb.Divider icon="right arrow" />
                  Patient ID: {id}
            </Breadcrumb.Section>
          )}
        </Breadcrumb>
        <Segment>
          <Form>
            <Container textAlign="center">
              <Image
                avatar
                size="small"
                src={image ? image : defaultImg}
              />
            </Container>
            <Form.Group
              style={{marginTop: 20}}
              widths="equal"
            >
              <Form.Input
                fluid
                label="CIN"
                name="cin"
                placeholder="CIN"
                readOnly
                value={cin ? cin : ""}
              />
              <Form.Input
                fluid
                label="Civilité"
                name="civility"
                placeholder="Civilité"
                readOnly
                value={civility ? civility : ""}
              />
              <Form.Input
                fluid
                label="Nom"
                name="nom"
                placeholder="Nom"
                readOnly
                value={nom ? nom : ""}
              />
              <Form.Input
                fluid
                label="Prénom"
                name="prenom"
                placeholder="Prénom"
                readOnly
                value={prenom ? prenom : ""}
              />
            </Form.Group>
            {conjoint && (
              <Segment>
                <Form.Group widths="1">
                  <Form.Field>
                    <label>Conjoint</label>
                  </Form.Field>
                  <List horizontal>
                    <List.Item key="0">
                      <Image
                        avatar
                        src={optConjoint[0].image || defaultImg}
                      />
                      <List.Content>
                        <List.Header>
                          <Button
                            basic
                            color="green"
                            onClick={() => this.handleShow(optConjoint[0].id)}
                          >
                            {optConjoint[0].prenomNom || "None"}
                          </Button>
                        </List.Header>
                        {optConjoint[0].relation || "None"}
                      </List.Content>
                    </List.Item>
                  </List>
                </Form.Group>
              </Segment>
            )}
            {charges && (
              <Segment>
                <Form.Group widths="1">
                  <Form.Field>
                    <label>Personne à charge</label>
                  </Form.Field>
                  <List horizontal>
                    {map(optCharges, (crg) => (<List.Item key={crg.id}>
                      <Image
                        avatar
                        src={crg.image || defaultImg}
                      />
                      <List.Content>
                        <List.Header>
                          <Button
                            basic
                            color="blue"
                            onClick={() => this.handleShow(crg.id)}
                          >
                            {crg.prenomNom || "None"}
                          </Button>
                        </List.Header>
                        {crg.relation || "None"}
                      </List.Content>
                    </List.Item>))}
                  </List>
                </Form.Group>
              </Segment>
            )}
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Sexe"
                name="sexe"
                placeholder="Sexe"
                readOnly
                value={sexe ? sexe : ""}
              />
              <Form.Input
                fluid
                label="Date de naissance"
                name="datenaissance"
                readOnly
                value={datenaissance ? datenaissance : ""}
              />
              <Form.Input
                fluid
                label="Email"
                name="email"
                placeholder="Email"
                readOnly
                value={email ? email : ""}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Téléphone portable"
                name="telport"
                placeholder="Téléphone portable"
                readOnly
                value={telport ? telport : ""}
              />
              <Form.Input
                fluid
                label="Téléphone professionnel"
                name="telprof"
                placeholder="Téléphone professionnel"
                readOnly
                value={telprof ? telprof : ""}
              />
              <Form.Input
                fluid
                label="Téléphone fixe"
                name="telfixe"
                placeholder="Téléphone fixe"
                readOnly
                value={telfixe ? telfixe : ""}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Situation familiale"
                name="situation"
                placeholder="Situation familiale"
                readOnly
                value={situation ? situation : ""}
              />
              <Form.Input
                fluid
                label="Nombre d'enfants"
                name="nbrenf"
                placeholder="Nombre d'enfants"
                readOnly
                value={nbrenf ? nbrenf : ""}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Profession"
                name="profession"
                placeholder="Profession"
                readOnly
                value={profession ? profession : ""}
              />
              <Form.Input
                fluid
                label="Fonctionnaire"
                name="job"
                placeholder="Fonctionnaire"
                readOnly
                value={job ? job : ""}
              />
              <Form.Input
                fluid
                label="Assurance"
                name="assurance"
                placeholder="Assurance maladie"
                readOnly
                value={assurance ? assurance : ""}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.TextArea
                label="Adresse"
                name="adresse"
                placeholder="Adresse de patient"
                readOnly
                value={adresse ? adresse : ""}
              />
              <Form.Input
                fluid
                label="Ville"
                name="ville"
                placeholder="Ville"
                readOnly
                value={ville ? ville : ""}
              />
            </Form.Group>
            <Form.TextArea
              label="Remarque"
              name="remarque"
              placeholder="Si vous avez des remarques n'hésitez pas à m'en faire part"
              readOnly
              value={remarque ? remarque : ""}
            />
          </Form>
          <Segment clearing>
            <Button
              color="grey"
              floated="right"
              onClick={this.handleToPatients}
            >
              <Icon name="undo" />
              Retour
            </Button>
          </Segment>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({patients: state.patients});

PatientShow.propTypes = {
  patients: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object
};
export default withRouter(connect(mapStateToProps)(PatientShow));
