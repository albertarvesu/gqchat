import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { toIdValue } from "apollo-utilities";
import { ApolloLink } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";
import { Row, Col } from "antd";

import { ChannelsListWithData } from "./components/ChannelsList";
import ChannelDetails from "./components/ChannelDetails";

import "./App.css";

const dataIdFromObject = object => object.id;

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      oneSeries: (_, { id }) =>
        toIdValue(cache.config.dataIdFromObject({ __typename: "Channel", id }))
    }
  },
  dataIdFromObject
});

const hasSubscriptionOperation = ({ query: { definitions } }) =>
  definitions.some(
    ({ kind, operation }) =>
      kind === "OperationDefinition" && operation === "subscription"
  );

const apiHost = process.env.REACT_APP_API_HOST;
const wsHost = process.env.REACT_APP_WS_HOST;
const apiPort = process.env.REACT_APP_API_PORT;

const port = apiPort ? `:${apiPort}` : "";

const link = ApolloLink.split(
  hasSubscriptionOperation,
  new WebSocketLink({
    uri: `${wsHost}${port}/subscriptions`,
    options: { reconnect: true }
  }),
  new HttpLink({
    uri: `${apiHost}${port}/graphql`
  })
);

const client = new ApolloClient({
  link,
  cache
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Row>
            <Col span={12} offset={6} className="container">
              <Switch>
                <Route exact path="/" component={ChannelsListWithData} />
                <Route path="/channel/:channelId" component={ChannelDetails} />
              </Switch>
            </Col>
          </Row>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
