import AreaBarChart from "./AreaBarChart";
import AreaProgressChart from "./AreaProgressChart";
import AreaTable from "./AreaTable";
const AreaCharts = () => {
  return (
    <section className="content-area-charts">
      {/* <AreaBarChart /> */}
      <AreaTable />
      <AreaProgressChart />
    </section>
  );
};

export default AreaCharts;
