import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Row, Button, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faEdit,
  faEllipsisH,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import {
  deleteCompany,
  fetchCompanies,
  resetCompanyState,
  fetchCountries,
  fetchCurrencies,
} from "../../store/actions/CompanyActions";
import CompanyTable from "../../components/table/DataTableComponent";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import TitleActionBar from "../../components/TitleActionsBar";

const Companies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve state from Redux store
  const fetchCompanyData = useSelector((state) => state.getCompany.fetchCompany);
  const deleteCompanyData = useSelector((state) => state.deleteCompany.deleteCompany);
  const countriesData = useSelector((state) => state.countries.countries);
  const currenciesData = useSelector((state) => state.currencies.currencies);

  // State variables
  const [paginatedData, setPaginatedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const isAddDisable = useRef(false);
  const isEditDisable = useRef(true);
  const isSaveDisable = useRef(true);
  const [isDeleteDisable, setIsDeleteDisable] = useState(true);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [contextMenuRow, setContextMenuRow] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [countries, setCountries] = useState({});
  const [currencies, setCurrencies] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch companies, countries, and currencies on component mount
  useEffect(() => {
    dispatch(fetchCompanies());
    dispatch(fetchCountries());
    dispatch(fetchCurrencies());
  }, [dispatch]);

  // Create a mapping of country IDs to country names
  useEffect(() => {
    if (countriesData) {
      const countryMap = {};
      countriesData.forEach(country => {
        countryMap[country.countryID] = country.countryName;
      });
      setCountries(countryMap);
    }
  }, [countriesData]);

  // Create a mapping of currency IDs to currency names
  useEffect(() => {
    if (currenciesData) {
      const currencyMap = {};
      currenciesData.forEach(currency => {
        currencyMap[currency.currencyID] = currency.currencyName;
      });
      setCurrencies(currencyMap);
    }
  }, [currenciesData]);

  // Update paginatedData, filteredData, and deleteDisable state
  useEffect(() => {
    if (fetchCompanyData && fetchCompanyData.length > 0) {
      setFilteredData(fetchCompanyData);
    }

    const start = currentPage * perPage;
    const end = start + perPage;
    const slicedData = filteredData?.slice(start, end);
    setPaginatedData(slicedData);

    setIsDeleteDisable(selectedRows.length !== 1);
  }, [fetchCompanyData, currentPage, perPage, filteredData, selectedRows]);

  // Table column definitions
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
      name: "Company ID",
      selector: (row) => row.companyCode,
      sortable: true,
      grow: 2,
    },
    {
      name: "Company Name",
      selector: (row) => row.companyName,
      sortable: true,
      grow: 2,
    },
    {
      name: "Country",
      selector: (row) => countries[row.countryID] || "Unknown",
      sortable: true,
      grow: 2,
    },
    {
      name: "Currency",
      selector: (row) => currencies[row.currencyID] || "Unknown",
      sortable: true,
      grow: 2,
    },
  ];

  // Handle cell click and show context menu
  const handleCellClick = (e, row) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setMenuVisible(true);
    setContextMenuRow(row);
  };

  // Handle edit button click in context menu
  const handleEditNavigation = () => {
    if (selectedRows.length === 1) {
      let data = { companyID: contextMenuRow.companyID };
      let dataString = JSON.stringify(data);
      navigate(
        `/company/companyOverview?data=${encodeURIComponent(dataString)}`,
        { state: { mode: "edit" } }
      );
    }
  };

  // Handle detail button click in context menu
  const handleDetailedNavigation = () => {
    if (selectedRows.length === 1) {
      let data = { companyID: contextMenuRow.companyID };
      let dataString = JSON.stringify(data);
      navigate(
        `/company/companyOverview?data=${encodeURIComponent(dataString)}`,
        { state: { mode: "view" } }
      );
    }
  };

  // Render context menu
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

  // Handle filter function
  const handleFilter = () => {
    if (fetchCompanyData && fetchCompanyData.length > 0) {
      if (searchTerm === "") {
        setCurrentPage(0);
        setFilteredData(fetchCompanyData);
      } else {
        const filtered = fetchCompanyData.filter((item) =>
          item.companyCode
            ?.toString()
            .toLowerCase()
            .includes(searchTerm?.toLowerCase())
        );
        setIsFiltered(true);
        dispatch(resetCompanyState(filtered));
        setFilteredData(filtered);
      }
    }
  };

  // Confirm delete action
  const confirmDelete = async () => {
    if (selectedRows.length === 1) {
      try {
        // Optimistic update
        setFilteredData(prevData => prevData.filter(item => item.companyID !== selectedRows[0].companyID));
        
        await dispatch(deleteCompany(selectedRows[0]?.companyID));
        toast.success("Record Successfully deleted!");
        
        // Force re-fetch and re-render
        dispatch(fetchCompanies());
        setRefreshKey(prevKey => prevKey + 1);
      } catch (error) {
        toast.error("Error deleting row. Please try again.");
        // Revert optimistic update if delete fails
        dispatch(fetchCompanies());
      } finally {
        setShowConfirmation(false);
        setSelectedRows([]);
      }
    }
  };


  // const confirmDelete = async () => {
  //   if (selectedRows.length === 1) {
  //     try {
  //       const response = await dispatch(deleteCompany(selectedRows[0]?.companyID));
        
  //       if (response.status === 200) {
  //         // Successful deletion
  //         toast.success("Company successfully deleted!");
  //         dispatch(fetchCompanies());
  //         setRefreshKey(prevKey => prevKey + 1);
  //       } else {
  //         // Handle other successful responses if needed
  //         toast.info(response.data);
  //       }
  //     } catch (error) {
  //       if (error.response && error.response.status === 400) {
  //         // Company can't be deleted due to associated items
  //         toast.error("Cannot delete company with associated items.");
  //       } else {
  //         // Other errors
  //         toast.error("Error deleting company. Please try again.");
  //       }
  //     } finally {
  //       setShowConfirmation(false);
  //       setSelectedRows([]);
  //     }
  //   }
  // };


  // Handle create button click
  const handleCreate = () => {
    navigate("/company/createCompany");
  };

  // Handle delete button click
  const handleDelete = () => {
    setShowConfirmation(true);
  };

  // Cancel delete confirmation
  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Clear search filter
  const clearFilter = () => {
    setSearchTerm("");
    dispatch(fetchCompanies());
    setIsFiltered(false);
    setCurrentPage(0);
  };

  // Handle row selection
  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

  return (
    <div className="mb-5 mx-2">
      <TitleActionBar
        Title={"Company List"}
        plustDisabled={isAddDisable.current}
        editDisabled={true}
        saveDisabled={true}
        deleteDisabled={isDeleteDisable}
        PlusAction={handleCreate}
        EditAction={() => {}}
        SaveAction={() => {}}
        DeleteAction={handleDelete}
      />

      <Row>
        <div className="filter-box mb-5">
          <InputGroup className="w-25">
            <Form.Control
              className="bg-white form-control-filter"
              placeholder="Search Company"
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

      <CompanyTable
        key={refreshKey}
        selectableRows={true}
        selectableRowsSingle={true}
        setPerPage={setPerPage}
        setCurrentPage={setCurrentPage}
        setSelectedRows={setSelectedRows}
        setMenuVisible={setMenuVisible}
        paginatedData={paginatedData}
        filteredData={filteredData}
        totalItems={filteredData.length}
        currentPage={currentPage}
        perPage={perPage}
        columns={columns}
        menuVisible={menuVisible}
        contextMenuPosition={contextMenuPosition}
        onSelectedRowsChange={handleRowSelected}
      />

      <div>{customContextMenu}</div>

      <DeleteConfirmModel
        show={showConfirmation}
        close={cancelDelete}
        title={"Warning"}
        message={
          "The selected Company will be deleted. Do you wish to continue?"
        }
        type={"Yes"}
        action={confirmDelete}
      />
    </div>
  );
};

export default Companies;