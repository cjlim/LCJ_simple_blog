
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './post_list_item.html';

Template.postListItem.onCreated(function() {
  this.imgSrc = new ReactiveDict();
  this.pText = new ReactiveDict();
});

Template.postListItem.onRendered(function() {
  const self = this;
  const data = this.data;
  let imgIndex = data.content.indexOf("<img");

  //let liveText = data.content.replace(/(<([^>]+)>)/gi, "");

  // content에서 img가 있는지 체크
  // 있으면 이미지의 src 값을 가져옴.
  // src 값을 넣고 helper로 넣어줌.
  if(imgIndex !== -1){
    let imgSrc = data.content.slice(imgIndex);

    imgIndex = imgSrc.indexOf("src");
    imgSrc = imgSrc.slice(imgIndex + 5);
    imgIndex = imgSrc.indexOf('"');
    imgSrc = imgSrc.substring(0, imgIndex);

    self.imgSrc.set("postImgSrc", imgSrc);
  }
});

Template.postListItem.helpers({
  date: function() {
    var date = Template.instance().data.createdAt;

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    return year + '. ' + month + '. ' + day;
  },
  hasSrc: function(){
    return Template.instance().imgSrc.get("postImgSrc");
  }
});

Template.postListItem.events({
});

