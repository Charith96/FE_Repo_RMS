import axios from "axios";
import { RESERVATION_ITEM, TIME_SLOT } from "../../utils/Constants.jsx";
import ActionTypes from "../../data/ReduxActionTypes.jsx";
//const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL = "https://localhost:7219/api";

export const createReservationItem = (data) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.CREATE_RESERVATION_ITEM_START });

    const response = await axios.post(`${BASE_URL}${RESERVATION_ITEM}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      dispatch({
        type: ActionTypes.CREATE_RESERVATION_ITEM_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.CREATE_RESERVATION_ITEM_FAIL,
      payload: error.message,
    });
  }
};

export const createTimeSlots = (data) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.CREATE_TIME_SLOT_START });

    const response = await axios.post(`${BASE_URL}${TIME_SLOT}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      dispatch({
        type: ActionTypes.CREATE_TIME_SLOT_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.CREATE_TIME_SLOT_FAIL,
      payload: error.message,
    });
  }
};

export const editReservationItem = (data) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.EDIT_RESERVATION_ITEM_START });
    const url = `${BASE_URL}${RESERVATION_ITEM}`;

    const response = await axios.put(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.EDIT_RESERVATION_ITEM_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({ type: ActionTypes.EDIT_RESERVATION_ITEM_FAIL, payload: error });
  }
};

export const deleteReservationItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.DELETE_RESERVATION_ITEM_START });
    const response = await axios.delete(`${BASE_URL}${RESERVATION_ITEM}/${id}`);
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.DELETE_RESERVATION_ITEM_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.DELETE_RESERVATION_ITEM_FAIL,
      payload: error,
    });
  }
};

export const fetchReservationItemsById = (id) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.GET_RESERVATION_ITEM_START_BY_ID });
    const response = await axios.get(`${BASE_URL}${RESERVATION_ITEM}/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.GET_RESERVATION_ITEM_SUCCESS_BY_ID,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.GET_RESERVATION_ITEM_FAIL_BY_ID,
      payload: error.message,
    });
  }
};

export const fetchReservationItems = () => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.GET_RESERVATION_ITEM_START });
    const response = await axios.get(`${BASE_URL}${RESERVATION_ITEM}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.GET_RESERVATION_ITEM_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.GET_RESERVATION_ITEM_FAIL,
      payload: error.message,
    });
  }
};
export const fetchTimeSlots = () => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.GET_RESERVATION_TIMESLOT });
    const response = await axios.get(`${BASE_URL}${TIME_SLOT}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.GET_RESERVATION_TIMESLOT_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.GET_RESERVATION_TIMESLOT_FAIL,
      payload: error.message,
    });
  }
};

export const resetReservationItemState = (data) => (dispatch) => {
  dispatch({
    type: ActionTypes.GET_RESERVATION_ITEM_SUCCESS,
    payload: data || [],
  });
  dispatch({ type: ActionTypes.GET_RESERVATION_ITEM_FAIL, payload: null });
};

export const resetManageReservationItemState = () => (dispatch) => {
  dispatch({
    type: ActionTypes.CREATE_RESERVATION_ITEM_SUCCESS,
    payload: null,
  });
  dispatch({ type: ActionTypes.GET_RESERVATION_ITEM_FAIL, payload: null });
};

export const fetchTimeSlotsByItemId = (id) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.GET_TIME_SLOTS_BY_ITEM_ID_START });
    const response = await axios.get(`${BASE_URL}${TIME_SLOT}/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.GET_TIME_SLOTS_BY_ITEM_ID_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.GET_TIME_SLOTS_BY_ITEM_ID_FAIL,
      payload: error.message,
    });
  }
};

export const deleteTimeSlotsByItemId = (id) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.DELETE_TIME_SLOTS_BY_ITEM_ID_START });
    const response = await axios.delete(`${BASE_URL}${TIME_SLOT}/${id}`);
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.DELETE_TIME_SLOTS_BY_ITEM_ID_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.DELETE_TIME_SLOTS_BY_ITEM_ID_FAIL,
      payload: error,
    });
  }
};

export const editTimeSlotsByItemId = (data) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.EDIT_TIME_SLOTS_BY_ITEM_ID_START });
    const url = `${BASE_URL}${TIME_SLOT}`;

    const response = await axios.put(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.EDIT_TIME_SLOTS_BY_ITEM_ID_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.EDIT_TIME_SLOTS_BY_ITEM_ID_FAIL,
      payload: error,
    });
  }
};
