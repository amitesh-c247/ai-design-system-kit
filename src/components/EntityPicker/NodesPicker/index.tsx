import React, { useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface Node {
  id: string;
  name: string;
  type: string;
}

interface NodesPickerProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
}

const NodesPicker: React.FC<NodesPickerProps> = ({
  value = [],
  onChange,
  placeholder = "Select nodes...",
  disabled = false,
  multiple = true,
}) => {
  // Mock data
  const [nodes] = useState<Node[]>([
    { id: '1', name: 'Node 1', type: 'server' },
    { id: '2', name: 'Node 2', type: 'database' },
    { id: '3', name: 'Node 3', type: 'application' },
  ]);

  const handleChange = (selectedValues: string | string[]) => {
    const values = Array.isArray(selectedValues) ? selectedValues : [selectedValues];
    onChange?.(values);
  };

  return (
    <Select
      mode={multiple ? 'multiple' : undefined}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      style={{ width: '100%' }}
    >
      {nodes.map((node) => (
        <Option key={node.id} value={node.id}>
          {node.name} ({node.type})
        </Option>
      ))}
    </Select>
  );
};

export default NodesPicker; 