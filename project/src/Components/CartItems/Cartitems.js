import React, { useContext } from "react";
import "./cartitems.css";
import { ShopContext } from "../../Context/ShopContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";



export default function Cartitems() {
  const { getTotalAmount, all_product, cartItem, removeFromCart } =
    useContext(ShopContext);

  return (
    <div className="cartitems">
      <div className="cartitem-down">
        {cartItem.map((item) => {
          const product = all_product.find((p) => p.id === item.id);
          return (
            <div key={`${item.id}-${item.size}`} className="cartitem-format">
              <div className="cartitem-image">
                <img src={product.image} className="cart_aicon" alt="" />
              </div>
              <div className="cartitem-details">
                <p className="cartitem-title">{product.name}</p>
                <p className="cartitem-size">Size: {item.size}</p>

                <div className="cartitem-actions">
                  <p className="cartitem-price-new">${product.new_price}</p>
                  <div>
                  <FontAwesomeIcon icon={faXmark} />
                  </div>
                  <button className="cartitem-quantity">{item.quantity}</button>
                  <p> = </p>
                  <p className="cartitem-total">
                    ${product.new_price * item.quantity}
                  </p>
                </div>
                <div
                  className="vraj"
                  onClick={() => removeFromCart(item.id, item.size)}
                >
                 Remove
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitem-total-item">
              <p>Subtotal</p>
              <p>${getTotalAmount()}</p>
            </div>
            <hr />
            <div className="cartitem-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>

            <hr />

            <div className="cartitem-total-item">
              <h3>Total</h3>
              <h3>${getTotalAmount()}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitem-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cartitem-promobox">
            <input type="text" placeholder="Promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
