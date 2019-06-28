import React from 'react';
import { startCountdown } from './countdown.service';

export class Clock extends React.Component {

  get hours() {
    const hours = Math.floor(this.props.time / (1000 * 60 * 60));
    return hours < 10 ? `0${hours}` : hours;
  }

  get minutes() {
    const minutes = Math.floor((this.props.time % (1000 * 60 * 60)) / (1000 * 60));
    return minutes < 10 ? `0${minutes}` : minutes;
  }

  get seconds() {
    const seconds = Math.floor((this.props.time % (1000 * 60)) / 1000);
    return seconds < 10 ? `0${seconds}` : seconds;
  }

  render() {
    return (
      <div className="clock">
        <span className="clock_hours">{this.hours}:</span>
        <span className="clock_minutes">{this.minutes}:</span>
        <span className="clock_seconds">{this.seconds}</span>
      </div>
    );
  }
}

export class CountdownTimer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      timeLeft: this.getTimeLeft(props.deadline)
    };
  }

  componentWillMount() {
    startCountdown(this.props.deadline, timeLeft =>
      this.setState({
        timeLeft: this.getTimeLeft(timeLeft, this.props.maxTime)
      }),
      this.props.onEnd,
      700
    );
  }

  getTimeLeft(timeLeft) {
    return Math.min(timeLeft, this.props.maxTime);
  }

  render() {
    return (
      <Clock time={this.state.timeLeft} />
    )
  }

}