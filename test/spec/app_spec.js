define(['app', 'react', 'jquery'], function(alarmModule, React, $) {
	$ = jQuery;
	var container = document.createElement('div');
	container.id = "container";
	document.getElementsByTagName('body')[0].appendChild(container);

	function setAlarmPlusSeconds(value) {
    	var now = new Date();
    	$('.alarmHours').val(now.getHours());
		$('.alarmMins').val(now.getMinutes());
		$('.alarmSecs').val(now.getSeconds() + value);
		$('.controlBar button').trigger('click');
	}


	describe('Test demo', function() {
		it('demo it', function() {
			expect(1+2).toEqual(3);
		});
	});

	describe('Test AlarmBox class', function() {
		it('shoud be defined', function() {
			expect(alarmModule).toBeDefined();
		});
	});

	describe('Work with DOM', function() {
		it('should be placed into the DOM', function() {
			React.render(React.createElement(alarmModule, null),
				container
			);
			expect(document.querySelectorAll('.alarmBox').length).toEqual(1);
		});
		it('the list of alarms should be updated after adding new alarm', function() {

			var actualQuantity = document.querySelectorAll('.alarm').length;
			var quantity;
	    	var now = new Date();
	    	$('.alarmHours').val(1);
			$('.alarmMins').val(1);
			$('.alarmSecs').val(1);
			$('.controlBar button').trigger('click');
			
			quantity = document.querySelectorAll('.alarm').length;
			expect(quantity).toEqual(actualQuantity + 1);
		});
	});

	describe('Work with alarm functionality', function() {debugger;
		// var timerCallback;
		// timerCallback = jasmine.createSpy('timerCallback');
		var oldAlert;
		beforeEach(function() {
			oldAlert = alert;
			alert = jasmine.createSpy();
			// spyOn(window, alert);
	    	jasmine.clock().install();


		});
		afterEach(function() {
			alert = oldAlert;
		});
		it('should not alarm before set time', function() {
	    	setAlarmPlusSeconds(5);
			expect(alert).not.toHaveBeenCalled();
			jasmine.clock().tick(4001);
			expect(alert).not.toHaveBeenCalled();

		});
		it('should alarm after set time', function() {
	    	setAlarmPlusSeconds(5);
			expect(alert).not.toHaveBeenCalled();
			jasmine.clock().tick(5001);

			expect(alert).toHaveBeenCalled();
		});


		it('should remove alarm item after', function() {debugger;
			var actualQuantity = document.querySelectorAll('.alarm').length;
			var quantity;

			setAlarmPlusSeconds(5);
			quantity = document.getElementsByClassName('alarm').length;
			expect(quantity).toEqual(actualQuantity + 1);

			jasmine.clock().tick(5001);
			quantity = document.getElementsByClassName('alarm').length;
			expect(quantity).toEqual(actualQuantity);
	    	
		});
	});
});
