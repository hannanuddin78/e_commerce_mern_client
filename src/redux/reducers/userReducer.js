import { REF_TOKEN, USER_CHECKS } from "../actions/types";

const initialState = {
  tokens: [],
  user:{isLogged : false, isAdmin : false},
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REF_TOKEN:
      return {
        ...state,
        tokens: payload,
      };
    case USER_CHECKS:
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
};

export default userReducer;
