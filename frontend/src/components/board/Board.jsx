import React from 'react';
import { CountdownTimerHeader, CountdownTimer } from '../countdown/countdown';
import { SocialMediaWall } from '../social-media/social-media';
import './board.css';
import { AgendaExpanded } from '../agenda/agenda';
import { getConfig } from '../config/config.service';
import { getActivities } from '../agenda/agenda.service';

export class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      config: null,
      listActivities: null
    }
  }

  componentWillMount() {
    Promise.all([getConfig(), getActivities()])
      .then(([config, listActivities]) => this.setState({ config, listActivities }))
      .catch(console.log);
  }

  render() {
    if (this.state.config) {
      return (
        <section>
          <CountdownTimerHeader onEnd={() => console.log("end")} listActivities={this.state.listActivities} deadline={this.state.config.timer.deadline.getTime()} maxTime={this.state.config.timer.maxDate} />
          <SocialMediaWall id="medias" />
        </section>
      )
    }
    return (<div>Loading</div>)
  }
}

export const SocialMediaWallBoard = (props) => (
  <SocialMediaWall id="media" />
);

export class AgendaBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      config: null,
      listActivities: null
    }
  }

  componentWillMount() {
    Promise.all([getConfig(), getActivities()])
      .then(([config, listActivities]) => this.setState({ config, listActivities }))
      .catch(console.log);
  }

  render() {
    if (this.state.config) {
      return (
        <section>
          <div className="wrapper">
            <div className="clock">
              <div className="logo"></div>
              <CountdownTimer onEnd={() => console.log("end")} deadline={this.state.config.timer.deadline.getTime()} maxTime={this.state.config.timer.maxDate} />
            </div>
            <AgendaExpanded />
          </div>

        </section>
      )
    }
    return (<div>Loading</div>)
  }
}
