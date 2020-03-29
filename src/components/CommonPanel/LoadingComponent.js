// Addons
import {isEmpty, replace, toLower} from "lodash";
// React
import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
// Actions
import {getUser, getUsers} from "../../actions/usersAction";
import {getPatients} from "../../actions/patientsAction";
import {getNotes} from "../../actions/notesAction";
import {getPresences} from "../../actions/presencesAction";
import {getChannels} from "../../actions/channelsAction";
import {getTyping, deleteTyping} from "../../actions/typingAction";
import {getMessages, getPrivateMessages} from "../../actions/messagesAction";
import {getConnected} from "../../actions/connectedAction";
import {getSettings} from "../../actions/settingsAction";
// Components
import Loading from "./Loading";
// Semantic
import {Segment} from "semantic-ui-react";
// Begin
class LoadingComponent extends Component {
  componentDidMount () {
    const {user} = this.props;
    if (isEmpty(user)) {
      this.props.getUser();
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.user !== this.props.user && !isEmpty(nextProps.user)) {
      this.props.getUsers();
      this.props.getPatients();
      this.props.getChannels();
      this.props.getNotes();
      this.props.getConnected(nextProps.user.uid);
      this.props.getPresences();
      this.props.getTyping();
      this.props.getMessages();
      this.props.getPrivateMessages();
      this.props.getSettings();
    }
    if (nextProps.routing !== this.props.routing && !isEmpty(nextProps.user)) {
      const prev = replace(this.props.routing.location.pathname, "/", "");
      const next = replace(nextProps.routing.location.pathname, "/", "");
      if (toLower(prev) === "chat" && toLower(next) !== "chat") {
        this.props.deleteTyping(this.props.user.uid);
      }
    }
  }

  render () {
    const {
      userLoading,
      usersLoading,
      patientsLoading,
      channelsLoading,
      notesLoading,
      presencesLoading,
      children,
      user,
      messagesLoading,
      privateMessagesLoading,
      typingLoading,
      settingsLoading
    } = this.props;
    if (
      (!userLoading &&
        !usersLoading &&
        !patientsLoading &&
        !channelsLoading &&
        !notesLoading &&
        !presencesLoading &&
        !messagesLoading &&
        !privateMessagesLoading &&
        !typingLoading &&
        !settingsLoading) ||
      user === null
    ) {
      return <Segment basic>{children}</Segment>;
    }
    return <Loading />;
  }
}
const mapStateToProps = (state) => ({
  userLoading: state.loading.user,
  usersLoading: state.loading.users,
  patientsLoading: state.loading.patients,
  channelsLoading: state.loading.channels,
  notesLoading: state.loading.notes,
  presencesLoading: state.loading.presences,
  typingLoading: state.loading.typing,
  messagesLoading: state.loading.messages,
  privateMessagesLoading: state.loading.privateMessages,
  settingsLoading: state.loading.settings,
  typing: state.typing,
  routing: state.routing,
  user: state.user.currentUser,
  presences: state.presences
});
LoadingComponent.propTypes = {
  getUser: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  getPatients: PropTypes.func.isRequired,
  getChannels: PropTypes.func.isRequired,
  getNotes: PropTypes.func.isRequired,
  getPresences: PropTypes.func.isRequired,
  getTyping: PropTypes.func.isRequired,
  deleteTyping: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
  getPrivateMessages: PropTypes.func.isRequired,
  getConnected: PropTypes.func.isRequired,
  getSettings: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
  userLoading: PropTypes.bool,
  usersLoading: PropTypes.bool,
  patientsLoading: PropTypes.bool,
  channelsLoading: PropTypes.bool,
  notesLoading: PropTypes.bool,
  presencesLoading: PropTypes.bool,
  typingLoading: PropTypes.bool,
  messagesLoading: PropTypes.bool,
  privateMessagesLoading: PropTypes.bool,
  settingsLoading: PropTypes.bool,
  routing: PropTypes.object,
  user: PropTypes.object
};
export default withRouter(connect(
  mapStateToProps,
  {
    getUser,
    getUsers,
    getPatients,
    getChannels,
    getNotes,
    getPresences,
    getTyping,
    deleteTyping,
    getMessages,
    getPrivateMessages,
    getConnected,
    getSettings
  }
)(LoadingComponent));
