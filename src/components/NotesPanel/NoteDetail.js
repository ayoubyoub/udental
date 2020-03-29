// Addons
import {map} from "lodash";
// React
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
// Actions
import {saveComment} from "../../actions/notesAction";
// Begin
class NoteDetail extends Component {
  constructor (props) {
    super(props);
    this.state = {commentBody: ""};
  }

  handleChange = (event) => {
    this.setState({commentBody: event.target.value});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const comment = {commentBody: this.state.commentBody};
    this.props.saveComment(this.props.match.params.id, comment);
    this.setState({commentBody: ""});
  };

  renderComments () {
    const {note} = this.props;
    return map(note.comments, (comment, key) => (
      <div
        id={key}
        key={key}
      >
        {comment.commentBody}
      </div>
    ));
  }

  render () {
    const {note} = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <h1>{note.title}</h1>
            <p>{note.body}</p>
            <div>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <textarea
                    className="form-control no-border"
                    name="commentBody"
                    onChange={this.handleChange}
                    placeholder="Write comment.."
                    required
                    type="text"
                    value={this.state.commentBody}
                  />
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-success"
                    type="submit"
                  >
                    Add comment
                  </button>
                </div>
              </form>
            </div>
            {this.renderComments()}
            <br />
            <Link to="/notes"> &#171; Back</Link>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({note: state.notes[ownProps.match.params.id]});
NoteDetail.propTypes = {
  note: PropTypes.object.isRequired,
  match: PropTypes.object,
  saveComment: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  {saveComment}
)(NoteDetail);
