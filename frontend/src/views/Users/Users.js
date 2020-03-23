import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Badge, Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import {useQuery} from "@apollo/react-hooks";
import {GET_USERS} from "../../graphql/getUsers";
import moment from "moment";

function UserRow(props) {
    const user = props.user;
    const userLink = `/users/${user._id}`;
    return (
        <tr key={user._id}>
            <td><Link to={userLink}>{user.fullname}</Link></td>
            <td>{moment(user.createdAt).format("DD.MM.YYYY HH:mm")}</td>
            <td>{user.type === 0 ? 'Сотрудник' : 'Клиент'}</td>
            <td><Link to={userLink}><Badge color={'success'}>Активен</Badge></Link></td>
        </tr>
    )
}

export function Users(props) {
    const {loading, error, data} = useQuery(GET_USERS);
    return (
        <div className="animated fadeIn">
            <Row>
                <Col xl={6}>
                    <Card>
                        <CardHeader>
                            <i className="fa fa-align-justify"></i> Пользователи
                        </CardHeader>
                        <CardBody>
                            {!loading && !error &&
                            <Table responsive hover>
                                <thead>
                                <tr>
                                    <th scope="col">Полное имя</th>
                                    <th scope="col">Дата регистрации</th>
                                    <th scope="col">Роль</th>
                                    <th scope="col">Статус</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.users.map((user) => <UserRow key={user._id} user={user}/>)}
                                </tbody>
                            </Table>
                            }
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Users;
