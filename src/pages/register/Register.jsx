import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Navbar from "../../components/navbar/Navbar";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const API_URL = import.meta.env.VITE_API_URL;

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/auth/register`, credentials);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <Navbar />
      <div className="register">
        <div className="lContainer">
          <input
            type="email"
            placeholder="email"
            id="email"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="text"
            placeholder="phone"
            id="phone"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="text"
            placeholder="country"
            id="country"
            onChange={handleChange}
            className="lInput"
          />
          <button onClick={handleClick} className="lButton">
            Register
          </button>
          {error && <span>{error.message}</span>}
        </div>
      </div>
    </>
  );
};

export default Register;
