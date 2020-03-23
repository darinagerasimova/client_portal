import React from 'react';
import {Link} from 'react-router-dom';
import {Badge, Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import {useQuery} from "@apollo/react-hooks";
import {GET_PROJECTS} from "../../graphql/getProjects";
import moment from "moment";

function ProjectRow(props) {
    const project = props.project;
    const projectLink = `/projects/${project._id}`;
    return (
        <tr key={project._id}>
            <td><Link to={projectLink}>{project.name}</Link></td>
            <td/>
            <td/>
            <td/>
            <td><Link to={projectLink}><Badge color={'success'}>Активен</Badge></Link></td>
        </tr>
    )
}

export function Projects(props) {
    const {loading, error, data} = useQuery(GET_PROJECTS);
    return (
        <div className="animated fadeIn">
            <Row>
                <Col xl={12}>
                    <Card>
                        <CardHeader>
                            <i className="fa fa-align-justify"></i> Проекты
                        </CardHeader>
                        <CardBody>
                            {!loading && !error &&
                            <Table responsive hover>
                                <thead>
                                <tr>
                                    <th scope="col">Название</th>
                                    <th scope="col">Дата начала</th>
                                    <th scope="col">Дата окончания</th>
                                    <th scope="col">Этап</th>
                                    <th scope="col">Статус</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.projects.map((project) => <ProjectRow key={project._id} project={project}/>)}
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

export default Projects;
