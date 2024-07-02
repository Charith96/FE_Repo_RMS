import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, InputGroup, Row } from "react-bootstrap";
import { faEllipsisH, faMagnifyingGlass, faXmark, faEdit, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import TitleActionBar from "../../components/TitleActionsBar";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import ReservationGroupTable from "../../components/table/DataTableComponent";
import { fetchRoles, deleteRole } from '../../store/actions/RolesAction';
import { fetchRolePrivileges, deleteRolePrivilege } from '../../store/actions/PrivilegeActions';

function RoleList() {
    const dispatch = useDispatch();
    let { value } = useParams();
    const [paginatedData, setPaginatedData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [contextMenuRow, setContextMenuRow] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [perPage, setPerPage] = useState(5);
    const totalItems = filteredData.length;
    const isAddDisable = useRef(false).current;
    const isEditDisable = useRef(true).current;
    const isSaveDisable = useRef(true).current;
    const [isFiltered, setIsFiltered] = useState(false);
    const [isDeleteDisable, setIsDeleteDisable] = useState(true);
    const toggledClearRows = useRef(false);
    const [refreshKey, setRefreshKey] = useState(0);

    // Redux state
    const roles = useSelector(state => state.fetchRoles);
    const rolePrivileges = useSelector(state => state.rolePrivileges);
    const navigate = useNavigate();
    const { roles: data, loading } = roles;
    const { rolePrivileges: privilegesData } = rolePrivileges;

    // Fetch role data and role privileges data
    useEffect(() => {
        dispatch(fetchRoles());
        dispatch(fetchRolePrivileges());
    }, [dispatch, refreshKey]);

    // Update data when roles or pagination settings change
   useEffect(() => {
    if (data && data.length > 0) {
        setFilteredData(data);
        
        // Pagination logic
        const start = currentPage * perPage;
        const end = start + perPage;
        const slicedData = data.slice(start, end);
        setPaginatedData(slicedData);

        // Check selected rows to enable/disable delete
        setIsDeleteDisable(selectedRows.length !== 1);
    } else {
        // Handle no data case
        setFilteredData([]);
        setPaginatedData([]);
        setIsDeleteDisable(true); // Assuming no deletion when there's no data
    }
}, [data, currentPage, perPage, selectedRows]);


    // Table columns
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
            name: "Role Code",
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
    ];

    const confirmDelete = async () => {
        if (selectedRows.length === 1) {
            try {
                const roleId = selectedRows[0]?.roleCode;
                await dispatch(deleteRole(roleId));
                // Delete role privileges associated with the role
                const rolePrivilegesToDelete = privilegesData.filter(privilege => privilege.roleCode === roleId);
                rolePrivilegesToDelete.forEach(async privilege => {
                    await dispatch(deleteRolePrivilege(privilege.privilegeCode));
                });
                toast.success("Record Successfully deleted!");
                setRefreshKey(prevKey => prevKey + 1);
            } catch (error) {
                toast.error("Error deleting row. Please try again.");
            } finally {
                setShowConfirmation(false);
            }
        }
    };

    const handleDelete = () => {
        setShowConfirmation(true);
    };

    const cancelDelete = () => {
        setShowConfirmation(false);
    };

    const handleSearchChange = (e) => {
        const inputValue = e.target.value.toLowerCase();
        setSearchTerm(inputValue);
        setIsFiltered(inputValue !== "");

        const filteredRoles = data.filter(role =>
            role.roleName.toLowerCase().includes(inputValue)
        );
        setFilteredData(filteredRoles);

        const start = currentPage * perPage;
        const end = start + perPage;
        const slicedData = filteredRoles.slice(start, end);
        setPaginatedData(slicedData);
    };

    const clearFilter = () => {
        setSearchTerm("");
        setIsFiltered(false);
        setFilteredData(data);

        const start = currentPage * perPage;
        const end = start + perPage;
        const slicedData = data.slice(start, end);
        setPaginatedData(slicedData);
    };

    const handleCellClick = (e, row) => {
        e.preventDefault();
        setContextMenuPosition({ x: e.clientX, y: e.clientY });
        setMenuVisible(true);
        setContextMenuRow(row);
    };
    
    const handleEditNavigation = () => {
        if (selectedRows.length === 1) {
            navigate("/rolesManagement/RoleOverview", {
                state: { 
                    roleData: contextMenuRow,
                    mode: "edit",
                    isEditing: true
                }
            });
        }
    };
    
    const handleDetailedNavigation = () => {
        if (selectedRows.length === 1) {
            navigate("/rolesManagement/RoleOverview", {
                state: { 
                    roleData: contextMenuRow,
                    mode: "view",
                    isEditing: false
                }
            });
        }
    };
    
    const roleContextMenu = menuVisible && (
        <div
            className="styled-menu"
            style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
        >
            <div className="menu-item" onClick={handleEditNavigation}>
                <FontAwesomeIcon icon={faEdit} /> Edit
            </div>
            <div className="menu-item" onClick={handleDetailedNavigation}>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> View
            </div>
        </div>
    );
    const isSingleRecordSelected = selectedRows.length === 1 && false;

    return (
        <div className="mb-5 mx-2">
            <TitleActionBar
                Title={"Roles"}
                plustDisabled={isAddDisable}
                editDisabled={isEditDisable}
                saveDisabled={isSaveDisable}
                deleteDisabled={isDeleteDisable}
                PlusAction={() => navigate("/rolesManagement/CreateRole")}
                DeleteAction={handleDelete}
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
                            <Button variant="primary" className="form-btn" id="button-addon2" onClick={clearFilter}>
                                <FontAwesomeIcon icon={faXmark} size="lg" />
                            </Button>
                        ) : (
                            <Button variant="primary" className="form-btn" id="button-addon2">
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

            {roleContextMenu}

            <DeleteConfirmModel
                show={showConfirmation}
                close={cancelDelete}
                title={"Warning"}
                message={"The selected Role will be deleted. Do you wish to continue?"}
                type={"Yes"}
                action={confirmDelete}
            />
        </div>
    );
}

export default RoleList;