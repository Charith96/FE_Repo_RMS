import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { SessionModel } from 'src/components/modals/SessionModel';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {

  let navigate = useNavigate();
  const [showSessionClosed, setShowSessionClosed] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      // setShowSessionClosed(true);
    }, 500)
  }, []);

  // handle session model
  const handleSessionModel = () => {
    setShowSessionClosed(!showSessionClosed);
  }

  const handleNavigation = () => {
    handleSessionModel();
    navigate('/login');
  }

  return (
    <Container fluid className="min-vh-100 login-container">
      <Row className='vw-100'>
        <Col />
        <Col xs={12} sm={9} md={5}>
          <Card className='logout-card'>
            <Card.Header className='border-0 bg-transparent'>
              <Row>
                <Col className='d-flex-column text-center'>
                  <Card.Text as='h2' className='text-center mt-4'>
                    You've been Logged Out
                  </Card.Text>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className='message-body'>
              <Card.Text as='h6' className='message-text'>
                You have been logged out from the InventoLink workplace, please login again.
              </Card.Text>
            </Card.Body>
            <Card.Footer className='login-footer'>
              <Button variant="primary" className='login-button' onClick={() => { navigate('/login') }}>
                Login Again
              </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col />
      </Row>

      <SessionModel
        show={showSessionClosed}
        close={handleSessionModel}
        title={"Session Expiring !"}
        message={<>Sorry, your session has expired!<br />Please login again.</>}
        actionType={"Ok"}
        action={() => { handleNavigation() }}
      />
    </Container>
  );
};

export default LogoutPage;