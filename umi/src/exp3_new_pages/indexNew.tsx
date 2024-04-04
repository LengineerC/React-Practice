import React, { Component } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Form, Table, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { DataType } from './types';
import MyDrawer from './MyDrawer';


import './index.css';
import data from '../resource/exp3.json';


type Props = {}

type State = {
  data:DataType[],
  editing:boolean,
  chosenRow:DataType,
}

export default class IndexNew extends Component<Props, State> {

  constructor(props:Props){
    super(props);

    this.state = {
      data:data as State['data'],
      editing:false,    
      chosenRow:{} as DataType,
    };
  }

  //Debug
  // componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
  //     if(prevState!==this.state){
  //       console.log(this.state.chosenRow)
  //     }
  // }

  move=(sequence:number,op:string):void=>{
    const newData:DataType[]=[...this.state.data];
    const index:number=newData.findIndex((item:DataType)=>item.sequence===sequence);
    const item:DataType=newData[index];
    if(index>-1){
      switch(op){
        case "up":{
          if(index!==0){
            newData.splice(index,1);
            newData.splice(index-1,0,item);
          } 
          break;
        }  
        case "down":{
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
    // console.log(newData)
    this.setState({data:newData});
  }
  
  edit=(sequence:number)=>{
    this.setState({editing:true});
    const chosenRow:DataType=this.state.data.find(item=>item.sequence===sequence) as DataType;
    this.setState({chosenRow});
    
  }

  saveEdit=(editing:boolean,newRow:DataType)=>{
    this.setState({editing});
    // console.log(newRow);
    const newData=[...this.state.data];
    newData.splice(newData.findIndex(item=>item.sequence===newRow.sequence),1,newRow);
    this.setState({data:newData});
  }

  render() {
    const columns:ColumnsType<DataType>=[
      {
        key:"index",
        title:"执行序号",
        width:"10%",
        render:(text,record,index)=>++index,
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
          return(
            <span style={{color:"lightgray"}}>
              <Typography.Link onClick={()=>this.move(record.sequence,"up")}>
                <FontAwesomeIcon icon={faChevronUp}/>
              </Typography.Link>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Typography.Link onClick={()=>this.move(record.sequence,"down")}>
                <FontAwesomeIcon icon={faChevronDown}/>
              </Typography.Link>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Typography.Link onClick={()=>{this.edit(record.sequence)}}>
                <FontAwesomeIcon icon={faPenToSquare}/>
              </Typography.Link>
            </span>
          )
        }
      }
    ]
    return (
      <div className='main'>
        <Form>
          <Table
            columns={columns}
            dataSource={this.state.data}
            rowKey="sequence"
            rowSelection={{type:"checkbox"}}
          />
        </Form>
        {
          this.state.editing?(
            <MyDrawer open={this.state.editing} row={this.state.chosenRow} saveEdit={(newRow:DataType)=>this.saveEdit(false,newRow)}/>
          ):(
            <></>
          )
        }
      </div>
    )
  }
}
