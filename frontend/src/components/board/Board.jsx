import React from 'react';
import { CountdownTimer } from '../countdown/countdown';
import { SocialMediaWall } from '../social-media/social-media';
import './board.css';

export class Board extends React.Component {

  render() {
    return (
      <section>
        <CountdownTimer onEnd={() => console.log("end")} deadline={(new Date('2019-07-05T16:30:00.000Z')).getTime()} maxTime={36 * 60 * 60 * 1000} />
        <SocialMediaWall id="medias" />
      </section>
    )
  }
}