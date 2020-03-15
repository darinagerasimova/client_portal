import React, {useRef} from 'react';
import {Link} from 'react-router-dom';
import {
    Button,
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    Form,
    Input,
    FormGroup,
    FormFeedback,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row
} from 'reactstrap';
import {useForm} from 'react-hook-form'
import {useMutation} from "@apollo/react-hooks";
import {LOGIN} from "../../graphql/login";
import OAuthUtil from "../../utils/oAuthUtil";

export default function Login(props) {
    const {register, handleSubmit, errors, setError} = useForm();
    const ref = useRef(null);
    const [login] = useMutation(LOGIN);
    const onSubmit = (data) => {
        login({variables: data})
            .then((data) => OAuthUtil.storeTokens(data.data.login.accessToken).then(() => props.history.replace('/chat')))
            .catch(() => setError('password', 'invalidPassword', 'Неверное имя пользователя или пароль'));
    };
    return (
        <div className="app flex-row align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md="5">
                        <CardGroup>
                            <Card className="p-4">
                                <CardBody>
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <h1>Login</h1>
                                        <p className="text-muted">Sign In to your account</p>
                                        <FormGroup>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-user"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text"
                                                       placeholder="Username"
                                                       name="username"
                                                       autoComplete="username"
                                                       innerRef={register({required: true})}
                                                       invalid={!!errors.username || !!errors.password}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-lock"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="password"
                                                       placeholder="Password"
                                                       autoComplete="current-password"
                                                       name="password"
                                                       innerRef={register({required: true})}
                                                       invalid={!!errors.password}
                                                />
                                                {!!errors.password &&
                                                <FormFeedback>{errors.password.message}</FormFeedback>}
                                            </InputGroup>
                                        </FormGroup>
                                        <Row>
                                            <Col xs="6">
                                                <Button color="primary" type="submit" className="px-4">Login</Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}