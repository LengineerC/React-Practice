import './App.css';
import InputBar from './components/InputBar/InputBar';
// import Btn from './components/Btn/Btn';
import React,{useEffect, useState} from 'react';
import { Button } from 'antd';

function App() {
  let textStyle1={color:'red'};
  let textStyle2={
    width:'120px',
  };

  const initialData = {
    paramJson: {
      addr: "192.168.0.1",
      port: "24",
      userName: "admin",
      password: "123456"
    },
    formContent: [
      { label: "连接地址", defaultValue: "192.168.0.1", field: "addr", type: "string", required: "true" },
      { label: "端口号", defaultValue: "21", field: "port", type: "string", required: "true" },
      { label: "用户名", defaultValue: "user", field: "userName", type: "string", required: "true" },
      { label: "密码", defaultValue: "password", field: "password", type: "string", required: "true" }
    ]
  };
  // const [paramJson,setParam]=useState(initialData.paramJson);
  // const [formContent,setFormContent]=useState(initialData.formContent);
  const [inputs,setInputs]=useState(()=>{
    console.log('inputs setted');
    return initialData.formContent.reduce((prevItems,item)=>({
      ...prevItems,
      [item.field]:item.defaultValue
    }),{})
  });
  const [valid,setValid]=useState(true);

  let saveInputs=(field,str)=>{
    // console.log(field,str);
    setInputs(prevInputs=>({
        ...prevInputs,
        [field]:str
    }));
  }
  // useEffect(()=>{
  //   console.log(inputs);
  // },[inputs])

  // useEffect(()=>{
  //   initialData.formContent.map(item=>{
  //     setInputs(prevInputs=>({
  //       ...prevInputs,
  //       [item.field]:item.defaultValue
  //     }))
  //   })
  // },[]);//后于组件挂载之后运行

  let updateValid=(v)=>{
    // console.log(v);
    setValid(v);
  }

  let clearInputs=()=>{
    const newInputs={};
    for(let key in inputs){
      newInputs[key]='';
    }
    setInputs(newInputs);
  }

  let submit=()=>{
    if(valid){
      initialData.paramJson=inputs;
      alert('Submit successed!\n')
      alert(JSON.stringify(initialData.paramJson,null,2));
    }else{
      alert('IP address error!');
    }
  }

  return (
    <div className='main'>
      {initialData.formContent.map((item,index)=>{
        return(
          <div className='container' key={index}>
            <div style={textStyle2}>
              <span style={textStyle1}>* </span>
              {item.label}:&nbsp;
            </div>
            <InputBar
              value={inputs[item.field]}
              field={item.field}
              inputs={(field,str)=>saveInputs(field,str)}
              updateValid={(v)=>updateValid(v)}
            />
          </div>
        )
      })}

      <div className='container'>
        <Button className='btn1' onClick={submit}>确定</Button>
        <Button className='btn0' onClick={clearInputs}>取消</Button>
      </div>
    </div>
  );
}

export default App;
