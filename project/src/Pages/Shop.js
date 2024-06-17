import React, { useRef } from 'react';
import Hero from '../Components/Hero/Hero';
import Popular from '../Components/Popular/Popular';
import Offers from '../Components/Offers/Offers';
import Newcollection from '../Components/Newcollection/Newcollection';
import Newsletter from '../Components/Newsletter/Newsletter';
import './CSS/anil.css';

export default function Shop() {
  const newCollectionRef = useRef(null);

  const scrollToNewCollection = () => {
    newCollectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='anil'>
      <Hero scrollToNewCollection={scrollToNewCollection} />
      <Popular />
      <Offers />
      <div ref={newCollectionRef}>
        <Newcollection />
      </div>
      <Newsletter />
    </div>
  );
}
