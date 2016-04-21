
import { Template } from 'meteor/templating';

import { Posts } from '../../api/posts.js';

import './post_view.html';

Template.postView.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var postId = FlowRouter.getParam('postId');
    self.subscribe('singlePost', postId);
  });
});

Template.postView.helpers({
  post: function() {
    var postId = FlowRouter.getParam('postId');
    var post = Posts.findOne({_id: postId}) || {};
    return post;
  }
});
Template.postView.events({
});



