import { Meteor } from 'meteor/meteor';
import '../imports/api/orders.js';



Meteor.startup(() => {
  // code to run on server at startup
	UploadServer.init({
		tmpDir: process.env.PWD + '/.uploads/tmp',
		uploadDir: process.env.PWD + '/.uploads/',
		checkCreateDirectories: true, //create the directories automatically
		getDirectory: function(fileInfo, formData) {
			// create a sub-directory in the uploadDir based on formdata
			// console.log("getDirectory for",formData);
			return 'tmp/';
		},
		finished(fileInfo, formFields) {
			// console.log("uploaded",fileInfo, formFields);

			//This is where the call is made to the C++ external module
			var mockEstimate = ((Math.random()+1)*300).toFixed(2);

			fileInfo.quote={currency:"$", value: mockEstimate};
		}
	});
});
