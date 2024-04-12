import React, { Component } from 'react'
import { Drawer,Input, InputNumber, Space, Button, Form, Select,  } from 'antd';
import { DataType } from '../../types';

// import { FormInstance } from 'antd/lib/form';

import './MyDrawer.css';

type Props = {
  open:boolean,
  row:DataType,
  saveEdit:(newRow:DataType)=>void,
}

type State = {

}

type StateOption={
  label:string,
  value:boolean,
}

type TypeOption={
  label:string,
  value:number,
}

// type EditedRowType={
//   name:String,
//   deviceId:number,
//   summary?:string, 
//   type:number,
// }

const stateOptions:StateOption[]=[
  {
    label:"是",
    value:true,
  },
  {
    label:"否",
    value:false,
  },
];

const typeOptions:TypeOption[]=[
  {
    label:"初始化指令",
    value:0,
  },
  {
    label:"普通指令",
    value:1,
  }
]

export default class MyDrawer extends Component<Props, State> {
  // formRef=React.createRef<FormInstance>();

  onFinish=(values:DataType)=>{
    console.log(values);
    this.onClose(true,values);
  }

  onFinishFailed=(errorInfo:any)=>{
    console.log("Submit Failed!",errorInfo);
  }

  // onSave=async()=>{
  //   try{
  //     const values=await this.formRef.current?.validateFields();
  //     this.onFinish(values);
  //   }catch(e){
  //     console.log("Saving error",e);
  //   }
  // }

  onClose=(isSave:boolean,editedRow={})=>{
    const {saveEdit,row}=this.props;
    if(isSave){
      let newRow={
        ...row,
        ...editedRow
      };
      // console.log(newRow);
      if(newRow.summary===undefined) newRow.summary='';
      return saveEdit(newRow);
    }
    return saveEdit(row);
  }

  render() {
    const {row,open}=this.props;
    return (
        <Drawer 
          title="修改" 
          onClose={()=>this.onClose(false)} 
          open={open}
        >
        <Form 
          initialValues={row} 
          onFinish={this.onFinish} 
          onFinishFailed={this.onFinishFailed}
          // ref={this.formRef}
          labelCol={{span:"5"}}
          wrapperCol={{span:"19"}}
        >
          <Form.Item label="命令名称" name="name" rules={[{type:"string",max:50}]}>
            <Input/>
          </Form.Item>
          <Form.Item label="设备名称" name="deviceId" rules={[{type:"number",min:-99999,max:999999}]}>
            <InputNumber style={{width:"100%"}}/>
          </Form.Item>
          <Form.Item label="指令类型" name="type">
            <Select 
              options={typeOptions}
            />
          </Form.Item>
          <Form.Item label="说明" name="summary" rules={[{type:"string",max:150}]}>
            <Input.TextArea autoSize={{minRows:3}}/>
          </Form.Item>
          <Form.Item label="设定状态" name="state">
            <Select 
              options={stateOptions}
            />
          </Form.Item>
          <Space size={20} className='btn-line'>
            <Form.Item>
                <Button onClick={()=>this.onClose(false)}>取消</Button>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">保存</Button>
            </Form.Item>
          </Space>
        </Form>
      </Drawer>
    )
  }
}

//#region
//onSave简化 x
//省略state，直接把valve值传进父组件 x
//数据流图
//父组件render字数限制删除，子组建写rules x
//说明Input换成textarea x
//#endregion