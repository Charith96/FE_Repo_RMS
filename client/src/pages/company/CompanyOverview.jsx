import React, { useEffect, useState } from "react";
import { fetchReservationGroupsById, fetchCompaniesById } from "../../store/actions/Action";
import { deleteReservationGroup, deleteCompany } from "../../store/actions/Action";
import { editReservationGroup, editCompany } from "../../store/actions/Action";
import { DeleteConfirmModel } from "../../components/DeleteConfirmModel";
import TitleActionBar from "../../components/TitleActionsBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../../components/TextField";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import CheckboxField from "../../components/CheckboxField";
import DropdownField from "../../components/DropdownField";

const CompanyOverview = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const fetchReservationGroupData = useSelector(
  //   (state) => state.getReservationGroupById.fetchReservationGroupId
  // );
  // const editFlagData = useSelector(
  //   (state) => state.editReservationGroupFlag.editReservationGroupFlag
  // );
  // const dataForSearch = useSelector(
  //   (state) => state.getReservationGroup.fetchReservationGroup
  // );
  const fetchCompanyData = useSelector(
    (state) => state.getCompanyById.fetchCompanyId
  );
  const editFlagData = useSelector(
    (state) => state.editCompanyFlag.editCompanyFlag
  );
  const dataForSearch = useSelector(
    (state) => state.getCompany.fetchCompany
  );
  const [recordId, setRecordId] = useState("");

  // const [groupId, setGroupId] = useState("");
  // const [groupName, setGroupName] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [currency, setCurrency] = useState("");
  const [address01, setAddress01] = useState("");
  const [address02, setAddress02] = useState("");
  const [defaultCompany, setDefaultCompany] = useState(false);

  const [isViewMode, setIsViewMode] = useState(false);
  const [isAddDisable, setIsAddDisable] = useState(false);
  const [isEditDisable, setIsEditDisable] = useState(true);
  const [isSaveDisable, setIsSaveDisable] = useState(true);
  const [isDeleteDisable, setIsDeleteDisable] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [count, setCount] = useState(0);
  const searchParams = new URLSearchParams(useLocation().search);
  const data = searchParams.get("data");
  const paramData = JSON.parse(data);
  const mode = state ? state.mode : null;

  // useEffect(() => {
  //   if (paramData && recordId) {
  //     dispatch(fetchReservationGroupsById(recordId));
  //   }
  // }, [dispatch, recordId]);

  useEffect(() => {
    if (paramData && recordId) {
      dispatch(fetchCompaniesById(recordId));
    }
  }, [dispatch, recordId]);

  // const fetchData = () => {
  //   if (fetchReservationGroupData) {
  //     let filterData = fetchReservationGroupData;
  //     if (filterData) {
  //       if (count === 0) {
  //         setCompanyCode(filterData?.companyCode ?? "");
  //         setCompanyName(filterData?.companyName ?? "");
  //         setDescription(filterData?.description ?? "");
  //         setCountry(filterData?.country ?? "");
  //         setCurrency(filterData?.currency ?? "");
  //         setAddress01(filterData?.address01 ?? "");
  //         setAddress02(filterData?.address02 ?? "");
  //         setDefaultCompany(filterData?.defaultCompany ?? "");
  //         if (mode) {
  //           if (mode === "edit") {
  //             setIsViewMode(false);
  //             setIsEditDisable(true);
  //             setIsSaveDisable(false);
  //           } else if (mode === "view") {
  //             setIsViewMode(true);
  //             setIsEditDisable(false);
  //             setIsSaveDisable(true);
  //           }
  //         }
  //       }
  //     } else {
  //       handleNavigate();
  //     }
  //     setCount(1);
  //   }
  // };

  const fetchData = () => {
    if (fetchCompanyData) {
      let filterData = fetchCompanyData;
      if (filterData) {
        if (count === 0) {
          setCompanyCode(filterData?.companyCode ?? "");
          setCompanyName(filterData?.companyName ?? "");
          setDescription(filterData?.description ?? "");
          setCountry(filterData?.country ?? "");
          setCurrency(filterData?.currency ?? "");
          setAddress01(filterData?.address01 ?? "");
          setAddress02(filterData?.address02 ?? "");
          setDefaultCompany(filterData?.defaultCompany ?? "");
          if (mode) {
            if (mode === "edit") {
              setIsViewMode(false);
              setIsEditDisable(true);
              setIsSaveDisable(false);
            } else if (mode === "view") {
              setIsViewMode(true);
              setIsEditDisable(false);
              setIsSaveDisable(true);
            }
          }
        }
      } else {
        handleNavigate();
      }
      setCount(1);
    }
  };

  useEffect(() => {
    if (paramData && paramData.id && paramData.id !== "") {
      setRecordId(paramData.id);
    }
    if (recordId) {
      setTimeout(() => fetchData(), 100);
    }
  }, [isSaveDisable, recordId, fetchData]);

  const handleEdit = () => {
    setIsAddDisable(true);
    setIsEditDisable(true);
    setIsDeleteDisable(true);
    setIsViewMode(false);
    setIsSaveDisable(false);
  };

  const handleSave = async () => {
    try {
      if (paramData && recordId) {
        const formData = {
          id: recordId,
          companyCode: companyCode,
          companyName: companyName,
          description: description,
          country: country,
          currency: currency,
          address01: address01,
          address02: address02,
          defaultCompany: defaultCompany,
        };
        console.log("formData ", recordId, formData);
        // dispatch(editReservationGroup(recordId, formData));
        handleNavigate();
        toast.success("Data saved successfully");
      } else {
        toast.error("Cannot save. ID is undefined.");
      }
    } catch (error) {
      toast.error("Error saving data. Please try again.");
    }
  };

  // const confirmDelete = async () => {
  //   try {
  //     if (paramData && paramData.id) {
  //       dispatch(deleteReservationGroup(paramData.id));
  //       toast.success("Data deleted successfully");
  //       handleNavigate();
  //     } else {
  //       toast.error("Cannot delete. ID is undefined.");
  //     }
  //   } catch (error) {
  //     toast.error("Error deleting data. Please try again.");
  //   } finally {
  //     setShowConfirmation(false);
  //   }
  // };

  const confirmDelete = async () => {
    try {
      if (paramData && paramData.id) {
        dispatch(deleteCompany(paramData.id));
        toast.success("Data deleted successfully");
        handleNavigate();
      } else {
        toast.error("Cannot delete. ID is undefined.");
      }
    } catch (error) {
      toast.error("Error deleting data. Please try again.");
    } finally {
      setShowConfirmation(false);
    }
  };

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const navigateToCreate = () => {
    navigate("/company/createCompany");
  };

  const handleNavigate = () => {
    navigate("/company/companies");
  };

  return (
    <>
      <Row>
        <Col xs={0} sm={0} md={2} lg={2} xl={2} xxl={1} />
        <Col
          xs={12}
          sm={12}
          md={8}
          lg={8}
          xl={8}
          xxl={10}
          className="body-content px-5 pt-4 pb-4 mb-5"
        >
          <TitleActionBar
            Title={"Company Overview"}
            plustDisabled={isAddDisable}
            editDisabled={isEditDisable}
            saveDisabled={isSaveDisable}
            deleteDisabled={isDeleteDisable}
            PlusAction={() => {
              navigateToCreate();
            }}
            EditAction={() => {
              handleEdit();
            }}
            SaveAction={() => {
              handleSave();
            }}
            DeleteAction={() => {
              handleDelete();
            }}
          />

          <div>
            <Form>
              <TextField
                label="CompanyCode"
                className={`${!companyCode ? "is-invalid" : ""}`}
                disabled={isViewMode}
                value={companyCode}
                onChange={(e) => setCompanyCode(e.target.value)}
              />
              <TextField
                label="CompanyName"
                className={`${!companyName ? "is-invalid" : ""}`}
                value={companyName}
                disabled={isViewMode}
                onChange={(e) => setCompanyName(e.target.value)}
              />

              <TextField
                label="Description"
                className={`${!description ? "is-invalid" : ""}`}
                value={description}
                disabled={isViewMode}
                onChange={(e) => setDescription(e.target.value)}
              />
              <DropdownField
                label="Country"
                className={`${!country ? "is-invalid" : ""}`}
                value={country}
                disabled={isViewMode}
                onChange={(e) => setCountry(e.target.value)}
                //options={countries}
                options={[
                  { label: "Select Country", value: "USA" },
                  { label: "Canada", value: "Canada" },
                  { label: "United Kingdom", value: "UK" },
                  // Add more options as needed
                ]}
              />
              <DropdownField
                label="Currency"
                className={`${!currency ? "is-invalid" : ""}`}
                value={currency}
                disabled={isViewMode}
                onChange={(e) => setCurrency(e.target.value)}
                //options={countries}
                options={[
                  { label: "Select Currency", value: "USA" },
                  { label: "Canada", value: "Canada" },
                  { label: "United Kingdom", value: "UK" },
                  // Add more options as needed
                ]}
              />
              <TextField
                label="Address01"
                className={`${!address01 ? "is-invalid" : ""}`}
                value={address01}
                disabled={isViewMode}
                onChange={(e) => setAddress01(e.target.value)}
              />

              <TextField
                label="Address02"
                className={`${!address02 ? "is-invalid" : ""}`}
                value={address02}
                disabled={isViewMode}
                onChange={(e) => setAddress02(e.target.value)}
              />

              <CheckboxField
                checked={defaultCompany}
                onChange={(e) => setDefaultCompany(e.target.checked)}
                name="defaultCompany"
                color="primary"
                className={`${!defaultCompany ? "is-invalid" : ""}`}
                disabled={isViewMode}
                label="Default Company"
              />
            </Form>
          </div>

          <DeleteConfirmModel
            show={showConfirmation}
            close={cancelDelete}
            title={"Warning"}
            message={
              "The selected Company will be deleted. Do you wish to continue?"
            }
            type={"Yes"}
            action={() => {
              confirmDelete();
            }}
          />
        </Col>
        <Col xs={0} sm={0} md={2} lg={2} xl={2} xxl={1} />
      </Row>
    </>
  );
};
export default CompanyOverview;
