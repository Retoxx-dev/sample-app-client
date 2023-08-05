import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Navigate, Routes } from "react-router-dom";
import './App.css';

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Me from "./components/me.component";
import Register from "./components/register.component";
import Navbar from "./components/nav.component";
import Admin from "./components/admin.component";
import ForgotPassword from "./components/forgot-password.component";
import ResetPassword from "./components/reset-password.component";


function App() {
  const [isAuthenticated] = useState<boolean>(
    () => {
      const isAuthenticated = AuthService.isAuthenticated();
      return isAuthenticated;
    }
  );

  const [isSuperUser] = useState<boolean>(
    () => {
      const user = AuthService.getCurrentLocalUser();
      return user?.is_superuser || false;
    }
  );

  return (
    <Router>
    <div>
    {
      isAuthenticated  ? (
        <Navbar isSuperUser={isSuperUser}/>
        ) : (null)
    }
      <Routes>
      <Route path="/login" 
      element={isAuthenticated  ? <Navigate to="/me" /> : <Login/>}
      />
      <Route path="/register" 
      element={<Register/>}
      />
      <Route
      path="/"
      element={isAuthenticated  ? <Navigate to="/me" /> : <Navigate to="/login" />}
      />
      <Route
      path="/me"
      element={isAuthenticated  ? <Me /> : <Navigate to="/login" />}
      />
      <Route
      path="/admin"
      element={isAuthenticated && isSuperUser ? <Admin /> : <Navigate to="/login" />}
      />
      <Route
      path="*"
      element={<h1>404 Mordo</h1>}
      />
      <Route
      path="/forgot-password"
      element={ <ForgotPassword /> }
      />
      <Route
      path="/reset-password"
      element={ <ResetPassword /> }
      />
      </Routes>
      </div>
      </Router>
  );
}
    
export default App;