import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import BaseLayout from "./layout/BaseLayout";
import { MantineProvider } from "@mantine/core";
import { Dashboard, PageNotFound } from "./screens";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Authentication/login/login";
import { PropTypes } from "prop-types";
import ProductPage from "./components/product/index";
import ProductDetailsPage from "./components/product/details";
import AccountList from "./components/Account";
import AccountDetailsPage from "./components/Account/details";
import CategoryPage from "./components/Catogories/index";
import CategoryDetailsPage from "./components/Catogories/details";
import Order from "./components/Transactions/OrderList";
import OrderDetail from "./components/Transactions/InfoOrder";
import ToppingPage from './components/Topping/index';
import ToppingDetailPage from './components/Topping/details';

function App() {
  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
  };

  PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <MantineProvider
      theme={{ colorScheme: "light" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Router>
        <Routes>
          {/* LOGIN */}
          <Route path="/login" element={<Login />} />
          <Route element={<BaseLayout />}>
            {/* HOME */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  {" "}
                  <Dashboard />{" "}
                </PrivateRoute>
              }
            />

            {/* PRODUCT */}
            <Route path="/products" element={<ProductPage />} />
            <Route
              path="/products/createproduct"
              element={<ProductDetailsPage />}
            />
            <Route
              path="/products/update/:id"
              element={<ProductDetailsPage />}
            />

            {/* TOPPING */}
            <Route path="/toppings" element={<ToppingPage />} />
            <Route
              path="/toppings/createtopping"
              element={<ToppingDetailPage />}
            />
            <Route
              path="/toppings/update/:id"
              element={<ToppingDetailPage />}
            />

            {/* ACCOUNT */}
            <Route path="/accounts" element={<AccountList />} />
            <Route
              path="/accounts/createaccount"
              element={<AccountDetailsPage />}
            />
            <Route
              path="/accounts/update/:id"
              element={<AccountDetailsPage />}
            />

            {/* CATEGORY */}
            <Route path="/categories" element={<CategoryPage />} />
            <Route
              path="/categories/createcategory"
              element={<CategoryDetailsPage />}
            />
            <Route
              path="/categories/update/:id"
              element={<CategoryDetailsPage />}
            />

            {/* ORDER */}
            <Route path="/orders" element={<Order />} />
            <Route path="/orders/:id" element={<OrderDetail />} />

            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
