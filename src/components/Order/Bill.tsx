import React from "react";
import { Typography, Divider, Table } from "antd";

const { Title, Text } = Typography;

interface Topping {
  name: string;
  quantity: number;
  basePrice: number;
}

interface OrderDetail {
  name: string;
  quantity: number;
  basePrice: number;
  OrderDetailToppings: Topping[];
}

interface OrderData {
  id: string;
  orderDate: string;
  totalPrice: number;
  note?: string;
  status: string;
  OrderDetails: OrderDetail[];
}

interface BillProps {
  orderData: OrderData;
}

const Bill = React.forwardRef<HTMLDivElement, BillProps>(({ orderData }, ref) => {
  const formatCurrency = (value: number): string => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const renderOrderDetailsTable = () => {
    const dataSource = orderData.OrderDetails.map((detail, index) => ({
      key: index,
      name: detail.name,
      quantity: detail.quantity,
      basePrice: formatCurrency(detail.basePrice),
      toppings: detail.OrderDetailToppings.map((topping) => ({
        name: topping.name,
        quantity: topping.quantity,
        basePrice: formatCurrency(topping.basePrice),
      })),
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
        dataIndex: "basePrice",
        key: "basePrice",
      },
      {
        title: "Topping",
        dataIndex: "toppings",
        key: "toppings",
        render: (toppings: Topping[]) =>
          toppings.map((topping, index) => (
            <div key={index}>
              {topping.name} - SL: {topping.quantity} - Giá: {topping.basePrice}
            </div>
          )),
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
    <div ref={ref} style={{ padding: "20px", background: "#fff" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Hóa Đơn Bán Hàng
      </Title>
      <Divider />
      <div>
        <Text strong>Mã HĐ:</Text> {orderData.id}
      </div>
      <div>
        <Text strong>Ngày đặt hàng:</Text> {orderData.orderDate}
      </div>
      <div>
        <Text strong>Tổng tiền:</Text> {formatCurrency(orderData.totalPrice)}
      </div>
      <div>
        <Text strong>Ghi chú:</Text> {orderData.note || "Không có ghi chú"}
      </div>
      <div>
        <Text strong>Trạng thái:</Text> {orderData.status}
      </div>
      <Divider />
      <Title level={4}>Chi Tiết Sản Phẩm</Title>
      {renderOrderDetailsTable()}
    </div>
  );
});

export default Bill;
