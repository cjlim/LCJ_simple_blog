
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Posts } from '../../api/posts.js';

import './post_write.html';

Template.postWrite.onCreated(function() {
  this.postId = null;
  this.post = null;
  this.state = new ReactiveDict();
});

Template.postWrite.onRendered(function() {
  const self = this;

  self.$('#summernote').summernote({
    height: 300,                 // set editor height
    minHeight: 150,             // set minimum height of editor
    maxHeight: 600              // set maximum height of editor
  });

  self.$('.dropdown-toggle').dropdown();

  self.autorun(function() {
    FlowRouter.watchPathChange();
    var context = FlowRouter.current();

    self.postId = context.params.postId;
    self.state.set("currentPostId", self.postId);

    if(self.postId){
      self.post = Posts.findOne({_id: self.postId}) || {};
      let title = self.post.title;
      let content = self.post.content;
      // postId 값이 있으면 post data를 불러옴
      // 제목 필드에 값을 넣어줌
      // 내용 필드에 값을 넣어줌
      self.$("#postTitle").val(title)
      self.$('#summernote').summernote('code', content);
    }
  });
});

Template.postWrite.onDestroyed(function() {
  this.$('#summernote').summernote('destroy');

  this.postId = null;
});

Template.postWrite.helpers({
  isModify: function(){
    return Template.instance().state.get("currentPostId");
  }
});

Template.postWrite.events({
  'submit .new-post'(event, t) {
    // Prevent default browser form submit
    event.preventDefault();
    
    // Get value from form element
    const target = event.target;
    const title = target.postTitle.value;
    const content = t.$('#summernote').summernote('code');

    // title과 content가 빈 값이면 경고
    if(!title || content === '<p><br></p>' || !content){

      if(!title){
        BootstrapModalPrompt.prompt({
          title: "Alert",
          content: "제목을 입력 해 주시기 바랍니다."
        }, function(result) {
          if (result) {
            t.$("#postTitle").focus();
            return;
          } else {
            t.$("#postTitle").focus();
            return;
          }
        });
      } else {
        BootstrapModalPrompt.prompt({
          title: "Alert",
          content: "내용을 입력 해 주시기 바랍니다."
        }, function(result) {
          if (result) {
            return;
          } else {
            return;
          }
        });
      }
    } else {

      if(t.postId){
        // Modify a post into the collection
        Meteor.call('posts.modify', t.postId, title, content, function(err){
          if(!err){
            // Clear form
            target.postTitle.value = '';
            t.$('#summernote').summernote('code', '');

            // 뷰페이지로 돌아감.
            FlowRouter.go("/post/" + t.postId);
          }
        });
      } else {
        // Insert a post into the collection
        Meteor.call('posts.insert', title, content, function(err, r){
          if(!err){

            // Clear form
            target.postTitle.value = '';
            t.$('#summernote').summernote('code', '');

            FlowRouter.go("/post/" + r);
          }
        });
      }
    }
  },
});



