import { useEffect, useState } from "react";
import "./style/AreaTable.css";
import { ENDPOINTS } from "../../../constants/common";


const TABLE_HEADS = ["Mã HĐ", "Thời gian", "Trạng thái", "Giá", ];

const AreaTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(ENDPOINTS.ORDERS);
        const data = await response.json();
        const latestOrders = data.slice(0, 10);  // Giới hạn 10 đơn hàng mới nhất
        setTableData(latestOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  };

  const formatCurrency = (amount) => {
    return amount
      .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      .replace("₫", "")
      .trim();
  };

  const getStatusInfo = (status) => {
    let color, label;
    switch (status) {
      case 1:
        color = "orange";
        label = "Đang đợi xử lý";
        break;
      case 2:
        color = "green";
        label = "Thanh toán thành công";
        break;
      case 3:
        color = "red";
        label = "Đơn đã hủy";
        break;
      default:
        color = "gray";
        label = "Không xác định";
    }
    return { color, label };
  };

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">
          <b>Đơn Mới Nhất</b>
        </h4>
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((order) => {
              const { color, label } = getStatusInfo(order.status);
              return (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{formatDateTime(order.orderDate)}</td>
                  <td>
                    <div className="dt-status" style={{color: color}}>
                      <span
                        className={`dt-status-dot dot-${color}`}
                        style={{ backgroundColor: color }}
                      ></span>
                      <span className="dt-status-text">{label}</span>
                    </div>
                  </td>
                  <td>{formatCurrency(parseFloat(order.totalPrice))}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AreaTable;
