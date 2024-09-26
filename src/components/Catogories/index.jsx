import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  Button,
  Input,
  Select,
  Row,
  Col,
  Typography,
  Layout,
} from "antd";
import axios from "axios";
import { ENDPOINTS } from "../../constants/common";

const { Search } = Input;
const { Option } = Select;
const { Title } = Typography;
const { Content } = Layout;

function CategoryList() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("name");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const fetchCategories = () => {
    axios
      .get(ENDPOINTS.CATEGORIES)
      .then((res) => {
        setData(res.data);
        setErrorMessage("");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

useEffect(() => {
  if (searchTerm === "") {
    fetchCategories(); 
  } else {
    const url =
      searchOption === "id"
        ? `${ENDPOINTS.CATEGORIES}/${searchTerm}` 
        : `${ENDPOINTS.CATEGORIES}/${searchOption}/${searchTerm}`; 

    axios
      .get(url)
      .then((res) => {
        const resultData = Array.isArray(res.data) ? res.data : [res.data]; 
        if (resultData.length === 0) {
          setErrorMessage(
            `Không tìm thấy danh mục với ${searchOption} là "${searchTerm}"`
          );
          setData([]);
        } else {
          setData(resultData); 
          setErrorMessage("");
        }
      })
      .catch((err) => {
        console.log(err);
        setData([]);
      });
  }
}, [searchTerm, searchOption]);

  const handleDelete = (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa danh mục này không?")) {
      axios
        .delete(`${ENDPOINTS.CATEGORIES}/${id}`)
        .then((res) => {
          console.log(res.data.message);
          fetchCategories();
        })
        .catch((err) => {
          console.error("Lỗi khi xóa danh mục:", err);
        });
    }
  };

  const handleRowClick = (id) => {
    navigate(`/categories/update/${id}`);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "categoryId",
    },
    {
      title: "Tên Danh Mục",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Tùy chỉnh",
      key: "actions",
      render: (_, record) => (
        <Button
          type="danger"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(record.id);
          }}
        >
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <Layout style={{ padding: "20px" }}>
      <Content>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Title level={2}>Quản lý Danh Mục</Title>
        </div>
        <Row
          justify="center"
          align="middle"
          gutter={[16, 16]}
          style={{ marginBottom: "20px" }}
        >
          <Col>
            <Search
              placeholder="Nhập từ khóa tìm kiếm..."
              onSearch={(value) => setSearchTerm(value)}
              enterButton
              style={{ width: 300, marginRight: 10 }}
              allowClear
            />
          </Col>
          <Col>
            <Select
              value={searchOption}
              onChange={(value) => setSearchOption(value)}
              style={{ width: 200 }}
            >
              <Option value="name">Tìm Theo Tên Danh Mục</Option>
              <Option value="id">Tìm Theo ID</Option>
            </Select>
          </Col>
          <Col>
            <Link to="/products/createproduct">
              <Button type="primary" style={{ marginLeft: "20px" }}>
                Thêm mới +
              </Button>
            </Link>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={data}
          rowKey="categoryId"
          onRow={(record) => ({
            onClick: () => handleRowClick(record.categoryId),
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

export default CategoryList;
