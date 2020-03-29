// React
import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
// Actions
import {editNote} from "../../actions/notesAction";
// Begin
class NoteEdit extends Component {
  constructor (props) {
    super(props);
    this.state = {
      title: this.props.note.title,
      body: this.props.note.body
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
      uid: this.props.currentUser.uid
    };
    this.props.editNote(this.props.match.params.id, note);
    this.setState({
      title: "",
      body: ""
    });
    this.props.history.push("/notes");
  };

  render () {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
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
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  note: state.notes[ownProps.match.params.id],
  currentUser: state.user.currentUser
});
NoteEdit.propTypes = {
  note: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  match: PropTypes.object,
  history: PropTypes.object,
  editNote: PropTypes.func.isRequired
};
export default withRouter(connect(
  mapStateToProps,
  {editNote}
)(NoteEdit));
