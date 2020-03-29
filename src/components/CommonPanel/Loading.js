// React
import React from "react";
// Semantic
import {Loader, Dimmer} from "semantic-ui-react";
// Begin
const Loading = () => (
  <Dimmer active>
    <Loader
      content={"Veuillez patienter un moment"}
      size="huge"
    />
  </Dimmer>
);
// Export
export default Loading;
