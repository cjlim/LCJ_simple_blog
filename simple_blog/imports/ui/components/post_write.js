
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Posts } from '../../api/posts.js';
import '../../api/commonJS.js';

import './post_write.html';

Template.postWrite.events({
  'submit .new-post'(event) {
    // Prevent default browser form submit
    event.preventDefault();
    
    // Get value from form element
    const target = event.target;
    const title = target.postTitle.value;
    const content = target.postContent.value;

    console.log(Meteor.user());
    
    var date = new Date();
    date = CommonJS.prototype.date(date)

    console.log(date)

    // Insert a task into the collection
    
    Posts.insert({
      title,
      content,
      owner: Meteor.userId(),
      username: Meteor.user().username,
      createdAt: new Date(), // current time
    });
    

    // Clear form
    target.postTitle.value = '';
    target.postContent.value = '';

    FlowRouter.go("/")
  },
});



