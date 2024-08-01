import axios from "axios";
import { useEffect, useState } from "react";
import "./CategoryList.scss";
// import { Link, useNavigate } from "react-router-dom";

function CategoryList() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("name");
  const [errorMessage, setErrorMessage] = useState("");
  // const navigate = useNavigate();

  const fetchCategories = () => {
    axios
      .get("https://node-be-api.vercel.app/api/categories")

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
      axios
        .get(
          `https://node-be-api.vercel.app/api/categories/${searchOption}/${searchTerm}`
        )
        .then((res) => {
          if (res.data.length === 0) {
            setErrorMessage(
              `Không tìm thấy danh mục với ${searchOption} là "${searchTerm}"`
            );
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
    if (window.confirm("Bạn chắc chắn muốn xóa danh mục này không?")) {
      axios
        .delete(`https://node-be-api.vercel.app/api/categories${id}`)

        .then((res) => {
          console.log(res.data.message);
          fetchCategories();
        })
        .catch((err) => {
          console.error("Lỗi khi xóa danh mục:", err);
        });
    }
  };

  // const handleRowClick = (id) => {
  //   navigate(`/categories/update/${id}`);
  // };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 ">Danh Mục</h1>
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
              <option value="name">Tìm Theo Tên Danh Mục</option>
              <option value="price">Tìm Theo ID</option>
            </select>
          </div>
          {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
        </div>
        <div className="col-md-6">
          {/* <div className="d-flex justify-content-end">
            <Link to="/products/createproduct" className="btn btn-success">
              Thêm mới +
            </Link>
          </div> */}
        </div>
      </div>
      <div>
        <table className="table table-striped">
          <thead className="product-title">
            <tr>
              <th>ID</th>
              <th>Tên Danh Mục</th>
              <th className="d-frame">Tùy chỉnh</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((d, i) => (
                <tr
                  key={i}
                  className="product-item"
                  // onClick={() => handleRowClick(d.categoryId)}
                >
                  <td className="categoryId">{d.categoryId}</td>
                  <td className="align-left">{d.categoryName}</td>
                  <td className="d-frame">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(d.id);
                      }}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  đang load danh mục
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategoryList;
