// React
import React from "react";
import PropTypes from "prop-types";
// Semantic
import {Modal, Form, Button, Icon} from "semantic-ui-react";
const ModalAssign = (props) => (
  <Modal
    basic
    onClose={props.onHandleCloseAssign}
    open={props.isModalAssign}
  >
    <Modal.Header>Assign to Doctors : </Modal.Header>
    <Modal.Content>
      <Form onSubmit={props.onHandleSubmitAssign}>
        <Form.Field>
          <Form.Select
            fluid
            label="Doctors"
            multiple
            name="assign"
            onChange={props.onHandleChange}
            options={props.doctors}
            search
            selection
            value={props.assign}
          />
        </Form.Field>
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button
        color="green"
        inverted
        onClick={props.onHandleSubmitAssign}
      >
        <Icon name="checkmark" />
        Save
      </Button>
      <Button
        color="red"
        inverted
        onClick={props.onHandleCloseAssign}
      >
        <Icon name="remove" /> Cancel
      </Button>
    </Modal.Actions>
  </Modal>
);
ModalAssign.propTypes = {
  onHandleCloseAssign: PropTypes.func.isRequired,
  onHandleSubmitAssign: PropTypes.func.isRequired,
  onHandleChange: PropTypes.func.isRequired,
  isModalAssign: PropTypes.bool,
  doctors: PropTypes.array,
  assign: PropTypes.array
};
export default ModalAssign;
