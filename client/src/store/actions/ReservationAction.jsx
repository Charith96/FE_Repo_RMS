// actions/ReservationActions.js
import axios from "axios";
import ActionTypes from "../../data/ReduxActionTypes";
import { BASE_URL, RESERVATION_URL } from "../../utils/Constants";

// Action to fetch all reservations
export const fetchReservations = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}${RESERVATION_URL}`);
    dispatch({ type: ActionTypes.GET_RESERVATIONS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ActionTypes.GET_RESERVATIONS_FAIL, payload: error.message || "An error occurred" });
  }
};

// Action to create a new reservation
export const createReservation = (reservationData) => async (dispatch) => {
  try {
    const response = await axios.post(`${BASE_URL}${RESERVATION_URL}`, reservationData);
    dispatch({ type: ActionTypes.CREATE_RESERVATION_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ActionTypes.CREATE_RESERVATION_FAIL, payload: error.message || "An error occurred" });
  }
};

// Action to update an existing reservation
export const updateReservation = (id, updatedData) => async (dispatch) => {
  try {
    const response = await axios.put(`${BASE_URL}${RESERVATION_URL}/${id}`, updatedData);
    dispatch({ type: ActionTypes.UPDATE_RESERVATION_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ActionTypes.UPDATE_RESERVATION_FAIL, payload: error.message || "An error occurred" });
  }
};

// Action to delete a reservation
export const deleteReservation = (id) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}${RESERVATION_URL}/${id}`);
    dispatch({ type: ActionTypes.DELETE_RESERVATION_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: ActionTypes.DELETE_RESERVATION_FAIL, payload: error.message || "An error occurred" });
  }
};
