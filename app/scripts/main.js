'use strict';

var appState = new AppState();

ReactDOM.render(
	//<AppComponent className="testing" />,
	<AppComponent
		addHunterSecret={() => appState.addUnrevealedSecret('hunter')}
		addMageSecret={() => appState.addUnrevealedSecret('mage')}
		addPaladinSecret={() => appState.addUnrevealedSecret('paladin')}
		setSecretAsRevealed={(unrevealedSecretIndex, possibleSecretIndex) => appState.setSecretAsRevealed(unrevealedSecretIndex, possibleSecretIndex)}
		setSecretAsImpossible={(unrevealedSecretIndex, possibleSecretIndex) => appState.setSecretAsImpossible(unrevealedSecretIndex, possibleSecretIndex)}
		setConsequentialActionAsPerformed={(index) => appState.setConsequentialActionAsPerformed(index)}
	/>,
	document.getElementById('reactApp')
);
