import PropTypes from "prop-types";
import { Button } from "antd";
import "./style/CancelButton.css";

const CancelButton = ({ onCancel, isLoading }) => {
  return (
    <Button
      className="cancel-button"
      type="danger"
      loading={isLoading}
      onClick={onCancel}
    >
      Hủy đơn
    </Button>
  );
};

// Xác thực kiểu dữ liệu cho props
CancelButton.propTypes = {
  onCancel: PropTypes.func.isRequired, // onCancel phải là function
  isLoading: PropTypes.bool, // isLoading là boolean
};

// Giá trị mặc định nếu không truyền isLoading
CancelButton.defaultProps = {
  isLoading: false,
};

export default CancelButton;
