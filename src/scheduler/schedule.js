const cron = require('node-cron');

function scheduleEvery8Hours(job) {
  // Run every 8 hours
  cron.schedule('0 */8 * * *', job);
}

module.exports = scheduleEvery8Hours; 