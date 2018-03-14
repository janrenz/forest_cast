'use strict';
var Liana = require('forest-express-sequelize');
var moment = require('moment');

// Be careful: Javascript months start at 0 (so zero stands for january) 

Liana.collection('casts', {
  fields: [{
    // this will not allow filtering, so maybe we want to calculate this in the db later   
    field: 'alter_auto',
    type: 'String',
    get: function (object) {
      try {
        return moment().diff(moment(object.geburtsdatum, "DD.MM.YYYY"), 'years', false);
      } catch (error) {
        return '';
      }
    }
  }]
});
