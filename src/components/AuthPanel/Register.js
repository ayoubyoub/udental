// Addons
import {isEmpty} from "lodash";
import Helmet from "react-helmet";
import md5 from "md5";
import ReactVivus from "react-vivus";
import svg from "../../images/register.svg";
// React
import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
// Semantic
import {Form, Segment, Button, Message, Icon, Card} from "semantic-ui-react";
// Actions
import {register} from "../../actions/usersAction";
// Begin
class Register extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      loading: false,
      errors: []
    };
  }

  componentDidMount () {
    if (!isEmpty(this.props.user)) {
      this.props.history.push("/");
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    if (!isEmpty(nextProps.user)) {
      nextProps.history.push("/");
    }
  }

  isFormValid = () => {
    const errors = [];
    let error = "";
    if (this.isFormEmpty(this.state)) {
      error = {message: "Fill in all fields"};
      this.setState({errors: errors.concat(error)});
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = {message: "Password is invalid"};
      this.setState({errors: errors.concat(error)});
      return false;
    }
    return true;
  };

  isFormEmpty = ({username, email, password, passwordConfirmation}) => (
    !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
  );

  isPasswordValid = ({password, passwordConfirmation}) => {
    const min = 6;
    if (password.length < min || passwordConfirmation.length < min) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    }
    return true;
  };

  displayErrors = (errors) => errors.map((error, ind) => <p key={ind}>{error.message}</p>);

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid()) {
      this.setState({
        errors: [],
        loading: true
      });
      const imgUrl = `http://gravatar.com/avatar/${md5(this.state.email)}?d=identicon`;
      this.props
        .register(
          this.state.username,
          this.state.email,
          this.state.password,
          imgUrl
        )
        .catch((err) => {
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          });
        });
    }
  };

  handleInputError = (errors, inputName) => errors.some((error) => error.message.toLowerCase().includes(inputName))
    ? "error"
    : "";

  render () {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      errors,
      loading
    } = this.state;
    return (
      <Segment
        basic
        textAlign="center"
      >
        <Helmet title=" eDental APP |  REGISTER " />
        <Card
          centered
          className="auth"
          color="orange"
        >
          <Segment
            basic
            color="orange"
            inverted
            textAlign="center"
          >
            <ReactVivus
              id="logo"
              option={{
                file: svg,
                animTimingFunction: "EASE",
                type: "oneByOne",
                duration: 300
              }}
              style={{margin: "auto"}}
            />
          </Segment>
          <Card.Content className="cardAuth">
            <Card.Description>
              <Form
                onSubmit={this.handleSubmit}
                size="large"
              >
                <Segment basic>
                  <Form.Input
                    autoComplete="off"
                    fluid
                    icon="user"
                    iconPosition="left"
                    name="username"
                    onChange={this.handleChange}
                    placeholder="Username"
                    type="text"
                    value={username}
                  />
                  <Form.Input
                    autoComplete="off"
                    className={this.handleInputError(errors, "email")}
                    fluid
                    icon="mail"
                    iconPosition="left"
                    name="email"
                    onChange={this.handleChange}
                    placeholder="Email Address"
                    type="email"
                    value={email}
                  />
                  <Form.Input
                    autoComplete="off"
                    className={this.handleInputError(errors, "password")}
                    fluid
                    icon="lock"
                    iconPosition="left"
                    name="password"
                    onChange={this.handleChange}
                    placeholder="Password"
                    type="password"
                    value={password}
                  />
                  <Form.Input
                    autoComplete="off"
                    className={this.handleInputError(errors, "password")}
                    fluid
                    icon="repeat"
                    iconPosition="left"
                    name="passwordConfirmation"
                    onChange={this.handleChange}
                    placeholder="Password Confirmation"
                    type="password"
                    value={passwordConfirmation}
                  />
                  <Button
                    animated
                    className={loading ? "loading" : ""}
                    color="orange"
                    disabled={loading}
                    fluid
                    size="large"
                  >
                    <Button.Content visible>
                      <Icon name="gem" /> Signup
                    </Button.Content>
                    <Button.Content hidden>
                      <Icon name="arrow right" />
                    </Button.Content>
                  </Button>
                </Segment>
              </Form>
              {errors.length > 0 && (
                <Message error>
                  <h3>Error</h3>
                  {this.displayErrors(errors)}
                </Message>
              )}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon name="sign in" /> <Link to="/login">Login</Link>
          </Card.Content>
        </Card>
      </Segment>
    );
  }
}
const mapStateToProps = (state) => ({user: state.user.currentUser});
Register.propTypes = {
  user: PropTypes.object,
  history: PropTypes.object,
  register: PropTypes.func.isRequired
};
export default withRouter(connect(
  mapStateToProps,
  {register}
)(Register));
