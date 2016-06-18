/**
 * Created by iyobo on 2016-06-17.
 */
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './order.html';

Template.order.helpers({
	isOwner() {
		return this.owner === Meteor.userId();
	},
});

Template.order.events({
	'click .toggle-checked'() {
		// Set the checked property to the opposite of its current value
		Meteor.call('orders.setChecked', this._id, !this.checked);
	},
	'click .delete'() {
		Meteor.call('orders.remove', this._id);
	},
	'click .toggle-private'() {
		Meteor.call('orders.setPrivate', this._id, !this.private);
	},
});