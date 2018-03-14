import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { List } from "antd";

const ChannelsList = ({ data: { loading, error, channels } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={channels.map(c => c.name)}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta title={item} />
        </List.Item>
      )}
    />
  );
};

export const channelsListQuery = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }
`;

export const ChannelsListWithData = graphql(channelsListQuery)(ChannelsList);

export default ChannelsListWithData;
