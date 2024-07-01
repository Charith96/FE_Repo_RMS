import axios from "axios";
import ActionTypes from "../../data/ReduxActionTypes";
import { RESERVATIONBYITEM_URL, RESERVATION_URL } from "../../utils/Constants";
import { toastFunction } from "../../components/ToastComponent";
import { toast } from "react-toastify";
export const BASE_URL = process.env.REACT_APP_BASE_URL;

const getToken = () => localStorage.getItem('token');
const token = getToken();

export const fetchReservations = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}${RESERVATION_URL}`);
    dispatch({
      type: ActionTypes.GET_RESERVATIONS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.GET_RESERVATIONS_FAIL,
      payload: error.message || "An error occurred",
    });
  }
};

export const createReservation = (reservationData) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${RESERVATION_URL}`,
      reservationData,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: ActionTypes.CREATE_RESERVATION_SUCCESS,
      payload: response.data,
    });
    toast.success("Reservation Created Successfully!");
  } catch (error) {
    dispatch({
      type: ActionTypes.CREATE_RESERVATION_FAIL,
      payload: error.message || "An error occurred",
    });
  }
};

export const updateReservation = (id, updatedData) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${BASE_URL}${RESERVATION_URL}/${id}`,
      updatedData,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: ActionTypes.UPDATE_RESERVATION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.UPDATE_RESERVATION_FAIL,
      payload: error.message || "An error occurred",
    });
  }
};

export const deleteReservation = (id) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}${RESERVATION_URL}/${id}`,{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    dispatch({ type: ActionTypes.DELETE_RESERVATION_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: ActionTypes.DELETE_RESERVATION_FAIL,
      payload: error.message || "An error occurred",
    });
  }
};

export const fetchReservationByItemId = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${RESERVATIONBYITEM_URL}/${id}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    dispatch({
      type: ActionTypes.GET_ReservationByItem_SUCCESSID,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.GET_ReservationByItem_FAILID,
      payload: error.message || "An error occurred",
    });
  }
};
export const fetchReservationId = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${RESERVATION_URL}?reservationID=${id}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    dispatch({
      type: ActionTypes.GET_Reservation_SUCCESSID,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.GET_Reservation_FAILID,
      payload: error.message || "An error occurred",
    });
  }
};
export const updateReservationById =
  (id, updatedReservations) => async (dispatch) => {
    try {
      const response = await axios.put(
        `${BASE_URL}${RESERVATION_URL}/${id}`,
        updatedReservations,{
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: ActionTypes.UPDATE_ReservationById_SUCCESS,
        payload: response.data,
      });
      toastFunction("Created reservation Succesfully", false);
    } catch (error) {
      dispatch({
        type: ActionTypes.UPDATE_ReservationById_FAIL,
        payload: error,
      });
    }
  };
