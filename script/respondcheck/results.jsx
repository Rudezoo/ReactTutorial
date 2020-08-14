import React, { memo } from 'react';


const Results=memo( (props)=>{
    const {index,value}=props;
    return(
        <>
            <li>{index+1}번째 : {value}ms</li>
        </>
    );
}

);

export default Results;