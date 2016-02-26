'use strict';

var appState = new AppState();

var possibleSecretClicked = function(unrevealedSecretIndex, possibleSecretIndex, secretName, secretText) {
	var unrevealedSecret = $('.unrevealed-secret').eq(unrevealedSecretIndex);
	unrevealedSecret.attr('data-clicked-card-index', possibleSecretIndex);
	unrevealedSecret.find('.clicked-card-name').text(secretName);
	unrevealedSecret.find('.clicked-card-text').text(secretText);
	unrevealedSecret.dimmer('show');
};

var setSecretAsRevealed = function(unrevealedSecretIndex) {
	var unrevealedSecret = $('.unrevealed-secret').eq(unrevealedSecretIndex);
	appState.setSecretAsRevealed(unrevealedSecretIndex, unrevealedSecret.attr('data-clicked-card-index'));
	unrevealedSecret.dimmer('hide');
};

var setSecretAsImpossible = function(unrevealedSecretIndex) {
	var unrevealedSecret = $('.unrevealed-secret').eq(unrevealedSecretIndex);
	appState.setSecretAsImpossible(unrevealedSecretIndex, unrevealedSecret.attr('data-clicked-card-index'));
	unrevealedSecret.dimmer('hide');
};

var setSecretAsUnknown = function(unrevealedSecretIndex) {
	$('.unrevealed-secret').eq(unrevealedSecretIndex).dimmer('hide');
};

ReactDOM.render(
	<AppComponent
		addHunterSecret={() => appState.addUnrevealedSecret('hunter')}
		addMageSecret={() => appState.addUnrevealedSecret('mage')}
		addPaladinSecret={() => appState.addUnrevealedSecret('paladin')}
		setSecretAsRevealed={(unrevealedSecretIndex) => setSecretAsRevealed(unrevealedSecretIndex)}
		setSecretAsImpossible={(unrevealedSecretIndex) => setSecretAsImpossible(unrevealedSecretIndex)}
		setSecretAsUnknown={(unrevealedSecretIndex) => setSecretAsUnknown(unrevealedSecretIndex)}
		possibleSecretClicked={(unrevealedSecretIndex, possibleSecretIndex, secretName, secretText) => possibleSecretClicked(unrevealedSecretIndex, possibleSecretIndex, secretName, secretText)}
		setConsequentialActionAsPerformed={(index) => appState.setConsequentialActionAsPerformed(index)}
	/>,
	document.getElementById('reactApp')
);
