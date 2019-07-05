import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AgendaBoard, Board, SocialMediaWallBoard } from '../board/Board';
import './app.css';

export class App extends React.Component {
    render() {
        return (
            <Router>
                <Route path="/" exact component={Board} />
                <Route path="/agenda" exact component={AgendaBoard} />
                <Route path="/social" exact component={SocialMediaWallBoard} />
            </Router>
        );
    }
}