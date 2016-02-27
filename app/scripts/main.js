'use strict';

/*
todo
- make dismissable help text or popovers
- test on other browsers
- buy domain and change url properties
- set up email address
- add keywords? or update description to include "cheat sheet", "hearthstone secrets" "detect" "play around"
- add submenu with a short description
- standard/wild mode
*/

var appState = new AppState();

ReactDOM.render(
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

$('#contact').click(() => $('.contact.modal').modal('show'));
