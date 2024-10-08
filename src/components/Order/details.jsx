import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Form,
  Input,
  Typography,
  Layout,
  Table,
  Spin,
  Divider,
  message,
  Button,
  Row,
  Col
} from "antd";
import axios from "axios";
import { ENDPOINTS } from "../../constants/common";
import { ArrowLeftIcon, PrinterIcon } from "lucide-react";
import ConfirmButton from "../Button/ConfirmButton";
import CancelButton from "../Button/CancelButton";
import "./style/details.css"

const { Title, Text } = Typography;
const { Content } = Layout;

function OrderDetailsPage() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const componentRef = useRef();

  
const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);

  const formattedDate = date.toLocaleDateString("vi-VN", {
    timeZone: "UTC", // Đặt đúng múi giờ Việt Nam
  });

  const formattedTime = date.toLocaleTimeString("vi-VN", {
    timeZone: "UTC", // Đặt đúng múi giờ Việt Nam
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return `${formattedTime} ${formattedDate}`;
};
  
  useEffect(() => {
    if (id) {
      setIsLoading(true);
      axios
        .get(`${ENDPOINTS.ORDERS}/${id}`)
        .then((res) => {
          setOrderData(res.data);
          form.setFieldsValue({
            id: res.data.id,
            orderDate: formatDateTime(res.data.orderDate),
            totalPrice: formatCurrency(res.data.totalPrice),
            note: res.data.note || "Không có ghi chú",
            status: getStatusLabel(res.data.status),
            paymentType: res.data.paymentType,
          });
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }, [id, form]);

  const formatCurrency = (value) => {
    if (!value) return "";
    const number =
      typeof value === "string"
        ? parseFloat(value.replace(/[^\d.-]/g, ""))
        : value;
    return number.toLocaleString("vi-VN", { maximumFractionDigits: 0 });
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 1:
        return "Đang đợi xử lý";
      case 2:
        return "Thanh toán thành công";
      case 3:
        return "Đã hủy";
      default:
        return "Không xác định";
    }
  };

  const handleConfirmPayment = () => {
    setIsLoading(true);
    axios
      .put(`${ENDPOINTS.ORDERS}/status/${id}`, { status: 2 })
      .then(() => {
        message.success("Đơn hàng đã được cập nhật thành công.");
        axios.get(`${ENDPOINTS.ORDERS}/${id}`).then((res) => {
          setOrderData(res.data);
          form.setFieldsValue({
            status: getStatusLabel(res.data.status),
          });
        });
      })
      .catch((err) => {
        console.log(err);
        message.error("Có lỗi xảy ra khi cập nhật đơn hàng.");
      })
      .finally(() => setIsLoading(false));
  };

  const handleCancelOrder = () => {
    setIsLoading(true);
    axios
      .put(`${ENDPOINTS.ORDERS}/status/${id}`, { status: 3 })
      .then(() => {
        message.success("Đơn hàng đã được hủy.");
        axios.get(`${ENDPOINTS.ORDERS}/${id}`).then((res) => {
          setOrderData(res.data);
          form.setFieldsValue({
            status: getStatusLabel(res.data.status),
          });
        });
      })
      .catch((err) => {
        console.log(err);
        message.error("Có lỗi xảy ra khi hủy đơn hàng.");
      })
      .finally(() => setIsLoading(false));
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
        render: (toppings) =>
          toppings.map((topping, index) => (
            <div key={index}>
              {topping.name} - SL: {topping.quantity} - Giá: {topping.basePrice}
            </div>
          )),
      },
    ];

    if (isLoading) {
      return (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Spin size="large" />
        </div>
      );
    }

    if (!orderData) {
      return (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Text>Không có dữ liệu đơn hàng</Text>
        </div>
      );
    }

    return (
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
      />
    );
  };

  const renderButtons = () => {
    if (orderData.status === 1) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <ConfirmButton
            onConfirm={handleConfirmPayment}
            isLoading={isLoading}
          />
          <CancelButton onCancel={handleCancelOrder} isLoading={isLoading} />
        </div>
      );
    } else if (orderData.status === 2) {
      return (
        <Button
          icon={<PrinterIcon size={18} />}
          style={{ marginTop: "20px" }}
        >
          In hóa đơn
        </Button>
      );
    } else {
      return null;
    }
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!orderData) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Text>Không có dữ liệu đơn hàng</Text>
      </div>
    );
  }

  return (
    <Layout style={{ padding: "20px" }}>
      <Content>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Link to="/orders">
            <ArrowLeftIcon size={18} />
            <Text style={{ marginLeft: "8px" }}>Quay lại</Text>
          </Link>
        </div>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Title level={2}>Chi Tiết Đơn Hàng</Title>
        </div>
        <div ref={componentRef} style={{ padding: "20px", background: "#fff" }}>
          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Mã HĐ" name="id">
                  <Input disabled className="custom-disabled-input" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Kiểu thanh toán" name="paymentType">
                  <Input disabled className="custom-disabled-input" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Ngày đặt hàng" name="orderDate">
                  <Input disabled className="custom-disabled-input"/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Tổng tiền" name="totalPrice">
                  <Input disabled className="custom-disabled-input"/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Ghi chú" name="note">
                  <Input disabled className="custom-disabled-input"/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Trạng thái" name="status">
                  <Input disabled className="custom-disabled-input"/>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Divider />
          <Title level={4}>Chi Tiết Sản Phẩm</Title>
          {renderOrderDetailsTable()}
        </div>
        {renderButtons()}
      </Content>
    </Layout>
  );
}

export default OrderDetailsPage;
