import {gql} from 'graphql.macro';

export const GET_CHAT = gql`
    query getChat {
        clients {
            _id,
            name,
            address
        }
    }
`;