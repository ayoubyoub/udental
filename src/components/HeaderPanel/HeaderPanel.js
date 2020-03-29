// Addons
import {withNamespaces} from "react-i18next";
// React
import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
// Semantic
import {Menu, Button, Icon} from "semantic-ui-react";
// Components
import UserPanel from "./UserPanel";
import Channels from "./Channels";
import DirectMessages from "./DirectMessages";
// Begin
/* eslint-disable */
const HeaderPanel = props => {
  const { t, currentUser, primaryColor } = props;
  return (
    <Menu
      className={t("header")}
      fixed="top"
      inverted
      key={currentUser && currentUser.uid}
      size="mini"
      style={{
        background: primaryColor,
        fontSize: "0.8rem"
      }}
    >
      <UserPanel currentUser={currentUser} primaryColor={primaryColor} />
      <DirectMessages currentUser={currentUser} />
      <Channels currentUser={currentUser} />
      <Menu.Menu position="right" style={{ marginRight: "4em" }}>
        <Menu.Item>
          <Button size="mini" inverted animated="fade" onClick={props.onHandleFullScreen}>
            <Button.Content visible={props.isFull === false && true} hidden={props.isFull === true && true}>
              <Icon name="compress" />
            </Button.Content>
            <Button.Content visible={props.isFull === true && true} hidden={props.isFull === false && true}>
              <Icon name="expand" />
            </Button.Content>
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

const mapStateToProps = state => ({ currentUser: state.user.currentUser });
HeaderPanel.propTypes = {
  currentUser: PropTypes.object.isRequired,
  primaryColor: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired
};
export default connect(mapStateToProps)(withNamespaces()(HeaderPanel));
