import React from 'react';
import { CountdownTimer } from '../countdown/countdown';
import { SocialMediaWall } from '../social-media/social-media';
import './board.css';

export const Board = (props) => (
  <section>
    <CountdownTimer onEnd={() => console.log("end")} />
    <SocialMediaWall id="medias" />
  </section>
);
