import React,{useState,useRef, useEffect} from 'react';
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

    word=file.split(';');

    return word;

}
const makemap=(array)=>{
    const temp=[];
    var size=array.length;

    for(var i=0;i<size;i++){
        temp[i]=i;
    }

    console.log(size);

    return temp;
}


const Hangman=()=>{
    
    //const [GameWords, setGameWords] = useState(Words(txt));  
    const [imgCoord, setimgCoord] = useState(position[1]);
    
    var save; 
    var temp;
    //var result=[];   
    save=Words(txt);
    temp=save[Math.floor(Math.random()*3)];
    var empty=[];

    for (var i = 0; i < temp.length; i++) {
        empty.push('?');
    }
  
    //result=save[Math.floor(Math.random()*2)];
    
    const [result, setresult] = useState(empty);
   
   

    const onClickBtn=()=>{
        result[3]="i";
        setresult((prevresult)=>[...prevresult]);

        console.log(result);
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
                    backgroundPosition:imgCoord,
                    
                }
            }></div>
            <div>
                {result}
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
                <Button onClick={onClickBtn}>Check</Button>
            </div>
        </>
    );
}

export default Hangman;