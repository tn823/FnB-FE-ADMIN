import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateCategory.scss";

function UpdateCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [menu_id, setMenuId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `https://node-be-api.vercel.app/api/categories${id}`
        );
        const categoryData = response.data;
        setName(categoryData.categoryName);
        setMenuId(categoryData.categoryId);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin danh mục:", error);
      }
    };

    fetchCategory();
  }, [id]);

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    axios
      .put(`https://node-be-api.vercel.app/api/categories${id}`, {
        name,
        menu_id,
      })
      .then(() => {
        setMessage("");
        setTimeout(() => {
          navigate("/categories");
        }, 100);
      })
      .catch((err) => {
        console.error("Lỗi khi cập nhật danh mục:", err);
        setMessage("Đã xảy ra lỗi khi cập nhật danh mục.");
      });
  };

  return (
    <div className="container update-category-container">
      <div className="form-update-category">
        <h1 className="text-center mb-4">Cập nhật danh mục</h1>
        <form onSubmit={handleUpdateCategory}>
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
            Cập nhật danh mục
          </button>
        </form>
        {message && <div className="mt-3 text-center">{message}</div>}
      </div>
    </div>
  );
}

export default UpdateCategory;
