import React from "react";

class ShowRpn extends React.Component{
    state={str:this.props.rpnStr}
    // inputNode=React.createRef();

    componentDidUpdate(prevProps){
        if(prevProps.rpnStr!==this.props.rpnStr){
            this.setState({str:this.props.rpnStr})
        }
    }

    render(){
        return(
            <input className="inputBar" disabled="disabled" value={this.state.str} placeholder="RPN String"/>
        )
    }
}

export default ShowRpn;

