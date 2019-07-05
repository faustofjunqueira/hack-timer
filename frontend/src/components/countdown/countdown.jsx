import React, { useState } from 'react';
import { startCountdown } from './countdown.service';
import './countdown.css';
import './logo.png';
import { Agenda } from '../agenda/agenda';

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
        <label>Restante</label>
      </div>
    </div>
  );
}

export class CountdownTimer extends React.Component {
  constructor({ onEnd }) {
    super({ deadline, maxTime, onEnd });
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
    startCountdown(deadline, timeLeft =>
      this.setState({ ...this.setState, timeLeft: Math.min(timeLeft, maxTime) }),
      this.props.onEnd,
      700
    );
  }

  render() {
    return (
      <Clock time={timeLeft} />
    );
  }
}
