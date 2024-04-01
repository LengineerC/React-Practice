import React, { Component } from 'react';
import { Input, Form } from 'antd';
import { FormItemProps } from 'antd/lib/form';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string | number;
  title: string;
  inputType: 'number' | 'text';
  record: any;
  index: number;
  children:React.ReactNode
}

export default class EditableCell extends Component<EditableCellProps> {
  render() {
    console.log(this.props)
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            {...(this.props as FormItemProps)}
          >
            <Input />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  }
}