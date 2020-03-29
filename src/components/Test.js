// Addons
/* eslint-disable */
import Helmet from "react-helmet";
// React
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Semantic
import { Header, Image, Segment } from "semantic-ui-react";
// Images
import dental from "../images/dental.png";
// Begin
class Test extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Helmet title="Page de Test" />
        <Header as="h2" icon textAlign="center">
          <Image circular src={dental} />
          <Header.Content>uDental Management System</Header.Content>
        </Header>
        <Segment style={{ display: "flex", flexDirection: "row" }}>aaaaa</Segment>
      </div>
    );
  }
}

const mapStateToProps = state => ({ currentUser: state.user.currentUser });

export default withRouter(connect(mapStateToProps)(Test));
