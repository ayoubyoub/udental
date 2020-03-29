// React
import React from "react";
import PropTypes from "prop-types";
// Begin
const Chat = (props) => <div style={props.contentStyle}>[Chat] Contactez le support ...</div>;
Chat.propTypes = {contentStyle: PropTypes.object.isRequired};
export default Chat;
