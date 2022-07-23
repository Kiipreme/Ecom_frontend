import React from "react";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import * as BsIcons from "react-icons/bs";

function CartPage({ cartItems, setCartItems }) {

  const data = JSON.parse(window.localStorage.getItem("cartItems"));

  const addToCart = (product) => {
    console.log(product);
    setCartItems([...cartItems, product]);
  };

  const removeFromCartHandler = (itemId) => {
    const filterData = data.filter((item) => itemId !== item.id)
    setCartItems(filterData);
    window.localStorage.setItem("cartItems", JSON.stringify(filterData))
    console.log(cartItems);
  };

  const calTotalItem = () => {
    const subtotal = data.reduce((acc, item) => {
      return acc + Number(item.qty);
    }, 0);
    return subtotal;
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        <ListGroup >
          {data.map((item, idx) => (
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
                    onClick={() => removeFromCartHandler(item.id)}
                  >
                    <BsIcons.BsFillTrashFill />
                  </Button>
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
              <h2>Subtotal ({calTotalItem()}) items</h2>$
              {data
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
