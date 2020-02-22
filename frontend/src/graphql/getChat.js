import {gql} from 'graphql.macro';

export const GET_CHAT = gql`
    query getChat {
        chats {
            _id
            messages {
                _id
                message
                createdAt
                sender {
                    _id
                }
            }
        }
    }
`;