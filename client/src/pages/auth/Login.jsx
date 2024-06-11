import React, { useState } from 'react'
import { Button, Card, CardGroup, Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const Login = () => {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [validate, setValidate] = useState({
        email: false,
        password: false,
    });
    const [triggerMessage, setTriggerMessage] = useState({
        isEmailEmpty: false,
        isPasswordEmpty: false
    });

    const onSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }

        if ((!validate.email) && (!validate.password)) {
            setTriggerMessage({ isEmailEmpty: true, isPasswordEmpty: true })
        } else if (!validate.email) {
            setTriggerMessage({ ...triggerMessage, isEmailEmpty: true })
        } else if (!validate.password) {
            setTriggerMessage({ ...triggerMessage, isPasswordEmpty: true })
        }
    }

    const handleEmailChange = (e) => {
        setEmailAddress(e.target.value);
        if ((e.target.value.length > 1)) {
            setValidate({ ...validate, email: true })
            setTriggerMessage({ ...triggerMessage, isEmailEmpty: false })
        } else {
            setValidate({ ...validate, email: false })
        }
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if ((e.target.value.length > 1)) {
            setValidate({ ...validate, password: true })
            setTriggerMessage({ ...triggerMessage, isPasswordEmpty: false })
        } else {
            setValidate({ ...validate, password: false })
        }
    }

    return (
        <div className="login-container">
            <Container>
                <Row className="justify-content-center">
                    <Col sm={0} xs={0} md={1} />
                    <Col sm={12} xs={12} md={10} className='login-card'>
                        <CardGroup>
                            <Row>
                                <Card className="text-white border-0 left-card py-5" >
                                    <Col className='d-flex justify-content-center align-items-center'>
                                        <Card.Body>
                                            <Card.Header className="border-0 bg-transparent text-center">
                                                <h3>App Logo</h3>
                                            </Card.Header>
                                            <Card.Text className='border-0 mt-3 px-2'>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua.
                                            </Card.Text>
                                        </Card.Body>
                                    </Col>
                                </Card>
                                <Card className="p-4 right-card" >
                                    <h3 className='title'>Login</h3>
                                    <Card.Body>
                                        <Form noValidate onSubmit={onSubmit}>
                                            <Form.Group className="mb-3">
                                                <Form.Label htmlFor='emailAddress'>Email Address</Form.Label><br />
                                                <Form.Control type="email" id='emailAddress' placeholder="Enter email"
                                                    className={`w-100 form-control ${((triggerMessage.isEmailEmpty) || ((emailAddress.length > 0) && (!regex.test(emailAddress)))) ? 'is-invalid' : ((emailAddress.length > 0) && (regex.test(emailAddress))) ? 'bg-white' : 'bg-white'}`}
                                                    value={emailAddress} onChange={handleEmailChange} autoComplete={"current-email"} />
                                                <Form.Control.Feedback type="invalid">
                                                    {((triggerMessage.isEmailEmpty) || ((!emailAddress) || !regex.test(emailAddress))) ? ('Please provide a valid email address')
                                                        : ''}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label htmlFor='password'>Password</Form.Label><br />
                                                <Form.Control type="password" id='password' placeholder="Password"
                                                    className={`w-100 ${((triggerMessage.isPasswordEmpty) || ((password.length > 0) && (password.length <= 8))) ? 'is-invalid' : (password.length >= 8) ? 'bg-white' : 'bg-white'}`}
                                                    value={password} onChange={handlePasswordChange} autoComplete={"current-password"} />
                                                <Form.Control.Feedback type="invalid">
                                                    {((triggerMessage.isPasswordEmpty) || (password.length <= 8)) ? ('Please provide a valid password')
                                                        : ''}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Row className='mt-4'>
                                                <Form.Group as={Col} sm={12} xs={12} md={6} className='checkbox-left'>
                                                    <Form.Check type="checkbox" className='form-checkbox' />Remember Me
                                                </Form.Group>
                                                <Form.Group as={Col} sm={12} xs={12} md={6} className='checkbox-right'>
                                                    <label>
                                                        <NavLink to="/forgot-password" className='text-decoration-none' style={({ isActive }) => ({
                                                            color: isActive ? '#1d496d' : '#1d496d'
                                                        })}>
                                                            Forgot Password?
                                                        </NavLink>
                                                    </label>
                                                </Form.Group>
                                            </Row>
                                            <Button type='submit' className='login-button'>Log In</Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Row>
                        </CardGroup>
                    </Col>
                    <Col sm={0} xs={0} md={1} />
                </Row>
            </Container>
        </div>
    )
}

export default Login