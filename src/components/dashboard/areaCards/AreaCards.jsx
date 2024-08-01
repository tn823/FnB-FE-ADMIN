import { useEffect, useState } from "react";
import AreaCard from "./AreaCard";
import "./AreaCards.scss";
import axios from "axios";

const AreaCards = () => {
  const [data, setData] = useState({ totalRevenue: "0.00", orderCount: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://node-be-api.vercel.app/api/orders/revenue/today"
        );
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
        percentFillValue={80}
        cardInfo={{
          title: "Todays Sales",
          value: `$${parseFloat(data.totalRevenue).toLocaleString()}`,
          text: `We have sold ${data.orderCount} orders.`,
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={50}
        cardInfo={{
          title: "Todays Revenue",
          value: `$${parseFloat(data.totalRevenue).toLocaleString()}`,
          text: "Available to payout",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={40}
        cardInfo={{
          title: "In Escrow",
          value: "$18.2K",
          text: "Available to payout",
        }}
      />
    </section>
  );
};

export default AreaCards;
