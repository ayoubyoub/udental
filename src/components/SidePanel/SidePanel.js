// React
import React, {Component} from "react";
import {withNamespaces} from "react-i18next";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
// Semantic
import {Menu, Button, Divider, Popup} from "semantic-ui-react";
// Actions
import {logout} from "../../actions/usersAction";
// Components
import ColorModal from "./ColorModal";
import LangModal from "./LangModal";
// Begin
class SidePanel extends Component {
  handleSignout = () => {
    this.props.logout(this.props.currentUser.uid);
  };

  handleSettings = () => {
    this.props.history.push("/settings");
  };

  render () {
    const {t, primaryColor, visible, onHandleShowClick} = this.props;
    return (
      <Menu
        className="sidePanel"
        fixed={t("fixed")}
        inverted
        size="mini"
        style={{
          background: primaryColor,
          fontSize: "0.8rem"
        }}
        vertical
      >
        <Popup
          content={t("t000004")}
          inverted
          trigger={<Button
            className="MenuButton"
            color="blue"
            disabled={visible}
            icon="th list"
            onClick={onHandleShowClick}
            size="small"
          />}
        />

        <Divider />
        <Popup
          content={t("t000005")}
          inverted
          trigger={<Button
            className="MenuButton"
            color="blue"
            icon="settings"
            onClick={this.handleSettings}
            size="small"
          />}
        />

        <LangModal />
        <ColorModal />
        <Divider />

        <Popup
          content={t("t000003")}
          inverted
          trigger={<Button
            icon="shutdown"
            inverted
            onClick={this.handleSignout}
            size="small"
          />}
        />
      </Menu>
    );
  }
}
SidePanel.propTypes = {
  currentUser: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onHandleShowClick: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  primaryColor: PropTypes.string.isRequired,
  visible: PropTypes.bool
};
export default withRouter(connect(
  null,
  {logout}
)(withNamespaces()(SidePanel)));
