import React, { useState } from 'react';
import { startCountdown } from './countdown.service';

const Clock = ({ time }) => {
  let hours = Math.floor(time / (1000 * 60 * 60));
  let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((time % (1000 * 60)) / 1000);

  return (
    <div className="clock">
      <span className="clock_hours">{hours < 10 ? `0${hours}` : hours}</span>:
        <span className="clock_minutes">{minutes < 10 ? `0${minutes}` : minutes}</span>:
        <span className="clock_seconds">{seconds < 10 ? `0${seconds}` : seconds}</span>
    </div>
  );
}

export const CountdownTimer = ({ deadline, maxTime, onEnd }) => {
  const [timeLeft, setTimeLeft] = useState(Math.min(deadline, maxTime));

  // start o countdown
  startCountdown(deadline, timeLeft =>
    setTimeLeft(Math.min(timeLeft, maxTime)),
    onEnd,
    700
  );

  return (
    <Clock time={timeLeft} />
  );

}
