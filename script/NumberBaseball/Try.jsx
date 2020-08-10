import React from 'react';

const Try=(props)=>{

    return(
        <li>{props.index+1}차시도 : 입력값 [{props.hint.try}] , {props.hint.result}</li> //key가 필요할때 사용
    );
}

export default Try;