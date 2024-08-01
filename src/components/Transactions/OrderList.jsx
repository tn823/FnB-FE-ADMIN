import axios from "axios";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import InfoOrder from "./InfoOrder";
import "./OrderList.css";

function OrderList() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("name");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const fetchOrders = () => {
    axios
      .get("https://node-be-api.vercel.app/api/orders")
      .then((res) => {
        setData(res.data);
        setErrorMessage("");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      fetchOrders();
    } else {
      axios
        .get(
          `https://node-be-api.vercel.app/api/orders/${searchOption}/${searchTerm}`
        )
        .then((res) => {
          if (res.data.length === 0) {
            setErrorMessage(
              `Không tìm thấy sản phẩm với ${searchOption} là "${searchTerm}"`
            );
            setData([]);
          } else {
            setData(res.data);
            setErrorMessage("");
          }
        })
        .catch((err) => {
          console.log(err);
          setData([]);
        });
    }
  }, [searchTerm, searchOption]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  const handleRowClick = (orderId) => {
    setSelectedOrderId(orderId);
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
    setSelectedOrderId(null);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "done";
      case 2:
        return "doing";
      case 3:
        return "waiting";
      default:
        return "unknown";
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Danh Sách Hóa Đơn</h1>
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Nhập từ khóa tìm kiếm..."
              value={searchTerm}
              onChange={handleChange}
            />
            <select
              className="form-select"
              value={searchOption}
              onChange={handleOptionChange}
            >
              <option value="name">Tìm theo tên</option>
              <option value="price">Tìm theo giá</option>
              <option value="category">Tìm theo loại</option>
            </select>
          </div>
          {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
        </div>
        {/* <div className="col-md-6">
          <div className="d-flex justify-content-end">
            <Link to="/createOrder" className="btn btn-success">
              Thêm mới +
            </Link>
          </div>
        </div> */}
      </div>
      <div>
        <table className="table table-striped">
          <thead className="order-title">
            <tr>
              <th>ID</th>
              <th>Ngày</th>
              <th>Tổng Tiền</th>
              <th>Ghi Chú</th>
              <th>Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((d, i) => (
                <tr
                  key={i}
                  className="order-item"
                  onClick={() => handleRowClick(d.id)}
                >
                  <td>{d.id}</td>
                  <td>{new Date(d.orderDate).toLocaleDateString()}</td>
                  <td>{d.totalPrice} VND</td>
                  <td>{d.note}</td>
                  <td>{getStatusText(d.status)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  Đang tải đơn hàng...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showOverlay && (
        <InfoOrder id={selectedOrderId} onClose={handleCloseOverlay} />
      )}
    </div>
  );
}

export default OrderList;
