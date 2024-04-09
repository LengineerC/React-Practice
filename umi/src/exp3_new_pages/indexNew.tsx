import React, { Component } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Form, Table, Typography, message, Divider } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { DataType } from './types';
import MyDrawer from './components/MyDrawer/MyDrawer';

import './index.css';
import data from '../resource/exp3.json';

type Props = {}

type State = {
  data:DataType[],
  editing:boolean,
  chosenRow:DataType,
}

enum op{
  MOVE_UP=0,
  MOVE_DOWN,
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

  move=(sequence:number,op:number):void=>{
    const newData:DataType[]=[...this.state.data];
    const index:number=newData.findIndex((item:DataType)=>item.sequence===sequence);
    const item:DataType=newData[index];
    if(index>-1){
      switch(op){
        case 0:{
          if(index!==0){
            newData.splice(index,1);
            newData.splice(index-1,0,item);
          }else{
            message.error("It's already on the top!");
          }
          break;
        }  
        case 1:{
          if(index!==newData.length-1){
            newData.splice(index,1);
            newData.splice(index+1,0,item);
          }else{
            message.error("It's already on the bottom!");
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

  isChineseCharacter=(ch:string):boolean=>{
    const re=new RegExp('^[\\u4E00-\\u9FA5]$');
    return re.test(ch);
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
        render:(text,record,index)=>{
          // console.log(text.length);
          let newText=text.slice(0,18);
          let numChineseCh=0;
          let len=0;
          let isOversize:boolean=false;
          for(let ch of text){
            if(this.isChineseCharacter(ch)){
              len+=2;
              numChineseCh++;
            }else len++;
            if(len>21) isOversize=true;
          }
          if(isOversize){
            newText=newText.slice(0,Math.max(18-numChineseCh,9));
            return newText+"...";
          }else return text;
        }
      },
      {
        key:"deviceId",
        title:"设备名称",
        dataIndex:"deviceId",
        width:"10%",
        render:(text,record,index)=>{
          // console.log(typeof(text));
          if(text>999999) return ">999999";
          else if(text<-99999) return "<-99999";
          else return text;
        }
      },
      {
        key:"summary",
        title:"说明",
        dataIndex:"summary",
        width:"30%",
        render:(text,record,index)=>{
          // console.log(text.length);
          if(record.hasOwnProperty("summary")){
            let newText=text.slice(0,36);
            let numChineseCh=0;
            let len=0;
            let isOversize:boolean=false;
            for(let ch of text){
              if(this.isChineseCharacter(ch)){
                len+=2;
                numChineseCh++;
              }else len++;
              if(len>36) isOversize=true;
            }
            if(isOversize){
              newText=newText.slice(0,Math.max(33-numChineseCh,16));
              return newText+"...";
            }else return text;
          }
        }
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
            <span>
              <Typography.Link onClick={()=>this.move(record.sequence,op.MOVE_UP)}>
                <FontAwesomeIcon icon={faChevronUp}/>
              </Typography.Link>

              <Divider type="vertical"/>

              <Typography.Link onClick={()=>this.move(record.sequence,op.MOVE_DOWN)}>
                <FontAwesomeIcon icon={faChevronDown}/>
              </Typography.Link>

              <Divider type="vertical"/>

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


//#region 
// 抽屉输入框左端对齐，宽度占满 x
// 表格单元格字数限制 x
// 上下移动边界提示 x
// 选择框选项动态生成 ?
// 按钮移下去 x
// 写按钮样式删除空格占位符 x
// 上下操作传参改用枚举 x
//#endregion