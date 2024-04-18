import React, { useEffect, useState, useRef } from "react";
import { deleteReservationItem } from "../../store/actions/ReservationItemActions";
import ReservationItemTable from "../../components/table/DataTableComponent";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fetchReservationItems,
  resetReservationItemState,
} from "../../store/actions/ReservationItemActions";

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

const ReservationItemList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchReservationItemData = useSelector(
    (state) => state.getReservationItem?.fetchReservationItem || []
  );

  const deleteReservationItemData = useSelector(
    (state) => state.deleteReservationItem.deleteReservationItem
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
    dispatch(fetchReservationItems());
    if (deleteReservationItemData) {
      dispatch(fetchReservationItems());
    }
  }, [dispatch, deleteReservationItemData]);

  useEffect(() => {
    if (fetchReservationItemData && fetchReservationItemData.length > 0) {
      setFilteredData(fetchReservationItemData);

      const start = currentPage * perPage;
      const end = start + perPage;
      const slicedData = filteredData?.slice(start, end);
      setPaginatedData(slicedData);

      if (selectedRows.length === 1) {
        setIsDeleteDisable(false);
      } else {
        setIsDeleteDisable(true);
      }
    }
  }, [
    fetchReservationItemData,
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
          <span
            className="ellipsis tree-dots"
            onClick={(e) => handleCellClick(e, row)}
          >
            <FontAwesomeIcon icon={faEllipsisH} />
          </span>
        </div>
      ),
    },
    {
      name: "Group",
      selector: (row) => row.reservationGroup,
      sortable: true,
      grow: 2,
    },
    {
      name: "ItemId",
      selector: (row) => row.itemId,
      sortable: true,
      grow: 2,
    },
    {
      name: "ItemName",
      selector: (row) => row.itemName,
      sortable: true,
      grow: 2,
    },
    {
      name: "NoOfReservations",
      selector: (row) => row.noOfReservations,
      sortable: true,
      grow: 2,
    },
    {
      name: "Capacity",
      selector: (row) => row.capacity,
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

  //handle edit click
  const handleEditNavigation = () => {
    if (selectedRows.length === 1) {
      let data = { id: contextMenuRow.id };
      let dataString = JSON.stringify(data);
      navigate(
        `/reservationManagement/reservation/reservationItems/reservationItemOverview?data=${encodeURIComponent(
          dataString
        )}`,
        { state: { mode: "edit" } }
      );
    }
  };

  //handle detail click
  const handleDetailedNavigation = () => {
    if (selectedRows.length === 1) {
      let data = { id: contextMenuRow.id };
      let dataString = JSON.stringify(data);
      navigate(
        `/reservationManagement/reservation/reservationItems/reservationItemOverview?data=${encodeURIComponent(
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
    if (fetchReservationItemData && fetchReservationItemData.length > 0) {
      if (searchTerm === "") {
        setCurrentPage(0);
        setFilteredData(fetchReservationItemData);
      } else {
        const filtered = fetchReservationItemData.filter((item) =>
          item.itemId
            ?.toString()
            .toLowerCase()
            .includes(searchTerm?.toLowerCase())
        );
        setIsFiltered(true);
        dispatch(resetReservationItemState(filtered));
        setFilteredData(filtered);
      }
    }
  };

  const confirmDelete = () => {
    if (selectedRows.length === 1) {
      try {
        dispatch(deleteReservationItem(selectedRows[0]?.id));
        toast.success("Record Successfully deleted!");
      } catch (error) {
        toast.error("Error deleting row. Please try again.");
      } finally {
        setShowConfirmation(false);
      }
    }
  };

  const handleCreate = () => {
    navigate("/reservationManagement/reservation/createReservationItem");
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
    dispatch(fetchReservationItems());
    setIsFiltered(false);
    setCurrentPage(0);
  };

  const isSingleRecordSelected = selectedRows.length === 1 && false;

  return (
    <div className="mb-5 mx-2">
      <TitleActionBar
        Title={"Reservation Item List"}
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
              placeholder="Search Reservation Item"
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

      <ReservationItemTable
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
          "The selected Reservation Item will be deleted. Do you wish to continue?"
        }
        type={"Yes"}
        action={() => {
          confirmDelete();
        }}
      />
    </div>
  );
};

export default ReservationItemList;
