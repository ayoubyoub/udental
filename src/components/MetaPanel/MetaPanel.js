// Addons
import {map} from "lodash";
// React
import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
// Semantic
import {Segment, Accordion, Header, Icon, Image, List, Dimmer} from "semantic-ui-react";
// Begin
class MetaPanel extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activeIndex: 0,
      lastIndex: 2,
      channel: this.props.currentChannel,
      privateChannel: this.props.isPrivateChannel
    };
  }

  handleActiveIndex = (event, titleProps) => {
    const {index} = titleProps;
    const {activeIndex} = this.state;
    const ind = -1;
    const newIndex = activeIndex === index ? ind : index;
    this.setState({activeIndex: newIndex});
  };

  formatCount = (num) => (num > 1 || num === 0 ? `${num} posts` : `${num} post`);

  displayTopPosters = (posts) => map(posts, (val, key) => (
    <List.Item key={key}>
      <Image
        avatar
        src={this.props.users[val.user].avatar}
      />
      <List.Content>
        <List.Header as="a">{key}</List.Header>
        <List.Description>{this.formatCount(val.count)}</List.Description>
      </List.Content>
    </List.Item>
  ));

  render () {
    const {activeIndex, lastIndex, privateChannel, channel} = this.state;
    const {userPosts, users} = this.props;

    if (privateChannel) {
      return null;
    }

    return (
      <Segment>
        <Dimmer active={!channel} />
        <Header
          as="h3"
          attached="top"
        >
          About # {channel && channel.name}
        </Header>
        <Accordion
          attached="true"
          fluid
          styled
        >
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={this.handleActiveIndex}
          >
            <Icon name="dropdown" />
            <Icon name="info" />
            Channel Details
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>{channel && channel.details}</Accordion.Content>
          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={this.handleActiveIndex}
          >
            <Icon name="dropdown" />
            <Icon name="user circle" />
            Top Posters
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <List>{userPosts && this.displayTopPosters(userPosts)}</List>
          </Accordion.Content>
          <Accordion.Title
            active={activeIndex === lastIndex}
            index={2}
            onClick={this.handleActiveIndex}
          >
            <Icon name="dropdown" />
            <Icon name="pencil alternate" />
            Created By
          </Accordion.Title>
          <Accordion.Content active={activeIndex === lastIndex}>
            <Header as="h3">
              <Image
                circular
                src={channel && users[channel.createdBy].avatar}
              />
              {channel && users[channel.createdBy].name}
            </Header>
          </Accordion.Content>
        </Accordion>
      </Segment>
    );
  }
}
const mapStateToProps = (state) => ({users: state.users});
MetaPanel.propTypes = {
  users: PropTypes.object.isRequired,
  currentChannel: PropTypes.object,
  isPrivateChannel: PropTypes.bool.isRequired,
  userPosts: PropTypes.object
};
export default connect(mapStateToProps)(MetaPanel);
