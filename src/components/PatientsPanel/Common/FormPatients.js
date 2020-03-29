// Addons
import {find} from "lodash";
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
        <Form.Input
          autoComplete="off"
          fluid
          label="CIN"
          name="cin"
          onChange={props.onHandleChange}
          value={props.state.cin}
        />
        <Form.Select
          fluid
          label="Civilité"
          name="civility"
          onChange={props.onHandleChange}
          options={props.state.optCivility}
          search
          selection
          value={props.state.civility}
        />
        <Form.Input
          autoComplete="off"
          fluid
          icon={find(props.state.errors, "nom") ? <Icon
            color="red"
            name="exclamation circle"
          /> : <Icon
            color="grey"
            name="exclamation circle"
          />}
          label="Nom"
          name="nom"
          onChange={props.onHandleChange}
          value={props.state.nom}
        />
        <Form.Input
          autoComplete="off"
          fluid
          icon={find(props.state.errors, "prenom") ? <Icon
            color="red"
            name="exclamation circle"
          /> : <Icon
            color="grey"
            name="exclamation circle"
          />}
          label="Prénom"
          name="prenom"
          onChange={props.onHandleChange}
          value={props.state.prenom}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Select
          fluid
          label="Conjoint"
          name="conjoint"
          onChange={props.onHandleChange}
          options={props.state.patients}
          search
          selection
          value={props.state.conjoint}
        />
        <Form.Select
          fluid
          label="Relation"
          name="conjointRelation"
          onChange={props.onHandleChange}
          options={props.state.optRelations}
          search
          selection
          value={props.state.conjointRelation}
        />
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
        <Form.Select
          fluid
          label="Relation"
          multiple
          name="chargesRelation"
          onChange={props.onHandleChange}
          options={props.state.optRelations}
          search
          selection
          value={props.state.chargesRelation}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Select
          fluid
          label="Sexe"
          name="sexe"
          onChange={props.onHandleChange}
          options={props.state.optSexe}
          search
          selection
          value={props.state.sexe}
        />
        <DateInput
          autoComplete="off"
          closable
          dateFormat="DD/MM/YYYY"
          iconPosition="left"
          label="Date de naissance"
          name="datenaissance"
          onChange={props.onHandleChange}
          startMode="year"
          value={props.state.datenaissance}
        />
        <Form.Input
          autoComplete="off"
          fluid
          label="Email"
          name="email"
          onChange={props.onHandleChange}
          value={props.state.email}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          autoComplete="off"
          fluid
          label="Téléphone portable"
          name="telport"
          onChange={props.onHandleChange}
          value={props.state.telport}
        />
        <Form.Input
          autoComplete="off"
          fluid
          label="Téléphone professionnel"
          name="telprof"
          onChange={props.onHandleChange}
          value={props.state.telprof}
        />
        <Form.Input
          autoComplete="off"
          fluid
          label="Téléphone fixe"
          name="telfixe"
          onChange={props.onHandleChange}
          value={props.state.telfixe}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Select
          fluid
          label="Situation familiale"
          name="situation"
          onChange={props.onHandleChange}
          options={props.state.optSituations}
          search
          selection
          value={props.state.situation}
        />
        <Form.Input
          autoComplete="off"
          fluid
          label="Nombre d'enfants"
          name="nbrenf"
          onChange={props.onHandleChange}
          value={props.state.nbrenf}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          autoComplete="off"
          fluid
          label="Profession"
          name="profession"
          onChange={props.onHandleChange}
          value={props.state.profession}
        />
        <Form.Select
          fluid
          label="Fonctionnaire"
          name="job"
          onChange={props.onHandleChange}
          options={props.state.optJobs}
          search
          selection
          value={props.state.job}
        />
        <Form.Select
          fluid
          label="Assurance"
          name="assurance"
          onChange={props.onHandleChange}
          options={props.state.optAssurances}
          search
          selection
          value={props.state.assurance}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.TextArea
          autoComplete="off"
          label="Adresse"
          name="adresse"
          onChange={props.onHandleChange}
          value={props.state.adresse}
        />
        <Form.Select
          fluid
          label="Ville"
          name="ville"
          onChange={props.onHandleChange}
          options={props.state.optVilles}
          search
          selection
          value={props.state.ville}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.TextArea
          autoComplete="off"
          label="Remarque"
          name="remarque"
          onChange={props.onHandleChange}
          value={props.state.remarque}
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
