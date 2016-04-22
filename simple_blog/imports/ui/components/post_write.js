
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './post_write.html';

Template.postWrite.onCreated(function() {
});

Template.postWrite.onRendered(function() {
  this.$('#summernote').summernote({
    height: 480,                 // set editor height
    minHeight: 300,             // set minimum height of editor
    maxHeight: 480              // set maximum height of editor
  });

  this.$('.dropdown-toggle').dropdown()
});

Template.postWrite.onDestroyed(function() {
  this.$('#summernote').summernote('destroy');
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



