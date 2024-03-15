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
