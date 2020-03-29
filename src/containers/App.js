// Addons
import {isEmpty, includes, filter, has} from "lodash";
import {withNamespaces} from "react-i18next";
import React, {Component} from "react";
import {connect} from "react-redux";
import {Switch, Route, Redirect, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
// Semantic
import {Sidebar, Segment} from "semantic-ui-react";
// Components
import LoadingComponent from "../components/CommonPanel/LoadingComponent";
import AuthenticatedComponent from "../components/CommonPanel/AuthenticatedComponent";
import Login from "../components/AuthPanel/Login";
import Register from "../components/AuthPanel/Register";
import Home from "../components/Home";
import Master from "./Master";
import Chat from "../components/MessagesPanel/Chat";
import Patients from "../components/PatientsPanel/PatientsList";
import PatientShow from "../components/PatientsPanel/PatientShow";
import PatientEvent from "../components/PatientsPanel/PatientEvent";
import Ordonnances from "../components/OdonnancesPanel/OrdonnanceHome";
import Notes from "../components/NotesPanel/Notes";
import Plans from "../components/PlansPanel/Plans";
import Test from "../components/Test";
import Settings from "../components/SettingsPanel/SettingsPanel";
import NoteEdit from "../components/NotesPanel/NoteEdit";
import NoteDetail from "../components/NotesPanel/NoteDetail";
// Security
import Err404 from "../components/ErrPanel/Err404.js";
import Err403 from "../components/ErrPanel/Err403.js";
import Err400 from "../components/ErrPanel/Err400.js";
// Imports
import {MEDIUM, MASTER} from "../services/roles";
// Actions
import {setParams} from "../actions/paramsAction";
// Begin
class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      role: "",
      active: "",
      user: "",
      primaryColor: "",
      secondaryColor: ""
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.user !== this.props.user) {
      if (has(nextProps.user, "uid")) {
        this.setState({user: nextProps.user});
      }
    }
    if (nextProps.users !== this.props.users) {
      if (has(nextProps.users, this.state.user.uid)) {
        const params = nextProps.users[this.state.user.uid].params;
        this.props.setParams(params);
      }
    }
    if (nextProps.params !== this.props.params || nextProps.languages !== this.props.languages) {
      if (!isEmpty(nextProps.languages)) {
        if (has(nextProps.params.langs, "primaryLang")) {
          const userLang = nextProps.params.langs.primaryLang;
          const langs = nextProps.languages[userLang].translation;
          this.handleChargeLang(userLang, langs);
        }
      }
      this.setState({
        active: nextProps.params.active,
        role: nextProps.params.role
      });
      this.getColorByUser(nextProps.params);
    }
  }

  getColorByUser (params) {
    const color = filter(params.colors, (clr) => clr.active);
    const primaryColor = color[0].primaryColor;
    const secondaryColor = color[0].secondaryColor;
    this.setState({
      primaryColor,
      secondaryColor
    });
  }

  checkComponent (component) {
    const {role, active} = this.state;
    if (!active) {
      return Err400;
    }
    switch (component) {
    case Home:
      return includes(MEDIUM, role) ? Home : Err403;
    case NoteEdit:
      return includes(MASTER, role) ? NoteEdit : Err403;
    case NoteDetail:
      return includes(MASTER, role) ? NoteDetail : Err403;
    case Notes:
      return includes(MASTER, role) ? Notes : Err403;
    case Test:
      return includes(MASTER, role) ? Test : Err403;
    case Settings:
      return includes(MASTER, role) ? Settings : Err403;
    case Chat:
      return includes(MEDIUM, role) ? Chat : Err403;
    case Patients:
      return includes(MEDIUM, role) ? Patients : Err403;
    case Ordonnances:
      return includes(MEDIUM, role) ? Ordonnances : Err403;
    case PatientEvent:
      return includes(MEDIUM, role) ? PatientEvent : Err403;
    case PatientShow:
      return includes(MEDIUM, role) ? PatientShow : Err403;
    case Plans:
      return includes(MEDIUM, role) ? Plans : Err403;
    default:
      return Err404;
    }
  }

  handleChargeLang (userLang, langs) {
    this.props.i18n.changeLanguage(userLang);
    this.props.i18n.addResourceBundle(userLang, "translation", langs, true, true);
  }

  render () {
    const {primaryColor, secondaryColor} = this.state;
    const {t} = this.props;
    return (
      <LoadingComponent>
        <Switch>
          <Route
            component={Login}
            exact
            path="/login"
          />
          <Route
            component={Register}
            exact
            path="/register"
          />
          <Redirect
            from="/logout"
            to="/login"
          />
          <AuthenticatedComponent>
            <Master primaryColor={primaryColor} />
            <Sidebar.Pushable
              as={Segment}
              className={t("app")}
            >
              <Sidebar.Pusher>
                <Segment
                  padded
                  style={{background: secondaryColor}}
                >
                  <Switch>
                    <Route
                      component={this.checkComponent(Home)}
                      exact
                      path="/"
                    />
                    <Route
                      component={this.checkComponent(NoteEdit)}
                      exact
                      path="/notes/:id/edit"
                    />
                    <Route
                      component={this.checkComponent(NoteDetail)}
                      exact
                      path="/notes/:id"
                    />
                    <Route
                      component={this.checkComponent(Notes)}
                      exact
                      path="/notes"
                    />
                    <Route
                      component={this.checkComponent(Test)}
                      exact
                      path="/test"
                    />
                    <Route
                      component={this.checkComponent(Plans)}
                      exact
                      path="/plannings"
                    />
                    <Route
                      component={this.checkComponent(Settings)}
                      exact
                      path="/settings"
                    />
                    <Route
                      component={this.checkComponent(Chat)}
                      exact
                      path="/chat"
                    />
                    <Route
                      component={this.checkComponent(Patients)}
                      exact
                      path="/patients"
                    />
                    <Route
                      component={this.checkComponent(PatientEvent)}
                      exact
                      path="/patient/event/:id?"
                    />
                    <Route
                      component={this.checkComponent(PatientShow)}
                      exact
                      path="/patient/show/:id"
                    />
                    <Route
                      component={this.checkComponent(Ordonnances)}
                      exact
                      path="/ordonnances"
                    />
                    <Route
                      component={Err403}
                      path="/403"
                    />
                    <Route
                      component={Err404}
                      path="*"
                      status={404}
                    />
                  </Switch>
                </Segment>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </AuthenticatedComponent>
        </Switch>
      </LoadingComponent>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.currentUser,
  users: state.users,
  params: state.params,
  languages: state.settings.languages
});

App.propTypes = {
  user: PropTypes.object,
  users: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  languages: PropTypes.object,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  setParams: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, {setParams})(withNamespaces()(App)));
