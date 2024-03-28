import axios from "axios";
import { COMPANY_DETAILS, COUNTRY_URL, CURRENCY_URL } from "../../utils/Constants.jsx";
import ActionTypes from "../../data/ReduxActionTypes.jsx";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const createCompany = (data) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.CREATE_COMPANY_START });

    const response = await axios.post(`${BASE_URL}${COMPANY_DETAILS}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      dispatch({
        type: ActionTypes.CREATE_COMPANY_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.CREATE_COMPANY_FAIL,
      payload: error.message,
    });
  }
};

export const editCompany = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.EDIT_COMPANY_START });
    const url = `${BASE_URL}${COMPANY_DETAILS}/${id}`;

    const response = await axios.put(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.EDIT_COMPANY_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({ type: ActionTypes.EDIT_COMPANY_FAIL, payload: error });
  }
};

export const deleteCompany = (id) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.DELETE_COMPANY_START });
    const response = await axios.delete(
      `${BASE_URL}${COMPANY_DETAILS}/${id}`
    );
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.DELETE_COMPANY_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.DELETE_COMPANY_FAIL,
      payload: error,
    });
  }
};

export const fetchCompanies = () => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.GET_COMPANY_START });
    const response = await axios.get(`${BASE_URL}${COMPANY_DETAILS}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.GET_COMPANY_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.GET_COMPANY_FAIL,
      payload: error.message,
    });
  }
};

export const fetchCompaniesById = (id) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.GET_COMPANY_START_BY_ID});
    const response = await axios.get(`${BASE_URL}${COMPANY_DETAILS}/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.GET_COMPANY_SUCCESS_BY_ID,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.GET_COMPANY_FAIL_BY_ID,
      payload: error.message,
    });
  }
};

export const resetCompanyState = (data) => (dispatch) => {
  dispatch({
    type: ActionTypes.GET_COMPANY_SUCCESS,
    payload: data || [],
  });
  dispatch({ type: ActionTypes.GET_COMPANY_FAIL, payload: null });
};

export const resetManageCompanyState = () => (dispatch) => {
  dispatch({
    type: ActionTypes.CREATE_COMPANY_SUCCESS,
    payload: null,
  });
  dispatch({ type: ActionTypes.GET_COMPANY_FAIL, payload: null });
};

//new

// Action.jsx



// export const fetchCountries = () => async (dispatch) => {
//   try {
//    // dispatch({ type: ActionTypes.FETCH_COUNTRIES_START });
//     const response = await axios.get(`${BASE_URL}${COUNTRY_URL}`, {
//       headers: { "Content-Type": "application/json" },
//     });
//     dispatch({
//       type: ActionTypes.FETCH_COUNTRIES_SUCCESS,
//       payload: response.data.countries, // Assuming your JSON structure has a 'countries' array
//     });
//   } catch (error) {
//     dispatch({
//       type: ActionTypes.FETCH_COUNTRIES_FAIL,
//       payload: error.message,
//     });
//   }
// };

// export const fetchCountriesSuccess = (countries) => ({
//   type: ActionTypes.FETCH_COUNTRIES_SUCCESS,
//   payload: countries,
// });

// export const fetchFailure = (error) => ({
//   type: ActionTypes.FETCH_COUNTRIES_FAIL,
//   payload: error,
// });

// export const fetchCountries = () => {
//   return function (dispatch) {
//     axios
//       .get(`${BASE_URL}${COUNTRY_URL}`)
//       .then((response) => {
//         dispatch(fetchCountriesSuccess(response.data));
//       })
//       .catch((error) => {dispatch(fetchFailure(error));
//       });
//   };
// };




// export const fetchCurrencies = () => async (dispatch) => {
//   try {
//   dispatch({type: ActionTypes.FETCH_CURRENCIES_START});
//   const response = await axios.get(`${BASE_URL}${CURRENCY_URL}`, {
//     headers: { "Content-Type": "application/json" },
//   });
//   if (response.status === 200) {
//     dispatch({
//       type: ActionTypes.FETCH_CURRENCIES_SUCCESS,
//       payload: response.data,
//     });
//   }
// }  catch (error) {
//   dispatch({
//     type: ActionTypes.FETCH_CURRENCIES_FAIL,
//     payload: error.message,
//   });
// }
// };

// export const fetchCountries = () => async (dispatch) => {
//   try {
//     dispatch({ type: ActionTypes.FETCH_COUNTRIES_START });
//     const response = await axios.get(`${BASE_URL}${COUNTRY_URL}`, {
//       headers: { "Content-Type": "application/json" },
//     });
//     dispatch({
//       type: ActionTypes.FETCH_COUNTRIES_SUCCESS,
//       payload: response.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: ActionTypes.FETCH_COUNTRIES_FAIL,
//       payload: error.message,
//     });
//   }
// };

// export const fetchCurrencies = () => async (dispatch) => {
//   try {
//     dispatch({ type: ActionTypes.FETCH_CURRENCIES_START });
//     const response = await axios.get(`${BASE_URL}${CURRENCY_URL}`, {
//       headers: { "Content-Type": "application/json" },
//     });
//     dispatch({
//       type: ActionTypes.FETCH_CURRENCIES_SUCCESS,
//       payload: response.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: ActionTypes.FETCH_CURRENCIES_FAIL,
//       payload: error.message,
//     });
//   }
// };

export const fetchCountries = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_COUNTRIES_START });
    try {
      const response = await fetch('http://localhost:3005/countries'); // Assuming db.json is served at this URL
      const data = await response.json();
      dispatch({ type: ActionTypes.FETCH_COUNTRIES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ActionTypes.FETCH_COUNTRIES_FAIL, error: error.message });
    }
  };
};

export const fetchCurrencies = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_CURRENCIES_START });
    try {
      const response = await fetch('http://localhost:3005/currencies'); // Assuming db.json is served at this URL
      const data = await response.json();
      dispatch({ type: ActionTypes.FETCH_CURRENCIES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ActionTypes.FETCH_CURRENCIES_FAIL, error: error.message });
    }
  };
};
