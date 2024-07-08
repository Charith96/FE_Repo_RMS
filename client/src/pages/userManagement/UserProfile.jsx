import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Button, Image, Alert } from "react-bootstrap";
import { fetchUserData, updateUserData } from "../../store/actions/UserActions";
import TextField from "../../components/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import profileImage from "../../assets/images/pp.png";
import "../../scss/pages.scss"; // Import the custom CSS
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { toastFunction } from "../../components/ToastComponent";
const UserProfilePage = ({ value, mode }) => {
  const userDataById = useSelector((state) => state.userById.userById);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [filteredUserData, setFilteredUserData] = useState({});
  const [isViewMode, setIsViewMode] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showMessage, setShowMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [verifyPasswordError, setVerifyPasswordError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const [validate, setValidate] = useState(true);
  const [verifyPassword, setVerifyPassword] = useState("");
  const [showMatchError, setShowMatchError] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false); // Add showCurrentPassword state

  useEffect(() => {
    const UserId = localStorage.getItem("Userid");
    dispatch(fetchUserData(UserId));
    setId(UserId);
  }, [dispatch]);

  useEffect(() => {
    if (userDataById) {
      setFilteredUserData({
        userID: userDataById.id,
        firstName: userDataById.firstName,
        lastName: userDataById.lastName,
        defaultCompany: userDataById.defaultCompany,
        designation: userDataById.designation,
        primaryRole: userDataById.primaryRole,
        email: userDataById.email,
        password: userDataById.password,
        validFrom: userDataById.validFrom,
        validTill: userDataById.validTill,
        companies: userDataById.companies,
        roles: userDataById.roles,
        imageData: userDataById.imageData,
      });

      if (mode === "view") {
        setIsViewMode(true);
      } else {
        setIsViewMode(false);
      }
    }
  }, [userDataById, mode]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFilteredUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFilteredUserData((prevData) => ({
          ...prevData,
          imageData: reader.result, // Use reader.result directly
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (
      filteredUserData.firstName &&
      filteredUserData.lastName &&
      filteredUserData.imageData
    ) {
      setValidate(true);
      setIsViewMode(true);
    } else {
      isValid = false;
      setValidate(false);
      setIsViewMode(false);
    }

    if (isValid) {
      try {
        const updatedUserData = {
          [id]: id,
          ...filteredUserData,
        };

        await dispatch(updateUserData(id, updatedUserData));
        localStorage.setItem("firstName", filteredUserData.firstName);
        localStorage.setItem("lastName", filteredUserData.lastName);
        localStorage.setItem("imageData", filteredUserData.imageData);
        setShowMessage("success");
        toastFunction("Profile updated Successfully", false);
        setIsViewMode(true);
      } catch (error) {
        console.error("Error updating user:", error);
        setShowMessage("error");
      }
    }
  };

  const handleLogout = () => {
    // Implement your logout functionality here
    navigate("/login");
  };

  const handleNewPasswordChange = (e) => {
    const newPasswordValue = e.target.value;

    setNewPassword(newPasswordValue);

    if (e.target.value.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
    } else {
      setPasswordError("");
    }
  };

  const handleVerifyPasswordChange = (e) => {
    const verifyPasswordValue = e.target.value;

    setVerifyPassword(verifyPasswordValue);

    if (verifyPasswordValue !== newPassword) {
      setVerifyPasswordError("Passwords do not match.");
    } else {
      setVerifyPasswordError("");
      setFilteredUserData((prevData) => ({
        ...prevData,
        password: verifyPasswordValue, // Use reader.result directly
      }));
    }
  };

  const handleEdit = () => {
    setIsViewMode(false);
  };

  return (
    <>
      <Row>
        <Col xs={0} sm={0} md={2} lg={2} xl={2} xxl={1} />
        <Col
          xs={12}
          sm={12}
          md={8}
          lg={8}
          xl={8}
          xxl={10}
          className="body-content"
        >
          <div className="UserProfileDiv">
            <h3>User Profile</h3>
            <div style={{ marginTop: "20px" }}>
              <div className="image-upload-wrapper">
                <Image
                  src={filteredUserData.imageData || profileImage}
                  roundedCircle
                  className="profile-image"
                  fluid
                />
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleImageChange}
                  className="image-upload"
                />
                <FontAwesomeIcon
                  icon={faEdit}
                  className="image-edit-icon"
                  onClick={() => document.getElementById("file-upload").click()}
                />
              </div>
              <p className="profile-Information">
                <span>{filteredUserData.firstName} </span>&nbsp;
                <span>{filteredUserData.lastName} </span>
                <br />
                <span>{filteredUserData.designation} </span>
              </p>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} className="mb-2 form-group-custom">
                <Form.Label column md={3} className="text-md-start">
                  First Name
                </Form.Label>
                <Col md={9}>
                  <TextField
                    id="firstName"
                    value={filteredUserData.firstName}
                    onChange={handleInputChange}
                    disabled={isViewMode}
                    mandatory={true}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-2 form-group-custom">
                <Form.Label column md={3} className="text-md-start">
                  Last Name
                </Form.Label>
                <Col md={9}>
                  <TextField
                    id="lastName"
                    value={filteredUserData.lastName}
                    onChange={handleInputChange}
                    disabled={isViewMode}
                    mandatory={true}
                  />
                </Col>
              </Form.Group>
              <hr />
              <h3 className="subsection-heading">Change Password</h3>
              {isViewMode ? (
                <Form.Group
                  as={Row}
                  className="mb-2 form-group-custom"
                ></Form.Group>
              ) : (
                <>
                  <Form.Group as={Row} className="mb-2 form-group-custom">
                    <Form.Label column md={3} className="text-md-start">
                      Current Password
                    </Form.Label>
                    <Col md={9}>
                      <TextField
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        mandatory={false}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                      <div
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      >
                        {/* {showCurrentPassword ? (
                          <FontAwesomeIcon
                            style={{ color: "#1d496d" }}
                            icon={faEye}
                          />
                        ) : (
                          <FontAwesomeIcon
                            style={{ color: "#1d496d" }}
                            icon={faEyeSlash}
                          />
                        )} */}
                      </div>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-2 form-group-custom">
                    <Form.Label column md={3} className="text-md-start">
                      New Password
                    </Form.Label>
                    <Col md={9}>
                      <TextField
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        mandatory={false}
                      />
                      <div onClick={() => setShowNewPassword(!showNewPassword)}>
                        {/* {showNewPassword ? (
                          <FontAwesomeIcon
                            style={{ color: "#1d496d" }}
                            icon={faEye}
                          />
                        ) : (
                          <FontAwesomeIcon
                            style={{ color: "#1d496d" }}
                            icon={faEyeSlash}
                          />
                        )} */}
                      </div>
                      {passwordError && (
                        <div className="text-danger">{passwordError}</div>
                      )}
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-2 form-group-custom">
                    <Form.Label column md={3} className="text-md-start">
                      Verify Password
                    </Form.Label>
                    <Col md={9}>
                      <TextField
                        type={showVerifyPassword ? "text" : "password"}
                        value={verifyPassword}
                        onChange={handleVerifyPasswordChange}
                        mandatory={false}
                      />
                      <div
                        onClick={() =>
                          setShowVerifyPassword(!showVerifyPassword)
                        }
                      >
                        {/* {showVerifyPassword ? (
                          <FontAwesomeIcon
                            style={{ color: "#1d496d" }}
                            icon={faEye}
                          />
                        ) : (
                          <FontAwesomeIcon
                            style={{ color: "#1d496d" }}
                            icon={faEyeSlash}
                          />
                        )} */}
                      </div>
                      {verifyPasswordError && (
                        <div className="text-danger">{verifyPasswordError}</div>
                      )}
                    </Col>
                  </Form.Group>
                </>
              )}

              <div className="d-flex justify-content-end mt-4">
                {!isViewMode && (
                  <Button
                    type="submit"
                    className="btn-primary mx-2"
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                )}

                {isViewMode ? (
                  <Button className="btn-primary mx-2" onClick={handleEdit}>
                    Edit
                  </Button>
                ) : (
                  <Button
                    className="btn-secondary mx-2"
                    onClick={() => {
                      setIsViewMode(true);
                      setCurrentPassword("");
                      setNewPassword("");
                      setVerifyPassword("");
                      setPasswordError("");
                      setVerifyPasswordError("");
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>

              {/* {showMessage && (
                <Alert
                  variant={showMessage === "success" ? "success" : "danger"}
                  className="mt-3"
                >
                  {showMessage === "success"
                    ? "Your profile has been updated successfully."
                    : "Error updating your profile. Please try again later."}
                </Alert>
              )} */}
            </Form>
          </div>
        </Col>
        <Col xs={0} sm={0} md={2} lg={2} xl={2} xxl={1} />
      </Row>
    </>
  );
};

export default UserProfilePage;
