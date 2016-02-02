'use strict';

var appState = new AppState();
appState.addPlayedSecret('hunter');

ReactDOM.render(
	//<AppComponent className="testing" />,
	<AppComponent/>,
	document.getElementById('example')
);
