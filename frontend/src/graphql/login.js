import {gql} from "graphql.macro";

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            accessToken
        }
    }
`;