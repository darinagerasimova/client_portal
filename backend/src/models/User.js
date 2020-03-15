import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import {composeWithMongoose} from "graphql-compose-mongoose";

export const User = mongoose.model('user', new mongoose.Schema({
    username: 'string',
    password: 'string'
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

const createUser = async (username, password) => {
    const encryptedPassword = bcrypt.hashSync(password, 8);
    return await new User({username, password: encryptedPassword}).save()
};

const validatePassword = async (user, password) => {
    return bcrypt.compareSync(password, user.password);
};

// createUser("admin", "test");

export {UserGQL, createUser, validatePassword};