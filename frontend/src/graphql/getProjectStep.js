import {gql} from 'graphql.macro';

export const GET_PROJECT_STEP = gql`
    query getProjectStep($_id: MongoID!) {
        project(_id: $_id) {
            _id
            steps {
                _id
                name
                dateStart
                dateEnd
                files {
                    name
                    extension
                    size
                    fileKey
                }
                stories {
                    _id
                    name
                    estimate
                }
            }
        }
    }
`;