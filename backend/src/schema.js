import {schemaComposer} from "graphql-compose";
import passport from 'passport'
import {ClientGQL} from "./models/Client";
import {ChatGQL} from "./models/Chat";
import {LoginGQL} from "./shemaTypes/login";
import pubsub from './subscriptionConfig'

const authMiddleware = async (resolve, source, args, context, info) => {
    try {
        await new Promise((_resolve, reject) => passport.authenticate('jwt', {session: false}, (err, user) => {
            if (err || !user) reject('Invalid token');
            _resolve();
        })(context.req, context.res));
        return await resolve(source, args, context, info);
    } catch (e) {
        throw new Error(e);
    }
};

schemaComposer.Query.addFields({
    clients: ClientGQL.getResolver('findMany'),
    chats: ChatGQL.getResolver('findMany', [authMiddleware]),
});
schemaComposer.Mutation.addFields({
    addMessage: ChatGQL.getResolver('addMessage'),
    login: LoginGQL.getResolver('login'),
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