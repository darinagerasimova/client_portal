import {gql} from 'graphql.macro';

export const GET_PROJECTS = gql`
    query getProjects {
        projects {
            _id,
            name,
        }
    }
`;