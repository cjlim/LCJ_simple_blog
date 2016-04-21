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


FlowRouter.route('/post/:postId', {
  action: function(params) {
    console.log(params)
    BlazeLayout.render("blogLayout", {
      main: "postView",
      params: params
    });
  }
});