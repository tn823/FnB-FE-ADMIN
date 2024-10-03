import PropTypes from "prop-types";
import { Button } from "antd";
import "./style/ConfirmButton.css"

const ConfirmButton = ({ onConfirm, isLoading }) => {
  return (
    <Button
      type="primary"
      loading={isLoading}
      onClick={onConfirm}
    //   style={{ marginRight: "10px" }}
      className="confirm-button"
    >
      Xác nhận thanh toán
    </Button>
  );
};

// Xác thực kiểu dữ liệu cho props
ConfirmButton.propTypes = {
  onConfirm: PropTypes.func.isRequired, // onConfirm phải là function
  isLoading: PropTypes.bool, // isLoading là boolean
};

// Giá trị mặc định nếu không truyền isLoading
ConfirmButton.defaultProps = {
  isLoading: false,
};

export default ConfirmButton;
