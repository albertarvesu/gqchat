import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

import MessageList from "./MessageList";
import ChannelPreview from "./ChannelPreview";

import { StyledLink, Header } from "./styled/typography";

class ChannelDetails extends Component {
  componentWillMount() {
    this.props.data.subscribeToMore({
      document: messagesSubscription,
      variables: {
        channelId: this.props.match.params.channelId
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const newMessage = subscriptionData.data.messageAdded;
        // don't double add the message
        if (!prev.channel.messages.find(msg => msg.id === newMessage.id)) {
          return Object.assign({}, prev, {
            channel: Object.assign({}, prev.channel, {
              messages: [...prev.channel.messages, newMessage]
            })
          });
        } else {
          return prev;
        }
      }
    });
  }

  render() {
    const { data: { loading, error, channel }, match } = this.props;
    if (loading) {
      return <ChannelPreview channelId={match.params.channelId} />;
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
          <StyledLink>&lt; Back to Channels</StyledLink>
        </Link>
        <Header>{channel.name}</Header>
        <MessageList messages={channel.messages} />
      </div>
    );
  }
}

const messagesSubscription = gql`
  subscription messageAdded($channelId: ID!) {
    messageAdded(channelId: $channelId) {
      id
      text
    }
  }
`;

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
