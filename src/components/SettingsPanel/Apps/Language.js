// React
import React from "react";
import PropTypes from "prop-types";
// Begin
const Language = (props) => <div style={props.contentStyle}>[Language] Contactez le support ...</div>;
Language.propTypes = {contentStyle: PropTypes.object.isRequired};
export default Language;
