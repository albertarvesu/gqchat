import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { List, Row, Spin, Icon } from "antd";

import { AddChannelWithMutation } from "./AddChannel";

import { Header, StyledLink } from "./styled/typography";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const ChannelsList = ({ data: { loading, error, channels } }) => {
  if (loading) {
    return <Spin indicator={antIcon} />;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <React.Fragment>
      <Row type="flex" justify="center">
        <Header>Hola, Welcome to GQ Chat!</Header>
      </Row>

      <AddChannelWithMutation />
      <List
        itemLayout="horizontal"
        header={<Header>Live Channels:</Header>}
        dataSource={channels}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={
                <Link
                  to={item.id < 0 ? `/` : `channel/${item.id}`}
                  className={"channel " + (item.id < 0 ? "optimistic" : "")}
                >
                  <StyledLink>{item.name}</StyledLink>
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
