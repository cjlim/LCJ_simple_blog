import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './body.html';
import './header.html';

import '../components/post_list.html';
import '../components/post_list.js';
import '../components/post_list_item.html';
import '../components/post_list_item.js';
import '../components/post_write.html';
import '../components/post_write.js';
import '../components/post_view.html';
import '../components/post_view.js';


Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('posts');
});