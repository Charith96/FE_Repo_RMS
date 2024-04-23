import ActionTypes from "../../data/ReduxActionTypes";

const initialState = {
  roles: [],
  loading: false,
  error: null
};

const rolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_ROLES_START:
    case ActionTypes.DELETE_ROLE_START:
    case ActionTypes.MANAGE_ROLE_START:
      return { ...state, loading: true, error: null };
    case ActionTypes.CREATE_ROLE_SUCCESS:
    case ActionTypes.UPDATE_ROLE_SUCCESS:
      return { ...state, loading: false, roles: [...state.roles, action.payload], error: null };
    case ActionTypes.FETCH_ROLES_SUCCESS:
      return { ...state, loading: false, roles: action.payload, error: null };
    case ActionTypes.DELETE_ROLE_SUCCESS:
      return { ...state, loading: false, roles: state.roles.filter(role => !action.payload.includes(role.id)), error: null };
    case ActionTypes.FETCH_ROLES_FAILURE:
    case ActionTypes.DELETE_ROLE_FAILURE:
    case ActionTypes.UPDATE_ROLE_FAILURE:
    case ActionTypes.CREATE_ROLE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default rolesReducer;
