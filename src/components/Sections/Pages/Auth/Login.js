import axios from "axios";
import React, {useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const changeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/login", { ...user });
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
      <h2>Login</h2>
      <Form onSubmit={loginSubmit}>
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
          Log In
        </Button>
        <Link to="/register">
          <Button variant="outline-secondary" type="submit">
            Register
          </Button>
        </Link>
      </Form>
    </div>
  );
};

export default Login;
