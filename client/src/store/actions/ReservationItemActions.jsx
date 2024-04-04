import axios from "axios";
import { RESERVATION_ITEM, TIME_SLOT } from "../../utils/Constants.jsx";
import ActionTypes from "../../data/ReduxActionTypes.jsx";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const createReservationItem = (data) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.CREATE_RESERVATION_ITEM_START });

    const response = await axios.post(`${BASE_URL}${RESERVATION_ITEM}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
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

 /*New edited part */

//  export const handleDetails = () => (dispatch) => {
//   dispatch({ type: "DETAIL_RESERVATION_ITEM_FLAG" });
// };

// export const handleEdit = () => (dispatch) => {
//   dispatch({ type: "EDIT_RESERVATION_ITEM_FLAG" });
// };


export const editReservationItem = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.EDIT_RESERVATION_ITEM_START });
    const url = `${BASE_URL}${RESERVATION_ITEM}/${id}`;

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
    const response = await axios.delete(
      `${BASE_URL}${RESERVATION_ITEM}/${id}`
    );
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.DELETE_RESERVATION_ITEM_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({ type: ActionTypes.DELETE_RESERVATION_ITEM_FAIL, 
      payload: error 
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

// export const checkForDuplicate = (id) => async (dispatch) => {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}${RESERVATION_ITEM}?itemId=${id}`
//     );
//     console.log("response", response.data.length);
//     if (response.status === 200){
//     dispatch({
//       type: "CHECK_DUPLICATE_RESERVATION_ITEM_ID",
//       payload: response.data.length > 0,
//     });}
//   } catch (error) {
//     dispatch({
//       type: "CHECK_DUPLICATE_RESERVATION_ITEM_ID_FAILURE",
//       payload: error.message || "An error occurred",
//     });
//   }
// };

 /*New edited part */
