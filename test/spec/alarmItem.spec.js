define(['alarmItem', 'react'], function(AlarmItem, React) {
	describe('Test insertion into DOM', function() {
		it('should be placed into DOM after render function calling', function() {
			var dom = document.createElement('ul');
			React.render(React.createElement(AlarmItem, {date: new Date(), key: 1}),
				dom
			);
			expect(dom.querySelectorAll('.alarmItem').length).toEqual(1);
		});
	});
});