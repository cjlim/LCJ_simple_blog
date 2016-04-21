
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Posts } from '../../api/posts.js';

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

    // Insert a post into the collection
    Meteor.call('posts.insert', title, content);

    // Clear form
    target.postTitle.value = '';
    target.postContent.value = '';

    FlowRouter.go("/")
  },
});



