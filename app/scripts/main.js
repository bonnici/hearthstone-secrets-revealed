'use strict';

/*
todo
- standard/wild mode
*/

$('#contact').click(() => $('.contact.modal').modal('show'));
$('#help').click(() => $('.help.message').show());

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

