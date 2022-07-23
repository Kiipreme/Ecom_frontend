import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";

function ProductPage({ setCartItems, cartItems }) {
  const [product, setProduct] = useState([]);
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const url = "http://localhost:8000";

    async function fetchProduct() {
      const { data } = await axios.get(`${url}/product/${id}`);
      setProduct(data);
    }

    fetchProduct();
  }, []);

  const deleteProduct = async (id) => {
    await axios
      .delete(`http://localhost:8000/product/${id}`)
      .then(navigate("/"));
  };

  console.log(cartItems);

  const addToCartHandler = (e) => {
    e.preventDefault();
    const prodCopy = {...product, qty}
    const copy = [...cartItems, prodCopy];
    setCartItems(copy);
    window.localStorage.setItem("cartItems", JSON.stringify(copy));

    console.log("added item");
  };

  return (
    <div>
      <Link to="/" className="btn btn-light ms-3">
        Go Back
      </Link>

      <Link to={`/update/${id}`} className="btn btn-dark m-3">
        Edit
      </Link>

      <Link
        to="/"
        className="btn btn-dark ms-3"
        onClick={() => deleteProduct(product.id)}
      >
        Delete
      </Link>

      <Row>
        <Col md={6}>
          <Image src={product.img} alt={product.name} className='productinfo' />
        </Col>

        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            {/* Product Review */}
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color={"#f8e825"}
              />
            </ListGroup.Item>

            {/* Product Description block  */}
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        {/* Price block */}
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              {/* Stock Item block */}
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              {/* Number of Stock per Item */}
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col xs="auto" className="my-1">
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              {/* Button to add item */}
              <ListGroup.Item>
                <Button
                  onClick={addToCartHandler}
                  className="btn-block"
                  disabled={product.countInStock === 0}
                  type="button"
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductPage;
