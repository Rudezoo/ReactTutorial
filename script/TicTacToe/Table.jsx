import React, { useState , memo} from "react";
import './TicTacToe.css'
import Tr from "./Tr";

const Table=memo((props)=>{

    const {onClick,TableInfo,dispatch}=props;

    return(

        <>  
            <table>
                <tbody>
                    {Array(TableInfo.length).fill().map((tr,i)=>(<Tr rowIndex={i} rowData={TableInfo[i]} dispatch={dispatch}></Tr>))}
                </tbody>
            </table>            
        </>

    );
});

export default Table;