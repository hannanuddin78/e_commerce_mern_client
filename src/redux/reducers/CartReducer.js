const initialState = {
  Cart: [],
  totalPrice: 0,
};

const CartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "CART_ITEM":
      return {
          ...state,
          Cart : payload
      };
    case "TOTAL_PRICE":
      return {
        ...state,
        totalPrice: payload
      }
    default:
      return state;
  }
};

export default CartReducer;
