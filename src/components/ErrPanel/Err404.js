// Addons
import Helmet from "react-helmet";
// React
import React from "react";
import {Link} from "react-router-dom";
// Semantic
import {Segment} from "semantic-ui-react";
// Begin
const Er404 = () => (
  <Segment className="page_404">
    <Helmet title=" DENTIMA APP | 404" />
    <div className="container">
      <div className="row">
        <div className="col-sm-12 ">
          <div className="col-sm-10 col-sm-offset-1  text-center">
            <div className="four_zero_four_bg">
              <h1 className="text-center ">404</h1>
            </div>
            <div className="contant_box_404">
              <h3 className="h2">On dirait que tu es perdu?</h3>
              <p>La page que vous recherchez n&apos;est pas disponible.</p>
              <Link to="/"> &#171; Retour</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Segment>
);

export default Er404;
