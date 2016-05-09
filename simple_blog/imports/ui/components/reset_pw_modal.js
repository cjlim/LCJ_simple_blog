
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';

import './reset_pw_modal.html';

Template.resetPwModal.onCreated(function() {
});

Template.resetPwModal.onRendered(function() {
});
Template.resetPwModal.onDestroyed(function() {
});

Template.resetPwModal.helpers({
});

Template.resetPwModal.events({
  'submit #resetPassword'(e, t){
    e.preventDefault();

    if(!Meteor.userId()){
      return false;
    }

    let oldPasswordVar = e.target.resetOldPassword.value;
    let newPasswordVar = e.target.resetNewPassword.value;
    let newPasswordConfirmVar = e.target.resetNewPasswordConfirm.value;

    if(newPasswordVar !== newPasswordConfirmVar){
      t.$("#resetNewPasswordConfirm").focus();
      t.$('.error-test').text("새로운 비빌번호를 확인 해 주세요.");
      return false;
    }

    Accounts.changePassword(oldPasswordVar, newPasswordVar, function(err){
      if(err){
        t.$('.error-test').text(err.reason);
        t.$("#resetOldPassword").focus();
      } else {
        console.log(t)
        t.$('#resetPassword')[0].reset();
        t.$('.error-test').text("");
        t.$('#resetPwModal').modal('hide');
      }
    });

  }
});



