import React, { useState , memo} from "react";
import './TicTacToe.css'
import Td from './Td'

const Tr=memo((props)=>{

    const {rowData,rowIndex,dispatch}=props;

    return(

        <>
            <tr>
                {
                    Array(rowData.length).fill().map((vd,i)=>(<Td rowIndex={rowIndex} cellIndex={i} boxData={rowData[i]} dispatch={dispatch}></Td>))
                } 
            </tr>
            
        </>

    );
});

export default Tr;