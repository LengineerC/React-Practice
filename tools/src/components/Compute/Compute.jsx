import React, { Component } from 'react'
import './Compute.css'
export default class Compute extends Component { 
  constructor(props){
    super(props);
    // this.calc=this.calc.bind(this);
  }
  render() {
    return (
      // <button className='buttonEqual' onClick={this.calc}>=</button>
      <button className='buttonEqual' onClick={this.initCalc}>=</button>
    )
  }

  // calc=()=>{
  //   try{
  //     const result = eval(str);
  //     this.props.onClick('='+result);
  //   }catch(error){
  //       this.props.onClick('=ERROR');
  //   }
  // }//calc

  initCalc=()=>{
    let str=this.props.inputs.join("");
    let rpnString=changeToRPN(str);
    console.log(rpnString);
    this.props.rpn(rpnString);
    let res=calculateRpnStr(rpnString).toString();
    if(res!=='NaN'){
      this.props.onClick('='+res);
    }else this.props.onClick('='+'ERROR');

    function isOperator(c){
      return c==='+' || c==='-' || c==='*' || c==='/';
    }
    function isNum(c){
      let re=new RegExp('\\d{1}');
      return re.test(c);
    }
    function precedence(c){
      switch(c){
        case '+':
        case '-':
          return 1;
        case '*':
        case '/':
          return 2;
        default:
          return -1;
      }
    }
    function isNegativeSign(s,index){
      return s[index]==='-'&&(index===0||s[index-1]==='('||isOperator(s[index-1]));
    }

    function changeToRPN(s){
      let op=[];
      let rpnStr='';
      for(let i=0;i<s.length;i++){
        if( isNum(s[i]) || s[i]==='.' || isNegativeSign(s,i) ){
          rpnStr+=s[i];
          while(i+1<s.length && (isNum(s[i+1]) || s[i+1]==='.')){
            rpnStr+=s[++i];
          }
          rpnStr+=' ';
        }else if(s[i]==='('){
          op.push(s[i]);
        }else if(s[i]===')'){
          while(op.length!==0 && op[op.length-1]!=='('){
            rpnStr+=op[op.length-1];
            rpnStr+=' ';
            op.pop();
          }
          op.pop();
        }else if(isOperator(s[i])){
          while(op.length!==0 && precedence(s[i])<=precedence(op[op.length-1])){
            rpnStr+=op[op.length-1];
            rpnStr+=' ';
            op.pop();
          }
          op.push(s[i]);
        }
      }
      while(op.length!==0){
        rpnStr+=op[op.length-1];
        rpnStr+=' ';
        op.pop();
      }
      return rpnStr;
    }//changeToRPN

    function handleOperation(a,b,op){
      switch(op){
        case '+':
          return a+b;
        case '-':
          return a-b;
        case '*':
          return a*b;
        case '/':
          return a/b;
        default:
          return 0;
      }
    }

    function calculateRpnStr(s) {
      
      let elements=s.split(' ')
      elements.pop();
      let res=[]
      // console.log('elements:',elements)
      res.push(Number(elements[0]))

      for(let i=1;i<elements.length;i++){
        let e=elements[i];
        if(e!=='+' && e!=='-' && e!=='*' && e!=='/'){
          res.push(Number(e));
        }else{
          let secondNum=res.pop();
          let firstNum=res.pop();
          res.push(handleOperation(firstNum,secondNum,e));
        }
        console.log('res:',res);
      }
      return res.pop();

    }

  }//initClac
}

