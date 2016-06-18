import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Orders = new Mongo.Collection('orders');

// Only publish tasks that are public or belong to the current user

if (Meteor.isServer) {
	// This code only runs on the server
	Meteor.publish('orders', function ordersPublication() {
		return Orders.find();
	});
}
Meteor.methods({
	'orders.insert'(data) {
		check(data.spec, Object);

		/**
		 * DESIGN: We must Verify the spec object and quote coming from the client.
		 * We would make another Call to the C++ API here before finally inserting the data
		 */
		if(Meteor.isServer) {
			Meteor.kniteor.getEstimate(data.spec,function(realEstimate){
				data.spec.quote.value = realEstimate;
				Orders.insert(data);
			});
		}

	}
});