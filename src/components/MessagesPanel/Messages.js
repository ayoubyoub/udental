// Addons
import {isEmpty, includes, keys, has, values, union, orderBy, map} from "lodash";
// React
import React, {Component} from "react";
import {Element, scroller} from "react-scroll";
import {Segment, Comment, Dimmer, Header, Icon} from "semantic-ui-react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
// Actions
import {setUserPosts} from "../../actions/channelAction";
import {setStarred} from "../../actions/channelsAction";
// Components
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import Message from "./Message";
import Typing from "./Typing";
import Skeleton from "./Skeleton";
// Begin
class Messages extends Component {
  constructor (props) {
    super(props);
    this.state = {
      skeletonNBR: 10,
      numUniqueUsers: "",
      searchTerm: "",
      messagesLoading: true,
      isChannelStarred: false,
      searchLoading: false,
      searchResults: [],
      typingUsers: [],
      messages: [],
      user: this.props.currentUser,
      channel: this.props.currentChannel,
      isPrivateChannel: this.props.isPrivateChannel,
      publicMessages: this.props.publicMessages,
      privateMessages: this.props.privateMessages,
      typing: this.props.typing
    };
  }

  componentDidMount () {
    const {channel, isPrivateChannel, publicMessages, privateMessages, typing} = this.state;
    if (channel) {
      // Cette fonctionnalité permet de retourner les messages d'une channel donnée
      if (isPrivateChannel) {
        this.handleMessages(channel.id, privateMessages);
      } else {
        this.handleMessages(channel.id, publicMessages);
      }
      // Cette fonctionnalité permet de retourner si la channel est en mode star
      this.isChannelStarted(channel);
      // Cette fonctionnalité permet de retourner les typings dans channel
      this.handleTyping(channel.id, typing);
    }
  }

  componentWillReceiveProps (nextProps) {
    const {channel, isPrivateChannel} = this.state;
    if (channel) {
      if (nextProps.typing !== this.props.typing) {
        this.handleTyping(channel.id, nextProps.typing);
      }
      if (isPrivateChannel && this.props.privateMessages !== nextProps.privateMessages) {
        this.handleMessages(channel.id, nextProps.privateMessages);
      }
      if (!isPrivateChannel && this.props.publicMessages !== nextProps.publicMessages) {
        this.handleMessages(channel.id, nextProps.publicMessages);
      }
    }
  }

  componentDidUpdate () {
    // Bottom plz ;) P.S : j'aurai besoin de préparer un algorithme pour améliorer cette fonctionnalité
    this.scrollToBottom();
  }

  scrollToBottom () {
    scroller.scrollTo("handleBottom", {
      delay: 100,
      duration: 1500,
      smooth: true,
      offset: 50,
      containerId: "handleElements"
    });
  }

  handleMessages = (channelId, message) => {
    const {isPrivateChannel} = this.state;
    let loadedMessages = [];
    if (isPrivateChannel) {
      loadedMessages = this.getPrivateMessages(channelId, message);
    } else {
      loadedMessages = this.getPublicMessages(channelId, message);
    }
    this.setState({
      messages: loadedMessages,
      messagesLoading: !(loadedMessages.length > 0)
    });
    this.countUniqueUsers(loadedMessages);
    this.countUserPosts(loadedMessages);
  };

  // Channel Public
  getPublicMessages = (channelId, publicMessages) => {
    let messages = [];
    if (has(publicMessages, channelId)) {
      messages = orderBy(publicMessages[channelId], ["timestamp"], ["asc"]);
    }
    return messages;
  };

  // Channel Privé
  getPrivateMessages = (channelId, privateMessages) => {
    const {user} = this.state;
    let fromUser = [];
    let toUser = [];
    if (has(privateMessages, user.uid) && includes(keys(privateMessages), user.uid)) {
      fromUser = values(privateMessages[user.uid][channelId]);
    }
    if (has(privateMessages, channelId) && includes(keys(privateMessages), channelId)) {
      toUser = values(privateMessages[channelId][user.uid]);
    }
    const unionAll = union(fromUser, toUser);
    const orderByTime = orderBy(unionAll, ["timestamp"], ["asc"]);
    return orderByTime;
  };

  handleTyping = (channelId, typing) => {
    const {isPrivateChannel, user} = this.state;
    this.setState({typingUsers: ""});
    if (!isEmpty(typing)) {
      const usersTyping = [];
      if (!isPrivateChannel) {
        map(typing, (value) => {
          if (!isEmpty(value[channelId])) {
            const type = value[channelId].typing;
            usersTyping.push(type);
          }
        });
      } else {
        if (!isEmpty(typing[user.uid])) {
          usersTyping.push(values(typing[user.uid][channelId]));
        }
        if (!isEmpty(typing[channelId])) {
          usersTyping.push(values(typing[channelId][user.uid]));
        }
      }
      this.setState({typingUsers: usersTyping});
    }
  };

  isChannelStarted = (channel) => {
    const {user} = this.state;
    const starredBy = "starredBy";
    if (has(channel, starredBy)) {
      this.setState({isChannelStarred: has(channel.starredBy, user.uid)});
    }
  };

  handleStar = () => {
    this.setState((prevState) => ({isChannelStarred: !prevState.isChannelStarred}), () => this.starChannel());
  };

  starChannel = () => {
    const {user, channel, isChannelStarred} = this.state;
    this.props.setStarred(user, channel, isChannelStarred);
  };

  handleSearchChange = (event) => {
    this.setState(
      {
        searchTerm: event.target.value,
        searchLoading: Boolean(!isEmpty(event.target.value))
      },
      () => this.handleSearchMessages()
    );
  };

  handleSearchMessages = () => {
    const {messages} = this.state;
    const inTimeof = 1000;
    if (!isEmpty(messages)) {
      const channelMessages = [...messages];
      const regex = new RegExp(this.state.searchTerm, "gi");
      const searchResults = channelMessages.reduce((acc, message) => {
        if ((message.content && message.content.match(regex)) || message.user.name.match(regex)) {
          acc.push(message);
        }
        return acc;
      }, []);
      this.setState({searchResults});
      setTimeout(() => this.setState({searchLoading: false}), inTimeof);
    }
  };

  countUniqueUsers = (messages) => {
    const uniqueUsers = messages.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name);
      }
      return acc;
    }, []);
    const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0;
    const numUniqueUsers = `${uniqueUsers.length} user${plural ? "s" : ""}`;
    this.setState({numUniqueUsers});
  };

  countUserPosts = (messages) => {
    const userPosts = messages.reduce((acc, message) => {
      if (message.user.name in acc) {
        acc[message.user.name].count += 1;
      } else {
        acc[message.user.name] = {
          user: message.user.id,
          channel: this.state.channel.id,
          count: 1
        };
      }
      return acc;
    }, {});
    this.props.setUserPosts(userPosts);
  };

  displayMessages = (messages) => !isEmpty(messages) &&
    map(messages, (message, key) => (
      <div key={key}>
        <Message
          channel={this.state.channel}
          key={key}
          message={message}
          user={this.state.user}
          users={this.props.users}
        />
      </div>
    ));

  displayTypings = (typingUsers) => {
    const {user} = this.state;
    return (
      !isEmpty(typingUsers) &&
      map(
        typingUsers,
        (value, key) => !isEmpty(value) &&
          !includes(value, user.displayName) &&
          (
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "0.2em"
              }}
            >
              <span className="user__typing">{value} is typing</span> <Typing />
            </div>
          )
      )
    );
  };

  displayChannelName = (channel) => (channel ? `${this.state.isPrivateChannel ? "@" : "#"}${channel.name}` : "");

  render () {
    const {
      messages,
      channel,
      user,
      numUniqueUsers,
      searchTerm,
      searchResults,
      searchLoading,
      isPrivateChannel,
      isChannelStarred,
      messagesLoading,
      typingUsers,
      skeletonNBR
    } = this.state;
    return (
      <React.Fragment>
        <MessagesHeader
          channelName={this.displayChannelName(channel)}
          isChannelStarred={isChannelStarred}
          isPrivateChannel={isPrivateChannel}
          numUniqueUsers={numUniqueUsers}
          onHandleSearchChange={this.handleSearchChange}
          onHandleStar={this.handleStar}
          searchLoading={searchLoading}
        />
        <Segment>
          <Dimmer active={Boolean(isEmpty(channel))}>
            <Header
              as="h2"
              icon
              inverted
            >
              <Icon name="heart" />
              Bonjour au Chat !<Header.Subheader>Sélectionnez votre destination ... </Header.Subheader>
            </Header>
          </Dimmer>
          <Element
            className="element"
            id="handleElements"
            name="momElement"
            style={{
              position: "relative",
              height: "400px",
              overflow: "auto",
              marginBottom: "30px"
            }}
          >
            <Comment.Group>
              {messagesLoading ? (
                <React.Fragment>
                  {[...Array(skeletonNBR)].map((val, ind) => (
                    <Skeleton key={ind} />
                  ))}
                </React.Fragment>
              ) : null}
              {searchTerm ? this.displayMessages(searchResults) : this.displayMessages(messages)}
              {this.displayTypings(typingUsers)}
            </Comment.Group>
            <Element
              className="element"
              name="handleBottom"
            />
          </Element>
          <MessageForm
            currentChannel={channel}
            currentUser={user}
            isPrivateChannel={isPrivateChannel}
          />
        </Segment>
      </React.Fragment>
    );
  }
}
Messages.propTypes = {
  currentUser: PropTypes.object.isRequired,
  currentChannel: PropTypes.object,
  users: PropTypes.object.isRequired,
  publicMessages: PropTypes.object,
  privateMessages: PropTypes.object,
  typing: PropTypes.object,
  setStarred: PropTypes.func.isRequired,
  setUserPosts: PropTypes.func.isRequired,
  isPrivateChannel: PropTypes.bool.isRequired
};
export default connect(
  null,
  {
    setUserPosts,
    setStarred
  }
)(Messages);
