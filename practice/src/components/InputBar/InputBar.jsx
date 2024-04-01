import React from "react";
import { Input } from "antd";
import './InputBar.css';

export default class InputBar extends React.Component{
    state={
        field:'',
        addrValid:true
    };
    handleChange=(event)=>{
        let inputs=event.target.value;
        // let inputs=this.props.value;
        // console.log(inputs)
        if(this.props.field==='addr'){
            const regAddr=new RegExp('^\\d{1,3}(\.\\d{1,3}){3}$');
            // console.log(regAddr.test(inputs))
            this.setState({addrValid:regAddr.test(inputs)});
            this.props.inputs(this.state.field,inputs);
            this.props.updateValid(regAddr.test(inputs));
        }else this.props.inputs(this.state.field,inputs);
    }
    componentDidMount(){
        // console.log('InputBar mounted');
        this.setState({
            field:this.props.field
        });
    }
    render(){
        return (
            <Input 
                className={this.state.addrValid===true?'inputBar':'addrInvalid'} 
                onChange={this.handleChange} 
                value={this.props.value}
            />
        )
    }
}

