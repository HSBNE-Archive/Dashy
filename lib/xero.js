var Xero = require('xero');
var config = require('../config.js');
var extend = require('extend');
var util = require('util');
require('./hidash.js');
var _ = require('lodash');

var API = new Xero(config.xero.key, config.xero.secret, config.xero.rsa);

parse = {
  balanceReport: function (json) {
    var parsedOutput = {};
    var interpret = {
      headers: [],
      Header: function (item) {
        this.headers = _.pluck(item.Cells.Cell, 'Value');
        this.headers = _.map(this.headers, function (item) {
          return item.replace(/\s/, '');
        });
      },
      Section: function(item) {
        _.each(item.Rows.Row, _.bind(function (account) {
          var values = _.pluck(account.Cells.Cell, 'Value');
          var combined = _.combine(this.headers, values);
          parsedOutput[combined.BankAccounts] = _.omit(combined, 'BankAccounts');
        }, this));
      },
    }
    var reportList = json.Response.Reports.Report.Rows.Row;
    _.each(reportList, function(item, index) {
      interpret[item.RowType].apply(interpret, [item, index]);
    });

    return parsedOutput;
  },
  receiptTotals: function (json) {
    var parsedOutput = {};
    var receiptList = json.Response.Receipts.Receipt;
    _.each(receiptList, function(receipt, index) {
      if (receipt.Status == 'DRAFT') { // We only want drafts because thats how we track mandate spending
        parsedOutput[receipt.ReceiptNumber] = {
          Total: receipt.Total,
          Date: receipt.Date,
        }
      }
    });

    parsedOutput['Total'] = {
      Total: _.reduce(_.pluck(parsedOutput, 'Total'), function (i, n) { return +i + +n; }),
    }

    return parsedOutput;
  }
}

extend(true, module.exports, {
  getBalance: function (callback) {
    return API.call('GET', '/Reports/BankSummary', null, function(err, json) {
      if (err) {
        console.log('error', err);
      }
      callback.apply(this, [parse.balanceReport(json)]);
    });
  },
  getOutgoings: function (callback) {
    return API.call('GET', '/Receipts', null, function(err, json) {
      if (err) {
        console.log('error', err);
      }
      callback.apply(this, [parse.receiptTotals(json)]);
    });
  }
});

module.exports.getOutgoings(function (receipts) {
  console.log(util.inspect(receipts, {depth: 100}));
});
