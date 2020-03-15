import mongoose from 'mongoose';
import {composeWithMongoose} from "graphql-compose-mongoose";
import pubsub from '../subscriptionConfig'
import {UserGQL} from "./User";

const Message = new mongoose.Schema({
    senderId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
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
    args: {chatId: 'MongoID!', message: "String!"},
    resolve: async ({args, context}) => {
        const messageId = mongoose.Types.ObjectId();
        await Chat.updateOne({_id: args.chatId}, {$push: {messages: {_id: messageId, senderId: context._user._id, message: args.message}}});
        pubsub.publish('messageAdded', { messageId });
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