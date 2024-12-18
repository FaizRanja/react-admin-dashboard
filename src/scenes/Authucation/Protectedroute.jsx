import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protectedroute = ({ children, redirect="/login" , user }) => {
  if (!user) return <Navigate to={redirect} />;

  return children ? children : <Outlet />;
};



export default Protectedroute
