import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

import AuthService from "./services/auth.service";

import Login from "./pages/Login/login";
import Register from "./pages/register";
import Navbar from "./components/nav.component";
import Admin from "./pages/Admin/admin";
import ForgotPassword from "./pages/forgot-password";
import ResetPassword from "./pages/reset-password";
import MainPage from "./pages/Main/main";
import { ProtectedRoute } from "./components/protected-route.component";
import Account from "./pages/AccountProfile/account";

function App() {
  const authenticated = AuthService.isAuthenticated();
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

  return (
    <Router>
      <>
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setAuthenticated} />} />
          <Route path="/register"
          element={<Register/>}
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
          <Route element={<ProtectedRoute isAllowed={authenticated} />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/me" element={<Account />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </>
    </Router>
  );
}
    
export default App;