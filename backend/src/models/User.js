import mongoose from 'mongoose';
import {composeWithMongoose} from "graphql-compose-mongoose";

export const User = mongoose.model('user', new mongoose.Schema({
    username: 'string',
}));

const UserGQL = composeWithMongoose(User, {});

UserGQL.addResolver({
    kind: 'query',
    name: 'me',
    type: 'user',
    resolve: async ({context}) => {
        return await User.findById(context._user._id).exec();
    }
});

export {UserGQL};