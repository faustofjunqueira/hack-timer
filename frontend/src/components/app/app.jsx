import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Board } from '../board/Board'
import { SocialMediaWall } from '../social-media/social-media';
import './app.css'

export class App extends React.Component 
{
    render() {
        return (
            <Router>
                <Route path="/" exact component={Board}/>
                <Route path="/agenda" exact component={Board}/>
                <Route path="/social" exact component={SocialMediaWall}/>
            </Router>
        );
    }
}