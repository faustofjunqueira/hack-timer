const config = require('config');
const winston = require('winston');
const messagesKey = require('../assets/message.json');
const { format } = winston;
const { combine, printf } = format;

const console = new winston.transports.Console();

const messageKeyFormat = printf(({ level, message, label, timestamp, ...meta }) => {
  const handledLabel = label === config.get('log.default.format.label') ? '' : " [" + label + "]"
  return `${timestamp} ${level}${handledLabel}: ${messagesKey[message]} ${JSON.stringify(meta)}`;
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


module.exports = winston;