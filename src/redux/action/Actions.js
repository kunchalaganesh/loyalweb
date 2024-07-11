import {
  ADMIN_LOGGED_IN,
  ADMIN_LOGGED_OUT,
  FETCH_ALL_PRODUCTS,
  ADD_TOKEN,
} from "../ActionTypes";

export const adminLoggedIn = (index) => ({
  type: ADMIN_LOGGED_IN,
  payload: index,
});
export const adminLoggedOut = (index) => ({
  type: ADMIN_LOGGED_OUT,
  payload: index,
});
export const fetchAllProducts = (data) => ({
  type: FETCH_ALL_PRODUCTS,
  payload: data,
});
export const addToken = (data) => ({
  type: ADD_TOKEN,
  payload: data,
});
