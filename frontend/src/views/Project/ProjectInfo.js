import React from 'react';
import {Card, CardHeader, CardBody, Table, Badge} from 'reactstrap'
import {useQuery} from "@apollo/react-hooks";
import ProjectSteps from "./ProjectSteps";
import ProjectParticipants from "./ProjectParticipants";
import {GET_PROJECT} from "../../graphql/getProject";

export default function ProjectInfo(props) {
    const {loading, error, data} = useQuery(GET_PROJECT, {variables: {_id: props.projectId}});
    return (!loading && !error) ? (
        <>
            <Card>
                <CardHeader>
                    <strong><i className="icon-info pr-1"/>{data.project.name}</strong>
                </CardHeader>
                <CardBody>
                    <Table responsive hover>
                        <tbody>
                        {/*<tr>*/}
                        {/*    <td>Логин</td>*/}
                        {/*    <td>{data.user.username}</td>*/}
                        {/*</tr>*/}
                        {/*<tr>*/}
                        {/*    <td>Дата регистрации</td>*/}
                        {/*    <td>{moment(data.user.createdAt).format("DD.MM.YYYY HH:mm")}</td>*/}
                        {/*</tr>*/}
                        {/*<tr>*/}
                        {/*    <td>Роль</td>*/}
                        {/*    <td>{data.user.type === 0 ? 'Сотрудник' : 'Клиент'}</td>*/}
                        {/*</tr>*/}
                        <tr>
                            <td>Статус</td>
                            <td><Badge color={'success'}>Активен</Badge></td>
                        </tr>
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            <ProjectSteps steps={data.project.steps} projectId={data.project._id}/>
            <ProjectParticipants participants={data.project.participants}/>
        </>
    ) : <div/>
}