import React,{useState,memo,useRef, useEffect, useMemo,useCallback} from 'react';
import Balls from './Balls'
import './Lotto.css'
import Button from 'react-bootstrap/Button'

const Duplicate=(WinNumbers,InputNumber)=>{

    if(WinNumbers.length>0){
        var Dupli=WinNumbers.find((v)=>{
           return v===InputNumber;
        });
        
        if(Dupli){
            return true;
        }else{
            return false;
        }
    }else{
        false;
    }

}

const getwinNumber=()=>{
    console.log("getWinNumber");
    var WinNumbers=[];
    while(WinNumbers.length<7){
        var InputNumber=Math.floor(Math.random()*45+1);
        if(!Duplicate(WinNumbers,InputNumber)){
            WinNumbers.push(InputNumber);
        }       
    }
    return WinNumbers;
}


const Lotto =memo(()=>{

    const randomvalue=useMemo(()=>getwinNumber,[]); //usecallback은 함수를 기억
    const [Numbers, setNumbers] = useState(randomvalue);
    const [WinBall, setWinBall] = useState([]);
    const [Bonus, setBonus] = useState();
    const [retry, setretry] = useState(false);

    //hooks에서는 순서가 중요, 조건문에 useState를 넣지 말아라, 최상위 바깥에다 빼서 넣어라!

    const time=useRef([]);


    useEffect(()=>{
        for(let i=0;i<Numbers.length-1;i++){
            time.current[i]=setTimeout(()=>{
                setWinBall((prevWinBall)=>[...prevWinBall,Numbers[i]]);
            },(i+1)*1000);
        }

        time.current[6]=setTimeout(()=>{
            setBonus(Numbers[6])

        },7000);
        time.current[7]=setTimeout(()=>{
            setretry(true);
        },8000);
        return()=>{
            time.current.forEach((v)=>{
                clearTimeout(v);
            });
            
        };
    },[Numbers /**time.current */]);

    /**
     * 
     * componentDidUpdate만 하고싶다!
     * 
     * const mounted=useRef(false);
     * useEffect(()=>{
     * if(!mounted.current){
     *      mounted.current=true;
     * }else{
     * 
     * //ajax
     * 
     * }
     * });
     * 
     */

    const RetryBtn=useCallback(()=>{ //usecallback은 만약 새로운 state가 필요하다면 쓰면안된다?
        console.log("retry");
        setNumbers(getwinNumber());
        setWinBall([]);
        setBonus();
        setretry(false);
        time.current=[];

    },[]);//두번째 배열에 usememo나 useeffect와 같이 배열안 요소가 변화할때 새로 시작한다.
    // 자식컴포넌트에 함수를 넘길때, usecallback을 해줘야한다.

    return(
        <>
            <div>
                <h2>Lotto</h2>
            </div>
            <div>
               {
                   WinBall.map((v,i)=>{
                       return(
                            <Balls key={v} num={v} index={i}></Balls>
                       );
                       
                   })
               }              
            </div>
               {
                   Bonus? <>

                   <p>
                       Bonus
                   </p>
                   <div id="circle" className="Bonus">
                        {Bonus}
                   </div>
                   
                   </> :null
               }
            <div>
                {
                    retry? <Button onClick={RetryBtn}>Retry</Button> : null
                }
                
            </div>
        </>
    );

});

export default Lotto;