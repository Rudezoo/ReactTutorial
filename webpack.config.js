/** @type {import('webpack').Configuration} */ //for autocomplete
//노드가 돌리므로 require으로 처리
const webpack = require("webpack");
const path=require('path');

module.exports={
    name : 'word-rlay-setting',
    mode : 'development', //실서비스 : production
    devtool: 'eval',
    resolve:{
        extensions: ['.js','.jsx','.css']
    },
    entry: {
        app : ['./client']
    }, //입력
    
    module: {
        rules:[{
            test : /\.jsx?$/,
            loader : 'babel-loader',
            options:{
                presets:[
                    ['@babel/preset-env',{
                    targets: {
                        browsers:['> 1% in KR'], //옵션, browserslist에서 option확인 가능
                    },
                    debug : true,
                }],
                 '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties','react-hot-loader/babel'],
            },
        },
        {
            test: /\.css$/,
            loaders : ['style-loader','css-loader?url=false'],
        }],
    },
    plugins:[
        new webpack.LoaderOptionsPlugin({debug:true}),
    ],
    output: {
        path : path.join(__dirname,'dist'),
        filename : 'app.js',
        //publicPath: '/dist/' //경로설정
        
    }, //출력
};
