import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import i_icon from '../Assets/instagram_icon.png'
import p_icon from '../Assets/pintester_icon.png'
import w_icon from '../Assets/whatsapp_icon.png'

export default function Footer() {
  return (
    <div  className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
      </ul>

      <div className="footer-social-icon">
        <div className="footer-icons-container">
            <img src={i_icon} alt="" />
        </div>
        <div className="footer-icons-container">
            <img src={p_icon} alt="" />
        </div>
        <div className="footer-icons-container">
            <img src={w_icon} alt="" />
        </div>
      </div>

      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2024- All Right</p>
      </div>
    </div>
  )
}
