import React from 'react'
import { useSelector } from 'react-redux'
import ProductList from './ProductList';
import { Container, Row} from 'react-bootstrap';
import Loading from '../Loading/Loading';

const Products = () => {
    const products = useSelector((state) => state.AllProducts.products);
    return (
      <Container>
        <Row className="pt-4">
          {products.map((pt) => (
            <ProductList key={pt._id} pt={pt} />
          ))}
        </Row>
        {products.length === 0 && <Loading />}
      </Container>
    );
}

export default Products
