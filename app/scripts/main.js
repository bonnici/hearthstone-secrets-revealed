'use strict';

var appState = new AppState();
appState.addUnrevealedSecret('hunter');

ReactDOM.render(
	//<AppComponent className="testing" />,
	<AppComponent/>,
	document.getElementById('example')
);
