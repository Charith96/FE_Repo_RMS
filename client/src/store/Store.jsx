import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import {
  createReservationGroupReducer,
  editReservationGroupReducer,
  deleteReservationGroupReducer,
  getReservationGroupReducer,
  getReservationGroupByIdReducer,
  editReservationGroupFlagReducer,
  checkForDuplicatesReducer,
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
} from "./reducers/ReservationItemReducer";

import {
  manageTodoReducer,
  getToDoListReducer,
  getToDoByIdReducer,
  deleteToDoReducer,
} from "./reducers/ToDoReducer";

const middleware = [thunk];

const rootReducer = combineReducers({
  // reservation group
  createReservationGroup: createReservationGroupReducer,
  editReservationGroup: editReservationGroupReducer,
  deleteReservationGroup: deleteReservationGroupReducer,
  getReservationGroup: getReservationGroupReducer,
  getReservationGroupById: getReservationGroupByIdReducer,
  editReservationGroupFlag: editReservationGroupFlagReducer,
  checkForDuplicates: checkForDuplicatesReducer,
  deleteReservationItem: deleteReservationItemReducer,
  // reservation item
  createReservationItem: createReservationItemReducer,
  createTimeSlot: createTimeSlotReducer,
  editReservationItem:editReservationItemReducer,
  getReservationItemById: getReservationItemByIdReducer,
  // todos
  manageTodo: manageTodoReducer,
  getToDoList: getToDoListReducer,
  getToInfoDoById: getToDoByIdReducer,
  deleteToDoInfo: deleteToDoReducer,
  // time slot
  getTimeSlotsByItem:getTimeSlotsByItemIdReducer,
  deleteTimeSlotsByItem:deleteTimeSlotsByItemIdReducer,
  editTimeSlotsByItem:editTimeSlotsByItemIdReducer
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
