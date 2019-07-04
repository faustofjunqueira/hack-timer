import React, { useState } from 'react';
import { getActivities } from './agenda.service';

const Status = {
  loadign: 'LOADING',
  now: 'NOW',
  next: 'NEXT',
  finish: 'FINISH'
}

function getTargetActivity(listActivities) {
  if (listActivities && listActivities.length) {
    const dateNow = Date.now();
    const listActivitiesFiltered = listActivities
      .filter(x => x.end.getTime() > dateNow)
      .sort((a, b) => a.start.getTime() - b.start.getTime());
    return listActivitiesFiltered[0];
  }
}

const calculateStatus = (targetActivity) => ({
  targetActivity,
  status: targetActivity ? (Date.now() < targetActivity.end.getTime() ? Status.now : Status.next) : Status.finish
})

export const Agenda = (props) => {
  //const [state, setState] = useState({ status: Status.loadign, targetActivity: null });
  let listActivities = null;

  return (
    <div className="agenda">
      <div className="now">
        <label>Acontecendo Agora</label>
        <div>Codding...</div>
      </div>
      <div className="next">
        <label>Próximo Evento</label>
        <div>Pizzaaaaa =D</div>
      </div>
    </div>
  );
};

const AgendaActivityNow = ({ activity }) => (
  <div className="now">
    <label>Acontecendo Agora</label>
    <div>Codding...</div>
  </div>
);

const AgendaActivityNext = ({ activity }) => (
  <div className="next">
    <label>Próximo Evento</label>
    <div>Pizzaaaaa =D</div>
  </div>
);
