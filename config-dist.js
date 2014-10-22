var fs = require('fs');

module.exports = {
  xero: {
    key: "",
    secret: "",
    rsa: fs.readFileSync('./credentials/privatekey.pem'),
  }
};

