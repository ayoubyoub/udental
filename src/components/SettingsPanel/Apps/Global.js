// Addons
/* eslint-disable */
import { isEmpty } from "lodash";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer } from "react-toastify";
// React
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Actions
import { generalSetting } from "../../../actions/settingsAction";
// Semantic
import { Segment, Form, Modal, Icon, Item, Input, Button, Popup } from "semantic-ui-react";
// Begin
class Global extends Component {
  constructor(props) {
    super(props);
    this.state = {
      app: "",
      isCopiedApp: false,
      apiKey: "",
      isCopiedApiKey: false,
      calendarUrl: "",
      isCopiedCalendarUrl: false,
      myText: "",
      myValue: "",
      isModal: false
    };
  }
  componentDidMount() {
    this.getSettings(this.props.settings);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.settings !== this.props.settings) {
      this.getSettings(nextProps.settings);
    }
  }

  getSettings = settings => {
    const { general } = settings;
    this.setState({ app: general.app, apiKey: general.api, calendarUrl: general.calendar_url });
  };

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  onCopyOpen = from => {
    switch (from) {
      case "isCopiedApp":
        this.setState({ isCopiedApp: true });
        this.timeout = setTimeout(() => {
          this.setState({ isCopiedApp: false });
        }, 1000);
        break;
      case "isCopiedApiKey":
        this.setState({ isCopiedApiKey: true });
        this.timeout = setTimeout(() => {
          this.setState({ isCopiedApiKey: false });
        }, 1000);
        break;
      case "isCopiedCalendarUrl":
        this.setState({ isCopiedCalendarUrl: true });
        this.timeout = setTimeout(() => {
          this.setState({ isCopiedCalendarUrl: false });
        }, 1000);
        break;
      default:
        break;
    }
  };
  handleOpenModal = from => {
    const { apiKey, calendarUrl } = this.state;
    let myValue = "";
    switch (from) {
      case "API KEY":
        this.setState({ myText: from, myValue: apiKey, isModal: true });
        break;
      case "Calendar URL":
        this.setState({ myText: from, myValue: calendarUrl, isModal: true });
        break;
      default:
        break;
    }
  };
  handleClose = () => {
    this.setState({ myText: "", myValue: "", isModal: false });
  };
  handleSubmit = () => {
    const { myText, myValue } = this.state;
    if (!isEmpty(myValue)) {
      let setting = "";
      switch (myText) {
        case "API KEY":
          setting = { api: myValue };
          break;
        case "Calendar URL":
          setting = { calendar_url: myValue };
          break;
        default:
          break;
      }
      this.props.generalSetting(setting).then(() => {
        this.props.notifyEdit("🚀 La modification a été effectué.", "top-center");
      });
      this.handleClose();
    }
  };
  render() {
    const { isModal, isCopiedApp, isCopiedApiKey, isCopiedCalendarUrl, app, apiKey, calendarUrl, myText, myValue } = this.state;
    return (
      <Segment padded>
        <Item.Group divided>
          <Item>
            <Item.Content>
              <Item.Header as="a">
                <Icon name="globe" />
                ID Application
              </Item.Header>
              <Item.Description>
                <Input
                  labelPosition="right"
                  fluid
                  value={app}
                  name="app"
                  label={
                    <Popup
                      inverted
                      trigger={
                        <CopyToClipboard text={app} onCopy={() => this.onCopyOpen("isCopiedApp")}>
                          <Button color="teal" labelPosition="right" icon="copy" content="Copy" />
                        </CopyToClipboard>
                      }
                      content="Copied!"
                      on="click"
                      open={isCopiedApp}
                      onClose={() => this.onCopyClose("isCopiedApp")}
                      position="top right"
                    />
                  }
                />
              </Item.Description>
            </Item.Content>
          </Item>
          <Item>
            <Item.Content>
              <Item.Header as="a">
                <Icon name="google" />
                API KEY
              </Item.Header>
              <Item.Description>
                <Input
                  labelPosition="right"
                  fluid
                  value={apiKey}
                  name="apiKey"
                  label={
                    <Popup
                      inverted
                      trigger={
                        <CopyToClipboard text={apiKey} onCopy={() => this.onCopyOpen("isCopiedApiKey")}>
                          <Button color="teal" labelPosition="right" icon="copy" content="Copy" />
                        </CopyToClipboard>
                      }
                      content="Copied!"
                      on="click"
                      open={isCopiedApiKey}
                      onClose={() => this.onCopyClose("isCopiedApiKey")}
                      position="top right"
                    />
                  }
                />
              </Item.Description>
              <Item.Extra>
                <Button icon="edit" content="Edit" onClick={() => this.handleOpenModal("API KEY")} />
              </Item.Extra>
            </Item.Content>
          </Item>
          <Item>
            <Item.Content>
              <Item.Header as="a">
                <Icon name="calendar alternate outline" />
                Calendar URL
              </Item.Header>
              <Item.Description>
                <Input
                  labelPosition="right"
                  fluid
                  value={calendarUrl}
                  name="calendarUrl"
                  label={
                    <Popup
                      inverted
                      trigger={
                        <CopyToClipboard text={calendarUrl} onCopy={() => this.onCopyOpen("isCopiedCalendarUrl")}>
                          <Button color="teal" labelPosition="right" icon="copy" content="Copy" />
                        </CopyToClipboard>
                      }
                      content="Copied!"
                      on="click"
                      open={isCopiedCalendarUrl}
                      onClose={() => this.onCopyClose("isCopiedCalendarUrl")}
                      position="top right"
                    />
                  }
                />
              </Item.Description>
              <Item.Extra>
                <Button icon="edit" content="Edit" onClick={() => this.handleOpenModal("Calendar URL")} />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
        <Modal basic onClose={this.handleClose} open={isModal}>
          <Modal.Header>Edit</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input fluid label={myText} name="myValue" value={myValue} type="text" onChange={this.handleChange} />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" />
              Save
            </Button>
            <Button color="red" inverted onClick={this.handleClose}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </Segment>
    );
  }
}
const mapStateToProps = state => ({ settings: state.settings });
export default connect(
  mapStateToProps,
  { generalSetting }
)(Global);
