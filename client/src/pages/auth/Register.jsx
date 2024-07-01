import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Card, Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { createAdmin } from "../../store/actions/AdminActions";
const regex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState({ firstName: "", lastName: "" });
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isTriggerMessage, setIsTriggerMessage] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!emailAddress) {
      setIsTriggerMessage(true);
    } else if (emailAddress && regex.test(emailAddress) && password && name.firstName && name.lastName) {
      const data = {
        firstName: name.firstName,
        lastName: name.lastName,
        email: emailAddress,
        password: password,
        role: "Admin",
      };
      setTimeout(() => {
        dispatch(createAdmin(data));
        toast.success(`Admin Created Successfully`);
      }, 200);
      /*setTimeout(() => {
                                setEmailAddress('');
                                toast.success(`Password reset link sent to your email`);
                        }, 200);*/

      setTimeout(() => navigate("/login"), 1000);
    } else {
      toast.error(`Please fill in all data fields`);
    }
  };

  const handleEmailChange = (e) => {
    setEmailAddress(e.target.value);
    if (e.target.value.length > 1) {
      setIsTriggerMessage(false);
    } else {
      setIsTriggerMessage(true);
    }
  };
  return (
    <div className="common-card-container">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className="justify-content-center">
          <Col xs={0} sm={0} md={1} lg={1} xl={1} xxl={1} />
          <Col
            xs={12}
            sm={12}
            md={10}
            lg={10}
            xl={10}
            xxl={10}
            className="px-2"
          >
            <Card className="border-0 card-layout">
              <Row className="card-row">
                <Col md={6} lg={6} className="logo-container">
                  <Card.Body>
                    <Card.Header className="border-0 bg-transparent text-center">
                      <h3>App Logo</h3>
                    </Card.Header>
                    <Card.Text className="border-0 mt-3 px-2">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </Card.Text>
                  </Card.Body>
                </Col>
                <Col md={6} lg={6} className="card-content-layout">
                  <Card.Body className="card-content-body">
                    <Form onSubmit={onSubmit}>
                      <Card.Title as={"h3"} className="card-title">
                        Register
                      </Card.Title>
                      <div className="card-form">
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="firstName" className="mb-1">
                            First Name
                          </Form.Label>
                          <Form.Control
                            id="firstName"
                            type="text"
                            className={`w-100 form-control`}
                            placeholder=""
                            value={name.firstName}
                            onChange={(e) =>
                              setName({ ...name, firstName: e.target.value })
                            }
                            autoComplete={"current-email"}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide a first name
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="lastName" className="mb-1">
                            Last Name
                          </Form.Label>
                          <Form.Control
                            id="lastName"
                            type="text"
                            className={`w-100 form-control`}
                            placeholder=""
                            value={name.lastName}
                            onChange={(e) =>
                              setName({ ...name, lastName: e.target.value })
                            }
                            autoComplete={"current-email"}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide a last name
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="email" className="mb-1">
                            Email Address
                          </Form.Label>
                          <Form.Control
                            id="email"
                            type="email"
                            className={`w-100 form-control ${
                              isTriggerMessage ||
                              (emailAddress.length > 0 &&
                                !regex.test(emailAddress))
                                ? "is-invalid"
                                : "bg-white"
                            }`}
                            placeholder="Enter email"
                            value={emailAddress}
                            onChange={handleEmailChange}
                            autoComplete={"current-email"}
                          />
                          <Form.Control.Feedback type="invalid">
                            {isTriggerMessage ||
                            (emailAddress.length > 0 &&
                              !regex.test(emailAddress))
                              ? "Please provide a valid email address"
                              : null}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="password" className="mb-1">
                            Password
                          </Form.Label>
                          <Form.Control
                            id="password"
                            type="password"
                            className={`w-100 form-control`}
                            placeholder=""
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete={"current-email"}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide valida password
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                      <Card.Text>
                        <Button type="submit" className="reset-button">
                          Submit
                        </Button>
                      </Card.Text>
                    </Form>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={0} sm={0} md={1} lg={1} xl={1} xxl={1} />
        </Row>
      </Container>
    </div>
  );
};

export default Register;
