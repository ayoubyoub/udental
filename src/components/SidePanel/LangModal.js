// React
import React, {Component} from "react";
import {withNamespaces} from "react-i18next";
import {connect} from "react-redux";
import PropTypes from "prop-types";
// Semantic
import {Divider, Modal, Image, Popup} from "semantic-ui-react";
// Actions
import {editParam} from "../../actions/paramsAction";
// Images
import arImage from "../../images/lang/AR.png";
import enImage from "../../images/lang/EN.png";
import frImage from "../../images/lang/FR.png";
import esImage from "../../images/lang/ES.png";
import brImage from "../../images/lang/BR.png";
import trImage from "../../images/lang/TR.png";
import ruImage from "../../images/lang/RU.png";
import deImage from "../../images/lang/DE.png";
// Begin
class LangModal extends Component {
  constructor (props) {
    super(props);
    this.state = {modal: false};
  }

  handleOpenModal = () => {
    this.setState({modal: true});
  };

  HandleCloseModal = () => {
    this.setState({modal: false});
  };

  // Render lang
  renderLang = () => {
    const {t} = this.props;
    const img = t("img");
    let src = arImage;
    switch (img) {
    case "arImage":
      src = arImage;
      break;
    case "enImage":
      src = enImage;
      break;
    case "frImage":
      src = frImage;
      break;
    case "esImage":
      src = esImage;
      break;
    case "brImage":
      src = brImage;
      break;
    case "trImage":
      src = trImage;
      break;
    case "ruImage":
      src = ruImage;
      break;
    case "deImage":
      src = deImage;
      break;
    default:
      src = arImage;
      break;
    }
    return (
      <React.Fragment>
        <Divider />
        <Popup
          content={t("imgc")}
          inverted
          trigger={<Image
            circular
            className="versionC"
            onClick={this.handleOpenModal}
            size="mini"
            src={src}
          />}
        />
      </React.Fragment>
    );
  };

  handleSaveLangs = (lang) => {
    const id = this.props.currentUser.uid;
    this.props.editParam(id, {
      active: true,
      primaryLang: lang
    });
    this.HandleCloseModal();
  };

  render () {
    const {modal} = this.state;
    const {t} = this.props;
    return (
      <div>
        {this.renderLang()}
        <Modal
          basic
          onClose={() => {
            this.HandleCloseModal();
          }}
          open={modal}
        >
          <Modal.Header style={{float: t("fixed")}}>{t("t000006")}</Modal.Header>
          <Modal.Content>
            <div className="lang">
              <Image.Group
                circular="true"
                size="tiny"
              >
                <Popup
                  content={t("imgcar")}
                  inverted
                  trigger={<Image
                    circular
                    className="versionC"
                    onClick={() => this.handleSaveLangs("AR")}
                    size="mini"
                    src={arImage}
                  />}
                />
                <Popup
                  content={t("imgcfr")}
                  inverted
                  trigger={<Image
                    circular
                    className="versionC"
                    onClick={() => this.handleSaveLangs("FR")}
                    size="mini"
                    src={frImage}
                  />}
                />
                <Popup
                  content={t("imgcen")}
                  inverted
                  trigger={<Image
                    circular
                    className="versionC"
                    onClick={() => this.handleSaveLangs("EN")}
                    size="mini"
                    src={enImage}
                  />}
                />
                <Popup
                  content={t("imgcbr")}
                  inverted
                  trigger={<Image
                    circular
                    className="versionC"
                    onClick={() => this.handleSaveLangs("BR")}
                    size="mini"
                    src={brImage}
                  />}
                />
              </Image.Group>
              <Divider hidden />
              <Image.Group
                circular="true"
                size="tiny"
              >
                <Popup
                  content={t("imgcde")}
                  inverted
                  trigger={<Image
                    circular
                    className="versionC"
                    onClick={() => this.handleSaveLangs("DE")}
                    size="mini"
                    src={deImage}
                  />}
                />
                <Popup
                  content={t("imgces")}
                  inverted
                  trigger={<Image
                    circular
                    className="versionC"
                    onClick={() => this.handleSaveLangs("ES")}
                    size="mini"
                    src={esImage}
                  />}
                />
                <Popup
                  content={t("imgctr")}
                  inverted
                  trigger={<Image
                    circular
                    className="versionC"
                    onClick={() => this.handleSaveLangs("TR")}
                    size="mini"
                    src={trImage}
                  />}
                />
                <Popup
                  content={t("imgcru")}
                  inverted
                  trigger={<Image
                    circular
                    className="versionC"
                    onClick={() => this.handleSaveLangs("RU")}
                    size="mini"
                    src={ruImage}
                  />}
                />
              </Image.Group>
            </div>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  params: state.params.langs.primaryLang
});

LangModal.propTypes = {
  editParam: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  {editParam}
)(withNamespaces()(LangModal));
