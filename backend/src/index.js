const http = require('http');
import express from 'express';
import {ApolloServer} from "apollo-server-express";
import schema from "./schema";

require('./mongoConfig');
require('./config/configPassport');

const port = 5500;
const app = express();

const server = new ApolloServer({
    schema, context: ({req, res}) => ({req, res}),
});
server.applyMiddleware({app});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`)
});
