// Addons
import {isEmpty, map, now, filter} from "lodash";
import {withNamespaces} from "react-i18next";
import {SketchPicker} from "react-color";
import PropTypes from "prop-types";
// React
import React, {Component} from "react";
import {connect} from "react-redux";
// Semantic
import {
  Icon,
  Divider,
  Modal,
  Segment,
  Label,
  Button,
  Grid,
  List,
  Popup
} from "semantic-ui-react";
// Actions
import {editColors, setColors, deleteParam} from "../../actions/paramsAction";
// Begin
class ColorModal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      modal: false,
      primaryColor: "#fff",
      secondaryColor: "#fff"
    };
  }

  handleChangePrimary = (color) => {
    this.setState({primaryColor: color.hex});
  };

  handleChangeSecondary = (color) => {
    this.setState({secondaryColor: color.hex});
  };

  handleSaveColors = (event) => {
    event.preventDefault();
    const {primaryColor, secondaryColor} = this.state;
    if (!isEmpty(primaryColor) && !isEmpty(secondaryColor)) {
      this.saveColors(primaryColor, secondaryColor);
    }
  };

  // Save colors
  saveColors = (primaryColor, secondaryColor) => {
    const {currentUser} = this.props;
    const uid = currentUser.uid;
    const key = now();
    const color = {
      primaryColor,
      secondaryColor,
      active: false,
      id: key
    };
    this.props.editColors(uid, key, color);
  };

  handleChangeColor = (newKey) => {
    const {currentUser, colors} = this.props;
    const activeColor = filter(colors, (clr) => clr.active);
    const oldKey = activeColor[0].id;
    this.props.setColors(
      currentUser.uid,
      newKey,
      oldKey
    );
    this.handleCloseModal();
  }

  // Render colors
  renderColors = (colors) => (<Segment
    inverted
  >
    <List
      horizontal
      relaxed
    >
      {
        map(colors, (color, key) => (
          <List.Item key={key} >
            {!color.active ? (
              <Button
                color="red"
                icon="remove"
                inverted
                onClick={() => this.props.deleteParam(this.props.currentUser.uid, key)
                }
                size="mini"
              />
            ) : (
              <Button
                color="green"
                icon="star"
                inverted
                size="mini"
              />
            )}
            <List.Content onClick={() => {
              if (!color.active) {
                this.handleChangeColor(key);
              }
            }}
            >
              <div className="color__container">
                <div
                  className="color__square"
                  style={{background: color.primaryColor}}
                >
                  <div
                    className="color__overlay"
                    style={{background: color.secondaryColor}}
                  />
                </div>
              </div>
            </List.Content>
          </List.Item>
        ))
      }
    </List></Segment>
  )

  handleOpenModal = () => {
    this.setState({modal: true});
  };

  handleCloseModal = () => {
    this.setState({modal: false});
  };

  handlePrimary = () => {
    const {primaryColor} = this.state;
    const {t} = this.props;
    return (<Grid.Column>
      <Segment
        inverted
      >
        <Label
          content={t("t000010")}
          style={{marginBottom: "0.5em"}}
        />
        <SketchPicker
          color={primaryColor}
          onChangeComplete={this.handleChangePrimary}
          width="150"
        />
      </Segment>
    </Grid.Column>);
  }

  handleSecondary = () => {
    const {secondaryColor} = this.state;
    const {t} = this.props;
    return (<Grid.Column>
      <Segment
        inverted
      >
        <Label
          content={t("t000011")}
          style={{marginBottom: "0.5em"}}
        />
        <SketchPicker
          color={secondaryColor}
          onChangeComplete={this.handleChangeSecondary}
          width="150"
        />
      </Segment>
    </Grid.Column>);
  }

  renderButton () {
    const {t, colors} = this.props;
    const activeColor = filter(colors, (color) => color.active);
    return (
      <Popup
        content={t("t000012")}
        inverted
        trigger={<div
          className="color__container"
          onClick={this.handleOpenModal}
        >
          <div
            className="color__square"
            style={{background: activeColor[0].primaryColor}}
          >
            <div
              className="color__overlay"
              style={{background: activeColor[0].secondaryColor}}
            />
          </div>
        </div>}
      />
    );
  }

  renderActions () {
    const {t} = this.props;
    return (<Modal.Actions style={{float: t("dexif")}}>
      <Button
        color="green"
        floated={t("fixed")}
        inverted
        onClick={this.handleSaveColors}
      >
        <Icon name="checkmark" /> {t("t000007")}
      </Button>
      <Button
        color="red"
        floated={t("dexif")}
        inverted
        onClick={this.handleCloseModal}
      >
        <Icon name="remove" /> {t("t000008")}
      </Button>
    </Modal.Actions>);
  }

  renderHeader () {
    const {t} = this.props;
    return (
      <Modal.Header style={{float: t("fixed")}}>{t("t000009")}</Modal.Header>
    );
  }

  render () {
    const {t, colors} = this.props;
    const {modal} = this.state;
    if (t("lang") === "AR") {
      return (
        <div>
          <Divider />
          {this.renderButton()}
          <Modal
            basic
            onClose={this.handleCloseModal}
            open={modal}
          >
            {this.renderHeader()}
            <Modal.Content className="colorm">
              {this.renderColors(colors)}
              <Grid divided="vertically">
                <Grid.Row columns={2}>
                  {this.handleSecondary()}
                  {this.handlePrimary()}
                </Grid.Row>
              </Grid>
            </Modal.Content>
            {this.renderActions()}
          </Modal>
        </div>
      );
    } return (
      <div>
        <Divider />
        {this.renderButton()}
        <Modal
          basic
          onClose={this.handleCloseModal}
          open={modal}
        >
          {this.renderHeader()}
          <Modal.Content className="colorm">
            {this.renderColors(colors)}
            <Grid divided="vertically">
              <Grid.Row columns={2}>
                {this.handlePrimary()}
                {this.handleSecondary()}
              </Grid.Row>
            </Grid>
          </Modal.Content>
          {this.renderActions()}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  colors: state.params.colors
});

ColorModal.propTypes = {
  editColors: PropTypes.func.isRequired,
  setColors: PropTypes.func.isRequired,
  deleteParam: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  colors: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  {
    editColors,
    setColors,
    deleteParam
  }
)(withNamespaces()(ColorModal));
