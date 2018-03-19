import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";
import { Button, Input, Row, Col, message } from "antd";

import { channelDetailsQuery } from "./ChannelDetails";

const InputGroup = Input.Group;

class AddMessage extends Component {
  constructor(props) {
    super();
    this.state = {
      messageText: ""
    };
    this.onCreate = this.onCreate.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ messageText: event.target.value });
  }

  onCreate() {
    const { match } = this.props;
    if (!this.state.messageText) {
      message.error("Message text is required");
      return;
    }

    this.props
      .mutate({
        variables: {
          message: {
            channelId: match.params.channelId,
            text: this.state.messageText
          }
        },
        optimisticResponse: {
          __typename: "Message",
          addMessage: {
            text: this.state.messageText,
            id: Math.round(Math.random() * -1000000),
            __typename: "Message"
          }
        },
        update: (store, { data: { addMessage } }) => {
          // Read the data from the cache for this query.
          const data = store.readQuery({
            query: channelDetailsQuery,
            variables: {
              channelId: match.params.channelId
            }
          });

          if (!data.channel.messages.find(msg => msg.id === addMessage.id)) {
            // Add our Message from the mutation to the end.
            data.channel.messages.push(addMessage);
          }
          // Write the data back to the cache.
          store.writeQuery({
            query: channelDetailsQuery,
            variables: {
              channelId: match.params.channelId
            },
            data
          });
        }
      })
      .then(({ data }) => {
        this.setState({ messageText: "" });
      })
      .catch(error => {
        console.error("there was an error sending the query", error);
      });
  }

  render() {
    return (
      <InputGroup>
        <Row type="flex" justify="center">
          <Col span={20}>
            <Input
              style={{ width: "60%" }}
              placeholder="Leave message to this channel"
              defaultValue={this.state.messageText}
              value={this.state.messageText}
              onChange={this.onChange}
              onPressEnter={this.onCreate}
            />
            <Button type="primary" onClick={this.onCreate}>
              Add Message
            </Button>
          </Col>
        </Row>
      </InputGroup>
    );
  }
}

const addMessageMutation = gql`
  mutation addMessage($message: MessageInput!) {
    addMessage(message: $message) {
      id
      text
    }
  }
`;

const AddMessageWithMutation = graphql(addMessageMutation)(
  withRouter(AddMessage)
);
export default AddMessageWithMutation;
