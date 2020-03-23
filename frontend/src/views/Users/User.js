import React, {Component} from 'react';
import {Badge, Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import {useQuery} from "@apollo/react-hooks";
import {GET_USER} from "../../graphql/getUser";
import moment from "moment";

export default function User(props) {
    const {loading, error, data} = useQuery(GET_USER, {variables: {_id: props.match.params.id}});
    return (
        <div className="animated fadeIn">
            <Row>
                <Col lg={6}>
                    <Card>
                        {!loading && !error &&
                        <>
                            <CardHeader>
                                <strong><i className="icon-info pr-1"></i>{data.user.fullname}</strong>
                            </CardHeader>
                            <CardBody>
                                <Table responsive hover>
                                    <tbody>
                                    <tr>
                                        <td>Логин</td>
                                        <td>{data.user.username}</td>
                                    </tr>
                                    <tr>
                                        <td>Дата регистрации</td>
                                        <td>{moment(data.user.createdAt).format("DD.MM.YYYY HH:mm")}</td>
                                    </tr>
                                    <tr>
                                        <td>Роль</td>
                                        <td>{data.user.type === 0 ? 'Сотрудник' : 'Клиент'}</td>
                                    </tr>
                                    <tr>
                                        <td>Статус</td>
                                        <td><Badge color={'success'}>Активен</Badge></td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </>
                        }
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
