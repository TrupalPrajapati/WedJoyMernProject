import React from "react";
import Navbar from "../Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* This will render the pages dynamically */}
      <Footer />
    </div>
  );
};

export default Layout;
