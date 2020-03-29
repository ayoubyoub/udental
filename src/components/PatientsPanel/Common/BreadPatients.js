// React
import React from "react";
import PropTypes from "prop-types";
// Semantic
import {Button, Breadcrumb, Icon} from "semantic-ui-react";
// Begin
const BreadPatients = (props) => (
  <div>
    <Button
      icon
      onClick={props.onHandleToPatients}
    >
      <Icon name="reply" />
    </Button>
    <Breadcrumb>
      <Breadcrumb.Section
        link
        onClick={props.onHandleToHome}
      >
        Home
      </Breadcrumb.Section>
      <Breadcrumb.Divider icon="right chevron" />
      <Breadcrumb.Section
        link
        onClick={props.onHandleToPatients}
      >
        Patients
      </Breadcrumb.Section>
      <Breadcrumb.Divider icon="right arrow" />
      <Breadcrumb.Section active>{props.page}</Breadcrumb.Section>
    </Breadcrumb>
  </div>
);
BreadPatients.propTypes = {
  page: PropTypes.string,
  onHandleToPatients: PropTypes.func.isRequired,
  onHandleToHome: PropTypes.func.isRequired
};
export default BreadPatients;
