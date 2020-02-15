import express from 'express';
import {ApolloServer} from "apollo-server-express";
import schema from "./schema";

require('./mongoConfig');

const port = 5500;
const app = express();

const server = new ApolloServer({schema});
server.applyMiddleware({app});
app.listen({port}, () => console.log('Server started at port ' + port));