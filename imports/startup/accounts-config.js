/**
 * Created by iyobo on 2016-06-17.
 */
import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
	passwordSignupFields: 'USERNAME_ONLY',
});