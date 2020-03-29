// Addons
import {isEmpty, has, map} from "lodash";
// React
import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
// Semantic
import {Menu, Dropdown, Icon} from "semantic-ui-react";
// Actions
import {setCurrentChannel, setPrivateChannel} from "../../actions/channelAction";
import {deleteTyping} from "../../actions/typingAction";
// Begin
class Starred extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activeChannel: "",
      starredChannels: [],
      user: this.props.currentUser,
      channels: this.props.channels
    };
  }

  componentDidMount () {
    const {user, channels} = this.state;
    if (!isEmpty(user)) {
      this.getStarred(channels, user.uid);
    }
  }

  componentWillReceiveProps (nextProps) {
    const {user} = this.state;
    if (nextProps.channels !== this.props.channels) {
      this.getStarred(nextProps.channels, user.uid);
    }
  }

  getStarred = (channels, userUid) => {
    const channelsStarred = [];
    map(channels, (val) => {
      if (has(val, "starredBy")) {
        if (has(val.starredBy, userUid)) {
          channelsStarred.push(val);
        }
      }
    });
    this.setState({starredChannels: channelsStarred});
  };

  setActiveChannel = (channel) => {
    this.setState({activeChannel: channel.id});
  };

  changeChannel = (channel) => {
    const {user} = this.state;
    this.props.history.push("/chat");
    this.props.deleteTyping(user.uid);
    this.setActiveChannel(channel);
    this.props.setCurrentChannel(channel);
    this.props.setPrivateChannel(false);
  };

  displayChannels = (starredChannels) => starredChannels.length > 0 &&
    starredChannels.map((channel) => (
      <Menu.Item
        active={channel.id === this.state.activeChannel}
        key={channel.id}
        name={channel.name}
        onClick={() => this.changeChannel(channel)}
        style={{opacity: 0.7}}
      >
        # {channel.name}
      </Menu.Item>
    ));

  render () {
    const {starredChannels} = this.state;
    return (
      <Dropdown
        icon="star"
        item
        simple
      >
        <Dropdown.Menu className="menu">
          <Menu.Item>
            <Icon name="star" />
            <span>FAVORIS</span> ({starredChannels.length})
          </Menu.Item>
          {this.displayChannels(starredChannels)}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
const mapStateToProps = (state) => ({channels: state.channels});
Starred.propTypes = {
  currentUser: PropTypes.object.isRequired,
  channels: PropTypes.object,
  history: PropTypes.object,
  deleteTyping: PropTypes.func.isRequired,
  setCurrentChannel: PropTypes.func.isRequired,
  setPrivateChannel: PropTypes.func.isRequired
};
export default withRouter(connect(
  mapStateToProps,
  {
    setCurrentChannel,
    setPrivateChannel,
    deleteTyping
  }
)(Starred));
