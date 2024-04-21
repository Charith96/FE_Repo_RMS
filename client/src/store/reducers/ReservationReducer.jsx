// reducers/ReservationReducer.js
import ActionTypes from "../../data/ReduxActionTypes";

const initialState = {
  loading: false,
  reservations: [],
  error: null,
};

export const reservationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_RESERVATIONS_REQUEST:
      return { ...state, loading: true, error: null };
    case ActionTypes.GET_RESERVATIONS_SUCCESS:
      return { ...state, loading: false, reservations: action.payload, error: null };
    case ActionTypes.GET_RESERVATIONS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ActionTypes.CREATE_RESERVATION_SUCCESS:
      return { ...state, reservations: [...state.reservations, action.payload], error: null };
    case ActionTypes.CREATE_RESERVATION_FAIL:
      return { ...state, error: action.payload };
    case ActionTypes.UPDATE_RESERVATION_SUCCESS:
      const updatedReservations = state.reservations.map((reservation) =>
        reservation.id === action.payload.id ? action.payload : reservation
      );
      return { ...state, reservations: updatedReservations, error: null };
    case ActionTypes.UPDATE_RESERVATION_FAIL:
      return { ...state, error: action.payload };
    case ActionTypes.DELETE_RESERVATION_SUCCESS:
      const filteredReservations = state.reservations.filter((reservation) => reservation.id !== action.payload);
      return { ...state, reservations: filteredReservations, error: null };
    case ActionTypes.DELETE_RESERVATION_FAIL:
      return { ...state, error: action.payload };
    // Add cases for other reservation-related actions as needed
    default:
      return state;
  }
};
