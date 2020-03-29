// React
import React from "react";
import PropTypes from "prop-types";
// Semantic
import {Modal, Button, Icon} from "semantic-ui-react";
const ModalPwdUser = (props) => (
  <Modal
    basic
    onClose={props.onHandleClosePwd}
    open={props.isModalPwd}
  >
    <Modal.Header>
      Send mail to : <strong>{props.email}</strong>
    </Modal.Header>
    <Modal.Actions style={{textAlign: "center"}}>
      <Button
        color="green"
        inverted
        onClick={props.onHandleSubmitPwd}
      >
        <Icon name="checkmark" />
        Send reset password
      </Button>
      <Button
        color="red"
        inverted
        onClick={props.onHandleClosePwd}
      >
        <Icon name="remove" /> Cancel
      </Button>
    </Modal.Actions>
  </Modal>
);
ModalPwdUser.propTypes = {
  onHandleClosePwd: PropTypes.func.isRequired,
  onHandleSubmitPwd: PropTypes.func.isRequired,
  isModalPwd: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired
};
export default ModalPwdUser;
