import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // Import Redux Thunk middleware
import { reducer1 } from "../reducer/reducer1";
import { reducer2 } from "../reducer/reducer2";
import { reducer3 } from "../reducer/reducer3";
const combo = combineReducers({
  reducer1,
  reducer2,
  reducer3,
});

// Apply Redux Thunk middleware when creating the store
export const myStore = createStore(combo, applyMiddleware(thunk));
