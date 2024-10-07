import { useState, useEffect } from "react";
import axios from "axios";
import { ENDPOINTS } from "../../../constants/common";
import "./style/AreaProgressChart.css";

const AreaProgressChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(ENDPOINTS.ORDERS);
        const orders = response.data;

        const productCount = {};

        orders.forEach((order) => {
          order.OrderDetails.forEach((detail) => {
            const { productId, name, quantity } = detail;

            // Xử lý sản phẩm chính
            if (!productCount[productId]) {
              productCount[productId] = { id: productId, name, count: 0 }; // Thêm 'id' vào đây
            }
            productCount[productId].count += quantity;

            // Xử lý topping cho mỗi sản phẩm
            detail.OrderDetailToppings.forEach((topping) => {
              const { toppingId, name, quantity } = topping;
              if (!productCount[toppingId]) {
                productCount[toppingId] = { id: toppingId, name, count: 0 }; // Thêm 'id' vào đây
              }
              productCount[toppingId].count += quantity;
            });
          });
        });

        // Sắp xếp theo số lượng và giới hạn 8 sản phẩm bán chạy nhất
        const sortedProducts = Object.values(productCount)
          .sort((a, b) => b.count - a.count)
          .slice(0, 8); // Giới hạn 8 sản phẩm

        setData(sortedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <section className="content-area-progresschart">
      <div className="progress-bar">
        <div className="progress-bar-info">
          <h4 className="progress-bar-title">Top món bán chạy nhất</h4>
        </div>
        <div className="progress-bar-list">
          {data?.map((progressbar) => {
            return (
              <div className="progress-bar-item" key={progressbar.id}>
                <div className="bar-item-info">
                  <p className="bar-item-info-name">{progressbar.name}</p>
                  <p className="bar-item-info-value">{progressbar.count}</p>
                </div>
                <div className="bar-item-full">
                  <div
                    className="bar-item-filled"
                    style={{
                      width: `${(progressbar.count / data[0].count) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AreaProgressChart;
