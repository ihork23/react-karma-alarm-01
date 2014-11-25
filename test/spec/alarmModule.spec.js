define(['alarmModule', 'lodash'], function(alarmModule, _) {
	function getTimeObjFromDate(date) {
		return {
			hours: date.getHours(),
			mins: date.getMinutes(),
			secs: date.getSeconds()
		};
	}
	describe('Check alarm module functions', function() {
		var updateState;
		var now;

		beforeEach(function() {
			updateState = jasmine.createSpy();
			now = new Date();
			alarmModule.removeAlarm('all', updateState);
		});

		describe('Do alarm', function() {
			var is, spy;
			beforeEach(function() {
				spy = spyOn(alarmModule, 'doAlarm');
				jasmine.clock().install();
				now = new Date();
			});
			afterEach(function() {
			    jasmine.clock().uninstall();
			});
			it('should have a method to make an alarm', function() {
				expect(alarmModule.doAlarm).toBeDefined();
			});
			it('should alarm after setted amount of time', function() {
				alarmModule.addAlarm(now, getTimeObjFromDate(new Date(now.getTime() + 5000)), updateState);
				expect(_.size(alarmModule.getAlarmList())).toEqual(1);
				jasmine.clock().tick(3001);
				expect(_.size(alarmModule.getAlarmList())).toEqual(1);
				expect(alarmModule.doAlarm).not.toHaveBeenCalled();
				jasmine.clock().tick(6001);
				expect(_.size(alarmModule.getAlarmList())).toEqual(0);
				expect(spy).toHaveBeenCalled();
			});
		});

		describe('Get alarm items', function() {
			it('should have a method to return a list of alarm items', function() {
				expect(alarmModule.getAlarmList).toBeDefined();
				expect(alarmModule.getAlarmList()).not.toBe(null);
				expect(typeof alarmModule.getAlarmList()).toEqual('object');
			});	
		});
		
		describe('Add an alarm item', function() {
			it('should have a method to add an item to the list of alarm items and update a state of a parent React component', function() {
				expect(alarmModule.addAlarm).toBeDefined();
				alarmModule.addAlarm(now, getTimeObjFromDate(new Date(now.getTime() + 10)), updateState);

				expect(_.size(alarmModule.getAlarmList())).toEqual(1);
				expect(updateState).toHaveBeenCalled();
			});
			it('should throw an exception when you call it with wrong arguments', function() {
				expect(alarmModule.addAlarm.bind(null, getTimeObjFromDate(new Date(now.getTime() + 10)), updateState)).toThrow();
				expect(alarmModule.addAlarm.bind(now, null, updateState)).toThrow();
				expect(alarmModule.addAlarm.bind(now, 'null', updateState)).toThrow();
				expect(alarmModule.addAlarm.bind(now, {hours: null, mins: 12, secs: 10}, updateState)).toThrow();
				expect(alarmModule.addAlarm.bind(now, {hours: 10, mins: null, secs: 10}, updateState)).toThrow();
				expect(alarmModule.addAlarm.bind(now, {hours: 10, mins: 12, secs: null}, updateState)).toThrow();
				expect(alarmModule.addAlarm.bind(now, getTimeObjFromDate(new Date(now.getTime() + 10)), undefined)).toThrow();
			});
		});
		
		describe('Remove an alarm item', function() {
			var spy;
			var now;


			beforeEach(function() {
				spy = spyOn(alarmModule, 'doAlarm');
				jasmine.clock().install();
				now = new Date();
			});
			afterEach(function() {
			    jasmine.clock().uninstall();
			});
			it('should have a method to remove an item from the list of alarm items', function() {
				var id;
				expect(alarmModule.removeAlarm).toBeDefined();
				alarmModule.addAlarm(now, getTimeObjFromDate(new Date(now.getTime() + 10)), updateState);
				id = now.getTime();
				expect(_.size(alarmModule.getAlarmList())).toEqual(1);
				alarmModule.removeAlarm(id, updateState);
				expect(_.size(alarmModule.getAlarmList())).toEqual(0);
			});

			it('should remove an item before alerting', function() {
				var id;
				alarmModule.addAlarm(now, getTimeObjFromDate(new Date(now.getTime() + 10000)), updateState);
				id = now.getTime();
				expect(_.size(alarmModule.getAlarmList())).toEqual(1);
				jasmine.clock().tick(5000);
				expect(spy).not.toHaveBeenCalled();
				expect(_.size(alarmModule.getAlarmList())).toEqual(1);

				alarmModule.removeAlarm(id, updateState);
				expect(_.size(alarmModule.getAlarmList())).toEqual(0);
				jasmine.clock().tick(11001);
				expect(spy).not.toHaveBeenCalled();
			});
		});
		

	});
});