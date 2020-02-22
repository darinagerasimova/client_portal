import {gql} from "graphql.macro";

export const ADD_CHAT_MESSAGE = gql`
    mutation addChatMessage($chatId: MongoID!, $senderId: MongoID!, $message: String!) {
        addMessage(chatId: $chatId, senderId: $senderId, message: $message)
    }
`;