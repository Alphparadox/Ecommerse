import React, { useEffect, useState } from "react";
import Item from "../item/Item";
import new_collections from "../Assets/new_collections";
import "./Newcollections.css";
export default function Newcollection() {
  // const [new_collections, setNew_collections] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:4000/newcollection")
  //     .then((response) => response.json())
  //     .then((data) => setNew_collections(data));
  // }, []);
  return (
    <div className="newcollection">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collection">
        {new_collections.map((item, i) => {
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
