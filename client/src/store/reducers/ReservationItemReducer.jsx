import ActionTypes from "../../data/ReduxActionTypes";
const initialState = {
  loading: false,
  createReservationItem: [],
  createError: null,
  createTimeSlots: [],
  timeSlotError: null,
};

export const createReservationItemReducer = (
  state = {
    loading: initialState.loading,
    createReservationItem: initialState.createReservationItem,
    createError: initialState.createError,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.CREATE_RESERVATION_ITEM_START:
      return {
        ...state,
        loading: !initialState.loading,
      };
    case ActionTypes.CREATE_RESERVATION_ITEM_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        createReservationItem: action.payload,
      };
    case ActionTypes.CREATE_RESERVATION_ITEM_FAIL:
      return {
        ...state,
        loading: initialState.loading,
        createError: action.payload,
      };
    default:
      return state;
  }
};

export const createTimeSlotReducer = (
  state = {
    loading: initialState.loading,
    createTimeSlots: initialState.createTimeSlots,
    timeSlotError: initialState.timeSlotError,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.CREATE_TIME_SLOT_START:
      return {
        ...state,
        loading: !initialState.loading,
      };
    case ActionTypes.CREATE_TIME_SLOT_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        createReservationItem: action.payload,
      };
    case ActionTypes.CREATE_TIME_SLOT_FAIL:
      return {
        ...state,
        loading: initialState.loading,
        timeSlotError: action.payload,
      };
    default:
      return state;
  }
};
