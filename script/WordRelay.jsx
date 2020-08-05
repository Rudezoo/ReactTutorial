const React = require('react');
const {Component} =  React;
//const Button=require('reactstrap');
//import { Button } from 'reactstrap';
const WordRelay = ()=>{

    const [value,setValue]=React.useState('hello');


    const onChange=(e)=>{
        setValue(e.target.value);
    }

    return(
    <>
        <p>{value}입니다.</p>
        <p><textarea value={value} onChange={onChange}></textarea></p>
        <div>
            <button>heelo</button>
        </div>
        

    </>    
        );
}

module.exports=WordRelay;
//export default WordRelay;