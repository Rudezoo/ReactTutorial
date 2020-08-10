import React from 'react';
import ReactDOM from 'react-dom';
import WordRelay from './script/WordRelay/WordRelay';
import NumberBaseball from './script/NumberBaseball/NumberBaseball'
//const WordRelay=require('./script/WordRelay');
//const GuGudanHook =require('./script/gugudanHook'); //노드모듈 문법
import 'bootstrap/dist/css/bootstrap.css';

import {hot} from 'react-hot-loader/root'
const Hot=hot(NumberBaseball);

ReactDOM.render(<div><NumberBaseball/></div>,document.querySelector('#root'));