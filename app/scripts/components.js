'use strict';

class BaseComponent extends React.Component {
	constructor(props) {
		super(props);
		this.subscriptions = [];
	}

	componentWillUnmount() {
		this.subscriptions.forEach((sub) => PubSub.unsubscribe(sub));
	}

	subscribe(eventName, handler) {
		this.subscriptions.push(PubSub.subscribe(eventName, handler));
	}
}
/*
const RevealedSecretListComponent = props => (
	<div>
		<h1>Revealed Secrets</h1>
		<ul>
			{props.revealedSecrets.map(function(secret, index) {
				return <RevealedSecretComponent key={index} secret={secret}/>;
			})}
		</ul>
	</div>
);

const RevealedSecretComponent = props => (
	<div>{props.secret.name} ({props.secret.heroClass}) - {props.secret.text}</div>
);
*/

const UnrevealedSecretListComponent = props => (
	<div>
		<h3 className="ui horizontal divider center aligned header">
			<div className="content">Possible secrets</div>
		</h3>
		<div className="ui segments">
			{props.unrevealedSecrets.map(function (secret, index) {
				return (
					<UnrevealedSecretComponent
						key={index}
						unrevealedSecretIndex={index}
						unrevealedSecret={secret}
						setSecretAsRevealed={props.setSecretAsRevealed}
						setSecretAsImpossible={props.setSecretAsImpossible}
						setSecretAsUnknown={props.setSecretAsUnknown}
						possibleSecretClicked={props.possibleSecretClicked}
					/>
				);
			})}
			<div className="ui secondary center aligned segment">
				<div className="ui buttons">
					<button className="ui green button" onClick={props.addHunterSecret}>New Hunter Secret</button>
					<button className="ui violet button" onClick={props.addMageSecret}>New Mage Secret</button>
					<button className="ui yellow button" onClick={props.addPaladinSecret}>New Paladin Secret</button>
				</div>
			</div>
		</div>
	</div>
);

const UnrevealedSecretComponent = props => (
	<div className="ui blurring center aligned segment unrevealed-secret">
		{props.unrevealedSecret.possibleSecrets.map(function(possibleSecret, index) {
			if (possibleSecret.activePossibility) {
				return (
					<img
						key={index}
						className="ui middle aligned secret-card image"
						src={'/images/' + possibleSecret.secret.imageFileName}
						onClick={props.possibleSecretClicked.bind(this, props.unrevealedSecretIndex, index, possibleSecret.secret.name, possibleSecret.secret.text)}
					/>);
			}
		})}
		<div className="ui inverted selected-secret-card dimmer">
			<h2 className="ui header clicked-card-name" />
			<p className="clicked-card-text" />

			<button className="ui positive labeled icon button" onClick={props.setSecretAsRevealed.bind(this, props.unrevealedSecretIndex)}>
				<i className="checkmark icon" />
				It was this
			</button>
			<button className="ui grey labeled icon button" onClick={props.setSecretAsUnknown.bind(this, props.unrevealedSecretIndex)}>
				<i className="help icon" />
				It might be this
			</button>
			<button className="ui negative labeled icon button" onClick={props.setSecretAsImpossible.bind(this, props.unrevealedSecretIndex)}>
				<i className="remove icon" />
				It's not this
			</button>
		</div>
	</div>
);

const ConsequentialActionListComponent = props => (
	<div>
		<h3 className="ui horizontal divider center aligned header">
			<div className="content">Triggering actions and possible effects</div>
		</h3>
		<div className="ui stackable grid">
			{props.consequentialActions.map(function(consequentialAction, index) {
				return (
					<div key={consequentialAction.action.question} className="eight wide column">
						<ConsequentialActionComponent
							consequentialAction={consequentialAction}
							actionIndex={index}
							setConsequentialActionAsPerformed={props.setConsequentialActionAsPerformed}
						/>
					</div>
				);
			})}
		</div>
	</div>
);

const ConsequentialActionComponent = props => (
	<div>
		<h4 className="ui top attached header">
			{props.consequentialAction.action.question}
		</h4>
		<div className="ui attached segment">
			<ul className="ui list">
				{props.consequentialAction.triggeringSecrets.map(function(triggeringSecret, index) {
					return <li key={index}>{triggeringSecret.consequence} ({triggeringSecret.name})</li>;
				})}
			</ul>

			<button className="fluid ui labeled icon button" onClick={props.setConsequentialActionAsPerformed.bind(this, props.actionIndex)}>
				<i className="checkmark icon" />
				I did this and nothing happened
			</button>
		</div>
	</div>
);

/*eslint-disable no-unused-vars*/
class AppComponent extends BaseComponent {
/*eslint-enable no-unused-vars*/

	constructor(props) {
		super(props);
		this.state = { revealedSecrets: [], unrevealedSecrets: [], consequentialActions: [] };

		this.subscribe(events.SECRET_REVEALED, (e, data) => { this.handleSecretRevealed(e, data); });
		this.subscribe(events.UNREVEALED_SECRETS_UPDATED, (e, data) => { this.handleUnrevealedSecretsUpdated(e, data); });
		this.subscribe(events.CONSEQUENTIAL_ACTIONS_UPDATED, (e, data) => { this.handleConsequentialActionsUpdated(e, data); });
	}

	render() {
		return (
			<div className="ui container">
				<h1 className="ui center aligned header">Hearthstone Secrets Revealed</h1>
				{/* <RevealedSecretListComponent revealedSecrets={this.state.revealedSecrets} /> */}
				<UnrevealedSecretListComponent
					unrevealedSecrets={this.state.unrevealedSecrets}
					setSecretAsRevealed={this.props.setSecretAsRevealed}
					setSecretAsImpossible={this.props.setSecretAsImpossible}
					setSecretAsUnknown={this.props.setSecretAsUnknown}
					possibleSecretClicked={this.props.possibleSecretClicked}
					addHunterSecret={this.props.addHunterSecret}
					addMageSecret={this.props.addMageSecret}
					addPaladinSecret={this.props.addPaladinSecret}
				/>
				<ConsequentialActionListComponent
					consequentialActions={this.state.consequentialActions}
					setConsequentialActionAsPerformed={this.props.setConsequentialActionAsPerformed}
				/>
			</div>
		);
	}

	handleSecretRevealed(e, secret) {
		this.state.revealedSecrets.push(secret);
		this.setState({ revealedSecrets: this.state.revealedSecrets });
	}

	handleUnrevealedSecretsUpdated(e, unrevealedSecrets) {
		this.setState({ unrevealedSecrets: unrevealedSecrets });
	}

	handleConsequentialActionsUpdated(e, consequentialActions) {
		this.setState({ consequentialActions: consequentialActions });
	}
}

