import React,{useState,useRef,useEffect}from 'react';
import './RSP.css';
import Button from 'react-bootstrap/Button';

//class의 경우 -> constructor->render->ref->componentDidMount->setstate/prop -> render-> componentDidUpdate()
//부모가 나를 없앴을때 -> componentWillUnmount() ->소멸

const rspCoords={
    가위:0,
    바위 : 400,
    보 : 200,
};

const scores={
    가위: 1,
    바위: 0,
    보: -1,
};

const Computerchoice=(imgCoord)=>{
    return Object.keys(rspCoords).find(key=>rspCoords[key]===imgCoord);
}

const RSP=()=>{

    const [result, setresult] = useState('');
    const [score, setscore] = useState(0);
    const [computerscore, setcomputerscore] = useState(0);
    const [imgCoord, setimgCoord] = useState(rspCoords.가위);

    const [retry, setretry] = useState(false);
    const [buttondisabled, setbuttondisabled] = useState(false);

    const Interval=useRef();
    

    const ChangeHand=()=>{
        if(imgCoord===rspCoords.가위){
            setimgCoord(rspCoords.바위)
        } else if (imgCoord === rspCoords.바위) {
            setimgCoord(rspCoords.보)
        }
        else if (imgCoord === rspCoords.보) {
            setimgCoord(rspCoords.가위)
        }
    }
    

    //componentDidMount() [첫 렌더링 후], componentDidUpdate()[렌더링 후], componentWillUnmount()[컴포넌트가 제거되기 직전]

    useEffect(() => { //위의 설명과 비슷한 역할 수행 componentDidMount(),componentDidUpdate()의 합성?
        Interval.current=setInterval(ChangeHand,100);
        return () => { //componentWillUnmount() 역할
            clearInterval(Interval.current);
        };
    }, [imgCoord]);

    const onClickBtn = (choice) => () => {
        setretry(true);
        setbuttondisabled(true);
        clearInterval(Interval.current);
    
        
        var mychoice=scores[choice];
        var computerchoices=scores[Computerchoice(imgCoord)];
        var diff=mychoice-computerchoices;
        console.log(mychoice);
        console.log(computerchoices);
        console.log(diff);
        if(diff===0){
            setresult("비겼습니다!");
        }else if(diff===-1 || diff===2){
            setresult("이겼습니다!");
            setscore(score + 1);
        }else{
            setresult("졌습니다!");
            setcomputerscore(computerscore+1);
        }
    }
    const Retry=()=>{
        Interval.current = setInterval(ChangeHand, 100);
        setresult('');
        setbuttondisabled(false);
    }

    return(
        <>
            <div>
                <h1>가위바위보</h1>
            </div>
            <div id='computer' style={
                {
                    backgroundImage :'url(../../img/RSP_pic.jpg)',
                    backgroundPosition : imgCoord,
                }
            }>

            </div>
            <div id='buttons'>
                <Button id='s' onClick={onClickBtn('가위')} disabled={buttondisabled}>가위</Button>
                <Button id='r' onClick={onClickBtn('바위')} disabled={buttondisabled}>바위</Button>
                <Button id='p' onClick={onClickBtn('보')} disabled={buttondisabled}>보</Button>

                {
                    retry? <Button onClick={Retry}>Retry</Button>:null
                }
            </div>
            <div id='result'>
                {result}
            </div>

            <div id="scores">
                <h5>컴퓨터 : 플레이어</h5>{computerscore} : {score}
            </div>


            
            
        </>
    );
}


export default RSP;
