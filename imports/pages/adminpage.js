/**
 * Created by iyobo on 2016-06-17.
 */
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Orders } from '../api/orders.js';
import { ReactiveDict } from 'meteor/reactive-dict';


import './adminpage.html';
import './task.js';



Template.body.onCreated(function bodyOnCreated() {
	this.state = new ReactiveDict();
	Meteor.subscribe('tasks');
});


Template.body.helpers({
	tasks() {
		const instance = Template.instance();
		if (instance.state.get('hideCompleted')) {
			// If hide completed is checked, filter tasks
			return Orders.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
		}
		// Otherwise, return all of the tasks
		return Orders.find({});
	},
	incompleteCount() {
		return Orders.find({ checked: { $ne: true } }).count();
	},
	specificFormData() {
		return {
			id: this._id,
			other: this.other,
			hard: 'Lolcats'
		}
	},
});

Template.body.events({
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
