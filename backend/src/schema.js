import {schemaComposer} from "graphql-compose";
import {ClientGQL} from "./models/Client";

schemaComposer.Query.addFields({
   clients: ClientGQL.getResolver('findMany'),
});

export default schemaComposer.buildSchema();