import ActionTypes from "../../data/ReduxActionTypes";
const initialState = {
  loading: false,
  fetchReservationGroup: [],
  fetchReservationGroupId: [],
  createReservationGroup: null,
  editReservationGroup: null,
  deleteReservationGroup: null,
  editReservationGroupFlag: false,
  fetchReservationItemByGroupFlag: false,
  checkDuplicate: false,
  createError: null,
  editError: null,
  deleteError: null,
  getError: null,
  getByIdError: null,
};

export const createReservationGroupReducer = (
  state = {
    loading: initialState.loading,
    createReservationGroup: initialState.createReservationGroup,
    createError: initialState.createError,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.CREATE_RESERVATION_GROUP_START:
      return {
        ...state,
        loading: !initialState.loading,
      };
    case ActionTypes.CREATE_RESERVATION_GROUP_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        createReservationGroup: action.payload,
      };
    case ActionTypes.CREATE_RESERVATION_GROUP_FAIL:
      return {
        ...state,
        loading: initialState.loading,
        createError: action.payload,
      };
    default:
      return state;
  }
};

export const editReservationGroupReducer = (
  state = {
    loading: initialState.loading,
    editReservationGroup: initialState.editReservationGroup,
    editError: initialState.editError,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.EDIT_RESERVATION_GROUP_START:
      return {
        ...state,
        loading: !initialState.loading,
      };
    case ActionTypes.EDIT_RESERVATION_GROUP_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        editReservationGroup: action.payload,
      };
    case ActionTypes.EDIT_RESERVATION_GROUP_FAIL:
      return {
        ...state,
        loading: initialState.loading,
        editError: action.payload,
      };
    default:
      return state;
  }
};

export const editReservationGroupFlagReducer = (
  state = initialState.editReservationGroupFlag,
  action
) => {
  switch (action.type) {
    case ActionTypes.EDIT_RESERVATION_GROUP_FLAG:
      return { ...state, editReservationGroupFlag: !initialState.loading };
    case ActionTypes.DETAIL_RESERVATION_GROUP_FLAG:
      return { ...state, editReservationGroupFlag: initialState.loading };
    default:
      return state;
  }
};

export const deleteReservationGroupReducer = (
  state = {
    loading: initialState.loading,
    deleteReservationGroup: initialState.deleteReservationGroup,
    deleteError: initialState.deleteError,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.DELETE_RESERVATION_GROUP_START:
      return {
        ...state,
        loading: !initialState.loading,
      };
    case ActionTypes.DELETE_RESERVATION_GROUP_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        deleteReservationGroup: action.payload,
      };
    case ActionTypes.DELETE_RESERVATION_GROUP_FAIL:
      return {
        ...state,
        loading: initialState.loading,
        deleteError: action.payload,
      };
    default:
      return state;
  }
};

export const getReservationGroupReducer = (
  state = {
    loading: initialState.loading,
    fetchReservationGroup: initialState.fetchReservationGroup,
    getError: initialState.getError,
  },
  action
) => {
  switch (action.type) {
    case "GET_RESERVATION_GROUP_START":
      return {
        ...state,
        loading: !initialState.loading,
      };
    case "GET_RESERVATION_GROUP_SUCCESS":
      return {
        ...state,
        loading: initialState.loading,
        fetchReservationGroup: action.payload,
      };
    case "GET_RESERVATION_GROUP_FAIL":
      return {
        ...state,
        loading: initialState.loading,
        getError: action.payload,
      };
    default:
      return state;
  }
};

export const getReservationGroupByIdReducer = (
  state = {
    loading: initialState.loading,
    fetchReservationGroupId: initialState.fetchReservationGroupId,
    getError: initialState.getError,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.GET_RESERVATION_GROUP_START_BY_ID:
      return {
        ...state,
        loading: !initialState.loading,
      };
    case ActionTypes.GET_RESERVATION_GROUP_SUCCESS_BY_ID:
      return {
        ...state,
        loading: initialState.loading,
        fetchReservationGroupId: action.payload,
      };
    case ActionTypes.GET_RESERVATION_GROUP_FAIL_BY_ID:
      return {
        ...state,
        loading: initialState.loading,
        getByIdError: action.payload,
      };
    case ActionTypes.GET_RESERVATION_GROUP_FAIL_BY_ID_GROUP_NAME:
      return {
        ...state,
        loading: initialState.loading,
        fetchReservationGroupId: action.payload,
      };
    default:
      return state;
  }
};

export const checkForDuplicatesReducer = (
  state = { checkDuplicate: initialState.checkDuplicate },
  action
) => {
  switch (action.type) {
    case ActionTypes.CHECK_DUPLICATE_RESERVATION_GROUP_ID:
      return { ...state, checkDuplicate: action.payload };
    case ActionTypes.CHECK_DUPLICATE_RESERVATION_GROUP_ID_FAIL:
      return { ...state, checkDuplicate: !initialState.loading };
    default:
      return state;
  }
};

export const fetchReservationItemByGroupReducer = (
  state = {
    fetchReservationItemByGroupFlag:
      initialState.fetchReservationItemByGroupFlag,
  },
  action
) => {
  switch (action.type) {
    case "CHECK_FOR_RESERVATION_ITEM_BY_GROUP_ID":
      return { ...state, fetchReservationItemByGroupFlag: action.payload };
    case "CHECK_FOR_RESERVATION_ITEM_BY_GROUP_ID_FAILURE":
      return { ...state, fetchReservationItemByGroupFlag: true };
    default:
      return state;
  }
};
