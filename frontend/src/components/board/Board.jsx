import React from 'react';
import { CountdownTimer } from '../countdown/countdown';
import { SocialMediaWall } from '../social-media/social-media';
import './board.css';
import { getConfig } from '../config/config.service';

export class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      config: null
    }
  }

  componentWillMount() {
    getConfig().then(config => this.setState({ config }))
  }

  render() {
    if (!this.state.config) {
      return (
        <section>
          <p>Loading</p>
        </section>
      )
    }
    return (
      <section>
        <CountdownTimer onEnd={() => console.log("end")} deadline={this.state.config.timer.deadline.getTime()} maxTime={this.state.config.timer.maxDate} />
        <SocialMediaWall id="medias" />
      </section>
    )
  }
}