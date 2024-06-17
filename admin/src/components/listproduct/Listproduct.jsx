import React, { useEffect, useState } from "react";
import "./listproduct.css";
import cross_icon from '../../assets/cross_icon.png';

const Listproduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allproduct")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  },[]);

  const remove_product=async (id)=>{
    await fetch('http://localhost:4000/removeproduct',{
      method:'post',
      headers:{
        Accept:'application/json',
        'content-Type':'application/json',

      },

      body:JSON.stringify({id:id})
    })

    await fetchInfo();
  }
  
  return (
    <div className="list-product">
      <h1>ALL PRODUCTS</h1>

      <div className="listproduct-formate-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <div className="listproduct-allproduct">
        <hr />

        {allproducts.map((product, index) => (
              <div key={index} className="listproduct-formate-main listproduct-formate">
            <img src={product.image} alt="" className="listproduct-icon"/>
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={()=>{
              remove_product(product.id);
            }}className='listproduct-remove-icon' src={cross_icon} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listproduct;
