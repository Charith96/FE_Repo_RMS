import ActionTypes from "../../data/ReduxActionTypes";
const initialState = {
  fetchCustomer: [],
  fetchCustomerId: [],
  editCustomer: null,
  deleteCustomer: null,
  createCustomer: null,
  createError: null,
  deleteError: null,
  editError: null,
  getError: null,
  getByIdError: null,
  editCustomerFlag: false,
  loading: false,
};

export const getCustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.FETCH_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        fetchCustomer: action.payload,
      };
    case ActionTypes.FETCH_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: false,
        getError: action.payload,
      };
    default:
      return state;
  }
};

export const getCustomerByIdReducer = (
  state = {
    loading: initialState.loading,
    fetchCustomerId: initialState.fetchCustomerId,
    getError: initialState.getError,
  },
  action
)=>{
  switch (action.type){
    case ActionTypes.FETCH_CUSTOMER_REQUEST_BY_ID:
      return{
        ...state,
        loading: !initialState.loading,
      };
      case ActionTypes.FETCH_CUSTOMER_SUCCESS_BY_ID:
      return {
        ...state,
        loading: initialState.loading,
        fetchCustomerId: action.payload,
      };
    case ActionTypes.FETCH_CUSTOMER_FAILURE_BY_ID:
      return {
        ...state,
        loading: initialState.loading,
        getByIdError: action.payload,
      };
      case ActionTypes.FETCH_CUSTOMER_FAIL_BY_ID_GROUP_NAME:
      return {
        ...state,
        loading: initialState.loading,
        fetchCustomerId: action.payload,
      };
    default:
      return state;
  }
};

export const editCustomerReducer = (
  state = {
    loading: initialState.loading,
    editCustomer: initialState.editCustomer,
    editError: initialState.editError,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.UPDATE_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: !initialState.loading,
      };
    case ActionTypes.UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        editCustomer: action.payload,
      };
    case ActionTypes.UPDATE_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: initialState.loading,
        editError: action.payload,
      };
    default:
      return state;
  }
};

export const editCustomerFlagReducer = (
  state = initialState.editCustomerFlag,
  action
)=>{
  switch (action.type){
    case ActionTypes.UPDATE_CUSTOMER_FLAG:
      return{
        ...state,
        editCustomerFlag: !initialState.loading,
      };
      case ActionTypes.DETAIL_CUSTOMER_FLAG:
      return {
        ...state,
        editCustomerFlag: initialState.loading,
      };
    default:
      return state;
  }
};

export const deleteCustomerReducer = (
  state = {
    loading: initialState.loading,
    deleteCustomer: initialState.deleteCustomer,
    deleteError: initialState.deleteError,
  },
  action
)=>{
  switch (action.type){
    case ActionTypes.DELETE_CUSTOMER_REQUEST:
      return{
        ...state,
        loading: !initialState.loading,
      };
      case ActionTypes.DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        deleteCustomer: action.payload,
      };
    case ActionTypes.DELETE_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: initialState.loading,
        deleteError: action.payload,
      };
    default:
      return state;
  }
};

export const createCustomerReducer = (
  state = {
    loading: initialState.loading,
    createCustomer: initialState.createCustomer,
    createError: initialState.createError,
  },
  action
)=>{
  switch (action.type){
    case ActionTypes.CREATE_CUSTOMER_REQUEST:
      return{
        ...state,
        loading: !initialState.loading,
      };
      case ActionTypes.CREATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        createCustomer: action.payload,
      };
    case ActionTypes.CREATE_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: initialState.loading,
        createError: action.payload,
      };
    default:
      return state;
  }
};
