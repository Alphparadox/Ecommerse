import React, { useEffect, useState } from "react";
import "./popular.css";
import data_product from "../Assets/data";
import Item from "../item/Item";

export default function Popular() {
  // const [data_product, setData_product] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:4000/popularinwomen")
  //     .then((response) => response.json())
  //     .then((data) => setData_product(data));
  // }, []);
  return (
    <div className="popular">
      <h1>Popular in Women</h1>
      <hr />

      <div className="popular-item">
        {data_product.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              newprice={item.new_price}
              oldprice={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
}
