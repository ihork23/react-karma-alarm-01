define(['alarmList', 'react'], function(AlarmList, React) {
	describe('Test insertion into DOM', function() {
		var dom, items;
		beforeEach(function() {
			dom = document.createElement('div');
			var now = new Date();
			items = {
				'1416833652452': {
					alarm: 8,
					time: new Date(now.getTime() + 10)
				},
				'1416833652453': {
					alarm: 9,
					time: new Date(now.getTime() + 11)
				},
				'1416833652454': {
					alarm: 10,
					time: new Date(now.getTime() + 12)
				}
			};
			React.render(React.createElement(AlarmList, {className: 'alarmList', items: items}),
				dom
			);
		});

		it('should be placed into DOM after render function calling', function() {
			expect(dom.querySelectorAll('.alarmList').length).toEqual(1);
			expect(dom.querySelectorAll('.alarmItem').length).toEqual(3);
		});
	});
});