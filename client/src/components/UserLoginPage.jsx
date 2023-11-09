import React,{useState} from 'react'
import axios from "axios";

const UserLoginPage = () => {
    const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleUserLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login-user", {
        userName,
        userPassword,
      });

      console.log("User logged in successfully:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
        <h1>Login Page</h1>
        <form onSubmit={(e) => handleUserLoginSubmit(e)}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default UserLoginPage