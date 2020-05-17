import {gql} from 'graphql.macro';

export const GET_CHAT = gql`
    query getChat($_id: MongoID!) {
        me {
            _id
        }
        chat(_id: $_id) {
            _id
            messages {
                _id
                message
                fileUrl
                createdAt
                sender {
                    _id
                }
            }
        }
    }
`;
