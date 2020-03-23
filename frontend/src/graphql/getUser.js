import {gql} from 'graphql.macro';

export const GET_USER = gql`
    query getUser($_id: MongoID!) {
        user(_id: $_id) {
            _id,
            fullname,
            username
            createdAt,
            type,
        }
    }
`;