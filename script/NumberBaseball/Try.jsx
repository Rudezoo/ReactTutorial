import React, {memo} from 'react';

const Try= memo((props)=>{ //memo로 감싸는것 = pure component 사용과 같다, shouldcomponentupdate 사용도 마찬가지, 변경이 없는것은 렌더하지 않는다.
    const {index,hint}=props; //비구조화 할당
//보통 props는 부모가 바꾸지만 아니라면 state에 넣고 바꿔야한다. ex) useState
    return(
        <li>{index+1}차시도 : 입력값 [{hint.try}] , {hint.result}</li> //key가 필요할때 사용
    );
});


export default Try;