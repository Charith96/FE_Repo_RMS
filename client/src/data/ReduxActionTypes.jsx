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
  GET_RESERVATION_GROUP_FAIL_BY_ID_GROUP_NAME: "GET_RESERVATION_GROUP_FAIL_BY_ID_GROUP_NAME",

  // delete
  DELETE_RESERVATION_GROUP_START: "DELETE_RESERVATION_GROUP_START",
  DELETE_RESERVATION_GROUP_SUCCESS: "DELETE_RESERVATION_GROUP_SUCCESS",
  DELETE_RESERVATION_GROUP_FAIL: "DELETE_RESERVATION_GROUP_FAIL",

  CHECK_DUPLICATE_RESERVATION_GROUP_ID: "CHECK_DUPLICATE_RESERVATION_GROUP_ID",
  CHECK_DUPLICATE_RESERVATION_GROUP_ID_FAIL: "CHECK_DUPLICATE_RESERVATION_GROUP_ID_FAIL",

  // ------- reservation item ------- //
  // manage
  CREATE_RESERVATION_ITEM_START: "CREATE_RESERVATION_ITEM_START",
  CREATE_RESERVATION_ITEM_SUCCESS: "CREATE_RESERVATION_ITEM_SUCCESS",
  CREATE_RESERVATION_ITEM_FAIL: "CREATE_RESERVATION_ITEM_FAIL",

  // get

  // delete
};

export default ActionTypes;