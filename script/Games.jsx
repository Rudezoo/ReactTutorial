import React from 'react';
import {
    BrowserRouter,
    HashRouter,
    Route,
    Link
} from 'react-router-dom';
import WordRelay from './WordRelay/WordRelay';
import NumBaseball from './NumberBaseball/NumberBaseball';

const Games = () => {
    return (
        <BrowserRouter>
            <div className="row">

                <div className="col-md-3">
                    <nav>
                        <ul>
                        <li><Link to="/Word-Relay">끝말잇기</Link></li>
                        <li><Link to="/Number-baseball">숫자야구</Link></li>
                    </ul>  
                    </nav>
                                             
                </div>

                <div className="col-md-9" id="gamescreen">
                    <Route path="/Word-Relay" component={WordRelay} />
                    <Route path="/Number-baseball" component={NumBaseball} />
                </div>
            </div>
            
        </BrowserRouter>
    );
}

export default Games;