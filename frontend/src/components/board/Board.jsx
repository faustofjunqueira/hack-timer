import React from 'react';
import { CountdownTimer } from '../countdown/countdown';
import { SocialMediaWall } from '../social-media/social-media';
import { Agenda } from '../agenda/agenda';
import './board.css';

export class Board extends React.Component {

  render() {
    return (
      <section>
        <Agenda />
        <CountdownTimer onEnd={() => console.log("end")} deadline={(new Date('2019-07-07T12:00:00.000Z')).getTime()} maxTime={36 * 60 * 60 * 1000} />
        <SocialMediaWall id="medias" />
      </section>
    )
  }
}