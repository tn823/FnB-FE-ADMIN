import { useEffect, useState } from "react";
import AreaCard from "./AreaCard";
import "./AreaCards.scss";
import axios from "axios";
import { ENDPOINTS } from "../../../constants/common";

const AreaCards = () => {
  const [data, setData] = useState({
    totalRevenue: "0.00",
    completedOrderCount: 0,
    pendingOrderCount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(ENDPOINTS.REVENUE_ORDER);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="content-area-cards">
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        cardInfo={{
          title: "DOANH THU",
          value: `${parseFloat(data.totalRevenue).toLocaleString()} VNĐ`,
          text: "Tổng doanh thu hôm nay.",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        cardInfo={{
          title: "HOÀN THÀNH",
          value: `${data.completedOrderCount} Đơn`,
          text: "Số hóa đơn hoàn thành hôm nay.",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        cardInfo={{
          title: "ĐANG ĐỢI",
          value: `${data.pendingOrderCount} Đơn`,
          text: "Số đơn đang đợi xử lý.",
        }}
      />
    </section>
  );
};

export default AreaCards;
