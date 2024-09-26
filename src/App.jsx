import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import BaseLayout from "./layout/BaseLayout";
import { Dashboard, PageNotFound, Product } from "./screens";
import CreateProduct from "./components/product/crud/CreateProduct";
import UpdateProduct from "./components/product/crud/UpdateProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Authentication/login/login";
import { PropTypes } from "prop-types";
import AccountList from "./components/Account/AccountList";
import CreateAccount from "./components/Account/CreateAccount";
import UpdateAccount from "./components/Account/UpdateAccount";
import CategoryList from "./components/Catogories/index";
import CategoryDetails from "./components/Catogories/details";
// import CreateCategory from "./components/Catogories/CreateCategory";
// import UpdateCategory from "./components/Catogories/UpdateCategory";
import Order from "./components/Transactions/OrderList";
import OrderDetail from "./components/Transactions/InfoOrder";

function App() {
  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
  };

  PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <>
      <Router>
        <Routes>
          {/* LOGIN */}
          <Route path="/login" element={<Login />} />
          <Route element={<BaseLayout />}>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            {/* PRODUCT */}
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <Product />
                </PrivateRoute>
              }
            />
            <Route
              path="/products/createproduct"
              element={
                <PrivateRoute>
                  <CreateProduct />
                </PrivateRoute>
              }
            />
            <Route
              path="/products/updateproduct/:id"
              element={
                <PrivateRoute>
                  <UpdateProduct />
                </PrivateRoute>
              }
            />
            {/* ACCOUNT */}
            <Route path="/accounts" element={<AccountList />} />
            <Route path="/accounts/createaccount" element={<CreateAccount />} />
            <Route path="/accounts/update/:id" element={<UpdateAccount />} />
            {/* CATEGORY */}
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/categories/createcategory" element={<CategoryDetails />} />
            <Route path="/categories/update/:id" element={<CategoryDetails />} />
            {/* ORDER */}
            <Route path="/orders" element={<Order />} />
            <Route path="/orders/:id" element={<OrderDetail />} />

            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
