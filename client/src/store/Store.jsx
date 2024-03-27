import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import {
  // createReservationGroupReducer,
  // editReservationGroupReducer,
  // deleteReservationGroupReducer,
  // getReservationGroupReducer,
  // getReservationGroupByIdReducer,
  // editReservationGroupFlagReducer,
  // checkForDuplicatesReducer,

  createCompanyReducer,
  editCompanyReducer,
  deleteCompanyReducer,
  getCompanyReducer,
  getCompanyByIdReducer,
  editCompanyFlagReducer

} from "./reducers/Reducer";

import {
  manageTodoReducer,
  getToDoListReducer,
  getToDoByIdReducer,
  deleteToDoReducer,
} from "./reducers/ToDoReducer";

const middleware = [thunk];

const rootReducer = combineReducers({
  // reservation group
  // createReservationGroup: createReservationGroupReducer,
  // editReservationGroup: editReservationGroupReducer,
  // deleteReservationGroup: deleteReservationGroupReducer,
  // getReservationGroup: getReservationGroupReducer,
  // getReservationGroupById: getReservationGroupByIdReducer,
  // editReservationGroupFlag: editReservationGroupFlagReducer,
  // checkForDuplicates: checkForDuplicatesReducer,

  createCompany : createCompanyReducer,
  editCompany : editCompanyReducer,
  deleteCompany : deleteCompanyReducer,
  getCompany : getCompanyReducer,
  getCompanyById : getCompanyByIdReducer,
  editCompanyFlag : editCompanyFlagReducer,

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
