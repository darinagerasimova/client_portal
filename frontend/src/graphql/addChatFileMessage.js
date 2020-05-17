import {gql} from "graphql.macro";

export const ADD_CHAT_FILE_MESSAGE = gql`
    mutation addChatFileMessage($chatId: MongoID!, $file: Upload!) {
        addFileMessage(chatId: $chatId, file: $file)
    }
`;
