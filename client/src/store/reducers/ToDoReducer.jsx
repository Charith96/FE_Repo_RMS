import ActionTypes from "../../data/ReduxActionTypes";

const initialState = {
  loading: false,
  toDoListInfo: [],
  getToDoInfo: [],
  manageTodoInfo: null,
  deleteTodoInfo: null,
  toDoListError: null,
  manageTodoError: null,
  getToDoError: null,
  deleteToDoError: null,
};

export const manageTodoReducer = (
  state = {
    loading: initialState.loading,
    manageTodoInfo: initialState.manageTodoInfo,
    manageTodoError: initialState.manageTodoError,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.MANAGE_TODO_START:
      return {
        ...state,
        loading: !initialState.loading,
        manageTodoError: initialState.manageTodoError,
      };
    case ActionTypes.CREATE_TODO_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        manageTodoInfo: action.payload,
      };
    case ActionTypes.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        manageTodoInfo: action.payload,
      };
    case ActionTypes.CREATE_TODO_FAIL:
      return {
        ...state,
        loading: initialState.loading,
        manageTodoError: action.payload,
      };
    case ActionTypes.UPDATE_TODO_FAIL:
      return {
        ...state,
        loading: initialState.loading,
        manageTodoError: action.payload,
      };
    case ActionTypes.RESET_MANAGE_TODO:
      return {
        ...state,
        manageTodoInfo: initialState.manageTodoInfo,
        manageTodoError: initialState.manageTodoError,
      };
    default:
      return state;
  }
};

export const getToDoListReducer = (
  state = {
    loading: initialState.loading,
    toDoListInfo: initialState.toDoListInfo,
    toDoListError: initialState.toDoListError,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.TODO_LIST_START:
      return {
        ...state,
        loading: !initialState.loading,
        toDoListError: initialState.toDoListError,
      };
    case ActionTypes.TODO_LIST_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        toDoListInfo: action.payload,
      };
    case ActionTypes.TODO_LIST_FAIL:
      return {
        ...state,
        loading: initialState.loading,
        toDoListError: action.payload,
      };
    case ActionTypes.RESET_TODO_LIST:
      return {
        ...state,
        toDoListInfo: initialState.toDoListInfo,
        toDoListError: initialState.toDoListError,
      };
    default:
      return state;
  }
};
export const getUserByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_USERS_REQUESTID:
      return { ...state, loading: true, error: null };
    case ActionTypes.GET_USERS_SUCCESSID:
      return { ...state, loading: false, users: action.payload, error: null };
    case ActionTypes.GET_USERS_FAILID:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export const getToDoByIdReducer = (
  state = {
    loading: initialState.loading,
    getToDoInfo: initialState.getToDoInfo,
    getToDoError: initialState.getToDoError,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.GET_TODO_START:
      return {
        ...state,
        loading: !initialState.loading,
        getToDoError: initialState.getToDoError,
      };
    case ActionTypes.GET_TODO_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        getToDoInfo: action.payload,
      };
    case ActionTypes.GET_TODO_FAIL:
      return {
        ...state,
        loading: initialState.loading,
        getToDoError: action.payload,
      };
    case ActionTypes.RESET_GET_TODO_INFO:
      return {
        ...state,
        toDoListInfo: initialState.toDoListInfo,
        getToDoError: initialState.getToDoError,
      };
    default:
      return state;
  }
};

export const deleteToDoReducer = (
  state = {
    loading: initialState.loading,
    deleteTodoInfo: initialState.deleteTodoInfo,
    deleteToDoError: initialState.deleteToDoError,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.TODO_DELETE_START:
      return {
        ...state,
        loading: !initialState.loading,
        deleteToDoError: initialState.deleteToDoError,
      };
    case ActionTypes.TODO_DELETE_SUCCESS:
      return {
        ...state,
        loading: initialState.loading,
        deleteTodoInfo: action.payload,
      };
    case ActionTypes.TODO_DELETE_FAIL:
      return {
        ...state,
        loading: initialState.loading,
        deleteToDoError: action.payload,
      };
    case ActionTypes.RESET_TODO_DELETE_INFO:
      return {
        ...state,
        deleteTodoInfo: initialState.deleteTodoInfo,
        deleteToDoError: initialState.deleteToDoError,
      };
    default:
      return state;
  }
};
