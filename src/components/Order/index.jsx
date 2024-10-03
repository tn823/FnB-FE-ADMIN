import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Input, Row, Col, Typography, Layout } from "antd";
import axios from "axios";
import { ENDPOINTS } from "../../constants/common";
import { Printer } from "lucide-react";
import { Group } from "@mantine/core";

const { Search } = Input;
const { Title } = Typography;
const { Content } = Layout;

function OrderPage() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const formatCurrency = (value) => {
    if (!value) return "";
    const number =
      typeof value === "string"
        ? parseFloat(value.replace(/[^\d.-]/g, ""))
        : value;
    return number.toLocaleString("vi-VN", { maximumFractionDigits: 0 });
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const formattedDate = date.toLocaleDateString("vi-VN");
    const formattedTime = date.toLocaleTimeString("vi-VN");
    return `${formattedTime} ${formattedDate}`;
  };

  const fetchOrders = () => {
    axios
      .get(ENDPOINTS.ORDERS)
      .then((res) => {
        const formattedData = res.data.map((order) => ({
          ...order,
          formattedBasePrice: formatCurrency(order.totalPrice),
          formattedOrderDate: formatDateTime(order.orderDate),
        }));
        setData(formattedData);
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
      const url = `${ENDPOINTS.ORDERS}/${searchTerm}`;

      axios
        .get(url)
        .then((res) => {
          const resultData = Array.isArray(res.data) ? res.data : [res.data];
          if (resultData.length === 0) {
            setErrorMessage(`Không tìm thấy hóa đơn với ID là "${searchTerm}"`);
            setData([]);
          } else {
            const formattedData = resultData.map((order) => ({
              ...order,
              formattedBasePrice: formatCurrency(order.totalPrice),
              formattedOrderDate: formatDateTime(order.orderDate),
            }));
            setData(formattedData);
            setErrorMessage("");
          }
        })
        .catch((err) => {
          console.log(err);
          setData([]);
        });
    }
  }, [searchTerm]);

  const handleRowClick = (id) => {
    navigate(`/orders/${id}`);
  };

  const columns = [
    {
      title: (
        <span style={{ fontSize: "16px", fontWeight: "bold" }}>Mã HĐ</span>
      ),
      dataIndex: "id",
      key: "id",
    },
    {
      title: (
        <span style={{ fontSize: "16px", fontWeight: "bold" }}>Kiểu thanh toán</span>
      ),
      dataIndex: "paymentType",
      key: "paymentType",
    },
    {
      title: (
        <span style={{ fontSize: "16px", fontWeight: "bold" }}>Trạng Thái</span>
      ),
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        let label;

        switch (status) {
          case 1:
            color = "orange ";
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

        return (
          <span
            style={{
              color: color,
              fontWeight: "bold",
            }}
          >
            {label}
          </span>
        );
      },
    },
    {
      title: (
        <span style={{ fontSize: "16px", fontWeight: "bold" }}>Thời Gian</span>
      ),
      dataIndex: "formattedOrderDate",
      key: "orderDate",
    },
    {
      title: (
        <span style={{ fontSize: "16px", fontWeight: "bold" }}>Ghi Chú</span>
      ),
      dataIndex: "note",
      key: "note",
    },
    {
      title: (
        <span style={{ fontSize: "16px", fontWeight: "bold" }}>Tổng Tiền</span>
      ),
      dataIndex: "formattedBasePrice",
      key: "totalPrice",
      render: (formattedBasePrice) => `${formattedBasePrice}`,
    },
    {
      title: (
        <span style={{ fontSize: "16px", fontWeight: "bold" }}>Tùy chỉnh</span>
      ),
      key: "actions",
      width: "150px",
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Group justify="center" gap={16}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Printer
              type="danger"
              onClick={(e) => {
                e.stopPropagation();
                 navigate(`/orders/${record.id}`);
              }}
            >
              Xóa
            </Printer>
          </div>
        </Group>
      ),
    },
  ];

  return (
    <Layout style={{ padding: "20px" }}>
      <Content>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Title level={2}>QUẢN LÝ HÓA ĐƠN</Title>
        </div>
        <Row
          justify="center"
          align="middle"
          gutter={[16, 16]}
          style={{ marginBottom: "20px" }}
        >
          <Col>
            <Search
              placeholder="Nhập mã hóa đơn..."
              onSearch={(value) => setSearchTerm(value)}
              enterButton
              style={{ width: 300 }}
              allowClear
            />
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          onRow={(record) => ({
            onClick: () => handleRowClick(record.id),
          })}
          pagination={{ pageSize: 10 }}
          loading={!data.length && !errorMessage}
        />
        {errorMessage && (
          <div style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
            {errorMessage}
          </div>
        )}
      </Content>
    </Layout>
  );
}

export default OrderPage;
