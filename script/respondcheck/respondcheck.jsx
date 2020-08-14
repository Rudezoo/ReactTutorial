import React, { useState, useRef } from 'react';
import './respondcheck.css'
import Button  from 'react-bootstrap/Button';
import Results from './results'
const Respondcheck = () => {

    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('Click to Start');
    const [result, setResult] = useState([]);

    const timeout=useRef();
    const starttime = useRef();
    const endtime = useRef();

    const onClickScreen = () => {
        if(state==='waiting'){
            setState('ready');
            setMessage('Click when screen turns into Green');

            timeout.current=setTimeout(()=>{
                setState("click");
                setMessage("Click Now!");
                starttime.current=new Date();
            },Math.floor(Math.random()*1000)+2000
            );
        }else if(state==='click'){ //반응속도 체크
            endtime.current=new Date();
            setState('waiting');
            setMessage('Click to Start');
            setResult((prevState) => [...prevState, endtime.current - starttime.current]);
        }else if(state==='ready'){ //성급하게 클릭
            clearTimeout(timeout.current);
            setState('waiting');
            setMessage('Too Fast!');
        }

    }
    const Reset=()=>{
        setResult([]);   
    }

    const ResultAverage = () => { //삼항식으로 조건문
        return result.length === 0 
        ? null :
         <>
            <div id='resultpage' >평균시간: {
                    result.reduce((a, c) => {
                        return a + c
                    }) / result.length} ms </div>
            <br></br>       
            <Button onClick={Reset}>초기화</Button>        
                    
        </>
    }

    return(
        <>
            <div>
                    <div id='screen' className={state} onClick={onClickScreen}>
                        {message}
                    </div>
                    
                    <ul>
                    {
                        result.map((v, i) => {
                            return (
                              <Results key={v+i} index={i} value={v}></Results>
                            );
                        })
                    }            
                    </ul>
                           
                    {ResultAverage()}
            </div>

        </>
    );
}

export default Respondcheck;