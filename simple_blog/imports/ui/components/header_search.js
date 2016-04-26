/**
 * Created by limchaejoo on 2016. 4. 26..
 */

import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';

import './header_search.html';


Template.headerSearch.onCreated(function() {
});

Template.headerSearch.onRendered(function() {
});

Template.headerSearch.helpers({
});

Template.headerSearch.events({
  'submit .header-search'(event, t){
    event.preventDefault();

    const target = event.target;
    const text = target.search.value;

    Session.set("headerSearchText", text);

    // 리스트 페이지로 돌아감.
    FlowRouter.go("/");
  },
  'keyup #searchInput': function(e, t) {
    if(e.keyCode === 8){
      const text = event.target.value;

      Session.set("headerSearchText", text);
    }
  },
});
