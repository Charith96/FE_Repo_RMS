import React, { useEffect,useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import { useParams } from "react-router-dom";
import {
  faArrowUpRightFromSquare,
  faEdit,
  faEllipsisH,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TitleActionBar from "../../components/TitleActionsBar";
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoles, deleteRole, updateRole } from '../../store/actions/RolesAction';
import { Row, Button, Form, InputGroup } from "react-bootstrap";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ReservationGroupTable from "../../components/table/DataTableComponent";

function RoleList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { value } = useParams();
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

    const [editingRow, setEditingRow] = useState(null);
    const [editedRoleName, setEditedRoleName] = useState('');
    const [searchValue, setSearchValue] = useState("");

    

    // Redux state
    const roles = useSelector(state => state.roles);
    const { roles: data, loading } = roles;

      useEffect(() => {
    dispatch(fetchRoles());
    if (deleteRole) {
      dispatch(fetchRoles());
    }
  }, []);

  useEffect(() => {
    dispatch(fetchRoles()).then(() => {
      if (roles && roles.length > 0 && !isFiltered) {
        setFilteredData(roles);

        const start = currentPage * perPage;
        const end = start + perPage;
        const slicedData = roles?.slice(start, end);
        setPaginatedData(slicedData);

        if (selectedRows.length === 1) {
          setIsDeleteDisable(false);
        } else {
          setIsDeleteDisable(true);
        }
      }
    });
  }, [roles, currentPage, perPage, selectedRows, isFiltered]);

    //table columns
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
        name: "Role Code",
        selector: (row) => row.rolecode,
        sortable: true,
        grow: 2,
      },
      {
        name: "Role Name",
        selector: (row) => row.rolename,
        sortable: true,
        grow: 2,
      },
    ];

    const confirmDelete = () => {
      if (selectedRows.length === 1) {
        try {
          dispatch(deleteRole(selectedRows[0]?.id));
          toast.success("Record Successfully deleted!");
        } catch (error) {
          toast.error("Error deleting row. Please try again.");
        } finally {
          setShowConfirmation(false);
        }
      }
    };
  
    const handleCreate = () => {
      navigate("/rolesManagement/CreateRole");
    };
  
    const handleDelete = () => {
      setShowConfirmation(true);
    };
  
    const cancelDelete = () => {
      setShowConfirmation(false);
    };


  
    const handleEdit = (rowId, rolename) => {
      
    };

    const handleSave = async () => {
       
    };

   

    const toggleRowSelection = (rowId) => {
        const isSelected = selectedRows.includes(rowId);
        if (isSelected) {
            setSelectedRows(selectedRows.filter(id => id !== rowId));
        } else {
            setSelectedRows([...selectedRows, rowId]);
        }
    };

    const handleEditIconClick = () => {
        if (selectedRows.length === 1) {
            const selectedIndex = data.findIndex(item => item.id === selectedRows[0]);
            if (selectedIndex !== -1) {
                handleEdit(selectedRows[0], data[selectedIndex].rolename);
            }
        }
    };

    const handleSearchChange = (e) => {
        const inputValue = e.target.value.toLowerCase();
        setSearchValue(inputValue);
        setIsFiltered(inputValue !== "");
    };

    const clearFilter = () => {
        setSearchValue("");
        setIsFiltered(false);
    };

    const handleCellClick = (e, item) => {
        navigate("/rolesManagement/RoleOverview", { state: { roleData: item } });
    };

    const isSingleRecordSelected = selectedRows.length === 1 && false;

    return (
        <div className="mb-5 mx-2">
      <TitleActionBar
        Title={"Role List"}
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
              placeholder="Search..."
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

      {/* Popup menu 
      <div>{customContextMenu}</div>*/}

      <DeleteConfirmModel
        show={showConfirmation}
        close={cancelDelete}
        title={"Warning"}
        message={
          "The selected Role will be deleted. Do you wish to continue?"
        }
        type={"Yes"}
        action={() => {
          confirmDelete();
        }}
      />
    </div>
    );
}

export default RoleList;
