import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./add.css";
import Main from '../Main'; 


import toast from 'react-hot-toast';

const AddProduct = () => {

  // Initialize product state based on the Product model
  const initialProduct = {
    name: "",
    price: "",
    description: "",
    category: ""
  };

  const [product, setProduct] = useState(initialProduct);
  const navigate = useNavigate();

  // Handle input changes
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle form submission
  const submitForm = async (e) => {
    e.preventDefault();
    console.log("hi")
    await axios.post("http://localhost:8080/api/products", product)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" });
        navigate("/");
      })
      .catch(error => console.log(error));
  };

  return (
    <>
    <Main/>
    <div className='addProduct'>
      <Link to={"/"}>Back</Link>
      <h3>Add New Product</h3>
      <form className='addProductForm' onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">Product Name</label>
          <input 
            type="text" 
            onChange={inputHandler} 
            id="name" 
            name="name" 
            autoComplete='off' 
            placeholder='Product name' 
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="price">Price</label>
          <input 
            type="number" 
            onChange={inputHandler} 
            id="price" 
            name="price" 
            autoComplete='off' 
            placeholder='Price' 
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="description">Description</label>
          <textarea 
            onChange={inputHandler} 
            id="description" 
            name="description" 
            autoComplete='off' 
            placeholder='Description' 
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="category">Category</label>
          <input 
            type="text" 
            onChange={inputHandler} 
            id="category" 
            name="category" 
            autoComplete='off' 
            placeholder='Category' 
          />
        </div>
        <div className="inputGroup">
          <button type="submit">ADD PRODUCT</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default AddProduct;
