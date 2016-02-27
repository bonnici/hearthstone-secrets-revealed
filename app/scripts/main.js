'use strict';

/*
todo
- highlight/animate card when actions are hovered?
- bold consequence text when mousing over card?
- make dismissable help text or popovers?
- better logo
- better look
- re-add outdated browser warning?
- change favicon
- add metas
- update analytics ID
- add footer with contact (and set up new email with forwarding)
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
