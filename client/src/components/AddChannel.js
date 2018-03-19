import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Button, Input, Row, Col, message } from "antd";

import { channelsListQuery } from "./ChannelsList";

const InputGroup = Input.Group;

class AddChannel extends Component {
  constructor(props) {
    super();
    this.state = {
      channelName: ""
    };
    this.onCreate = this.onCreate.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ channelName: event.target.value });
  }

  onCreate() {
    if (!this.state.channelName) {
      message.error("Channel name is required");
      return;
    }

    this.props
      .mutate({
        variables: { name: this.state.channelName },
        optimisticResponse: {
          __typename: "Mutation",
          addChannel: {
            name: this.state.channelName,
            id: Math.round(Math.random() * -1000000),
            messages: [],
            __typename: "Channel"
          }
        },
        update: (store, { data: { addChannel } }) => {
          const data = store.readQuery({ query: channelsListQuery });
          data.channels.push(addChannel);
          store.writeQuery({ query: channelsListQuery, data });
        }
      })
      .then(({ data }) => {
        this.setState({ channelName: "" });
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
              placeholder="Please enter new channel name"
              defaultValue={this.state.channelName}
              value={this.state.channelName}
              onChange={this.onChange}
              onPressEnter={this.onCreate}
            />
            <Button type="primary" onClick={this.onCreate}>
              Create Channel
            </Button>
          </Col>
        </Row>
      </InputGroup>
    );
  }
}

const addChannelMutation = gql`
  mutation addChannel($name: String!) {
    addChannel(name: $name) {
      id
      name
    }
  }
`;

export const AddChannelWithMutation = graphql(addChannelMutation)(AddChannel);

export default AddChannelWithMutation;
