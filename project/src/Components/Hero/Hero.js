import React from 'react';
import './Hero.css';
import hand_icon from '../Assets/hand_icon.png';
import arrow_icon from '../Assets/arrow.png';
import hero_image from '../Assets/hero_image.png';

export default function Hero({ scrollToNewCollection }) {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>New Arrivals Only</h2>
        <div>
          <div className="icon">
            <p>New</p>
            <img src={hand_icon} alt="hand icon" />
          </div>
          <p>collections</p>
          <p>For everyone</p>
        </div>
        <div className="hero-latest-button" onClick={scrollToNewCollection}>
          <div>Latest collections</div>
          <img src={arrow_icon} alt="arrow icon" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="hero" />
      </div>
    </div>
  );
}
