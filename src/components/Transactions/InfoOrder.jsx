import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./InfoOrder.scss";

function InfoOrder({ id, onClose }) {
  const [order, setOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedOrder, setUpdatedOrder] = useState(null);

  useEffect(() => {
    if (Number.isInteger(id) && id > 0) {
      axios
        .get(`https://node-be-api.vercel.app/api/orders/${id}`)
        .then((res) => {
          setOrder(res.data);
          setUpdatedOrder(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      console.error("ID hóa đơn không hợp lệ:", id);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    axios
      .put(`https://node-be-api.vercel.app/api/orders/${id}`, updatedOrder)
      .then((res) => {
        setOrder(res.data);
        setIsEditing(false);
      })
      .catch((err) => console.log(err));
  };

  if (!order) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="info-order-overlay" onClick={onClose}>
      <div
        className="info-order-container"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="info-title">Thông tin hóa đơn</h2>
        <div className="info-details">
          <div className="info-field">
            <span className="info-label">Ngày đặt:</span>
            {isEditing ? (
              <input
                type="datetime-local"
                name="orderDate"
                value={new Date(updatedOrder.orderDate)
                  .toISOString()
                  .substring(0, 16)}
                onChange={handleChange}
              />
            ) : (
              <span className="info-value">
                {new Date(order.orderDate).toLocaleString()}
              </span>
            )}
          </div>
          <div className="info-field">
            <span className="info-label">Tổng giá:</span>
            {isEditing ? (
              <input
                type="number"
                name="totalPrice"
                value={updatedOrder.totalPrice}
                onChange={handleChange}
              />
            ) : (
              <span className="info-value">{order.totalPrice} VNĐ</span>
            )}
          </div>
          <div className="info-field">
            <span className="info-label">Ghi chú:</span>
            {isEditing ? (
              <input
                type="text"
                name="note"
                value={updatedOrder.note}
                onChange={handleChange}
              />
            ) : (
              <span className="info-value">{order.note}</span>
            )}
          </div>
          <div className="info-field">
            <span className="info-label">Trạng thái:</span>
            {isEditing ? (
              <select
                name="status"
                value={updatedOrder.status}
                onChange={handleChange}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            ) : (
              <span className="info-value">{order.status}</span>
            )}
          </div>
          <div className="info-field">
            <span className="info-label">Chi tiết đơn hàng:</span>
            <div className="info-order-details">
              {order.OrderDetails.map((detail) => (
                <div key={detail.id} className="info-order-detail">
                  <span className="info-detail-name">{detail.name}</span>
                  <span className="info-detail-quantity">
                    x{detail.quantity}
                  </span>
                  <span className="info-detail-price">
                    {detail.basePrice} VNĐ
                  </span>
                  {detail.OrderDetailToppings &&
                    detail.OrderDetailToppings.length > 0 && (
                      <div className="info-detail-toppings">
                        <span className="info-label">Toppings:</span>
                        <ul>
                          {detail.OrderDetailToppings.map((topping) => (
                            <li key={topping.id}>
                              {topping.name} x{topping.quantity} (
                              {topping.basePrice} VNĐ)
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
          <div className="info-actions">
            {isEditing ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="btn btn-primary btn-save"
                >
                  Lưu
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn btn-secondary btn-cancel"
                >
                  Hủy
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-primary btn-edit"
              >
                Chỉnh sửa
              </button>
            )}
            <button onClick={onClose} className="btn btn-primary btn-back">
              Quay lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

InfoOrder.propTypes = {
  id: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default InfoOrder;
