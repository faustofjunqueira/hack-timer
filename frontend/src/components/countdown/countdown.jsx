import React, { useState } from 'react';
import { AgendaCollated } from '../agenda/agenda';
import { getConfig } from '../config/config.service';
import './countdown.css';
import { startCountdown } from './countdown.service';
import './logo.png';

const Clock = ({ time }) => {
  let hours = Math.floor(time / (1000 * 60 * 60));
  let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((time % (1000 * 60)) / 1000);

  return (
    <div className="numbers">
      <span className="clock_hours">{hours < 10 ? `0${hours}` : hours}</span>:
      <span className="clock_minutes">{minutes < 10 ? `0${minutes}` : minutes}</span>:
      <span className="clock_seconds">{seconds < 10 ? `0${seconds}` : seconds}</span>
      <small>h</small>
    </div>
  );
}


export const CountdownTimer = ({ onEnd, deadline, maxTime, listActivities }) => {
  const [timeLeft, setTimeLeft] = useState(Math.min(deadline, maxTime));

  startCountdown(deadline,
    t => setTimeLeft(Math.min(t, maxTime)),
    onEnd,
    700
  );

  return (
    <div className="clock">
      <div className="logo"></div>
      <AgendaCollated listActivities={listActivities} />
      <div className="device">
        <Clock time={timeLeft} />
      </div>
    </div>
  );
}
