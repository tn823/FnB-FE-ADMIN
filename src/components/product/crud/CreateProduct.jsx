import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateProduct.scss"; // Import SCSS file

function CreateProduct() {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    images: [],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleImageChange = (e, index) => {
    const newImages = [...values.images];
    newImages[index] = e.target.value;
    setValues({ ...values, images: newImages });
  };

  const handleAddImage = () => {
    if (values.images.length < 4) {
      setValues({
        ...values,
        images: [...values.images, ""],
      });
    } else {
      alert("Bạn chỉ có thể thêm tối đa 3 ảnh cho mỗi sản phẩm.");
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...values.images];
    newImages.splice(index, 1);
    setValues({ ...values, images: newImages });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://node-be-api.vercel.app/api/products", values)
      .then((res) => {
        console.log(res);
        navigate("/products");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="create-product-container">
      <div className="create-product-form">
        <h1 className="form-title">Thêm sản phẩm mới</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Tên:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Nhập tên"
              onChange={handleChange}
              value={values.name}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Mô tả:</label>
            <textarea
              name="description"
              className="form-control"
              placeholder="Nhập mô tả"
              onChange={handleChange}
              value={values.description}
              rows={4}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Giá:</label>
            <input
              type="text"
              name="price"
              className="form-control"
              placeholder="Nhập giá"
              onChange={handleChange}
              value={values.price}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category_id">Loại:</label>
            <input
              type="text"
              name="category_id"
              className="form-control"
              placeholder="Nhập loại"
              onChange={handleChange}
              value={values.category_id}
              required
            />
          </div>
          <div className="form-group">
            <label>Thêm ảnh:</label>
            <div className="image-list">
              {values.images.map((image, index) => (
                <div key={index} className="image-item">
                  <input
                    type="text"
                    className="form-control image-input"
                    placeholder={`Liên kết ảnh ${index + 1}`}
                    value={image}
                    onChange={(e) => handleImageChange(e, index)}
                  />
                  {image && (
                    <img
                      src={image}
                      alt={`Product ${index}`}
                      className="preview-image"
                    />
                  )}
                  <button
                    type="button"
                    className="btn btn-danger btn-sm "
                    onClick={() => handleRemoveImage(index)}
                  >
                    Xóa
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-sm mb-2 add-image-btn"
            onClick={handleAddImage}
            disabled={values.images.length >= 3}
          >
            Thêm ảnh
          </button>
          <div className="form-group mt-3">
            <button className="btn btn-success me-2">Submit</button>
            <Link to="/products" className="btn btn-primary">
              Quay lại
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
