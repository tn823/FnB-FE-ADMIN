import { useEffect, useState } from "react";
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

function ToppingPage() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("name");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTopping, setSelectedTopping] = useState(null);
  const navigate = useNavigate();

  const formatCurrency = (value) => {
    if (!value) return "";
    // Ensure value is a number
    const number =
      typeof value === "string"
        ? parseFloat(value.replace(/[^\d.-]/g, ""))
        : value;
    // Format with thousands separator and no decimal places
    return number.toLocaleString("vi-VN", { maximumFractionDigits: 0 });
  };

  const fetchToppings = () => {
    axios
      .get(ENDPOINTS.TOPPINGS)
      .then((res) => {
        const formattedData = res.data.map((topping) => ({
          ...topping,
          formattedBasePrice: formatCurrency(topping.basePrice),
        }));
        setData(formattedData);
        setErrorMessage("");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchToppings();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      fetchToppings();
    } else {
      const url =
        searchOption === "id"
          ? `${ENDPOINTS.TOPPINGS}/${searchTerm}`
          : `${ENDPOINTS.TOPPINGS}/${searchOption}/${searchTerm}`;

      axios
        .get(url)
        .then((res) => {
          const resultData = Array.isArray(res.data) ? res.data : [res.data];
          if (resultData.length === 0) {
            setErrorMessage(
              `Không tìm thấy món thêm với ${searchOption} là "${searchTerm}"`
            );
            setData([]);
          } else {
            const formattedData = resultData.map((topping) => ({
              ...topping,
              formattedBasePrice: formatCurrency(topping.basePrice),
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
  }, [searchTerm, searchOption]);

  const showDeleteConfirm = (topping) => {
    setSelectedTopping(topping);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTopping) {
      axios
        .delete(`${ENDPOINTS.TOPPINGS}/${selectedTopping.id}`)
        .then(() => {
          fetchToppings();
        })
        .catch((err) => {
          console.error("Lỗi khi xóa món thêm:", err);
        });
    }
    setIsModalVisible(false);
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
    setSelectedTopping(null);
  };

  const handleRowClick = (id) => {
    navigate(`/toppings/update/${id}`);
  };

  const columns = [
    {
      title: <span style={{ fontSize: "16px", fontWeight: "bold" }}>ID</span>,
      dataIndex: "id",
      key: "id",
    },
    {
      title: <span style={{ fontSize: "16px", fontWeight: "bold" }}>Tên</span>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <span style={{ fontSize: "16px", fontWeight: "bold" }}>Giá</span>,
      dataIndex: "formattedBasePrice",
      key: "basePrice",
      render: (formattedBasePrice) => `${formattedBasePrice}`,
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
                showDeleteConfirm(record);
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
          <Title level={2}>QUẢN LÝ MÓN THÊM</Title>
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
              <Option value="name">Tìm Theo Tên</Option>
              <Option value="id">Tìm Theo ID Sản Phẩm</Option>
            </Select>
          </Col>
          <Col>
            <Link to="/toppings/createtopping">
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
        <ConfirmDeleteModal
          visible={isModalVisible}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          title={selectedTopping ? selectedTopping.name : ""}
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

export default ToppingPage;
