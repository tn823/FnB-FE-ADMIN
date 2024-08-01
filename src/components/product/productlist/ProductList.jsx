import axios from "axios";
import { useEffect, useState } from "react";
import InfoProduct from "../crud/InfoProduct";
import "./ProductList.scss";
//import { Link, useNavigate } from "react-router-dom";

function ProductList() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("name");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  //const navigate = useNavigate();

  const fetchProducts = () => {
    axios
      .get("https://node-be-api.vercel.app/api/products")
      .then((res) => {
        setData(res.data);
        setErrorMessage("");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      fetchProducts();
    } else {
      axios
        .get(
          `https://node-be-api.vercel.app/api/products/${searchOption}/${searchTerm}`
        )
        .then((res) => {
          if (res.data.length === 0) {
            setErrorMessage(
              `Không tìm thấy sản phẩm với ${searchOption} là "${searchTerm}"`
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

  const handleRowClick = (id) => {
    setSelectedProductId(Number(id));
  };

  const handleCloseInfoProduct = () => {
    setSelectedProductId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn chắc chắn xóa sản phẩm này?")) {
      axios
        .delete(`https://node-be-api.vercel.app/api/products/${id}`)
        .then((res) => {
          console.log(res.data.message);
          fetchProducts();
        })
        .catch((err) => {
          console.error("Lỗi khi xóa sản phẩm:", err);
        });
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 ">Danh Sách Sản Phẩm</h1>
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
              <option value="name">Tìm theo Tên</option>
              <option value="price">Tìm theo Giá</option>
              <option value="category">Tìm theo Loại</option>
            </select>
          </div>
          {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
        </div>
        {/*<div className="col-md-6">
          <div className="d-flex justify-content-end">
            <Link to="/products/createproduct" className="btn btn-success">
              Thêm mới +
            </Link>
          </div> 
        </div>*/}
      </div>
      <div>
        <table className="table table-striped">
          <thead className="product-title">
            <tr>
              <th>ID</th>
              <th>Ảnh</th>
              <th>Tên</th>
              <th>Mô tả</th>
              <th>Giá</th>
              <th>Loại</th>
              <th>Tùy chỉnh</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((d, i) => (
                <tr
                  key={i}
                  className="product-item"
                  onClick={() => handleRowClick(d.id)}
                >
                  <td>{d.id}</td>
                  <td>
                    {d.ProductImages && d.ProductImages.length > 0 ? (
                      <img
                        className="img"
                        src={d.ProductImages[0].url}
                        alt={d.name}
                      />
                    ) : (
                      "Không có ảnh"
                    )}
                  </td>
                  <td className="align-left">{d.name}</td>
                  <td className="align-left">{d.description}</td>
                  <td>{d.basePrice} vnd</td>
                  <td>{d.Category.categoryName}</td>
                  <td>
                    <div className="d-flex">
                      <button
                        className="btn btn-sm btn-danger"
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
                <td colSpan="7" className="text-center">
                  đang load sản phẩm
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedProductId && (
        <InfoProduct id={selectedProductId} onClose={handleCloseInfoProduct} />
      )}
    </div>
  );
}

export default ProductList;
