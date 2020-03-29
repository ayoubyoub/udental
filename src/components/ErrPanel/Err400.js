// Addons
import Helmet from "react-helmet";
// React
import React from "react";
// Semantic
import {Segment, Icon} from "semantic-ui-react";
// Begin
const Er400 = () => (
  <Segment
    className="page_400"
    textAlign="center"
  >
    <Helmet title=" eDental APP | 400" />
    <Icon
      name="lock"
      size="huge"
    />
    <div className="message">
      <h1>Votre compte n&apos;est pas encore activé.</h1>
      <p>S&apos;il vous plaît vérifier avec l&apos;administrateur si vous pensez que c&apos;est une erreur.</p>
    </div>
  </Segment>
);

export default Er400;
