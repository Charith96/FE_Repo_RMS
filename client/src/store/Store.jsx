import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
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

import { reservationReducer } from "./reducers/ReservationReducer";

import {
  manageTodoReducer,
  getToDoListReducer,
  getToDoByIdReducer,
  deleteToDoReducer,
} from "./reducers/ToDoReducer";

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

  // reservation item
  createReservationItem: createReservationItemReducer,
  createTimeSlot: createTimeSlotReducer,

  // todos
  manageTodo: manageTodoReducer,
  getToDoList: getToDoListReducer,
  getToInfoDoById: getToDoByIdReducer,
  deleteToDoInfo: deleteToDoReducer,

  //reservation
  reservation: reservationReducer,

  // time slot
  getTimeSlotsByItem: getTimeSlotsByItemIdReducer,
  deleteTimeSlotsByItem: deleteTimeSlotsByItemIdReducer,
  editTimeSlotsByItem: editTimeSlotsByItemIdReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
export const selectCustomer = (state) => state.customerData;
