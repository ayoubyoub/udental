// Addons
import {isEmpty, trim, now} from "lodash";
import uuidv4 from "uuid/v4";
import {Picker, emojiIndex} from "emoji-mart";
// React
import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
// Semantic
import {Segment, Button, Input} from "semantic-ui-react";
// Actions
import {
  saveMessages,
  savePrivateMessages,
  setUploadTask
} from "../../actions/messagesAction";
import {saveTyping, deleteTyping} from "../../actions/typingAction";
// Components
import FileModal from "./FileModal";
import ProgressBar from "./ProgressBar";
// Begin
class MessageForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      percentUploaded: 0,
      uploadState: "",
      message: "",
      loading: false,
      modal: false,
      emojiPicker: false,
      errors: [],
      uploadTask: null,
      user: this.props.currentUser,
      channel: this.props.currentChannel,
      isPrivate: this.props.isPrivateChannel
    };
  }

  componentWillUnmount () {
    if (this.state.uploadTask !== null) {
      this.state.uploadTask.cancel();
      this.setState({uploadTask: null});
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleKeyUp = (event) => {
    const {message, channel, user} = this.state;
    if (event.key === "Enter") {
      this.handleSendMessage();
    }
    if (!isEmpty(message)) {
      this.props.saveTyping(user.uid, channel.id, user.displayName);
    } else {
      this.props.deleteTyping(user.uid);
    }
  };

  handleTogglePicker = () => {
    this.setState({emojiPicker: !this.state.emojiPicker});
  };

  handleAddEmoji = (emoji) => {
    const oldMessage = this.state.message;
    const newMessage = this.colonToUnicode(` ${oldMessage} ${emoji.colons} `);
    this.setState({
      message: newMessage,
      emojiPicker: false
    });
    setTimeout(() => this.messageInputRef.focus(), 0);
  };

  colonToUnicode = (message) => message.replace(/:[A-Za-z0-9_+-]+:/g, (xpl) => {
    xpl = xpl.replace(/:/g, "");
    const emoji = emojiIndex.emojis[xpl];
    if (typeof emoji !== "undefined") {
      const unicode = emoji.native;
      if (typeof unicode !== "undefined") {
        return unicode;
      }
    }
    xpl = `:${xpl}:`;
    return xpl;
  });

  createMessage = (fileUrl = null) => {
    const {channel, isPrivate} = this.state;
    const idMessage = now();
    const message = {
      timestamp: idMessage,
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName
      },
      vuPar: {
        [this.state.user.uid]: {
          timestamp: idMessage,
          name: this.state.user.displayName,
          message: !isPrivate ? channel.id : idMessage
        }
      }
    };
    if (fileUrl !== null) {
      message.image = fileUrl;
    } else {
      message.content = this.state.message;
    }
    return {[idMessage]: message};
  };

  handleSendMessage = () => {
    const {user, message, channel, isPrivate} = this.state;
    if (!isEmpty(trim(message))) {
      this.setState({loading: true});
      if (isPrivate) {
        this.props
          .savePrivateMessages(channel.id, user.uid, this.createMessage())
          .then(() => {
            this.setState({
              loading: false,
              message: "",
              errors: []
            });
            this.props.deleteTyping(user.uid);
          })
          .catch((err) => {
            console.error(err);
            this.setState({
              loading: false,
              errors: this.state.errors.concat(err)
            });
          });
      } else {
        this.props
          .saveMessages(channel.id, this.createMessage())
          .then(() => {
            this.setState({
              loading: false,
              message: "",
              errors: []
            });
            this.props.deleteTyping(user.uid);
          })
          .catch((err) => {
            console.error(err);
            this.setState({
              loading: false,
              errors: this.state.errors.concat(err)
            });
          });
      }
    } else {
      this.setState({
        message: "",
        errors: this.state.errors.concat({message: "Add a message"})
      });
    }
  };

  getPath = () => {
    if (this.state.isPrivate) {
      return `chat/private/${this.state.channel.id}`;
    }
    return "chat/public";
  };

  uploadFile = (file, metadata) => {
    const pathToUpload = this.state.channel.id;
    const filePath = `${this.getPath()}/${uuidv4()}.jpg`;
    const cent = 100;

    this.setState(
      {
        uploadState: "uploading",
        uploadTask: this.props.setUploadTask(filePath, file, metadata)
      },
      () => {
        this.state.uploadTask.on(
          "state_changed",
          (snap) => {
            const percentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * cent);
            this.setState({percentUploaded});
          },
          (err) => {
            console.error(err);
            this.setState({
              errors: this.state.errors.concat(err),
              uploadState: "error",
              uploadTask: null
            });
          },
          () => {
            this.state.uploadTask.snapshot.ref
              .getDownloadURL()
              .then((downloadUrl) => {
                this.sendFileMessage(downloadUrl, pathToUpload);
              })
              .catch((err) => {
                console.error(err);
                this.setState({
                  errors: this.state.errors.concat(err),
                  uploadState: "error",
                  uploadTask: null
                });
              });
          }
        );
      }
    );
  };

  sendFileMessage = (fileUrl, pathToUpload) => {
    const {isPrivate, user} = this.state;
    if (isPrivate) {
      this.props
        .savePrivateMessages(
          pathToUpload,
          user.uid,
          this.createMessage(fileUrl)
        )
        .then(() => {
          this.setState({uploadState: "done"});
        })
        .catch((err) => {
          console.error(err);
          this.setState({errors: this.state.errors.concat(err)});
        });
    } else {
      this.props
        .saveMessages(pathToUpload, this.createMessage(fileUrl))
        .then(() => {
          this.setState({uploadState: "done"});
        })
        .catch((err) => {
          console.error(err);
          this.setState({errors: this.state.errors.concat(err)});
        });
    }
  };

  handleOpenModal = () => {
    this.setState({modal: true});
  };

  handlerCloseModal = () => {
    this.setState({modal: false});
  };

  render () {
    const {
      errors,
      message,
      loading,
      modal,
      uploadState,
      percentUploaded,
      emojiPicker
    } = this.state;
    return (
      <Segment
        className="message__form"
      >
        {emojiPicker && (
          <Picker
            className="emojipicker"
            emoji="point_up"
            onSelect={this.handleAddEmoji}
            set="facebook"
            title="Pick your emoji"
          />
        )}
        <Input
          autoComplete="off"
          className={
            errors.some((error) => error.message.includes("message"))
              ? "error"
              : ""
          }
          fluid
          label={
            <Button
              content={emojiPicker ? "Close" : null}
              icon={emojiPicker ? "close" : "add"}
              onClick={this.handleTogglePicker}
            />
          }
          labelPosition="left"
          name="message"
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          placeholder="Write your message"
          ref={(node) => (this.messageInputRef = node)}
          style={{marginBottom: "0.7em"}}
          value={message}
        />
        <Button.Group
          icon
          widths="2"
        >
          <Button
            color="orange"
            content="Send"
            disabled={loading}
            icon="edit"
            labelPosition="left"
            onClick={this.handleSendMessage}
          />
          <Button
            color="teal"
            content="Upload"
            disabled={uploadState === "uploading"}
            icon="cloud upload"
            labelPosition="right"
            onClick={this.handleOpenModal}
          />
        </Button.Group>
        <FileModal
          closeModal={this.handlerCloseModal}
          modal={modal}
          uploadFile={this.uploadFile}
        />
        <ProgressBar
          percentUploaded={percentUploaded}
          uploadState={uploadState}
        />
      </Segment>
    );
  }
}
MessageForm.propTypes = {
  currentUser: PropTypes.object.isRequired,
  currentChannel: PropTypes.object,
  isPrivateChannel: PropTypes.bool.isRequired,
  saveMessages: PropTypes.func.isRequired,
  savePrivateMessages: PropTypes.func.isRequired,
  setUploadTask: PropTypes.func.isRequired,
  saveTyping: PropTypes.func.isRequired,
  deleteTyping: PropTypes.func.isRequired
};
export default connect(
  null,
  {
    saveMessages,
    savePrivateMessages,
    setUploadTask,
    saveTyping,
    deleteTyping
  }
)(MessageForm);
