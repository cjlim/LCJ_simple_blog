
import { Template } from 'meteor/templating';

import { Posts } from '../../api/posts.js';

import './post_write.html';

Template.postWrite.events({
  'submit .new-post'(event) {
    // Prevent default browser form submit
    event.preventDefault();
    
    // Get value from form element
    const target = event.target;
    const text = target.postTitle.value;

    // Insert a task into the collection
    Posts.insert({
      text,
      createdAt: new Date(), // current time
    });

    // Clear form
    target.postTitle.value = '';

    FlowRouter.go("/")
  },
});



