import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrash, faPencilAlt, faEllipsisV, faSearch , faEllipsisH} from "@fortawesome/free-solid-svg-icons";
import TitleActionBar from "../../components/TitleActionsBar";
import { fetchRoles, deleteRole, updateRole } from '../../store/actions/RolesAction';
import { Button, Form, InputGroup } from "react-bootstrap";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ReservationGroupTable from "../../components/table/DataTableComponent";

function RoleList() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [editingRow, setEditingRow] = useState(null);
    const [editedRoleName, setEditedRoleName] = useState('');
    const [searchValue, setSearchValue] = useState("");
    const [isFiltered, setIsFiltered] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetchRoles()
            .then((response) => {
                setData(response.data);
                setFilteredData(response.data);
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (rowId) => {
        setEditingRow(rowId);
        setEditedRoleName(data[rowId].rolename);
    };

     const handleSave = () => {
        const updatedData = [...data];
        updatedData[editingRow].rolename = editedRoleName;
        updateRole(updatedData[editingRow].id, { rolename: editedRoleName })
            .then(res => {
                console.log("Role name updated successfully.");
                setEditingRow(null);
                fetchData(); // Refetch data after update
            })
            .catch(err => console.log(err));
    };

    const handleDelete = () => {
        deleteRole(selectedRows)
            .then(res => {
                console.log("Roles deleted successfully.");
                setSelectedRows([]); // Clear selected rows after deletion
                fetchData(); // Refetch data after deletion
            })
            .catch(err => console.log(err));
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
                handleEdit(selectedIndex);
            }
        }
    };


    const handleSearchChange = (e) => {
        const inputValue = e.target.value.toLowerCase();
        setSearchValue(inputValue);
        setIsFiltered(inputValue !== "");

        setFilteredData(
            data.filter(
                (role) =>
                    role.rolename &&
                    role.rolename.toLowerCase().includes(inputValue)
            )
        );
    };

    const clearFilter = () => {
        setSearchValue("");
        setIsFiltered(false);
        setFilteredData(data);
    };

    const handleCellClick = (e, item) => {
        navigate("/rolesManagement/RoleOverview", { state: { roleData: item } });
    };

    return (
        <div className="mb-5 mx-2">
          <TitleActionBar
            Title={"Roles List"}
            PlusAction={() => navigate("/rolesManagement/CreateRole")}
            SaveAction={handleSave}
            DeleteAction={handleDelete}
            MoreOptionsAction={() => {/* Implement more options logic */}}
            EditAction={handleEditIconClick}
            SaveIcon={<FontAwesomeIcon icon={faSave} />}
            DeleteIcon={<FontAwesomeIcon icon={faTrash} />}
            MoreOptionsIcon={<FontAwesomeIcon icon={faEllipsisV} />}
            EditIcon={<FontAwesomeIcon icon={faPencilAlt} />}
          />
      
          <div className="mb-3">
            <InputGroup className="w-25">
              <Form.Control
                className="bg-white form-control-filter"
                placeholder="Search by role name"
                aria-label="Search"
                value={searchValue}
                onChange={handleSearchChange}
              />
              {isFiltered ? (
                <Button
                  variant="primary"
                  className="form-btn"
                  id="button-addon2"
                  onClick={clearFilter}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </Button>
              ) : null}
            </InputGroup>
          </div>
      
          <ReservationGroupTable
          // selectableRows={true}
            setSelectedRows={setSelectedRows}
            paginatedData={isFiltered ? filteredData : data}
            columns={[
                {
              
                selector: (row) => (
                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="view"
                      onChange={() => toggleRowSelection(row.id)}
                      checked={selectedRows.includes(row.id)}
                    />
                    <FontAwesomeIcon
                      icon={faEllipsisH}
                      style={{ cursor: "pointer", marginLeft: "10px" }}
                      onClick={(e) => handleCellClick(e, row)}
                    />
                  </div>
                ),
              },
              {
                name: "Role name",
                selector: (row) => row.rolename,
                sortable: true,
              },
            
            ]}
            handleCellClick={handleCellClick}
          />
        </div>
    );
}

export default RoleList;
