define(['controlBar', 'react', 'alarmModule'], function(ControlBar, React, alarmModule) {
	describe('Test insertion into DOM', function() {
		var dom, form;
		beforeEach(function() {
			dom = document.createElement('div');
			form = React.render(React.createElement(ControlBar, {className: 'controlBar'}),
				dom
			);
		});

		it('should be placed into DOM after render function calling', function() {
			expect(dom.querySelectorAll('.controlBar').length).toEqual(1);
			expect(dom.querySelectorAll('input').length).toEqual(3);
		});

		it('should call addAlarm method after valid sumbission', function() {
			var tUtils = React.addons.TestUtils;
			var spy = spyOn(alarmModule, 'addAlarm');
			var spyPrevent = jasmine.createSpy();
			
			tUtils.Simulate.submit(form, {
				preventDefault: spyPrevent,
				target: form
			});
			setTimeout(function() {
				expect(spyPrevent).toHaveBeenCalled();
				expect(spy).toHaveBeenCalled();
			}, 50);
		});
	});
});