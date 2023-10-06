import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div >
      <div className='sticky top-0 z-50'>
        <nav className="bg-white shadow-md flex justify-center mt-5 md:gap-20 gap-5 sticky top-0 z-50  text-center h-12">
          <Link className='text-xl text-blue-800  hover:text-green-700' to={"/"}>Home </Link>
          <Link  className='text-xl text-blue-800  hover:text-green-700' to={"/login"}>Login </Link>
          <Link className='text-xl text-blue-800  hover:text-green-700' to={"/signup"}>Register </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
