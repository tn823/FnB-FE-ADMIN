import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Form, Input, Button, Typography, Layout, Image, Row, Col } from "antd";
import axios from "axios";
import { ENDPOINTS } from "../../constants/common";
import { ArrowLeftIcon } from "lucide-react";
import DropdownList from './../drop-down-list';


const { Title, Text } = Typography;
const { Content } = Layout;

function ProductDetailsPage() {
  const [form] = Form.useForm();
  const { id } = useParams(); // Kiểm tra có ID để xác định sửa hay thêm mới
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // State cho URL ảnh
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    if (id) {
      // Nếu có ID, tức là sửa, gọi API để lấy dữ liệu
      axios
        .get(`${ENDPOINTS.PRODUCTS}/${id}`)
        .then((res) => {
          const product = res.data;
          // Đặt giá trị mặc định cho imageUrl từ product data
          const initialImageUrl = product?.ProductImages?.[0]?.url || "";
          setProductData(product);
          setImageUrl(initialImageUrl); // Đặt URL ảnh
          form.setFieldsValue({
            ...product,
            categoryId: product.Category?.id,
            toppings: product.toppings || [], // Gán topping nếu có
            imageUrl: initialImageUrl, // Đồng bộ giá trị imageUrl với form
          });
        })
        .catch((err) => console.log(err));
    }
  }, [id, form]);

  const fetchCategories = () => {
    axios
    .get(ENDPOINTS.CATEGORIES)
    .then((res) => {
      setCategories(
        res.data.map((category) => ({
          value: category.id,
          label: category.categoryName,
        }))
      );
    })
    .catch((err) => console.log(err))
  }

  const onFinish = (values) => {
    setIsLoading(true);
    const formattedData = {
      code: "", // Thêm trường code
      name: values.name,
      fullName: "", // Thêm trường fullName
      description: values.description,
      basePrice: parseFloat(values.basePrice).toFixed(2), // Đảm bảo giá là số
      categoryId: values.categoryId, // Gán categoryId từ productData
      images: [{ url: values.imageUrl, position: 1 }], // Gán hình ảnh
      toppings: values.toppings || [], // Đảm bảo toppings được gửi đúng định dạng
    };

    if (id) {
      axios
        .put(`${ENDPOINTS.PRODUCTS}/${id}`, formattedData)
        .then(() => {
          navigate("/products");
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    } else {
      axios
        .post(ENDPOINTS.PRODUCTS, formattedData)
        .then(() => {
          navigate("/products");
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  };
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value); // Cập nhật URL ảnh mỗi khi người dùng thay đổi input
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
          <Link to="/products">
            <ArrowLeftIcon size={18} />
            <Text style={{ marginLeft: "8px" }}>Quay lại</Text>
          </Link>
        </div>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Title level={2}>{id ? "SỬA SẢN PHẨM" : "THÊM SẢN PHẨM"}</Title>
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={productData}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Tên sản phẩm"
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên sản phẩm" },
                ]}
              >
                <Input placeholder="Nhập tên sản phẩm" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Giá"
                name="basePrice"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập giá",
                  },
                ]}
              >
                <Input placeholder="Nhập giá" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Mô tả" name="description">
                <Input placeholder="Mô tả" />
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
                  value={form.getFieldValue("categoryId")}
                  onChange={(value) =>
                    form.setFieldsValue({ categoryId: value })
                  }
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="URL ảnh"
                name="imageUrl"
                rules={[{ required: true, message: "Vui lòng nhập URL ảnh" }]}
              >
                <Input
                  placeholder="Nhập URL ảnh"
                  value={imageUrl} // Thêm giá trị ảnh hiện tại
                  onChange={handleImageUrlChange} // Lắng nghe sự thay đổi URL ảnh
                />
              </Form.Item>
            </Col>

            <Col span={12} style={{ textAlign: "left", marginBottom: "20px" }}>
              <Image
                src={imageUrl || "https://via.placeholder.com/150"} // Hiển thị ảnh từ state
                alt={productData?.name}
                width={150}
                height={150}
                style={{ marginBottom: "20px" }}
              />
            </Col>

            {/* Thêm phần hiển thị danh sách Topping */}
            <Col span={12}>
              <Title level={4}>Danh sách Topping</Title>
              {productData?.Toppings && productData.Toppings.length > 0 ? (
                productData.Toppings.map((topping) => (
                  <div key={topping.id}>
                    <Text strong>{topping.name}</Text> - {topping.basePrice}₫
                  </div>
                ))
              ) : (
                <Text>Không có topping nào</Text>
              )}
            </Col>
          </Row>
          <Form.Item style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {id ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}

export default ProductDetailsPage;
