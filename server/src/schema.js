import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";
import { resolvers } from "./resolvers";

const typeDefs = `
  type Channel {
     id: ID!
     name: String
  }

  type Query {
     channels: [Channel]
  }

  type Mutation {
    addChannel(name: String!): Channel
  }
`;

// Turn string into executable schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create mock data
// addMockFunctionsToSchema({ schema });

export { schema };
