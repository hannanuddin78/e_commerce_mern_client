import React from "react";
import "./Header.css";
import menu from "./icon/bars-solid.svg";
import times from "./icon/times-solid.svg";
import cart from "./icon/shopping-cart-solid.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { userCheckInfo } from "../../redux/actions/UserAction";

const Header = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.UserInfo.user);
  const { isLogged, isAdmin } = userInfo;
  const Cart = useSelector((state) => state.CartInfo.Cart);
  const logOut = async () => {
    await axios.get('user/logOut')
    localStorage.clear()
    await dispatch(
      userCheckInfo({
        isLogged: false,
        isAdmin: false,
      })
    );
    window.location.href = "/";
  }; 
  return (
    <div className="app header">
      <div className="menu">
        <img src={menu} alt="" width="30" />
      </div>
      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? "Admin" : "My Shop"}</Link>
        </h1>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">{isAdmin ? "Product" : "Shop"}</Link>
          </li>
          {isAdmin && (
            <>
              <li>
                <Link to="/create_product">Create Produce</Link>
              </li>
              <li>
                <Link to="/category">Catagories</Link>
              </li>
            </>
          )}
          {isLogged ? (
            <>
              <li>
                <Link to="/history">History</Link>
              </li>
              <li>
                <Link to="/" onClick={logOut}>
                  Log Out
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login / Register</Link>
            </li>
          )}
          <li>
            <img src={times} alt="" width="30" />
          </li>
        </ul>
      </nav>
      {isAdmin ? (
        ""
      ) : (
        <div className="cart_icon">
          <Link to="/cart">
            <span>{Cart.length}</span>
            <img src={cart} alt="" width="30" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
