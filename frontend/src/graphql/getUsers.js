import {gql} from 'graphql.macro';

export const GET_USERS = gql`
    query getUsers {
        users {
            _id,
            fullname,
            createdAt,
            type,
        }
    }
`;