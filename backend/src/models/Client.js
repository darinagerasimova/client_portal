import mongoose from 'mongoose';
import {composeWithMongoose} from "graphql-compose-mongoose";

export const Client = mongoose.model('client', new mongoose.Schema({
    name: 'string',
    address: 'string',
}));

export const ClientGQL = composeWithMongoose(Client, {});