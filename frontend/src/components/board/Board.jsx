import React from 'react';
import { CountdownTimer } from '../countdown/countdown';
import { SocialMediaWall } from '../social-media/social-media';
import './board.css';
import { AgendaExpanded } from '../agenda/agenda';

export const Board = (props) => (
  <section>
    <CountdownTimer onEnd={() => console.log("end")} />
    <SocialMediaWall id="medias" style={{ "paddingTop": "15vh" }} />
  </section>
);


export const AgendaBoard = (props) => (
  <section>
    <AgendaExpanded />
  </section>
);