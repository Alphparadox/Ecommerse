import React, { useContext ,useRef} from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { NavLink } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

import drop_down from '../Assets/dropdown_icon.png';
export default function Navbar() {
  const {getTotalItem}=useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle=(e)=>{
    menuRef.current.classList.toggle('nav-menu-visible')
    e.target.classList.toggle('open');

  }
  return (
    <>
      <div className="navbar">
        <div className="nav-logo">
          <img src={logo} alt="" />
          <p>SUNDHA</p>
        </div>
        <img onClick={dropdown_toggle}  className='nav-dropdown' src={drop_down} alt="" />
        <ul ref={menuRef} className="nav-menu">
          <li>
            <NavLink to="/">Shop</NavLink>
          </li>
          <li>
            <NavLink to="/Men">Men</NavLink>
          </li>
          <li>
            <NavLink to="/Women">anil</NavLink>
          </li>
          <li>
            <NavLink to="/Kids">Kids</NavLink>
          </li>
        </ul>

        <div className="login">
          {localStorage.getItem('auth-token')?<button onClick={()=>{
            localStorage.removeItem('auth-token');window.location.replace('/')}
          }>Logout</button>:<NavLink to="/login"><button>Login</button></NavLink>}
          
          <NavLink to="/cart"><img src={cart_icon} /></NavLink>
          <div className="count">{getTotalItem()}</div>
        </div>
      </div>
    </>
  );
}
