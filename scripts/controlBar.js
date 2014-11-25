define(['react', 'alarmModule', 'utils'], function(React, alarmModule, utils) {
	'use strict';
	return React.createClass({
		displayName: 'ControlBar',
		componentDidMount: function() {
			utils.dropToDefault(this.getDOMNode());
		},
		render: function() {
			return (
				React.createElement('form', {
					className: 'controlBar',
					onSubmit: function(event) {
						event.preventDefault();
						var form = event.target.elements;

						var now = new Date();
						var time = {
							hours: form.hours.value,
							mins: form.mins.value,
							secs: form.secs.value,
						};
						utils.dropToDefault(event.target);
						alarmModule.addAlarm(now, time, this.props.updateAlarmsState);
					}.bind(this)
				},
					React.createElement('label', null,
						'Hours: '
					),
					React.createElement('input', {
						className: 'alarmHours',
						type: 'number',
						min: 0,
						max: 23,
						name: 'hours'
					}),
					React.createElement('label', null,
						'Mins: '
					),
					React.createElement('input', {
						className: 'alarmMins',
						type: 'number',
						min: 0,
						max: 59,
						name: 'mins'
					}),
					React.createElement('label', null,
						'Secs: '
					),
					React.createElement('input', {
						className: 'alarmSecs',
						type: 'number',
						min: 0,
						max: 59,
						name: 'secs'
					}),
					React.createElement('button', {
						type: 'submit'
					},
						'Add alarm'
					)
				)
			);
		}
	});

});