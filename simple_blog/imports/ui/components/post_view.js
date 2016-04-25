
import { Template } from 'meteor/templating';

import { Posts } from '../../api/posts.js';

import './post_view.html';

Template.postView.onCreated(function() {
  var self = this;
  self.postId = null;
  self.post = null;
  self.contents = null;
});

Template.postView.onRendered(function() {
  var self = this;

  self.autorun(function() {
    self.postId = FlowRouter.getParam('postId');
    self.subscribe('singlePost', self.postId);

    self.post = Posts.findOne({_id: self.postId}) || {};
  });
});

Template.postView.helpers({
  post: function() {
    return Template.instance().post;
  },

  date: function() {
    var year = Template.instance().post.createdAt.getFullYear();
    var month = Template.instance().post.createdAt.getMonth() + 1;
    var day = Template.instance().post.createdAt.getDate();
    
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
  },
  'click .btn-post-modify'(){
    //post_write 페이이로 이동
    // this data도 같이 보냄
    FlowRouter.go("/post_write/" + this._id);
  }

});



