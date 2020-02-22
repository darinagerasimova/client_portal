import {schemaComposer} from "graphql-compose";
import {ClientGQL} from "./models/Client";
import {ChatGQL} from "./models/Chat";
schemaComposer.Query.addFields({
   clients: ClientGQL.getResolver('findMany'),
   chats: ChatGQL.getResolver('findMany'),
});

export default schemaComposer.buildSchema();