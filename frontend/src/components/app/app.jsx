import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Board } from '../board/Board'
import { SocialMediaWall } from '../social-media/social-media';
import './app.css'
import { AgendaExpanded } from '../agenda/agenda';

export class App extends React.Component {
    render() {
        return (
            <Router>
                <Route path="/" exact component={Board} />
                <Route path="/agenda" exact component={AgendaExpanded} />
                <Route path="/social" exact component={SocialMediaWall} />
            </Router>
        );
    }
}