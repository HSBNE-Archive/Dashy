var _ = require('lodash');

_.mixin({
  combine: function(keys, values, defaultValue) {
    var out = {};
    var defaultValue = ! _.isUndefined(defaultValue) ? defaultValue : '';
    _.each(keys, function(key, index) {
      out[key] = ! _.isUndefined(values[index]) ? values[index] : defaultValue;
    });
    return out;
  }
});
