import { request } from "../../utils/fetch";

function mapResult(list) {
  if (list && list.length) {
    return list
      .map(l => ({ ...l, start: new Date(l.start), end: new Date(l.end) }))
      .sort((a, b) => a.start.getTime() - b.start.getTime())
  }
  return []
}

export const getActivities = () =>
  request('/agenda')
    .then(r => r.json())
    .then(mapResult);


