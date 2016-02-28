'use strict';

class Secret {
	constructor(name, heroClass, text, consequence) {
		this.name = name;
		this.heroClass = heroClass;
		this.text = text;
		this.consequence = consequence;
		this.triggeredBy = [];
	}

	addTriggeredBy(action) {
		if (!this.triggeredBy.includes(action)) {
			this.triggeredBy.push(action);
		}
	}

	get imageFileName() {
		return this.className + '.png';
	}

	get className() {
		return this.name.toLowerCase().replace(/ /g, '-');
	}
}

var bear = new Secret('Bear Trap', 'hunter', 'After your hero is attacked, summon a 3/3 Bear with Taunt.', 'A 3/3 boar with Taunt might be summoned for your opponent');
var dart = new Secret('Dart Trap', 'hunter', 'When an opposing Hero Power is used, deal 5 damage to a random enemy.', '5 damage might be dealt to a random friendly character');
var explosive = new Secret('Explosive Trap', 'hunter', 'When your hero is attacked, deal 2 damage to all enemies.', '2 damage might be dealt to all friendly characters');
var freezing = new Secret('Freezing Trap', 'hunter', 'When an enemy minion attacks, return it to its owner\'s hand and it costs (2) more.', 'That minion might be returned to your hand, costing 2 more');
var misdirection = new Secret('Misdirection', 'hunter', 'When a character attacks you hero, instead he attacks another random character.', 'That attack might target another random character');
var snake = new Secret('Snake Trap', 'hunter', 'When one of your minions is attacked, summon three 1/1 snakes.', 'Three 1/1 snakes might be summoned for your opponent');
var snipe = new Secret('Snipe', 'hunter', 'When your opponent plays a minion, deal 4 damage to it.', 'That minion might be dealt 4 damage');
var counterspell = new Secret('Counterspell', 'mage', 'When your opponent casts a spell, Counter it.', 'That spell might be Countered');
var duplicate = new Secret('Duplicate', 'mage', 'When a friendly minion dies, put 2 copies of it into your hand.', 'Two copies of that minion might be put into your opponents hand');
var effigy = new Secret('Effigy', 'mage', 'When a friendly minion dies, summon a random minion with the same cost.', 'A random minion with the same cost might be summoned for your opponent');
var iceBarrier = new Secret('Ice Barrier', 'mage', 'When your hero is attacked, gain 8 armor.', 'Your opponent might be given 8 armor');
var iceBlock = new Secret('Ice Block', 'mage', 'When your hero takes fatal damage, prevent it and become Immune this turn.', 'That damage might be prevented and your opponent may become Immune for the turn');
var mirrorEntity = new Secret('Mirror Entity', 'mage', 'When your opponent plays a minion, summon a copy of it.', 'A copy of that minion might be summoned for your opponent');
var spellbender = new Secret('Spellbender', 'mage', 'When an enemy casts a spell on a minion, summon a 1/3 as the new target.', 'That spell might be targeted on a 1/3 Spellbender');
var vaporize = new Secret('Vaporize', 'mage', 'When a minion attacks your hero, destroy it.', 'That minion might be destroyed');
var avenge = new Secret('Avenge', 'paladin', 'When one of your minions dies, give a random friendly minion +3/+2.', 'A random enemy minion might be given +3/+2');
var competitiveSpirit = new Secret('Competitive Spirit', 'paladin', 'When your turn starts, give your minions +1/+1.', 'All enemy minions might be given +1/+1');
var eyeForAnEye = new Secret('Eye for an Eye', 'paladin', 'When your hero takes damage, deal that much damage to the enemy hero.', 'The same damage might be dealt to you as well');
var nobleSacrifice = new Secret('Noble Sacrifice', 'paladin', 'When an enemy attacks, summon a 2/1 Defender as the new target.', 'That attack might be targeted on a 2/1 Defender');
var redemption = new Secret('Redemption', 'paladin', 'When one of your minion dies, return it to life with 1 Health.', 'That minion might be returned to life with 1 health');
var repentance = new Secret('Repentance', 'paladin', 'When your opponent plays a minion, reduce its Health to 1.', 'That minion\'s health might be reduced to 1');
var sacredTrial = new Secret('Sacred Trial', 'paladin', 'When your opponent has at least 3 minions and plays another, destroy it.', 'That minion might be destroyed');

var secrets = [bear, dart, explosive, freezing, misdirection, snake, snipe,
	counterspell, duplicate, effigy, iceBarrier, iceBlock, mirrorEntity, spellbender, vaporize,
	avenge, competitiveSpirit, eyeForAnEye, nobleSacrifice, redemption, repentance, sacredTrial];


class TriggeringAction {
	constructor(question, className, sortOrder, secretsTriggered) {
		this.question = question;
		this.className = className;
		this.sortOrder = sortOrder;
		this.secretsTriggered = secretsTriggered;
	}
}

var attackHero = new TriggeringAction('If you attack the opposing hero', 'attack-hero', 1, [bear, explosive, misdirection, iceBarrier, nobleSacrifice]);
var attackHeroWithMinion = new TriggeringAction('If you attack the opposing hero with a minion', 'attack-hero-with-minion', 2, [bear, explosive, misdirection, iceBarrier, freezing, vaporize, nobleSacrifice]);
var damageHero = new TriggeringAction('If you damage the opposing hero', 'damage-hero', 3, [eyeForAnEye]);
var fatallyDamageHero = new TriggeringAction('If you deal fatal damage to the opposing hero', 'fatally-damage-hero', 4, [iceBlock]);
var attackMinion = new TriggeringAction('If you attack an enemy minion', 'attack-minion', 5, [snake, nobleSacrifice]);
var killedMinion = new TriggeringAction('If you kill an enemy minion', 'kill-minion', 6, [duplicate, effigy, avenge, redemption]);
var playedMinion = new TriggeringAction('If you play a minion', 'play-minion', 7, [snipe, mirrorEntity, repentance]);
var castSpell = new TriggeringAction('If you cast a spell', 'cast-spell', 8, [counterspell]);
var castSpellOnMinion = new TriggeringAction('If you cast a spell on a minion', 'cast-spell-on-minion', 9, [counterspell, spellbender]);
var heroPower = new TriggeringAction('If you use your Hero Power', 'hero-power', 10, [dart]);
var turnStarted = new TriggeringAction('If you wait for a turn to start for your opponent', 'opponent-turn-start', 11, [competitiveSpirit]);

var triggeringActions = [attackHero, attackHeroWithMinion, damageHero, fatallyDamageHero, attackMinion, killedMinion, playedMinion, castSpell, castSpellOnMinion, heroPower, turnStarted];

(function(){
	triggeringActions.forEach((action) => {
		action.secretsTriggered.forEach((secret) => secret.addTriggeredBy(action));
	});
})();


class SecretPossibility {
	constructor(secret) {
		this.secret = secret;
		this.activePossibility = true;
	}

	get triggeredBy() {
		return this.activePossibility ? this.secret.triggeredBy : [];
	}
}

var unrevealedSecretId = 1;
class UnrevealedSecret {
	constructor(heroClass) {
		this.heroClass = heroClass;
		this.possibleSecrets = secrets.filter((secret) => secret.heroClass === this.heroClass).map((secret) => new SecretPossibility(secret));
		this.id = unrevealedSecretId++;
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

	containsPossibleSecret() {
		return this.possibleSecrets.filter((secret) => secret.activePossibility).length > 0;
	}
}

class ConsequentialAction {
	constructor(action, possibleSecrets) {
		this.action = action;
		let filteredPossibleSecrets = possibleSecrets.filter((possibleSecret) => possibleSecret.activePossibility).map((possibleSecret) => possibleSecret.secret);
		this.triggeringSecrets = _.intersection(this.action.secretsTriggered, filteredPossibleSecrets);
	}
}

/*eslint-disable no-unused-vars*/
class AppState {
/*eslint-enable no-unused-vars*/
	constructor() {
		this.revealedSecrets = [];
		this.unrevealedSecrets = [];
		this.consequentialActions = [];
	}

	addUnrevealedSecret(secretClass) {
		let unrevealedSecret = new UnrevealedSecret(secretClass);
		if (unrevealedSecret.possibleSecrets.length === 0) {
			return;
		}

		this.unrevealedSecrets.push(unrevealedSecret);

		this.rebuildConsequentialActions();

		PubSub.publish(events.UNREVEALED_SECRETS_UPDATED, this.unrevealedSecrets);
	}

	setSecretAsRevealed(unrevealedSecretIndex, possibleSecretIndex) {
		if (unrevealedSecretIndex < 0 || unrevealedSecretIndex >= this.unrevealedSecrets.length) {
			return;
		}

		var unrevealedSecretToReveal = this.unrevealedSecrets[unrevealedSecretIndex];
		if (possibleSecretIndex < 0 || possibleSecretIndex >= unrevealedSecretToReveal.possibleSecrets.length) {
			return;
		}

		var secret = unrevealedSecretToReveal.possibleSecrets[possibleSecretIndex].secret;

		this.revealedSecrets.push(secret);
		this.unrevealedSecrets.splice(unrevealedSecretIndex, 1);

		// Only one copy of a secret can be in play at any time, so clear this card out of other possibilities
		this.unrevealedSecrets.forEach((unrevealedSecret) => {
			unrevealedSecret.possibleSecrets.forEach((possibleSecret) => {
				if (possibleSecret.activePossibility && possibleSecret.secret === secret) {
					possibleSecret.activePossibility = false;
				}
			});
		});

		this.rebuildConsequentialActions();

		PubSub.publish(events.SECRET_REVEALED, secret);
		PubSub.publish(events.UNREVEALED_SECRETS_UPDATED, this.unrevealedSecrets);
	}

	setSecretAsImpossible(unrevealedSecretIndex, possibleSecretIndex) {
		if (unrevealedSecretIndex < 0 || unrevealedSecretIndex >= this.unrevealedSecrets.length) {
			return;
		}

		this.unrevealedSecrets[unrevealedSecretIndex].setSecretAsImpossible(possibleSecretIndex);

		this.rebuildConsequentialActions();

		PubSub.publish(events.UNREVEALED_SECRETS_UPDATED, this.unrevealedSecrets);
	}

	setConsequentialActionAsPerformed(consequentialActionIndex) {
		if (consequentialActionIndex < 0 || consequentialActionIndex >= this.consequentialActions.length) {
			return;
		}

		let secretsToSetAsImpossible = this.consequentialActions[consequentialActionIndex].action.secretsTriggered;
		this.unrevealedSecrets.forEach((playedSecret) => playedSecret.setSecretsAsImpossible(secretsToSetAsImpossible));

		this.rebuildConsequentialActions();

		PubSub.publish(events.UNREVEALED_SECRETS_UPDATED, this.unrevealedSecrets);
	}

	rebuildConsequentialActions() {
		let possibleSecrets = [];
		let activeConsequentialActions = [];

		this.unrevealedSecrets = this.unrevealedSecrets.filter((unrevealedSecrets) => unrevealedSecrets.containsPossibleSecret());

		this.unrevealedSecrets.forEach((playedSecret) => {
			playedSecret.possibleSecrets
				.filter((possibleSecret) => possibleSecret.activePossibility)
				.forEach((possibleSecret) => {
					possibleSecrets = _.union(possibleSecrets, [possibleSecret]);
					activeConsequentialActions = _.union(activeConsequentialActions, possibleSecret.secret.triggeredBy);
				});
		});

		this.consequentialActions = activeConsequentialActions.sort((a, b) => a.sortOrder - b.sortOrder).map((action) => new ConsequentialAction(action, possibleSecrets));

		PubSub.publish(events.CONSEQUENTIAL_ACTIONS_UPDATED, this.consequentialActions);
	}
}
