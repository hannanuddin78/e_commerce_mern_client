import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { getAllProducts } from "./redux/actions/ProductsAction";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import Sections from "./components/Sections/Sections";
import { getRefreshToken, userCheckInfo } from "./redux/actions/UserAction";
import axios from "axios";
import { getCartItems } from "./redux/actions/CartAction";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.UserInfo.tokens.token);
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    dispatch(getAllProducts());
    if (firstLogin) {
      dispatch(getRefreshToken());
    }
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/information", {
            headers: { Authorization: token },
          });
          await dispatch(
            userCheckInfo({
              isLogged: true,
              isAdmin: res.data.role === 1 ? true : false,
            })
          );
          await dispatch(getCartItems(res.data.cart));
        } catch (error) {
          alert(error.response.data.msg);
        }
      };
      getUser();
    }
  }, [token, dispatch]);
  return (
    <Router>
      <Header />
      <Sections />
    </Router>
  );
}

export default App;
