import React from 'react';
import {Card, CardBody, CardHeader, Table} from 'reactstrap';

export default function ProjectParticipants(props) {
    return (
        <Card>
            <CardHeader>
                <strong><i className="icon-info pr-1"></i>Участники проекта</strong>
            </CardHeader>
            <CardBody>
                <Table responsive hover>
                    <thead>
                    <tr>
                        <th scope="col">Полное имя</th>
                        <th scope="col">Роль</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.participants.map(participant => <tr key={participant._id}>
                        <td>{participant.fullname}</td>
                        <td>{participant.type === 0 ? 'Сотрудник' : 'Клиент'}</td>
                    </tr>)}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    )
}
