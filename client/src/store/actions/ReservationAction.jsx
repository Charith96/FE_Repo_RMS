import axios from "axios";
import { toastFunction } from "../../components/ToastComponent";
import { BASE_URL, RESERVATION_URL } from "../../utils/Constants";
import ActionTypes from "../../data/ReduxActionTypes";

export const fetchReservations = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}${RESERVATION_URL}`);
    dispatch({ type: ActionTypes.GET_RESERVATION_SUCCESS, payload: response.data });
    console.log("Data fetched successfully");
  } catch (error) {
    dispatch({ type: ActionTypes.GET_RESERVATION_FAIL, payload: error });
    console.error("Error fetching data:", error);
  }
};

export const  fetchReservationByItemId  = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}${RESERVATION_URL}?itemID=${id}`, {
      headers: { "Content-Type": "application/json" },
    });

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
    const response = await axios.get(`${BASE_URL}${RESERVATION_URL}?reservationID=${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    

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

export const fetchReservation = () => async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL}${RESERVATION_URL}`);
     
      dispatch({ type: ActionTypes.GET_Reservation_SUCCESS, payload: response.data });
      console.log("Data fetched successfully");
    } catch (error) {
      dispatch({ type: ActionTypes.GET_Reservation_FAIL, payload: error });
      console.error("Error fetching data:", error);
    }
  };

  
export const createReservation = (reservationData) => async (dispatch) => {
    try {
      const response = await axios.post(`${BASE_URL}${RESERVATION_URL}`, reservationData);
      dispatch({ type: ActionTypes.CREATE_Reservation_SUCCESS, payload: response.data });
     
    } catch (error) {
      console.error("Error creating reservation:", error);

    }
  };
  
  export const updateReservations = (id, updatedReservations) => async (dispatch) => {
    try {
      const response = await axios.put(`${BASE_URL}${RESERVATION_URL}/${id}`,updatedReservations);
     
      dispatch({ type: ActionTypes.UPDATE_Reservation_SUCCESS , payload: response.data });
      console.log("Reservations updated successfully");
    } catch (error) {
      dispatch({ type: ActionTypes.UPDATE_Reservation_FAIL , payload: error });
      console.error("Error updating reservation data:", error);
    }
  };
  
  export const deleteReservation = (id) => async (dispatch) => { 
    try {
      await axios.delete(`${BASE_URL}${RESERVATION_URL}/${id}`);
      dispatch(fetchReservation());
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };
  
  export const updateReservationData = (id, updatedreservationData) => async (dispatch) => {
    try {
      const response = await axios.put(`${BASE_URL}${RESERVATION_URL}/${id}`, updatedreservationData);
     
      dispatch({ type: ActionTypes.UPDATE_RESERVATION_SUCCESS, payload: response.data });
      toastFunction("Reservation updated successfully");
    
    } catch (error) {
      dispatch({ type: ActionTypes.UPDATE_RESERVATION_FAIL, payload: error });
      console.error("Error updating data:", error);
    }
  };
  