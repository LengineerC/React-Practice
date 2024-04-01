import React, { Component } from 'react'
import './Operations.css';
export default class Operations extends Component {
  handleClick=()=>{
    let tag=this.props.op;
    if(tag!=='%') return this.props.onClick();
    else this.calcPercent();
  }
  calcPercent=()=>{
    const re=new RegExp('^(\\-?\\d+)(\\.\\d+)?$');
    let str=this.props.inputs.join("");
    // console.log('str=',str)
    // console.log(re.test(str))
    if(re.test(str)){
        let res=Number(str)/100;
        // console.log(res);
        this.props.onClick("%="+res);
    }else{
        this.props.onClick('%=ERROR');
    }

}
  render() {
      let tag=this.props.op;
    return (
      <button className='buttonOp1' onClick={this.handleClick}>{tag}</button>
    )
  }
}
