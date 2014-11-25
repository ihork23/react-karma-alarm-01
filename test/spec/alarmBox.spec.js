define(['alarmBox', 'react'], function(AlarmBox, React) {
	describe('Test insertion into DOM', function() {
		var dom, element;
		beforeEach(function() {
			dom = document.createElement('div');
			element = React.render(React.createElement(AlarmBox, null), dom);
		});

		it('should be placed into DOM after render function calling', function() {
			expect(dom.querySelectorAll('.alarmBox').length).toEqual(1);
			expect(dom.querySelectorAll('.controlBar').length).toEqual(1);
			expect(dom.querySelectorAll('.alarmList').length).toEqual(1);
		});
		it('updateAlarmState function must update state of AlarmBox and call it rerendering', function() {
			expect(element.state).toBeDefined();
			expect(element.state.lastItemId).toEqual(0);
			expect(element.updateAlarmsState).toBeDefined();

			element.updateAlarmsState(1);
			expect(element).toBeDefined();
			expect(element.state.lastItemId).toEqual(1);
		});
	});
});