
import '../imports/startup/accounts-config.js';
import '../imports/ui/layout/body.js';

BlazeLayout.setRoot('body');

Meteor.startup(function() {
  $('html').attr('lang', 'ko');
});