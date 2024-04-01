import React, { Component } from 'react'
import {Form,Button,Input} from 'antd'

import data from '../resource/exp2.json'

import './index.css'

const {currentData, dataArray}=data;

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

export default class Index extends Component {
  state={formData:{},currentData:currentData}

  componentDidMount(){
    const initialFormData={};
    dataArray.forEach((item)=>{
      initialFormData[item.name]={
        path:item.path,
        value:item.currentValue
      }
    })
    this.setState({formData:initialFormData})
  }

  handleInputChange=(value,name,path)=>{
    this.setState(prevState=>({
      formData:{
        ...prevState.formData,
        [name]:{
          path:path,
          value:value
        }
      }
    }))
  }

  createForm=()=>{
    return dataArray.map((item,index)=>{
      return(
        <div className='container' key={index}>
          <Form.Item {...formItemLayout} label={item.name} required={item.enable}>
            <Input 
              placeholder={item.sampleValue} 
              defaultValue={item.currentValue} 
              onChange={e=>this.handleInputChange(e.target.value,item.name,item.path)}
            />
          </Form.Item>
        </div>
      )
    })
  }

  handleSubmit=()=>{
    const formData=this.state.formData;
    let newCurrentData=currentData;

    const findAndUpdateValue=(form,value,path,name)=>{
      if(path.length===0){
        return form[name]=value;
      }
      let currentPath=path.shift();
      findAndUpdateValue(form[currentPath],value,path,name);
    }

    for(const key in formData){
      const {path, value}=formData[key];
      const pathList=path.split('/');
      pathList.shift();
      if(pathList[pathList.length-1]=='') pathList.pop();
      findAndUpdateValue(newCurrentData,value,pathList,key);
    }
    this.setState({currentData:newCurrentData})
  }
  
  render() {
    return (
      <div className='main'>
        <Form>
          {this.createForm()}
        </Form>
        <div className='container'>
          <Button className='btn' type='primary' onClick={this.handleSubmit}>Submit</Button>
        </div>
        <div className='container'>
          <textarea 
            readOnly={true} 
            value={JSON.stringify(this.state.currentData)} 
            style={{height:"20vh",width:"50vh",resize:"none"}}
          />
        </div>
      </div>
    )
  }
}
