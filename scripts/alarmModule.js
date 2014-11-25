define(['react', 'lodash'], function(React, _) {
	'use strict';

	var alarmList = {};
	var alarmModule = {
		getAlarmList: function() {
			return alarmList;
		},
		addAlarm: function(now, time, updateAlarmsState) {
			var timeNow;
			var alarmDate;
			var id;
			var self = this;

			if (!(now instanceof Date)) {
				throw '"Now" argument of addAlarm function is not a date object';
			}
			if (time === null ||
				typeof time !== 'object' ||
				!/number|string/.test(typeof time.hours) ||
				!/number|string/.test(typeof time.mins) ||
				!/number|string/.test(typeof time.secs)) {
				throw '"Time" argument of addAlarm function is not valid';
			}

			alarmDate = new Date();
			timeNow = now.getTime();
			alarmDate.setSeconds(time.secs);
			alarmDate.setMinutes(time.mins);
			alarmDate.setHours(time.hours);
			if (alarmDate.getTime() < timeNow) {
				alarmDate.setTime(alarmDate.getTime() + 24 * 60 * 60 * 1000)
			}
			alarmList[timeNow] = {
				alarm: setTimeout((function(id) {
					return function() {
						self.doAlarm();
						self.removeAlarm(id, updateAlarmsState);
					};
				}(timeNow)), alarmDate.getTime() - timeNow),
				time: alarmDate
			};
			updateAlarmsState(alarmDate.getTime());
		},
		removeAlarm: function(id, updateAlarmsState) {
			if (id === 'all') {
				alarmList = {};
				id = 0;
			} else {
				if (alarmList[id]) {
					clearTimeout(alarmList[id].alarm);
					delete alarmList[id];
				}
			}
			updateAlarmsState(id);
		},
		doAlarm: function() {
			alert('alarm');
		}
	};

	return alarmModule;
	
});