import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import "./UpdateAccount.scss";

function UpdateAccount() {
  const { theme } = useContext(ThemeContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await axios.get(
          `https://node-be-api.vercel.app/api/accounts/${id}`
        );
        const accountData = response.data;
        setUsername(accountData.username);
        setPassword(accountData.password);
        setPosition(accountData.position);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin tài khoản:", error);
      }
    };

    fetchAccount();
  }, [id]);

  const handleUpdateAccount = (e) => {
    e.preventDefault();
    axios
      .put(`https://node-be-api.vercel.app/api/accounts/${id}`, {
        username,
        password,
        position,
      })
      .then(() => {
        setMessage("");
        setTimeout(() => {
          navigate("/accounts");
        }, 100);
      })
      .catch((err) => {
        console.error("Lỗi khi cập nhật tài khoản:", err);
        setMessage("Đã xảy ra lỗi khi cập nhật tài khoản.");
      });
  };

  return (
    <div className="container mt-4">
      <h1
        className={`text-center mb-4 ${theme === "dark" ? "text-light" : ""}`}
      >
        Cập nhật tài khoản
      </h1>
      <form onSubmit={handleUpdateAccount} className="form-update-account">
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
          Cập nhật tài khoản
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

export default UpdateAccount;
