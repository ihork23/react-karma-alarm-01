define(['react', 'utils', 'alarmModule'], function(React, utils, alarmModule) {
	'use strict';
	return React.createClass({
		displayName: 'Alarm',
		render: function() {
			var date = this.props.date;
			var removeAlarm = function() {
				alarmModule.removeAlarm(this.props.id, this.props.updateAlarmsState);
			}.bind(this);
			return (
				React.createElement('li', {className: 'alarmItem', alarmId: this.props.key},
					utils.transformToDoubleDigit(date.getHours()) + ':' + utils.transformToDoubleDigit(date.getMinutes()) + ':' + utils.transformToDoubleDigit(date.getSeconds()),
					React.createElement('button', {className: 'removeAlarm', onClick: removeAlarm}, 'x')
				)
			)
		}
	});
});