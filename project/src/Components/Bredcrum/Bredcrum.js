import React from 'react';
import './Breadcrum.css';
import { Link } from 'react-router-dom'; // Import Link from React Router
import arrow_icon from '../Assets/breadcrum_arrow.png';

export default function Bredcrum({ product }) {
  return (
    <div className='breadcrum'>
      <Link to='/'>Home</Link> <img src={arrow_icon} alt='arrow' />
      {product ? (
        <>
          <Link to={`/${product.category}`}>{product.category}</Link>{' '}
          <img src={arrow_icon} alt='arrow' />
          <span>{product.name}</span>
        </>
      ) : (
        'Shop'
      )}
    </div>
  );
}
