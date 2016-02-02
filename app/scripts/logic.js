'use strict';

class Secret {
	constructor(name, heroClass, text, concequence) {
		this.name = name;
		this.heroClass = heroClass;
		this.text = text;
		this.concequence = concequence;
		this.triggeredBy = [];
	}

	addTriggeredBy(action) {
		if (!this.triggeredBy.includes(action)) {
			this.triggeredBy.push(action);
		}
	}
}

var bear = new Secret('Bear Secret', 'hunter', 'After your hero is attacked, summon a 3/3 Bear with Taunt', 'This might summon a 3/3 boar for the opposing hero');
var dart = new Secret('Dart Secret', 'hunter', 'When an opposing Hero Power is used, deal 5 damage to a random enemy', 'This might deal 5 damage to a random friendly character');
var explosive = new Secret('Explosive Secret', 'hunter', 'When your hero is attacked, deal 2 damage to all enemies', 'This might deal 2 damage to all friendly characters');
var freezing = new Secret('Freezing Secret', 'hunter', 'When an enemy minion attacks, return it to its owner\'s hand and it costs (2) more', 'That minion might be returned to your hand, costing 2 more');
var misdirection = new Secret('Misdirection', 'hunter', 'When a character attacks you hero, instead he attacks another random character', 'That attack might instead hit another random character');
var snake = new Secret('Snake Secret', 'hunter', 'When one of your minions is attacked, summon three 1/1 snakes', 'This might summon 3 1/1 snakes for your opponent');
var snipe = new Secret('Snipe', 'hunter', 'When your opponent plays a minion, deal 4 damage to it', 'That minion might be dealt 4 damage');
var counterspell = new Secret('Counterspell', 'mage', 'When your opponent casts a spell, Counter it', 'That spell might be Countered');
var duplicate = new Secret('Duplicate', 'mage', 'When a friendly minion dies, put 2 copies of it into your hand', 'Two copies of that minion might be put into your opponents hand');
var effigy = new Secret('Effigy', 'mage', 'When a friendly minion dies, summon a random minion with the same cost', 'A random minion with the same cost might be summoned for your opponent');
var iceBarrier = new Secret('Ice Barrier', 'mage', 'When your hero is attacked, gain 8 armor', 'This might give the opposing hero 8 armor');
var iceBlock = new Secret('Ice Block', 'mage', 'When your hero takes fatal damage, prevent it and become Immune this turn', 'That damage might be prevented and the opposing hero may become Immune for the turn');
var mirrorEntity = new Secret('Mirror Entity', 'mage', 'When your opponent plays a minion, summon a copy of it', 'A copy of that minion might be summoned for your opponent');
var spellbender = new Secret('Spellbender', 'mage', 'When an enemy casts a spell on a minion, summon a 1/3 as the new target', 'That spell might be instead targetted on a summoned enemy 1/3 Spellbender');
var vaporize = new Secret('Vaporize', 'mage', 'When a minion attacks your hero, destroy it', 'That minion might be destroyed');
var avenge = new Secret('Avenge', 'paladin', 'When one of your minions dies, give a random friendly minion +3/+2', 'That might give a random enemy minion +3/+2');
var competitiveSpirit = new Secret('Competitive Spirit', 'paladin', 'When your turn starts, give your minions +1/+1', 'That might give all enemy minions +1/+1');
var eyeForAnEye = new Secret('Eye for an Eye', 'paladin', 'When your hero takes damage, deal that much damage to the enemy hero', 'That might deal the same damage to you as well');
var nobleSacrifice = new Secret('Noble Sacrifice', 'paladin', 'When an enemy attacks, summon a 2/1 Defender as the new target', 'That attack might instead be targetted on a summoned enemy 2/1 Defender');
var redemption = new Secret('Redemption', 'paladin', 'When one of your minion dies, return it to life with 1 Health', 'That minion might be returned to life with 1 health');
var sacredTrial = new Secret('Sacred Trial', 'paladin', 'When your opponent has at least 3 minions and plays another, destroy it', 'That minion\'s health might be reduced to 1');
var repentance = new Secret('Repentance', 'paladin', 'When your opponent plays a minion, reduce its Health to 1', 'That minion\'s health might be reduced to 1');

var secrets = [bear, dart, explosive, freezing, misdirection, snake, snipe,
	counterspell, duplicate, effigy, iceBarrier, iceBlock, mirrorEntity, spellbender, vaporize,
	avenge, competitiveSpirit, eyeForAnEye, nobleSacrifice, redemption, sacredTrial, repentance];


class TriggeringAction {
	constructor(question, secretsTriggered) {
		this.question = question;
		this.secretsTriggered = secretsTriggered;
	}
}

var attackHero = new TriggeringAction('Have you attacked the opposing hero?', [bear, explosive, misdirection, iceBarrier, nobleSacrifice]);
var attackHeroWithMinion = new TriggeringAction('Have you attacked the opposing hero with a minion?', [bear, explosive, misdirection, iceBarrier, freezing, vaporize, nobleSacrifice]);
var damageHero = new TriggeringAction('Have you dealt damage to the opposing hero?', [eyeForAnEye]);
var fatallyDamageHero = new TriggeringAction('Have you dealt fatal damage to the opposing hero?', [iceBlock]);
var attackMinion = new TriggeringAction('Have you attacked an enemy minion?', [snake, nobleSacrifice]);
var killedMinion = new TriggeringAction('Have you killed an enemy minion?', [duplicate, effigy, avenge, redemption]);
var playedMinion = new TriggeringAction('Have you played a minion?', [snipe, mirrorEntity, repentance]);
var castSpell = new TriggeringAction('Have you cast a spell?', [counterspell]);
var castSpellOnMinion = new TriggeringAction('Have you cast a spell on a minion?', [counterspell, spellbender]);
var heroPower = new TriggeringAction('Have you used your Hero Power?', [dart]);
var turnStarted = new TriggeringAction('Has a turn started for the opposing hero?', [competitiveSpirit]);

var triggeringActions = [attackHero, attackHeroWithMinion, damageHero, fatallyDamageHero, attackMinion, killedMinion, playedMinion, castSpell, castSpellOnMinion, heroPower, turnStarted];

(function(){
	triggeringActions.forEach((action) => {
		action.secretsTriggered.forEach((secret) => secret.addTriggeredBy(action));
	});
})();


class SecretPossibility {
	constructor(trap) {
		this.secret = trap;
		this.activePossibility = true;
	}

	get triggeredBy() {
		return this.activePossibility ? this.secret.triggeredBy : [];
	}
}


class PlayedSecret {
	constructor(heroClass) {
		this.heroClass = heroClass;
		this.possibleSecrets = secrets.filter((secret) => secret.heroClass === this.heroClass).map((secret) => new SecretPossibility(secret));
		this.revealedSecret = null;
	}

	setSecretAsRevealed(possibleSecretIndex) {
		if (possibleSecretIndex < 0 || possibleSecretIndex >= this.possibleSecrets.length) {
			return;
		}

		this.possibleSecrets.forEach((possibleTrap) => possibleTrap.activePossibility = false);
		this.revealedSecret = this.possibleSecrets[possibleSecretIndex].secret;
	}

	setSecretAsImpossible(possibleSecretIndex) {
		if (possibleSecretIndex < 0 || possibleSecretIndex >= this.possibleSecrets.length) {
			return;
		}

		this.possibleSecrets[possibleSecretIndex].activePossibility = false;
	}

	setSecretsAsImpossible(secretsToReject) {
		this.possibleSecrets.forEach((possibleSecret) => {
			if (secretsToReject.includes(possibleSecret.secret)) {
				possibleSecret.activePossibility = false;
			}
		});
	}
}

class ConsequentialAction {
	constructor(action, possibleSecrets) {
		this.action = action;
		let filteredPossibleSecrets = possibleSecrets.filter((possibleSecret) => possibleSecret.activePossibility).map((possibleSecret) => possibleSecret.secret);
		this.concequences = _.intersection(this.action.secretsTriggered, filteredPossibleSecrets).map((secret) => secret.concequence);
	}
}

/*eslint-disable no-unused-vars*/
class AppState {
/*eslint-enable no-unused-vars*/
	constructor() {
		this.playedSecrets = [];
		this.consequentialActions = [];
	}

	addPlayedSecret(secretClass) {
		console.log('Adding ' + secretClass + ' secret');

		let newPlayedSecret = new PlayedSecret(secretClass);
		if (newPlayedSecret.possibleSecrets.length === 0) {
			return;
		}

		this.playedSecrets.push(newPlayedSecret);

		this.rebuildConsequentialActions();
		this.prettyPrint();
	}

	setSecretAsRevealed(playedSecretIndex, possibleSecretIndex) {
		if (playedSecretIndex < 0 || playedSecretIndex >= this.playedSecrets.length) {
			return;
		}

		this.playedSecrets[playedSecretIndex].setSecretAsRevealed(possibleSecretIndex);

		this.rebuildConsequentialActions();
		this.prettyPrint();
	}

	setSecretAsImpossible(playedSecretIndex, possibleSecretIndex) {
		if (playedSecretIndex < 0 || playedSecretIndex >= this.playedSecrets.length) {
			return;
		}

		this.playedSecrets[playedSecretIndex].setSecretAsImpossible(possibleSecretIndex);

		this.rebuildConsequentialActions();
		this.prettyPrint();
	}

	setConsequentialActionAsPerformed(consequentialActionIndex) {
		if (consequentialActionIndex < 0 || consequentialActionIndex >= this.consequentialActions.length) {
			return;
		}

		let secretsToSetAsImpossible = this.consequentialActions[consequentialActionIndex].action.secretsTriggered;
		this.playedSecrets.forEach((playedSecret) => playedSecret.setSecretsAsImpossible(secretsToSetAsImpossible));

		this.rebuildConsequentialActions();
		this.prettyPrint();
	}

	rebuildConsequentialActions() {
		let possibleSecrets = [];
		let activeConsequentialActions = [];

		this.playedSecrets.forEach((playedSecret) => {
			playedSecret.possibleSecrets
				.filter((possibleSecret) => possibleSecret.activePossibility)
				.forEach((possibleSecret) => {
					possibleSecrets = _.union(possibleSecrets, [possibleSecret]);
					activeConsequentialActions = _.union(activeConsequentialActions, possibleSecret.secret.triggeredBy);
				});
		});

		this.consequentialActions = activeConsequentialActions.map((action) => new ConsequentialAction(action, possibleSecrets));
	}

	//temp
	prettyPrint() {
		console.log('\nRevealed Secrets:');
		this.playedSecrets.filter((x) => x.revealedSecret !== null).forEach((x) => console.log(x.revealedSecret.name));

		console.log('\nUnrevealed Secrets:');
		this.playedSecrets.filter((x) => x.revealedSecret === null).forEach((x) => {
			console.log(x.heroClass);
			x.possibleSecrets.forEach((y) => {
				console.log('  ' + y.secret.name + ' (' + (y.activePossibility ? 'ACTIVE' : 'inactive') + ')');
			});
		});

		console.log('\nConsequential Actions:');
		this.consequentialActions.forEach((x) => {
			console.log(x.action.question);
			x.concequences.forEach((y) => {
				console.log('  ' + y);
			});
		});
	}

	//temp
	//todo - these should be constants, not strings
	testEmit(value) {
		PubSub.publish('testEvent', value);
	}
	testClear() {
		PubSub.publish('testClear');
	}
}
