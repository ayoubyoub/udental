/* eslint-disable react/prop-types */
// Addons
import {isEmpty} from "lodash";
import AvatarEditor from "react-avatar-editor";
import mime from "mime-types";
import {notifyError} from "../../../services/notify";
import {ToastContainer} from "react-toastify";
// React
import React, {Component} from "react";
import PropTypes from "prop-types";
// Semantic
import {Modal, Button, Grid, Input, Icon, Image, Container} from "semantic-ui-react";
// Images
import defaultImg from "../../../images/default.png";
class ModalPatients extends Component {
  constructor (props) {
    super(props);
    this.state = {
      previewImage: "",
      croppedImage: this.props.image,
      blob: "",
      authorized: [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/bmp",
        "image/gif"
      ]
    };
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    if (nextProps.image !== this.props.image && !isEmpty(nextProps.image)) {
      this.setState({croppedImage: nextProps.image});
    }
  }

  clearAll () {
    this.setState({
      previewImage: "",
      croppedImage: "",
      blob: ""
    });
  }

  handleChangeImage = (event) => {
    const {authorized} = this.state;
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file !== null) {
      if (authorized.includes(mime.lookup(file.name))) {
        reader.readAsDataURL(file);
        reader.addEventListener("load", () => {
          this.setState({previewImage: reader.result});
        });
      } else {
        notifyError("Désolé, ce type de fichier n'est pas pris en charge.", "top-center");
      }
    }
  };

  handleCropImage = () => {
    if (this.avatarEditor) {
      this.avatarEditor.getImageScaledToCanvas().toBlob((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        this.setState({
          croppedImage: imageUrl,
          blob
        });
      });
    } else {
      notifyError("Désolé, rien n'est sélectionné pour l'affichage.", "top-center");
    }
  };

  handleToProps = () => {
    const {blob} = this.state;
    this.props.onHandleImageProps(blob);
  };

  render () {
    const {previewImage, croppedImage} = this.state;
    const {modal, onHandleOpenModal, onHandleCloseModal} = this.props;
    return (
      <div>
        <Container textAlign="center">
          <Image
            avatar
            size="small"
            src={croppedImage ? croppedImage : defaultImg}
          />
        </Container>
        <Container textAlign="center">
          <Button
            color="green"
            inverted
            onClick={onHandleOpenModal}
          >
            Photo
          </Button>
        </Container>
        <Modal
          basic
          onClose={onHandleCloseModal}
          open={modal}
        >
          <Modal.Header>Photo de patient</Modal.Header>
          <Modal.Content>
            {modal && <ToastContainer />}
            <Input
              autoComplete="off"
              fluid
              label="New Photo"
              name="previewImage"
              onChange={this.handleChangeImage}
              type="file"
            />
            <Grid
              centered
              columns={2}
              stackable
            >
              <Grid.Row centered>
                <Grid.Column className="ui center aligned grid">
                  {previewImage && (
                    <AvatarEditor
                      border={50}
                      height={120}
                      image={previewImage}
                      ref={(instance) => {
                        this.avatarEditor = instance;
                      }}
                      scale={1.2}
                      width={120}
                    />
                  )}
                </Grid.Column>
                <Grid.Column>{croppedImage && <Image
                  height={100}
                  src={croppedImage}
                  style={{margin: "3.5em auto"}}
                  width={100}
                />}</Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>
          <Modal.Actions>
            {croppedImage && (
              <Button
                color="green"
                inverted
                onClick={this.handleToProps}
              >
                <Icon name="save" /> Valider
              </Button>
            )}
            <Button
              color="green"
              inverted
              onClick={this.handleCropImage}
            >
              <Icon name="image" /> Preview
            </Button>
            <Button
              color="red"
              inverted
              onClick={onHandleCloseModal}
            >
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
ModalPatients.propTypes = {
  onHandleImageProps: PropTypes.func,
  modal: PropTypes.bool,
  onHandleOpenModal: PropTypes.func,
  onHandleCloseModal: PropTypes.func
};
export default ModalPatients;
