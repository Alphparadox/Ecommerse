import React from 'react'
import './realatedproduct.css'
import data_product from '../Assets/data'
import Item from '../item/Item'
export default function Relatedproduct() {
  return (
    <div className='relatedproduct'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproduct-item">
     { data_product.map((item,i)=>{
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
  )
}
