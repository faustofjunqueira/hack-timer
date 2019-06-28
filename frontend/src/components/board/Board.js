import React from 'react';
import { CountdownTimer } from '../countdown/countdown';

export class Board extends React.Component {

  render() {
    return (
      <section>
        <h1>Board</h1>
        {<CountdownTimer onEnd={() => console.log("end")} deadline={(new Date('2019-07-07T12:00:00.000Z')).getTime()} maxTime={36 * 60 * 60 * 1000} />}
      </section>
    )
  }
}