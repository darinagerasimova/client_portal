import React from 'react';
import {Badge, Card, CardBody, CardHeader, Table} from 'reactstrap';
import moment from "moment";
import {Link} from "react-router-dom";

function ProjectRow(props) {
    const step = props.step;
    const projectLink = `/projects/${props.projectId}/${step._id}`;
    return (
        <tr key={step._id}>
            <td><Link to={projectLink}>{step.name}</Link></td>
            <td>{moment(step.dateEnd).format("DD.MM.YYYY")}</td>
            <td><Badge color={'success'}>В работе</Badge></td>
        </tr>
    )
}

export default function ProjectSteps(props) {
    return (
        <Card>
            <CardHeader>
                <strong><i className="icon-info pr-1"></i>Этапы проекта</strong>
            </CardHeader>
            <CardBody>
                <Table responsive hover>
                    <thead>
                    <tr>
                        <th scope="col">Этап</th>
                        <th scope="col">Дата окончания</th>
                        <th scope="col">Статус</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.steps.map(step => <ProjectRow step={step} projectId={props.projectId}/>)}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    )
}
