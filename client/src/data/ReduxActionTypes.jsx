const ActionTypes = {
  // ------- todos ------- //
  // manage
  MANAGE_TODO_START: "MANAGE_TODO_START",
  CREATE_TODO_SUCCESS: "CREATE_TODO_SUCCESS",
  UPDATE_TODO_SUCCESS: "UPDATE_TODO_SUCCESS",
  CREATE_TODO_FAIL: "CREATE_TODO_FAIL",
  UPDATE_TODO_FAIL: "UPDATE_TODO_FAIL",
  RESET_MANAGE_TODO: "RESET_MANAGE_TODO",

  // get
  TODO_LIST_START: "TODO_LIST_START",
  TODO_LIST_SUCCESS: "TODO_LIST_SUCCESS",
  TODO_LIST_FAIL: "TODO_LIST_FAIL",
  RESET_TODO_LIST: "RESET_TODO_LIST",

  GET_TODO_START: "GET_TODO_START",
  GET_TODO_SUCCESS: "GET_TODO_SUCCESS",
  GET_TODO_FAIL: "GET_TODO_FAIL",
  RESET_GET_TODO_INFO: "RESET_GET_TODO_INFO",

  // delete
  TODO_DELETE_START: "TODO_DELETE_START",
  TODO_DELETE_SUCCESS: "TODO_DELETE_SUCCESS",
  TODO_DELETE_FAIL: "TODO_DELETE_FAIL",
  RESET_TODO_DELETE_INFO: "RESET_TODO_DELETE_INFO",

  // ------- reservation group ------- //
  // manage
  CREATE_RESERVATION_GROUP_START: "CREATE_RESERVATION_GROUP_START",
  CREATE_RESERVATION_GROUP_SUCCESS: "CREATE_RESERVATION_GROUP_SUCCESS",
  CREATE_RESERVATION_GROUP_FAIL: "CREATE_RESERVATION_GROUP_FAIL",
  EDIT_RESERVATION_GROUP_START: "EDIT_RESERVATION_GROUP_START",
  EDIT_RESERVATION_GROUP_SUCCESS: "EDIT_RESERVATION_GROUP_SUCCESS",
  EDIT_RESERVATION_GROUP_FAIL: "EDIT_RESERVATION_GROUP_FAIL",

  EDIT_RESERVATION_GROUP_FLAG: "EDIT_RESERVATION_GROUP_FLAG",
  DETAIL_RESERVATION_GROUP_FLAG: "DETAIL_RESERVATION_GROUP_FLAG",

  // get
  GET_RESERVATION_GROUP_START: "GET_RESERVATION_GROUP_START",
  GET_RESERVATION_GROUP_SUCCESS: "GET_RESERVATION_GROUP_SUCCESS",
  GET_RESERVATION_GROUP_FAIL: "GET_RESERVATION_GROUP_FAIL",

  GET_RESERVATION_GROUP_START_BY_ID: "GET_RESERVATION_GROUP_START_BY_ID",
  GET_RESERVATION_GROUP_SUCCESS_BY_ID: "GET_RESERVATION_GROUP_SUCCESS_BY_ID",
  GET_RESERVATION_GROUP_FAIL_BY_ID: "GET_RESERVATION_GROUP_FAIL_BY_ID",
  GET_RESERVATION_GROUP_FAIL_BY_ID_GROUP_NAME:
    "GET_RESERVATION_GROUP_FAIL_BY_ID_GROUP_NAME",

  // delete
  DELETE_RESERVATION_GROUP_START: "DELETE_RESERVATION_GROUP_START",
  DELETE_RESERVATION_GROUP_SUCCESS: "DELETE_RESERVATION_GROUP_SUCCESS",
  DELETE_RESERVATION_GROUP_FAIL: "DELETE_RESERVATION_GROUP_FAIL",

  CHECK_DUPLICATE_RESERVATION_GROUP_ID: "CHECK_DUPLICATE_RESERVATION_GROUP_ID",
  CHECK_DUPLICATE_RESERVATION_GROUP_ID_FAIL:
    "CHECK_DUPLICATE_RESERVATION_GROUP_ID_FAIL",

  // check
  CHECK_FOR_RESERVATION_ITEM_BY_GROUP_ID:
    "CHECK_FOR_RESERVATION_ITEM_BY_GROUP_ID",
  CHECK_FOR_RESERVATION_ITEM_BY_GROUP_ID_FAILURE:
    "CHECK_FOR_RESERVATION_ITEM_BY_GROUP_ID_FAILURE",

  // ------- reservation item ------- //
  // manage
  CREATE_RESERVATION_ITEM_START: "CREATE_RESERVATION_ITEM_START",
  CREATE_RESERVATION_ITEM_SUCCESS: "CREATE_RESERVATION_ITEM_SUCCESS",
  CREATE_RESERVATION_ITEM_FAIL: "CREATE_RESERVATION_ITEM_FAIL",
  EDIT_RESERVATION_ITEM_START: "EDIT_RESERVATION_ITEM_START",
  EDIT_RESERVATION_ITEM_SUCCESS: "EDIT_RESERVATION_ITEM_SUCCESS",
  EDIT_RESERVATION_ITEM_FAIL: "EDIT_RESERVATION_ITEM_FAIL",
  GET_ITEM_FAILID:" GET_ITEM_FAILID",
  GET_ITEM_SUCCESSID:" GET_ITEM_SUCCESSID",


  //Reservation
  GET_RESERVATIONS_REQUEST: 'GET_RESERVATIONS_REQUEST',
  GET_RESERVATIONS_SUCCESS: 'GET_RESERVATIONS_SUCCESS',
  GET_RESERVATIONS_FAIL: 'GET_RESERVATIONS_FAIL',
  CREATE_RESERVATION_SUCCESS: 'CREATE_RESERVATION_SUCCESS',
  CREATE_RESERVATION_FAIL: 'CREATE_RESERVATION_FAIL',
  UPDATE_RESERVATION_SUCCESS: 'UPDATE_RESERVATION_SUCCESS',
  UPDATE_RESERVATION_FAIL: 'UPDATE_RESERVATION_FAIL',
  DELETE_RESERVATION_SUCCESS: 'DELETE_RESERVATION_SUCCESS',
  DELETE_RESERVATION_FAIL: 'DELETE_RESERVATION_FAIL',


// ------- reservation item ------- //
  // manage
 
  EDIT_RESERVATION_ITEM_START: "EDIT_RESERVATION_ITEM_START",
  EDIT_RESERVATION_ITEM_SUCCESS: "EDIT_RESERVATION_ITEM_SUCCESS",
  EDIT_RESERVATION_ITEM_FAIL: "EDIT_RESERVATION_ITEM_FAIL",
  GET_ReservationByItem_SUCCESSID:"GET_ReservationByItem_SUCCESSID",
  GET_ReservationByItem_FAILID:"GET_ReservationByItem_FAILID",
  // get
  GET_RESERVATION_ITEM_START: "GET_RESERVATION_ITEM_START",
  GET_RESERVATION_ITEM_SUCCESS: "GET_RESERVATION_ITEM_SUCCESS",
  GET_RESERVATION_ITEM_FAIL: "GET_RESERVATION_ITEM_FAIL",

  GET_RESERVATION_ITEM_START_BY_ID: "GET_RESERVATION_ITEM_START_BY_ID",
  GET_RESERVATION_ITEM_SUCCESS_BY_ID: "GET_RESERVATION_ITEM_SUCCESS_BY_ID",
  GET_RESERVATION_ITEM_FAIL_BY_ID: "GET_RESERVATION_ITEM_FAIL_BY_ID",
  GET_RESERVATION_ITEM_FAIL_BY_ID_ITEM_NAME:
    "GET_RESERVATION_ITEM_FAIL_BY_ID_ITEM_NAME",
  // delete
  DELETE_RESERVATION_ITEM_START: "DELETE_RESERVATION_ITEM_START",
  DELETE_RESERVATION_ITEM_SUCCESS: "DELETE_RESERVATION_ITEM_SUCCESS",
  DELETE_RESERVATION_ITEM_FAIL: "DELETE_RESERVATION_ITEM_FAIL",

  // ------- item slots ------- //
  CREATE_TIME_SLOT_START: "CREATE_TIME_SLOT_START",
  CREATE_TIME_SLOT_SUCCESS: "CREATE_TIME_SLOT_SUCCESS",
  CREATE_TIME_SLOT_FAIL: "CREATE_TIME_SLOT_FAIL",

  //GET
  GET_TIME_SLOTS_BY_ITEM_ID_START: "GET_TIME_SLOTS_BY_ITEM_ID_START",
  GET_TIME_SLOTS_BY_ITEM_ID_SUCCESS: "GET_TIME_SLOTS_BY_ITEM_ID_SUCCESS",
  GET_TIME_SLOTS_BY_ITEM_ID_FAIL: "GET_TIME_SLOTS_BY_ITEM_ID_FAIL",

  //DELETE
  DELETE_TIME_SLOTS_BY_ITEM_ID_START: "DELETE_TIME_SLOTS_BY_ITEM_ID_START",
  DELETE_TIME_SLOTS_BY_ITEM_ID_SUCCESS: "DELETE_TIME_SLOTS_BY_ITEM_ID_SUCCESS",
  DELETE_TIME_SLOTS_BY_ITEM_ID_FAIL: "DELETE_TIME_SLOTS_BY_ITEM_ID_FAIL",

  //EDIT
  EDIT_TIME_SLOTS_BY_ITEM_ID_START: "EDIT_TIME_SLOTS_BY_ITEM_ID_START",
  EDIT_TIME_SLOTS_BY_ITEM_ID_SUCCESS: "EDIT_TIME_SLOTS_BY_ITEM_ID_SUCCESS",
  EDIT_TIME_SLOTS_BY_ITEM_ID_FAIL: "EDIT_TIME_SLOTS_BY_ITEM_ID_FAIL",

};

export default ActionTypes;
