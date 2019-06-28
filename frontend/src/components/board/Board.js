import React from 'react';
import { CountdownTimer } from '../countdown/countdown';

export class Board extends React.Component {

  render() {
    return (
      <section>
        <h1>Board</h1>
        <CountdownTimer deadline={'2019-06-28T22:57:00.000Z'} maxTime={30 * 60 * 1000} />
      </section>
    )
  }
}