define('app', 
	['react', 'AlarmBox'], 
	function(React, AlarmBox) {
	

	React.render(React.createElement(AlarmBox, null),
		document.getElementById('container')
	);

});