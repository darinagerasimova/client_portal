import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {ApolloLink} from 'apollo-link';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const httpLink = new HttpLink({
    uri: 'http://localhost:5500/graphql',
    credentials: 'same-origin'
});

const wsLink = new WebSocketLink({
    uri: `ws://localhost:5500/graphql`,
    options: {
        reconnect: true
    }
});

const link = split(
    ({query}) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const authMiddleware = new ApolloLink((operation, forward) => {

    const token = localStorage.getItem('accessToken');
    operation.setContext({
        headers: {
            authorization: token ? 'JWT ' + token : null
        }
    });
    return forward(operation);
});



const client = new ApolloClient({
    link: ApolloLink.from([
        onError(({graphQLErrors, networkError}) => {
            if (graphQLErrors)
                graphQLErrors.forEach(({message, locations, path}) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                    ),
                );
            if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
        authMiddleware,
        link
    ]),
    cache: new InMemoryCache()
});

export default client;