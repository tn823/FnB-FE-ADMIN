import React from "react";
import { Select } from "antd";

const { Option } = Select;

interface DropdownListProps {
  dataSource: Array<{ value: string, label: string }>;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const DropdownList: React.FC<DropdownListProps> = ({
  dataSource,
  placeholder = "Select an option",
  value,
  onChange,
}) => {
  return (
    <Select
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{ width: "100%" }}
    >
      {dataSource.map((item) => (
        <Option key={item.value} value={item.value}>
          {item.label}
        </Option>
      ))}
    </Select>
  );
};

export default DropdownList;
