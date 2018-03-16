import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

import MessageList from "./MessageList";

const ChannelDetails = ({ data: { loading, error, channel }, match }) => {
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  if (channel === null) {
    return null;
  }

  return (
    <div>
      <Link to="/" className="navbar">
        Home
      </Link>
      <div className="channelName">{channel.name}</div>
      <MessageList messages={channel.messages} />
    </div>
  );
};

export const channelDetailsQuery = gql`
  query ChannelDetailsQuery($channelId: ID!) {
    channel(id: $channelId) {
      id
      name
      messages {
        id
        text
      }
    }
  }
`;

export default graphql(channelDetailsQuery, {
  options: props => ({
    variables: { channelId: props.match.params.channelId }
  })
})(ChannelDetails);
