import React ,{memo} from 'react'

const Under=memo((props)=>{

    const {v}=props;

    return(
    <>  &nbsp;
        <span id="under">
            {v}
        </span>
        

        <span id="space">
            &nbsp;  
        </span>
                                 
    </>  
    
    );
});

export default Under;