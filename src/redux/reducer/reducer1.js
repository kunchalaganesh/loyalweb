import { ADMIN_LOGGED_IN } from "../ActionTypes";
import { ADMIN_LOGGED_OUT } from "../ActionTypes";

export const reducer1 = (state = [], action) => {
  switch (action.type) {
    case ADMIN_LOGGED_IN: {
      return action.payload;
    }
    // case ADMIN_LOGGED_OUT: {
    //   const newArray = state.filter((index) => {
    //     return index !== action.payload;
    //   });
    //   return newArray;
    // }
    case ADMIN_LOGGED_OUT: {
      return {}; // Reset state to an empty array
    }

    default:
      return state;
  }
};
