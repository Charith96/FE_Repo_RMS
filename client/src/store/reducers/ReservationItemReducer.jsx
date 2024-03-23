import ActionTypes from "../../data/ReduxActionTypes";
const initialState = {
  loading: false,
  createReservationItem: [],
  createError: null,
  createTimeSlots: [],
  timeSlotError: null,
  editReservationItem: [],
  editError: null,
  deleteReservationItem: [],
  deleteError: null,
  fetchReservationItemId: [],
  getByIdError: null,
  timeSlotsByItemId: [],
  getTimeSlotsError: null,
  timeSlotsDeleted: false,
  deleteTimeSlotsError: null,
  timeSlotsEdited: [],
  editTimeSlotsError: null,
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

export const editReservationItemReducer = (
  state = {
    loading: initialState.loading,
    editReservationItem: initialState.editReservationItem,
    editError: initialState.editError,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.EDIT_RESERVATION_ITEM_START:
      return {
        ...state,
        loading: !initialState.loading,
      };
    case ActionTypes.EDIT_RESERVATION_ITEM_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        editReservationItem: action.payload,
      };
    case ActionTypes.EDIT_RESERVATION_ITEM_FAIL:
      return {
        ...state,
        loading: initialState.loading,
        editError: action.payload,
      };
    default:
      return state;
  }
};

export const deleteReservationItemReducer = (
  state = {
    loading: initialState.loading,
    deleteReservationItem: initialState.deleteReservationItem,
    deleteError: initialState.deleteError,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.DELETE_RESERVATION_ITEM_START:
      return {
        ...state,
        loading: !initialState.loading,
      };
    case ActionTypes.DELETE_RESERVATION_ITEM_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        deleteReservationItem: action.payload,
      };
    case ActionTypes.DELETE_RESERVATION_ITEM_FAIL:
      return {
        ...state,
        loading: initialState.loading,
        deleteError: action.payload,
      };
    default:
      return state;
  }
};

export const getReservationItemByIdReducer = (
  state = {
    loading: initialState.loading,
    fetchReservationItemId: initialState.fetchReservationItemId,
    getByIdError: initialState.getByIdError,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.GET_RESERVATION_ITEM_START_BY_ID:
      return {
        ...state,
        loading: !initialState.loading,
      };
    case ActionTypes.GET_RESERVATION_ITEM_SUCCESS_BY_ID:
      return {
        ...state,
        loading: initialState.loading,
        fetchReservationItemId: action.payload,
      };
    case ActionTypes.GET_RESERVATION_ITEM_FAIL_BY_ID:
      return {
        ...state,
        loading: initialState.loading,
        getByIdError: action.payload,
      };
    case ActionTypes.GET_RESERVATION_ITEM_FAIL_BY_ID_ITEM_NAME:
      return {
        ...state,
        loading: initialState.loading,
        fetchReservationItemId: action.payload,
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

// Reducer for fetching time slots by item ID
export const getTimeSlotsByItemIdReducer = (
  state = {
    loading: initialState.loading,
    timeSlotsByItemId: initialState.timeSlotsByItemId,
    getTimeSlotsError: initialState.getTimeSlotsError,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.GET_TIME_SLOTS_BY_ITEM_ID_START:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.GET_TIME_SLOTS_BY_ITEM_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        timeSlotsByItemId: action.payload,
      };
    case ActionTypes.GET_TIME_SLOTS_BY_ITEM_ID_FAIL:
      return {
        ...state,
        loading: false,
        getTimeSlotsError: action.payload,
      };
    default:
      return state;
  }
};

// Reducer for deleting time slots by item ID
export const deleteTimeSlotsByItemIdReducer = (
  state = {
    loading: initialState.loading,
    timeSlotsDeleted: initialState.timeSlotsDeleted,
    deleteTimeSlotsError: initialState.deleteTimeSlotsError,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.DELETE_TIME_SLOTS_BY_ITEM_ID_START:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.DELETE_TIME_SLOTS_BY_ITEM_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        timeSlotsDeleted: true,
      };
    case ActionTypes.DELETE_TIME_SLOTS_BY_ITEM_ID_FAIL:
      return {
        ...state,
        loading: false,
        deleteTimeSlotsError: action.payload,
      };
    default:
      return state;
  }
};

// Reducer for editing time slots by item ID
export const editTimeSlotsByItemIdReducer = (
  state = {
    loading: initialState.loading,
    timeSlotsEdited: initialState.timeSlotsEdited,
    editTimeSlotsError: initialState.editTimeSlotsError,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.EDIT_TIME_SLOTS_BY_ITEM_ID_START:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.EDIT_TIME_SLOTS_BY_ITEM_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        timeSlotsEdited: true,
      };
    case ActionTypes.EDIT_TIME_SLOTS_BY_ITEM_ID_FAIL:
      return {
        ...state,
        loading: false,
        editTimeSlotsError: action.payload,
      };
    default:
      return state;
  }
};
