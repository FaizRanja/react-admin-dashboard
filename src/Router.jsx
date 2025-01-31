import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import {
  Dashboard,
  Team,
  Invoices,
  Contacts,
  Form,
  Bar,
  Line,
  Pie,
  FAQ,
  Geography,
  Calendar,
  Stream,
} from "./scenes";
import Login from "./scenes/Authucation/Login";
import Protectedroute from "./scenes/Authucation/Protectedroute";
import Cookies from "js-cookie"
import { useSelector } from "react-redux";
import UpdatePassword from "./scenes/form/UpdatePassword/ChnagePassword";
import UserProfile from "./scenes/UserProfile/UserProfile";
import axios from "axios";

// axios.defaults.withCredentials = true;
const AppRouter = () => {
  const { isAuthenticated,  } = useSelector((state) => state.authReducier) || {};

// const isAuthenticated=true

  return (
    <Router>
      <Routes>
      <Route path="/login" element={
                    <Protectedroute user={!isAuthenticated} redirect="/">
                        <Login />
                    </Protectedroute>
                } />
<Route element={<Protectedroute user={isAuthenticated} />} >
        <Route path="/" element={<App />}>
        <Route path="/account" element ={<UserProfile/>} />
        <Route path="/" element={<Dashboard />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/updatepassword" element={<UpdatePassword/>} />
          <Route path="/form" element={<Form />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/bar" element={<Bar />} />
          <Route path="/pie" element={<Pie />} />
          <Route path="/stream" element={<Stream />} />
          <Route path="/line" element={<Line />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/geography" element={<Geography />} />
        </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
