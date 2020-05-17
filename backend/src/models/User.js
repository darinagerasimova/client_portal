import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import {composeWithMongoose} from "graphql-compose-mongoose";

export const USER_TYPE_EMPLOYEE = 0;
export const USER_TYPE_CLIENT = 1;

export const User = mongoose.model('user', new mongoose.Schema({
    username: 'string',
    password: 'string',
    fullname: 'string',
    type: 'number'
}, { timestamps: true }));

const UserGQL = composeWithMongoose(User, {});

UserGQL.addResolver({
    kind: 'query',
    name: 'me',
    type: 'user',
    resolve: async ({context}) => {
        return await User.findById(context._user._id).exec();
    }
});

const createUser = async (username, password, fullname, type) => {
    const encryptedPassword = bcrypt.hashSync(password, 8);
    return await new User({username, password: encryptedPassword, fullname, type}).save()
};

const validatePassword = async (user, password) => {
    return bcrypt.compareSync(password, user.password);
};

// createUser("admin1", "test", "Василий Попов", USER_TYPE_EMPLOYEE);

export {UserGQL, createUser, validatePassword};