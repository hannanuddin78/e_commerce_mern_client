import { CART_ITEM, TOTAL_PRICE } from "./types";

export const getCartItems = (item) => async (dispatch) => {
    const items = await item;
    dispatch({
      type: CART_ITEM,
      payload: items,
    });
}

export const getTotalPrice = (price) => async (dispatch) => {
  await price;
  dispatch({
    type: TOTAL_PRICE,
    payload: price,
  });
}