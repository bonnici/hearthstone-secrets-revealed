'use strict';

var appState = new AppState();
appState.addTrap('hunter');

ReactDOM.render(
	<AppComponent className="testing" />,
	document.getElementById('example')
);
