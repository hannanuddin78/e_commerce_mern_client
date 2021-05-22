import axios from 'axios';
import { ALL_PRODUCTS } from './types';

export const getAllProducts = () => async (dispatch) => {
    const products = await axios.get("/api/product");
    dispatch({
      type: ALL_PRODUCTS,
      payload: products.data.products,
    });
}