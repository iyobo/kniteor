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
		 * TODO: We must Verify the spec object and quote coming from the client.
		 * We would make another Call to the C++ API here before finally inserting the data
		 */

		Orders.insert(data);
	},
	'orders.remove'(taskId) {
		// check(taskId, String);

		Orders.remove(taskId);
	},
	'orders.setChecked'(taskId, setChecked) {
		// check(taskId, String);
		check(setChecked, Boolean);

		Orders.update(taskId, {$set: {checked: setChecked}});
	},
	'orders.setPrivate'(taskId, setToPrivate) {
		// check(taskId, String);
		check(setToPrivate, Boolean);

		const task = Orders.findOne(taskId);

		// Make sure only the task owner can make a task private
		if (task.owner !== this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		Orders.update(taskId, {$set: {private: setToPrivate}});
	},
});