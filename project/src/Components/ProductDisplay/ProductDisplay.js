import React, { useContext, useState } from "react";
import "./productdisplay.css";

import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

export default function ProductDisplay(props) {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  const [selectedSize, setSelectedSize] = useState("S");

  const handleAddToCart = (event) => {
    event.preventDefault(); // Prevent default action if necessary
    addToCart(product.id, selectedSize);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-list">
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt={product.name}></img>
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="Star" />
          <img src={star_icon} alt="Star" />
          <img src={star_icon} alt="Star" />
          <img src={star_icon} alt="Star" />
          <img src={star_dull_icon} alt="Star" />
        </div>

        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">Hi</div>
        <div className="productdisplay-right-size">
          <h1>Select size</h1>
          <div className="pdisplay-right-size">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div key={size} onClick={() => setSelectedSize(size)} className={selectedSize === size ? "selected" : ""}>
                {size}
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleAddToCart}>
          ADD TO CART
        </button>
        <p className="productdisplay-right-category">
          <span>Category:</span> {product.category}
        </p>
        <p className="productdisplay-right-category">
          <span>Tags:</span> Modern, latest
        </p>
      </div>
    </div>
  );
}
