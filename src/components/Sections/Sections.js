import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {Switch, Route} from 'react-router-dom'
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Cart from './Pages/Cart/Cart';
import NotFound from './Pages/NotFound/NotFound';
import ProductDetails from './Pages/Product/ProductDetails';
import Products from './Pages/Product/Products';

const Sections = () => {
  const userInfo = useSelector((state) => state.UserInfo.user);
  const { isLogged } = userInfo;
    return (
      <Container>
        <Switch>
          <Route path="/" exact component={Products} />
          <Route path="/details/:id" exact component={ProductDetails} />
          <Route path="/login" exact component={isLogged ? NotFound : Login} />
          <Route path="/register" exact component={isLogged ? NotFound :Register} />
          <Route path="/cart" exact component={Cart} />

          <Route path="*" exact component={NotFound} />
        </Switch>
      </Container>
    );
}

export default Sections
