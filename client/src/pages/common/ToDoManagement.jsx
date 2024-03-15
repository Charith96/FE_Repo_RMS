import React, { useEffect, useRef, useState } from "react";
import ToDoTable from "../../components/table/DataTableComponent";
import TitleActionBar from "../../components/TitleActionsBar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createToDo,
  getToDos,
  resetToDoGetListState,
  resetToDoManageState,
  updateToDo,
} from "../../store/actions/ToDoActions";

const ToDoManagement = () => {
  const dispatch = useDispatch();
  const toDoList = useSelector((state) => state.getToDoList);
  const toToData = useSelector((state) => state.manageTodo);
  const [paginatedData, setPaginatedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [recordId, setRecordId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todoStatus, setTodoStatus] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [disableAdd, setDisableAdd] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [disableEdit, setDisableEdit] = useState(true);
  const [disableDelete, setDisableDelete] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [editingRow, setEditingRow] = useState(null);
  const [toggledClearRows, setToggleClearRows] = useState(false);
  const [isValueMounted, setIsValueMounted] = useState(false);
  const [perPage, setPerPage] = useState(5);
  const totalItems = filteredData.length;
  const contextMenuPosition = useRef({ x: 0, y: 0 });
  const errorRef = useRef();

  useEffect(() => {
    if (!isAdd || !isEdit) {
      dispatch(getToDos());
    }
  }, [dispatch, isAdd, isEdit]);

  useEffect(() => {
    if (
      toDoList &&
      toDoList.toDoListInfo?.length > 0 &&
      toDoList.toDoListError === null &&
      !isAdd &&
      !isEdit
    ) {
      setFilteredData(toDoList.toDoListInfo);
    }

    if (!isValueMounted) {
      // handle todo update
      if (
        toToData &&
        toToData.manageTodoInfo !== null &&
        toToData.manageTodoError === null
      ) {
        setIsValueMounted(true);
        setTimeout(() => {
          dispatch(resetToDoManageState());
          toast.success(
            `ToDo successfully ${isAdd ? "created" : isEdit ? "updated" : ""}!`
          );
          setIsAdd(false);
          setIsEdit(false);
          dispatch(getToDos());
        }, 500);
      }
    }

    // handle message
    if (!errorRef.current) {
      if (
        toDoList &&
        toDoList.toDoListInfo?.length === 0 &&
        toDoList.toDoListError !== null
      ) {
        errorRef.current = toDoList.toDoListError;
        toast.error("Faild to retrieve Todos");
        setTimeout(() => dispatch(resetToDoGetListState()), 200);
      }
      if (toToData && toToData.manageTodoError !== null) {
        errorRef.current = toToData.manageTodoError;
        toast.error("Faild to update Todo");
        setTimeout(() => dispatch(resetToDoManageState()), 200);
      }
    }

    const start = currentPage * perPage;
    const end = start + perPage;
    const slicedData = filteredData.slice(start, end);
    setPaginatedData(slicedData);

    if (selectedRows.length === 1 && !isEdit) {
      setDisableEdit(false);
      setDisableDelete(false);
    } else {
      setDisableEdit(true);
      setDisableDelete(true);
    }
  }, [
    dispatch,
    toDoList,
    toToData,
    isAdd,
    isEdit,
    currentPage,
    perPage,
    filteredData,
    selectedRows,
    isValueMounted,
  ]);

  // data table columns
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      cell: (row) =>
        (isAdd || isEdit) && editingRow === row ? (
          <input
            type="text"
            className={`form-control ${
              !title ? "mandatory-field" : "bg-white"
            }`}
            value={title}
            max={6}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        ) : (
          row.title
        ),
      sortable: true,
      grow: 2,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      cell: (row) =>
        (isAdd || isEdit) && editingRow === row ? (
          <input
            type="text"
            className={`w-100 form-control ${
              !description ? "mandatory-field" : "bg-white"
            }`}
            value={description}
            max={50}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        ) : (
          row.description
        ),
      sortable: true,
      grow: 2,
    },
    {
      name: "Complete",
      selector: (row) => row.completed,
      cell: (row) =>
        (isAdd || isEdit) && editingRow === row ? (
          <input
            type="checkbox"
            checked={todoStatus}
            onChange={(e) => setTodoStatus(e.target.checked)}
          />
        ) : (
          <input
            type="checkbox"
            className="pe-none"
            checked={row.completed}
            onChange={() => {}}
          />
        ),
      sortable: true,
    },
  ];

  const handleClearRows = () => {
    setToggleClearRows(!toggledClearRows);
    setSelectedRows([]);
  };

  const handleNewRow = () => {
    const newRow = {
      id: (filteredData.length + 1).toString(),
      title: "",
      locationTypeDescription: "",
      completed: false,
    };
    const updatedData = [newRow, ...filteredData];
    setIsAdd(true);
    setDisableAdd(true);
    setDisableEdit(true);
    setIsEdit(false);
    setDisableSave(false);
    setIsValueMounted(false);
    setFilteredData(updatedData);
    setEditingRow(newRow);
  };

  const handleEditView = () => {
    if (selectedRows.length === 1) {
      setIsAdd(false);
      setIsEdit(true);
      setDisableAdd(true);
      setDisableEdit(true);
      setDisableSave(false);
      setIsValueMounted(false);

      setEditingRow(selectedRows[0]);
      setRecordId(selectedRows[0]?.id);
      setTitle(selectedRows[0]?.title);
      setDescription(selectedRows[0].description);
      setTodoStatus(selectedRows[0]?.completed);
    }
  };

  const handleSave = () => {
    return isAdd ? createNewTodo() : isEdit ? handleUpdateTodo() : null;
  };

  const createNewTodo = () => {
    try {
      if (title && description) {
        const formData = {
          title: title,
          description: description,
          completed: todoStatus,
        };
        dispatch(createToDo(formData));
        setIsValueMounted(false);
        clearInputs();
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const handleUpdateTodo = () => {
    try {
      if (recordId && title && description) {
        const formData = {
          id: recordId,
          title: title,
          description: description,
          completed: todoStatus,
        };

        dispatch(updateToDo({ recordId: recordId, data: formData }));
        setIsValueMounted(false);
        clearInputs();
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const clearInputs = () => {
    setEditingRow(null);
    setTitle("");
    setDescription("");
    setTodoStatus(false);
    setDisableAdd(false);
    setDisableEdit(true);
    setDisableSave(true);
    setIsValueMounted(false);
    handleClearRows();
  };

  const isSingleRecordSelected = selectedRows.length === 1 && isEdit;

  return (
    <div className="mb-5">
      <div>
        <TitleActionBar
          Title={"Todo"}
          plustDisabled={disableAdd}
          editDisabled={disableEdit}
          saveDisabled={disableSave}
          deleteDisabled={disableDelete}
          PlusAction={() => {
            handleNewRow();
          }}
          EditAction={() => {
            handleEditView();
          }}
          SaveAction={() => {
            handleSave();
          }}
          DeleteAction={() => {}}
        />
      </div>

      <ToDoTable
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
    </div>
  );
};

export default ToDoManagement;
