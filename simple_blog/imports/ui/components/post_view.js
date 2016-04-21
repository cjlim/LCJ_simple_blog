
import { Template } from 'meteor/templating';

import { Posts } from '../../api/posts.js';

import './post_view.html';

Template.postView.onCreated(function() {
  var self = this;
  self.postId = null;

  self.autorun(function() {
    self.postId = FlowRouter.getParam('postId');
    self.subscribe('singlePost', self.postId);
  });
});

Template.postView.helpers({
  post: function() {
    var postId = Template.instance().postId;
    var post = Posts.findOne({_id: postId}) || {};
    return post;
  },

  date: function() {
    var postId = Template.instance().postId;
    var post = Posts.findOne({_id: postId});
    
    var year = post.createdAt.getFullYear();
    var month = post.createdAt.getMonth() + 1;
    var day = post.createdAt.getDate();
    
    return month + '. ' + day + '. ' + year;
  },

  isOwner: function() {
    return this.owner === Meteor.userId();
  }
});
Template.postView.events({
  'click .btn-post-delete'() {
    var self = this;

    BootstrapModalPrompt.prompt({
      title: "Post 삭제",
      content: "정말로 삭제 하시겠습니까?"
    }, function(result) {
      if (result) {
        // User confirmed it, so go do something.
        Meteor.call('posts.remove', self._id);

        FlowRouter.go("/");
      }
      else {
        // User did not confirm, do nothing.
        return;
      }
    });
  }
});



