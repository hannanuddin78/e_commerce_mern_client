import { ALL_PRODUCTS } from "../actions/types";

const initialState = {
    products: [],
}

const productsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case ALL_PRODUCTS:
        return{
            ...state,
            products: payload
        };
      default:
        return state;
    }
};

export default productsReducer;