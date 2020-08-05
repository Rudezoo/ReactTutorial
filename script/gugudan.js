import React, { Component } from 'react';
import './App.css'

class MyName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: Math.ceil(Math.random() * 9),
            second: Math.ceil(Math.random() * 9),
            value: '',
            result: '',
        };
    }
    input;
    onSubmit = (e) => {
        e.preventDefault();
        if (parseInt(this.state.value) === this.state.first * this.state.second) {
            this.setState((prevState)=>{
                return {
                    result: '정답 : ' + prevState.value,
                    value: '',
                    first: Math.ceil(Math.random() * 9),
                    second: Math.ceil(Math.random() * 9),
                };                
            });
            
        } else {
            this.setState({
                result: '오답',
                value: '',

            });
            
        }
        this.input.focus();
        
    }

    onChange = (e) => { /*input값을 맘대로 못바꾸므로 컨트롤하게 해줘야한다*/
        this.setState({ value: e.target.value })
    }

    onRef= (c) =>{
        this.input=c; //focus용 ref 이렇게 따로 메서드로 빼줄 필요가 있다
    }

    render() {
        return (
            <React.Fragment>
                <div className="App">
                    <div>
                        {this.state.first} 곱하기 {this.state.second}는?
                </div>
                    <form onSubmit={this.onSubmit}>
                        <input ref={this.onRef} type="number" value={this.state.value} onChange={this.onChange} />
                        <button type="submit">입력!</button>

                    </form>

                    <div>{this.state.result}</div>
                </div>

            </React.Fragment>
        )
    }



}

export default MyName;
