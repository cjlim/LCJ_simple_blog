
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './post_write.html';

Template.postWrite.onCreated(function() {
  this.postId = null;
});

Template.postWrite.onRendered(function() {
  const self = this;

  self.$('#summernote').summernote({
    height: 480,                 // set editor height
    minHeight: 300,             // set minimum height of editor
    maxHeight: 480              // set maximum height of editor
  });

  self.$('.dropdown-toggle').dropdown();

  self.autorun(function() {
    FlowRouter.watchPathChange();
    var context = FlowRouter.current();

    self.postId = context.params.postId;

    if(self.postId){
      console.log(this)
      // postId 값이 있으면 post data를 불러옴
      // 제목 필드에 값을 넣어줌
      // 내용 필드에 값을 넣어줌
    }
  });
});

Template.postWrite.onDestroyed(function() {
  this.$('#summernote').summernote('destroy');

  this.postId = null;
});

Template.postWrite.events({
  'submit .new-post'(event, t) {
    // Prevent default browser form submit
    event.preventDefault();
    
    // Get value from form element
    const target = event.target;
    const title = target.postTitle.value;
    const content = t.$('#summernote').summernote('code');

    console.log(typeof(content));

    // Insert a post into the collection
    Meteor.call('posts.insert', title, content, function(err){
      if(!err){
        // Clear form
        target.postTitle.value = '';
        t.$('#summernote').summernote('code', '');

        FlowRouter.go("/")
      }
    });
  },
});



