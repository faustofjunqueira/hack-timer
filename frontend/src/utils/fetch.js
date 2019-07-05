const hostInfo = {
  defaultBaseUrlDev: 'http://localhost:10000',
  defaultBaseUrlPrd: 'http://hack.radixeng.com.br:8080',

  get host() {
    return window.location.hostname === 'localhost' ? this.defaultBaseUrlDev : this.defaultBaseUrlPrd;
  },

  url(url) {
    return new URL(url, this.host);
  }
}

export const request = (url, params) => {
  return fetch(hostInfo.url(url), params);
}
