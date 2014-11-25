define(['lodash'], function(_) {
	'use strict';
	function transformToDoubleDigit(value) {
		if (!(typeof value === 'string' || typeof value === 'number')) {
			throw 'Wrong input type';
		}
		value = value.toString();
		if (value.length === 0) {
			value = '00';
		} else if (value.length === 1) {
			value = '0' + value;
		}
		return value.substr(0, 2);
	}
	function dropToDefault(form, defaultValue) {
		defaultValue = defaultValue || 0;
		var items = form.elements;
		_.forEach(items, function(item) {
			if (item.type === 'number') {
				item.value = defaultValue;
			}
		});
	}
	return {
		transformToDoubleDigit: transformToDoubleDigit,
		dropToDefault: dropToDefault
	};
});