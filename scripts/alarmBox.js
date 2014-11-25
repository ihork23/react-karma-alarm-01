define(['react', 'alarmList', 'controlBar', 'alarmModule'], function(React, AlarmList, ControlBar, alarmModule) {
	'use strict';
	return React.createClass({
		displayName: 'AlarmBox',
		getInitialState: function() {
			return {
				lastItemId: 0
			};
		},
		updateAlarmsState: function(id) {
			this.setState({lastItemId: id});
		},
		render: function() {
			return (
				React.createElement('div', {className: 'alarmBox'},
					React.createElement(ControlBar, {className: 'controlBar', updateAlarmsState: this.updateAlarmsState}),
					React.createElement(AlarmList, {className: 'alarmList', items: alarmModule.getAlarmList(), updateAlarmsState: this.updateAlarmsState})
				)
			);
		}
	});
});