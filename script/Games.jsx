import React from 'react';
import {
    BrowserRouter,
    HashRouter,
    Route,
    Link
} from 'react-router-dom';
import WordRelay from './WordRelay/WordRelay';
import NumBaseball from './NumberBaseball/NumberBaseball';
import Respondcheck from './respondcheck/respondcheck';
import RSP from './RSP/RSP';

const Games = () => {
    return (
        <BrowserRouter>
            <div className="row">

                <div className="col-md-3">
                    <nav>
                        <ul>
                        <li><Link to="/Word-Relay" className="menubar">끝말잇기</Link></li>
                            <li><Link to="/Number-baseball" className="menubar">숫자야구</Link></li>
                            <li><Link to="/Respond-Check" className="menubar">반응속도</Link></li>
                            <li><Link to="/RSP" className="menubar">가위바위보</Link></li>
                    </ul>  
                    </nav>
                                             
                </div>

                <div className="col-md-9" id="gamescreen">
                    <Route path="/Word-Relay" component={WordRelay} />
                    <Route path="/Number-baseball" component={NumBaseball}/>
                    <Route path="/Respond-Check" component={Respondcheck}/>
                    <Route path="/RSP" component={RSP} />
                </div>
            </div>
            
        </BrowserRouter>
    );
}

export default Games;