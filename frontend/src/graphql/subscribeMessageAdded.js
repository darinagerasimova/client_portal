import {gql} from "graphql.macro";

export const SUBSCRIBE_MESSAGE_ADDED = gql`
    subscription onMessageAdded {
        messageAdded
    }
`;