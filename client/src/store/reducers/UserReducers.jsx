import ActionTypes from "../../data/ReduxActionTypes";

const initialState = {
  loading: false,
  users: [],
  userRoles: [],
  userCompany: [],
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

export const getUsersRoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_USERROLES_REQUEST:
      return { ...state, loading: true, error: null };
    case ActionTypes.GET_USERROLES_SUCCESS:
      return {
        ...state,
        loading: false,
        userRoles: action.payload,
        error: null,
      };
    case ActionTypes.GET_USERROLES_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createUsersRoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_USERROLE_SUCCESS:
      return {
        ...state,
        userRoles: [...state.userRoles, action.payload],
        error: null,
      };
    case ActionTypes.CREATE_USERROLES_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateUsersRoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_USERROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        userRoles: action.payload,
        error: null,
      };
    case ActionTypes.UPDATE_USERROLE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteUsersRoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.DELETE_USERROLE_SUCCESS:
      return {
        ...state,
        userRoles: state.userRoles.filter((user) => user.id !== action.payload),
        error: null,
      };
    default:
      return state;
  }
};

export const getUserCompaniesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_USERCOMPANIES_SUCCESS:
      return {
        ...state,
        loading: false,
        userCompany: action.payload,
        error: null,
      };
    case ActionTypes.GET_USERCOMPANIES_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createUserCompaniesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_USERCOMPANY_SUCCESS:
      return {
        ...state,
        userCompany: [...state.userCompany, action.payload],
        error: null,
      };
    case ActionTypes.CREATE_USERCOMPANY_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateUserCompaniesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_USERCOMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        userCompany: action.payload,
        error: null,
      };
    case ActionTypes.UPDATE_USERCOMPANY_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteUserCompaniesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.DELETE_USERCOMPANY_SUCCESS:
      return {
        ...state,
        users: state.userCompany.filter((user) => user.id !== action.payload),
        error: null,
      };
    default:
      return state;
  }
};
