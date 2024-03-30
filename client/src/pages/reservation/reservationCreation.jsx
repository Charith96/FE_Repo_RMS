import React, { useEffect, useRef, useState } from "react";
import { deleteReservationGroup } from "../../store/actions/ReservationGroupActions";
import ReservationGroupTable from "../../components/table/DataTableComponent";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fetchReservationGroups,
  resetReservationGroupState,
} from "../../store/actions/ReservationGroupActions";
import {
  faArrowUpRightFromSquare,
  faEdit,
  faEllipsisH,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Row, Button, Form, InputGroup,Col } from "react-bootstrap";
import TitleActionBar from "../../components/TitleActionsBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastFunction } from "../../components/ToastComponent";
import { fetchCompanyData, fetchRoleData,fetchItemData,fetchData } from '../../store/actions/UserActions';
import { selectUserData } from '../../store/Store';
import {
  createReservationGroup,
  resetManageReservationGroupState,
} from "../../store/actions/ReservationGroupActions";
import FormButton from "../../components/FormButton";
import TextField from "../../components/TextField";


const ReservationGroupList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchReservationGroupData = useSelector(
    (state) => state.getReservationGroup.fetchReservationGroup
  );
  const deleteReservationGroupData = useSelector(
    (state) => state.deleteReservationGroup.deleteReservationGroup
  );
  const [paginatedData, setPaginatedData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [selectedItems,setSelectedItems] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isAddDisable, setIsAddDisable] = useState(false);
  const [isEditDisable, setIsEditDisable] = useState(true);
  const [isSaveDisable, setIsSaveDisable] = useState(true);
  const [isDeleteDisable, setIsDeleteDisable] = useState(true);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [contextMenuRow, setContextMenuRow] = useState(null);
  const [emaiEntered, setemaiEntered] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage, setPerPage] = useState(5);

  const toggledClearRows = useRef(false);
  const userData = useSelector(selectUserData);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [viewBtn,setViewBtn]=useState(false);
  const [groupID,setGroupID]=useState("");
  
  

  const [formData, setFormData] = useState({
    // userID: "",
    firstName: "",
    lastName: "",
    defaultCompany: "",
    designation: "",
    primaryRole: "",
    email: "",
    password: "",
    validFrom: "",
    validTill: "",
    companies: [],
    roles: [],
  });
  useEffect(() => {
    dispatch(fetchReservationGroups());
    dispatch(fetchItemData());
    dispatch(fetchData());
  }, [formData.defaultCompany,dispatch]);

  useEffect(() => {
  
      setGroupData(fetchReservationGroupData);
       
console.log(userData);
  }, [
    fetchReservationGroupData,
    groupData,
    userData

  
  ]);

 

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    
    console.log(e);
    console.log("Value:", value);
    if (id === "defaultCompany" ) {

      const selectedGroup = groupData.find(group => group.groupName === value);
       setGroupID(value);
      const selectItems=userData.itemcreation.filter(item=>item.reservationGroup===selectedGroup.id)
      setSelectedItems(selectItems);
      console.log(selectedItems);
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      
      }));
    } else if (id === "customerID") {
      const customer=userData.users.find(customer=>customer.userID===value);
      
      if(!customer){
  
        setShowMessage(true);
      }else{
        setShowMessage(false);
        setemaiEntered(true);
        setFormData((prevState) => ({
          ...prevState,
          [id]: value,
       
        }));
      }
     
    } else  if (id === "item") {
        
    
     navigate(`/reservation/timeSlots`,{state:{groupId:groupID}});
      setFormData((prevState) => ({
        ...prevState,
        email: value,
        userID: value,
      }));
    } else {
   
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
    const {
      firstName,
      lastName,
      defaultCompany,
      designation,
      primaryRole,
      email,
      password,
      validFrom,
      validTill,
  } = formData;
    if (
      firstName &&
      lastName &&
      defaultCompany &&
      designation &&
      primaryRole &&
      email &&
      password &&
      validFrom &&
      validTill
  ) {
      setViewBtn(true);
  } else {
      setViewBtn(false);
  }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
     
      setFormSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
      toastFunction("Something went wrong!", true);
    }
    setFormSubmitted(true);
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
          className="body-content px-5 pt-4 pb-4 mb-5"
        >
          <div>
            <h3 className="mb-5">Create Reservations</h3>
            <Form onSubmit={handleSubmit}>
              <TextField
                id="reservationID"
                label="Reservation ID:"
                onChange={handleInputChange}
                value={formData.userID}
                disabled={true}
             
              />
             <TextField
                id="customerID"
                label="customer ID:"
                onChange={handleInputChange}
                value={formData.userID}
                disabled={false}
                type="email"
              />{showMessage &&
             <><span id="message">Customer not found</span><br></br></>
              }

              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={3}>
                  Group
                </Form.Label>
                <Col md={9}>
                  <Form.Select
                    id="defaultCompany"
                    value={formData.defaultCompany}
                    onChange={handleInputChange}
                    disabled={!emaiEntered}
                  
                  >
                    <option value="">Select Default Company</option>
                    {groupData.map((group) => (
                      <option key={group.id} value={group.groupName}>
                        {group.groupName}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              
              
              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={3}>
                 Item
                </Form.Label>
                <Col md={9}>
                  <Form.Select
                    id="item"
                    value={formData.primaryRole}
                    onChange={handleInputChange}
                     disabled={!emaiEntered}
                  >
                    <option value="">Select Default Company</option>
                    {selectedItems.map((item) => (
                      <option key={item.id} value={item.itemName}>
                        {item.itemName}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
        
              
                
               { 
              <Form.Group as={Row} className="mb-3">
                <Col className="d-flex justify-content-end">
                  <FormButton
                    type="submit"
                    text="Create"
                    className="form-btn"
                  />
                </Col>
              </Form.Group>}
            </Form>  
          </div>
        </Col>
        <Col xs={0} sm={0} md={2} lg={2} xl={2} xxl={1} />
      </Row>
    </>
  );
};

export default ReservationGroupList;
