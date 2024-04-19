// Importing ActionTypes from the new file
import ActionTypes from "../../data/ReduxActionTypes";

const initialState = {
  loading: false,
  users: [],
  roles: [],
  company: [],

  error: null,

};

// Reducer function
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_USERS_REQUEST:
      return { ...state, loading: true, error: null };
   case ActionTypes.GET_ITEM_REQUEST:
      return { ...state, loading: true, error: null };
    case ActionTypes.GET_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload, error: null };
    case ActionTypes.GET_USERS_FAIL:
      return { ...state, loading: false, error: action.payload };

      //Item_reducer
  
    case ActionTypes.GET_USERS_REQUESTID:
      return { ...state, loading: true, error: null };
    case ActionTypes.GET_USERS_SUCCESSID:
      return { ...state, loading: false, users: action.payload, error: null };
    case ActionTypes.GET_USERS_FAILID:
    case ActionTypes.CREATE_USER_SUCCESS:
      return { ...state, users: [...state.users, action.payload], error: null };
    case ActionTypes.GET_USERCOMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        company: action.payload,
      };
    case ActionTypes.GET_USERROLES_SUCCESS:
      return {
        ...state,
        loading: false,
        roles: action.payload,
      };
    case ActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };
    case ActionTypes.UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ActionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
        error: null,
      };
    case ActionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [action.payload],
        error: null,
      };
 
    default:
      return state;
  }
};
