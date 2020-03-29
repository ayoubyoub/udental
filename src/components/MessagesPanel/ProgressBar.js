// React
import React from "react";
// Semantic
import {Progress} from "semantic-ui-react";
// Begin
const ProgressBar = ({uploadState, percentUploaded}) => uploadState === "uploading" && <Progress
  className="progress__bar"
  indicating
  inverted
  percent={percentUploaded}
  progress
  size="medium"
/>;
export default ProgressBar;
