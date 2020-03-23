import React from 'react';
import {Badge, Card, CardBody, CardHeader, Table} from 'reactstrap';
import moment from "moment";
import {Link} from "react-router-dom";

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
                    {props.steps.map(step => <tr key={step._id}>
                        <td>{step.name}</td>
                        <td>{moment(step.dateEnd).format("DD.MM.YYYY")}</td>
                        <td><Badge color={'success'}>В работе</Badge></td>
                    </tr>)}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    )
}
