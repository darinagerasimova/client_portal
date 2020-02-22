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
    addMessage: {
        type: 'chatMessages',
        resolve: payload => {
            return payload.message;
        },
        subscribe: () => pubsub.asyncIterator('addMessage'),
    },
});

export default schemaComposer.buildSchema();