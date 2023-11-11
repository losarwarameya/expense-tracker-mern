import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserRegisterPage = (props) => {
  const {pageType} = props;
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleUserRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/register-user", {
        userName,
        userPassword,
      });

      console.log("User registered successfully:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Registration Page</h1>
      <form onSubmit={(e) => handleUserRegisterSubmit(e)}>
        <input
          name="userName"
          placeholder="Username"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          name="userPassword"
          placeholder="Password"
          type="text"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserRegisterPage;
