/**
 * Created by limchaejoo on 2016. 4. 20..
 */

FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('blogLayout', {main: "postList" });
  }
});

FlowRouter.route('/post_write', {
  action: function() {
    if(!Meteor.user()){
      FlowRouter.go("/");
    }
    BlazeLayout.render('blogLayout', {main: "postWrite" });
  }
});


FlowRouter.route('/post_write/:postId', {
  action: function(params) {
    if(!Meteor.user()){
      FlowRouter.go("/");
    }
    BlazeLayout.render('blogLayout', {
      main: "postWrite",
      params: params
    });
  }
});


FlowRouter.route('/post/:postId', {
  action: function(params) {
    BlazeLayout.render("blogLayout", {
      main: "postView",
      params: params
    });
  }
});