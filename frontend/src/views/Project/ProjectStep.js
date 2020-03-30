import React from 'react';
import {useQuery} from "@apollo/react-hooks";
import {GET_PROJECT_STEP} from "../../graphql/getProjectStep";
import ProjectStepInfo from "./ProjectStepInfo/ProjectStepInfo";
import ProjectStepFiles from "./ProjectStepFiles/ProjectStepFiles";
import ProjectStepStories from "./ProjectStepStories/ProjectStepStories";

export default function ProjectStep(props) {
    const {loading, error, data} = useQuery(GET_PROJECT_STEP, {variables: {_id: props.projectId}});
    const step = data?.project.steps.find(step => step._id === props.stepId);
    return (!loading && !error && step) ? (
        <>
            <ProjectStepInfo step={step}/>
            <ProjectStepStories stories={step.stories}/>
            <ProjectStepFiles files={step.files}/>
        </>) : <div/>;
}