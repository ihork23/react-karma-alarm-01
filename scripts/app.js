define('app',['react', 'lodash'], function(React, _) {
	var alarmModule = (function() {
		alarmList = {};

		function getAlarmList() {
			return alarmList;
		}
		function addAlarm(now, time, alarmFunc, updateAlarmsState) {
			var timeNow = now.getTime();
			var alarm = new Date();
			var id;
			alarm.setSeconds(time.secs);
			alarm.setMinutes(time.mins);
			alarm.setHours(time.hours);
			if (alarm.getTime() < timeNow) {
				alarm.setTime(alarm.getTime() + 24 * 60 * 60 * 1000)
			}
			alarmList[timeNow] = {
				alarm: setTimeout((function(id) {
					return function() {
						alarmFunc();
						removeAlarm(id, updateAlarmsState);
					};
				}(timeNow)), alarm.getTime() - timeNow),
				time: alarm
			};
			updateAlarmsState(alarm.getTime());
			console.log(alarmList);
		}
		function removeAlarm(id, updateAlarmsState) {
			delete alarmList[id];
			updateAlarmsState(id);
		}
		
		return {
			addAlarm: addAlarm,
			getAlarmList: getAlarmList,
			removeAlarm: removeAlarm
		};
	}());

	var AlarmBox = React.createClass({
		displayName: 'AlarmBox',
		getInitialState: function() {
			return {
				lastItemId: 0
			};
		},
		alarm: function() {
			alert('alarm');
		},
		updateAlarmsState: function(id) {
			this.setState({lastItemId: id});
		},
		getListOfItems: function() {
			return alarmModule.getAlarmList();
		},
		render: function() {
			return (
				React.createElement('div', {className: 'alarmBox'},
					React.createElement(ControlBar, {className: 'controlBar', alarm: this.alarm, updateAlarmsState: this.updateAlarmsState}),
					React.createElement(AlarmList, {className: 'controlBar', items: this.getListOfItems()})
				)
			);
		}
	});
	var ControlBar = React.createClass({
		displayName: 'ControlBar',
		render: function() {console.log('render ControlBar');
			return (
				React.createElement('form', {
					className: 'controlBar',
					onSubmit: function(event) {
						event.preventDefault();
						var form = event.target;
						var now = new Date();
						var time = {
							hours: form.querySelector('[name="hours"]').value,
							mins: form.querySelector('[name="mins"]').value,
							secs: form.querySelector('[name="secs"]').value,
						};
						alarmModule.addAlarm(now, time, this.props.alarm, this.props.updateAlarmsState);
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

	var AlarmList = React.createClass({
		displayName: 'AlarmList',
		render: function() {
			var alarms = _.map(this.props.items, function(alarm, id) {
				return (
					React.createElement(Alarm, {date: alarm.time, id: id})
				);
			})
			return (
				React.createElement('ul', {className: 'alarmList'},
					alarms
				)
			)
		}
	});

	var Alarm = React.createClass({
		displayName: 'Alarm',
		render: function() {
			// var date = new Date(parseInt(this.props.date));
			var date = this.props.date;
			var transformToDoubleDigit = function(value) {
				value = value.toString();
				if (value.length === 1) {
					value = '0' + value;
				}
				return value;
			}
			return (
				React.createElement('li', {className: 'alarm'},
					transformToDoubleDigit(date.getHours()) + ':' + transformToDoubleDigit(date.getMinutes()) + ':' + transformToDoubleDigit(date.getSeconds())
				)
			)
		}
	});

	return AlarmBox;

	});