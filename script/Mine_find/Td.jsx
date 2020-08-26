import React, { memo, useContext, useCallback } from 'react';
import { CODE, TableContext } from './Mine_find';
import { OPEN_CELL, CLICK_MINE, MAKE_FLAG, MAKE_QUE, MAKE_NORMAL } from './Mine_find';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
            return {
                background: '#444',
            };
        case CODE.MINE:
            return {
                background: '#444',
            };
        case CODE.OPEND:
            return {
                background: 'white',
            };
        case CODE.CLICKED_MINE:
            return {
                background: 'red',
            };
        case CODE.FLAG:
            return {
                background: 'blue',
            };
        case CODE.FLAG_MINE:
            return {
                background: 'blue',
            };
        case CODE.QUESTION:
            return {
                background: 'yellow',
            };
        case CODE.QUESTION_MINE:
            return {
                background: 'yellow',
            };
        default:
            return {
                background: 'white',
            }

    }
};


const getTdText = (table, row, col) => {

    let code = table[row][col];
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return '';
        case CODE.CLICKED_MINE:
            return '펑';
        case CODE.FLAG:
            return '!';
        case CODE.FLAG_MINE:
            return '!';
        case CODE.QUESTION:
            return '?';
        case CODE.QUESTION_MINE:
            return '?';
        case CODE.OPEND:
            let save=countMine(table, row, col);
            if(save===0){
                return '';
            }else{
                 return save;
            }
           
        default:
            return '';

    }
};

const countMine = (table, row, col) => {

    let mincount = 0;
    console.log(row + "," + col);

    if ((row < table.length && col < table[0].length)) {
        console.log("check");

        
        if ((row+1<table.length)&&((table[row + 1][col] === CODE.MINE)||(table[row + 1][col] === CODE.QUESTION_MINE)||(table[row + 1][col] === CODE.FLAG_MINE)) ) {
            mincount++;
        }
        if ((col+1<table.length)&&((table[row][col+1] === CODE.MINE)||(table[row][col+1] === CODE.QUESTION_MINE)||(table[row][col+1] === CODE.FLAG_MINE))) {
            mincount++;
        }
        if ((row-1>=0)&&((table[row-1][col] === CODE.MINE)||(table[row-1][col] === CODE.QUESTION_MINE)||(table[row-1][col] === CODE.FLAG_MINE))) {
            mincount++;
        }
        if ((col-1>=0)&&((table[row][col-1] === CODE.MINE)||(table[row][col-1] === CODE.QUESTION_MINE)||(table[row][col-1] === CODE.FLAG_MINE))) {
            mincount++;
        }
        if ((row+1<table.length)&&(col+1<table.length)&&((table[row + 1][col+1] === CODE.MINE)||(table[row + 1][col+1] === CODE.QUESTION_MINE)||(table[row + 1][col+1] === CODE.FLAG_MINE))) {
            mincount++;
        }
        if ((row-1>=0)&&(col-1>=0)&&((table[row-1][col-1] === CODE.MINE)||(table[row-1][col-1] === CODE.QUESTION_MINE)||(table[row-1][col-1] === CODE.FLAG_MINE))) {
            mincount++;
        }
        if ((row+1<table.length)&&(col-1>=0)&&((table[row + 1][col-1] === CODE.MINE)||(table[row + 1][col-1] === CODE.QUESTION_MINE)||(table[row + 1][col-1] === CODE.FLAG_MINE))) {
            mincount++;
        }
        if ((row-1>0)&&(col+1<table.length)&&((table[row- 1][col+1] === CODE.MINE)||(table[row- 1][col+1] === CODE.QUESTION_MINE)||(table[row- 1][col+1] === CODE.FLAG_MINE))) {
            mincount++;
        }  





    }


    console.log(mincount);
    return mincount;

}


const Td = memo((props) => {
    const { tableData, dispatch, halted } = useContext(TableContext);
    const { rowIndex, colIndex } = props;



    const OnClickCell = useCallback(() => {
        if (halted) {
            return;
        }

        switch (tableData[rowIndex][colIndex]) {
            case CODE.NORMAL:
                return dispatch({ type: OPEN_CELL, row: rowIndex, col: colIndex });
            case CODE.MINE:
                return dispatch({ type: CLICK_MINE, row: rowIndex, col: colIndex });
            default:
                return;

        }

    }, [tableData[rowIndex][colIndex], halted]);

    const OnRightClickTd = useCallback((e) => {
        e.preventDefault();
        if (halted) {
            return;
        }
        switch (tableData[rowIndex][colIndex]) {
            case CODE.NORMAL:
                return dispatch({ type: MAKE_FLAG, row: rowIndex, col: colIndex });
            case CODE.FLAG:
                return dispatch({ type: MAKE_QUE, row: rowIndex, col: colIndex });
            case CODE.QUESTION:
                return dispatch({ type: MAKE_NORMAL, row: rowIndex, col: colIndex });
            case CODE.FLAG_MINE:
                return dispatch({ type: MAKE_QUE, row: rowIndex, col: colIndex });
            case CODE.QUESTION_MINE:
                return dispatch({ type: MAKE_NORMAL, row: rowIndex, col: colIndex });
            case CODE.MINE:
                return dispatch({ type: MAKE_FLAG, row: rowIndex, col: colIndex });
            default:
                return '';

        }
    }, [tableData[rowIndex][colIndex], halted]);

    return (
        <>
            <td
                style={
                    getTdStyle(tableData[rowIndex][colIndex])
                }
                onClick={OnClickCell}
                onContextMenu={OnRightClickTd}
            >{getTdText(tableData, rowIndex, colIndex)}</td>
        </>
    );
});

export default Td;