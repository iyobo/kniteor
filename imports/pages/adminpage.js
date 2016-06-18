/**
 * Created by iyobo on 2016-06-17.
 */
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Orders } from '../api/orders.js';
import { ReactiveDict } from 'meteor/reactive-dict';

import './adminpage.html';



Template.adminpage.onCreated(function bodyOnCreated() {
	this.state = new ReactiveDict();
	Meteor.subscribe('orders');
});


Template.adminpage.helpers({
	orders() {
		const instance = Template.instance();
		return Orders.find({});
	},
	orderCount() {
		return Orders.find().count();
	}
});

Template.adminpage.events({
	'submit .new-task'(event) {
		// Prevent default browser form submit
		event.preventDefault();

		// Get value from form element
		const target = event.target;
		const text = target.text.value;

		// Insert a task into the collection
		// Insert a task into the collection
		Meteor.call('tasks.insert', text);

		// Clear form
		target.text.value = '';
	},
	'change .hide-completed input'(event, instance) {
		instance.state.set('hideCompleted', event.target.checked);
	},
});
