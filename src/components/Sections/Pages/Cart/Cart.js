import axios from "axios";
import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartItems, getTotalPrice } from "../../../../redux/actions/CartAction";

const Cart = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.UserInfo.tokens.token);
  const Cart = useSelector((state) => state.CartInfo.Cart);
  const total = useSelector((state) => state.CartInfo.totalPrice);

  useEffect(() => {
    const getTotal = async () => {
      const price = Cart.reduce((prv, item) => {
        return prv + item.price * item.quantity;
      }, 0);
      await dispatch(getTotalPrice(price));
    };
    getTotal();
    
  }, [Cart, dispatch]);
  const addTotal = async () => {
    await axios.patch('/user/addCart', {cart:[...Cart]}, {
      headers: { Authorization: token }
    })
  }
  const increment = (id) => {
    Cart.forEach(item => {
      if (item._id === id) {
        item.quantity += 1;
      }
    })
    dispatch(getCartItems([...Cart]));
    addTotal();
  }
  const decrement = (id) => {
    Cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1;
      }
    });
    dispatch(getCartItems([...Cart]));
    addTotal();
  };
  const removeCartItems = (id) => {
    if (window.confirm('Are you sure you want to remove??')) {
      Cart.forEach((item, index) => {
        if (item._id === id) {
          Cart.splice(index, 1);
        }
      })
      dispatch(getCartItems([...Cart]));
      addTotal();
    }
  }
  if (Cart.length === 0) {
    return (
      <h1 style={{ textAlign: "center", fontWeight: "5rem" }}>Cart Empty</h1>
    );
  }
  return (
    <>
      <div>
        {Cart.map((DetailsPt) => (
          <Row key={DetailsPt._id}>
            <Col md={6} className="mt-5">
              <img className="details_img" src={DetailsPt.images.url} alt="" />
            </Col>
            <Col md={6} className="mt-5">
              <Row style={{ alignItems: "center" }}>
                <Col md={6}>
                  <h2>{DetailsPt.title}</h2>
                </Col>
                <Col md={6}>
                  <h6
                    onClick={() => removeCartItems(DetailsPt._id)}
                    style={{ float: "right", fontWeight: 900 ,fontSize:"20px",cursor: "pointer",color:"red" }}
                  >
                    x
                  </h6>
                </Col>
              </Row>
              <span>${DetailsPt.price * DetailsPt.quantity}</span>
              <p>
                {DetailsPt.description} Offload aged data from your Atlas
                cluster to a lower-cost, queryable storage tier. Create an
                Online Archive to start saving on storage costs.
              </p>
              <p>{DetailsPt.content}</p>
              <p>sold : {DetailsPt.sold}</p>
              <div className="pd_quantity">
                <Button
                  variant="light"
                  onClick={() => decrement(DetailsPt._id)}
                >
                  -
                </Button>
                <span style={{ padding: "0px 10px" }}>
                  {DetailsPt.quantity}
                </span>
                <Button
                  variant="light"
                  onClick={() => increment(DetailsPt._id)}
                >
                  +
                </Button>
              </div>
            </Col>
          </Row>
        ))}
      </div>
      <Row style={{ alignItems: "center" }}>
        <Col md={6}>
          <h2>Total : {total}</h2>
        </Col>
        <Col md={6}>
          <Link to="#" style={{ float: "right" }}>
            Payment
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default Cart;
