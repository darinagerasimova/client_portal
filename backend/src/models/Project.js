import mongoose from "mongoose";
import {composeWithMongoose} from "graphql-compose-mongoose";
import {UserGQL} from "./User";
import {Chat} from "./Chat";

const ProjectStory = new mongoose.Schema({
    name: 'string',
    estimate: 'number'
}, {timestamps: true});

const ProjestStepFile = new mongoose.Schema({
    name: 'string',
    extension: 'string',
    size: 'number',
    fileKey: 'string',
}, {timestamps: true});

const ProjectStep = new mongoose.Schema({
    name: 'string',
    dateStart: 'date',
    dateEnd: 'date',
    files: [ProjestStepFile],
    stories: [ProjectStory]
}, {timestamps: true});

const ProjectSchema = new mongoose.Schema({
    name: 'string',
    chatId: {type: mongoose.Schema.Types.ObjectId, ref: 'chat'},
    participantIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    steps: [ProjectStep]
}, {timestamps: true});

ProjectSchema.pre('save', async function (next) {
    const chat = await new Chat({}).save();
    this.chatId = chat._id;
    next();
});

const Project = mongoose.model('project', ProjectSchema);

const ProjectGQL = composeWithMongoose(Project, {});

ProjectGQL.addRelation(
    'participants',
    {
        resolver: () => UserGQL.getResolver('findByIds'),
        prepareArgs: {_ids: (source) => source.participantIds},
        projection: { participantIds: 1 },
    }
);

export {Project, ProjectGQL, ProjectStep, ProjectStory}

new Project({
    name: 'Тестовый проект2',
    participantIds: ['5e78c738a1975e3137a3c1cc'],
    steps: [{
        name: "Тестовый этап",
        dateStart: '2020-01-01',
        dateEnd: '2020-02-01',
        files: [{
            name: "Договор",
            extension: 'pdf',
            size: '1500000',
            fileKey: 'http://s3.int.robotbull.com/client-portal/dogovor.pdf',
        }, {
            name: "Макет",
            extension: 'jpg',
            size: '143000',
            fileKey: 'http://s3.int.robotbull.com/client-portal/ebc7198dad0ee9e7942dab8d411befb2.jpg',
        }],
        stories: [{
            name: "Тестовая история",
            estimate: 10
        }]
    }]
}).save();