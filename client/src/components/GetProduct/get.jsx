import React, { useEffect, useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import "./get.css";
import Main from "../Main"
import { Link } from 'react-router-dom';

const GetProduct = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8080/api/products");
      setProducts(response.data);
    };

    fetchData();
  }, []);

  const deleteProduct = async (productId) => {
    await axios.delete(`http://localhost:8080/api/products/${productId}`)
      .then((response) => {
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
        toast.success(response.data.msg, { position: 'top-right' });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
    <Main/>
    <div className='productTable'>
      <Link to={"/add"} className='addButton'>Add Product</Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((product, index) => {
              return (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.description}</td>
                  <td className='actionButtons'>
                    <button onClick={() => deleteProduct(product._id)}>
                      <i className="fa-solid fa-trash">Delete</i>
                    </button>
                    <Link to={`/edit/` + product._id}>
                      <i className="fa-solid fa-pen-to-square">Edit</i>
                    </Link>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
    </>
  );
};

export default GetProduct;
