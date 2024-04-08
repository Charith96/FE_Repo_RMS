import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TitleActionBar from "../../components/TitleActionsBar";
import { Row, Button, Form, InputGroup } from "react-bootstrap";
import {
    faSave,
    faTrash,
    faPencilAlt,
    faEllipsisV,
    faEllipsisH,
    faMagnifyingGlass,
    faXmark,
  } from "@fortawesome/free-solid-svg-icons";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const ROLE_URL = '/Roles';

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
        axios.get(`${BASE_URL}${ROLE_URL}`)
            .then((response) => {
                setData(response.data);
                setFilteredData(response.data);
            })
            .catch(err => console.log(err));
    };

    const deleteRole = () => {
        axios.delete(`${BASE_URL}${ROLE_URL}/${selectedRows}`)
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

    const handleEdit = (rowId) => {
        setEditingRow(rowId);
        setEditedRoleName(data[rowId].rolename);
    };

    const handleSave = () => {
        // Save edited role name
        const updatedData = [...data];
        updatedData[editingRow].rolename = editedRoleName;
        axios.put(`${BASE_URL}${ROLE_URL}/${updatedData[editingRow].id}`, { rolename: editedRoleName })
            .then(res => {
                console.log("Role name updated successfully.");
                setEditingRow(null);
                fetchData(); // Refetch data after update
            })
            .catch(err => console.log(err));
    };

    const handleMoreOptions = () => {
        // Implement the logic for more options
    };

    const handleCreate = () => {
        navigate("/rolesManagement/CreateRole");
    };

    const handleEditIconClick = () => {
        // Ensure there is exactly one selected row
        if (selectedRows.length === 1) {
            // Find the index of the selected row in the data array
            const selectedIndex = data.findIndex(item => item.id === selectedRows[0]);
            // If the selected row exists in the data array
            if (selectedIndex !== -1) {
                handleEdit(selectedIndex); // Pass the index to handleEdit
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
                PlusAction={handleCreate}
                SaveAction={handleSave}
                DeleteAction={deleteRole}
                MoreOptionsAction={handleMoreOptions}
                EditAction={handleEditIconClick}
                SaveIcon={<FontAwesomeIcon icon={faSave} />}
                DeleteIcon={<FontAwesomeIcon icon={faTrash} />}
                MoreOptionsIcon={<FontAwesomeIcon icon={faEllipsisV} />}
                EditIcon={<FontAwesomeIcon icon={faPencilAlt} />}
            />

<Row>
        <div className="filter-box mb-5">
          <InputGroup className="w-25">
            <Form.Control
              className="bg-white form-control-filter"
              placeholder="Search Role by role name"
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
                <FontAwesomeIcon icon={faXmark} size="lg" />
              </Button>
            ) : (
              <Button
                variant="primary"
                className="form-btn"
                id="button-addon2"
                //onClick={handleFilter}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Button>
            )}
          </InputGroup>
        </div>
      </Row>

            <table className="table" border={1}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Role name</th>
                    </tr>
                </thead>
                <tbody>
                    {isFiltered
                        ? filteredData.map((item, i) => (
                              <tr key={i}>
                                  <td>
                                      <input
                                          className="form-check-input"
                                          type="checkbox"
                                          name="view"
                                          onChange={() =>
                                              toggleRowSelection(item.id)
                                          }
                                          checked={selectedRows.includes(
                                              item.id
                                          )}
                                      />
                                      <FontAwesomeIcon
                                          icon={faEllipsisH}
                                          style={{
                                              cursor: "pointer",
                                              marginLeft: "10px",
                                          }}
                                          onClick={(e) =>
                                              handleCellClick(e, item)
                                          }
                                      />
                                  </td>
                                  <td>
                                      {editingRow === i ? (
                                          <input
                                              type="text"
                                              value={editedRoleName}
                                              onChange={(e) =>
                                                  setEditedRoleName(
                                                      e.target.value
                                                  )
                                              }
                                          />
                                      ) : (
                                          item.rolename
                                      )}
                                  </td>
                              </tr>
                          ))
                        : data.map((item, i) => (
                              <tr key={i}>
                                  <td>
                                      <input
                                          className="form-check-input"
                                          type="checkbox"
                                          name="view"
                                          onChange={() =>
                                              toggleRowSelection(item.id)
                                          }
                                          checked={selectedRows.includes(
                                              item.id
                                          )}
                                      />
                                      <FontAwesomeIcon
                                          icon={faEllipsisH}
                                          style={{
                                              cursor: "pointer",
                                              marginLeft: "10px",
                                          }}
                                          onClick={(e) =>
                                              handleCellClick(e, item)
                                          }
                                      />
                                  </td>
                                  <td>
                                      {editingRow === i ? (
                                          <input
                                              type="text"
                                              value={editedRoleName}
                                              onChange={(e) =>
                                                  setEditedRoleName(
                                                      e.target.value
                                                  )
                                              }
                                          />
                                      ) : (
                                          item.rolename
                                      )}
                                  </td>
                              </tr>
                          ))}
                </tbody>
            </table>
        </div>
    );
}

export default RoleList;
