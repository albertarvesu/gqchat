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
    }
  }
};
