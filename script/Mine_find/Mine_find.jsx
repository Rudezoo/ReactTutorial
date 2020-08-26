import React,{useReducer,createContext,useMemo,memo} from 'react';
import Table from './Table'
import Set from './Set';
import produce from 'immer';


export const TableContext=createContext({
    tableData:[],
    halted:false,
    dispatch:()=>{},
});

export const START_GAME='START_GAME';
export const OPEN_CELL='OPEN_CELL';
export const CLICK_MINE='CLICK_MINE';
export const MAKE_FLAG='MAKE_FLAG';
export const MAKE_QUE='MAKE_QUE';
export const MAKE_NORMAL='MAKE_NORMAL';

export const CODE={
    MINE:-7,
    NORMAL : -1,
    QUESTION : -2,
    FLAG:-3,
    QUESTION_MINE : -4,
    FLAG_MINE:-5,
    CLICKED_MINE:-6,
    OPEND:0, //0이상이면 다 opend
}

const InitialState={

    tableData:[],
    timer:0,
    result : '',
    halted : false,
};



const plantMine=(row,col,mine)=>{
    console.log(row,col,mine);


    const data=Array(row).fill().map(()=>{
        return Array(col).fill(-1);
    });

    let count=0;

    while(count<mine){
        let temprow=Math.floor(Math.random()*row);
        let tempcol=Math.floor(Math.random()*col);


        console.log("temp : "+temprow+","+tempcol);

        if(data[temprow][tempcol]===-1){
            data[temprow][tempcol]=-7;
            count=count+1;
        }
    }

    /* const candidate=Array(row*col).fill().map((arr,i)=>{
        return i;
    });

    const shuffle=[];
    while(candidate.length>row*col-mine){
        const chosen=candidate.splice(Math.floor(Math.random()*candidate.length),1)[0];
        shuffle.push(chosen);
    }
    const data=[];

    for(let i=0;i<row;i++){
        const rowData=[];
        data.push(rowData);
        for(let j=0;j<col;j++){
            rowData.push(CODE.NORMAL);
        }
    }

    for(let k=0;k<shuffle.length;k++){
        const ver=Math.floor(shuffle[k]/col);
        const hor=shuffle[k]%col;

        data[ver][hor]=CODE.MINE;
    } */
    console.log(data);
    return data;
}

const reducer=(state,action)=>{
    switch(action.type){

        case START_GAME:

            /*return  {
                ...state,
                tableData: plantMine(action.row,action.col,action.mine),
            }; */
            return produce(state,draft=>{
                draft.tableData=plantMine(action.row,action.col,action.mine);
                draft.halted=false;
                draft.result='';
                temp=[];
            });
           
        case OPEN_CELL:
             const tableData=[...state.tableData];
            tableData[action.row]=[...state.tableData[action.row]]; 
            openblank(tableData,action.row,action.col);
/*             for(let i=0;i<temp.length;i++){
                tableData[temp[i][0]][temp[i][1]]=CODE.OPEND;   
            } */
                    

/*             return{
                ...state,
                tableData,
                
            }; */
             return produce(state,draft=>{
                for(let i=0;i<temp.length;i++){
                    draft.tableData[temp[i][0]][temp[i][1]]=CODE.OPEND;   
                }
                
            });
         
        case CLICK_MINE:
            return produce(state,draft=>{
                draft.tableData[action.row][action.col]=CODE.CLICKED_MINE;
                draft.result='펑';
                draft.halted=true;
            });

        case MAKE_FLAG:
            return produce(state,draft=>{
                if(draft.tableData[action.row][action.col]===CODE.MINE){
                    draft.tableData[action.row][action.col]=CODE.FLAG_MINE;
                }else{
                    draft.tableData[action.row][action.col]=CODE.FLAG;
                }
            });
        
        case MAKE_QUE:
            return produce(state,draft=>{
                if(draft.tableData[action.row][action.col]===CODE.FLAG_MINE){
                    draft.tableData[action.row][action.col]=CODE.QUESTION_MINE;
                }else{
                    draft.tableData[action.row][action.col]=CODE.QUESTION;
                }
                
            });
        
         case MAKE_NORMAL:
            return produce(state,draft=>{
                if(draft.tableData[action.row][action.col]===CODE.QUESTION_MINE){
                    draft.tableData[action.row][action.col]=CODE.MINE;
                }else{
                    draft.tableData[action.row][action.col]=CODE.NORMAL;
                }
                
            });
                
        default:
            return state;
    }
}
let temp=[];
const openblank=(data,row,col)=>{
    let maxrow=data.length;
    let maxcol=data[0].length;
  

    console.log(row+","+col);

     if((row>=0 && col>=0)&&(maxrow>row && maxcol>col)){
        if(data[row][col]===CODE.NORMAL && (!findDupli([row,col]))){
            temp.push([row,col]);
            openblank(data,row+1,col);
            openblank(data,row,col+1);
            openblank(data,row-1,col);
            openblank(data,row,col-1);
 
 
        }else{
            return;
        }

        
    }else{
        return;
    }  
    console.log(temp);

}
const findDupli=(value)=>{
    for(let i=0;i<temp.length;i++){
        if(temp[i][0]===value[0] && temp[i][1]===value[1]){
            return true;
        }
    }
    return false;
}

const Mine_find=memo(()=>{


    const [state,dispatch]=useReducer(reducer,InitialState);
    const {tableData,halted,timer,result}=state;

    const value=useMemo(()=>({tableData,halted,dispatch}),[tableData,halted]); //dispatch는 항상 같다

    return (
        <TableContext.Provider value={value}>

            <Set></Set>

            <div>
                {state.timer}
            </div>

            <div>
                 <Table></Table>
            </div>
            <div>
                {state.result}
            </div>
           
        </TableContext.Provider>
    );
});

export default Mine_find;