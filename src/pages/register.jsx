import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import m_Image from "../assets/m_image.svg";
import cuv_Image from "../assets/cuv.png";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setUser({ name: "", email: "", mobile: "", password: "", confirmPassword: "" });
    document.getElementById("register-form").reset();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/api/auth/register", user);

      if (response && response.data) {
        sessionStorage.setItem("user", JSON.stringify({ username: user.name, email: user.email }));
        alert("Registration Successful!");
        navigate("/login");
      } else {
        alert("Unexpected response from server");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.response?.data?.message || error.message || "Something went wrong");
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
      <form id="register-form" onSubmit={handleSubmit} className="register-form">
        <div className="form-content">
          <h2>Join us Today!</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={user.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            value={user.email}
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile no."
            value={user.mobile}
            onChange={handleChange}
            required
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={user.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
          <button type="submit">Register</button>
          <p className="login-link">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} className="login-clickable">
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
