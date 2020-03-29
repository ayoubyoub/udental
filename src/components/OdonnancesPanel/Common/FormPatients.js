// React
import React from "react";
import PropTypes from "prop-types";
// Semantic
import {DateInput} from "semantic-ui-calendar-react";
import {Form, Segment, Button, Icon, Message} from "semantic-ui-react";
const FormPatients = (props) => (
  <div>
    <Form
      onSubmit={props.onHandleSubmit}
      style={{marginTop: "2em"}}
    >
      <Form.Group
        widths="equal"
      >
        <Form.Select
          fluid
          label="Personne à charge"
          multiple
          name="charges"
          onChange={props.onHandleChange}
          options={props.state.patients}
          search
          selection
          value={props.state.charges}
        />

      </Form.Group>
      <Form.Group widths="equal">

        <DateInput
          autoComplete="off"
          closable
          dateFormat="DD/MM/YYYY"
          iconPosition="left"
          label="Date du jour"
          name="datedujour"
          onChange={props.onHandleChange}
          startMode="year"
          value={props.state.datedujour}
        />

      </Form.Group>
      <Form.Group widths="equal">
        <Form.TextArea
          autoComplete="off"
          label="prescription relative au traitement "
          name="ordonnace"
          onChange={props.onHandleChange}
          value={props.state.ordonnace}
        />
      </Form.Group>
    </Form>
    {props.state.errors.length > 0 && (
      <Message warning>
        <Message.List>
          {props.onHandleDisplayErrors(props.state.errors)}
        </Message.List>
      </Message>
    )}
    <Segment clearing>
      <Button
        color="blue"
        floated="left"
        onClick={props.onHandleSubmit}
      >
        <Icon name="check" />
              Valider
      </Button>
      <Button
        color="grey"
        floated="right"
        onClick={props.onHandleToPatients}
      >
        <Icon name="undo" />
              Annuler
      </Button>
    </Segment>
  </div>
);
FormPatients.propTypes = {
  state: PropTypes.object,
  onHandleToPatients: PropTypes.func.isRequired,
  onHandleSubmit: PropTypes.func.isRequired,
  onHandleChange: PropTypes.func.isRequired,
  onHandleDisplayErrors: PropTypes.func.isRequired
};
export default FormPatients;
