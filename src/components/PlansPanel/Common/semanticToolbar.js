// React
import React, {Component} from "react";
// Semantic
import {Segment, Dropdown, Label, Header, Button} from "semantic-ui-react";
/* eslint-disable */
class semanticToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = { show: "month" };
  }

  componentDidMount() {
    const { show } = this.state;
    this.props.onView(show);
    this.props.onNavigate("TODAY");
  }

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
      this.props.onView(value);
    }
  };

  onChange = date => this.setState({ date });

  render() {
    const showOptions = [
      {
        key: "1",
        text: "Mois",
        value: "month"
      },
      {
        key: "2",
        text: "Semaine",
        value: "week"
      },
      {
        key: "3",
        text: "Jour",
        value: "day"
      },
      {
        key: "4",
        text: "Agenda",
        value: "agenda"
      }
    ];
    const { show } = this.state;
    return (
      <div>
        <Segment raised>
          <Label attached="top">{this.props.label}</Label>
        </Segment>
        <Segment basic>
          <Header as="h6" floated="left">
            <Button.Group>
              <Button color="facebook" floated="left" icon="left chevron" onClick={() => this.props.onNavigate("PREV")} />
              <Button className="todayBtn" color="facebook" content="Aujourd'hui" floated="left" onClick={() => this.props.onNavigate("TODAY")} />
              <Button color="facebook" floated="left" icon="right chevron" onClick={() => this.props.onNavigate("NEXT")} />
            </Button.Group>
          </Header>
          <Header as="h6" className="todayHeader" floated="right">
            <Dropdown className="icon" floating icon="list" labeled name="show" onChange={this.handleChange} options={showOptions} value={show} />
          </Header>
        </Segment>
      </div>
    );
  }
}

export default semanticToolbar;
