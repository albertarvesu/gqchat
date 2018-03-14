import React, { Component } from "react";
import { ApolloProvider, createNetworkInterface } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { AddChannelWithMutation } from "./components/AddChannel";
import { ChannelsListWithData } from "./components/ChannelsList";

import "./App.css";

const networkInterface = createNetworkInterface({
  uri: "http://localhost:4000/graphql"
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      setTimeout(next, 500);
    }
  }
]);

const client = new ApolloClient({
  // link: new HttpLink({ uri: "http://localhost:3001/graphql" }),
  networkInterface,
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <AddChannelWithMutation />
          <ChannelsListWithData />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
