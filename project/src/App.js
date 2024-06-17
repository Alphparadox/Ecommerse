import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Cart from "./Pages/Cart";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Footer from "./Components/Footer/Footer";
import Login from "./Pages/Login";


function App() {
  return (
    <div className="app">
    <Router>
      <Navbar />

     <Routes>
      <Route exact  path='/' element={<Shop />} />
      <Route exact  path='/Men' element={<ShopCategory banner={men_banner} category="men" />} />
      <Route exact path='/Women' element={<ShopCategory banner={women_banner} category="women" />} />
      <Route exact path='/Kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
      <Route exact path='/Product/:productId' element={<Product />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/cart' element={<Cart />} />
     

      </Routes> 
      
       <Footer />
      </Router>
      
    </div>
  );
}

export default App;
