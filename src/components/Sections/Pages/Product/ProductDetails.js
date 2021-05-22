import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import ProductList from "./ProductList";

const ProductDetails = () => {
  const params = useParams();
  const AllPt = useSelector((state) => state.AllProducts.products);
  const [DetailsPt, setDetailsPt] = useState([]);

  useEffect(() => {
    if (params.id) {
        AllPt.forEach((product) => {
            if (product._id === params.id) {
                setDetailsPt(product)
            }
        })
    }
  }, [params.id, AllPt]);
  
  if (DetailsPt.length === 0) {
      return null
  }
  return (
    <>
      <Row>
        <Col md={6} className="mt-5">
          <img className="details_img" src={DetailsPt.images.url} alt="" />
        </Col>
        <Col md={6} className="mt-5">
          <Row style={{ alignItems: "center" }}>
            <Col md={6}>
              <h2>{DetailsPt.title}</h2>
            </Col>
            <Col md={6}>
              <h6 style={{ float: "right" }}>#id : {DetailsPt.product_id}</h6>
            </Col>
          </Row>
          <span>${DetailsPt.price}</span>
          <p>
            {DetailsPt.description} Offload aged data from your Atlas cluster to
            a lower-cost, queryable storage tier. Create an Online Archive to
            start saving on storage costs.
          </p>
          <p>{DetailsPt.content}</p>
          <p>sold : {DetailsPt.sold}</p>
        </Col>
      </Row>
      <div>
        <h2>Related Products</h2>
        <Row>
          {AllPt.map((pt) => {
            return pt.category === DetailsPt.category ? (
              <ProductList pt={pt} key={pt._id} />
            ) : null;
          })}
        </Row>
      </div>
    </>
  );
};

export default ProductDetails;
