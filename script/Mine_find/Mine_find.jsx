import React,{useReducer,createContext,useMemo,memo, useEffect,useRef} from 'react';
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
export const GAME_END='GAME_END';

export const INCRE_TIMER='INCRE_TIMER';

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
    halted : true,
    MineLocation:[],
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

const FindMineLocation=(Table)=>{
    let Mineloc=[];
    for(let i=0;i<Table.length;i++){
        for(let j=0;j<Table[0].length;j++){
            if(Table[i][j]===CODE.MINE){
                Mineloc.push([i,j]);
            }
        }
    }
   
    return Mineloc;
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
                draft.MineLocation=FindMineLocation(draft.tableData);
                draft.halted=false;
                draft.timer=0;
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

         case GAME_END:
            return produce(state,draft=>{
                draft.result='승리!';
                draft.halted=true;
            });

         case INCRE_TIMER:
            return {
                ...state,
                timer : state.timer +1,  
            };
                                
                
        default:
            return state;
    }
}
let temp=[];
const checkaround=(table,row,col)=>{
    if ((row+1<table.length)&&((table[row + 1][col] === CODE.MINE))) {
        return true;
    }
    if ((col+1<table.length)&&((table[row][col+1] === CODE.MINE))) {
        return true;
    }
    if ((row-1>=0)&&((table[row-1][col] === CODE.MINE))) {
        return true;
    }
    if ((col-1>=0)&&((table[row][col-1] === CODE.MINE))) {
        return true;
    }
    if ((row+1<table.length)&&(col+1<table.length)&&((table[row + 1][col+1] === CODE.MINE))) {
        return true;
    }
    if ((row-1>=0)&&(col-1>=0)&&((table[row-1][col-1] === CODE.MINE))) {
        return true;
    }
    if ((row+1<table.length)&&(col-1>=0)&&((table[row + 1][col-1] === CODE.MINE))) {
        return true;
    }
    if ((row-1>0)&&(col+1<table.length)&&((table[row- 1][col+1] === CODE.MINE))) {
        return true;
    }  

    return false;
}
const openblank=(data,row,col)=>{
    let maxrow=data.length;
    let maxcol=data[0].length;

     if((row>=0 && col>=0)&&(maxrow>row && maxcol>col)){
        if(data[row][col]===CODE.NORMAL && (!findDupli([row,col]))){
            
            temp.push([row,col]);
            
            if(checkaround(data,row,col)){
                return;
            }

            
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
    const {tableData,halted,timer,result,MineLocation}=state;

    const value=useMemo(()=>({tableData,halted,dispatch}),[tableData,halted]); //dispatch는 항상 같다


    const timeout=useRef();

    const GameEnd=()=>{
        dispatch({type:GAME_END});
    }

    useEffect(()=>{
        
        let checkloc=[];
        let allfind=false;
        checkloc=MineLocation.map((v)=>{
            return (tableData[v[0]][v[1]]===CODE.FLAG_MINE);
        });

       console.log(checkloc);

       allfind=checkloc.every((v)=>{
           return v===true;
       });

       console.log(allfind);

       if(allfind&&checkloc.length>0){
           GameEnd();
       }

    },[tableData]);

    useEffect(()=>{

        if(!halted){
                    timeout.current=setInterval(()=>{
                dispatch({type:INCRE_TIMER});
            },1000);
           
        }
        return()=>{
                    clearInterval(timeout.current);
                }
                   
    },[halted]);


    return (
        <TableContext.Provider value={value}>

            <Set></Set>

            <div>
                {timer}
            </div>

            <div>
                 <Table></Table>
            </div>
            <div>
                {result}
            </div>
           
        </TableContext.Provider>
    );
});

export default Mine_find;