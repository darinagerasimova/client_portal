import React from 'react';
import {useQuery} from "@apollo/react-hooks";
import {Col, Row} from 'reactstrap';
import {Route, Switch} from 'react-router-dom';
import Chat from "../Project/Chat";
import ProjectInfo from "./ProjectInfo";
import {GET_CHAT_BY_PROJECT} from "../../graphql/getChatByProject";
import ProjectStep from "./ProjectStep";

export default function Project(props) {
    const {loading, error, data} = useQuery(GET_CHAT_BY_PROJECT, {variables: {_id: props.match.params.id}});
    return (
        <div className="">
            <Row>
                <Col lg={6}>
                    <Switch>
                        <Route exact path="/projects/:id"
                               render={(props) => <ProjectInfo projectId={props.match.params.id}/>}/>
                        <Route exact path="/projects/:id/:stepId"
                               render={props => {
                                   console.log(props);
                                   return <ProjectStep projectId={props.match.params.id}
                                                       stepId={props.match.params.stepId}/>}}/>
                    </Switch>
                </Col>
                <Col lg={6}>
                    {!loading && !error && <Chat chatId={data.project.chatId}/>}
                </Col>
            </Row>
        </div>
    )
}
