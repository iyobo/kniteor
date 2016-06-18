import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Orders = new Mongo.Collection('orders');

// Only publish tasks that are public or belong to the current user

if (Meteor.isServer) {
	// This code only runs on the server
	// Meteor.publish('orders', function ordersPublication() {
	// 	return Tasks.find({
	// 		$or: [
	// 			{ private: { $ne: true } },
	// 			{ owner: this.userId },
	// 		],
	// 	});
	// });
}
Meteor.methods({
	'tasks.insert'(text) {
		check(text, String);

		// Make sure the user is logged in before inserting a task
		if (! this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		Orders.insert({
			text,
			createdAt: new Date(),
			owner: this.userId,
			username: Meteor.users.findOne(this.userId).username,
		});
	},
	'tasks.remove'(taskId) {
		// check(taskId, String);

		Orders.remove(taskId);
	},
	'tasks.setChecked'(taskId, setChecked) {
		// check(taskId, String);
		check(setChecked, Boolean);

		Orders.update(taskId, { $set: { checked: setChecked } });
	},
	'tasks.setPrivate'(taskId, setToPrivate) {
		// check(taskId, String);
		check(setToPrivate, Boolean);

		const task = Orders.findOne(taskId);

		// Make sure only the task owner can make a task private
		if (task.owner !== this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		Orders.update(taskId, { $set: { private: setToPrivate } });
	},
});