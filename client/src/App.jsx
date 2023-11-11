import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRegisterPage from "./components/UserRegisterPage";
import UserLoginPage from "./components/UserLoginPage";
import HomePage from "./components/HomePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<UserRegisterPage />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/home" element={<HomePage />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;