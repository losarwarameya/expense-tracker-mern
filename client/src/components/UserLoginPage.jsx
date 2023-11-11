import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const UserLoginPage = () => {
    const [loginUserName, setLoginUserName] = useState("");
  const [loginUserPassword, setLoginUserPassword] = useState("");

  const navigate = useNavigate();

  const handleUserLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login-user", {
        loginUserName,
        loginUserPassword,
      });
      // const {userId} = response.data;
      localStorage.setItem("userId",response.data);
      navigate('/home');
      console.log(response.status);
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
          value={loginUserName}
          onChange={(e) => setLoginUserName(e.target.value)}
        />
        <input
          name="userPassword"
          placeholder="Password"
          type="text"
          value={loginUserPassword}
          onChange={(e) => setLoginUserPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Register User</Link>
    </div>
  )
}

export default UserLoginPage