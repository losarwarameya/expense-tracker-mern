import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRegisterPage from "./components/UserRegisterPage";
import UserLoginPage from "./components/UserLoginPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<UserRegisterPage />} />
        <Route path="/login" element={<UserLoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;