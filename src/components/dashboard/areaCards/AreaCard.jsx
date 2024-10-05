import PropTypes from "prop-types";
import {
  DollarOutlined,
  CheckCircleOutlined,
  InfoCircleFilled,
} from "@ant-design/icons";

const AreaCard = ({ colors, cardInfo }) => {
  // Lựa chọn icon dựa trên tiêu đề của từng card
  let IconComponent;
  switch (cardInfo.title) {
    case "DOANH THU": // Khớp với tiêu đề truyền vào từ AreaCards
      IconComponent = DollarOutlined;
      break;
    case "HOÀN THÀNH": // Khớp với tiêu đề truyền vào từ AreaCards
      IconComponent = CheckCircleOutlined;
      break;
    case "ĐANG ĐỢI": // Khớp với tiêu đề truyền vào từ AreaCards
      IconComponent = InfoCircleFilled;
      break;
    default:
      IconComponent = null;
  }

  return (
    <div className="area-card">
      <div className="area-card-info">
        {/* Hiển thị icon trước tiêu đề */}
        <div className="info-icon">
          {IconComponent && (
            <IconComponent style={{ fontSize: 24, color: colors[1] }} />
          )}
        </div>
        <h5 className="info-title">{cardInfo.title}</h5>
        <div
          className="info-value"
          style={{ color: colors[1] }} // Màu chữ dựa trên giá trị truyền vào
        >
          {cardInfo.value}
        </div>
        <p className="info-text">{cardInfo.text}</p>
      </div>
    </div>
  );
};

export default AreaCard;

AreaCard.propTypes = {
  colors: PropTypes.array.isRequired,
  cardInfo: PropTypes.object.isRequired,
};
