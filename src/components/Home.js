// React
import React from "react";
import {withNamespaces} from "react-i18next";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
// Semantic
import {Header, Image, Grid, Segment} from "semantic-ui-react";
// Components
import PatientsHome from "../components/PatientsPanel/patientsHome";
// Images
import dental from "../images/dental.png";
// Begin
const Home = (props) => (
  <div>
    <Header
      as="h2"
      icon
      textAlign="center"
    >
      <Image
        circular
        src={dental}
      />
      <Header.Content>uDental Management System</Header.Content>
    </Header>
    <Segment>
      <Grid
        columns={1}
        stackable
        textAlign="center"
      >
        {/* <Divider vertical> <Icon name="linkify" /> </Divider>*/}
        <Grid.Row verticalAlign="middle">
          <Grid.Column>
            <PatientsHome currentUser={props.currentUser} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </div>
);

const mapStateToProps = (state) => ({currentUser: state.user.currentUser});

Home.propTypes = {currentUser: PropTypes.object.isRequired};

export default withRouter(connect(mapStateToProps)(withNamespaces()(Home)));
