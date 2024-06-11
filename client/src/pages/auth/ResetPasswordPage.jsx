import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCol, CContainer, CRow } from '@coreui/react'
import { faEyeSlash, faEye } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useNavigate } from 'react-router-dom';
// add your app logo here
// import {logo} from 'src/assets/images'; 

const PasswordResetForm = () => {

    let navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [showMatchError, setShowMatchError] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [passwordVerifyError, setVerifyPasswordError] = useState('');
    const [showMessage, setShowMessage] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showVerifyPassword, setShowVerifyPassword] = useState(false);

    const cardStyle = {
        padding: '5dvh 5dvw',
        backgroundColor: '#FFFFFF',
        borderRadius: '0.85rem',
        boxShadow: 'rgba(8, 8, 8, 0.2) 0px 3px 29px 0px',
        // boxShadow: 'rgba(100, 100, 111, 0.5) 0px 7px 29px 0px',
    }

    useEffect(() => {
        if (showMessage === 'error' || 'success') {
            const timeoutId = setTimeout(() => {
                handleClose();
            }, 5000);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [showMessage]);

    const handleNewPasswordChange = (e) => {
        const newPasswordValue = e.target.value;

        setNewPassword(newPasswordValue);

        if (e.target.value.length < 7) {
            setPasswordError('Password must be at least 8 characters long.');
        } else {
            setPasswordError('');
        }

    };

    const handleVerifyPasswordChange = (e) => {
        const verifyPasswordValue = e.target.value;
        setVerifyPassword(verifyPasswordValue);

        if (e.target.value !== newPassword) {
            setVerifyPasswordError('Passwords do not match.');
        } else {
            setVerifyPasswordError('');
        }
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        // Validate if new password matches the verification password
        if (newPassword === verifyPassword) {
            setShowMessage('success');
            setShowMatchError(false);
            setTimeout(() => {
                navigate('/login')
            }, 6000);
        } else {
            setShowMessage('error');
        }
    };

    const handleClose = () => {
        setShowMessage('');
    };

    return (
        <CContainer fluid className="card-container">
            <CRow className='vw-100'>
                <CCol />
                <CCol xs={12} sm={8} md={5}>
                    <CCard className='common-box-shadow body-content border-1'>
                        <CCardBody style={cardStyle}>
                            <Row className='mb-5'>
                                <Col className='align-items-center'>
                                    <Col xs={12} md={12} className='border-bottom-1 text-center'>
                                        {/* add your app logo here */}
                                        {/* <img src={logo} style={{ width: '200px' }} alt='logo' className='mx-auto d-block pe-none' /> */}
                                        <h3>App Logo</h3>
                                        <hr />
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <h3 className='text-center mt-3'>Reset your password</h3>
                                    </Col>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group controlId="currentPassword">
                                            <Form.Label className="form-label" style={{ fontWeight: 550 }}>Current Password</Form.Label><br />
                                            <div className='position-relative'>
                                                <Form.Control
                                                    type={showCurrentPassword ? 'text' : 'password'}
                                                    className="form-control w-100"
                                                    value={currentPassword}
                                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                                />
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        right: '10px',
                                                        transform: 'translateY(-50%)',
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                >
                                                    {showCurrentPassword ? <FontAwesomeIcon style={{ color: '#1d496d' }} icon={faEye} /> : <FontAwesomeIcon style={{ color: '#1d496d' }} icon={faEyeSlash} />}
                                                </div>
                                            </div>
                                        </Form.Group><br />

                                        <Form.Group controlId="newPassword">
                                            <Form.Label className="form-label" style={{ fontWeight: 550 }}>New Password</Form.Label><br />
                                            <div className='position-relative'>
                                                <Form.Control
                                                    type={showNewPassword ? 'text' : 'password'}
                                                    value={newPassword}
                                                    onChange={handleNewPasswordChange}
                                                    className="form-control w-100"
                                                />

                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        right: '10px',
                                                        transform: 'translateY(-50%)',
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                >
                                                    {showNewPassword ? <FontAwesomeIcon style={{ color: '#1d496d' }} icon={faEye} /> : <FontAwesomeIcon style={{ color: '#1d496d' }} icon={faEyeSlash} />}
                                                </div>
                                            </div>

                                            {passwordError && <div style={{
                                                color: '#e55353', width: '100%',
                                                marginTop: '0.2rem',
                                                fontSize: '0.875em'
                                            }}>{passwordError}</div>}

                                            <div style={{ marginBottom: '10px' }}>
                                                <PasswordStrengthBar style={{ marginTop: '10px' }} password={newPassword} shortScoreWord={'Too short'} scoreWords={['Weak', 'Okay', 'Good', 'Strong']} />
                                            </div>

                                        </Form.Group>

                                        <Form.Group controlId="verifyPassword">
                                            <Form.Label className="form-label" style={{ fontWeight: 550 }}>Verify New Password</Form.Label><br />
                                            <div className='position-relative'>
                                                <Form.Control
                                                    type={showVerifyPassword ? 'text' : 'password'}
                                                    value={verifyPassword}
                                                    onChange={handleVerifyPasswordChange}
                                                    isInvalid={showMatchError}
                                                    className="form-control w-100"
                                                />
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        right: '10px',
                                                        transform: 'translateY(-50%)',
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() => setShowVerifyPassword(!showVerifyPassword)}
                                                >
                                                    {showVerifyPassword ? <FontAwesomeIcon style={{ color: '#1d496d' }} icon={faEye} /> : <FontAwesomeIcon style={{ color: '#1d496d' }} icon={faEyeSlash} />}
                                                </div>
                                            </div>
                                            {passwordVerifyError && <div style={{
                                                color: '#e55353', width: '100%',
                                                marginTop: '0.4rem',
                                                fontSize: '0.875em'
                                            }}>{passwordVerifyError}</div>}
                                        </Form.Group><br />

                                        <Row className='mt-2'>
                                            <Col xs={6} sm={6} md={6} className="pr-1">
                                                <Button variant="primary" className='btn-style' onClick={() => { navigate('/login') }}>
                                                    Cancel
                                                </Button>
                                            </Col>
                                            <Col xs={6} sm={6} md={6} className="pl-1">
                                                <Button variant="primary" className='btn-style' type='submit' disabled={!(newPassword.length >= 8 && verifyPassword && currentPassword)}>
                                                    Submit
                                                </Button>
                                            </Col>
                                        </Row><br />

                                        {showMessage === 'error' ? (
                                            <Row className='text-center mb-2' style={{ marginTop: '20px' }}>
                                                <Col >
                                                    <Alert variant="danger" onClose={handleClose} dismissible>
                                                        <p>Your attempt at password reset was unsuccessfull.</p>
                                                        <p>Please reset password again.</p>
                                                    </Alert>
                                                </Col>
                                            </Row>
                                        ) : showMessage === 'success' ? (
                                            <Row className='text-center mb-2' style={{ marginTop: '20px' }}>
                                                <Col>
                                                    <Alert variant="success" onClose={handleClose} dismissible>
                                                        <p>Your password has been reset successfully.</p>
                                                        <p>Please login with new password.</p>

                                                    </Alert>
                                                </Col>
                                            </Row>
                                        ) : null}

                                    </Form>
                                </Col>
                            </Row>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol />
            </CRow>
        </CContainer>
    );
};

export default PasswordResetForm;