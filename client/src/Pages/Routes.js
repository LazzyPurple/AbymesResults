import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import LogIn from "./LogIn";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/signin" element={<LogIn />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default Routing;
