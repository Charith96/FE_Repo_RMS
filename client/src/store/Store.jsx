import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
//import thunk from "redux-thunk";
import { thunk } from "redux-thunk";
import customerReducer from "./reducers/customerReducers";
import {
  createReservationGroupReducer,
  editReservationGroupReducer,
  deleteReservationGroupReducer,
  getReservationGroupReducer,
  getReservationGroupByIdReducer,
  editReservationGroupFlagReducer,
  checkForDuplicatesReducer,
  fetchReservationItemByGroupReducer
} from "./reducers/ReservationGroupReducer";
//import {
//createReservationItemReducer,
// createTimeSlotReducer,
//} from "./reducers/ReservationItemReducer";

import {
  createReservationItemReducer,
  createTimeSlotReducer,
  editReservationItemReducer,
  deleteReservationItemReducer,
  getReservationItemByIdReducer,
  getTimeSlotsByItemIdReducer,
  deleteTimeSlotsByItemIdReducer,
  editTimeSlotsByItemIdReducer,
  getReservationItemReducer,
} from "./reducers/ReservationItemReducer";

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

import { reservationReducer } from "./reducers/ReservationReducer";

import {
  manageTodoReducer,
  getToDoListReducer,
  getToDoByIdReducer,
  deleteToDoReducer,
} from "./reducers/ToDoReducer";
import { userReducer } from "./reducers/UserReducers";

import rolesReducer from "./reducers/RolesReducer";

const middleware = [thunk];

const rootReducer = combineReducers({
  //customer
  customerReducer,

  // reservation group
  createReservationGroup: createReservationGroupReducer,
  editReservationGroup: editReservationGroupReducer,
  deleteReservationGroup: deleteReservationGroupReducer,
  getReservationGroup: getReservationGroupReducer,
  getReservationGroupById: getReservationGroupByIdReducer,
  editReservationGroupFlag: editReservationGroupFlagReducer,
  checkForDuplicates: checkForDuplicatesReducer,
  deleteReservationItem: deleteReservationItemReducer,
  fetchReservationItemByGroup: fetchReservationItemByGroupReducer,
  // reservation item
  createReservationItem: createReservationItemReducer,
  createTimeSlot: createTimeSlotReducer,
  editReservationItem:editReservationItemReducer,
  getReservationItemById: getReservationItemByIdReducer,
  getReservationItem: getReservationItemReducer,
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


 //users
  user: userReducer,

  //reservation
  reservation: reservationReducer,


  // time slot
  getTimeSlotsByItem: getTimeSlotsByItemIdReducer,
  deleteTimeSlotsByItem: deleteTimeSlotsByItemIdReducer,
  editTimeSlotsByItem: editTimeSlotsByItemIdReducer,
    //roles
    roles: rolesReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
export const selectCustomer = (state) => state.customerData;
export const selectUserData = (state) => state.user;
