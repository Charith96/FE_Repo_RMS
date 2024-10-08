import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import {
  createCustomerReducer,
  editCustomerReducer,
  deleteCustomerReducer,
  getCustomerByIdReducer,
  getCustomerReducer,
  editCustomerFlagReducer,
} from "./reducers/CustomerReducer";


import {
  fetchRolesReducer,
  createRoleReducer,
  updateRoleReducer,
  deleteRoleReducer,
} from "./reducers/RolesReducer";

import {
  privilegeReducer,
  rolePrivilegeReducer
} from "./reducers/PrivilegeReducer";

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
  timeSlotsReducer,
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
  companiesReducer,
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

import { loginReducer } from "./reducers/LoginReducer";



import { createAdminReducer, getAdminsReducer } from "./reducers/AdminReducer";

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
  companies: companiesReducer,

  //customer
  createCustomer: createCustomerReducer,
  editCustomer: editCustomerReducer,
  deleteCustomer: deleteCustomerReducer,
  getCustomer: getCustomerReducer,
  getCustomerById: getCustomerByIdReducer,
  editCustomerFlag: editCustomerFlagReducer,

  //roles
  fetchRoles: fetchRolesReducer,
  createRole: createRoleReducer,
  updateRole: updateRoleReducer,
  deleteRole: deleteRoleReducer,

  //rolesprivileges
  privileges: privilegeReducer,
  rolePrivileges: rolePrivilegeReducer,

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
  getTimeSlotsReducer: timeSlotsReducer,


  //admin
  createAdmin: createAdminReducer,
  getAdmins: getAdminsReducer,

  //login
  login: loginReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
export const selectCustomer = (state) => state.customerData;
