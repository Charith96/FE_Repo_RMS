import ActionTypes from "../../data/ReduxActionTypes";
const initialState = {
    loading: false,
    createAdmin: null,
    createError: null,
    fetchAdmin: [],
    getError: null,
};

export const createAdminReducer = (
    state = {
      loading: initialState.loading,
      createAdmin: initialState.createAdmin,
      createError: initialState.createError,
    },
    action
  ) => {
    switch (action.type) {
      case ActionTypes.CREATE_ADMIN_START:
        return {
          ...state,
          loading: !initialState.loading,
        };
      case ActionTypes.CREATE_ADMIN_SUCCESS:
        return {
          ...state,
          loading: initialState.loading,
          createAdmin: action.payload,
        };
      case ActionTypes.CREATE_ADMIN_FAIL:
        return {
          ...state,
          loading: initialState.loading,
          createError: action.payload,
        };
      default:
        return state;
    }
  };

  export const getAdminsReducer = (
    state = {
      loading: initialState.loading,
      fetchAdmin: initialState.fetchAdmin,
      getError: initialState.getError,
    },
    action
  ) => {
    switch (action.type) {
      case ActionTypes.GET_ADMIN_START:
        return {
          ...state,
          loading: !initialState.loading,
        };
      case ActionTypes.GET_ADMIN_SUCCESS:
        return {
          ...state,
          loading: initialState.loading,
          fetchAdmin: action.payload,
        };
      case ActionTypes.GET_ADMIN_FAIL:
        return {
          ...state,
          loading: initialState.loading,
          getError: action.payload,
        };
      default:
        return state;
    }
  };