import React, { useState, memo, useReducer, useCallback } from "react";
import Table from './Table'
import produce from 'immer';

import './TicTacToe.css'
import { useEffect } from "react";

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN'
export const RESET_WIN = 'RESET_WIN'
export const RESET_PAIR = 'RESET_PAIR'

const initialState = {
    winner: '',
    turn: 'O',
    TableData: Array.from(Array(3).fill(''), () => new Array(3).fill('')),
    recentCell:[-1,-1],
}


const reducer = (state, action) => {
    switch (action.type) {

        case SET_WINNER:
            return {
                //직접 바꾸면 안되고 새로운 객체를 만들어서 바뀐값만 바꾼다.
                ...state,
                winner: action.winner,
            };
        case CLICK_CELL:
            /* onst tableData = [...state.TableData];
            tableData[action.row] = [...tableData[action.row]]; //immer라는 라이브러리로 가독성 해결
            tableData[action.row][action.cell] = state.turn; */
            return produce(state,draft=>{
                draft.TableData[action.row][action.cell]=state.turn;
                draft.recentCell=[action.row,action.cell];
            }) 
        case CHANGE_TURN:
            return{
                ...state,
                turn : state.turn==='O'?'X':'O',
            };
        case RESET_WIN:
            return{
                ...state,
                turn: 'O',
                TableData: Array.from(Array(3).fill(''), () => new Array(3).fill('')),
                recentCell:[-1,-1],
            };
        case RESET_PAIR:
            return{
                ...state,
                winner:'',
                turn: 'O',
                TableData: Array.from(Array(3).fill(''), () => new Array(3).fill('')),
                recentCell:[-1,-1],
            };            

        default: {
            console.log("default");
            return {               
                ...state
            }
        };
    }
}

const TicTacToe = memo(() => {


    const [state, dispatch] = useReducer(reducer, initialState);
    const {winner,turn,TableData, recentCell}=state;
    /* const [winner, setwinner] = useState('');
    const [turn, setturn] = useState('');
    const [TableData, setTableData] = useState(Array.from(Array(3),()=>new Array(3))); */

    const find=()=>{
        let isfull=true;

        TableData.map((v)=>{
            v.map((vv)=>{
                return(vv===''?isfull=false:null);
            });
        });
       return isfull;
    }



    useEffect(()=>{

        if(recentCell[0]<0){
            return ;
        }

        let win=false;

         if((TableData[recentCell[0]][0]===turn && TableData[recentCell[0]][1]===turn&& TableData[recentCell[0]][2]===turn)||
        (TableData[0][recentCell[1]]===turn && TableData[1][recentCell[1]]===turn&& TableData[2][recentCell[1]]===turn)||
        (TableData[0][0]===turn&&TableData[1][1]===turn&&TableData[2][2]===turn)||
        (TableData[0][2]===turn&&TableData[1][1]===turn&&TableData[2][0]===turn)){
            win=true;
        } 

        if(win){
            dispatch({type:SET_WINNER,winner:turn});
            dispatch({type:RESET_WIN});
        }else{
           
            if(find()===true){
                console.log("비김");
                 dispatch({type:RESET_PAIR});
            }else{
                 dispatch({type: CHANGE_TURN});             
            }
            
        }
    },[recentCell]);



       useEffect(()=>{
        console.log("changecolor");
        if(turn==='X'){
            Array.from(document.getElementsByClassName("first")).map((v)=>{
                return v.className="second";
            });
        }else{
            Array.from(document.getElementsByClassName("second")).map((v)=>{
                return v.className="first";
            });
        }
    },[turn]);

 return (

        <>
        <div>
            <h2 style={
                {
                    paddingLeft:30,
                }
            }>TicTacToe</h2>
        </div>
        <div id="screen">
            <Table TableInfo={TableData} dispatch={dispatch} />
           
        </div>
        <div className="Result">
             {state.winner && <div>{winner}님의 승리</div>}
        </div>
           

        </>

    );
});
export default TicTacToe;