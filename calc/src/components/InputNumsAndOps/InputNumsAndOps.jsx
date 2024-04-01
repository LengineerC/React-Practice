import React, { Component } from 'react'
import './InputNumsAndOps.css'

export default class InputNumsAndOps extends Component {
  constructor(props){
    super(props);
    this.state={keyValue:this.props.tag};
  }
  componentDidMount(){
    if(this.state.keyValue!=='.'){
      this.setState({value:parseInt(this.state.keyValue)})
    }
  }
  handleClick=()=>{
    return this.props.onClick();
  }
  render() {
    const style=()=>{
      let tag=this.state.keyValue;
      switch(tag){
        case '0':
          return 'buttonNum0';
        case '+':
        case '-':
        case '*':
        case '/':
          return 'buttonOp2';
        default:
          return 'buttonNum';
      }
    }
    return (
      <button className={style()} onClick={this.handleClick}>{this.state.keyValue}</button>
    )
  }
}
