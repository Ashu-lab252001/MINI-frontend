import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import m_Image from "../assets/m_image.svg";
import cuv_Image from "../assets/cuv.png";
const API_BASE_URL = "https://mini-backend-32pe.onrender.com";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    setUser({ email: "", password: "" });
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, user);
=======
      const response = await axios.post("https://mini-backend-32pe.onrender.com", user);
>>>>>>> 4e9dc589c44f3e85846a3a93a7c3a5e4a2994eda
      const { username, email, mobile, token } = response.data;
  
      // Store user data in sessionStorage
      sessionStorage.setItem("authToken", token);
      sessionStorage.setItem("user", JSON.stringify({ username, email, mobile }));
  
      console.log("User data saved in sessionStorage:", { username, email, mobile });  // Debugging line
      alert("Login Successful!");
      setUser({ email: "", password: "" });
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "An error occurred. Please try again.");
      } else {
        alert("Network error or server unavailable. Please try again later.");
      }
    }
  };
  

  return (
    <div className="register-container">
      <div className="top-right-buttons">
        <button className="signup" onClick={() => navigate("/")}>Sign Up</button>
        <button className="signin" onClick={() => navigate("/login")}>Login</button>
      </div>
      <div className="image-container">
        <img className="m_image" src={m_Image} alt="scenic" />
        <img className="cuv_image" src={cuv_Image} alt="cuv" />
      </div>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-content">
          <h2>Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Email id"
            value={user.email}
            onChange={handleChange}
            required
            autoComplete="new-email"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
          <button type="submit">Login</button>
          <p className="login-link">
            Don't have an account? <span onClick={() => navigate("/")} className="login-clickable">Sign up</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
