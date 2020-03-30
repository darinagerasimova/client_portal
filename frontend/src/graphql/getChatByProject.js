import {gql} from 'graphql.macro';

export const GET_CHAT_BY_PROJECT = gql`
    query getProject($_id: MongoID!) {
        project(_id: $_id) {
            _id
            chatId
        }
    }
`;