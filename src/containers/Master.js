/* eslint-disable no-unused-expressions */
// React
import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
// Components
import HeaderPanel from "../components/HeaderPanel/HeaderPanel";
import SidePanel from "../components/SidePanel/SidePanel";
import MenuPanel from "../components/SidePanel/MenuPanel";
// Begin
class Master extends Component {
  constructor (props) {
    super(props);
    this.state = {
      visible: false,
      isFull: false
    };
  }

  handleShowClick = () => {
    this.setState({visible: true});
  };

  handleSidebarHide = () => {
    this.setState({visible: false});
  };

  handleFullScreen = () => {
    const {isFull} = this.state;
    this.setState({isFull: !isFull});
    this.fullScreenChecker();
  };

  fullScreenChecker = () => {
    const {isFull} = this.state;
    const docElm = document.documentElement;
    if (docElm.requestFullscreen) {
      !isFull ? docElm.requestFullscreen() : document.exitFullscreen();
    } else if (docElm.mozRequestFullScreen) {
      !isFull ? docElm.mozRequestFullScreen() : document.mozCancelFullScreen();
    } else if (docElm.webkitRequestFullScreen) {
      !isFull ? docElm.webkitRequestFullScreen() : document.webkitCancelFullScreen();
    } else if (docElm.msRequestFullscreen) {
      !isFull ? docElm.msRequestFullscreen() : document.msExitFullscreen();
    }
  };

  render () {
    const {currentUser, primaryColor} = this.props;
    const {visible, isFull} = this.state;
    return (
      <div>
        <HeaderPanel
          isFull={isFull}
          onHandleFullScreen={this.handleFullScreen}
          primaryColor={primaryColor}
        />
        <SidePanel
          currentUser={currentUser}
          disabled={visible}
          key={currentUser.displayName && currentUser}
          onHandleShowClick={this.handleShowClick}
          primaryColor={primaryColor}
        />
        <MenuPanel
          onHandleSidebarHide={this.handleSidebarHide}
          visible={visible}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({currentUser: state.user.currentUser});

Master.propTypes = {
  currentUser: PropTypes.object.isRequired,
  primaryColor: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(Master);
