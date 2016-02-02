'use strict';

var appState = new AppState();
appState.addTrap('hunter');

ReactDOM.render(
	//<AppComponent className="testing" />,
	<AppComponent/>,
	document.getElementById('example')
);
