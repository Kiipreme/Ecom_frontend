import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Form, FormGroup, FormControl, Col, Button } from "react-bootstrap";

function EditProduct({ fetchProducts }) {

  const [formState, setFormState] = useState({
    name: "",
    brand: "",
    price: 0,
    description: "",
    category: "",
    rating: 0,
    countInStock: 0,
    createdAt: "",
    img: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const productInfo = async () => {
    const { data } = await axios.get(`http://localhost:8000/product/${id}`);

    setFormState({
      name: data.name,
      brand: data.brand,
      price: data.price,
      description: data.description,
      category: data.category,
      rating: data.rating,
      countInStock: data.countInStock,
      createdAt: data.createdAt,
      img: data.img,
    });
  };

  useEffect(() => {
    productInfo();
  }, []);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formState);

    await axios
      .put(`http://localhost:8000/product/${id}`, { ...formState })
      .then(console.log)
      .then(() => {
        fetchProducts();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
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
            Edit
          </Button>
        </Col>
      </FormGroup>
    </Form>
  );
}
export default EditProduct;
