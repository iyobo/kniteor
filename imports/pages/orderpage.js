/**
 * Created by iyobo on 2016-06-17.
 */
import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Tasks} from '../api/orders.js';
import {ReactiveDict} from 'meteor/reactive-dict';

import './orderpage.css';
import './orderpage.html';
import './thanks.html';

function compileForm(){
	return {name: $('#order_name').val(), email: $('#order_email').val(), phone: $('#order_phone').val()};
}

Template.orderpage.onCreated(function() {
	this.state = new ReactiveDict();
	Meteor.subscribe('orders');

});
Template.orderpage.onRendered(function(){
	$('.jqDropZone').html('Drag & drop the JSON spec file you wish to estimate here');
})

Template.orderpage.helpers({
	activeFile(){
		const instance = Template.instance();
		var info = instance.state.get("activeFile");
		if(!info)
			return "";
		else{
			return info;
		}
	},
	uploadCallbacks:function() {
		const instance = Template.instance();
		return {
			formData: compileForm,
			finished: function (index, fileInfo, context) {
				console.log(fileInfo)
				instance.state.set("activeFile",fileInfo);
			},
		}
	}
});

Template.orderpage.events({
	'submit #orderform'(event, instance) {
		event.preventDefault();

		var formdata = compileForm();
		formdata.spec= instance.state.get('activeFile');
		console.log("submitting",formdata);
		
		Meteor.call('orders.insert',formdata);

		Router.go('/thanks');
	},

});
