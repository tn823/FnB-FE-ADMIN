import PropTypes from "prop-types"; // Import PropTypes
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";
import { ArrowLeftIcon } from "lucide-react";

const { Text } = Typography;

const BackButton = ({ text = "Quay lại", iconSize = 18, style }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Quay lại trang trước
  };

  return (
    <Button
      onClick={handleGoBack}
      style={{
        display: "flex",
        alignItems: "center",
        ...style,
      }}
      type="link"
    >
      <ArrowLeftIcon size={iconSize} />
      <Text style={{ marginLeft: "8px" }}>{text}</Text>
    </Button>
  );
};

// Xác định kiểu dữ liệu cho props
BackButton.propTypes = {
  text: PropTypes.string, // 'text' phải là chuỗi
  iconSize: PropTypes.number, // 'iconSize' phải là số
  style: PropTypes.object, // 'style' phải là object
};

// Giá trị mặc định cho props
BackButton.defaultProps = {
  text: "Quay lại",
  iconSize: 18,
  style: {},
};

export default BackButton;
