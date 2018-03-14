import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
import bodyParser from "body-parser";

import { schema } from "./src/schema";

const PORT = process.env.PORT || 3001;

const server = express();

dotenv.config();

server.use(
  "/graphql",
  cors(),
  bodyParser.json(),
  graphqlExpress({
    schema
  })
);

server.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

// server.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

server.listen(PORT, () =>
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`)
);
