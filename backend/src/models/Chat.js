import mongoose from 'mongoose';
import {composeWithMongoose} from "graphql-compose-mongoose";
import pubsub from '../subscriptionConfig'
import {UserGQL} from "./User";
import {GraphQLUpload} from 'apollo-server-express';
import {s3} from "../s3Config";

const Message = new mongoose.Schema({
    senderId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    message: "string",
    fileUrl: "string"
}, {
    timestamps: true
});

export const Chat = mongoose.model('chat', new mongoose.Schema({
    messages: [Message]
}));

const ChatGQL = composeWithMongoose(Chat, {});

ChatGQL.addResolver({
    kind: "mutation",
    name: 'addMessage',
    type: 'String',
    args: {chatId: 'MongoID!', message: "String!"},
    resolve: async ({args, context}) => {
        const messageId = mongoose.Types.ObjectId();
        await Chat.updateOne({_id: args.chatId}, {
            $push: {
                messages: {
                    _id: messageId,
                    senderId: context._user._id,
                    message: args.message
                }
            }
        });
        pubsub.publish('messageAdded', {messageId});
        return null;
    }
});

ChatGQL.addResolver({
    kind: "mutation",
    name: 'addFileMessage',
    type: 'String',
    args: {file: GraphQLUpload, chatId: "MongoID!"},
    resolve: async ({args: {file, chatId}, context}) => {
        const {filename, createReadStream} = await file;
        const fileStream = createReadStream()
        const uploadParams = {Bucket: process.env.BUCKET, Key: filename, Body: fileStream};
        await s3.upload(uploadParams).promise().then(async (data) => {
            const messageId = mongoose.Types.ObjectId();
            await Chat.updateOne({_id: chatId}, {
                $push: {
                    messages: {
                        _id: messageId,
                        senderId: context._user._id,
                        message: filename,
                        fileUrl: data.Location
                    }
                }
            });
            pubsub.publish('messageAdded', {messageId});
        })
        return null;
    }
});


const MessageGQL = ChatGQL.getFieldTC('messages');
MessageGQL.addRelation(
    'sender',
    {
        resolver: () => UserGQL.getResolver('findById'),
        prepareArgs: {_id: (source) => source.senderId},
        projection: {senderId: 1}
    }
);

export {ChatGQL}
