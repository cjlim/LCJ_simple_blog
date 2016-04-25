
import { Template } from 'meteor/templating';

import { Posts } from '../../api/posts.js';

import './post_list.html';
import './post_list_item.html';

Template.postList.helpers({
  tasks() {
    return Posts.find({}, { sort: { createdAt: -1 } });
  },
});



