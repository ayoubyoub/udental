// Addons
import {isEmpty} from "lodash";
// React
import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
// Begin
class AuthenticatedComponent extends Component {
  UNSAFE_componentWillReceiveProps (nextProps) {
    if (isEmpty(nextProps.user)) {
      this.props.history.push("/login");
    }
  }

  render () {
    const {user, userLoading, children} = this.props;
    return userLoading === false && user ? <div>{children}</div> : null;
  }
}
// Get Props
const mapStateToProps = (state) => ({
  userLoading: state.loading.user,
  user: state.user.currentUser
});
AuthenticatedComponent.propTypes = {
  user: PropTypes.object,
  history: PropTypes.object,
  children: PropTypes.array.isRequired,
  userLoading: PropTypes.bool
};
// Export
export default withRouter(connect(mapStateToProps)(AuthenticatedComponent));
