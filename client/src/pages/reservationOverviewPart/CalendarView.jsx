import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReservations, deleteReservation } from "../../store/actions/ReservationAction";
import { Row, Button, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import TitleActionBar from "../../components/TitleActionsBar";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BootstrapCalendar from "../../components/BootstrapCalendar";

const CalendarView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reservations = useSelector((state) => state.reservations.reservations);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const isAddDisable = useRef(true);
  const isDeleteDisable = useRef(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!reservations || reservations.length === 0) {
      dispatch(fetchReservations())
        .then(() => setLoading(false))
        .catch((error) => {
          console.error("Error fetching reservations: ", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
    isAddDisable.current = localStorage.getItem("add") === "false";
    isDeleteDisable.current = localStorage.getItem("delete") === "false";
  }, [dispatch, reservations]);

  useEffect(() => {
    if (reservations) {
      const filtered = searchTerm
        ? reservations.filter((res) =>
            Object.values(res).some((val) =>
              String(val).toLowerCase().includes(searchTerm.toLowerCase())
            )
          )
        : reservations;

      setFilteredData(filtered);
    }
  }, [reservations, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearFilter = () => {
    setSearchTerm("");
  };

  const handleCreate = () => {
    navigate("/Reservations/CreateReservation");
  };

  const handleDelete = () => {
    if (selectedRows.length === 1) {
      setShowConfirmation(true);
    } else {
      toast.warn("Please select a reservation to delete.");
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const confirmDelete = async () => {
    if (selectedRows.length === 1) {
      try {
        const reservationID = selectedRows[0]?.reservationID;
        await dispatch(deleteReservation(reservationID));
        toast.success("Record Successfully deleted!");
        dispatch(fetchReservations());
        setSelectedRows([]);
      } catch (error) {
        console.error("Error deleting reservation:", error);
        toast.error("Error deleting row. Please try again.");
      } finally {
        setShowConfirmation(false);
        setRefreshKey((prevKey) => prevKey + 1);
      }
    }
  };

  const handleDetails = (reservation) => {
    const data = {
      reservationID: reservation.reservationID,
      customerID: reservation.customerID,
      date: reservation.date,
      itemId: reservation.itemId,
      noOfPeople: reservation.noOfPeople,
      time1_time2: `${reservation.time1} - ${reservation.time2}`,
    };
    const dataString = JSON.stringify(data);
    navigate(
      `/reservations/ReservationOverview?data=${encodeURIComponent(dataString)}`,
      { state: { mode: "view" } }
    );
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);
    const [dayMonthYear, time] = formattedDate.split(", ");
    return `${dayMonthYear} - ${time}`;
  };

  const renderReservations = ({ date }) => {
    const dateString = date.toISOString().split("T")[0];
    const reservationsForDate = filteredData.filter((res) => {
      const resDate = new Date(res.time1).toISOString().split("T")[0];
      return resDate === dateString;
    });

    return (
      <div>
        {reservationsForDate.map((res) => (
          <div
            key={res.reservationID}
            onClick={() => handleDetails(res)}
            style={{ cursor: "pointer", color: "blue", margin: "2px 0" }}
          >
            {res.reservationID}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="mb-5 mx-2">
      <TitleActionBar
        Title={"Reservations"}
        plustDisabled={false}
        editDisabled={true}
        saveDisabled={true}
        deleteDisabled={selectedRows.length !== 1 || isDeleteDisable.current}
        PlusAction={handleCreate}
        EditAction={() => {}}
        SaveAction={() => {}}
        DeleteAction={handleDelete}
      />

     

      <BootstrapCalendar
        tileContent={renderReservations}
      />

      <DeleteConfirmModel
        show={showConfirmation}
        close={cancelDelete}
        title={"Warning"}
        message={"The selected Reservation will be deleted. Do you wish to continue?"}
        type={"Yes"}
        action={confirmDelete}
      />
    </div>
  );
};

export default CalendarView;
