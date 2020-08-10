import React,{ useState } from 'react';
//const Button=require('reactstrap');
import  Button  from 'react-bootstrap/Button';
import './WordRelaycss.css'
const WordRelay = ()=>{

    const [word,setWord]=useState('김주언');
    const [value,setValue]=useState('글자를 입력하세요');
    const [result,setResult]=useState('');
    const onRef = React.useRef(null);

    const onChange=(e)=>{
        setValue(e.target.value);
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        if(word.charAt(word.length-1)===value.charAt(0)){
            setResult('딩동댕');
            setWord(value);
            setValue('');
        }else{
            setResult('땡');
            setValue('');
        }
        onRef.current.focus();
    }

    return(
    <React.Fragment>
        <div className="WORD">{word}</div>
        <div className="article">
            <form onSubmit={onSubmit}>
                <input className="wordinput" ref={onRef} onChange={onChange} type='text' value={value} ></input>
                <Button variant="primary" type="submit">입력!!</Button>
            </form>       
            {result}
        </div>
    </React.Fragment>    
        );
}

//module.exports=WordRelay;
export default WordRelay;