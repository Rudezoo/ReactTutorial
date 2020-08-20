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

    const randomvalue=useMemo(()=>getwinNumber,[]);
    const [Numbers, setNumbers] = useState(randomvalue);
    const [WinBall, setWinBall] = useState([]);
    const [Bonus, setBonus] = useState();
    const [retry, setretry] = useState(false);

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


    const RetryBtn=useCallback(()=>{
        setNumbers(getwinNumber());
        setWinBall([]);
        setBonus();
        setretry(false);
        time.current=[];

    });

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