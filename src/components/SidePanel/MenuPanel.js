// React
import React from "react";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
// Semantic
import {Sidebar, Menu, Icon} from "semantic-ui-react";
// Begin
const MenuPanel = (props) => (
  <Sidebar
    animation="overlay"
    as={Menu}
    icon="labeled"
    inverted
    onHide={props.onHandleSidebarHide}
    vertical
    visible={props.visible}
    width="thin"
  >
    <Menu.Item
      as="a"
      onClick={() => {
        props.history.push("/");
        props.onHandleSidebarHide();
      }}
    >
      <Icon name="home" />
      Accueil
    </Menu.Item>
    <Menu.Item
      as="a"
      onClick={() => {
        props.history.push("/patients");
        props.onHandleSidebarHide();
      }}
    >
      <Icon name="address card outline" />
      Patients
    </Menu.Item>
    <Menu.Item
      as="a"
      onClick={() => {
        props.history.push("/plannings");
        props.onHandleSidebarHide();
      }}
    >
      <Icon name="calendar alternate outline" />
      Planning
    </Menu.Item>
    <Menu.Item
      as="a"
      onClick={() => {
        props.history.push("/notes");
        props.onHandleSidebarHide();
      }}
    >
      <Icon name="heartbeat" />
      Dossier médical
    </Menu.Item>
    <Menu.Item
      as="a"
      onClick={() => {
        props.history.push("/ordonnances");
        props.onHandleSidebarHide();
      }}
    >
      <Icon name="stethoscope" />
      Ordonnances
    </Menu.Item>
  </Sidebar>
);

MenuPanel.propTypes = {
  onHandleSidebarHide: PropTypes.func.isRequired,
  history: PropTypes.object,
  visible: PropTypes.bool
};

export default withRouter(MenuPanel);
