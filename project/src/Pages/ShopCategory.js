import React, { useContext, useState } from "react";
import "./CSS/shopc.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/item/Item";

export default function ShopCategory(props) {
  const { all_product } = useContext(ShopContext);
  const [displayCount, setDisplayCount] = useState(8);

  
  const categoryProducts = all_product.filter(item => item.category === props.category);

  const handleLoadMore = () => {
    setDisplayCount(displayCount + 8); 
  };

  return (
    <div className="shop-category">
      <img className="shop-banner" src={props.banner} alt="" />

      <div className="shop-category-indexSort">
        <p>
          <span>Showing 1-{displayCount > categoryProducts.length ? categoryProducts.length : displayCount}</span> out of {categoryProducts.length}
        </p>

        <div className="shop-categorysort">
          <p>sort by</p>
          <div>
            <img src={dropdown_icon} alt="" />
          </div>
        </div>
      </div>

      <div className="shopcategory-products">
        {categoryProducts.slice(0, displayCount).map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            newprice={item.new_price}
            oldprice={item.old_price}
          />
        ))}
      </div>

      {displayCount < categoryProducts.length && (
        <div className="loadmore" onClick={handleLoadMore}>
          Explore More
        </div>
      )}
    </div>
  );
}
