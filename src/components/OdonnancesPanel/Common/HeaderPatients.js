// React
import React from "react";
import PropTypes from "prop-types";
// Semantic
import {Header, Dimmer, Loader} from "semantic-ui-react";
const HeaderPatients = (props) => (
  <div>
    <Dimmer
      active={props.active}
      inverted
    >
      <Loader size="huge" />
    </Dimmer>
    <Header
      as="h2"
      icon
      textAlign="left"
    >
      <Header.Content>{props.page}</Header.Content>
    </Header>
  </div>
);
HeaderPatients.propTypes = {
  page: PropTypes.string,
  active: PropTypes.bool
};
export default HeaderPatients;
