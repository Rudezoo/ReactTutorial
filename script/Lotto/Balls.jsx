import React, { memo } from 'react';

const Balls = memo((props) => {
    const { num, index } = props;

    let Backcolor;

    if(num<=10){
        Backcolor='red';
    }else if(num<=20){
        Backcolor='orange';
    }else if(num<=30){
        Backcolor='yellow';
    }else if(num<=40){
        Backcolor='blue';
    }else{
        Backcolor='green';
    }


    return (
        <>
            <span id='circle' className={Backcolor}>
                {num}
            </span>
            
        </>

    );



});

export default Balls;