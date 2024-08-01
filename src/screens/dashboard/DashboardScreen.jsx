import { AreaCards, AreaCharts, AreaTop } from "../../components";

const Dashboard = () => {
  return (
    <div className="content-area">
      <AreaTop />
      <AreaCards />
      <AreaCharts />
    </div>
  );
};

export default Dashboard;
