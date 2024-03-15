import axios from "axios";
import ActionTypes from "../../data/ReduxActionTypes";
import { TODO_URL } from "../../utils/Constants";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// CREATE NEW TODO
export const createToDo = (formData) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.MANAGE_TODO_START });
    const response = await axios.post(`${BASE_URL + TODO_URL}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      dispatch({
        type: ActionTypes.CREATE_TODO_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({ type: ActionTypes.CREATE_TODO_FAIL, payload: error });
  }
};

// GET ALL TODOS
export const getToDos = () => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.TODO_LIST_START });
    const response = await axios.get(`${BASE_URL + TODO_URL}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      dispatch({ type: ActionTypes.TODO_LIST_SUCCESS, payload: response.data });
    }
  } catch (error) {
    dispatch({ type: ActionTypes.TODO_LIST_FAIL, payload: error });
  }
};

// GET TO BY ID
export const getToDoById = (recordId) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.GET_TODO_START });
    const response = await axios.get(`${BASE_URL + TODO_URL}/${recordId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      dispatch({ type: ActionTypes.GET_TODO_SUCCESS, payload: response.data });
    }
  } catch (error) {
    dispatch({ type: ActionTypes.GET_TODO_FAIL, payload: error });
  }
};

// UPDATE TODO BY ID
export const updateToDo =
  ({ recordId, data }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ActionTypes.MANAGE_TODO_START });
      const response = await axios.put(
        `${BASE_URL + TODO_URL}/${recordId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        dispatch({
          type: ActionTypes.UPDATE_TODO_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({ type: ActionTypes.UPDATE_TODO_FAIL, payload: error });
    }
  };

// DELETE TODO BY ID
export const deleteToDoData = (recordId) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.TODO_DELETE_START });
    const response = await axios.delete(`${BASE_URL + TODO_URL}/${recordId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.TODO_DELETE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({ type: ActionTypes.TODO_DELETE_FAIL, payload: error });
  }
};

export const resetToDoManageState = () => (dispatch) => {
  dispatch({ type: ActionTypes.RESET_MANAGE_TODO });
};

export const resetToDoGetListState = () => (dispatch) => {
  dispatch({ type: ActionTypes.RESET_TODO_LIST });
};

export const resetGetToDoState = () => (dispatch) => {
  dispatch({ type: ActionTypes.RESET_GET_TODO_INFO });
};

export const resetToDoDeleteState = () => (dispatch) => {
  dispatch({ type: ActionTypes.RESET_TODO_DELETE_INFO });
};