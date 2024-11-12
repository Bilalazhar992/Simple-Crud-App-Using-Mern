import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import Main from "../Main"
import "../AddProduct/add.css";  
import toast from 'react-hot-toast';

const EditProduct = () => {

  const initialProduct = {
    name: "",
    price: "",
    description: "",
    category: ""
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialProduct);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/products/${id}`, product)
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
      <h3>Update Product</h3>
      <form className='addProductForm' onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            value={product.name}
            onChange={inputChangeHandler}
            id="name"
            name="name"
            autoComplete='off'
            placeholder='Product Name'
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            value={product.price}
            onChange={inputChangeHandler}
            id="price"
            name="price"
            autoComplete='off'
            placeholder='Price'
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="description">Description</label>
          <textarea
            value={product.description}
            onChange={inputChangeHandler}
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
            value={product.category}
            onChange={inputChangeHandler}
            id="category"
            name="category"
            autoComplete='off'
            placeholder='Category'
          />
        </div>
        <div className="inputGroup">
          <button type="submit">UPDATE PRODUCT</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default EditProduct;
