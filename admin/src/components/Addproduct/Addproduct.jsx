import React, { useState } from 'react';
import './add.css';
import upload_area from '../../assets/upload_area.svg';

const Addproduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductdetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: ""
  });

  const imagehandler = (e) => {
    setImage(e.target.files[0]);
  };

  const add_product = async () => {
    console.log(productDetails);

    let product = { ...productDetails };
    let formData = new FormData();
    formData.append('image', image);

   
      const response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      const responsData = await response.json();

      if (responsData.success) {
        product.image = responsData.image_url;
        console.log(product.image);

        const addProductResponse = await fetch('http://localhost:4000/addproduct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });

        const addProductData = await addProductResponse.json();

        if (addProductData.success) {
          console.log('Product added successfully');
        } else {
          console.error('Failed to add product', addProductData);
        }
      } else {
        console.error('Image upload failed', responsData);
      }
    
  };

  const changeHandler = (e) => {
    setProductdetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className='add-product'>
      <div className="addproduct-field">
        <p>Product title</p>
        <input type="text" value={productDetails.name} onChange={changeHandler} name='name' placeholder='Type here' />
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input type="text" value={productDetails.old_price} onChange={changeHandler} name='old_price' placeholder='Type here' />
        </div>

        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input type="text" value={productDetails.new_price} onChange={changeHandler} name='new_price' placeholder='Type here' />
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
          <option value="women">women</option>
          <option value="men">men</option>
          <option value="kid">kid</option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image) : upload_area} className="addproduct-thumbnail-img" alt="" />
        </label>
        <input type="file" name='image' id='file-input' hidden onChange={imagehandler} />
      </div>

      <button onClick={add_product} className='addproduct-btn'>ADD</button>
    </div>
  );
};

export default Addproduct;
