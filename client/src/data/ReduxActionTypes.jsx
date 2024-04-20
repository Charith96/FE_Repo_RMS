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

  

  //NEW
  CREATE_COMPANY_START: "CREATE_COMPANY_START",
  CREATE_COMPANY_SUCCESS: "CREATE_COMPANY_SUCCESS",
  CREATE_COMPANY_FAIL: "CREATE_COMPANY_FAIL",
  EDIT_COMPANY_START: "EDIT_COMPANY_START",
  EDIT_COMPANY_SUCCESS: "EDIT_COMPANY_SUCCESS",
  EDIT_COMPANY_FAIL: "EDIT_COMPANY_FAIL",

  EDIT_COMPANY_FLAG: "EDIT_COMPANY_FLAG",
  DETAIL_COMPANY_FLAG: "DETAIL_COMPANY_FLAG",

  GET_COMPANY_START: "GET_COMPANY_START",
  GET_COMPANY_SUCCESS: "GET_COMPANY_SUCCESS",
  GET_COMPANY_FAIL: "GET_COMPANY_FAIL",

  GET_COMPANY_START_BY_ID: "GET_COMPANY_START_BY_ID",
  GET_COMPANY_SUCCESS_BY_ID: "GET_COMPANY_SUCCESS_BY_ID",
  GET_COMPANY_FAIL_BY_ID: "GET_COMPANY_FAIL_BY_ID",
  GET_COMPANY_FAIL_BY_ID_GROUP_NAME: "GET_COMPANY_FAIL_BY_ID_GROUP_NAME",

  DELETE_COMPANY_START: "DELETE_COMPANY_START",
  DELETE_COMPANY_SUCCESS: "DELETE_COMPANY_SUCCESS",
  DELETE_COMPANY_FAIL: "DELETE_COMPANY_FAIL",

  //----------------COUNTRY--------------//
  FETCH_COUNTRIES_START : "FETCH_COUNTRIES_START",
  FETCH_COUNTRIES_SUCCESS : "FETCH_COUNTRIES_SUCCESS",
  FETCH_COUNTRIES_FAIL : "FETCH_COUNTRIES_FAIL",

  //----------------CURRENCY-------------//
  FETCH_CURRENCIES_START: "FETCH_CURRENCIES_START",
  FETCH_CURRENCIES_SUCCESS: "FETCH_CURRENCIES_SUCCESS",
  FETCH_CURRENCIES_FAIL: "FETCH_CURRENCIES_FAIL",

  //NEW

};

export default ActionTypes;