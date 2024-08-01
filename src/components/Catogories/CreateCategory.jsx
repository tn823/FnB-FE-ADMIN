import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateCategory.scss";

function CreateCategory() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [menu_id, setMenuId] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateCategory = (e) => {
    e.preventDefault();
    axios
      .post("https://node-be-api.vercel.app/api/categories", {
        name,
        menu_id,
      })
      .then(() => {
        setMessage("");
        setTimeout(() => {
          navigate("/categories");
        }, 200);
      })
      .catch((err) => {
        console.error("Lỗi khi tạo danh mục:", err);
        setMessage("Đã xảy ra lỗi khi tạo danh mục.");
      });
  };

  return (
    <div className="container create-category-container">
      <div className="form-create-category">
        <h1 className="text-center mb-4">Tạo danh mục mới</h1>
        <form onSubmit={handleCreateCategory}>
          <div className="mb-3">
            <label htmlFor="category-name" className="form-label">
              Tên danh mục
            </label>
            <input
              type="text"
              id="category-name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="menu-id" className="form-label">
              ID menu
            </label>
            <input
              type="text"
              id="menu-id"
              className="form-control"
              value={menu_id}
              onChange={(e) => setMenuId(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary custom-btn">
            Tạo danh mục
          </button>
        </form>
        {message && <div className="mt-3 text-center ">{message}</div>}
      </div>
    </div>
  );
}

export default CreateCategory;
