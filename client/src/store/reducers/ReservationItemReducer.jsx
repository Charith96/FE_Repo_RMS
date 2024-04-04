import ActionTypes from "../../data/ReduxActionTypes";
const initialState = {
  loading: false,
  fetchReservationItem: [],
  fetchReservationItemId: [],
  createReservationItem: null,
  editReservationItem: null,
  deleteReservationItem: null,
  editReservationItemFlag: false,
  createError: null,
  editError: null,
  deleteError: null,
    getError: null,
    getByIdError: null,
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
        timeSlotError: action.payload,
      };
    default:
      return state;
  }
};

/*New edited part */

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
        loading: false,
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

export const editReservationItemFlagReducer = (
  state = initialState.editReservationItemFlag,
  action
) => {
  switch (action.type) {
    case ActionTypes.EDIT_RESERVATION_ITEM_FLAG:
      return { ...state, editReservationGroupFlag: !initialState.loading };
    case ActionTypes.DETAIL_RESERVATION_ITEM_FLAG:
      return { ...state, editReservationGroupFlag: initialState.loading };
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

export const getReservationItemReducer = (
  state = {
    loading: initialState.loading,
    fetchReservationItem: initialState.fetchReservationItem,
    getError: initialState.getError,
  },
  action
) => {
  switch (action.type) {
    case "GET_RESERVATION_ITEM_START":
      return {
        ...state,
        loading: !initialState.loading,
      };
    case "GET_RESERVATION_ITEM_SUCCESS":
      return {
        ...state,
        loading: initialState.loading,
        fetchReservationItem: action.payload,
      };
    case "GET_RESERVATION_ITEM_FAIL":
      return {
        ...state,
        loading: initialState.loading,
        getError: action.payload,
      };
    default:
      return state;
  }
};

export const getReservationItemByIdReducer = (
  state = {
    loading: initialState.loading,
    fetchReservationItemId: initialState.fetchReservationItemId,
    getError: initialState.getError,
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

// export const checkForDuplicatesReducer = (
//   state = {checkDuplicate:initialState.checkDuplicate},
//   action
// ) => {
//   switch (action.type) {
//     case "CHECK_DUPLICATE_RESERVATION_ITEM_ID":
//       return { ...state, checkDuplicate: action.payload };
//     case "CHECK_DUPLICATE_RESERVATION_ITEM_ID_FAILURE":
//       return { ...state, checkDuplicate: true };
//     default:
//       return state;
//   }
// };


/*New edited part */
