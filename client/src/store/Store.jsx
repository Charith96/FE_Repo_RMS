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
  getReservationItemReducer,
} from "./reducers/ReservationItemReducer";

import {
  reservationReducer,
} from "./reducers/ReseservationReducer";


import  {
  manageTodoReducer,
  getToDoListReducer,
  getToDoByIdReducer,
  deleteToDoReducer,
} from "./reducers/ToDoReducer";


import {
  userReducer,
} from  "./reducers/UserReducers";

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

  // reservation item
  createReservationItem: createReservationItemReducer,
  createTimeSlot: createTimeSlotReducer,
  editReservationItem:editReservationItemReducer,
  getReservationItemById: getReservationItemByIdReducer,
  getReservationItem: getReservationItemReducer,
  deleteReservationItem: deleteReservationItemReducer,
 
  // todos
  manageTodo: manageTodoReducer,
  getToDoList: getToDoListReducer,
  getToInfoDoById: getToDoByIdReducer,
  deleteToDoInfo: deleteToDoReducer,

  //users
  user:userReducer,

  //reservation
  reservation:reservationReducer,

    // time slot
    getTimeSlotsByItem:getTimeSlotsByItemIdReducer,
    deleteTimeSlotsByItem:deleteTimeSlotsByItemIdReducer,
    editTimeSlotsByItem:editTimeSlotsByItemIdReducer
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
export const selectUserData = (state) => state.user;