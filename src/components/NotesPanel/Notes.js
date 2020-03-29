// Addons
import {map} from "lodash";
import {withNamespaces} from "react-i18next";
// React
import React, {Component} from "react";
import {withRouter, Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
// Actions
import {saveNote, deleteNote} from "../../actions/notesAction";
// Begin
class Notes extends Component {
  constructor (props) {
    super(props);
    this.state = {
      title: "",
      body: ""
    };
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const note = {
      title: this.state.title,
      body: this.state.body,
      uid: this.props.user.uid
    };
    this.props.saveNote(note);
    this.setState({
      title: "",
      body: ""
    });
  };

  renderNotes = () => map(this.props.notes, (note, key) => (
    <div key={key}>
      <Link to={`/notes/${key}`}>
        <h2>{note.title}</h2>
      </Link>
      <p>{note.body}</p>
      {note.uid === this.props.user.uid && (
        <div>
          <button
            className="btn btn-danger btn-xs"
            onClick={() => {
              this.props.deleteNote(key);
            }}
            type="button"
          >
              Delete
          </button>
          <button
            className="btn btn-info btn-xs pull-right"
            type="button"
          >
            <Link to={`/notes/${key}/edit`}>Update</Link>
          </button>
        </div>
      )}
    </div>
  ));

  changeLanguage = (lng) => {
    this.props.i18n.changeLanguage(lng);
  };

  render () {
    const {t} = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              className="form-control no-border"
              name="title"
              onChange={this.handleChange}
              placeholder="Title..."
              required
              type="text"
              value={this.state.title}
            />
          </div>

          <div className="form-group">
            <textarea
              className="form-control no-border"
              name="body"
              onChange={this.handleChange}
              placeholder="Body..."
              required
              type="text"
              value={this.state.body}
            />
          </div>

          <div className="form-group">
            <button
              className="btn btn-primary col-sm-12"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
        <button
          onClick={() => this.changeLanguage("MA")}
          type="button"
        >
          ar
        </button>
        <button
          onClick={() => this.changeLanguage("FR")}
          type="button"
        >
          fr
        </button>
        <button
          onClick={() => this.changeLanguage("EN")}
          type="button"
        >
          en
        </button>
        <button
          onClick={() => this.changeLanguage("ES")}
          type="button"
        >
          es
        </button>
        <button
          onClick={() => this.changeLanguage("DE")}
          type="button"
        >
          de
        </button>
        <button
          onClick={() => this.changeLanguage("TR")}
          type="button"
        >
          tr
        </button>
        <button
          onClick={() => this.changeLanguage("BR")}
          type="button"
        >
          br
        </button>
        <button
          onClick={() => this.changeLanguage("RU")}
          type="button"
        >
          ru
        </button>
        <div>{t("t000001")}</div>
        <br />
        <br />
        <br />
        {this.renderNotes()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notes: state.notes,
  user: state.user.currentUser
});
Notes.propTypes = {
  notes: PropTypes.object,
  user: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  saveNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};
export default withRouter(connect(
  mapStateToProps,
  {
    saveNote,
    deleteNote
  }
)(withNamespaces()(Notes)));
