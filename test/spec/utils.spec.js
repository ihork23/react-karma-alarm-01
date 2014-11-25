define(['utils'], function(utils) {
	describe('Test utils transformToDoubleDigit function', function() {
		it('should return double zero string in case when you call it with empty string', function() {
			expect(utils.transformToDoubleDigit('')).toEqual('00');
		});
		it('should return double digit string in case when you call it with one digit number', function() {
			expect(utils.transformToDoubleDigit(1)).toEqual('01');
		});
		it('should return double digit dtring when you call it with 2 or greater digit number or string', function() {
			expect(utils.transformToDoubleDigit('452')).toEqual('45');
		});
		it('should throw an error in case when you call it with any argument different from string or number', function() {
			expect(function() {utils.transformToDoubleDigit(2)}).not.toThrow();
			expect(function() {utils.transformToDoubleDigit('452')}).not.toThrow();
			expect(function() {utils.transformToDoubleDigit(324)}).not.toThrow();
			expect(function() {utils.transformToDoubleDigit({})}).toThrow();
			expect(function() {utils.transformToDoubleDigit(function() {})}).toThrow();
			expect(function() {utils.transformToDoubleDigit(null)}).toThrow();
			expect(function() {utils.transformToDoubleDigit(true)}).toThrow();
		});
	});
	describe('Test utils dropToDefault function', function() {
		beforeEach(function() {

		})
		it('dropToDefault function should set all number inputs from the form to the zero state', function() {
			var form = document.createElement('form');
			form.innerHTML = '<input name="num1" type="number" value="1">' +
				'<input name="num2" type="number" value="12">' +
				'<input name="str1" type="text" value="12">';
			var items = form.elements;
			utils.dropToDefault(form);
			expect(items.num1.value).toEqual('0');
			expect(items.num2.value).toEqual('0');
			expect(items.str1.value).toEqual('12');
		});
	});
});