'use strict';

class Trap {
	constructor(name, heroClass, text, concequence) {
		this.name = name;
		this.heroClass = heroClass;
		this.text = text;
		this.concequence = concequence;
		this.triggeredBy = [];
	}

	addTriggeredBy(trap) {
		if (!this.triggeredBy.includes(trap)) {
			this.triggeredBy.push(trap);
		}
	}
}

var bear = new Trap('Bear Trap', 'hunter', 'After your hero is attacked, summon a 3/3 Bear with Taunt', 'This might summon a 3/3 boar for the opposing hero');
var dart = new Trap('Dart Trap', 'hunter', 'When an opposing Hero Power is used, deal 5 damage to a random enemy', 'This might deal 5 damage to a random friendly character');
var explosive = new Trap('Explosive Trap', 'hunter', 'When your hero is attacked, deal 2 damage to all enemies', 'This might deal 2 damage to all friendly characters');
var freezing = new Trap('Freezing Trap', 'hunter', 'When an enemy minion attacks, return it to its owner\'s hand and it costs (2) more', 'That minion might be returned to your hand, costing 2 more');
var misdirection = new Trap('Misdirection', 'hunter', 'When a character attacks you hero, instead he attacks another random character', 'That attack might instead hit another random character');
var snake = new Trap('Snake Trap', 'hunter', 'When one of your minions is attacked, summon three 1/1 snakes', 'This might summon 3 1/1 snakes for your opponent');
var snipe = new Trap('Snipe', 'hunter', 'When your opponent plays a minion, deal 4 damage to it', 'That minion might be dealt 4 damage');
var counterspell = new Trap('Counterspell', 'mage', 'When your opponent casts a spell, Counter it', 'That spell might be Countered');
var duplicate = new Trap('Duplicate', 'mage', 'When a friendly minion dies, put 2 copies of it into your hand', 'Two copies of that minion might be put into your opponents hand');
var effigy = new Trap('Effigy', 'mage', 'When a friendly minion dies, summon a random minion with the same cost', 'A random minion with the same cost might be summoned for your opponent');
var iceBarrier = new Trap('Ice Barrier', 'mage', 'When your hero is attacked, gain 8 armor', 'This might give the opposing hero 8 armor');
var iceBlock = new Trap('Ice Block', 'mage', 'When your hero takes fatal damage, prevent it and become Immune this turn', 'That damage might be prevented and the opposing hero may become Immune for the turn');
var mirrorEntity = new Trap('Mirror Entity', 'mage', 'When your opponent plays a minion, summon a copy of it', 'A copy of that minion might be summoned for your opponent');
var spellbender = new Trap('Spellbender', 'mage', 'When an enemy casts a spell on a minion, summon a 1/3 as the new target', 'That spell might be instead targetted on a summoned enemy 1/3 Spellbender');
var vaporize = new Trap('Vaporize', 'mage', 'When a minion attacks your hero, destroy it', 'That minion might be destroyed');
var avenge = new Trap('Avenge', 'paladin', 'When one of your minions dies, give a random friendly minion +3/+2', 'That might give a random enemy minion +3/+2');
var competitiveSpirit = new Trap('Competitive Spirit', 'paladin', 'When your turn starts, give your minions +1/+1', 'That might give all enemy minions +1/+1');
var eyeForAnEye = new Trap('Eye for an Eye', 'paladin', 'When your hero takes damage, deal that much damage to the enemy hero', 'That might deal the same damage to you as well');
var nobleSacrifice = new Trap('Noble Sacrifice', 'paladin', 'When an enemy attacks, summon a 2/1 Defender as the new target', 'That attack might instead be targetted on a summoned enemy 2/1 Defender');
var redemption = new Trap('Redemption', 'paladin', 'When one of your minion dies, return it to life with 1 Health', 'That minion might be returned to life with 1 health');
var sacredTrial = new Trap('Sacred Trial', 'paladin', 'When your opponent has at least 3 minions and plays another, destroy it', 'That minion\'s health might be reduced to 1');
var repentance = new Trap('Repentance', 'paladin', 'When your opponent plays a minion, reduce its Health to 1', 'That minion\'s health might be reduced to 1');

var traps = [bear, dart, explosive, freezing, misdirection, snake, snipe, counterspell, duplicate, effigy, iceBarrier, iceBlock, mirrorEntity, spellbender,
             vaporize, avenge, competitiveSpirit, eyeForAnEye, nobleSacrifice, redemption, sacredTrial, repentance];

class Effect {
	constructor(question, trapsTriggered) {
		this.question = question;
		this.trapsTriggered = trapsTriggered;
	}
}

var attackHero = new Effect('Have you attacked the opposing hero?', [bear, explosive, misdirection, iceBarrier, nobleSacrifice]);
var attackHeroWithMinion = new Effect('Have you attacked the opposing hero with a minion?', [bear, explosive, misdirection, iceBarrier, freezing, vaporize, nobleSacrifice]);
var damageHero = new Effect('Have you dealt damage to the opposing hero?', [eyeForAnEye]);
var fatallyDamageHero = new Effect('Have you dealt fatal damage to the opposing hero?', [iceBlock]);
var attackMinion = new Effect('Have you attacked an enemy minion?', [snake, nobleSacrifice]);
var killedMinion = new Effect('Have you killed an enemy minion?', [duplicate, effigy, avenge, redemption]);
var playedMinion = new Effect('Have you played a minion?', [snipe, mirrorEntity, repentance]);
var castSpell = new Effect('Have you cast a spell?', [counterspell]);
var castSpellOnMinion = new Effect('Have you cast a spell on a minion?', [counterspell, spellbender]);
var heroPower = new Effect('Have you used your Hero Power?', [dart]);
var turnStarted = new Effect('Has a turn started for the opposing hero?', [competitiveSpirit]);

var effects = [attackHero, attackHeroWithMinion, damageHero, fatallyDamageHero, attackMinion, killedMinion, playedMinion, castSpell, castSpellOnMinion, heroPower, turnStarted];

(function(){
	effects.forEach((effect) => {
		effect.trapsTriggered.forEach((trap) => trap.addTriggeredBy(effect));
	});
})();

//console.log(traps);
//console.log(effects);

class PossibleTrap {
	constructor(trap) {
		this.trap = trap;
		this.activePossibility = true;
	}

	get triggeredBy() {
		return this.activePossibility ? this.trap.triggeredBy : [];
	}
}

class MysteryTrap {
	constructor(heroClass) {
		this.heroClass = heroClass;
		this.possibleTraps = traps.filter((trap) => trap.heroClass === this.heroClass).map((trap) => new PossibleTrap(trap));
		this.actualTrap = null;
	}

	/*
	get possibleTriggers() {
		//let possibleTriggers = [];
		let possibleTriggers = new Set();
		this.possibleTraps.forEach((possibleTrap) => {
			//possibleTriggers = _.union(possibleTriggers, possibleTrap.triggeredBy);
			possibleTrap.triggeredBy.forEach((event) => possibleTriggers.add(event));
		});
		return possibleTriggers.keys();
	}
	*/

	confirmPossibleTrap(possibleTrapIndex) {
		if (possibleTrapIndex < 0 || possibleTrapIndex >= this.possibleTraps.length) return;

		this.possibleTraps.forEach((possibleTrap) => possibleTrap.activePossibility = false);
		this.actualTrap = this.possibleTraps[possibleTrapIndex].trap;
	}

	rejectPossibleTrap(possibleTrapIndex) {
		if (possibleTrapIndex < 0 || possibleTrapIndex >= this.possibleTraps.length) return;
		this.possibleTraps[possibleTrapIndex].activePossibility = false;
	}

	rejectTraps(trapsToReject) {
		this.possibleTraps.forEach((possibleTrap) => {
			if (trapsToReject.includes(possibleTrap.trap)) {
				possibleTrap.activePossibility = false;
			}
		});
	}
}

class TriggeringEffect {
	constructor(effect, possibleTraps) {
		this.effect = effect;
		let filteredPossibleTraps = possibleTraps.filter((possibleTrap) => possibleTrap.activePossibility).map((possibleTrap) => possibleTrap.trap);
		this.concequences = _.intersection(this.effect.trapsTriggered, filteredPossibleTraps).map((trap) => trap.concequence);
	}
}

class AppState {
	constructor() {
		this.mysteryTraps = [];
		this.triggeringEffects = [];
	}

	addTrap(trapClass) {
		console.log('Adding ' + trapClass + ' trap');

		let newMysteryTrap = new MysteryTrap(trapClass);
		if (newMysteryTrap.possibleTraps.length === 0) return;

		this.mysteryTraps.push(newMysteryTrap);
		//console.log('mysteryTraps', this.mysteryTraps);

		this.calculateTriggeringEffects();
		this.prettyPrint();
	}

	confirmPossibility(mysteryTrapIndex, possibleTrapIndex) {
		if (mysteryTrapIndex < 0 || mysteryTrapIndex >= this.mysteryTraps.length) return;

		this.mysteryTraps[mysteryTrapIndex].confirmPossibleTrap(possibleTrapIndex);

		this.calculateTriggeringEffects();
		this.prettyPrint();
	}

	rejectPossibility(mysteryTrapIndex, possibleTrapIndex) {
		if (mysteryTrapIndex < 0 || mysteryTrapIndex >= this.mysteryTraps.length) return;

		this.mysteryTraps[mysteryTrapIndex].rejectPossibleTrap(possibleTrapIndex);

		this.calculateTriggeringEffects();
		this.prettyPrint();
	}

	confirmTriggeringEffect(triggeringEffectIndex) {
		if (triggeringEffectIndex < 0 || triggeringEffectIndex >= this.triggeringEffects.length) return;

		let trapsToReject = this.triggeringEffects[triggeringEffectIndex].effect.trapsTriggered;
		this.mysteryTraps.forEach((mysteryTrap) => mysteryTrap.rejectTraps(trapsToReject));

		this.calculateTriggeringEffects();
		this.prettyPrint();
	}

	calculateTriggeringEffects() {
		let possibleTraps = [];
		let activeEffects = [];

		this.mysteryTraps.forEach((mysteryTrap) => {
			mysteryTrap.possibleTraps
				.filter((possibleTrap) => possibleTrap.activePossibility)
				.forEach((possibleTrap) => {
					possibleTraps = _.union(possibleTraps, [possibleTrap]);
					activeEffects = _.union(activeEffects, possibleTrap.trap.triggeredBy);
				});
		});

		this.triggeringEffects = activeEffects.map((effect) => new TriggeringEffect(effect, possibleTraps));
		//console.log("triggeringEffects", this.triggeringEffects);
	}

	//temp
	prettyPrint() {
		console.log('\nConfirmed mystery traps:');
		this.mysteryTraps.filter((x) => x.actualTrap !== null).forEach((x) => console.log(x.actualTrap.name));

		console.log('\nActive mystery traps:');
		this.mysteryTraps.filter((x) => x.actualTrap === null).forEach((x) => {
			console.log(x.heroClass);
			x.possibleTraps.forEach((y) => {
				console.log('  ' + y.trap.name + ' (' + (y.activePossibility ? 'ACTIVE' : 'inactive') + ')');
			});
		});

		console.log('\nTriggering effects:');
		this.triggeringEffects.forEach((x) => {
			console.log(x.effect.question);
			x.concequences.forEach((y) => {
				console.log('  ' + y);
			});
		});
	}
}

var appState = new AppState();
appState.addTrap('hunter');
