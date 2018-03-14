import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { AddChannelWithMutation } from "./components/AddChannel";
import { ChannelsListWithData } from "./components/ChannelsList";

import "./App.css";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:3001/graphql" }),
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
