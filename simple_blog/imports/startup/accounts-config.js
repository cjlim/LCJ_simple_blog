/**
 * Created by limchaejoo on 2016. 4. 16..
 */

import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL',
});
