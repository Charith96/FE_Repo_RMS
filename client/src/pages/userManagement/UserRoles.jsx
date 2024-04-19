import React, { useEffect, useRef, useState } from "react";
import ReservationGroupTable from "../../components/table/DataTableComponent";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fetchUserRoleData,
  updateUserData,
  fetchUserData
} from "../../store/actions/UserActions";
import {
  faArrowUpRightFromSquare,
  faEdit,
  faEllipsisH,

} from "@fortawesome/free-solid-svg-icons";
import { Row } from "react-bootstrap";
import TitleActionBar from "../../components/TitleActionsBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserData } from "../../store/Store";

const OverviewTable = ({value}) => {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(selectUserData);
 
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
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const totalItems = filteredData.length;
  const toggledClearRows = useRef(false);

  useEffect(() => {
    dispatch(fetchUserRoleData());
    dispatch(fetchUserData(value));
   
  }, []);

  useEffect(() => {
    if (userData.roles && userData.roles.length > 0) {

      setFilteredData(userData.roles);
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
  }, [
    userData,
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
      name: "Role ID",
      selector: (row) => row.id,
      sortable: true,
      grow: 2,
    },
    {
      name: "Role Name",
      selector: (row) => row.name,
      sortable: true,
      grow: 2,
    },
     {
      name: "Status",
      cell: (row) => {

          const defaultStatus = userData.users.primaryRole === row.name ? "default" : " ";
          const status = Array.isArray(userData.users.roles) && userData.users.roles.includes(row.name) ? "granted" : defaultStatus;
          return status;
        },
        
    
      sortable: true,
      grow: 2,
    }
  ];

  const handleCellClick = (e, row) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setMenuVisible(true);
    setContextMenuRow(row);
  };

  const handleEditNavigation = () => {

  };


  const handleCreate = () => {
    navigate("/userManagement/createUsers");
  };

  const handleDetailedNavigation = () => {
  
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

 
  const confirmDelete = () => {
   
  };
  const handleSave = async () => {

    
    if (selectedRows.length === 1) {
        const roleName = selectedRows[0].name;
        if (roleName=== userData.users.primaryRole) {
          console.log("Cannot add default role", roleName);
          return; 
      }
      
        if (!userData.users.roles.includes(roleName)) {
            const updatedRoles = [...userData.users.roles, roleName];
            const updatedUserData = { ...userData.users, roles: updatedRoles };
            await dispatch(updateUserData(value, updatedUserData));
            console.log("Role name added:",roleName );
     
        } else {
            console.log("Role name already exists:", roleName);
        }
    }
};

const handleDelete = async () => {
    if (selectedRows.length === 1) {
        const roleName = selectedRows[0].name;
        if (roleName=== userData.users.primaryRole) {
          console.log("Cannot delete default role", roleName);
          return; 
      }
        if (userData.users.roles.includes(roleName)) {
            const updatedRoles = userData.users.roles.filter(role => role !== roleName);
            const updatedUserData = { ...userData.users, roles: updatedRoles };
            await dispatch(updateUserData(value, updatedUserData));
            console.log("Role name deleted:", roleName);
    
        } else {
            console.log("Role name does not exist:", roleName);
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

      <Row>
        
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

export default OverviewTable;
