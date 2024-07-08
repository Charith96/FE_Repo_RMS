import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  cilUser,
  cilAccountLogout,
  cilReload,
  cilUserFollow,
} from "@coreui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import defaultProfileImage from "../../assets/images/default_profile.png";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, Image } from "react-bootstrap";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, updateUserData } from "../../store/actions/UserActions";
const AppHeaderDropdown = () => {
  const [selectedUser, setSelectedUser] = useState("Rixano Silva");
  const [selectedCompany, setSelectedCompany] = useState("Default Company");
  const [profileImage, setProfileimage] = useState("Default_image");
  const [defaultCompany, setdefaultCompany] = useState("");
  const [UserID, setUserId] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDataById = useSelector((state) => state.userById.userById);
  useEffect(() => {
    const initializeUserData = () => {
      const firstName = localStorage.getItem("firstName") || "";
      const lastName = localStorage.getItem("lastName") || "";
      const profilePic = localStorage.getItem("imageData") || "";
      const userId = localStorage.getItem("Userid") || "";
      const defaultCompany = localStorage.getItem("defaultCompany") || "";

      setdefaultCompany(defaultCompany);
      setUserId(userId);
      setProfileimage(profilePic);
      setSelectedUser(`${firstName} ${lastName}`);
      if (!firstName && !lastName) {
        setSelectedUser(" ");
      }
      dispatch(fetchUserData(userId));
    };

    // Initialize data when component mounts
    initializeUserData();

    // Event listener to update data when localStorage changes
    const handleStorageChange = () => {
      initializeUserData();
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup: remove event listener when component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleActiveCompany = (value) => {
    setSelectedCompany(value);
    sessionStorage.setItem("activeCompany", value?.companyId);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/logout");
  };

  return (
    <>
      <Dropdown className="nav-profile">
        <div className="profile-container">
          <div className="profile-info">
            <small className="profile-name">{selectedUser}&emsp;</small>
            <form>
              <Dropdown align={"end"} className="company-selection">
                <Dropdown.Toggle className="text-info compay">
                  {selectedCompany}&ensp;
                </Dropdown.Toggle>
                <Dropdown.Menu className="company-menu">
                  {selectedCompany ? (
                    <Dropdown.Item
                      href="#"
                      onClick={() => handleActiveCompany("companyid")}
                    >
                      <span className="d-flex align-items-center">
                        <small>{defaultCompany}</small>&ensp;
                        <div className="d-flex align-item-center active-company">
                          <FontAwesomeIcon
                            icon={faCheck}
                            size="lg"
                            className="text-success"
                          />
                          &nbsp;
                          <small className="status-text">Active</small>
                        </div>
                      </span>
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item>No Company Found</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </form>
          </div>
          <Dropdown align="end">
            <Dropdown.Toggle
              placement="bottom-end"
              className="ms-2 me-2 rounded-circle custom-dropdown-toggle p-0"
            >
              {UserID === "undefined" ||
              userDataById.imageData === "default_image" ? (
                <Image
                  src={defaultProfileImage}
                  className="profile-image"
                  alt="profile"
                  draggable="false"
                />
              ) : (
                <Image
                  src={userDataById.imageData}
                  className="profile-image"
                  alt="profile"
                  draggable="false"
                />
              )}
            </Dropdown.Toggle>
            <Dropdown.Menu
              className="mt-2 profile-dropdown-item"
              placement="bottom-end"
            >
              <Dropdown.Item
                as={Link}
                to={`#`}
                className="bg-light fw-semibold py-2"
              >
                Account
              </Dropdown.Item>
              <Dropdown.Item as={Link} to={`/logout`}>
                <CIcon icon={cilAccountLogout} />
                &emsp;Logout
              </Dropdown.Item>
              {UserID !== "undefined" ? (
                <Dropdown.Item
                  as={Link}
                  to={{
                    pathname: "/UserProfile",
                  }}
                >
                  <CIcon icon={cilUserFollow} />
                  &emsp;User Profile
                </Dropdown.Item>
              ) : null}

              <Dropdown.Item as={Link} to={`/reset-password`}>
                <CIcon icon={cilReload} />
                &emsp;Reset Password
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Dropdown>
    </>
  );
};

export default AppHeaderDropdown;
