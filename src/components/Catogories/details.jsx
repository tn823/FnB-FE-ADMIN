import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Form, Input, Button, Typography, Layout } from "antd";
import axios from "axios";
import { ENDPOINTS } from "../../constants/common";
import { ArrowLeftIcon } from "lucide-react";

const { Title, Text } = Typography;
const { Content } = Layout;

function CategoryDetails() {
  const [form] = Form.useForm();
  const { id } = useParams(); // Kiểm tra có ID để xác định sửa hay thêm mới
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    if (id) {
      // Nếu có ID, tức là sửa, gọi API để lấy dữ liệu
      axios
        .get(`${ENDPOINTS.CATEGORIES}/${id}`)
        .then((res) => {
          setCategoryData(res.data);
          form.setFieldsValue(res.data); // Đổ dữ liệu vào form khi sửa
        })
        .catch((err) => console.log(err));
    }
  }, [id, form]);

  const onFinish = (values) => {
    setIsLoading(true);
    if (id) {
      // Nếu có ID, tức là đang sửa
      axios
        .put(`${ENDPOINTS.CATEGORIES}/${id}`, values)
        .then(() => {
          navigate("/categories");
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    } else {
      // Nếu không có ID, tức là đang thêm mới
      axios
        .post(ENDPOINTS.CATEGORIES, values)
        .then(() => {
          navigate("/categories");
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
          <Link to="/categories">
            <ArrowLeftIcon size={18} />
            <Text style={{marginLeft: "8px"}}>Quay lại</Text>
          </Link>
        </div>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Title level={2}>{id ? "Sửa Danh Mục" : "Thêm Danh Mục"}</Title>
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={categoryData}
        >
          <Form.Item
            label="Tên danh mục"
            name="categoryName"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
          >
            <Input placeholder="Nhập tên danh mục" />
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

export default CategoryDetails;
