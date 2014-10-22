var Xero = require('../lib/xero.js');
var moment = require('moment');

var poll = {
  interval: moment.duration({'hours': 6}, 'seconds'),
};

var job = function() {
  Xero.getBalance(function (balances) {
    send_event('balance', { text: balances.Total.ClosingBalance } );
  });
}

setInterval(job, poll.interval);

job();
