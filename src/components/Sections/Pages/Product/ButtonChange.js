import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../../../redux/actions/CartAction";
import axios from "axios";

const ButtonChange = ({ pt }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.UserInfo.user);
  const { isLogged, isAdmin } = userInfo;
  const Cart = useSelector((state) => state.CartInfo.Cart);
  const token = useSelector((state) => state.UserInfo.tokens.token);
  // console.log(Cart);
  const addCart = (pt) => {
    if (!isLogged) {
      alert("Please login continue to buying");
    }
    const check = Cart.every((item) => {
      return item._id !== pt._id;
    });
    if (check) {
      dispatch(getCartItems([...Cart, { ...pt, quantity: 1 }]));
      axios.patch(
        "/user/addCart",
        { cart: [...Cart, { ...pt, quantity: 1 }] },
        {
          headers: { Authorization: token },
        }
      );
    } else {
      alert("This product already been added");
    }
  };
  return (
    <>
      {isAdmin ? (
        <Row>
          <Col md={6}>
            <Link to="#!" style={{ color: "white" }}>
              <Button variant="dark" style={{ width: "100%" }}>
                Delete
              </Button>
            </Link>
          </Col>
          <Col md={6}>
            <Link to={`/edit_product/${pt._id}`} style={{ color: "white" }}>
              <Button variant="info" style={{ width: "100%" }}>
                Edit
              </Button>
            </Link>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col md={6}>
            <Link to="#!" style={{ color: "white" }}>
              <Button
                variant="dark"
                style={{ width: "100%" }}
                onClick={() => addCart(pt)}
              >
                Buy
              </Button>
            </Link>
          </Col>
          <Col md={6}>
            <Link to={`/details/${pt._id}`} style={{ color: "white" }}>
              <Button variant="info" style={{ width: "100%" }}>
                View
              </Button>
            </Link>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ButtonChange;
