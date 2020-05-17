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
import {EMAIL_REGEX} from "../../misc/regex";

export default function Register(props) {
    const {register, handleSubmit, errors, setError} = useForm();
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
                                        <h1>Регистрация</h1>
                                        <p className="text-muted">Создать аккаунт</p>
                                        <FormGroup>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-user"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text"
                                                       placeholder="ФИО"
                                                       name="fullName"
                                                       autoComplete="fullName"
                                                       innerRef={register({required: true})}
                                                       invalid={errors.fullName}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>@</InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text"
                                                       placeholder="Email"
                                                       name="email"
                                                       autoComplete="email"
                                                       innerRef={register({required: true, pattern: EMAIL_REGEX})}
                                                       invalid={errors.email}
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
                                                       placeholder="Пароль"
                                                       autoComplete="current-password"
                                                       name="password"
                                                       innerRef={register({required: true, minLength: 6})}
                                                       invalid={errors.password}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <Row>
                                            <Col xs="6">
                                                <Button color="success" type="submit" className="px-4">Зарегистрироваться</Button>
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
