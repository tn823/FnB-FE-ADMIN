import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import "./style/CreateAccount.css";

function CreateAccount() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateAccount = (e) => {
    e.preventDefault();
    axios
      .post("https://node-be-api.vercel.app/api/accounts", {
        username,
        password,
        position,
      })
      .then(() => {
        setMessage("");
        setTimeout(() => {
          navigate("/accounts");
        }, 200);
      })
      .catch((err) => {
        console.error("Lỗi khi tạo tài khoản:", err);
        setMessage("Đã xảy ra lỗi khi tạo tài khoản.");
      });
  };

  return (
    <div className="container mt-4">
      <h1
        className={`text-center mb-4 ${theme === "dark" ? "text-light" : ""}`}
      >
        Tạo tài khoản mới
      </h1>
      <form onSubmit={handleCreateAccount} className="form-create-account">
        <div className="mb-3">
          <label className="form-label">Tên đăng nhập</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mật khẩu</label>
          <input
            type="text"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Chức vụ</label>
          <input
            type="text"
            className="form-control"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary custom-btn">
          Tạo tài khoản
        </button>
      </form>
      {message && (
        <div
          className={`mt-3 text-center ${
            theme === "dark" ? "text-light" : "text-dark"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default CreateAccount;
