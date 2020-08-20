import React,{useState,useRef, useEffect,memo,useMemo} from 'react';
import txt from './Words.txt'
import './Hangman.css';
import Under from './underline';
import Button from 'react-bootstrap/Button';

const position={
    1:-4,
    2:-287,
    3:-570,
    4:-833,
    5:-1138,
    6:-1421,
    7:-1704,
    8:-1987,
    9:-2270,
    10:-2553
}

const Words=(file)=>{
    var word=[];
    word=file.split(':');
    return word;
}

const getWord=()=>{
    let save; 
    let temp;
     
    save=Words(txt);
    temp=save[Math.floor(Math.random()*3)].split("");
    let empty=[];

    temp.forEach((v)=>{
        return empty.push(' ');
    });
    
    /*for (let i = 0; i < temp.length; i++) {
        empty.push(' ');
    }*/
    return temp;
}

const getEmpty=(word)=>{
    let empty=[];

    word.forEach((v)=>{
        return empty.push(' ');
    });

    return empty;
}

const Checking=(Word,value)=>{
    let index=[];
    Word.forEach((v,i)=>{
        return (
            v===value?index.push(i):null
        );
    });
    return index;
    
}


const Hangman=memo(()=>{
    
    //const [GameWords, setGameWords] = useState(Words(txt)); 
    
     const [pos, setpos] = useState(1);
     
  
    //result=save[Math.floor(Math.random()*2)];
    const getwd=useMemo(()=>getWord(),[]);
    const getEpy=useMemo(()=>getEmpty(getwd),[]);

    const [result, setresult] = useState(getEpy);
    const [value, setvalue] = useState('');
    const [disable, setdisable] = useState(false);

    const point=useRef();
   
    useEffect(()=>{
        point.current.focus();
        return()=>{

        }
    },[]);

    const OnSubmit=(e)=>{
        e.preventDefault();

        setvalue('');

        let index=Checking(getwd,value);

        if(index.length>0){
            index.map((v)=>{
                return getEpy[v]=getwd[v];
            });

            if(!result.find((v)=>{
                return (v===' ');
            })){
                setresult(result);
                setvalue('Win');
            }

        }else{
            if(pos===9){
                setresult([]);
                setvalue('Game over');
                setpos(pos+1);
                setdisable(true);
            }else{
                setpos(pos+1);
            }
        }

        point.current.focus();

    }
  
    

    const OnChange=(e)=>{
        setvalue(e.target.value);
        if(e.target.value.length>1){
            setvalue(e.target.value.slice(0,1));
        }

        if(parseInt(e.target.value)>=0 && parseInt(e.target.value)<=10 ){
            setvalue('');
        }
    }

    return(
        <> 
            <div>
                 <h2>HangMan</h2>
            </div>
            <div id="hang" style={
                {
                    backgroundImage:'url(../../img/hangman.png)',
                    //-4,-287,-570,-833,-1138,-1421,-1704,-1987,-2270,-2553
                    backgroundPosition:position[pos],
                    
                }
            }></div>
            <div>
                
            </div>

            <div>
                {
                    
                    result.map((v,i)=>{
                        return(   
                            <Under key={v+i} v={v}></Under>
                        );
                    })
                }
            </div>
            <div>
                <form onSubmit={OnSubmit}>
                    <input type="text" value={value} onChange={OnChange} ref={point}></input>
                    <Button type="submit" disabled={disable}>입력</Button>
                </form>
                
            </div>
        </>
    );
});

export default Hangman;