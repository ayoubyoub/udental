// Addons
import {isEmpty, map, values, now, includes, filter, keys, toString} from "lodash";
// React
import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
// Semantic
import {Menu, Icon, Modal, Form, Input, Button, Dropdown, Label} from "semantic-ui-react";
// Actions
import {setCurrentChannel, setPrivateChannel} from "../../actions/channelAction";
import {saveChannel} from "../../actions/channelsAction";
import {deleteTyping} from "../../actions/typingAction";
import {setNotifViewedPb} from "../../actions/messagesAction";
import {setCurrentNotifsPb} from "../../actions/notificationsAction";
// Begin
class Channels extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activeChannel: "",
      channelName: "",
      channelDetails: "",
      modal: false,
      firstLoad: true,
      notifsPb: [],
      channels: this.props.channels,
      user: this.props.currentUser,
      publicMessages: this.props.publicMessages
    };
  }

  componentWillMount () {
    const {user, channels, publicMessages} = this.state;
    this.setState({channels: values(channels)});
    this.handleMyNotifsPb(publicMessages, user);
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const {user} = this.state;
    if (nextProps.channels !== this.props.channels) {
      this.setState({channels: values(nextProps.channels)});
    }
    if (nextProps.publicMessages !== this.props.publicMessages) {
      this.handleMyNotifsPb(nextProps.publicMessages, user);
    }
    if (nextProps.notifsPb !== this.props.notifsPb) {
      const path = this.props.routing.location.pathname;
      if (path === "/chat" && !isEmpty(this.props.currentChannel)) {
        this.setNotifViewedPb(this.props.currentChannel);
      }
    }
  }

  /** Begin notifPb */
  // Retourner les notifications non vu par un utilisateur
  handleMyNotifsPb = (publicMessages, user) => {
    let notifs = [];
    map(publicMessages, (channels, key) => {
      let channelID = key;
      map(channels, (message, ind) => {
        let messageId = ind;
        let vu = keys(message.vuPar);
        if (!includes(vu, user.uid)) {
          notifs.push({
            channel: channelID,
            message: messageId,
            vuPar: vu
          });
        }
      });
    });
    this.props.setCurrentNotifsPb(notifs);
    this.setState({notifsPb: notifs});
  };

  // Calcul de tous les notification
  handleCountNotif = (notifsPb) => {
    const notif = notifsPb.length;
    return (
      notif > 0 && (
        <Label
          color="red"
          size="mini"
        >
          {notif}
        </Label>
      )
    );
  };

  // Retourner les notification d'une chaines préciser
  handleCounNotifByChannel = (channelId) => {
    const {notifsPb} = this.state;
    const count = filter(notifsPb, (obj) => {
      if (obj.channel === toString(channelId)) {
        return obj;
      }
    }).length;
    return (
      count > 0 && (
        <Label
          color="red"
          size="mini"
        >
          {count}
        </Label>
      )
    );
  };

  // Si l'utilisateur a vu les notifs en décalre l'action VuPar :)
  setNotifViewedPb = (channelData) => {
    const {user, notifsPb} = this.state;
    const channelID = toString(channelData.id);
    if (includes(map(notifsPb, "channel"), channelID)) {
      this.props.setNotifViewedPb(user, notifsPb, channelID);
    }
  };

  /** End notifsPb */

  setFirstChannel = () => {
    const {channels} = this.state;
    if (this.state.firstLoad && this.state.channels.length > 0) {
      this.props.setCurrentChannel(channels[0]);
      this.setState({activeChannel: channels[0].id});
    }
    this.setState({firstLoad: false});
  };

  addChannel = () => {
    const {channelName, channelDetails, user} = this.state;
    const key = now();
    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: user.uid
    };
    this.props
      .saveChannel(key, newChannel)
      .then(() => {
        this.setState({
          channelName: "",
          channelDetails: ""
        });
        this.handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.channelName && this.state.channelDetails) {
      this.addChannel();
    }
  };

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  changeChannel = (nextChannel) => {
    const {user} = this.state;
    this.props.history.push("/chat");
    this.setNotifViewedPb(nextChannel);
    this.props.deleteTyping(user.uid);
    this.props.setCurrentChannel(nextChannel);
    this.props.setPrivateChannel(false);
    this.setState({activeChannel: nextChannel.id});
  };

  handleOpenModal = () => {
    this.setState({modal: true});
  };

  handleCloseModal = () => {
    this.setState({modal: false});
  };

  render () {
    const {channels, modal, notifsPb} = this.state;
    const trigger = this.handleCountNotif(notifsPb);
    return (
      <React.Fragment>
        <Dropdown
          icon="exchange"
          item
          simple
          trigger={trigger}
        >
          <Dropdown.Menu className="menu">
            <Menu.Item>
              <Icon name="exchange" /> <span>CHANNELS</span> ({channels.length}){" "}
              <Icon
                name="add"
                onClick={this.handleOpenModal}
              />
            </Menu.Item>
            {channels.length > 0 &&
              map(channels, (channel, key) => (
                <Menu.Item
                  active={channel.id === this.state.activeChannel}
                  key={key}
                  name={channel.name}
                  onClick={() => this.changeChannel(channel)}
                  style={{opacity: 0.7}}
                >
                  {this.handleCounNotifByChannel(channel.id)}# {channel.name}
                </Menu.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
        {/* Add Channel Modal */}
        <Modal
          basic
          onClose={this.handleCloseModal}
          open={modal}
        >
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  label="About the Channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="green"
              inverted
              onClick={this.handleSubmit}
            >
              <Icon name="checkmark" /> Add
            </Button>
            <Button
              color="red"
              inverted
              onClick={this.handleCloseModal}
            >
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  channels: state.channels,
  publicMessages: state.messages,
  currentChannel: state.channel.currentChannel,
  notifsPb: state.notifications.notifsPb,
  routing: state.routing
});
Channels.propTypes = {
  currentUser: PropTypes.object.isRequired,
  channels: PropTypes.object,
  publicMessages: PropTypes.object,
  currentChannel: PropTypes.object,
  history: PropTypes.object,
  notifsPb: PropTypes.array,
  routing: PropTypes.object.isRequired,
  setCurrentChannel: PropTypes.func.isRequired,
  setPrivateChannel: PropTypes.func.isRequired,
  saveChannel: PropTypes.func.isRequired,
  setNotifViewedPb: PropTypes.func.isRequired,
  deleteTyping: PropTypes.func.isRequired,
  setCurrentNotifsPb: PropTypes.func.isRequired
};
export default withRouter(connect(
  mapStateToProps,
  {
    setCurrentChannel,
    setPrivateChannel,
    setNotifViewedPb,
    saveChannel,
    deleteTyping,
    setCurrentNotifsPb
  }
)(Channels));
