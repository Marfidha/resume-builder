import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";


const Layout = () => {
  return (
    <>
    <Navbar/>
      <Outlet /> {/* 👉 Pages will render here */}
    </>
  );
};

export default Layout;