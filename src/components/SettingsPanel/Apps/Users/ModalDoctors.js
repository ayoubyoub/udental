// Addons
import {map} from "lodash";
import {TwitterPicker} from "react-color";
// React
import React from "react";
import PropTypes from "prop-types";
// Semantic
import {Modal, Input, Form, Button, Icon, List, Image} from "semantic-ui-react";
// Images
/* eslint-disable */
import defaultImg from "../../../../images/default.png";
const ModalDoctors = props => (
  <Modal basic onClose={props.onHandleCloseDoctors} open={props.isModalDoctors}>
    <Modal.Header>Doctor {props.name}</Modal.Header>
    <Modal.Content>
      <strong>Doctor Assists : </strong>
      <List horizontal relaxed style={{ marginLeft: "20px" }}>
        {map(props.isModalDoctors && props.assign, assist => (
          <List.Item key={assist.uid}>
            <Image avatar src={assist.avatar || defaultImg} />
            <List.Content>
              <List.Header as="a">{assist.name}</List.Header>
            </List.Content>
          </List.Item>
        ))}
      </List>
      <Form onSubmit={props.onHandleSubmitDoctors}>
        <Form.Field>
          <Input fluid label="Doctor Calendar ID" name="calendarID" value={props.calendarID} type="text" onChange={props.onHandleChange} />
        </Form.Field>
        <Form.Field>
          <TwitterPicker triangle="hide" color={props.color} onChangeComplete={props.onHandleChangeColor} width="150" />
        </Form.Field>
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button color="green" inverted onClick={props.onHandleSubmitDoctors}>
        <Icon name="checkmark" />
        Save
      </Button>
      <Button color="red" inverted onClick={props.onHandleCloseDoctors}>
        <Icon name="remove" /> Cancel
      </Button>
    </Modal.Actions>
  </Modal>
);
ModalDoctors.propTypes = {
  onHandleCloseDoctors: PropTypes.func.isRequired,
  onHandleSubmitDoctors: PropTypes.func.isRequired,
  isModalDoctors: PropTypes.bool,
  name: PropTypes.string,
  assign: PropTypes.array
};
export default ModalDoctors;
