define(['react', 'lodash', 'alarmItem'], function(React, _, AlarmItem) {
	'use strict';
	return React.createClass({
		displayName: 'AlarmList',
		render: function() {
			var alarms = _.map(this.props.items, function(alarm, id) {
				return (
					React.createElement(AlarmItem, {date: alarm.time, key: id, id: id, updateAlarmsState: this.props.updateAlarmsState})
				);
			}.bind(this));
			return (
				React.createElement('ul', {className: 'alarmList'},
					alarms
				)
			)
		}
	});
});