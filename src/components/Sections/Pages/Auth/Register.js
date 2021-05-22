import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({name: '', email: "", password: "" });
  const changeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...user });
      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  return (
    <div
      style={{
        maxWidth: "50%",
        margin: "0 auto",
        marginTop: "20px",
        border: "2px solid rgb(3, 165, 206)",
        padding: "20px",
      }}
    >
      <h2>Register</h2>
      <Form onSubmit={loginSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={user.name}
            placeholder="Enter your name"
            onChange={changeInput}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            placeholder="Enter email"
            onChange={changeInput}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={user.password}
            placeholder="Password"
            onChange={changeInput}
          />
        </Form.Group>
        <Button className="mr-3" variant="primary" type="submit">
          Register
        </Button>
        <Link to="/login">
          <Button variant="outline-secondary" type="submit">
            Login
          </Button>
        </Link>
      </Form>
    </div>
  );
};

export default Register;
