import mongoose from 'mongoose';
import {composeWithMongoose} from "graphql-compose-mongoose";

export const User = mongoose.model('user', new mongoose.Schema({
    username: 'string',
}));

// User.create({username: "test"});

export const UserGQL = composeWithMongoose(User, {});