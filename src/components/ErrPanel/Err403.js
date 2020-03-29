// Addons
import Helmet from "react-helmet";
// React
import React from "react";
// Semantic
import {Segment, Icon} from "semantic-ui-react";
// Begin
const Er403 = () => (
  <Segment
    className="page_403"
    textAlign="center"
  >
    <Helmet title=" DENTIMA APP | 403" />
    <Icon
      name="lock"
      size="huge"
    />
    <div className="message">
      <h1>L&apos;accès à cette page est interdit.</h1>
      <p>S&apos;il vous plaît vérifier avec l&apos;administrateur si vous pensez que c&apos;est une erreur.</p>
    </div>
  </Segment>
);

export default Er403;
