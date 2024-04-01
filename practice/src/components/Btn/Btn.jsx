import React, { Component } from 'react'
import { Button } from 'antd';
import './Btn.css';

export default class Btn extends Component {
  render() {
    return (
      <Button className={this.props.classTag===1?'btn1':'btn0'}>{this.props.tag}</Button>
    )
  }
}
