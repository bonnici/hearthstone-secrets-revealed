'use strict';

var appState = new AppState();

//so temp
setTimeout(() => appState.addUnrevealedSecret('hunter'), 2000);

ReactDOM.render(
	//<AppComponent className="testing" />,
	<AppComponent/>,
	document.getElementById('reactApp')
);
