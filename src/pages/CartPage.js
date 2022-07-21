import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";

function CartPage({ cartItems, setCartItems }) {
  const { id } = useParams();

  console.log(cartItems);

  const addToCart = (product) => {
    console.log(product);
    setCartItems([...cartItems, product]);
  };

  const removeFromCartHandler = (productRemove) => {
    setCartItems(cartItems.filter((product) => product !== productRemove));
  };

  console.log(JSON.parse(window.localStorage.getItem("cartItems")));

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        <ListGroup variant="flush">
          {JSON.parse(window.localStorage.getItem("cartItems")).map((item, idx) => (
            <ListGroup.Item key={idx}>
              <Row>
                <Col md={2}>
                  <Image src={item.img} alt={item.name} fluid rounded />
                </Col>

                <Col md={3}>{item.name}</Col>

                <Col md={2}>${item.price}</Col>

                <Col md={3}>
                  <Form.Control
                    as="select"
                    value={item.qty}
                    onChange={(e) => addToCart(item)}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>

                <Col md={1}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => removeFromCartHandler(id)}
                  ></Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
          </ListGroup>

          <ListGroup.Item></ListGroup.Item>
        </Card>
      </Col>
    </Row>
  );
}

export default CartPage;
