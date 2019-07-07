import React, { useState } from 'react';
import {getActivities} from './agenda.service';
import './agenda.css';

const getCurrentActivityIndex = (listActivities, time) =>
  listActivities.indexOf(listActivities.find(a => a.start.getTime() <= time && time <= a.end.getTime()))

const getTitleNowActivity = (listActivities) => {
  if (listActivities && listActivities.length) {
    const now = Date.now();
    if (now < listActivities[0].start.getTime()) {
      return 'The winter is coming';
    }
    if (now > listActivities[listActivities.length - 1].end.getTime()) {
      return 'Encerrado!'
    }
    const activityRunningIndex = getCurrentActivityIndex(listActivities, now);
    if (activityRunningIndex !== -1) {
      return listActivities[activityRunningIndex].title;
    }
  }
  return 'Coding';
}

const getTitleNextActivity = (listActivities) => {
  if (listActivities && listActivities.length) {
    const now = Date.now();
    if (now < listActivities[0].start.getTime()) {
      return listActivities[0].title;
    }
    if (now > listActivities[listActivities.length - 1].end.getTime()) {
      return 'Comming Soon';
    }
    const activityRunningIndex = getCurrentActivityIndex(listActivities, now) + 1;
    if (activityRunningIndex) {
      if (activityRunningIndex === listActivities.length) {
        return 'Comming Soon';
      } else {
        return listActivities[activityRunningIndex].title;
      }
    }
  }
  return 'Comming Soon';
}

export const AgendaCollated = ({ listActivities }) => {
  const [titles, setTitles] = useState({
    now: getTitleNowActivity(listActivities),
    next: getTitleNextActivity(listActivities)
  });

  setInterval(() => setTitles({
    now: getTitleNowActivity(listActivities),
    next: getTitleNextActivity(listActivities)
  }), 45000);

  return (
    <div className="agenda">
      <AgendaCollatedActivity className="now" title="Acontecendo Agora" description={titles.now} />
      <AgendaCollatedActivity className="next" title="Próximo Evento" description={titles.next} />
    </div>
  )
}

const AgendaCollatedActivity = ({ className, title, description }) =>
  (
    <div className={className}>
      <label>{title}</label>
      <div>{description}</div>
    </div>
  );

export const AgendaExpanded = ({ className, title, description }) =>
  (
    <div className="calendar">
      <div className="column">
        <h2><div className="icon1"></div><span>Sexta</span></h2>
        <div className="event">
          <label>17h00 – 18h00</label>
          <div>Recepção</div>
        </div>
        <div className="event">
          <label>18h00 – 19h00</label>
          <div>Welcome</div>
        </div>
        <div className="event">
          <label>19h00 – 20h00</label>
          <div>Desafios</div>
        </div>
        <div className="event">
          <label>20h00 – 21h00</label>
          <div>Teams grouping</div>
        </div>
        <div className="event">
          <label>21h</label>
          <div>Coding</div>
        </div>
        <div className="event">
          <label>22h00 – 23h30</label>
          <div>Banho Liberado</div>
        </div>
      </div>
      <div className="column">
        <h2><div className="icon2"></div><span>Sábado</span></h2>
        <div className="event">
          <label>07h00 – 08h00</label>
          <div>Café da manhã</div>
        </div>
        <div className="event">
          <label>09h00 – 10h00</label>
          <div>Refreshing</div>
        </div>
        <div className="event">
          <label>12h00 – 13h00</label>
          <div>Almoço</div>
        </div>
        <div className="event">
          <label>15h30 - 16h30</label>
          <div>Fireside feedback</div>
        </div>
        <div className="event">
          <label>17h00 – 18h00</label>
          <div>Banho</div>
        </div>
        <div className="event">
          <label>20h00 – 21h00</label>
          <div>Jantar</div>
        </div>
        <div className="event">
          <label>22h00 - 23h00</label>
          <div>Fireside feedback</div>
        </div>
      </div>
      <div className="column">
        <h2><div className="icon3"></div><span>Domingo</span></h2>
        <div className="event">
          <label>07h00 – 08h00</label>
          <div>Fireside feedback</div>
        </div>
        <div className="event">
          <label>9h00</label>
          <div>Parar Cronometro</div>
        </div>
        <div className="event">
          <label>09h00 – 11h30</label>
          <div>Pitch</div>
        </div>
        <div className="event">
          <label>11h30 – 12h00</label>
          <div>Premiação</div>
        </div>
        <div className="event">
          <label>12h00 – 15h00</label>
          <div>Chop!</div>
        </div>
      </div>
    </div>
  );

// export const AgendaDay = ({day, icon}) => (
//   <div className="column">
//     <h2><div className={icon}></div><span>{day}</span></h2>
//   </div>
// );

// export const AgendaActivity = ({title, start, end}) => (
//   <div className="event">
//     <label>{start}h – {end}h</label>
//     <div>{title}</div>
//   </div>
// );


// export class AgendaExpanded extends React.Component
// {
//   constructor(props) {
//     super(props)
//     this.state = {
//       listActivities: null
//     }  
//   }

//   componentWillMount()
//   {
//     Promise.all([getActivities()])
//     .then(([listActivities]) => this.setState({listActivities }))
//     .catch(console.log);
//   }

//   render()
//   {
//     if(this.listActivities)
//     {
//       return
//     }
//     return (<div>Loading</div>);
//   }

// }
