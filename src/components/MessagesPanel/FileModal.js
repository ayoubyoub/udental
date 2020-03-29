// Addons
import mime from "mime-types";
import {ToastContainer} from "react-toastify";
import {notifyError} from "../../utils/notify";
// React
import React, {Component} from "react";
import PropTypes from "prop-types";
// Semantic
import {Modal, Input, Button, Icon} from "semantic-ui-react";
// Begin
class FileModal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      file: null,
      authorized: [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/bmp",
        "image/gif"
      ]
    };
  }

  handleAddFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      this.setState({file});
    }
  };

  handleSendFile = () => {
    const {file, authorized} = this.state;
    const {uploadFile, closeModal} = this.props;

    if (file !== null) {
      if (authorized.includes(mime.lookup(file.name))) {
        const metadata = {contentType: mime.lookup(file.name)};
        uploadFile(file, metadata);
        closeModal();
        this.clearFile();
      } else {
        notifyError("Désolé, ce type de fichier n'est pas pris en charge.", "top-center");
      }
    }
  };

  clearFile = () => {
    this.setState({file: null});
  };

  render () {
    const {modal, closeModal} = this.props;
    return (
      <Modal
        basic
        onClose={closeModal}
        open={modal}
      >
        <Modal.Header>Select an Image File</Modal.Header>
        <Modal.Content>
          <ToastContainer />
          <Input
            fluid
            label="File types: jpeg, jpg, png, gif, bmp"
            name="file"
            onChange={this.handleAddFile}
            type="file"
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="green"
            inverted
            onClick={this.handleSendFile}
          >
            <Icon name="checkmark" /> Send
          </Button>
          <Button
            color="red"
            inverted
            onClick={closeModal}
          >
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
FileModal.propTypes = {
  uploadFile: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modal: PropTypes.bool.isRequired
};
export default FileModal;
