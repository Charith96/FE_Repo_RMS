const initialState = {
  customers: [],
  customer:{},
  customer: null,
  error: null,
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CUSTOMERS_SUCCESS':
      return {
        ...state,
        customers: action.payload,
        error: null,
      };
    case 'FETCH_CUSTOMERS_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'FETCH_CUSTOMER_SUCCESS':
      return {
        ...state,
        customer: action.payload,
        error: null,
      };
    case 'FETCH_CUSTOMER_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'CREATE_CUSTOMER_SUCCESS':
      return {
        ...state,
        customers: [...state.customers, action.payload],
        error: null,
      };
    case 'CREATE_CUSTOMER_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'UPDATE_CUSTOMER_SUCCESS':
      return {
        ...state,
        customers: state.customers.map((customer) =>
          customer.id === action.payload.id ? action.payload : customer
        ),
        customer: action.payload,
        error: null,
      };
    case 'UPDATE_CUSTOMER_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'DELETE_CUSTOMER_SUCCESS':
      return {
        ...state,
        customers: state.customers.filter(
          (customer) => customer.id !== action.payload.id
        ),
        customer: null,
        error: null,
      };
    case 'DELETE_CUSTOMER_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default customerReducer;