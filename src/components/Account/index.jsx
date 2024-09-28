import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Input, Select, Row, Col, Typography, Layout } from "antd";
import axios from "axios";
import { ENDPOINTS } from "../../constants/common";
import { Trash2 } from "lucide-react";
import { Group } from "@mantine/core";
import AddButton from "../Button/AddButton";
import ConfirmDeleteModal from './../../modal/delete';

const { Search } = Input;
const { Option } = Select;
const { Title } = Typography;
const { Content } = Layout;

function AccountPage() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("name");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const navigate = useNavigate();

  const fetchCategories = () => {
    axios
      .get(ENDPOINTS.ACCOUNTS)
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
          ? `${ENDPOINTS.ACCOUNTS}/${searchTerm}`
          : `${ENDPOINTS.ACCOUNTS}/${searchOption}/${searchTerm}`;

      axios
        .get(url)
        .then((res) => {
          const resultData = Array.isArray(res.data) ? res.data : [res.data];
          if (resultData.length === 0) {
            setErrorMessage(
              `Không tìm thấy tài khoản với ${searchOption} là "${searchTerm}"`
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

  const showDeleteConfirm = (account) => {
    setSelectedAccount(account); // Lưu tài khoản muốn xóa
    setIsModalVisible(true); // Hiển thị modal
  };


  const handleConfirmDelete = () => {
    if (selectedAccount) {
      axios
        .delete(`${ENDPOINTS.ACCOUNTS}/${selectedAccount.id}`)
        .then(() => {
          fetchCategories();
        })
        .catch((err) => {
          console.error("Lỗi khi xóa tài khoản:", err);
        });
    }
    setIsModalVisible(false); // Ẩn modal sau khi xóa
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false); // Ẩn modal
    setSelectedAccount(null); // Xóa tài khoản được chọn
  };



  const handleRowClick = (id) => {
    navigate(`/accounts/update/${id}`);
  };

  const columns = [
    {
      title: <span style={{ fontSize: "16px", fontWeight: "bold" }}>ID</span>,
      dataIndex: "id",
      key: "id",
    },
    {
      title: (
        <span style={{ fontSize: "16px", fontWeight: "bold" }}>Tên Tài Khoản</span>
      ),
      dataIndex: "username",
      key: "username",
    },
    {
      title: (
        <span style={{ fontSize: "16px", fontWeight: "bold" }}>Chức Vụ</span>
      ),
      dataIndex: "position",
      key: "position",
    },
    {
      title: (
        <span style={{ fontSize: "16px", fontWeight: "bold" }}>Tùy Chỉnh</span>
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
          <Title level={2}>QUẢN LÝ TÀI KHOẢN</Title>
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
              <Option value="name">Tìm Theo Tên Tài Khoản</Option>
              <Option value="id">Tìm Theo ID</Option>
              <Option value="position">Tìm Theo Chức Vụ</Option>
            </Select>
          </Col>
          <Col>
            <Link to="/accounts/createaccount">
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
          title={selectedAccount ? selectedAccount.username : ""} // Hiển thị tên tài khoản trong modal
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

export default AccountPage;
