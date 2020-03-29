// React
import React from "react";
import {connect} from "react-redux";
import {Grid} from "semantic-ui-react";
import PropTypes from "prop-types";
// Components
import Messages from "./Messages";
import MetaPanel from "../MetaPanel/MetaPanel";
// Begin
const Chat = (props) => {
  const {publicMessages, privateMessages, users, typing, currentUser, currentChannel, isPrivateChannel, userPosts} = props;
  return (
    <Grid
      columns={1}
      divided
    >
      <Grid.Row>
        <Grid.Column>
          <Messages
            currentChannel={currentChannel}
            currentUser={currentUser}
            isPrivateChannel={isPrivateChannel}
            key={currentChannel && currentChannel.id}
            privateMessages={privateMessages}
            publicMessages={publicMessages}
            typing={typing}
            users={users}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <MetaPanel
            currentChannel={currentChannel}
            isPrivateChannel={isPrivateChannel}
            key={currentChannel && currentChannel.name}
            userPosts={userPosts}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel,
  userPosts: state.channel.userPosts,
  publicMessages: state.messages,
  privateMessages: state.privateMessages,
  users: state.users,
  typing: state.typing
});
Chat.propTypes = {
  currentUser: PropTypes.object.isRequired,
  currentChannel: PropTypes.object,
  isPrivateChannel: PropTypes.bool.isRequired,
  userPosts: PropTypes.object,
  publicMessages: PropTypes.object,
  privateMessages: PropTypes.object,
  users: PropTypes.object.isRequired,
  typing: PropTypes.object
};
export default connect(mapStateToProps)(Chat);
