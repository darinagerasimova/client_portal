import {schemaComposer} from "graphql-compose";
import {ClientGQL} from "./models/Client";
import {ChatGQL} from "./models/Chat";
import pubsub from './subscriptionConfig'

schemaComposer.Query.addFields({
    clients: ClientGQL.getResolver('findMany'),
    chats: ChatGQL.getResolver('findMany'),
});
schemaComposer.Mutation.addFields({
    addMessage: ChatGQL.getResolver('addMessage'),
});
schemaComposer.Subscription.addFields({
    messageAdded: {
        type: 'MongoID',
        resolve: payload => {
            return payload.messageId;
        },
        subscribe: () => pubsub.asyncIterator('messageAdded'),
    },
});

export default schemaComposer.buildSchema();