import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';

import './index.css';

import data from '../resource/exp1.json';

var {paramJson,formContent}=data;
formContent=JSON.parse(formContent);

export default class IndexPage extends Component {
  constructor(props){
    super(props)
    const initData={}
    formContent.forEach(item=>{
      initData[item.field]=item.defaultValue;
    })
    this.state={...initData};
  }

  componentDidMount(){
    console.log(paramJson);
  }

  handleInput=(field,e)=>{
    this.setState(prevState=>({
      ...prevState,
      [field]:e.target.value
    }))
    // console.log(e.target.value)
  }

  handleCancel=()=>{
    this.setState(prevState=>{
      const newState={};
      Object.keys(prevState).map(key=>{
        newState[key]='';
      })
      return newState;
    })
  }

  handleSubmit=()=>{
    let re=new RegExp('^\\d{1,3}(\\.\\d{1,3}){3}$')
    if(re.test(this.state["addr"])){
      paramJson=this.state;
      console.log(paramJson);
    }else{
      alert("Address error!");
    }
  }

  createForm=()=>{
    const formItemLayout = {
      labelCol: {
        xs: { span: 0 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return formContent.map((item,index)=>{
      return(
        <div className='contain' key={index}>
          <Form.Item {...formItemLayout} key={index} label={item.label} required={true}>
            <Input 
            value={this.state[item.field]} 
            onChange={e=>this.handleInput(item.field,e)}
            />
          </Form.Item>
        </div>
      )
    })
  }

  render() {

    return (
      <div className='main'>
        <Form>
          {this.createForm()}
        </Form>
        <div className='contain'>
          <Button className='btn' type='primary' onClick={this.handleSubmit}>确定</Button>
          <Button className='btn' onClick={this.handleCancel}>取消</Button>
        </div>
      </div>
    );
  }
}
