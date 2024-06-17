import React from 'react'
import './Newsletter.css'
export default function Newsletter() {
  return (
    <div className='newsletter'>
        <h1>Get Exclusive Offers On your Email</h1>
        <p>Subscribe Our Newsletter</p>
        <div>
            <input type="email" placeholder='enter your email id' />
            <button>Subscribe</button>
        </div>
      
    </div>
  )
}
