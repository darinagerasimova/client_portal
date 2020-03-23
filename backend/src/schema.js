import {schemaComposer} from "graphql-compose";
import passport from 'passport'
import {ChatGQL} from "./models/Chat";
import {LoginGQL} from "./shemaTypes/login";
import {UserGQL} from "./models/User";
import {ProjectGQL} from "./models/Project";
import pubsub from './subscriptionConfig'

const authMiddleware = async (resolve, source, args, context, info) => {
    try {
        const user = await new Promise((_resolve, reject) => passport.authenticate('jwt', {session: false}, (err, user) => {
            if (err || !user) reject('Invalid token');
            _resolve(user);
        })(context.req, context.res));
        context._user = user;
        return await resolve(source, args, context, info);
    } catch (e) {
        throw new Error(e);
    }
};

schemaComposer.Query.addFields({
    projects: ProjectGQL.getResolver('findMany'),
    project: ProjectGQL.getResolver('findById'),
    users: UserGQL.getResolver('findMany'),
    user: UserGQL.getResolver('findById'),
    chats: ChatGQL.getResolver('findMany', [authMiddleware]),
    me: UserGQL.getResolver('me', [authMiddleware]),
});
schemaComposer.Mutation.addFields({
    addMessage: ChatGQL.getResolver('addMessage', [authMiddleware]),
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