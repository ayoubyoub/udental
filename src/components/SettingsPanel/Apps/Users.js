/* eslint-disable react/no-unused-state */
// Addons
import {values, map, find, orderBy, filter, includes, has} from "lodash";
import {withNamespaces} from "react-i18next";
import moment from "moment";
import {ToastContainer} from "react-toastify";
// React
import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
// Semantic
import {Segment, Button, Container} from "semantic-ui-react";
import {notifyEdit} from "../../../utils/notify";
// Actions
import {resetPwd, editUser, editParamsUser, deleteUser} from "../../../actions/usersAction";
// Import
import ModalEditUser from "./Users/ModalEditUser";
import ModalPwdUser from "./Users/ModalPwdUser";
import ModalAssign from "./Users/ModalAssign";
import ModalDoctors from "./Users/ModalDoctors";
import CardUsers from "./Users/CardUsers";
// Begin
class Users extends Component {
  constructor (props) {
    super(props);
    this.state = {
      uid: "",
      sexe: "",
      email: "",
      optSexe: [],
      civility: "",
      optCivility: [],
      cin: "",
      name: "",
      telport: "",
      adresse: "",
      role: "",
      calendarID: "",
      color: "",
      isModalEdit: false,
      isModalPwd: false,
      isModalAssign: false,
      isModalDoctors: false,
      filters: "ALL",
      users: [],
      doctors: [],
      assists: [],
      lstAssists: [],
      assign: [],
      presences: []
    };
  }

  componentDidMount () {
    const {users, presences, settings} = this.props;
    this.handleLoadUsers(users);
    // Presences load...
    this.handleLoadPresences(presences);
    // Sexe load...
    this.handleSettings(settings.sexe, "sexe");
    // Civility load...
    this.handleSettings(settings.civility, "civility");
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.users !== this.props.users) {
      this.handleLoadUsers(nextProps.users);
    }
    if (nextProps.presences !== this.props.presences) {
      this.handleLoadPresences(nextProps.presences);
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

  handleLoadUsers = (users) => {
    const lstUsers = values(users);
    // Get Doctors
    const doctors = this.getByRole(lstUsers, "DOCTOR");
    // Get Assists
    const assists = this.getByRole(lstUsers, "ASSIST");
    // Get lstAssists for the filter
    const lstAssists = filter(lstUsers, (obj) => obj.params.role === "ASSIST");
    this.setState({
      users: lstUsers,
      doctors,
      assists,
      lstAssists
    });
  };

  getByRole = (lstUsers, role) => {
    const lstOpt = filter(lstUsers, (obj) => obj.params.role === role);
    const options = [];
    map(lstOpt, (val) => {
      options.push({
        key: val.uid,
        text: val.name,
        value: val.uid
      });
    });
    return options;
  }

  handleLoadPresences = (presences) => {
    const lstPresences = map(presences, (value, key) => ({
      key,
      ...value
    }));
    this.setState({presences: lstPresences});
  };

  isUserOnline = (uid) => {
    const {presences} = this.state;
    let exist = false;
    find(presences, (value) => {
      if (value.active && uid === value.key) {
        exist = true;
      }
    });
    return exist;
  };

  timeLastSeeUserOnline = (uid) => {
    const {presences} = this.state;
    let time = "";
    find(presences, (value) => {
      if (!value.active && uid === value.key) {
        time = moment(value.timestamp).fromNow();
      }
    });
    return time;
  };

  handleActivate = (uid, state) => {
    this.props.editParamsUser(uid, {active: !state}).then(() => {
      notifyEdit("🚀 La modification a été effectué.", "top-center");
    });
  }

  handleSubmit = () => {
    const {uid, sexe, civility, cin, name, telport, adresse, role} = this.state;
    this.props.editUser(uid, {
      cin,
      sexe,
      civility,
      name,
      telport,
      adresse
    }).then(() => {
      this.props.editParamsUser(uid, {role});
      notifyEdit("🚀 La modification a été effectué.", "top-center");
    });
    this.clearAll();
  }

  handleSubmitPwd = () => {
    const {email} = this.state;
    this.props.resetPwd(email).then(() => {
      notifyEdit("🚀 L'email à bien été envoyé.", "top-center");
    });
    this.handleClosePwd();
  }

  handleEditUser = (uid) => {
    const {users} = this.state;
    let user = filter(users, (obj) => obj.uid === uid);
    this.setState({
      uid,
      sexe: user[0].sexe || "",
      civility: user[0].civility || "",
      cin: user[0].cin || "",
      name: user[0].name || "",
      telport: user[0].telport || "",
      adresse: user[0].adresse || "",
      role: user[0].params.role || "",
      isModalEdit: true
    });
  }

  handleSubmitAssign = () => {
    const {uid, assign} = this.state;
    this.props.editParamsUser(uid, {assign}).then(() => {
      notifyEdit("🚀 La modification a été effectué.", "top-center");
    });
    this.handleCloseAssign();
  }

  handleSubmitDoctors = () => {
    const {uid, calendarID, color} = this.state;
    this.props.editParamsUser(uid, {calendar: calendarID, color}).then(() => {
      notifyEdit("🚀 La modification a été effectué.", "top-center");
    });
    this.setState({
      uid: "",
      calendarID: "",
      color: "",
      isModalDoctors: false
    });
  }

  handleChangeColor = (color) => {
    this.setState({color: color.hex});
  };

  handlePwdUser = (email) => {
    this.setState({
      email,
      isModalPwd: true
    });
  }

  handleAssign = (uid) => {
    const {lstAssists} = this.state;
    let assign = [];
    map(lstAssists, (assist) => {
      if (assist.uid === uid) {
        assign = assist.params.assign;
      }
    });
    this.setState({
      uid,
      assign,
      isModalAssign: true
    });
  }

  handleDoctor = (uid, name) => {
    const {lstAssists, users} = this.state;
    const doctor = filter(users, (user) => user.uid === uid);
    let calendarID = "";
    let color= "";
    if (has(doctor[0].params, "calendar")) {
      calendarID = doctor[0].params.calendar;
    }
    if (has(doctor[0].params, "color")) {
      color = doctor[0].params.color;
    }
    let assign = [];
    map(lstAssists, (assist) => {
      if (includes(assist.params.assign, uid)) {
        assign.push(assist);
      }
    });
    this.setState({
      uid,
      name,
      assign,
      calendarID,
      color,
      isModalDoctors: true
    });
  }

  handleCloseModal = () => {
    this.clearAll();
  };

  handleClosePwd = () => {
    this.setState({
      uid: "",
      email: "",
      isModalPwd: false
    });
  }

  handleCloseAssign = () => {
    this.setState({
      uid: "",
      assign: [],
      isModalAssign: false
    });
  }

  handleCloseDoctors = () => {
    this.setState({
      uid: "",
      name: "",
      calendarID: "",
      color: "",
      isModalDoctors: false
    });
  }

  clearAll = () => {
    this.setState({
      uid: "",
      sexe: "",
      email: "",
      civility: "",
      cin: "",
      name: "",
      telport: "",
      adresse: "",
      role: "",
      isModalEdit: false
    });
  };

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({[name]: value});
    }
  };

  render () {
    const {users, filters} = this.state;
    return (
      <Segment
        color="blue"
      >
        <ToastContainer />
        <Container
          style={{marginBottom: "20px"}}
          textAlign="center"
        >
          <Button.Group>
            <Button
              active={filters === "ALL" && true}
              onClick={() => this.setState({filters: "ALL"})}
            >All</Button>
            <Button.Or />
            <Button
              active={filters === "DOCTOR" && true}
              onClick={() => this.setState({filters: "DOCTOR"})}
            >Doctors</Button>
            <Button.Or />
            <Button
              active={filters === "ASSIST" && true}
              onClick={() => this.setState({filters: "ASSIST"})}
            >Assists</Button>
          </Button.Group>
        </Container>
        <CardUsers
          filters={filters}
          isUserOnline={this.isUserOnline}
          onHandleActivate={this.handleActivate}
          onHandleAssign={this.handleAssign}
          onHandleDoctor={this.handleDoctor}
          onHandleEditUser={this.handleEditUser}
          onHandlePwdUser={this.handlePwdUser}
          timeLastSeeUserOnline={this.timeLastSeeUserOnline}
          users={users}
        />
        <ModalEditUser
          onHandleChange={this.handleChange}
          onHandleCloseModal={this.handleCloseModal}
          onHandleSubmit={this.handleSubmit}
          state={this.state}
        />
        <ModalPwdUser
          email={this.state.email}
          isModalPwd={this.state.isModalPwd}
          onHandleClosePwd={this.handleClosePwd}
          onHandleSubmitPwd={this.handleSubmitPwd}
        />
        <ModalAssign
          assign={this.state.assign}
          doctors={this.state.doctors}
          isModalAssign={this.state.isModalAssign}
          onHandleChange={this.handleChange}
          onHandleCloseAssign={this.handleCloseAssign}
          onHandleSubmitAssign={this.handleSubmitAssign}
        />
        <ModalDoctors
          assign={this.state.assign}
          calendarID={this.state.calendarID}
          color={this.state.color}
          isModalDoctors={this.state.isModalDoctors}
          name={this.state.name}
          onHandleChange={this.handleChange}
          onHandleCloseDoctors={this.handleCloseDoctors}
          onHandleSubmitDoctors={this.handleSubmitDoctors}
          onHandleChangeColor={this.handleChangeColor}
        />
      </Segment>
    );
  }
}
const maptStateToProps = (state) => ({
  users: state.users,
  presences: state.presences,
  settings: state.settings,
  params: state.params
});
Users.propTypes = {
  users: PropTypes.object.isRequired,
  presences: PropTypes.object,
  params: PropTypes.object,
  editParamsUser: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  resetPwd: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};
export default connect(maptStateToProps, {
  resetPwd,
  editUser,
  editParamsUser,
  deleteUser
})(withNamespaces()(Users));
