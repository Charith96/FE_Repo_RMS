import ActionTypes from "../../data/ReduxActionTypes";

const initialState = {
  loading: false,
  reservations: [],
  reservationsById: [],
  error: null,
  reservationByItem: [],
};

export const reservationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_Reservation_REQUEST:
      return { ...state, loading: true, error: null };
    case ActionTypes.GET_Reservation_SUCCESS:
      return {
        ...state,
        loading: false,
        reservations: action.payload,
        error: null,
      };
    case ActionTypes.GET_Reservation_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ActionTypes.UPDATE_Reservation_SUCCESS:
      return {
        ...state,
        loading: false,
        reservations: action.payload,
        error: null,
      };
    case ActionTypes.UPDATE_Reservation_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ActionTypes.DELETE_Reservation_SUCCESS:
      return {
        ...state,
        reservations: state.reservations.filter(
          (reservation) => reservation.id !== action.payload
        ),
        error: null,
      };
    case ActionTypes.FETCH_ReservationSUCCESS:
      return {
        ...state,
        loading: false,
        reservations: [action.payload],
        error: null,
      };
    case ActionTypes.CREATE_Reservation_SUCCESS:
      return {
        ...state,
        reservations: [...state.reservations, action.payload],
        error: null,
      };
      case ActionTypes.CREATE_Reservation_FAIL:
        return { ...state, loading: false, error: action.payload };
    case ActionTypes.GET_Reservation_REQUESTID:
      return { ...state, loading: true, error: null };
    case ActionTypes.GET_Reservation_SUCCESSID:
      return {
        ...state,
        loading: false,
        reservationsById: action.payload,
        error: null,
      };
    case ActionTypes.GET_ReservationFAILID:
      return { ...state, loading: false, error: action.payload };
    case ActionTypes.GET_ReservationByItem_FAILID:
      return { ...state, loading: false, error: action.payload };
    case ActionTypes.GET_ReservationByItem_SUCCESSID:
      return {
        ...state,
        loading: false,
        reservationByItem: action.payload,
        error: null,
      };
    case ActionTypes.UPDATE_RESERVATION_SUCCESS:
      return {
        ...state,
        loading: false,
        reservation: action.payload,
        error: null,
      };
    case ActionTypes.UPDATE_RESERVATION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
      case ActionTypes.DELETE_Reservation_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  }
};
