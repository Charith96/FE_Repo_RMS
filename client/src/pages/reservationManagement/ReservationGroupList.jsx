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
import { Row, Button, Form, InputGroup } from "react-bootstrap";
import TitleActionBar from "../../components/TitleActionsBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isAddDisable, setIsAddDisable] = useState(false);
  const [isEditDisable, setIsEditDisable] = useState(true);
  const [isSaveDisable, setIsSaveDisable] = useState(true);
  const [isDeleteDisable, setIsDeleteDisable] = useState(true);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [contextMenuRow, setContextMenuRow] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage, setPerPage] = useState(5);
  const totalItems = filteredData.length;
  const toggledClearRows = useRef(false);

  useEffect(() => {
    dispatch(fetchReservationGroups());
    if (deleteReservationGroupData) {
      dispatch(fetchReservationGroups());
    }
  }, [dispatch, deleteReservationGroupData]);

  useEffect(() => {
    if (fetchReservationGroupData && fetchReservationGroupData.length > 0) {
      setFilteredData(fetchReservationGroupData);
    }

    const start = currentPage * perPage;
    const end = start + perPage;
    const slicedData = filteredData?.slice(start, end);
    setPaginatedData(slicedData);

    if (selectedRows.length === 1) {
      setIsDeleteDisable(false);
    } else {
      setIsDeleteDisable(true);
    }
  }, [
    fetchReservationGroupData,
    currentPage,
    perPage,
    filteredData,
    selectedRows,
  ]);

  const columns = [
    {
      name: "",
      cell: (row) => (
        <div className="cell-actions">
          <span className="ellipsis tree-dots" onClick={(e) => handleCellClick(e, row)}>
            <FontAwesomeIcon icon={faEllipsisH} />
          </span>
        </div>
      ),
    },
    {
      name: "Group ID",
      selector: (row) => row.groupId,
      sortable: true,
      grow: 2,
    },
    {
      name: "Group Name",
      selector: (row) => row.groupName,
      sortable: true,
      grow: 2,
    },
  ];

  const handleCellClick = (e, row) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setMenuVisible(true);
    setContextMenuRow(row);
  };

  const handleEditNavigation = () => {
    if (selectedRows.length === 1) {
      let data = { id: contextMenuRow.id };
      let dataString = JSON.stringify(data);
      navigate(
        `/reservationManagement/reservation/reservationGroups/reservationGroupOverview?data=${encodeURIComponent(
          dataString
        )}`,
        { state: { mode: "edit" } }
      );
    }
  };

  const handleDetailedNavigation = () => {
    if (selectedRows.length === 1) {
      let data = { id: contextMenuRow.id };
      let dataString = JSON.stringify(data);
      navigate(
        `/reservationManagement/reservation/reservationGroups/reservationGroupOverview?data=${encodeURIComponent(
          dataString
        )}`,
        { state: { mode: "view" } }
      );
    }
  };

  const customContextMenu = menuVisible && (
    <div
      className="styled-menu"
      style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
    >
      <div className="menu-item" onClick={() => handleEditNavigation()}>
        <FontAwesomeIcon icon={faEdit} /> Edit
      </div>
      <div className="menu-item" onClick={() => handleDetailedNavigation()}>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Details
      </div>
    </div>
  );

  const handleFilter = () => {
    if (fetchReservationGroupData && fetchReservationGroupData.length > 0) {
      if (searchTerm === "") {
        setCurrentPage(0);
        setFilteredData(fetchReservationGroupData);
      } else {
        const filtered = fetchReservationGroupData.filter((item) =>
          item.groupId
            ?.toString()
            .toLowerCase()
            .includes(searchTerm?.toLowerCase())
        );
        setIsFiltered(true);
        dispatch(resetReservationGroupState(filtered));
        setFilteredData(filtered);
      }
    }
  };

  const confirmDelete = () => {
    if (selectedRows.length === 1) {
      try {
        dispatch(deleteReservationGroup(selectedRows[0]?.id));
        toast.success("Record Successfully deleted!");
      } catch (error) {
        toast.error("Error deleting row. Please try again.");
      } finally {
        setShowConfirmation(false);
      }
    }
  };

  const handleCreate = () => {
    navigate("/reservationManagement/reservation/createReservationGroup");
  };

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearFilter = () => {
    setSearchTerm("");
    dispatch(fetchReservationGroups());
    setIsFiltered(false);
    setCurrentPage(0);
  };

  const isSingleRecordSelected = selectedRows.length === 1 && false;

  return (
    <div className="mb-5 mx-2">
      <TitleActionBar
        Title={"Reservation Group List"}
        plustDisabled={isAddDisable}
        editDisabled={isEditDisable}
        saveDisabled={isSaveDisable}
        deleteDisabled={isDeleteDisable}
        PlusAction={() => {
          handleCreate();
        }}
        EditAction={() => {}}
        SaveAction={() => {}}
        DeleteAction={() => {
          handleDelete();
        }}
      />

      <Row>
        <div className="filter-box mb-5">
          <InputGroup className="w-25">
            <Form.Control
              className="bg-white form-control-filter"
              placeholder="Search Reservation Group"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {isFiltered ? (
              <Button
                variant="primary"
                className="form-btn"
                id="button-addon2"
                onClick={clearFilter}
              >
                <FontAwesomeIcon icon={faXmark} size="lg" />
              </Button>
            ) : (
              <Button
                variant="primary"
                className="form-btn"
                id="button-addon2"
                onClick={handleFilter}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Button>
            )}
          </InputGroup>
        </div>
      </Row>

      <ReservationGroupTable
        selectableRows={true}
        selectableRowsSingle={true}
        setPerPage={setPerPage}
        setCurrentPage={setCurrentPage}
        setSelectedRows={setSelectedRows}
        setMenuVisible={setMenuVisible}
        paginatedData={paginatedData}
        filteredData={filteredData}
        totalItems={totalItems}
        currentPage={currentPage}
        perPage={perPage}
        columns={columns}
        menuVisible={menuVisible}
        contextMenuPosition={contextMenuPosition}
        toggledClearRows={toggledClearRows}
        isSingleRecordSelected={isSingleRecordSelected}
      />

      {/* Popup menu */}
      <div>{customContextMenu}</div>

      <DeleteConfirmModel
        show={showConfirmation}
        close={cancelDelete}
        title={"Warning"}
        message={
          "The selected Reservation Group will be deleted. Do you wish to continue?"
        }
        type={"Yes"}
        action={() => {
          confirmDelete();
        }}
      />
    </div>
  );
};

export default ReservationGroupList;
