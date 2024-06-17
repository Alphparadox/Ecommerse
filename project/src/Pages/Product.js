import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import Bredcrum from '../Components/Bredcrum/Bredcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import Relatedproduct from '../Components/RelatedProducts/Relatedproduct';

export default function Product() {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  
  const product = all_product.find((e) => e.id === Number(productId));


  return (
    <div>
      <Bredcrum product={product} />
      <ProductDisplay product={product} />
      <Relatedproduct />
      
    </div>
  )
}
