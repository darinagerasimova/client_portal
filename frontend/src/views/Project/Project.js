import React, {Component} from 'react';
import {Badge, Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import {useQuery} from "@apollo/react-hooks";
import {GET_PROJECT} from "../../graphql/getProject";
import moment from "moment";
import ProjectParticipants from "../Project/ProjectParticipants";
import ProjectSteps from "../Project/ProjectSteps";

export default function Project(props) {
    const {loading, error, data} = useQuery(GET_PROJECT, {variables: {_id: props.match.params.id}});
    return (
        <div className="animated fadeIn">
            <Row>
                <Col lg={6}>
                    {!loading && !error &&
                    <>
                        <Card>
                            <CardHeader>
                                <strong><i className="icon-info pr-1"></i>{data.project.name}</strong>
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
                        <ProjectSteps steps={data.project.steps}/>
                        <ProjectParticipants participants={data.project.participants}/>
                    </>
                    }
                </Col>
            </Row>
        </div>
    )
}
