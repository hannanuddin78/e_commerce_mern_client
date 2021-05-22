import axios from "axios";
import { USER_CHECKS, REF_TOKEN } from "./types";


export const getRefreshToken = () => async (dispatch) => {
  const tokenGet = await axios.get("/user/refresh_token");
  const token = {token :tokenGet.data.accessToken};
  dispatch({
    type: REF_TOKEN,
    payload: token,
  });
};

export const userCheckInfo = (user) => async (dispatch) => {
  const getUser = await user;
  dispatch({
    type: USER_CHECKS,
    payload: getUser,
  });
};
