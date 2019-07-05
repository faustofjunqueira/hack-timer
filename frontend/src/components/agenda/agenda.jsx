import React, { useState } from 'react';
import { getActivities } from './agenda.service';
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


export class Agenda extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listActivities: []
    }
  }

  componentWillMount() {
    getActivities().then(listActivities => this.setState({ listActivities }));
  }

  render() {
    if (this.state.listActivities && this.state.listActivities.length) {
      return (
        <AgendaCollated listActivities={this.state.listActivities} />
      );
    } else {
      return (<div></div>)
    }
  }
}

const AgendaCollated = ({ listActivities }) => {
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
<div className="wrapper">

  <div className="clock">
    <div className="logo"></div>
    <div className="device">
      <div className="numbers">
        <span className="clock_hours">00</span>:
        <span className="clock_minutes">00</span>:
        <span className="clock_seconds">00</span>
        <small>h</small>
      </div>
    </div>
  </div>

  <div className="calendar">
    <div className="column">
      <h2><div className="icon1"></div><span>Sexta</span></h2>
      <div className="event">
        <label>17h – 18h</label>
        <div>Recepção dos desafiantes</div>
      </div>
      <div className="event">
        <label>18h – 19h</label>
        <div>Apresentação de boas-vindas
          <ul>
            <li>Explicações gerais</li>
            <li>Agenda</li>
            <li>Critério de Avaliação</li>
            <li>Feedback preliminar</li>
            <li>Formação de times</li>
          </ul>
        </div>
      </div>
      <div className="event">
        <label>19h – 20h</label>
        <div>Apresentação dos desafios de negócio</div>
      </div>
      <div className="event">
        <label>20h – 21h</label>
        <div>Coffe e Formação dos times</div>
      </div>
      <div className="event">
        <label>21h</label>
        <div>Coding iniciar cronometro</div>
      </div>
      <div className="event">
        <label>21h</label>
        <div>Coding iniciar cronometro</div>
      </div>
      <div className="event">
        <label>21h01</label>
        <div>Cadastro dos times na shawee</div>
      </div>
      <div className="event">
        <label>22h</label>
        <div>Mentoring start</div>
      </div>
      <div className="event">
        <label>22h – 23h30</label>
        <div>Horário do Banho</div>
      </div>
    </div>

    <div className="column">
      <h2><div className="icon2"></div><span>Sábado</span></h2>
      {/* <div className="event">
        <label>0h00</label>
        <div>Pizza</div>
      </div> */}
      {/* <div className="event">
        <label>1h30 – 2h30 </label>
        <div>Distribuição de  Energético</div>
      </div> */}
      <div className="event">
        <label>07h00 – 08h00</label>
        <div>Café da manhã</div>
      </div>
      {/* <div className="event">
        <label>9h00 – 10h00</label>
        <div>Laboral com os mentores</div>
      </div> */}
      <div className="event">
        <label>12h00 – 13h00</label>
        <div>Almoço</div>
      </div>
      <div className="event">
        <label>15h30</label>
        <div>Fireside one way feedback</div>
      </div>
      <div className="event">
        <label>14h00 – 15h30 </label>
        <div>Distribuição de Mate e Biscoito Globo</div>
      </div>
      <div className="event">
        <label>17h00 – 18h00</label>
        <div>Horário do Banho</div>
      </div>
      <div className="event">
        <label>20h00 – 21h00</label>
        <div>Jantar</div>
      </div>
      <div className="event">
        <label>22h00</label>
        <div>Fireside one way feedback</div>
      </div>
    </div>

    <div className="column">
      <h2><div className="icon3"></div><span>Domingo</span></h2>
      {/* <div className="event">
        <label>01h30 - 02h30 </label>
        <div>Distribuição de Energético</div>
      </div> */}
      <div className="event">
        <label>2h</label>
        <div>Pipoca</div>
      </div>
      <div className="event">
        <label>07h00 – 08h00</label>
        <div>Café da manhã e Encerramento do coding</div>
      </div>
      <div className="event">
        <label>8h00 – 9h00 </label>
        <div>Fireside one way feedback e teste de projeção</div>
      </div>
      <div className="event">
        <label>9h00</label>
        <div>Parar Cronometro</div>
      </div>
      <div className="event">
        <label>09h00 – 11h30</label>
        <div>Apresentações</div>
      </div>
      <div className="event">
        <label>11h30 – 12h00</label>
        <div>Premiações e encerramento da Hackathon</div>
      </div>
      <div className="event">
        <label>12h00 – 15h00</label>
        <div>Happy Hour</div>
      </div>
    </div>
  </div>

</div>
);
