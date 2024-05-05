import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'; // Importing useSelector hook
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, InputGroup, Row } from "react-bootstrap";
import { faEllipsisH, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import TitleActionBar from "../../components/TitleActionsBar";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import ReservationGroupTable from "../../components/table/DataTableComponent";
import { fetchRoles, deleteRole, updateRole } from '../../store/actions/RolesAction';

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
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [contextMenuRow, setContextMenuRow] = useState(null);
    const [isFiltered, setIsFiltered] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [perPage, setPerPage] = useState(5);
    const totalItems = filteredData.length;
    const toggledClearRows = useRef(false);
    const [searchValue, setSearchValue] = useState("");

    // Redux state
    const roles = useSelector(state => state.fetchRoles); // Accessing the fetchRoles state from the Redux store
    const { roles: data, loading } = roles;

    // fetch role data and update the redux store with the fetched data
    useEffect(() => {
        dispatch(fetchRoles());
    }, []);

    //fetch roles and update data when roles or paggination settimg change 
    useEffect(() => {
        if (data && data.length > 0 && !isFiltered) {
            setFilteredData(data);

            const start = currentPage * perPage;
            const end = start + perPage;
            const slicedData = data?.slice(start, end);
            setPaginatedData(slicedData);

            if (selectedRows.length === 1) {
                setIsDeleteDisable(false);
            } else {
                setIsDeleteDisable(true);
            }
        }
    }, [data, currentPage, perPage, selectedRows, isFiltered]);

    //table columns
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

    //Plus icon functionality
    const handleCreate = () => {
        navigate("/rolesManagement/CreateRole");
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
        setSearchValue(inputValue);
        setIsFiltered(inputValue !== "");

        const filteredRoles = data.filter(role =>
            role.rolename.toLowerCase().includes(inputValue)
        );
        setFilteredData(filteredRoles);

        // Update paginated data based on the filtered results
        const start = currentPage * perPage;
        const end = start + perPage;
        const slicedData = filteredRoles.slice(start, end);
        setPaginatedData(slicedData);
    };

    const clearFilter = () => {
        setSearchValue("");
        setSearchTerm("");
        setIsFiltered(false);
        setFilteredData(data);

        // Reset paginated data to initial state
        const start = currentPage * perPage;
        const end = start + perPage;
        const slicedData = data.slice(start, end);
        setPaginatedData(slicedData);
    };

    const handleCellClick = (e, item) => {
        navigate("/rolesManagement/RoleOverview", { state: { roleData: item } });
    };

    const isSingleRecordSelected = selectedRows.length === 1 && false;

    return (
        <div className="mb-5 mx-2">
            {/* Title action bar */}
            <TitleActionBar
                Title={"Role List"}
                plustDisabled={isAddDisable}
                editDisabled={isEditDisable}
                saveDisabled={isSaveDisable}
                deleteDisabled={isDeleteDisable}
                PlusAction={handleCreate}
                DeleteAction={handleDelete}

            />

            <Row>
                {/* Filter box */}
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

            {/* Reservation group table */}
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

            {/* Delete confirmation modal */}
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
