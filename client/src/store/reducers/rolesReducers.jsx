// rolesReducer.jsx

const initialState = {
    roles: [],
    error: null
};

const rolesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ROLE':
            return {
                ...state,
                roles: [...state.roles, action.payload],
                error: null
            };
        case 'REMOVE_ROLE':
            return {
                ...state,
                roles: state.roles.filter(role => role.id !== action.payload),
                error: null
            };
        case 'UPDATE_ROLE':
            return {
                ...state,
                roles: state.roles.map(role =>
                    role.id === action.payload.id ? action.payload : role
                ),
                error: null
            };
        case 'FETCH_ROLES_SUCCESS':
            return {
                ...state,
                roles: action.payload,
                error: null
            };
        case 'FETCH_ROLES_FAILURE':
        case 'DELETE_ROLE_FAILURE':
        case 'UPDATE_ROLE_FAILURE':
            return {
                ...state,
                error: action.payload
            };
        case 'DELETE_ROLE_SUCCESS':
        case 'UPDATE_ROLE_SUCCESS':
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

export default rolesReducer;