import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://fnb-be.vercel.app/api/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("position", response.data.position);
      navigate("/");
    } catch (err) {
      console.error("Error logging in:", err);
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
        console.error("Response headers:", err.response.headers);
      } else if (err.request) {
        console.error("Request data:", err.request);
      } else {
        console.error("Error message:", err.message);
      }
      setError("Tài khoản hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Đăng nhập</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Tên đăng nhập:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mật khẩu:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
