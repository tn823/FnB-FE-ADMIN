import { Button } from "antd";
import PropTypes from "prop-types";
import './style/Addbutton.css'

const AddButton = ({ onClick, label }) => {
  return (
    <Button
      className="add-button"
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default AddButton;
