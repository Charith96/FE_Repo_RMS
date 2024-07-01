import ActionTypes from "../../data/ReduxActionTypes";
const initialState = {
    loading : false,
    loginData: [],
    loginError: null,
};

export const loginReducer = (state = {
    loading: initialState.loading,
    loginData: initialState.loginData,
    loginError: initialState.loginError,
}, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_START:
            return {
                ...state,
                loading: !initialState.loading,
            };
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loading: initialState.loading,
                loginData: action.payload,
            };
        case ActionTypes.LOGIN_FAIL:
            return {
                ...state,
                loading: initialState.loading,
                loginError: action.payload,
            };
        case ActionTypes.RESET_LOGIN:
            return {
                ...state,
                loading: initialState.loading,
                loginData: initialState.loginData,
                loginError: initialState.loginError,
            };
        default:
            return state;
    }
};