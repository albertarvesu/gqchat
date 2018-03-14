import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { List } from "antd";

import { AddChannelWithMutation } from "./AddChannel";

const ChannelsList = ({ data: { loading, error, channels } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <React.Fragment>
      <AddChannelWithMutation />
      <List
        itemLayout="horizontal"
        dataSource={channels}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={
                <Link
                  to={item.id < 0 ? `/` : `channel/${item.id}`}
                  className={"channel " + (item.id < 0 ? "optimistic" : "")}
                >
                  {item.name}
                </Link>
              }
            />
          </List.Item>
        )}
      />
    </React.Fragment>
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

export const ChannelsListWithData = graphql(channelsListQuery, {
  options: { pollInterval: 5000 }
})(ChannelsList);

export default ChannelsListWithData;
