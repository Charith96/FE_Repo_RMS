import React, { useEffect, useRef, useState } from "react";
import ReservationGroupTable from "../../components/table/DataTableComponent";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateUserData, fetchUserData } from "../../store/actions/UserActions";
import {
  faArrowUpRightFromSquare,
  faEdit,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import { Row } from "react-bootstrap";
import TitleActionBar from "../../components/TitleActionsBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRoles } from "../../store/actions/RolesAction";

const OverviewTable = ({ value }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userById.userById);

  const [paginatedData, setPaginatedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const isAddDisable = useRef(false)?.current;
  const isEditDisable = useRef(true)?.current;
  const [isSaveDisable, setIsSaveDisable] = useState(false);
  const [isDeleteDisable, setIsDeleteDisable] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const totalItems = filteredData.length;
  const toggledClearRows = useRef(false);
  const roles = useSelector((state) => state.fetchRoles.roles);

  useEffect(() => {
    dispatch(fetchRoles());
    dispatch(fetchUserData(value));
  }, [dispatch, value]);

  useEffect(() => {
    if (roles && roles.length > 0) {
      setFilteredData(roles);
    }

    const start = currentPage * perPage;
    const end = start + perPage;
    const slicedData = filteredData?.slice(start, end);
    setPaginatedData(slicedData);

    if (selectedRows.length === 1) {
      setIsDeleteDisable(false);
      setIsSaveDisable(false);
    } else {
      setIsDeleteDisable(true);
    }
  }, [roles, currentPage, perPage, filteredData, selectedRows, userData]);

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
      name: "Role ID",
      selector: (row) => row.roleID,
      sortable: true,
      grow: 2,
    },
    {
      name: "Role Name",
      selector: (row) => row.roleName,
      sortable: true,
      grow: 2,
    },
    {
      name: "Status",
      cell: (row) => {
        const defaultStatus =
          userData.primaryRole === row.roleName ? "default" : " ";
        const status =
          Array.isArray(userData.roles) &&
          userData.roles.includes(row.roleName) &&
          userData.primaryRole !== row.roleName
            ? "granted"
            : defaultStatus;
        return status;
      },

      sortable: true,
      grow: 2,
    },
  ];

  const handleCellClick = (e, row) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setMenuVisible(true);
  };

  const handleEditNavigation = () => {};

  const handleCreate = () => {
    navigate("/userManagement/createUsers");
  };

  const handleDetailedNavigation = () => {};

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

  const confirmDelete = () => {};
  const handleSave = async () => {
    if (selectedRows.length === 1) {
      const roleName = selectedRows[0].roleName;
      if (roleName === userData.primaryRole) {
        return "default";
      }

      if (!userData.roles.includes(roleName)) {
        const updatedRoles = [...userData.roles, roleName];
        const updatedUserData = {
          userid: userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          defaultCompany: userData.defaultCompany,
          designation: userData.designation,
          primaryRole: userData.primaryRole,
          email: userData.email,
          password: userData.password,
          validFrom: userData.validFrom,
          validTill: userData.validTill,
          companies: userData.companies,
          roles: updatedRoles,
          imageData: userData.imageData,
        };
        await dispatch(updateUserData(value, updatedUserData));
        dispatch(fetchUserData(value));
      } else {
      }
    }
  };

  const handleDelete = async () => {
    if (selectedRows.length === 1) {
      const roleName = selectedRows[0].roleName;
      if (roleName === userData.primaryRole) {
        return;
      }
      if (userData.roles.includes(roleName)) {
        const updatedRoles = userData.roles.filter((role) => role !== roleName);
        const updatedUserData = {
          userid: userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          defaultCompany: userData.defaultCompany,
          designation: userData.designation,
          primaryRole: userData.primaryRole,
          email: userData.email,
          password: userData.password,
          validFrom: userData.validFrom,
          validTill: userData.validTill,
          companies: userData.companies,
          roles: updatedRoles,
          imageData: userData.imageData,
        };
        await dispatch(updateUserData(value, updatedUserData));
        dispatch(fetchUserData(value));
      } else {
      }
    }
  };
  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const isSingleRecordSelected = selectedRows.length === 1 && false;

  return (
    <div className="mb-5 mx-2">
      <TitleActionBar
        Title={"User Roles"}
        plustDisabled={isAddDisable}
        editDisabled={isEditDisable}
        saveDisabled={isSaveDisable}
        deleteDisabled={isDeleteDisable}
        PlusAction={() => {
          handleCreate();
        }}
        EditAction={() => {}}
        SaveAction={() => {
          handleSave();
        }}
        DeleteAction={() => {
          handleDelete();
        }}
      />

      <Row></Row>

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

export default OverviewTable;
