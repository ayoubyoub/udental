// Addons
/* eslint-disable */
import Helmet from "react-helmet";
import { filter, map, values, escapeRegExp, isEmpty, toString, now } from 'lodash';
import { notifyError } from "../../services/notify";
import moment from "moment";
import Dnd from "./Common/Dnd";
// React
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Semantic
import { Header, Image, Segment } from "semantic-ui-react";
// Imports
import HeaderPlans from "./Common/HeaderPlans";
import BreadPlans from "./Common/BreadPlans";
// Actions
import { eventsPatient, eventsCalPatient, removeCalPatient } from "../../actions/patientsAction";
// Begin
class Plans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "Planning Médical",
      id: "",
      isLoadingD: false,
      valueD: "",
      valueID: "",
      resultsD: [],
      isLoadingP: false,
      valueP: "",
      valueIP: "",
      resultsP: [],
      active: false,
      events: [],
      isSearch: false,
      isActive: false,
      isResult: false,
      doctors: [],
      patients: [],
      title: "",
      start: moment().format("DD/MM/YYYY HH:mm"),
      end: moment()
        .add(30, "m")
        .format("DD/MM/YYYY HH:mm")
    };
  }

  componentDidMount() {
    const { users, patients } = this.props;
    this.handleLoadUsers(users);
    this.handleLoadPatients(patients);
    this.resetComponentD();
    this.resetComponentP();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.users !== nextProps.users) {
      this.handleLoadUsers(nextProps.users);
    }
    if (this.props.patients !== nextProps.patients) {
      this.handleLoadPatients(nextProps.patients);
    }
  }

  handleLoadUsers = users => {
    const doctors = filter(values(users), obj => obj.params.role === "DOCTOR");
    let lstDoctors = [];
    map(doctors, (val, key) => {
      lstDoctors.push({
        id: val.uid,
        title: val.name,
        description: val.name,
        image: val.avatar,
        price: val.params.color
      });
    });
    this.setState({ doctors: lstDoctors });
  };

  handleLoadPatients = patients => {
    let lstPatients = [];
    let lstEvents = [];
    map(values(patients), (val, key) => {
      lstPatients.push({
        id: val.id,
        title: val.nom + " " + val.prenom,
        description: val.nom,
        image: val.image,
        price: val.civility
      });
      if (val.events) {
        map(val.events, event => {
          lstEvents.push({
            id: event.id,
            title: event.title,
            start: moment(event.start, "DD/MM/YYYY HH:mm").toDate(),
            end: moment(event.end, "DD/MM/YYYY HH:mm").toDate(),
            color:event.color,
          doctor: event.doctor,
          patient: event.patient,
          });
        });
      }
    });
    this.setState({ patients: lstPatients, events: lstEvents });
  };

  /* Begin charge Doctors */
  resetComponentD = () => {
    this.setState({ isLoadingD: false, resultsD: [], valueD: "", valueID: "" });
  };

  handleResultSelectD = (event, { result }) => {
    this.setState({ valueID: result.id, valueD: result.title });
  };

  handleSearchChangeD = (event, { value }) => {
    const { doctors } = this.state;
    this.setState({ isLoadingD: true, valueD: value });

    setTimeout(() => {
      if (value.length < 1) return this.resetComponentD();

      const re = new RegExp(escapeRegExp(value), "i");
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoadingD: false,
        resultsD: filter(doctors, isMatch)
      });
    }, 300);
  };
  /* end doctors */
  /* Begin charge Patients */
  resetComponentP = () => {
    this.setState({ isLoadingP: false, resultsP: [], valueP: "", valueIP: "" });
  };

  handleResultSelectP = (event, { result }) => {
    this.setState({ valueIP: result.id, valueP: result.title });
  };

  handleSearchChangeP = (event, { value }) => {
    const { patients } = this.state;
    this.setState({ isLoadingP: true, valueP: value });

    setTimeout(() => {
      if (value.length < 1) return this.resetComponentP();

      const re = new RegExp(escapeRegExp(value), "i");
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoadingP: false,
        resultsP: filter(patients, isMatch)
      });
    }, 300);
  };
  /* end patients */

  handleSelectSlot = ({ id, title, start, end, doctor, patient }) => {
    if (id) {
      this.setState({
        id,
        start: moment(start).format("DD/MM/YYYY HH:mm"),
        end: moment(end).format("DD/MM/YYYY HH:mm"),
        valueIP: patient.id,
        valueP: patient.name,
        valueID: doctor.id,
        valueD: doctor.name,
        title,
        isActive: true,
        isSearch: false,
        isResult: false
      });
    } else {
      this.setState({
        start: moment(start).format("DD/MM/YYYY HH:mm"),
        end: moment(end).format("DD/MM/YYYY HH:mm"),
        isActive: true,
        isSearch: false,
        isResult: false
      });
    }
  };

  handleAddSlot = () => {
    this.setState({
      start: this.state.start,
      end: this.state.end,
      isActive: true,
      isSearch: false,
      isResult: false
    });
  };

  handleSearchSlot = () => {
    this.setState({
      start: this.state.start,
      end: this.state.end,
      isActive: true,
      isSearch: true,
      isResult: false
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { start, end, id, title, valueIP, valueP, valueID, valueD, doctors } = this.state;
    if (!isEmpty(valueID) && !isEmpty(toString(valueIP))) {
      const _id = id || now();
      const events = {
        [_id]: {
          id: _id,
          start,
          end,
          title,
          doctor: { id: valueID, name: valueD },
          patient: { id: valueIP, name: valueP },
          color: filter(doctors, val => {
            return val.id === valueID;
          })[0].price // price === color
        }
      };
      this.props.eventsPatient(valueIP, events);
      this.handleCloseModal();
    } else {
      notifyError("🚫 Erreur, Merci de saisir au moins un doctor ou bien un patient!", "top-center");
    }
  };

  handleSearch = () => {
    this.setState({isResult: true});
  }

handleDeleteEvent = () => {
  const {id, valueIP} = this.state;
  this.props.removeCalPatient(valueIP, id);
  this.handleCloseModal();
}

  handleCloseModal = () => {
    this.setState({
      id: "",
      title: "",
      isActive: false,
      isSearch: false,
      isResult: false,
      start: moment().format("DD/MM/YYYY HH:mm"),
      end: moment()
        .add(30, "m")
        .format("DD/MM/YYYY HH:mm"),
      valueIP: "",
      valueP: "",
      valueID: "",
      valueD: "",
      resultsP: [],
      resultsD: [],
      isLoadingP: false,
      isLoadingD: false
    });
  };

  handleCloseResults = () => {
    this.setState({isResult: false});
  }

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      if (name === "start") {
        this.setState({
          start: value,
          end: moment(value, "DD/MM/YYYY HH:mm")
            .add(30, "m")
            .format("DD/MM/YYYY HH:mm")
        });
      } else {
        this.setState({ [name]: value });
      }
    }
  };

  handleToHome = () => {
    this.props.history.push("/");
  };

  handleToPlans = () => {
    this.props.history.push("/plannings");
  };

  render() {
    const { page, active, events, title, isActive, isSearch, isResult, id, start, end, doctors, isLoadingD, valueD, resultsD, patients, isLoadingP, valueP, resultsP } = this.state;
    return (
      <div>
        <HeaderPlans page={page} active={active} />
        <BreadPlans onHandleToHome={this.handleToHome} onHandleToPlans={this.handleToPlans} page={page} />
        <Dnd
          events={events}
          id={id}
          title={title}
          isActive={isActive}
          isSearch={isSearch}
          isResult={isResult}
          start={start}
          end={end}
          handleSelectEvent={this.handleSelectSlot}
          handleSelectSlot={this.handleSelectSlot}
          handleAddSlot={this.handleAddSlot}
          handleSearchSlot={this.handleSearchSlot}
          // handleEventResize={this.handleEventResize}
          // handleEventDrop={this.handleEventDrop}
          handleCloseModal={this.handleCloseModal}
          handleDeleteEvent={this.handleDeleteEvent}
          handleSearch={this.handleSearch}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          isLoadingD={isLoadingD}
          resultsD={resultsD}
          valueD={valueD}
          handleResultSelectD={this.handleResultSelectD}
          handleSearchChangeD={this.handleSearchChangeD}
          isLoadingP={isLoadingP}
          resultsP={resultsP}
          valueP={valueP}
          handleResultSelectP={this.handleResultSelectP}
          handleSearchChangeP={this.handleSearchChangeP}
          handleCloseResults={this.handleCloseResults}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  users: state.users,
  patients: state.patients
});

export default withRouter(
  connect(
    mapStateToProps,
    { eventsPatient, eventsCalPatient, removeCalPatient }
  )(Plans)
);
