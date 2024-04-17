import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
//import thunk from "redux-thunk";
import { thunk } from "redux-thunk";

import {
  createCompanyReducer,
  editCompanyReducer,
  deleteCompanyReducer,
  getCompanyReducer,
  getCompanyByIdReducer,
  editCompanyFlagReducer,
  countriesReducer,
  currenciesReducer,
} from "./reducers/CompanyReducer";

import {
  manageTodoReducer,
  getToDoListReducer,
  getToDoByIdReducer,
  deleteToDoReducer,
} from "./reducers/ToDoReducer";

const middleware = [thunk];

const rootReducer = combineReducers({
  createCompany: createCompanyReducer,
  editCompany: editCompanyReducer,
  deleteCompany: deleteCompanyReducer,
  getCompany: getCompanyReducer,
  getCompanyById: getCompanyByIdReducer,
  editCompanyFlag: editCompanyFlagReducer,
  countries: countriesReducer,
  currencies: currenciesReducer,

  // todos
  manageTodo: manageTodoReducer,
  getToDoList: getToDoListReducer,
  getToInfoDoById: getToDoByIdReducer,
  deleteToDoInfo: deleteToDoReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
