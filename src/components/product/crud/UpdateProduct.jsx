import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateProduct.scss";

function UpdateProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    ProductImages: [],
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://node-be-api.vercel.app/api/products${id}`)
      .then((res) => {
        const productData = res.data;
        if (productData) {
          setProduct(productData);
        } else {
          console.error("Không tìm thấy sản phẩm có ID:", id);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const updatedProduct = {
      ...product,
      images: product.ProductImages.map((img) => img.url),
    };

    axios
      .put(`http://localhost:3000/api/updateProduct/${id}`, updatedProduct)
      .then((res) => {
        console.log("Sản phẩm đã được cập nhật thành công:", res.data);
        navigate("/products");
      })
      .catch((err) => {
        console.log("Lỗi khi cập nhật sản phẩm:", err.response.data);
      });
  };

  const handleImageChange = (index, e) => {
    const newImages = [...product.ProductImages];
    newImages[index] = { ...newImages[index], url: e.target.value };
    setProduct({ ...product, ProductImages: newImages });
  };

  const handleAddImage = () => {
    if (product.ProductImages.length < 4) {
      setProduct({
        ...product,
        ProductImages: [...product.ProductImages, { url: "" }],
      });
    } else {
      alert("Bạn chỉ có thể thêm tối đa 3 ảnh cho mỗi sản phẩm.");
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = product.ProductImages.filter((_, i) => i !== index);
    setProduct({ ...product, ProductImages: newImages });
  };

  if (!product) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="update-product-container">
      <div className="update-product-form">
        <h1 className="form-title">Chỉnh sửa sản phẩm</h1>
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="name">Tên:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Nhập tên"
              onChange={handleChange}
              value={product.name}
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
              value={product.description}
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
              value={product.price}
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
              value={product.categoryName}
              required
            />
          </div>
          <div className="form-group">
            <label>Thêm ảnh:</label>
            <div className="image-list">
              {product.ProductImages.map((image, index) => (
                <div key={index} className="image-item">
                  <input
                    type="text"
                    className="form-control image-input"
                    placeholder={`Liên kết ảnh ${index + 1}`}
                    value={image.url}
                    onChange={(e) => handleImageChange(index, e)}
                  />
                  {image.url && (
                    <img
                      src={image.url}
                      alt={`Product ${index}`}
                      className="preview-image"
                    />
                  )}
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
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
            disabled={product.ProductImages.length >= 3}
          >
            Thêm ảnh
          </button>
          <div className="form-group mt-3">
            <button className="btn btn-success me-2">Lưu thay đổi</button>
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="btn btn-primary"
            >
              Quay lại
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;
