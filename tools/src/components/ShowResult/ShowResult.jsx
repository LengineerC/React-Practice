import React, { Component } from 'react'
import './ShowResult.css'
export default class ShowResult extends Component {
  
  state={str:this.props.inputs.join('')}
  inputRef=React.createRef();
  
  componentDidUpdate(prevProps){
  //componentDidUpdate(prevProps,prevStates){
    if(prevProps.inputs!==this.props.inputs)
      this.setState({str: this.props.inputs.join('')})
    // if(prevStates.str!=this.state.str){}
  }

  updateStr=()=>{
    let res=this.inputRef.current.value;
    this.setState({str:res});
    this.props.update(res);
  }
  
  //实现计算一次后修改表达式后可继续输入
  clearState=(event)=>{
    if(this.props.computeFinished===true){
      this.setState({str:''});
      this.setState({str:event.target.value});
    }else this.setState({str:event.target.value});
  }
  // calculate=()=>{
  //   console.log(this.inputRef)
  //   console.log(this.inputRef.current.value)
  //   try{
  //     let res=eval(this.inputRef.current.value)
  //     res=this.inputRef.current.value+'='+res;
  //     this.setState({str:res})
  //   }catch(error){
  //     let res =this.inputRef.current.value+'=ERROR';
  //     this.setState({str:res})
  //   }
  // }

  render() {
    // let str=this.props.inputs.join("");
    // console.log(str);
    return (
      // <div>{this.props.inputs}</div>
      <input className='inputBar' ref={this.inputRef} value={this.state.str} onChange={event=>this.clearState(event)} onBlur={this.updateStr} />
    )
  }
}
