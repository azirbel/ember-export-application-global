import Ember from 'ember';
import config from '../config/environment';

export function initialize(container, application) {
  if (config.exportApplicationGlobal !== false) {
    var value = config.exportApplicationGlobal;
    var globalName;

    if (typeof value === 'string') {
      globalName = value;
    } else {
      globalName = Ember.String.classify(config.modulePrefix);
    }

    // https://lodash.com/docs#assign, but don't override existing properties
    var merge = _.partialRight(_.assign, function(value, other) {
        return _.isUndefined(value) ? other : value;
    });

    window[globalName] = merge(application, window[globalName]);

    application.reopen({
      willDestroy: function(){
        this._super.apply(this, arguments);
        delete window[globalName];
      }
    });
  }
};

export default {
  name: 'export-application-global',

  initialize: initialize
};
