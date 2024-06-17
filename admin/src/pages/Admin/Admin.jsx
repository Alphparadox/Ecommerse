import React from "react";
import "./admin.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Addproduct from "../../components/Addproduct/Addproduct";
import Listproduct from "../../components/listproduct/Listproduct";
const Admin = () => {
  return (
    <div className="admin">
     <Sidebar />
     <Routes>

       <Route path='/addproduct' element={<Addproduct />} />
       <Route path='/listproduct' element={<Listproduct />} />




     </Routes>
    </div>
  );
};

export default Admin;
