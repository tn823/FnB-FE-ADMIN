import { useEffect, useState } from "react";
import "./AreaTable.scss";

const TABLE_HEADS = ["Order ID", "Date", "Status", "Amount", "Actions"];

const AreaTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "https://node-be-api.vercel.app/api/orders"
        );
        const data = await response.json();
        setTableData(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Done";
      case 2:
        return "Doing";
      case 3:
        return "Waiting";
      default:
        return "Unknown";
    }
  };

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Latest Orders</h4>
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
            {tableData.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{formatDateTime(order.orderDate)}</td>
                <td>
                  <div className="dt-status">
                    <span
                      className={`dt-status-dot dot-${getStatusText(
                        order.status
                      )}`}
                    ></span>
                    <span className="dt-status-text">
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </td>
                <td>${parseFloat(order.totalPrice).toFixed(2)}</td>
                <td className="dt-cell-action">
                  <a
                    href={`/order-details/${order.id}`}
                    className="view-details-link"
                  >
                    View Details
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AreaTable;
