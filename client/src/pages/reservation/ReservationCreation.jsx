import React, { useEffect, useState } from "react";
import { fetchReservationGroups } from "../../store/actions/ReservationGroupActions";
import { Row, Form, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastFunction } from "../../components/ToastComponent";
import { fetchReservationItems } from "../../store/actions/ReservationItemActions";
import { fetchCustomers } from "../../store/actions/CustomerActions";
import FormButton from "../../components/FormButton";

const ReservationGroupList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchReservationGroupData = useSelector(
    (state) => state.getReservationGroup.fetchReservationGroup
  );

  const fetchItem = useSelector(
    (state) => state.getReservationItem.fetchReservationItem
  );

  const [groupData, setGroupData] = useState([]);
  const [groupItem, setGroupItem] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [emaiEntered, setemaiEntered] = useState(false);

  const [itemEntered, setItemEntered] = useState(false);

  const customers = useSelector((state) => state.getCustomer.fetchCustomer);

  const [formData, setFormData] = useState({
    reservationID: "",
    customerID: "",
    group: "",
    itemID: "",
    date: "",
    noOfPeople: "",
  });
  useEffect(() => {
    dispatch(fetchReservationGroups());
    dispatch(fetchReservationItems());
    dispatch(fetchCustomers());
    console.log(groupItem);
  }, [dispatch, groupItem]);

  useEffect(() => {
    setGroupData(fetchReservationGroupData);
    setGroupItem(fetchItem);
  }, [fetchReservationGroupData, fetchItem, customers, groupItem]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "group") {
      if (value === "label") {
        return false;
      } else {
        const selectedGroup = groupData.find((group) => group.id === value);
        console.log(selectedGroup);
        const selectItems = groupItem.filter(
          (item) => item.groupId === selectedGroup.id
        );
        setSelectedItems(selectItems);
        setFormData((prevState) => ({
          ...prevState,
          [id]: value,
        }));
      }
    } else if (id === "customerID") {
      if (value === "label") {
        return false;
      } else {
        setemaiEntered(true);
        const randomString = Math.random().toString(36).substring(2, 8);

        const reservationID = randomString;
        setFormData((prevState) => ({
          ...prevState,
          [id]: value,
          reservationID: reservationID,
        }));
      }
    } else if (id === "item") {
      if (value === "label") {
        return false;
      } else {
        const selectedItem = selectedItems.find(
          (item) => item.itemName === value
        );
        setFormData((prevState) => ({
          ...prevState,
          itemID: selectedItem ? selectedItem.id : "",
        }));
        if (selectedItem) {
          setItemEntered(true);
        }
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      navigate(`/reservations/timeSlots?data=${formData.reservationID}`, {
        state: {
          reservationID: formData.reservationID,
          item: formData.itemID,
          customerid: formData.customerID,
          group: formData.group,
        },
      });
    } catch (error) {
      toastFunction("Something went wrong!", true);
    }
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
              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={3}>
                  Customer ID
                </Form.Label>
                <Col md={9}>
                  <Form.Select id="customerID" onChange={handleInputChange}>
                    <option value="label">Select Customer ID</option>
                    {customers.map((customer) => (
                      <option
                        key={customer.customerID}
                        value={customer.customerID}
                      >
                        {customer.customerID}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={3}>
                  Group
                </Form.Label>
                <Col md={9}>
                  <Form.Select
                    id="group"
                    value={formData.group}
                    onChange={handleInputChange}
                    disabled={!emaiEntered}
                  >
                    <option value="label">Select Resevation Group</option>
                    {groupData.map((group) => (
                      <option key={group.id} value={group.id}>
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
                    value={formData.item}
                    onChange={handleInputChange}
                    disabled={!emaiEntered}
                  >
                    <option value="label">Select Reservation Item</option>
                    {selectedItems.map((item) => (
                      <option key={item.id} value={item.itemName}>
                        {item.itemName}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Col className="d-flex justify-content-end">
                  <FormButton
                    type="submit"
                    text="Next"
                    className="form-btn"
                    disabled={!itemEntered}
                  />
                </Col>
              </Form.Group>
            </Form>
          </div>
        </Col>
        <Col xs={0} sm={0} md={2} lg={2} xl={2} xxl={1} />
      </Row>
    </>
  );
};

export default ReservationGroupList;
