const ActionTypes = {
   
  // users
  GET_USERS_REQUEST: 'GET_USERS_REQUEST',
  GET_USERS_SUCCESS: 'GET_USERS_SUCCESS',
  GET_USERS_FAIL: 'GET_USERS_FAIL',
  GET_USERS_REQUESTID: 'GET_USERS_REQUESTID',
  GET_USERS_SUCCESSID: 'GET_USERS_SUCCESSID',
  GET_USERS_FAILID: 'GET_USERS_FAILID',
  CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
  CREATE_USER_FAIL:"CREATE_USER_SUCCESS",
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  UPDATE_USER_FAIL: 'UPDATE_USER_FAIL',
  FETCH_USER_SUCCESS: 'FETCH_USER_SUCCESS',
  GET_USERROLES_REQUEST: 'GET_USERROLES_REQUEST',
  GET_USERROLE_SUCCESS: 'GET_USERROLE_SUCCESS',
  GET_USERROLES_FAIL: 'GET_USERROLES_FAIL',
  GET_USERCOMPANY_REQUEST: 'GET_USERCOMPANY_REQUEST',
  GET_USERCOMPANIES_SUCCESS: 'GET_USERCOMPANIES_SUCCESS',
  GET_USERCOMPANY_FAIL: 'GET_USERCOMPANY_FAIL',
  DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
  DELETE_USER_FAIL: 'DELETE_USER_FAIL',

//Customer
FETCH_CUSTOMERS_REQUEST: "FETCH_CUSTOMERS_REQUEST",
FETCH_CUSTOMERS_SUCCESS: "FETCH_CUSTOMERS_SUCCESS",
FETCH_CUSTOMERS_FAILURE: "FETCH_CUSTOMERS_FAILURE",

FETCH_CUSTOMER_REQUEST_BY_ID: "FETCH_CUSTOMER_REQUEST_BY_ID",
FETCH_CUSTOMER_SUCCESS_BY_ID: "FETCH_CUSTOMER_SUCCESS_BY_ID",
FETCH_CUSTOMER_FAILURE_BY_ID: "FETCH_CUSTOMER_FAILURE_BY_ID",
FETCH_CUSTOMER_FAIL_BY_ID_GROUP_NAME: "FETCH_CUSTOMER_FAIL_BY_ID_GROUP_NAME",

FETCH_CUSTOMER_REQUEST: "FETCH_CUSTOMER_REQUEST",
FETCH_CUSTOMER_SUCCESS: "FETCH_CUSTOMER_SUCCESS",
FETCH_CUSTOMER_FAILURE: "FETCH_CUSTOMER_FAILURE",

CREATE_CUSTOMER_REQUEST: "CREATE_CUSTOMER_REQUEST",
CREATE_CUSTOMER_SUCCESS: "CREATE_CUSTOMER_SUCCESS",
CREATE_CUSTOMER_FAILURE: "CREATE_CUSTOMER_FAILURE",

UPDATE_CUSTOMER_REQUEST: "UPDATE_CUSTOMER_REQUEST",
UPDATE_CUSTOMER_SUCCESS: "UPDATE_CUSTOMER_SUCCESS",
UPDATE_CUSTOMER_FAILURE: "UPDATE_CUSTOMER_FAILURE",

UPDATE_CUSTOMER_FLAG: "UPDATE_CUSTOMER_FLAG",
DETAIL_CUSTOMER_FLAG: "DETAIL_CUSTOMER_FLAG",

DELETE_CUSTOMER_REQUEST: "DELETE_CUSTOMER_REQUEST",
DELETE_CUSTOMER_SUCCESS: "DELETE_CUSTOMER_SUCCESS",
DELETE_CUSTOMER_FAILURE: "DELETE_CUSTOMER_FAILURE",

  
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
  GET_Reservation_REQUESTID:"GET_Reservation_REQUESTID",
GET_Reservation_SUCCESSID:"GET_Reservation_SUCCESSID",
GET_Reservation_FAILID:"GET_Reservation_FAILID",
GET_ReservationFAILID:"GET_ReservationFAILID",
UPDATE_ReservationById_SUCCESS:"UPDATE_ReservationById_SUCCESS",
UPDATE_ReservationById_FAIL:"UPDATE_ReservationById_FAIL",



//Reservation
// FETCH_ReservationSUCCESS:"FETCH_ReservationSUCCESS",
// GET_Reservation_REQUESTID:"GET_Reservation_REQUESTID",
// GET_Reservation_SUCCESSID:"GET_Reservation_SUCCESSID",
// GET_Reservation_FAILID:"GET_Reservation_FAILID",
// GET_ReservationFAILID:"GET_ReservationFAILID",
// CREATE_Reservation_SUCCESS:"CREATE_Reservation_SUCCESS",
// CREATE_Reservation_FAIL:"CREATE_Reservation_FAIL",
//   GET_RESERVATIONS_REQUEST: 'GET_RESERVATIONS_REQUEST',
//   GET_RESERVATIONS_SUCCESS: 'GET_RESERVATIONS_SUCCESS',
//   GET_RESERVATIONS_FAIL: 'GET_RESERVATIONS_FAIL',
//   UPDATE_RESERVATION_SUCCESS: 'UPDATE_RESERVATION_SUCCESS',
//   UPDATE_RESERVATION_FAIL: 'UPDATE_RESERVATION_FAIL',
//   DELETE_RESERVATION_SUCCESS: 'DELETE_RESERVATION_SUCCESS',
//   DELETE_RESERVATION_FAIL: 'DELETE_RESERVATION_FAIL',


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
  GET_ReservationByItem_SUCCESSID:"GET_ReservationByItem_SUCCESSID",
  GET_ReservationByItem_FAILID:"GET_ReservationByItem_FAILID",
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

  

  

 
  GET_ITEM_FAILID:" GET_ITEM_FAILID",
  GET_ITEM_SUCCESSID:" GET_ITEM_SUCCESSID",


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

  // ------- ROLE ------- //
 MANAGE_ROLE_START: 'MANAGE_ROLE_START',
 CREATE_ROLE_SUCCESS: 'CREATE_ROLE_SUCCESS',
 CREATE_ROLE_FAIL: 'CREATE_ROLE_FAIL',
 FETCH_ROLES_START: 'FETCH_ROLES_START',
 FETCH_ROLES_SUCCESS: 'FETCH_ROLES_SUCCESS',
 FETCH_ROLES_FAILURE: 'FETCH_ROLES_FAILURE',
 DELETE_ROLE_START: 'DELETE_ROLE_START',
 DELETE_ROLE_SUCCESS: 'DELETE_ROLE_SUCCESS',
 DELETE_ROLE_FAILURE: 'DELETE_ROLE_FAILURE',
 UPDATE_ROLE_START: 'UPDATE_ROLE_START',
 UPDATE_ROLE_SUCCESS: 'UPDATE_ROLE_SUCCESS',
 UPDATE_ROLE_FAILURE: 'UPDATE_ROLE_FAILURE',

  // ------- ADMIN ------- //
  CREATE_ADMIN_START: 'CREATE_ADMIN_START',
  CREATE_ADMIN_SUCCESS: 'CREATE_ADMIN_SUCCESS',
  CREATE_ADMIN_FAIL: 'CREATE_ADMIN_FAIL',
  

};

export default ActionTypes;
