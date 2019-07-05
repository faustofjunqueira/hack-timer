import React from 'react';
import { Agenda } from '../agenda/agenda';
import { getConfig } from '../config/config.service';
import './countdown.css';
import { startCountdown } from './countdown.service';
import './logo.png';

const Clock = ({ time }) => {
  let hours = Math.floor(time / (1000 * 60 * 60));
  let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((time % (1000 * 60)) / 1000);

  return (

    <div className="clock">
      <div className="logo"></div>

      <Agenda />

      <div className="device">
        <div className="numbers">
          <span className="clock_hours">{hours < 10 ? `0${hours}` : hours}</span>:
          <span className="clock_minutes">{minutes < 10 ? `0${minutes}` : minutes}</span>:
          <span className="clock_seconds">{seconds < 10 ? `0${seconds}` : seconds}</span>
          <small>h</small>
        </div>
      </div>
    </div>
  );
}

export class CountdownTimer extends React.Component {
  constructor({ onEnd }) {
    super({ onEnd });
    this.state = {
      timeLeft: null,
      deadline: null,
      maxTime: null
    }
  }

  componentWillMount() {
    getConfig().then(({ timer }) => this.setState({
      timeLeft: Math.min(timer.deadline, timer.maxDate),
      deadline: timer.deadline,
      maxTime: timer.maxDate
    }))
  }

  componentDidMount() {
    // start o countdown
    startCountdown(this.state.deadline, timeLeft =>
      this.setState({ ...this.setState, timeLeft: Math.min(timeLeft, this.state.maxTime) }),
      this.props.onEnd,
      700
    );
  }

  render() {
    return (
      <Clock time={this.state.timeLeft} />
    );
  }
}
