// React
import React from "react";
import PropTypes from "prop-types";
// Semantic
import {Modal, Form, TextArea, Dropdown, Input, Button, Icon} from "semantic-ui-react";
// Import
import {optRole} from "../../../../services/roles";
const ModalEditUser = (props) => (
  <Modal
    basic
    onClose={props.onHandleCloseModal}
    open={props.state.isModalEdit}
  >
    <Modal.Header>Modification</Modal.Header>
    <Modal.Content>
      <Form onSubmit={props.onHandleSubmit}>
        <Form.Field>
          <Dropdown
            fluid
            name="sexe"
            onChange={props.onHandleChange}
            options={props.state.optSexe}
            placeholder="Gender"
            selection
            value={props.state.sexe}
          />
        </Form.Field>
        <Form.Field>
          <Dropdown
            fluid
            name="civility"
            onChange={props.onHandleChange}
            options={props.state.optCivility}
            placeholder="Civility"
            selection
            value={props.state.civility}
          />
        </Form.Field>
        <Form.Field>
          <Dropdown
            fluid
            name="role"
            onChange={props.onHandleChange}
            options={optRole}
            placeholder="Role"
            selection
            value={props.state.role}
          />
        </Form.Field>
        <Form.Field>
          <Input
            autoComplete="off"
            fluid
            label="CIN"
            name="cin"
            onChange={props.onHandleChange}
            value={props.state.cin}
          />
        </Form.Field>
        <Form.Field>
          <Input
            autoComplete="off"
            fluid
            label="Nom & Prénom"
            name="name"
            onChange={props.onHandleChange}
            value={props.state.name}
          />
        </Form.Field>
        <Form.Field>
          <Input
            autoComplete="off"
            fluid
            label="Numéro de téléphone"
            name="telport"
            onChange={props.onHandleChange}
            value={props.state.telport}
          />
        </Form.Field>
        <Form.Field>
          <TextArea
            autoComplete="off"
            label="Adresse"
            name="adresse"
            onChange={props.onHandleChange}
            placeholder="Adresse"
            value={props.state.adresse}
          />
        </Form.Field>
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button
        color="green"
        inverted
        onClick={props.onHandleSubmit}
      >
        <Icon name="checkmark" />
              Edit
      </Button>
      <Button
        color="red"
        inverted
        onClick={props.onHandleCloseModal}
      >
        <Icon name="remove" /> Cancel
      </Button>
    </Modal.Actions>
  </Modal>
);
ModalEditUser.propTypes = {
  state: PropTypes.object,
  onHandleCloseModal: PropTypes.func.isRequired,
  onHandleSubmit: PropTypes.func.isRequired,
  onHandleChange: PropTypes.func.isRequired
};
export default ModalEditUser;
