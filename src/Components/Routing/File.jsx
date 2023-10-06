import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Login/Login";
import SignUp from "../SIgnUp/SignUp";

const File = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/file" element={<Login />} />
      </Routes>
    </div>
  );
};

export default File;
