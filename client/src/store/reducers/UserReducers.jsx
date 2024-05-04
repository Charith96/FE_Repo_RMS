import ActionTypes from "../../data/ReduxActionTypes";

const initialState = {
  loading: false,
  users: [],
  userById: [],
  error: null,
};

export const getUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_USERS_REQUEST:
      return { ...state, loading: true, error: null };
    case ActionTypes.GET_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload, error: null };
    case ActionTypes.GET_USERS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export const getUserByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_USERS_REQUESTID:
      return { ...state, loading: true, error: null };
    case ActionTypes.GET_USERS_SUCCESSID:
      return {
        ...state,
        loading: false,
        userById: action.payload,
        error: null,
      };
    case ActionTypes.GET_USERS_FAILID:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_USER_SUCCESS:
      return { ...state, users: [...state.users, action.payload], error: null };
    case ActionTypes.CREATE_USER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: null };
    case ActionTypes.UPDATE_USER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
        error: null,
      };
    default:
      return state;
  }
};
