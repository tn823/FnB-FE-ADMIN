import axios from "axios";
import { useEffect, useState } from "react";
import "./style/AccountList.css";
// import { Link, useNavigate } from "react-router-dom";

function AccountList() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("username");
  const [errorMessage, setErrorMessage] = useState("");
  // const navigate = useNavigate();

  const fetchAccounts = () => {
    axios
      .get("https://node-be-api.vercel.app/api/accounts")
      .then((res) => {
        setData(res.data);
        setErrorMessage("");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      fetchAccounts();
    } else {
      axios
        .get(
          `https://node-be-api.vercel.app/api/accounts/${searchOption}/${searchTerm}`
        )
        .then((res) => {
          if (res.data.length === 0) {
            setErrorMessage("Không tìm thấy tài khoản.");
            setData([]);
          } else {
            setData(res.data);
            setErrorMessage("");
          }
        })
        .catch((err) => {
          console.log(err);
          setData([]);
        });
    }
  }, [searchTerm, searchOption]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa tài khoản này không?")) {
      axios
        .delete(`https://node-be-api.vercel.app/api/accounts/${id}`)

        .then((res) => {
          console.log(res.data.message);
          fetchAccounts();
        })
        .catch((err) => {
          console.error("Lỗi khi xóa tài khoản:", err);
        });
    }
  };

  // const handleRowClick = (id) => {
  //   navigate(`/accounts/update/${id}`);
  // };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Danh sách tài khoản</h1>
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Nhập từ khóa tìm kiếm..."
              value={searchTerm}
              onChange={handleChange}
            />
            <select
              className="form-select"
              value={searchOption}
              onChange={handleOptionChange}
            >
              <option value="username">Tìm theo Tên đăng nhập</option>
            </select>
          </div>
          {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
        </div>
        <div className="col-md-6">
          {/* <div className="d-flex justify-content-end">
            <Link to="/accounts/createaccount" className="btn btn-success">
              Thêm mới +
            </Link>
          </div> */}
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped ">
          <thead className="title">
            <tr>
              <th className="id">ID</th>
              <th className="user">Tên đăng nhập</th>
              {/* <th className="masked-password">Mật khẩu</th> */}
              <th className="position">Chức vụ</th>
              <th className="option">Tùy chỉnh</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((d, i) => (
                <tr
                  key={i}
                  className="account-item"
                  // onClick={() => handleRowClick(d.id)}
                >
                  <td className="id">{d.id}</td>
                  <td className="user">{d.username}</td>
                  {/* <td className="masked-password">{d.password}</td> */}
                  <td className="position">{d.position}</td>
                  <td className="option">
                    <div className="d-flex">
                      <button
                        className="btn btn-sm btn-danger "
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(d.id);
                        }}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  Không có tài khoản nào để hiển thị.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AccountList;
