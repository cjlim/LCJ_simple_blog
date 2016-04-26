
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';

import { Posts } from '../../api/posts.js';

import './post_list.html';
import './post_list_item.html';

Template.postList.onCreated(function() {
});

Template.postList.onRendered(function() {
  //Session.set("headerSearchText", null);
});

Template.postList.helpers({
  tasks() {
    //검색결과에 값이 있으면
    var text = Session.get("headerSearchText");

    if(!text){
      // 리액티브 변수의 값에 값이 없으면
      //검색결과가 없거나 검색하지 않으면
      return Posts.find({}, { sort: { createdAt: -1 } });
    } else {
      let searchData = Posts.find({
        $or: [
          {title: {$regex: text, $options: 'i'}},
          {content: {$regex: text, $options: 'i'}}
        ]
      }, { sort: { createdAt: -1 } });

      return searchData;
    }
  },
});



