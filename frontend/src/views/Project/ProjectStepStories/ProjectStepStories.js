import React from 'react';
import {Badge, Card, CardBody, CardHeader, Table} from "reactstrap";

function ProjectRow(props) {
    const story = props.story;
    return (
        <tr key={story._id}>
            <td>{story.name}</td>
            <td>{story.estimate}</td>
            <td><Badge color={'success'}>В работе</Badge></td>
        </tr>
    )
}

export default function ProjectStepInfo(props) {
    return (
        <Card>
            <CardHeader>
                <strong><i className="icon-info pr-1"/>Задачи этапа</strong>
            </CardHeader>
            <CardBody>
                <Table responsive hover>
                    <thead>
                    <tr>
                        <th scope="col">Название</th>
                        <th scope="col">Трудозатраты</th>
                        <th scope="col">Статус</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.stories.map(story => <ProjectRow story={story}/>)}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
}