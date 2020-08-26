import React, { memo, useContext, useCallback } from 'react';
import { CODE, TableContext } from './Mine_find';
import { OPEN_CELL, CLICK_MINE, MAKE_FLAG, MAKE_QUE, MAKE_NORMAL } from './Mine_find';

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

const getTdText = (code) => {
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
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
        default:
            return '';

    }
};



const Td = memo((props) => {
    const { tableData, dispatch,halted } = useContext(TableContext);
    const { rowIndex, colIndex } = props;


    const OnClickCell = useCallback(() => {
        if(halted){
            return;
        }
        console.log("click : " + tableData[rowIndex][colIndex]);
        switch (tableData[rowIndex][colIndex]) {
            case CODE.NORMAL:
                return dispatch({ type: OPEN_CELL, row: rowIndex, col: colIndex });
            case CODE.MINE:
                return dispatch({ type: CLICK_MINE, row: rowIndex, col: colIndex });
            default:
                return;

        }

    }, [tableData[rowIndex][colIndex],halted]);

    const OnRightClickTd = useCallback((e) => {
        e.preventDefault();
        if(halted){
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
    }, [tableData[rowIndex][colIndex],halted]);

    return (
        <>
            <td
                style={
                    getTdStyle(tableData[rowIndex][colIndex])
                }
                onClick={OnClickCell}
                onContextMenu={OnRightClickTd}
            >{getTdText(tableData[rowIndex][colIndex])}</td>
        </>
    );
});

export default Td;