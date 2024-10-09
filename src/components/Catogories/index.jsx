import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Input, Select, Row, Col, Typography, Layout } from "antd";
import axios from "axios";
import { ENDPOINTS } from "../../constants/common";
import { Trash2 } from "lucide-react";
import { Group } from "@mantine/core";
import AddButton from "../Button/AddButton";
import ConfirmDeleteModal from "../../modal/delete";

const { Search } = Input;
const { Option } = Select;
const { Title } = Typography;
const { Content } = Layout;

function CategoryPage() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("name");
  const [errorMessage, setErrorMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false); // For modal visibility
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Track the category to delete
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
    setSelectedCategoryId(id); // Set the category to delete
    setModalVisible(true); // Show the modal
  };

  const confirmDelete = () => {
    axios
      .delete(`${ENDPOINTS.CATEGORIES}/${selectedCategoryId}`)
      .then((res) => {
        console.log(res.data.message);
        fetchCategories();
        setModalVisible(false); // Hide the modal after deletion
      })
      .catch((err) => {
        console.error("Lỗi khi xóa danh mục:", err);
      });
  };

  const handleCancel = () => {
    setModalVisible(false); // Hide modal when cancelled
  };

  const handleRowClick = (id) => {
    navigate(`/categories/update/${id}`);
  };

  const columns = [
    {
      title: <span style={{ fontSize: "16px", fontWeight: "bold" }}>ID</span>,
      dataIndex: "id",
      key: "id",
    },
    {
      title: (
        <span style={{ fontSize: "16px", fontWeight: "bold" }}>
          Tên Danh Mục
        </span>
      ),
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: (
        <span style={{ fontSize: "16px", fontWeight: "bold" }}>Chức Năng</span>
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
            <Trash2
              type="danger"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(record.id); // Show modal when delete icon is clicked
              }}
            >
              Xóa
            </Trash2>
          </div>
        </Group>
      ),
    },
  ];

  return (
    <Layout style={{ padding: "20px" }}>
      <Content>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Title level={2}>QUẢN LÝ DANH MỤC</Title>
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
            <Link to="/categories/createcategory">
              <AddButton onClick={() => {}} label="Thêm mới +" />
            </Link>
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
        {/* Add the confirm delete modal */}
        <ConfirmDeleteModal
          visible={modalVisible}
          onConfirm={confirmDelete}
          onCancel={handleCancel}
          title="Xác nhận xóa danh mục"
        />
      </Content>
    </Layout>
  );
}

export default CategoryPage;
