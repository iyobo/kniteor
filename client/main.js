import '../imports/startup/accounts-config.js';
import '../imports/pages/orderpage.js';
import '../imports/pages/adminpage.js';

Router.onBeforeAction(function() {
	if (! Meteor.userId()) {
		this.redirect('/');
	} else {
		this.next();
	}
},{
	only: ['admin']
});
Router.route('/', function () {
	this.render('orderpage');
});
Router.route('/admin', function () {
	this.render('adminpage');
});
Router.route('/thanks', function () {
	this.render('thanks');
});