import React from "react";
import Card from "react-bootstrap/Card";
import {Col } from "react-bootstrap";
import ButtonChange from "./ButtonChange";
import { useSelector } from "react-redux";

const ProductList = ({ pt }) => {
  const userInfo = useSelector((state) => state.UserInfo.user);
  const { isAdmin } = userInfo;
  return (
    <Col md={4} className="product_cart mb-4">
      <Card style={{ width: "18rem" }}>
        {isAdmin && <input type="checkbox" defaultChecked={pt.checked} />}
        <Card.Img className="details_img" variant="top" src={pt.images.url} />
        <Card.Body>
          <Card.Title>{pt.title}</Card.Title>
          <Card.Text>{pt.description}</Card.Text>
          <ButtonChange pt={pt} />
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ProductList;
