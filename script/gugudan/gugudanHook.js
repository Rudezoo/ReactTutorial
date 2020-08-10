const React = require('react');
const {useState, useRef} =  React;

const MyName2=()=>{ //hooks 사용

    const [first,setFirst]=React.useState(Math.ceil(Math.random()*9));
    const [second,setSecond]=React.useState(Math.ceil(Math.random()*9));
    const [value,setvalue]=React.useState('');
    const [result,setResult]=React.useState('');
    const onRef = React.useRef(null);

    

    const onChange=(e)=>{
        setvalue(e.target.value);
    }
    const onSubmit=(e)=>{
        e.preventDefault();
        if(parseInt(value)===first*second){
            setResult((prevResult)=>{
                return '정답 :'+ value
            });
            setFirst(Math.ceil(Math.random()*9));
            setSecond(Math.ceil(Math.random()*9));
            setvalue('');
        }else{
            setResult('오답');
            setvalue('');
        }
        onRef.current.focus();
    }

    return (
    <>
       {first}곱하기{second}는?
       <form onSubmit={onSubmit}>
            <input ref={onRef} onChange={onChange} type="number" value={value} />
            <button type="submit">입력!</button>
        </form>
        <div id="result">{result}</div>

    </>
    );
}

module.exports=MyName2;