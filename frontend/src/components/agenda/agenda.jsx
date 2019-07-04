import React, { useState } from 'react';
import { getActivities } from './agenda.service';

const getCurrentActivityIndex = (listActivities, time) =>
  listActivities.indexOf(listActivities.find(a => a.start.getTime() <= time && time <= a.end.getTime()))

const getTitleNowActivity = (listActivities) => {
  if (listActivities && listActivities.length) {
    const now = Date.now();
    if (now < listActivities[0].start.getTime()) {
      return 'The winter is comming';
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
