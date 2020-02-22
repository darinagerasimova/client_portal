import mongoose from 'mongoose';
import {composeWithMongoose} from "graphql-compose-mongoose";
import {ClientGQL} from "./Client";

const Message = new mongoose.Schema({
    senderId: {type: mongoose.Schema.Types.ObjectId, ref: 'client'},
    message: "string"
}, {
    timestamps: true
});

export const Chat = mongoose.model('chat', new mongoose.Schema({
    messages: [Message]
}));

const ChatGQL = composeWithMongoose(Chat, {});

ChatGQL.addResolver({
    name: 'addMessage',
    type: 'String',
    args: {chatId: 'MongoID!', senderId: 'MongoID!', message: "String!"},
    resolve: async ({args}) => {
        await Chat.updateOne({_id: args.chatId}, {$push: {messages: {senderId: args.senderId, message: args.message}}});
        return null;
    }
});

const MessageGQL = ChatGQL.getFieldTC('messages');
MessageGQL.addRelation(
    'sender',
    {
        resolver: () => ClientGQL.getResolver('findById'),
        prepareArgs: {_id: (source) => source.senderId},
        projection: {senderId: 1}
    }
);

export {ChatGQL}