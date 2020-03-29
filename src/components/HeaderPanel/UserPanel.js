// Addons
import AvatarEditor from "react-avatar-editor";
import {ToastContainer} from "react-toastify";
import {notifyError} from "../../services/notify";
import mime from "mime-types";
// React
import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
// Semantic
import {
  Grid,
  Header,
  Icon,
  Dropdown,
  Image,
  Modal,
  Input,
  Button,
  Dimmer,
  Loader,
  Menu
} from "semantic-ui-react";
// Actions
import {
  setAvatarFirebase,
  setAvatarLocal,
  uploadImage,
  logout
} from "../../actions/usersAction";
// Begin
class UserPanel extends Component {
  constructor (props) {
    super(props);
    this.state = {
      previewImage: "",
      croppedImage: "",
      blob: "",
      uploadedCroppedImage: "",
      modal: false,
      active: false,
      metadata: {contentType: "image/jpeg"},
      uid: this.props.currentUser.uid,
      photoURL: this.props.currentUser.photoURL,
      displayName: this.props.currentUser.displayName,
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
    const {uid} = this.state;
    if (nextProps.users[uid] !== this.props.users[uid]) {
      this.setState({
        photoURL: nextProps.users[uid].avatar,
        displayName: nextProps.users[uid].name,
        active: false
      });
    }
  }

  handleUploadCroppedImage = () => {
    const {uid, blob, metadata} = this.state;
    this.setState({active: true});
    this.props.uploadImage(uid, blob, metadata).then((snap) => {
      snap.ref.getDownloadURL().then((downloadURL) => {
        this.setState({uploadedCroppedImage: downloadURL}, () => this.changeAvatar());
      });
    });
  };

  changeAvatar = () => {
    const {uid, uploadedCroppedImage} = this.state;
    this.props.setAvatarFirebase(uid, uploadedCroppedImage).then(() => {
      this.props.setAvatarLocal(uid, uploadedCroppedImage);
    });
    this.setState({
      previewImage: "",
      croppedImage: "",
      blob: "",
      uploadedCroppedImage: ""
    });
    this.handleCloseModal();
  };

  handleChange = (event) => {
    const {authorized} = this.state;
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
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
    }
  };

  handleSignout = () => {
    const {uid} = this.state;
    this.props.logout(uid);
  };

  handleOpenModal = () => {
    this.setState({modal: true});
  };

  handleCloseModal = () => {
    this.setState({modal: false});
  };

  displayOptions = (displayName) => (
    <Dropdown.Menu className="menu">
      <Menu.Item
        disabled
        key="user"
      >
        <span>
          Signed in as <strong>{displayName}</strong>
        </span>
      </Menu.Item>
      <Menu.Item
        key="avatar"
        onClick={this.handleOpenModal}
      >
        <span>Change Avatar</span>
      </Menu.Item>
      <Menu.Item
        key="signout"
        onClick={this.handleSignout}
      >
        <span>Sign Out</span>
      </Menu.Item>
    </Dropdown.Menu>
  );

  render () {
    const {
      photoURL,
      displayName,
      modal,
      previewImage,
      croppedImage,
      active
    } = this.state;
    const trigger = (
      <span>
        <Image
          avatar
          spaced="right"
          src={photoURL}
        />
        {displayName}
      </span>
    );
    return (
      <div>
        <Dimmer
          active={active}
          page
        >
          <Loader>Patientez un instant...</Loader>
        </Dimmer>
        <Grid>
          <Grid.Column>
            <Grid.Row style={{margin: 0}}>
              {/* User Dropdown  */}
              <Header
                as="h4"
                inverted
                style={{padding: "0.25em"}}
              >
                <Dropdown trigger={trigger}>
                  {this.displayOptions(displayName)}
                </Dropdown>
              </Header>
            </Grid.Row>
            {/* Change User Avatar Modal   */}
            <Modal
              basic
              onClose={this.handleCloseModal}
              open={modal}
            >
              <Modal.Header>Change Avatar</Modal.Header>
              <Modal.Content>
                <ToastContainer />
                <Input
                  fluid
                  label="New Avatar"
                  name="previewImage"
                  onChange={this.handleChange}
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
                          ref={(node) => (this.avatarEditor = node)}
                          scale={1.2}
                          width={120}
                        />
                      )}
                    </Grid.Column>
                    <Grid.Column>
                      {croppedImage && (
                        <Image
                          height={100}
                          src={croppedImage}
                          style={{margin: "3.5em auto"}}
                          width={100}
                        />
                      )}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Modal.Content>
              <Modal.Actions>
                {croppedImage && (
                  <Button
                    color="green"
                    inverted
                    onClick={this.handleUploadCroppedImage}
                  >
                    <Icon name="save" /> Change Avatar
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
                  onClick={this.handleCloseModal}
                >
                  <Icon name="remove" /> Cancel
                </Button>
              </Modal.Actions>
            </Modal>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({users: state.users});
UserPanel.propTypes = {
  currentUser: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
  setAvatarFirebase: PropTypes.func.isRequired,
  setAvatarLocal: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};
export default withRouter(connect(
  mapStateToProps,
  {
    setAvatarFirebase,
    setAvatarLocal,
    uploadImage,
    logout
  }
)(UserPanel));
