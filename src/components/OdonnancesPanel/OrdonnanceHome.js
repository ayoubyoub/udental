/* eslint-disable max-len */
/* eslint-disable no-magic-numbers */
/* eslint-disable react/no-unused-state */
// Addons
import {isEmpty, trim, map, has, filter, keys} from "lodash";
import {withNamespaces} from "react-i18next";
import {ToastContainer} from "react-toastify";
import Helmet from "react-helmet";
import jsPDF from "jspdf";
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
class OrdonnanceHome extends Component {
  constructor (props) {
    super(props);
    this.state = {
      page: "Ajouter un Ordonnance",
      id: this.props.match.params.id,
      image: "https://lh3.googleusercontent.com/-WzJvfpKMdaM/WWE4UuHsFsI/AAAAAAAAAAc/kc_cV_w2awgg9pGrcZo39ag56SfVEFFEgCLIBGAYYCw/w1080-h608-p-k-no-v0/",
      charges: [],
      datedujour: "",
      ordonnace: "",
      errors: [],
      patients: [],
      by: this.props.currentUser.displayName,
      to: "",
      format: 7.9,
      lebar: 7.27,
      patient: "ordonnance ELAMRANI YASSINE "

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

  componentWillReceiveProps (nextProps) {
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
        cin: patients[id].cin || "",
        image: patients[id].image || "https://lh3.googleusercontent.com/-WzJvfpKMdaM/WWE4UuHsFsI/AAAAAAAAAAc/kc_cV_w2awgg9pGrcZo39ag56SfVEFFEgCLIBGAYYCw/w1080-h608-p-k-no-v0/",
        charges: patients[id].charges || [],
        datedujour: patients[id].datedujour || "",
        ordonnace: patients[id].ordonnace || ""
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

  handleErrors = (datedujour, ordonnace, charges) => {
    let err = [];
    if (isEmpty(trim(datedujour))) {
      err.push({
        datedujour: true,
        message: "Le champ date du jour est oblégatoire!"
      });
    }
    if (isEmpty(trim(ordonnace))) {
      err.push({
        ordonnace: true,
        message: "Le champ prescription est oblégatoire!"
      });
    }
    if (isEmpty(trim(charges))) {
      err.push({
        charges: true,
        message: "Le champ personne à charge  est oblégatoire!"
      });
    }
    return err;
  }

  handleDisplayErrors = (errors) => errors.map((error, ind) => <Message.Item key={ind}>{error.message}</Message.Item>);

  handleSubmit = (evt) => {
    evt.preventDefault();
    // Const metadata = {contentType: "image/jpeg"};
    this.setState({active: true});
    //   Let event = "";
    let patient = {};

    const {

      //   Image,
      charges,
      datedujour,
      ordonnace

    } = this.state;
    // Handle Errors...
    let err = this.handleErrors(datedujour, ordonnace, charges);
    if (err.length === 0) {
      patient = {
        charges,
        datedujour,
        ordonnace
      };
      let doc = new jsPDF({
        // Orientation: 'landscape',
        unit: "in",
        Format: [
          4,
          3
        ]

        /*
         * Format: [
         *   this.state.format,
         *   this.state.lebar
         * ]
         */
      });

      // doc.addImage("https://lh3.googleusercontent.com/-WzJvfpKMdaM/WWE4UuHsFsI/AAAAAAAAAAc/kc_cV_w2awgg9pGrcZo39ag56SfVEFFEgCLIBGAYYCw/w1080-h608-p-k-no-v0/", "JPEG", 0.5, 0.7, 2.5, 2.5);


      doc.text(`le : ${patient.datedujour}`, 4.9, 4.1);
      doc.text(`Patient : ${this.state.patient}`, 4.0, 4.3);
      doc.text(`Recipient: ${this.state.to}`, 4.9, 4.5);
      doc.text("prescription relative au traitement ", 0.5, 5.5);
      doc.text(`medicament  : ${this.state.ordonnace}`, 0.9, 6.0);

      // Format: (image_file, 'image_type', X_init, Y_init, X_fin, Y_fin)

      doc.save(`${this.state.patient}`);
    } else {
      this.setState({errors: err});
    }
    this.setState({active: false});
  };

  clearAll = () => {
    this.setState({
      id: "",
      image: "",
      charges: [],
      datedujour: "",
      ordonnace: "",
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
        <Helmet title=" eDental APP | Ordonnances" />
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
OrdonnanceHome.propTypes = {
  currentUser: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  history: PropTypes.object,
  patients: PropTypes.object,
  settings: PropTypes.object,
  match: PropTypes.object,
  t: PropTypes.func.isRequired
};
export default withRouter(connect(mapStateToProps, {
  eventPatient,
  uploadImage
})(withNamespaces()(OrdonnanceHome)));
