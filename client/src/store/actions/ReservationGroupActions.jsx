import axios from "axios";
import { RESERVATION_GROUP, RESERVATION_ITEM } from "../../utils/Constants.jsx";
import ActionTypes from "../../data/ReduxActionTypes.jsx";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const createReservationGroup = (data) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.CREATE_RESERVATION_GROUP_START });

    const response = await axios.post(`${BASE_URL}${RESERVATION_GROUP}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      dispatch({
        type: ActionTypes.CREATE_RESERVATION_GROUP_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.CREATE_RESERVATION_GROUP_FAIL,
      payload: error.message,
    });
  }
};

export const editReservationGroup = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.EDIT_RESERVATION_GROUP_START });
    const url = `${BASE_URL}${RESERVATION_GROUP}/${id}`;

    const response = await axios.put(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.EDIT_RESERVATION_GROUP_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({ type: ActionTypes.EDIT_RESERVATION_GROUP_FAIL, payload: error });
  }
};

export const deleteReservationGroup = (id) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.DELETE_RESERVATION_GROUP_START });
    const response = await axios.delete(
      `${BASE_URL}${RESERVATION_GROUP}/${id}`
    );
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.DELETE_RESERVATION_GROUP_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.DELETE_RESERVATION_GROUP_FAIL,
      payload: error,
    });
  }
};

export const fetchReservationGroups = () => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.GET_RESERVATION_GROUP_START });
    const response = await axios.get(`${BASE_URL}${RESERVATION_GROUP}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.GET_RESERVATION_GROUP_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.GET_RESERVATION_GROUP_FAIL,
      payload: error.message,
    });
  }
};

export const fetchReservationGroupsById = (id) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.GET_RESERVATION_GROUP_START_BY_ID });
    const response = await axios.get(`${BASE_URL}${RESERVATION_GROUP}/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.GET_RESERVATION_GROUP_SUCCESS_BY_ID,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.GET_RESERVATION_GROUP_FAIL_BY_ID,
      payload: error.message,
    });
  }
};

export const checkForDuplicate = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${RESERVATION_GROUP}?groupId=${id}`
    );
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.CHECK_DUPLICATE_RESERVATION_GROUP_ID,
        payload: response.data.length > 0,
      });
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.CHECK_DUPLICATE_RESERVATION_GROUP_ID_FAIL,
      payload: error.message,
    });
  }
};

export const resetReservationGroupState = (data) => (dispatch) => {
  dispatch({
    type: ActionTypes.GET_RESERVATION_GROUP_SUCCESS,
    payload: data || [],
  });
  dispatch({ type: ActionTypes.GET_RESERVATION_GROUP_FAIL, payload: null });
};

export const resetManageReservationGroupState = () => (dispatch) => {
  dispatch({
    type: ActionTypes.CREATE_RESERVATION_GROUP_SUCCESS,
    payload: null,
  });
  dispatch({ type: ActionTypes.GET_RESERVATION_GROUP_FAIL, payload: null });
};

export const fetchReservationItemByGroupId = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${RESERVATION_ITEM}?reservationGroup=${id}`
    );
    console.log("response", response.data.length);
    if (response.status === 200){
    dispatch({
      type: "CHECK_FOR_RESERVATION_ITEM_BY_GROUP_ID",
      payload: response.data.length > 0,
    });}
  } catch (error) {
    dispatch({
      type: "CHECK_FOR_RESERVATION_ITEM_BY_GROUP_ID_FAILURE",
      payload: error.message || "An error occurred",
    });
  }
};
