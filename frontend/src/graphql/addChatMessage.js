import {gql} from "graphql.macro";

export const ADD_CHAT_MESSAGE = gql`
    mutation addChatMessage($chatId: MongoID!, $message: String!) {
        addMessage(chatId: $chatId, message: $message)
    }
`;