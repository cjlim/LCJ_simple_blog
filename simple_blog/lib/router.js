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
    BlazeLayout.render('blogLayout', {main: "postWrite" });
  }
});