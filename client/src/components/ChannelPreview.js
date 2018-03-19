import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const ChannelPreview = ({ data: { loading, error, channel } }) => {
  return (
    <div>
      <div className="channelName">{channel ? channel.name : "Loading..."}</div>
    </div>
  );
};
export const channelQuery = gql`
  query ChannelQuery($channelId: ID!) {
    channel(id: $channelId) {
      id
      name
    }
  }
`;
export default graphql(channelQuery, {
  options: props => ({
    variables: { channelId: props.channelId }
  })
})(ChannelPreview);
