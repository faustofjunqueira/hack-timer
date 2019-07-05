import config = require('config');
import winston = require('winston');
const { format } = winston;
const { combine, printf } = format;
const messagesKey = require('../assets/message.json');

const console = new winston.transports.Console();

const messageKeyFormat = printf(({ level, message, label, timestamp, ...meta }) => {
  const handledLabel = label === config.get('log.default.format.label') ? '' : " [" + label + "]";
  let handledError = '';
  let handledMeta = '';
  if (Object.keys(meta).length) {
    const { error, ...otherMetas } = meta;
    if (Object.keys(otherMetas).length) {
      handledMeta = ' ' + JSON.stringify(otherMetas);
    }
    if (error && error instanceof Error) {
      handledError = `\n${error.stack}`;
    }
  }
  return `${timestamp} ${level}${handledLabel}: ${messagesKey[message]}${handledMeta}${handledError}`;
});

winston.configure({
  format: combine(
    format.label({ label: config.get('log.default.format.label') }),
    format.timestamp(),
    format.colorize(),
    messageKeyFormat
  ),
  transports: [console]
});

export default winston;
