import React from 'react';
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap';

export default function Chat() {
    return (
        <div className="animated fadeIn">
            <Row>
                <Col xs="12">
                    <Card>
                        <CardHeader>
                            <i className="fa fa-align-justify"></i><strong>Chat</strong>
                        </CardHeader>
                        <CardBody>

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
