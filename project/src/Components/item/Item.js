import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

export default function Item(props) {
   const anil=()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
   }
  return (
    <div className='item'>
        <Link to={`/product/${props.id}`}><img className='item-img' src={props.image} onClick={anil}alt="" /></Link>
        <p>{props.name}</p>
        <div className="item-price">
            <div className="item-price-new">${props.newprice}</div>
            <div className="item-price-old">{props.oldprice}</div>
        </div>
      
    </div>
  )
}
