import '../imports/startup/accounts-config.js';
import '../imports/pages/orderpage.js';
import '../imports/pages/adminpage.js';

Router.route('/', function () {
	this.render('orderpage');
});
Router.route('/admin', function () {
	this.render('adminpage');
});