// Addons
import {isEmpty} from "lodash";
import Helmet from "react-helmet";
import ReactVivus from "react-vivus";
import svg from "../../images/login.svg";
// React
import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter, Link} from "react-router-dom";
import PropTypes from "prop-types";
// Semantic
import {Form, Segment, Button, Divider, Message, Icon, Card} from "semantic-ui-react";
// Actions
import {googleLogin, simpleLogin} from "../../actions/usersAction";
// Begin
class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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

  displayErrors = (errors) => errors.map((error, ind) => <p key={ind}>{error.message}</p>);

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleGoogle = () => {
    this.props.googleLogin();
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({
        errors: [],
        loading: true
      });
      this.props.simpleLogin(this.state.email, this.state.password).catch((err) => {
        console.error(err);
        this.setState({
          errors: this.state.errors.concat(err),
          loading: false
        });
      });
    }
  };

  isFormValid = ({email, password}) => email && password;

  handleInputError = (errors, inputName) => (errors.some((error) => error.message.toLowerCase().includes(inputName)) ? "error" : "");

  render () {
    const {email, password, errors, loading} = this.state;
    return (
      <Segment
        basic
        textAlign="center"
      >
        <Helmet title=" eDental APP |  SIGN IN " />
        <Card
          centered
          className="auth"
          color="blue"
        >
          <Segment
            basic
            color="blue"
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
                  <Button
                    animated
                    className={loading ? "loading" : ""}
                    color="blue"
                    disabled={loading}
                    fluid
                    size="large"
                  >
                    <Button.Content visible>
                      <Icon name="sign in" />  SignIN
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
              <Divider horizontal>OR</Divider>
              <Button
                color="google plus"
                onClick={this.handleGoogle}
              >
                <Icon name="google plus" /> Sign in using GOOGLE
              </Button>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon name="add user" /> <Link to="/register"> Register NOW! </Link>
          </Card.Content>
        </Card>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => ({user: state.user.currentUser});

Login.propTypes = {
  user: PropTypes.object,
  history: PropTypes.object,
  googleLogin: PropTypes.func.isRequired,
  simpleLogin: PropTypes.func.isRequired
};

export default withRouter(connect(
  mapStateToProps,
  {
    googleLogin,
    simpleLogin
  }
)(Login));
