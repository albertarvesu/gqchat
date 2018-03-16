import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { ChannelsListWithData } from "./components/ChannelsList";
import ChannelDetails from "./components/ChannelDetails";

import "./App.css";

const httpLink = new HttpLink({ uri: "http://localhost:3001/graphql" });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route exact path="/" component={ChannelsListWithData} />
              <Route path="/channel/:channelId" component={ChannelDetails} />
            </Switch>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
