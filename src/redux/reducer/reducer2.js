import { FETCH_ALL_PRODUCTS } from "../ActionTypes";

export const reducer2 = (state = { products: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};
