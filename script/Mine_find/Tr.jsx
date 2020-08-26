import React,{useContext,memo} from 'react';
import Td from './Td';
import {TableContext} from './Mine_find';

const Tr=memo((props)=>{
    const {tableData}=useContext(TableContext);
    const {rowIndex}=props;
    return (
        <>
            <tr>
                    {
                        tableData[0]&&Array(tableData[0].length).fill().map((v,i)=>{
                            return <Td rowIndex={rowIndex} colIndex={i}></Td>
                        })
                    }
                
            </tr>
        </>
    );
});

export default Tr;