/**
 * Created by limchaejoo on 2016. 4. 21..
 */

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('posts', function postsPublication() {
    return Posts.find();
  });

  Meteor.publish('user', function() {
    return Meteor.users.find();
  });
}

Meteor.methods({
  'posts.insert'(title, content) {
    check(title, String);

    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    var newPost = Posts.insert({
      title,
      content,
      owner: Meteor.userId(),
      username: Meteor.user().username,
      createdAt: new Date(), // current time
    });

    return newPost;
  },

  'posts.modify'(postId, title, content) {
    check(postId, String);
    check(title, String);

    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Posts.update(postId, {
      $set: {
        title: title,
        content : content,
        modifyAt: new Date(), // current time
      },
    });
  },

  'posts.remove'(postId) {
    check(postId, String);

    Posts.remove(postId);
  }
});
