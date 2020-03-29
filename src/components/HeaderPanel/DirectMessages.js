// Addons
import {isEmpty, orderBy, find, values, map, includes, has, sum, keys, reject, pick, groupBy} from "lodash";
import moment from "moment";
// React
import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
// Semantic
import {Menu, Icon, Dropdown, Label} from "semantic-ui-react";
// Actions
import {setCurrentChannel, setPrivateChannel} from "../../actions/channelAction";
import {deleteTyping} from "../../actions/typingAction";
import {setNotifViewedPv} from "../../actions/messagesAction";
import {setCurrentNotifsPv} from "../../actions/notificationsAction";
// Begin
class DirectMessages extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activeChannel: "",
      users: [],
      presences: [],
      notifsPv: [],
      user: this.props.currentUser,
      privateMessages: this.props.privateMessages
    };
  }

  componentWillMount () {
    const {user, privateMessages} = this.state;
    if (user) {
      const lstUsers = orderBy(values(this.props.users), ["name"], ["asc"]);
      const lstPresences = map(this.props.presences, (value, key) => ({
        key,
        ...value
      }));
      this.handleMyNotifsPv(privateMessages, user);
      this.setState({
        users: lstUsers,
        presences: lstPresences
      });
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const {user} = this.state;
    if (nextProps.users !== this.props.users && !isEmpty(nextProps.users)) {
      const lstUsers = orderBy(values(nextProps.users), ["name"], ["asc"]);
      this.setState({users: lstUsers});
    }
    if (nextProps.privateMessages !== this.props.privateMessages) {
      this.handleMyNotifsPv(nextProps.privateMessages, user);
    }
    if (nextProps.notifsPv !== this.props.notifsPv) {
      const path = this.props.routing.location.pathname;
      if (path === "/chat" && !isEmpty(this.props.currentChannel)) {
        const channel = this.props.currentChannel;
        if (includes(map(nextProps.notifsPv, "user"), channel.id)) {
          this.setNotifViewedPv(channel);
        }
      }
    }
    if (nextProps.presences !== this.props.presences && !isEmpty(nextProps.presences)) {
      const lstPresences = map(nextProps.presences, (value, key) => ({
        key,
        ...value
      }));
      this.setState({presences: lstPresences});
    }
  }

  /** Begin notifPv */

  handleMyNotifsPv = (privateMessages, user) => {
    if (has(privateMessages, user.uid)) {
      let notifs = [];
      let notifsToShow = [];
      const toMe = pick(privateMessages, user.uid)[user.uid];
      map(toMe, (val) => {
        const allVuPar = map(val, "vuPar");
        const noVu = reject(allVuPar, user.uid);
        map(noVu, (nvu) => {
          notifs.push({
            user: keys(nvu)[0],
            message: nvu[keys(nvu)].message
          });
        });
      });
      map(groupBy(notifs, "user"), (val, key) => {
        notifsToShow.push({
          user: key,
          messages: map(val, "message"),
          count: val.length
        });
      });
      this.props.setCurrentNotifsPv(notifsToShow);
      this.setState({notifsPv: notifsToShow});
    }
  };

  handleCountNotif = (notifsPv) => {
    const notif = sum(map(notifsPv, "count"));
    let trigger = "";
    if (notif > 0) {
      trigger = (
        <Label
          color="red"
          size="mini"
        >
          {notif}
        </Label>
      );
    }
    return trigger;
  };

  handleCounNotifByUser = (notifsPv, user) => includes(map(notifsPv, "user"), user.uid) && (
    <Label
      color="red"
      size="mini"
    >
      {find(notifsPv, [
        "user",
        user.uid
      ]).count}
    </Label>
  );

  setNotifViewedPv = (channelData) => {
    const {user, notifsPv} = this.state;
    if (includes(map(notifsPv, "user"), channelData.id)) {
      this.props.setNotifViewedPv(user, notifsPv, channelData);
    }
  };

  /** End notifsPv */

  changeChannel = (nextUser) => {
    const {user} = this.state;
    this.props.history.push("/chat");
    const channelData = {
      id: nextUser.uid,
      name: nextUser.name
    };
    this.setNotifViewedPv(channelData);
    this.props.deleteTyping(user.uid);
    this.props.setCurrentChannel(channelData);
    this.props.setPrivateChannel(true);
    this.setActiveChannel(nextUser.uid);
  };

  setActiveChannel = (userId) => {
    this.setState({activeChannel: userId});
  };

  isUserOnline = (uid) => {
    let exist = false;
    find(this.state.presences, (value) => {
      if (value.active && uid === value.key) {
        exist = true;
      }
    });
    return exist;
  };

  timeLastSeeUserOnline = (uid) => {
    let time = "";
    find(this.state.presences, (value) => {
      if (!value.active && uid === value.key) {
        time = moment(value.timestamp).fromNow();
      }
    });
    return time;
  };

  render () {
    const {users, activeChannel, notifsPv} = this.state;
    const trigger = this.handleCountNotif(notifsPv);
    return (
      <Dropdown
        icon="chat"
        item
        simple
        trigger={trigger}
      >
        <Dropdown.Menu
          className="menu"
          key="menu"
        >
          <Menu.Item key="default">
            <span>
              <Icon name="chat" /> CONTACTS
            </span>{" "}
            ({users.length})
          </Menu.Item>
          {map(users, (user, key) => (
            <Menu.Item
              active={user.uid === activeChannel}
              key={key}
              onClick={() => this.changeChannel(user)}
              style={{
                opacity: 0.7,
                fontStyle: "italic"
              }}
            >
              {this.handleCounNotifByUser(notifsPv, user)}
              <Icon
                color={this.isUserOnline(user.uid) ? "green" : "red"}
                name="circle"
              />@ {user.name}
              {!this.isUserOnline(user.uid) && (
                <Label
                  color="orange"
                  name="circle"
                  pointing="left"
                  size="mini"
                  style={{marginLeft: "0.6em"}}
                >
                  {this.timeLastSeeUserOnline(user.uid)}
                </Label>
              )}
            </Menu.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
const mapStateToProps = (state) => ({
  users: state.users,
  presences: state.presences,
  privateMessages: state.privateMessages,
  currentChannel: state.channel.currentChannel,
  notifsPv: state.notifications.notifsPv,
  routing: state.routing
});
DirectMessages.propTypes = {
  currentUser: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  privateMessages: PropTypes.object,
  currentChannel: PropTypes.object,
  notifsPv: PropTypes.array,
  routing: PropTypes.object.isRequired,
  presences: PropTypes.object,
  history: PropTypes.object,
  setCurrentChannel: PropTypes.func.isRequired,
  setPrivateChannel: PropTypes.func.isRequired,
  setNotifViewedPv: PropTypes.func.isRequired,
  deleteTyping: PropTypes.func.isRequired,
  setCurrentNotifsPv: PropTypes.func.isRequired
};
export default withRouter(connect(
  mapStateToProps,
  {
    setCurrentChannel,
    setPrivateChannel,
    setNotifViewedPv,
    deleteTyping,
    setCurrentNotifsPv
  }
)(DirectMessages));
