// React
import React, {Component} from "react";
// Semantic
import {Header, Image, Segment} from "semantic-ui-react";
// Components
import Settings from "./Settings";
// Images
import dental from "../../images/dental.png";
// Begin
class SettingsPanel extends Component {
  constructor (props) {
    super(props);
    this.state = {
      header: "Personnaliser votre application",
      contentStyle: {
        display: "relative",
        justifyContent: "left",
        height: "500px",
        marginTop: "1em",
        backgroundColor: "#fff"
      },
      content: [
        {
          key: 0,
          value: "global",
          text: "Global",
          icon: "globe"
        },
        {
          key: 1,
          value: "security",
          text: "Sécurité",
          icon: "expeditedssl"
        },
        {
          key: 2,
          value: "users",
          text: "Users",
          icon: "universal access"
        },
        {
          key: 3,
          value: "civility",
          text: "Civilités",
          icon: "gitlab"
        },
        {
          key: 4,
          value: "sexe",
          text: "Sexe",
          icon: "street view"
        },
        {
          key: 5,
          value: "villes",
          text: "Villes",
          icon: "periscope"
        },
        {
          key: 6,
          value: "relations",
          text: "Relations",
          icon: "keycdn"
        },
        {
          key: 7,
          value: "situations",
          text: "Situations",
          icon: "mixcloud"
        },
        {
          key: 8,
          value: "jobs",
          text: "Jobs",
          icon: "react"
        },
        {
          key: 9,
          value: "assurances",
          text: "Assurances",
          icon: "lastfm square"
        },
        {
          key: 10,
          value: "language",
          text: "Language",
          icon: "language"
        },
        {
          key: 11,
          value: "chat",
          text: "Chat",
          icon: "chat"
        }
      ]
    };
  }

  render () {
    return (
      <div>
        <Header
          as="h2"
          icon
          textAlign="center"
        >
          <Image
            circular
            src={dental}
          />
          <Header.Content>uDental Settings</Header.Content>
        </Header>
        <Segment>
          <Settings
            content={this.state.content}
            contentStyle={this.state.contentStyle}
            header={this.state.header}
          />
        </Segment>
      </div>
    );
  }
}

export default SettingsPanel;
