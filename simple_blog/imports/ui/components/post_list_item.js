
import { Template } from 'meteor/templating';

import './post_list_item.html';

Template.postListItem.onCreated(function() {
});

Template.postListItem.onRendered(function() {
  const data = this.data;
  console.log(data);
});

Template.postListItem.helpers({
  date: function() {
    var date = Template.instance().data.createdAt;

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    return month + '. ' + day + '. ' + year;
  }
});

Template.postListItem.events({
});

