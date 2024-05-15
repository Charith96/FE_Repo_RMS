import React, { useEffect, useRef, useState } from "react";
import ReservationGroupTable from "../../components/table/DataTableComponent";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchUserData, updateUserData } from "../../store/actions/UserActions";
import { fetchCompanies } from "../../store/actions/CompanyActions";

import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { Row } from "react-bootstrap";
import TitleActionBar from "../../components/TitleActionsBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OverviewTable = ({ value }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userById.userById);
  const fetchCompanyData = useSelector(
    (state) => state.getCompany.fetchCompany
  );

  const [paginatedData, setPaginatedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isAddDisable] = useState(false);
  const [isEditDisable] = useState(true);
  const [isSaveDisable, setIsSaveDisable] = useState(true);
  const [isDeleteDisable, setIsDeleteDisable] = useState(true);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const totalItems = filteredData.length;
  const toggledClearRows = useRef(false);

  useEffect(() => {
    dispatch(fetchCompanies());
    dispatch(fetchUserData(value));
  }, [dispatch, value]);

  useEffect(() => {
    if (fetchCompanyData && fetchCompanyData.length > 0) {
      setFilteredData(fetchCompanyData);
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
  }, [fetchCompanyData, currentPage, perPage, filteredData, selectedRows]);

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
      selector: (row) => row.id,
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
      name: "Status",
      cell: (row) => {
        const defaultStatus =
          userData.defaultCompany === row.companyName ? "default" : " ";
        const status =
          Array.isArray(userData.companies) &&
          userData.companies.includes(row.companyName)
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

  const confirmDelete = () => {};

  const handleCreate = () => {
    navigate("/userManagement/createUsers");
  };

  const handleDelete = async () => {
    if (selectedRows.length === 1) {
      const companyName = selectedRows[0].companyName;
      if (companyName === userData.defaultCompany) {
        return;
      }
      if (userData.companies.includes(companyName)) {
        const updatedCompanies = userData.companies.filter(
          (company) => company !== companyName
        );
        const updatedUserData = {
          ...userData,
          companies: updatedCompanies,
        };
        await dispatch(updateUserData(value, updatedUserData));
        dispatch(fetchUserData(value));
      } else {
      }
    }
  };

  const handleSave = async () => {
    if (selectedRows.length === 1) {
      const companyName = selectedRows[0].companyName;
      if (companyName === userData.defaultCompany) {
        return;
      }

      if (!userData.companies.includes(companyName)) {
        const updatedCompanies = [...userData.companies, companyName];
        const updatedUserData = {
          ...userData,
          companies: updatedCompanies,
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

