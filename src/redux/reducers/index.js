import {combineReducers} from "redux";
import CartReducer from "./CartReducer";
import productsReducer from "./productsReducer";
import userReducer from "./userReducer";

export default combineReducers({
  AllProducts: productsReducer,
  UserInfo: userReducer,
  CartInfo: CartReducer,
});