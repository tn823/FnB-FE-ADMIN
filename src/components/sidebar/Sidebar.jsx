import { useContext, useEffect, useRef } from "react";
import {
  MdOutlineBarChart,
  MdFastfood,
  MdOutlineClose,
  MdOutlineCurrencyExchange,
  MdOutlineLogout,
  MdOutlinePeople,
  MdOutlineShoppingBag,
  MdOutlineCategory,
  MdOutlineMenu,
} from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./style/Sidebar.scss";
import { SidebarContext } from "../../context/SidebarContext";

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickOutside = (event) => {
    if (
      isSidebarOpen &&
      navbarRef.current &&
      !navbarRef.current.contains(event.target)
    ) {
      toggleSidebar();
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("position");
    navigate("/login");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleSidebar]);

  return (
    <>
      <button
        className={`sidebar-toggle-btn ${isSidebarOpen ? "open" : ""}`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <MdOutlineClose size={24} />
        ) : (
          <MdOutlineMenu size={24} />
        )}
      </button>
      <nav
        className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
        ref={navbarRef}
      >
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <span className="sidebar-brand-text">Smurf Village</span>
          </div>
        </div>
        <div className="sidebar-body">
          <div className="sidebar-menu">
            <ul className="menu-list">
              <li className="menu-item">
                <Link
                  to="/"
                  className={`menu-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                >
                  <span className="menu-link-icon">
                    <MdOutlineBarChart size={18} />
                  </span>
                  <span className="menu-link-text">Thống Kê</span>
                </Link>
              </li>

              <li className="menu-item">
                <Link
                  to="/orders"
                  className={`menu-link ${
                    location.pathname === "/orders" ? "active" : ""
                  }`}
                >
                  <span className="menu-link-icon">
                    <MdOutlineCurrencyExchange size={18} />
                  </span>
                  <span className="menu-link-text">Đơn Hàng</span>
                </Link>
              </li>

              <li className="menu-item">
                <Link
                  to="/products"
                  className={`menu-link ${
                    location.pathname === "/products" ? "active" : ""
                  }`}
                >
                  <span className="menu-link-icon">
                    <MdOutlineShoppingBag size={20} />
                  </span>
                  <span className="menu-link-text">Sản Phẩm</span>
                </Link>
              </li>

              <li className="menu-item">
                <Link
                  to="/toppings"
                  className={`menu-link ${
                    location.pathname === "/toppings" ? "active" : ""
                  }`}
                >
                  <span className="menu-link-icon">
                    <MdFastfood size={20} />
                  </span>
                  <span className="menu-link-text">Món Thêm</span>
                </Link>
              </li>

              <li className="menu-item">
                <Link
                  to="/categories"
                  className={`menu-link ${
                    location.pathname === "/categories" ? "active" : ""
                  }`}
                >
                  <span className="menu-link-icon">
                    <MdOutlineCategory size={20} />
                  </span>
                  <span className="menu-link-text">Danh Mục</span>
                </Link>
              </li>
              <>
                <li className="menu-item">
                  <Link
                    to="/accounts"
                    className={`menu-link ${
                      location.pathname === "/accounts" ? "active" : ""
                    }`}
                  >
                    <span className="menu-link-icon">
                      <MdOutlinePeople size={20} />
                    </span>
                    <span className="menu-link-text">Tài Khoản</span>
                  </Link>
                </li>
              </>
            </ul>
          </div>
          <div className="sidebar-menu sidebar-menu2">
            <ul className="menu-list">
              <li className="menu-item">
                <Link to="/login" onClick={handleLogout} className="menu-link">
                  <span className="menu-link-icon">
                    <MdOutlineLogout size={20} />
                  </span>
                  <span className="menu-link-text">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
