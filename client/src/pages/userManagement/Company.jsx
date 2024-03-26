import React, { useEffect, useRef, useState } from "react";
import ReservationGroupTable from "../../components/table/DataTableComponent";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fetchCompanyData,
  fetchUserData,
  updateUserData,
} from "../../store/actions/UserActions";
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
import { selectUserData } from "../../store/Store";

const OverviewTable = ({value}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(selectUserData);

  const [filteredCompanies, setFilteredCompanies] = useState({});
  const [filteredUser, setUser] = useState({});
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
    
    dispatch(fetchCompanyData());
    dispatch(fetchUserData(value));
    if (userData.users && userData.users.companies) {
      const userCompanies = userData.users.companies;
      const userI=userData.users;
      setUser(userI);
      setFilteredCompanies(userCompanies);
      
    }
    
    
   
  }, [dispatch]);

  useEffect(() => {
    if (userData.company && userData.company.length > 0) {
      setFilteredData(userData.company);
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
      name: "Company ID",
      selector: (row) => row.id,
      sortable: true,
      grow: 2,
    },
    {
      name: "Company Name",
      selector: (row) => row.name,
      sortable: true,
      grow: 2,
    },
    {
      name: "Status",
      cell: (row) => {

          const defaultStatus = userData.users.defaultCompany === row.name ? "default" : " ";
          const status = Array.isArray(userData.users.companies) && userData.users.companies.includes(row.name) ? "granted" : defaultStatus;
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


  

  const handleFilter = () => {
    if (userData.company && userData.company.length > 0) {
      if (searchTerm === "") {
        setCurrentPage(0);
        setFilteredData(userData.company);
      } else {
        const filtered = userData.company.filter((item) =>
          item.id
            ?.toString()
            .toLowerCase()
            .includes(searchTerm?.toLowerCase())
        );
        setIsFiltered(true);
        // dispatch(resetReservationGroupState(filtered));
        setFilteredData(filtered);
      }
    }
  };

  const confirmDelete = () => {

  };

  const handleCreate = () => {
    navigate("/userManagement/createUsers");
  };

  const handleDelete = async () => {

    if (selectedRows.length === 1) {
        const companyName = selectedRows[0].name;
        if (companyName === userData.users.defaultCompany) {
          console.log("Cannot delete default company:", companyName);
          return; 
      }
        if (userData.users.companies.includes(companyName)) {
            const updatedCompanies = userData.users.companies.filter(company => company !== companyName);
            const updatedUserData = {
                ...userData.users,
                companies: updatedCompanies,
            };
            await dispatch(updateUserData(value, updatedUserData));
            console.log("Company name deleted:", companyName);
            console.log("Updated companies:", updatedCompanies);
        } else {
            console.log("Company name does not exist:", companyName);
        }
    }
};

  const handleSave = async () => {
 
    if (selectedRows.length === 1) {
        const companyName = selectedRows[0].name;
        if (companyName === userData.users.defaultCompany) {
          console.log("Cannot add default company:", companyName);
          return; 
      }
      
        if (!userData.users.companies.includes(companyName)) {
            const updatedCompanies = [...userData.users.companies, companyName];
            const updatedUserData = {
                ...userData.users,
                companies: updatedCompanies,
            };
            await dispatch(updateUserData(value, updatedUserData));
            console.log("Company name added:", companyName);
            console.log("Updated companies:", updatedCompanies);
        } else {
            console.log("Company name already exists:", companyName);
        }
    }
};

  

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearFilter = () => {
    setSearchTerm("");
    dispatch(fetchCompanyData);
    setIsFiltered(false);
    setCurrentPage(0);
  };

  const isSingleRecordSelected = selectedRows.length === 1 && false;

  return (
    <div className="mb-5 mx-2">
      <TitleActionBar
        Title={"User Companies"}
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
        {/* <div className="filter-box mb-5">
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
        </div> */}
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
