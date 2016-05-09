
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Accounts } from 'meteor/accounts-base';

import './sign_in_modal.html';

import './reset_pw_modal.html';
import './reset_pw_modal.js';

Template.signInModal.onCreated(function() {
  this.isSignIn = new ReactiveDict();
  this.hasUser = new ReactiveDict();
});

Template.signInModal.onRendered(function() {
  const self = this;

  self.isSignIn.set("isSignInSection", true);

  self.autorun(function() {
    Meteor.subscribe("user");

    // 유저가 한명이라도 있으면 회원가입 버튼 노출 안됨
    if(Meteor.users.find().count() >= 1){
      self.hasUser.set("hasUser", true);
    }
  });

});

Template.signInModal.helpers({
  signIn : function(){
    return Template.instance().isSignIn.get("isSignInSection");
  },
  signInText : function(){
    return Template.instance().isSignIn.get("isSignInSection") ? 'Sign In' : 'Sign Up';
  },
  withoutUser: function(){
    // 유저가 한명이라도 있으면 회원가입 버튼 노출 안됨
    return !Template.instance().hasUser.get("hasUser");
  }
});

Template.signInModal.events({
  'click .btn-sign-up'(e, t){
    t.isSignIn.set("isSignInSection", false);
  },

  'click .btn-sign-in'(e, t){
    t.isSignIn.set("isSignInSection", true);
  },

  'submit #formSignIn'(e, t){
    e.preventDefault();

    var emailVar = e.target.signInInputEmail.value;
    var passwordVar = e.target.signInInputPassword.value;
    Meteor.loginWithPassword(emailVar, passwordVar, function(err){
      if(!err){
        t.$('#signInModal').modal('hide');
      }
    });
  },

  'submit #formSignUp'(e, t){
    e.preventDefault();

    console.log(Meteor.users.find().count());
    if(Meteor.users.find().count() >= 1){
      return;
    }

    let userInfo;

    let emailVar = e.target.signUpInputEmail.value;
    let usernameVar = e.target.signUpInputUsername.value;
    let passwordVar = e.target.signUpInputPassword.value;
    let passwordConfirmVar = e.target.signUpInputPasswordConfirm.value;

    if(passwordVar !== passwordConfirmVar){
      t.$("#signUpInputPasswordConfirm").val('');
      t.$("#signUpInputPasswordConfirm").focus();
      return false;
    }

    userInfo = {
      email: emailVar,
      password: passwordVar,
      username: usernameVar
    };

    Accounts.createUser(userInfo, function(err){
      if(!err){
        t.$('#signInModal').modal('hide');
        t.isSignIn.set("isSignInSection", true);
      }
    });

  },

  'click .logout'(e, t){
    e.preventDefault();

    if (!Meteor.userId()) {
      return;
    }

    t.$('#signInModal').modal('hide');
    Meteor.logout();
    t.isSignIn.set("isSignInSection", true);
  },

  'click .reset-password'(e, t){
    e.preventDefault();

    $('#resetPwModal').modal();
  }
});



