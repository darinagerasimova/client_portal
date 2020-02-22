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

Chat.create({messages: [{senderId: "5e480954a7b4b65adf453e2e", message: "test"}]});

const ChatGQL = composeWithMongoose(Chat, {});

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