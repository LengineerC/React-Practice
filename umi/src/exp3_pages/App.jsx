import React, { Component } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';

const originData = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

class EditableCell extends Component {
  render() {
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
    
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: React.createRef(),
      data: originData,
      editingKey: '',
    };
  }

  isEditing = (record) => {
    return record.key === this.state.editingKey;
  };

  edit = (record) => {
    this.state.form.current.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    this.setState({ editingKey: record.key });
  };

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save = async (key) => {
    try {
      const row = await this.state.form.current.validateFields();
      const newData = [...this.state.data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = [
      {
        title: 'name',
        dataIndex: 'name',
        width: '25%',
        editable: true,
      },
      {
        title: 'age',
        dataIndex: 'age',
        width: '15%',
        editable: true,
      },
      {
        title: 'address',
        dataIndex: 'address',
        width: '40%',
        editable: true,
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (_, record) => {
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <Typography.Link
                onClick={() => this.save(record.key)}
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </Typography.Link>
              <Popconfirm title="Sure to cancel?" onConfirm={this.cancel}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <Typography.Link
              disabled={this.state.editingKey !== ''}
              onClick={() => this.edit(record)}
            >
              Edit
            </Typography.Link>
          );
        },
      },
    ];

    const mergedColumns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <Form ref={this.state.form} component={false}>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
        />
      </Form>
    );
  }
}

export default App;
