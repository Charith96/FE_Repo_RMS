import ActionTypes from "../../data/ReduxActionTypes";
const initialPrivilegeState = {
  privileges: [],
  loading: false,
  error: null,
};

const initialRolePrivilegeState = {
  rolePrivileges: [],
  loading: false,
  error: null,
};

export const privilegeReducer = (state = initialPrivilegeState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_PRIVILEGES_START:
      return { ...state, loading: true, error: null };
    case ActionTypes.FETCH_PRIVILEGES_SUCCESS:
      return {
        ...state,
        loading: false,
        privileges: action.payload,
        error: null,
      };
    case ActionTypes.FETCH_PRIVILEGES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ActionTypes.CREATE_PRIVILEGE_START:
      return { ...state, loading: true, error: null };
    case ActionTypes.CREATE_PRIVILEGE_SUCCESS:
      return {
        ...state,
        loading: false,
        privileges: action.payload,
        error: null,
      };
    case ActionTypes.CREATE_PRIVILEGE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ActionTypes.DELETE_PRIVILEGE_START:
      return { ...state, loading: true, error: null };
    case ActionTypes.DELETE_PRIVILEGE_SUCCESS:
      return {
        ...state,
        loading: false,
        privileges: state.privileges.filter(
          (privilege) => privilege.id !== action.payload
        ),
        error: null,
      };
    case ActionTypes.DELETE_PRIVILEGE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const rolePrivilegeReducer = (
  state = initialRolePrivilegeState,
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_ROLE_PRIVILEGES_START:
      return { ...state, loading: true, error: null };
    case ActionTypes.FETCH_ROLE_PRIVILEGES_SUCCESS:
      return {
        ...state,
        loading: false,
        rolePrivileges: action.payload,
        error: null,
      };
    case ActionTypes.FETCH_ROLE_PRIVILEGES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ActionTypes.CREATE_ROLE_PRIVILEGE_START:
      return { ...state, loading: true, error: null };
    case ActionTypes.CREATE_ROLE_PRIVILEGE_SUCCESS:
      return {
        ...state,
        loading: false,
        rolePrivileges: [...state.rolePrivileges, action.payload],
        error: null,
      };
    case ActionTypes.CREATE_ROLE_PRIVILEGE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ActionTypes.DELETE_ROLE_PRIVILEGE_START:
      return { ...state, loading: true, error: null };
    case ActionTypes.DELETE_ROLE_PRIVILEGE_SUCCESS:
      return {
        ...state,
        loading: false,
        rolePrivileges: state.rolePrivileges.filter(
          (rolePrivilege) => rolePrivilege.id !== action.payload
        ),
        error: null,
      };
    case ActionTypes.DELETE_ROLE_PRIVILEGE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ActionTypes.UPDATE_ROLE_PRIVILEGE_START:
      return { ...state, loading: true, error: null };
    case ActionTypes.UPDATE_ROLE_PRIVILEGE_SUCCESS:
      return {
        ...state,
        loading: false,
        rolePrivileges: state.rolePrivileges.map((rp) =>
          rp.id === action.payload.id ? action.payload : rp
        ),
        error: null,
      };
    case ActionTypes.UPDATE_ROLE_PRIVILEGE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
