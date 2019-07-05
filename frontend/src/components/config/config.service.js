import { request } from "../../utils/fetch";

function mapResult(config) {
  if (config && config.timer) {
    config.timer.deadline = new Date(config.timer.deadline);
  }
  return config;
}

export function getConfig() {
  return request('config')
    .then(r => r.json())
    .then(c => c ? mapResult(c) : null);
}


