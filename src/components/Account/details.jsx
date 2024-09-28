import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Form, Input, Button, Typography, Layout } from "antd";
import axios from "axios";
import { ENDPOINTS, POSITION } from "../../constants/common";
import { ArrowLeftIcon } from "lucide-react";
import  DropdownList  from "../../components/drop-down-list";

const { Title, Text } = Typography;
const { Content } = Layout;

function AccountDetailsPage() {
  const [form] = Form.useForm();
  const { id } = useParams(); // Kiểm tra có ID để xác định sửa hay thêm mới
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [accountData, setAccountData] = useState(null);

  useEffect(() => {
    if (id) {
      // Nếu có ID, tức là sửa, gọi API để lấy dữ liệu
      axios
        .get(`${ENDPOINTS.ACCOUNTS}/${id}`)
        .then((res) => {
          setAccountData(res.data);
          form.setFieldsValue({...res.data, password: ""}); // Đổ dữ liệu vào form khi sửa
        })
        .catch((err) => console.log(err));
    }
  }, [id, form]);

  const onFinish = (values) => {
    setIsLoading(true);
    if (id) {
      // Nếu có ID, tức là đang sửa
      axios
        .put(`${ENDPOINTS.ACCOUNTS}/${id}`, values)
        .then(() => {
          navigate("/accounts");
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    } else {
      // Nếu không có ID, tức là đang thêm mới
      axios
        .post(ENDPOINTS.ACCOUNTS, values)
        .then(() => {
          navigate("/accounts");
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  };

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
          <Link to="/accounts">
            <ArrowLeftIcon size={18} />
            <Text style={{ marginLeft: "8px" }}>Quay lại</Text>
          </Link>
        </div>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Title level={2}>{id ? "SỬA TÀI KHOẢN" : "THÊM TÀI KHOẢN"}</Title>
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={accountData}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập tên tài khoản" }]}
          >
            <Input
              placeholder="Nhập tên tài khoản"
              disabled={!!id} //disable khi có id
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: id
                  ? "Vui lòng nhập mật khẩu cũ hoặc mật khẩu mới"
                  : "Vui lòng nhập mật khẩu",
              },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>
          <Form.Item
            label="Position"
            name="position"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập chức vụ",
              },
            ]}
          >
            <DropdownList
              dataSource={POSITION} // Truyền POSITION vào DropdownList
              placeholder="Chọn chức vụ"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {id ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}

export default AccountDetailsPage;
