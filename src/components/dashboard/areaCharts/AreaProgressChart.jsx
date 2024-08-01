import { useState, useEffect } from "react";
import axios from "axios";

const AreaProgressChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://node-be-api.vercel.app/api/orders"
        );
        const orders = response.data;

        const productCount = {};

        orders.forEach((order) => {
          order.OrderDetails.forEach((detail) => {
            const { productId, name, quantity } = detail;
            if (!productCount[productId]) {
              productCount[productId] = { name, count: 0 };
            }
            productCount[productId].count += quantity;

            detail.OrderDetailToppings.forEach((topping) => {
              const { toppingId, name, quantity } = topping;
              if (!productCount[toppingId]) {
                productCount[toppingId] = { name, count: 0 };
              }
              productCount[toppingId].count += quantity;
            });
          });
        });

        const sortedProducts = Object.values(productCount)
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        setData(
          sortedProducts.map((product) => ({
            id: product.id,
            name: product.name,
            count: product.count,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="progress-bar">
      <div className="progress-bar-info">
        <h4 className="progress-bar-title">Most Sold Items</h4>
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
  );
};

export default AreaProgressChart;

// const data = [
//   {
//     id: 1,
//     name: "Burger",
//     percentValues: 70,
//   },
//   {
//     id: 2,
//     name: "Shirts",
//     percentValues: 40,
//   },
//   {
//     id: 3,
//     name: "Belts",
//     percentValues: 60,
//   },
//   {
//     id: 4,
//     name: "Caps",
//     percentValues: 80,
//   },
//   {
//     id: 5,
//     name: "Others",
//     percentValues: 20,
//   },
// ];

// const AreaProgressChart = () => {
//   return (
//     <div className="progress-bar">
//       <div className="progress-bar-info">
//         <h4 className="progress-bar-title">Most Sold Items</h4>
//       </div>
//       <div className="progress-bar-list">
//         {data?.map((progressbar) => {
//           return (
//             <div className="progress-bar-item" key={progressbar.id}>
//               <div className="bar-item-info">
//                 <p className="bar-item-info-name">{progressbar.name}</p>
//                 <p className="bar-item-info-value">
//                   {progressbar.percentValues}
//                 </p>
//               </div>
//               <div className="bar-item-full">
//                 <div
//                   className="bar-item-filled"
//                   style={{
//                     width: `${progressbar.percentValues}%`,
//                   }}
//                 ></div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default AreaProgressChart;
