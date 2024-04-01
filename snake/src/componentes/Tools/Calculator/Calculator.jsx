import React, { useState } from 'react';
import './Calculator.css';
import Compute from '../Compute/Compute';
import InputNumsAndOps from '../InputNumsAndOps/InputNumsAndOps';
import Operations from '../Operations/Operations';
import ShowResult from '../ShowResult/ShowResult';
import ShowRpn from '../ShowRpn/ShowRpn';


export default function Calculator() {
    const [inputs, setInput]=useState([]);
    const [computeFinished, setComputeFinished]=useState(false);
    const [inputBarClass, setInputBarClass]=useState('result');
    const [rpnStr,setRpnStr]=useState('');
  
    const verify=(inputArr)=>{
      const re=new RegExp('^[\\-]?\\d+(\\.\\d+)?([\\+\\-\\*\\/]\\d+(\\.\\d+)?)*$')
      let str=inputArr.join('');
      // console.log(inputArr);
      // console.log(str,re.test(str));
      return re.test(str);
    }
  
    const addInput=(n)=>{
      if(computeFinished===false){
        setInput([...inputs,n]);
        if(verify([...inputs,n])){
          setInputBarClass('result');
        }else{
          setInputBarClass('result_invalid');
        }
      }
      else {
        setInput([n]);
        setInputBarClass('result');
        setComputeFinished(false);
      }
      
    }
  
    const printResult=(str)=>{
      if(computeFinished===false){
        setInput([...inputs,str]);
        setComputeFinished(true);
      }else{
        setInput([]);
        setComputeFinished(false);
      }
    }
  
    const percent=(res)=>{
      if(computeFinished===false){
        setInput([...inputs,res]);
        setComputeFinished(true);
      }else{
        setInput([]);
        setComputeFinished(false);
      }
    }
  
    const clearInputs=()=>{
      setInput([]);
      setComputeFinished(false);
      setInputBarClass('result');
      setRpnStr('');
    }
  
    const backSpace=()=>{
      let newInputs=[...inputs];
      if(computeFinished===true) {
        setInput([]);
        setInputBarClass('result');
      }
      else if(newInputs.length>0){
        newInputs.pop();
        if(verify(newInputs)){
          setInputBarClass('result');
        }else setInputBarClass('result_invalid');
        setInput(newInputs);
      }
    }
  
    const updateDisplay=(newStr)=>{
      // alert(newStr)
      if(computeFinished===true) {
        setInput([])
        setComputeFinished(false);
      }
      let res=[];
      for(let i=0;i<newStr.length;i++){
        res.push(newStr[i]);
      }
      setInput([...res]);
    }
  
    const saveRPN=(str)=>{
      setRpnStr(str);
    }
  
    return (
      <div className='container'>
        <div className={inputBarClass}><ShowResult inputs={inputs} computeFinished={computeFinished} update={newStr=>updateDisplay(newStr)}/></div>
  
        <div className='point'><InputNumsAndOps tag='.' onClick={()=>addInput('.')}/></div>
        <div className='number0'><InputNumsAndOps tag='0' onClick={()=>addInput('0')}/></div>
        <div className='number1'><InputNumsAndOps tag='1' onClick={()=>addInput('1')}/></div>
        <div className='number2'><InputNumsAndOps tag='2' onClick={()=>addInput('2')}/></div>
        <div className='number3'><InputNumsAndOps tag='3' onClick={()=>addInput('3')}/></div>
        <div className='number4'><InputNumsAndOps tag='4' onClick={()=>addInput('4')}/></div>
        <div className='number5'><InputNumsAndOps tag='5' onClick={()=>addInput('5')}/></div>
        <div className='number6'><InputNumsAndOps tag='6' onClick={()=>addInput('6')}/></div>
        <div className='number7'><InputNumsAndOps tag='7' onClick={()=>addInput('7')}/></div>
        <div className='number8'><InputNumsAndOps tag='8' onClick={()=>addInput('8')}/></div>
        <div className='number9'><InputNumsAndOps tag='9' onClick={()=>addInput('9')}/></div>
  
        <div className='operate4'><InputNumsAndOps tag='/' onClick={()=>addInput('/')}/></div>
        <div className='operate5'><InputNumsAndOps tag='*' onClick={()=>addInput('*')}/></div>
        <div className='operate6'><InputNumsAndOps tag='+' onClick={()=>addInput('+')}/></div>
        <div className='operate7'><InputNumsAndOps tag='-' onClick={()=>addInput('-')}/></div>
  
        <div className='operate1'><Operations op='AC' onClick={()=>clearInputs()}/></div>
        <div className='operate2'><Operations op='BACK' onClick={()=>backSpace()}/></div>
        <div className='operate3'><Operations op='%' inputs={inputs} onClick={(res)=>percent(res)}/></div>
        
        <div className='operate8'><Compute inputs={inputs} onClick={(str)=>printResult(str)} rpn={(str)=>{saveRPN(str)}}/></div>
  
        <div className='rpn'><ShowRpn rpnStr={rpnStr}/></div>
      </div>
    );
}
