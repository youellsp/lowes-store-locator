import React, {useEffect} from 'react';
import './App.css';
import MapContainer from './routes/Map.js';
import TableContainer from './routes/Table.js';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Navbar from './components/Navbar';
import {setStores} from "./actions/actions";
import {useDispatch} from "react-redux";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('http://localhost:12059/react-interview/getLowesStores')
            .then(response => response.json())
            .then(data => {
                dispatch(setStores(data));
            });
    });

    return (
    <div className="App">
        <Router>
            <Navbar />
            <Switch>
                <Route path="/map/:lat/:lng" component={MapContainer}/>
                <Route path="/map" component={MapContainer}/>
                <Route path="/table">
                    <TableContainer />
                </Route>
                <Redirect from='/' to='/map' />
            </Switch>
        </Router>
    </div>
    );
}

export default App;
