import {gql} from 'graphql.macro';

export const GET_PROJECT = gql`
    query getProject($_id: MongoID!) {
        project(_id: $_id) {
            _id
            name
            participants {
                fullname
                type
            }
            steps {
                _id
                name
                stories {
                    _id
                    name
                    estimate
                }
            }
        }
    }
`;