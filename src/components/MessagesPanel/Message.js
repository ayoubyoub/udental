// Addons
import {has} from "lodash";
import moment from "moment";
// React
import React from "react";
import PropTypes from "prop-types";
// Semantic
import {Comment, Image, Icon} from "semantic-ui-react";
// Begin
const isOwnMessage = (message, user) => (message.user.id === user.uid ? "message__self" : "");
const isImage = (message) => message.hasOwnProperty("image") && !message.hasOwnProperty("content");
const timeFromNow = (timestamp) => moment(timestamp).fromNow();
const Message = ({channel, message, user, users}) => (
  <Comment>
    <Comment.Avatar src={users[message.user.id].avatar} />
    <Comment.Content className={isOwnMessage(message, user)}>
      <Comment.Author as="a">{message.user.name}</Comment.Author>
      <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
      {isImage(message) ? <Image
        className="message__image"
        src={message.image}
      /> : <Comment.Text>{message.content}</Comment.Text>}
      <Comment.Actions>
        <Comment.Action>
          {has(message.vuPar, channel.id) && message.user.id === user.uid && (
            <div>
              <Icon
                color="green"
                name="eye"
              /> Vu {timeFromNow(message.vuPar[channel.id].timestamp)}
            </div>
          )}
        </Comment.Action>
      </Comment.Actions>
    </Comment.Content>
  </Comment>
);
Message.propTypes = {
  user: PropTypes.object.isRequired,
  channel: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired
};
export default Message;
