import React, { Component } from 'react'
import { Drawer,Input, InputNumber, Space, Button, Form, Select } from 'antd';
import { DataType } from '../../types';

import { FormInstance } from 'antd/lib/form';

import './MyDrawer.css';

type Props = {
  open:boolean,
  row:DataType,
  saveEdit:(newRow:DataType)=>void,
}

type State = {
  row:DataType,
}

type Option={
  label:string,
  value:number,
}

const options:Option[]=[
  {
    label:"是",
    value:1,
  },
  {
    label:"否",
    value:0,
  },
];

export default class MyDrawer extends Component<Props, State> {
  formRef=React.createRef<FormInstance>();
  state = {
    row:{...this.props.row},
  }

  onFinish=(values:any)=>{
    // console.log(values);
    this.onClose(true,values);
  }

  onSave=async()=>{
    try{
      const values=await this.formRef.current?.validateFields();
      this.onFinish(values);
    }catch(e){
      console.log("Saving error",e);
    }
  }

  onClose=(isSave:boolean,editedRow=this.state.row)=>{
    if(isSave){
      let newRow={
        ...this.state.row,
        ...editedRow
      };
      // console.log(newRow);
      if(newRow.summary===undefined) newRow.summary='';
      return this.props.saveEdit(newRow);
    }
    return this.props.saveEdit(this.state.row);
  }

  render() {
    const {open}=this.props;
    return (
      <Form 
        initialValues={this.state.row} 
        onFinish={this.onFinish} 
        ref={this.formRef}
        labelCol={{span:"5"}}
        wrapperCol={{span:"19"}}
      >
        <Drawer 
          title="修改" 
          onClose={()=>this.onClose(false)} 
          open={open}
        >
          <Form.Item label="命令名称" name="name">
            <Input/>
          </Form.Item>
          <Form.Item label="设备名称" name="deviceId">
            <InputNumber style={{width:"100%"}}/>
          </Form.Item>
          <Form.Item label="说明" name="summary">
            <Input/>
          </Form.Item>
          <Form.Item label="设定状态" name="type">
            <Select 
              options={options}
            />
          </Form.Item>
          <Space size={20} className='btn-line'>
                <Button onClick={()=>this.onClose(false)}>取消</Button>
                <Button type="primary" htmlType="submit" onClick={this.onSave}>保存</Button>
            </Space>
        </Drawer>
      </Form>
    )
  }
}