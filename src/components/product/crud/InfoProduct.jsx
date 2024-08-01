import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./InfoProduct.scss";

function InfoProduct({ id, onClose }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (Number.isInteger(id) && id > 0) {
      axios
        .get(`https://node-be-api.vercel.app/api/products/${id}`)
        .then((res) => {
          setProduct(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      console.error("ID sản phẩm không hợp lệ:", id);
    }
  }, [id]);

  if (!product) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="info-product-overlay" onClick={onClose}>
      <div
        className="info-product-container"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="info-title">Thông tin sản phẩm</h2>
        <div className="info-details">
          <div className="info-field">
            <span className="info-label">Tên:</span>
            <span className="info-value">{product.name}</span>
          </div>
          <div className="info-field">
            <span className="info-label">Mô tả:</span>
            <span className="info-value">{product.description}</span>
          </div>
          <div className="info-field">
            <span className="info-label">Giá:</span>
            <span className="info-value">{product.basePrice} VNĐ</span>
          </div>
          <div className="info-field">
            <span className="info-label">Loại:</span>
            <span className="info-value">{product.Category.categoryName}</span>
          </div>
          {product.ProductImages && product.ProductImages.length > 0 && (
            <div className="info-field">
              <span className="info-label">Hình ảnh:</span>
              <div className="info-images">
                {product.ProductImages.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`Product ${index}`}
                    className="info-image"
                  />
                ))}
              </div>
            </div>
          )}
          <div className="info-actions">
            <button onClick={onClose} className="btn btn-primary btn-back">
              Quay lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

InfoProduct.propTypes = {
  id: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default InfoProduct;
