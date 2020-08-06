import React from 'react';
import ReactDOM from 'react-dom';
import WordRelay from './script/WordRelay';
//const WordRelay=require('./script/WordRelay');
//const GuGudanHook =require('./script/gugudanHook'); //노드모듈 문법
import 'bootstrap/dist/css/bootstrap.css';

import {hot} from 'react-hot-loader/root'
const Hot=hot(WordRelay);

ReactDOM.render(<div><Hot/></div>,document.querySelector('#root'));