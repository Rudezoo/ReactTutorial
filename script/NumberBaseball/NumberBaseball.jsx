import React, {useState, useMemo} from 'react';
import Button from 'react-bootstrap/Button'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import Try from './Try'
import './Numberbaseball.css'

function RandomNum(Numbers){
    console.log('random');
    while (Numbers.length < 4) {
        var Number = Math.floor(Math.random() * 9 + 1);
        if (Numbers.length == 0) {
            Numbers.push(Number);
        }
        if (Numbers.includes(Number) == false) {
            Numbers.push(Number);
        }
    }
    return Numbers;
}

const NumBaseball=()=>{

    const [hint,setHint]=React.useState('숫자야구!');
    const [value, setValue]=React.useState('');
    const Numbers=[];
    const randoms=useMemo(()=>RandomNum(Numbers),Numbers);
    const [ball, setBall] = React.useState(randoms);
    const [Result,setResult]=React.useState('');
    const [trys,setTrys]=React.useState([]);
    const [btnstate,setbtnstate]=React.useState(true);
    const [inputstate, setinputstate] = React.useState(false);
    const onRef=React.useRef(null); //focus 사용, component는 createref 사용, 함수를 통한 focus는 미세한 컨트롤이 가능하다
    

    const onSubmit=(e)=>{
        e.preventDefault();
        if(value.length<4){
            alert('숫자를 제대로 입력하세요!');
        }else{
            if (value === ball.join('')) {
                setResult('정답');
                setValue('');
                setbtnstate(false);
                setinputstate(true);
            } else {
                const inputNum = value.split("");
                let strike = 0;
                let balls = 0;

                if (trys.length >= 9) {
                    setHint('실패! 정답은 '+ball+'이였습니다!');
                    setValue('');
                    setbtnstate(false);
                }else{
                    for (var i = 0; i < 4; i++) {
                        if (ball.includes(parseInt(inputNum[i]))) {
                            if (ball.indexOf(parseInt(inputNum[i])) == i) {
                                strike++;
                            } else {
                                balls++;
                            }
                        }
                    }

                    setHint(strike + '스트라이크' + balls + '볼 입니다.');
                    setValue('');
                    setTrys((prevTries) => [...prevTries, { try: value, result: strike + '스트라이크' + balls + '볼 입니다.' }]); //맵은 1대1일 매치..
                }
            }
        }

        onRef.current.focus();
    }

    
    const onChange=(e)=>{
        setValue(e.target.value);
        if(e.target.value.length>4){
            setValue(e.target.value.slice(0,4));
        }
    }

    const onbtnstate=()=>{
        setHint('숫자야구!');
        setTrys([]);
        setResult('');
        setValue('');
        setbtnstate(true);
    }

    return(
        <React.Fragment>
        <div className="whole">
                <h2>{hint}</h2>
                <form onSubmit={onSubmit}>
                    <input type="Number" value={value} onChange={onChange} ref={onRef} disabled={inputstate} ></input>
                    <Button type="submit" variant="primary">입력</Button>
                </form>

                <div id="try">
                    <h3>Trys : {trys.length}</h3>
                    <ul>
                        {
                            trys.map((v, i) => { //map 사용==> 배열
                                return (
                                    <Try key={v.try + v.result} hint={v} index={i} />
                                );
                            })
                        }
                    </ul>
                </div>
                <h1>{Result}</h1>
                <form onSubmit={onbtnstate}>
                    <Button type="submit" variant="primary" disabled={btnstate}>다시하기</Button>
                </form>
        </div>
           
        </React.Fragment>
    );
}

export default NumBaseball;
