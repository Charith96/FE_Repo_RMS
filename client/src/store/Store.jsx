import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import {
  createCustomerReducer,
  editCustomerReducer,
  deleteCustomerReducer,
  getCustomerByIdReducer,
  getCustomerReducer,
  editCustomerFlagReducer
} from "./reducers/CustomerReducer";
import {
  createReservationGroupReducer,
  editReservationGroupReducer,
  deleteReservationGroupReducer,
  getReservationGroupReducer,
  getReservationGroupByIdReducer,
  editReservationGroupFlagReducer,
  checkForDuplicatesReducer,
  fetchReservationItemByGroupReducer,
} from "./reducers/ReservationGroupReducer";

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

import {
  getReservationsReducer,
  createReservationReducer,
  updateReservationReducer,
  getReservationsByIdReducer,
  deleteReservationReducer,
  getReservationsByItemReducer,
} from "./reducers/ReservationReducer";

import {
  getUsersReducer,
  createUserReducer,
  updateUserReducer,
  deleteUserReducer,
  getUserByIdReducer,
} from "./reducers/UserReducers";

import {
  fetchRolesReducer,
  createRoleReducer,
  updateRoleReducer,
  deleteRoleReducer,
} from "./reducers/RolesReducer";

const middleware = [thunk];

const rootReducer = combineReducers({

    //company
    createCompany: createCompanyReducer,
    editCompany: editCompanyReducer,
    deleteCompany: deleteCompanyReducer,
    getCompany: getCompanyReducer,
    getCompanyById: getCompanyByIdReducer,
    editCompanyFlag: editCompanyFlagReducer,
    countries: countriesReducer,
    currencies: currenciesReducer,

  //customer
  createCustomer: createCustomerReducer,
  editCustomer: editCustomerReducer,
  deleteCustomer: deleteCustomerReducer,
  getCustomer: getCustomerReducer,
  getCustomerById: getCustomerByIdReducer,
  editCustomerFlag: editCustomerFlagReducer, 

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
  editReservationItem: editReservationItemReducer,
  getReservationItemById: getReservationItemByIdReducer,
  getReservationItem: getReservationItemReducer,

  //users
  users: getUsersReducer,
  createUser: createUserReducer,
  updateUser: updateUserReducer,
  deleteUser: deleteUserReducer,
  userById: getUserByIdReducer,

  //reservation
  reservations: getReservationsReducer,
  createReservation: createReservationReducer,
  updateReservation: updateReservationReducer,
  reservationByItem: getReservationsByItemReducer,
  reservationById: getReservationsByIdReducer,
  deleteReservation: deleteReservationReducer,

  // time slot
  getTimeSlotsByItem: getTimeSlotsByItemIdReducer,
  deleteTimeSlotsByItem: deleteTimeSlotsByItemIdReducer,
  editTimeSlotsByItem: editTimeSlotsByItemIdReducer,

  //roles
  fetchRoles: fetchRolesReducer,
  createRole: createRoleReducer,
  updateRole: updateRoleReducer,
  deleteRole: deleteRoleReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
export const selectCustomer = (state) => state.customerData;
