import { ADD_TOKEN } from "../ActionTypes";

export const reducer3 = (state = { token: [] }, action) => {
  switch (action.type) {
    case ADD_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};
