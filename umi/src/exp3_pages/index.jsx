import React, { Component } from 'react'
import { Table, Typography, Popconfirm,Form } from 'antd';

import EditableCell from './EditableCell.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import "./index.css";

import dataSource from '../resource/exp3.json';

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state={
      form:React.createRef(),
      // data:dataSource.map((item,index)=>({
      //   ...item,
      //   sortKey:index
      // })),
      data:dataSource,
      editingKey:"",
    }
  }

  isEditing=(record)=>{
    // console.log(record.sequence);
    return record.sequence===this.state.editingKey;
  }

  edit=(record)=>{
    // console.log(this.state.data)
    // console.log(record);
    this.state.form.current.setFieldsValue({
      deviceCommandId: record.deviceCommandId,
      deviceId: record.deviceId,
      name: record.name,
      type: record.type,
      summary:record.summary,
    })
    this.setState({editingKey:record.sequence});
  }

  cancel=()=>{
    this.setState({editingKey:''})
  }

  save=async (sequence)=>{
    try{
      const row=await this.state.form.current.validateFields();
      const newData=[...this.state.data];
      const index=newData.findIndex(item=>sequence===item.sequence);
      if(index>-1){
        const item=newData[index];
        console.log(row);
        row.type=Number(row.type);
        newData.splice(index,1,{
          ...item,
          ...row,
        });
      }
      this.setState({data:newData,editingKey:""});

    }catch(error){
      console.log("Data Error",error);
    }
  }

  move=(sequence,dir)=>{
    let newData=[...this.state.data];
    const index=newData.findIndex(item=>item.sequence===sequence);
    const item=newData[index];
    if(index>-1){
      switch(dir){
        case "up":{
          // if(newData[index].sortKey>0){
          //   newData[index].sortKey--;
          //   newData[index-1].sortKey++;
          if(index!==0){
            newData.splice(index,1);
            newData.splice(index-1,0,item);
          }
          break;
        }
        case "down":{
          // if(newData[index].sortKey<newData.length-1){
          //   newData[index].sortKey++;
          //   newData[index+1].sortKey--;
          // }
          if(index!==newData.length-1){
            newData.splice(index,1);
            newData.splice(index+1,0,item);
          }
          break;
        }
        default:
          break;
          
      }
    }
    // newData=newData.sort((a,b)=>a.sortKey-b.sortKey);
    this.setState({data:newData});
  }

  render() {
    const columns = [
      {
        key:"index",
        title: "执行序号",
        width:"10%",
        render:(text,record,index)=>++index
        // dataIndex:"sequence"
      },
      {
        key:"name",
        title:"命令名称",
        dataIndex:"name",
        width:"20%",
      },
      {
        key:"deviceId",
        title:"设备名称",
        dataIndex:"deviceId",
        width:"10%"
      },
      {
        key:"summary",
        title:"说明",
        dataIndex:"summary",
        width:"30%"
      },
      {
        key:"type",
        title:"设定状态",
        dataIndex:"type",
        width:"10%",
        render:(text,record,index)=>text===1?"是":"否"
      },
      {
        key:"operation",
        title:"操作",
        width:"35%",
        render:(_,record)=>{
          const editable=this.isEditing(record);
          return(
            <div>
              {
                editable ?(
                  <span>
                  <Typography.Link
                    onClick={() => this.save(record.sequence)}
                    style={{
                      marginRight: 8,
                    }}
                  >
                    Save
                  </Typography.Link>
                  <Popconfirm title="Sure to cancel the edit?" onConfirm={this.cancel}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                ):(
                  <span style={{color:"lightgray"}}>
                  <Typography.Link onClick={()=>this.move(record.sequence,"up")}><FontAwesomeIcon icon={faChevronUp} /></Typography.Link>
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  <Typography.Link onClick={()=>this.move(record.sequence,"down")}><FontAwesomeIcon icon={faChevronDown} /></Typography.Link>
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  <Typography.Link onClick={()=>this.edit(record)}><FontAwesomeIcon icon={faPenToSquare} /></Typography.Link>
                  </span>
                )
              }
            </div>
          )
        },
      },
    ];

    // const rowSelection = {
      // onChange: (selectedRowKeys, selectedRows) => {
      //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      // },
      // getCheckboxProps: (record) => ({
      //   disabled: record.name === '',
      //   name: record.name,
      // }),
    // };

    const mergedColomns=columns.map(col=>{
      let key=col.key;
      if(key==="index" || key==="operation") return col;
      return {
        ...col,
        onCell:record=>({
          record,
          title:col.title,
          dataIndex:col.dataIndex,
          editing:this.isEditing(record)
        })
      }
    })

    return (
      <div className='main'>
        <Form ref={this.state.form}>
          <Table 
            components={{
              body:{
                cell:EditableCell
              }
            }}
            rowSelection={{type:"checkbox", }}
            dataSource={this.state.data} 
            columns={mergedColomns} 
            rowKey="sequence"
          />
        </Form>
      </div>
    )
  }
}
