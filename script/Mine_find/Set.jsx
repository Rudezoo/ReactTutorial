import React ,{useState,memo,useCallback,useContext}from 'react';
import {Input,Row,Col,Button,InputNumber,Typography} from 'antd';
import {TableContext} from './Mine_find';

import {START_GAME} from './Mine_find';

const Set =memo(()=>{


    const [row, setrow] = useState(5);
    const [col, setcol] = useState(5);
    const [mine, setmine] = useState(10);
    const {dispatch}=useContext(TableContext);

    const OnChangerow=useCallback((e)=>{
        setrow(e);
    },[row]);
    const OnChangecol=useCallback((e)=>{
        setcol(e);
    },[col]);
    const OnChangemine=useCallback((e)=>{

        if(e>row*col){
            alert("Mine can not over Box");
            setmine(0);
        }else{
            setmine(e);
        }
       
    },[mine]);


    const OnButtonCLK=useCallback(()=>{
        dispatch({type:START_GAME, row,col,mine});
    },[row,col,mine]);

    return(
        <>
             <form type="submit">
                <div className="site-input-group-wrapper">
                    <Input.Group size="small">
                        <Row>
                            <Col span={4}>
                                <Typography.Text type="secondary">Row</Typography.Text>
                                &nbsp;
                                {/* <input onChange={OnChangerow} value={row}></input> */}
                                 <InputNumber onChange={OnChangerow} value={row}></InputNumber> 
                            </Col>
                            <Col span={4}>
                            <Typography.Text type="secondary">Col</Typography.Text>
                                &nbsp;
                                <InputNumber onChange={OnChangecol} value={col}></InputNumber>
                            </Col>
                            <Col span={4}>
                            <Typography.Text type="secondary">Mine</Typography.Text>
                                &nbsp;
                                <InputNumber onChange={OnChangemine} value={mine}></InputNumber>
                            </Col>
                            <Col span={3} style={
                                {
                                    paddingTop:5,
                                }
                            }>
                                <Button size="small" onClick={OnButtonCLK}>Make</Button>
                            </Col>
                        </Row>
                    </Input.Group>

                </div>
                
            </form>
        </>
    );

});

export default Set;