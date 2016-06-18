import { Meteor } from 'meteor/meteor';
import '../imports/api/orders.js';


Meteor.startup(() => {

	Meteor.kniteor = {}
	Meteor.kniteor.getEstimate=function(fileInfo, cb){
		//DESIGN: This is where the call is made to the C++ external module. Mocking now with random value
		var mockEstimate = ((Math.random()+1)*100).toFixed(2);

		cb(mockEstimate);
	};

  // code to run on server at startup
	UploadServer.init({
		tmpDir: process.env.PWD + '/.uploads/tmp',
		uploadDir: process.env.PWD + '/.uploads/',
		checkCreateDirectories: true, //create the directories automatically
		getDirectory: function(fileInfo, formData) {
			return 'tmp/';
		},
		finished(fileInfo, formFields) {
			Meteor.kniteor.getEstimate(fileInfo,function(estimate){
				fileInfo.quote={currency:"$", value: estimate};
			});
		}
	});

});

