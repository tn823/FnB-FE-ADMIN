import React from "react";
import { Modal, Button, Typography } from "antd";
import './style/delete.css'

const { Text } = Typography;

interface ConfirmDeleteModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ visible, onConfirm, onCancel, title }) => {
  return (
    <Modal
      title="Xác nhận xóa"
      visible={visible}
      onOk={onConfirm} // Khi người dùng nhấn OK
      onCancel={onCancel} // Khi người dùng nhấn Cancel
      okText="Xóa"
      cancelText="Hủy"
      okButtonProps={{ danger: true }} // Nút OK có màu đỏ để cảnh báo xóa
    >
      <Text>{`Bạn có chắc chắn muốn xóa không?`}</Text>
    </Modal>
  );
};

export default ConfirmDeleteModal;
