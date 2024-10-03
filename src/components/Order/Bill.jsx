import { useRef } from "react";
import PropTypes from "prop-types";
import { Typography, Divider, Table } from "antd";

const { Title, Text } = Typography;

const Bill = ({ order }) => {
  const componentRef = useRef();

  const formatCurrency = (value) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const renderOrderDetailsTable = () => {
    const dataSource = order.OrderDetails.map((detail, index) => ({
      key: index,
      name: detail.name,
      quantity: detail.quantity,
      price: formatCurrency(detail.basePrice),
    }));

    const columns = [
      {
        title: "Tên sản phẩm",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Số lượng",
        dataIndex: "quantity",
        key: "quantity",
      },
      {
        title: "Giá",
        dataIndex: "price",
        key: "price",
      },
    ];

    return (
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
      />
    );
  };

  return (
    <div
      ref={componentRef}
      style={{ padding: "20px", backgroundColor: "#fff" }}
    >
      <Title level={2} style={{ textAlign: "center" }}>
        Hóa Đơn Bán Hàng
      </Title>
      <Divider />
      <div>
        <Text strong>Mã đơn hàng:</Text> {order.id}
      </div>
      <div>
        <Text strong>Ngày đặt hàng:</Text>{" "}
        {new Date(order.orderDate).toLocaleString("vi-VN")}
      </div>
      <div>
        <Text strong>Tổng tiền:</Text> {formatCurrency(order.totalPrice)}
      </div>
      <Divider />
      {renderOrderDetailsTable()}
      <Divider />
      <div style={{ textAlign: "right" }}>
        <Text>Xin cảm ơn quý khách!</Text>
      </div>
    </div>
  );
};

Bill.propTypes = {
  order: PropTypes.object.isRequired,
};

export default Bill;
