import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, FormControl, Col, Button } from "react-bootstrap";

function AddProduct() {
  const [formState, setFormState] = useState({
    name: "",
    brand: "",
    price: 0,
    description: "",
    category: "",
    rating: 0,
    countInStock: 0,
    img: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`http://localhost:8000/product/`, { ...formState })
      .then(console.log)
      .then(navigate("/"))
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup controlId="name">
        <Col sm={2}>Name</Col>
        <Col sm={10}>
          <FormControl
            type="name"
            value={formState.name}
            onChange={handleChange}
          />
        </Col>
      </FormGroup>

      <FormGroup controlId="brand">
        <Col sm={2}>Brand</Col>
        <Col sm={10}>
          <FormControl
            type="brand"
            value={formState.brand}
            onChange={handleChange}
          />
        </Col>
      </FormGroup>

      <FormGroup controlId="price">
        <Col sm={2}>Price</Col>
        <Col sm={10}>
          <FormControl
            type="number"
            step=".01"
            name="price"
            value={formState.price}
            onChange={handleChange}
          />
        </Col>
      </FormGroup>

      <FormGroup controlId="description">
        <Col sm={2}>Description</Col>
        <Col sm={10}>
          <FormControl
            type="text"
            name="description"
            value={formState.description}
            onChange={handleChange}
          />
        </Col>
      </FormGroup>

      <FormGroup controlId="category">
        <Col sm={2}>Category</Col>
        <Col sm={10}>
          <FormControl
            type="text"
            name="category"
            value={formState.category}
            onChange={handleChange}
          />
        </Col>
      </FormGroup>

      <FormGroup controlId="rating">
        <Col sm={2}>Rating</Col>
        <Col sm={10}>
          <FormControl
            type="number"
            step=".1"
            name="rating"
            value={formState.rating}
            onChange={handleChange}
          />
        </Col>
      </FormGroup>

      <FormGroup controlId="countInStock">
        <Col sm={2}>Inventory</Col>
        <Col sm={10}>
          <FormControl
            type="number"
            name="countInStock"
            value={formState.countInStock}
            onChange={handleChange}
          />
        </Col>
      </FormGroup>

      <FormGroup controlId="img">
        <Col sm={2}>Image</Col>
        <Col sm={10}>
          <FormControl
            type="text"
            name="img"
            value={formState.img}
            onChange={handleChange}
          />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col sm={2}>
          <Button className="btn btn-dark my-3" type="submit">
            Add Product
          </Button>
        </Col>
      </FormGroup>
    </Form>
  );
}

export default AddProduct;
