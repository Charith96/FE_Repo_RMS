//import types from "../actions/types"

const initialState = {
  customers: [],
  customer:{},
  customer: null,
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CUSTOMERS_SUCCESS':
      return {
        ...state,
        customers: action.payload,
      };
    case 'FETCH_CUSTOMER_SUCCESS':
      return {
        ...state,
        customer: action.payload,
      };
    case 'CREATE_CUSTOMER_SUCCESS':
      return {
        ...state,
        customers: [...state.customers, action.payload],
      };
      case 'UPDATE_CUSTOMER_SUCCESS':
        return {
          ...state,
          customers: state.customers.map(customer =>
            customer.id === action.payload.id ? action.payload : customer
          ),
          customer: action.payload,
        };
      case 'DELETE_CUSTOMER_SUCCESS':
        return {
          ...state,
          customers: state.customers.filter(customer => customer.id !== action.payload.id),
          customer: null,
        };
      default:
        return state;
    }
  };
  
  
export default customerReducer;
