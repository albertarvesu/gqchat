import { PubSub, withFilter } from "graphql-subscriptions";

const channels = [
  {
    id: 1,
    name: "soccer",
    messages: [
      {
        id: 1,
        text: "soccer is life"
      }
    ]
  },
  {
    id: 2,
    name: "baseball",
    messages: [
      {
        id: 2,
        text: "baseball is life"
      }
    ]
  }
];

let nextId = 3;
let nextMessageId = 3;

const pubsub = new PubSub();

export const resolvers = {
  Query: {
    channels: () => channels,
    channel: (root, { id }) =>
      channels.find(channel => channel.id === parseInt(id, 10))
  },
  Mutation: {
    addChannel: (root, args) => {
      const newChannel = { id: nextId++, name: args.name, messages: [] };
      channels.push(newChannel);
      return newChannel;
    },
    addMessage: (root, { message }) => {
      const channel = channels.find(
        channel => channel.id === parseInt(message.channelId, 10)
      );
      if (!channel) throw new Error("Channel does not exist");
      const newMessage = { id: String(nextMessageId++), text: message.text };
      channel.messages.push(newMessage);
      pubsub.publish("messageAdded", {
        messageAdded: newMessage,
        channelId: message.channelId
      });
      return newMessage;
    }
  },
  Subscription: {
    messageAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("messageAdded"),
        (payload, variables) => {
          // The `messageAdded` channel includes events for all channels, so we filter to only
          // pass through events for the channel specified in the query
          return (
            parseInt(payload.channelId, 10) ===
            parseInt(variables.channelId, 10)
          );
        }
      )
    }
  }
};
