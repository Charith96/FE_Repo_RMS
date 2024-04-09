

import {
  FETCH_ROLES_REQUEST,
  FETCH_ROLES_SUCCESS,
  FETCH_ROLES_FAILURE,
  CREATE_ROLE_REQUEST,
  CREATE_ROLE_SUCCESS,
  CREATE_ROLE_FAILURE,
  UPDATE_ROLE_REQUEST,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_FAILURE,
  DELETE_ROLE_REQUEST,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAILURE
} from '../actions/ActionTypes';

const initialState = {
  roles: [],
  loading: false,
  error: ''
};

const rolesReducer = (state = initialState, action) => {
  switch (action.type) {
      case FETCH_ROLES_REQUEST:
      case CREATE_ROLE_REQUEST:
      case UPDATE_ROLE_REQUEST:
      case DELETE_ROLE_REQUEST:
          return {
              ...state,
              loading: true
          };
      case FETCH_ROLES_SUCCESS:
          return {
              ...state,
              loading: false,
              roles: action.payload,
              error: ''
          };
      case CREATE_ROLE_SUCCESS:
          return {
              ...state,
              loading: false,
              roles: [...state.roles, action.payload],
              error: ''
          };
      case UPDATE_ROLE_SUCCESS:
          return {
              ...state,
              loading: false,
              roles: state.roles.map(role =>
                  role.id === action.payload.id ? action.payload : role
              ),
              error: ''
          };
      case DELETE_ROLE_SUCCESS:
          return {
              ...state,
              loading: false,
              roles: state.roles.filter(role => role.id !== action.payload),
              error: ''
          };
      case FETCH_ROLES_FAILURE:
      case CREATE_ROLE_FAILURE:
      case UPDATE_ROLE_FAILURE:
      case DELETE_ROLE_FAILURE:
          return {
              ...state,
              loading: false,
              error: action.payload
          };
      default:
          return state;
  }
};

export default rolesReducer;
