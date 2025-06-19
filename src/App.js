import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Journal from './components/Journal/Journal';
import './App.css';

const App = () => {
    return (
        <Router basename="/arsen-site">
            <Journal />
        </Router>
    );
};

export default App;