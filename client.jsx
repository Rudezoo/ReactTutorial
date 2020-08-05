const React=require('react');
const ReactDom=require('react-dom');
const WordRelay=require('./script/WordRelay');
const GuGudanHook =require('./script/gugudanHook');
require('bootstrap/dist/css/bootstrap.css');

ReactDom.render(<div><WordRelay/></div>,document.querySelector('#root'));