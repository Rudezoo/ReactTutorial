import React,{useState} from 'react';
import txt from './Words.txt'


const Words=(file)=>{
    var word=[];

    word=file.split('\n');

    return word;

}

const Hangman=()=>{
    
    const [GameWords, setGameWords] = useState(Words(txt));


    return(
        <>
            {GameWords[0]}
        </>
    );
}

export default Hangman;