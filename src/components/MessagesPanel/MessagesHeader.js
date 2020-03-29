// Addons
import {isEmpty} from "lodash";
// React
import React from "react";
import PropTypes from "prop-types";
// Semantic
import {Input, Segment, Dimmer, Header} from "semantic-ui-react";
// Begin
const MessagesHeader = (props) => {
  const {channelName, numUniqueUsers, onHandleSearchChange, searchLoading, isPrivateChannel} = props;
  return (
    <Segment>
      <Dimmer active={Boolean(isEmpty(channelName))} />
      <Input
        autoComplete="off"
        fluid
        icon="search"
        inverted
        loading={searchLoading}
        name="searchTerm"
        onChange={onHandleSearchChange}
        placeholder="Search Messages"
        size="large"
      />
      <Header
        as="h3"
        color="blue"
        inverted
      >
        {channelName}
        <Header.Subheader style={{color: "black"}}>{!isPrivateChannel && numUniqueUsers}</Header.Subheader>
      </Header>
    </Segment>
  );
};
MessagesHeader.propTypes = {
  onHandleSearchChange: PropTypes.func.isRequired,
  isPrivateChannel: PropTypes.bool.isRequired,
  channelName: PropTypes.string.isRequired,
  numUniqueUsers: PropTypes.string.isRequired,
  searchLoading: PropTypes.bool
};
export default MessagesHeader;
