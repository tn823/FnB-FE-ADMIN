import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Form, Input, Button, Typography, Layout, Row, Col } from "antd";
import axios from "axios";
import { ENDPOINTS } from "../../constants/common";
import { ArrowLeftIcon } from "lucide-react";
import DropdownList from "./../drop-down-list";

const { Title, Text } = Typography;
const { Content } = Layout;

function ToppingDetailPage() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [toppingData, setToppingData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchToppingData();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(ENDPOINTS.CATEGORIES);
      const fetchedCategories = res.data.map((category) => ({
        value: category.id,
        label: category.categoryName,
      }));
      setCategories(fetchedCategories);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchToppingData = async () => {
    try {
      const res = await axios.get(`${ENDPOINTS.TOPPINGS}/${id}`);
      const topping = res.data;
      setToppingData(topping);
      form.setFieldsValue({
        ...topping,
        categoryId: topping.categoryId,
        basePrice: formatCurrency(topping.basePrice),
      });
      await fetchProducts(topping.categoryId);
    } catch (err) {
      console.error("Error fetching topping data:", err);
    }
  };

  const fetchProducts = async (categoryId) => {
    try {
      const res = await axios.get(
        `${ENDPOINTS.PRODUCTS}/category/${categoryId}`
      );
      const fetchedProducts = res.data.map((product) => ({
        value: product.id,
        label: product.name,
      }));
      setProducts(fetchedProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const onFinish = async (values) => {
    setIsLoading(true);
    const formattedData = {
      productId: parseInt(values.productId, 10),
      name: values.name,
      fullName: "",
      basePrice: parseInt(parseCurrency(values.basePrice), 10),
      categoryId: values.categoryId,
    };

    try {
      if (id) {
        await axios.put(`${ENDPOINTS.TOPPINGS}/${id}`, formattedData);
      } else {
        await axios.post(ENDPOINTS.TOPPINGS, formattedData);
      }
      navigate("/toppings");
    } catch (err) {
      console.error("Error saving topping:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = async (value) => {
    form.setFieldsValue({ categoryId: value, productId: undefined });
    await fetchProducts(value);
  };

  const formatCurrency = (value) => {
    if (!value) return "";
    const number =
      typeof value === "string"
        ? parseFloat(value.replace(/[^\d.-]/g, ""))
        : value;
    return number.toLocaleString("vi-VN", { maximumFractionDigits: 0 });
  };

  const parseCurrency = (value) => {
    return parseInt(value.replace(/\D/g, ""), 10);
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
          <Link to="/toppings">
            <ArrowLeftIcon size={18} />
            <Text style={{ marginLeft: "8px" }}>Quay lại</Text>
          </Link>
        </div>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Title level={2}>{id ? "SỬA MÓN THÊM" : "THÊM MÓN THÊM"}</Title>
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={toppingData}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Tên món thêm"
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên món thêm" },
                ]}
              >
                <Input placeholder="Nhập tên món thêm" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Giá"
                name="basePrice"
                rules={[{ required: true, message: "Vui lòng nhập giá" }]}
              >
                <Input
                  placeholder="Nhập giá"
                  onChange={(e) => {
                    const formattedValue = formatCurrency(
                      parseCurrency(e.target.value)
                    );
                    form.setFieldsValue({ basePrice: formattedValue });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Danh mục"
                name="categoryId"
                rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
              >
                <DropdownList
                  dataSource={categories}
                  onChange={handleCategoryChange}
                  placeholder="Chọn danh mục"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Sản phẩm"
                name="productId"
                rules={[{ required: true, message: "Vui lòng chọn sản phẩm" }]}
              >
                <DropdownList
                  dataSource={products}
                  placeholder="Chọn sản phẩm"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item style={{ textAlign: "right", marginTop: "20px" }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {id ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}

export default ToppingDetailPage;
