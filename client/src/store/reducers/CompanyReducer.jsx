import ActionTypes from "../../data/ReduxActionTypes";

// Define the initial state
const initialState = {
  loading: false,
  createError: null,
  editError: null,
  deleteError: null,
  getError: null,
  getByIdError: null,
  fetchCompany: [],
  fetchCompanyId: [],
  createCompany: null,
  editCompany: null,
  deleteCompany: null,
  editCompanyFlag: false,
  countries: [],
  currencies: [],
};

// Reducer for creating a company
export const createCompanyReducer = (
  state = {
    loading: initialState.loading,
    createCompany: initialState.createCompany,
    createError: initialState.createError,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.CREATE_COMPANY_START:
      return {
        ...state,
        loading: !initialState.loading,
      };
    case ActionTypes.CREATE_COMPANY_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        createCompany: action.payload,
      };
    case ActionTypes.CREATE_COMPANY_FAIL:
      return {
        ...state,
        loading: initialState.loading,
        createError: action.payload,
      };
    default:
      return state;
  }
};

// Reducer for editing a company
export const editCompanyReducer = (
  state = {
    loading: initialState.loading,
    editCompany: initialState.editCompany,
    editError: initialState.editError,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.EDIT_COMPANY_START:
      return {
        ...state,
        loading: !initialState.loading,
      };
    case ActionTypes.EDIT_COMPANY_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        editCompany: action.payload,
      };
    case ActionTypes.EDIT_COMPANY_FAIL:
      return {
        ...state,
        loading: initialState.loading,
        editError: action.payload,
      };
    default:
      return state;
  }
};

// Reducer for handling the edit company flag
export const editCompanyFlagReducer = (
  state = initialState.editCompanyFlag,
  action
) => {
  switch (action.type) {
    case ActionTypes.EDIT_COMPANY_FLAG:
      return {
        ...state,
        editCompanyFlag: !initialState.loading,
      };
    case ActionTypes.DETAIL_COMPANY_FLAG:
      return {
        ...state,
        editCompanyFlag: initialState.loading,
      };
    default:
      return state;
  }
};

// Reducer for deleting a company
export const deleteCompanyReducer = (
  state = {
    loading: initialState.loading,
    deleteCompany: initialState.deleteCompany,
    deleteError: initialState.deleteError,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.DELETE_COMPANY_START:
      return {
        ...state,
        loading: !initialState.loading,
      };
    case ActionTypes.DELETE_COMPANY_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        deleteCompany: action.payload,
      };
    case ActionTypes.DELETE_COMPANY_FAIL:
      return {
        ...state,
        loading: initialState.loading,
        deleteError: action.payload,
      };
    default:
      return state;
  }
};

// Reducer for fetching all companies
export const getCompanyReducer = (
  state = {
    loading: initialState.loading,
    fetchCompany: initialState.fetchCompany,
    getError: initialState.getError,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.GET_COMPANY_START:
      return {
        ...state,
        loading: !initialState.loading,
      };
    case ActionTypes.GET_COMPANY_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        fetchCompany: action.payload,
      };
    case ActionTypes.GET_COMPANY_FAIL:
      return {
        ...state,
        loading: initialState.loading,
        getError: action.payload,
      };
    default:
      return state;
  }
};

// Reducer for fetching a company by ID
export const getCompanyByIdReducer = (
  state = {
    loading: initialState.loading,
    fetchCompanyId: initialState.fetchCompanyId,
    getError: initialState.getError,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.GET_COMPANY_START_BY_ID:
      return {
        ...state,
        loading: !initialState.loading,
      };
    case ActionTypes.GET_COMPANY_SUCCESS_BY_ID:
      return {
        ...state,
        loading: initialState.loading,
        fetchCompanyId: action.payload,
      };
    case ActionTypes.GET_COMPANY_FAIL_BY_ID:
      return {
        ...state,
        loading: initialState.loading,
        getByIdError: action.payload,
      };
    case ActionTypes.GET_COMPANY_FAIL_BY_ID_GROUP_NAME:
      return {
        ...state,
        loading: initialState.loading,
        fetchCompanyId: action.payload,
      };
    default:
      return state;
  }
};

// Reducer for fetching countries
export const countriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_COUNTRIES_START:
      return { ...state, loading: true };
    case ActionTypes.FETCH_COUNTRIES_SUCCESS:
      return { ...state, loading: false, countries: action.payload };
    case ActionTypes.FETCH_COUNTRIES_FAIL:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

// Reducer for fetching currencies
export const currenciesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_CURRENCIES_START:
      return { ...state, loading: true };
    case ActionTypes.FETCH_CURRENCIES_SUCCESS:
      return { ...state, loading: false, currencies: action.payload };
    case ActionTypes.FETCH_CURRENCIES_FAIL:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};