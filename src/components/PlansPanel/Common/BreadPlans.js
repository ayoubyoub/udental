// React
import React from "react";
import PropTypes from "prop-types";
// Semantic
import {Button, Breadcrumb, Icon} from "semantic-ui-react";
// Begin
const BreadPlans = (props) => (
  <div>
    <Button
      icon
      onClick={props.onHandleToPlans}
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
        onClick={props.onHandleToPlans}
      >
        Plannings
      </Breadcrumb.Section>
      <Breadcrumb.Divider icon="right arrow" />
      <Breadcrumb.Section active>{props.page}</Breadcrumb.Section>
    </Breadcrumb>
  </div>
);
BreadPlans.propTypes = {
  page: PropTypes.string,
  onHandleToPlans: PropTypes.func.isRequired,
  onHandleToHome: PropTypes.func.isRequired
};
export default BreadPlans;
