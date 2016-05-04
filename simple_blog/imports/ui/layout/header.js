
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import '../components/header_search.html';
import '../components/header_search.js';
import '../components/sign_in_modal.html';
import '../components/sign_in_modal.js';

import './header.html';

Template.header.onCreated(function() {
  this.isOpen = false;
});

Template.header.onRendered(function() {
});

Template.header.helpers({
});
Template.header.events({
  'click .btn-show-search'(e, t){
    if(!t.isOpen){
      t.$(".search-wrap").show();
      t.isOpen = true;
    } else {
      t.$(".search-wrap").hide();
      t.isOpen = false;
    }
  },
  'click .btn-signIn'(e, t){
    e.preventDefault();
    $('#signInModal').modal();
  }
});
