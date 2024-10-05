import { Layout } from "antd";
import "./style/AreaTop.css";
import { useEffect, useRef, useState } from "react";
import { Content } from 'antd/es/layout/layout';


const AreaTop = () => {

  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateRangeRef = useRef(null);

  const handleInputClick = () => {
    setShowDatePicker(true);
  };

  const handleClickOutside = (event) => {
    if (dateRangeRef.current && !dateRangeRef.current.contains(event.target)) {
      setShowDatePicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Layout style={{padding:"20px"}}>
      <Content>
        <section className="content-area-top">
          <div className="area-top-l">
            <h2 className="area-top-title">
              <b>THỐNG KÊ</b>
            </h2>
          </div>
          <div className="area-top-r">
            <div
              ref={dateRangeRef}
              className={`date-range-wrapper ${
                !showDatePicker ? "hide-date-range" : ""
              }`}
              onClick={handleInputClick}
            ></div>
          </div>
        </section>
      </Content>
    </Layout>
  );
};

export default AreaTop;
