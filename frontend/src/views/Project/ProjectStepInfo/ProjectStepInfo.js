import React from 'react';
import {Badge, Card, CardBody, CardHeader, Table} from "reactstrap";
import moment from "moment";

export default function ProjectStepInfo(props) {
    return (
        <Card>
            <CardHeader>
                <strong><i className="icon-info pr-1"/>{props.step.name}</strong>
            </CardHeader>
            <CardBody>
                <Table responsive hover>
                    <tbody>
                    <tr>
                        <td>Дата начала</td>
                        <td>{moment(props.step.dateStart).format("DD.MM.YYYY")}</td>
                    </tr>
                    <tr>
                        <td>Дата окончания</td>
                        <td>{moment(props.step.dateEnd).format("DD.MM.YYYY")}</td>
                    </tr>
                    <tr>
                        <td>Статус</td>
                        <td><Badge color={'success'}>В работе</Badge></td>
                    </tr>
                    <tr>
                        <td>Цель этапа</td>
                        <td>С другой стороны рамки и место обучения кадров обеспечивает широкому кругу (специалистов)
                            участие в формировании направлений прогрессивного развития. Таким образом постоянное
                            информационно-пропагандистское обеспечение нашей деятельности способствует подготовки и
                            реализации дальнейших направлений развития. Значимость этих проблем настолько очевидна, что
                            укрепление и развитие структуры влечет за собой процесс внедрения и модернизации дальнейших
                            направлений развития
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
}