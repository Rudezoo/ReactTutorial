import React, { useState , memo,useCallback} from "react";
import './TicTacToe.css';
import {CLICK_CELL} from './TicTacToe';

const Td=memo((props)=>{

    const {boxData,rowIndex,cellIndex,dispatch}=props;

    const onClickTd=useCallback(()=>{

        if(boxData){
            return;
        }
        dispatch({type: CLICK_CELL, row:rowIndex, cell:cellIndex});  

    },[boxData]);

    return(
            <td onClick={onClickTd} className="first">{boxData}</td>
    
    )
});

export default Td;