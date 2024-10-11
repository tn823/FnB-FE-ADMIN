import React from "react";
import { Modal, Button, Typography, Space } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';

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
      title={
        <Space>
          <ExclamationCircleOutlined style={{ color: '#faad14' }} />
          <span>Xác nhận xóa</span>
        </Space>
      }
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={400}
      className="confirm-delete-modal"
    >
      <Text>{`Bạn có chắc chắn muốn xóa "${title}" không?`}</Text>
      <div className="modal-footer">
        <Space size="middle">
          <Button onClick={onCancel}>Hủy</Button>
          <Button type="primary" danger onClick={onConfirm}>
            Xóa
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;