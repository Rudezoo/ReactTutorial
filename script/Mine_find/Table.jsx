import React,{useContext,memo} from 'react';
import Tr from './Tr';
import {TableContext} from './Mine_find';

const Table=memo(()=>{

    const {tableData}=useContext(TableContext);

    return (
        <>

            <table>
                <tbody>
                    {
                        Array(tableData.length).fill().map((v,i)=>{
                            return <Tr rowIndex={i}></Tr>
                        })
                    }
                    
                </tbody>
                
            </table>

        </>
    );
});

export default Table;