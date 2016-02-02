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

const UnrevealedSecretListComponent = props => (
	<div>
		<h1>Unrevealed Secrets</h1>
		<ul>
			{props.unrevealedSecrets.map(function(secret, index) {
				return <UnrevealedSecretComponent key={index} unrevealedSecret={secret}/>;
			})}
		</ul>
	</div>
);

const UnrevealedSecretComponent = props => (
	<div>
		<h2>{props.unrevealedSecret.heroClass}</h2>
		<ul>
			{props.unrevealedSecret.possibleSecrets.map(function(possibleSecret, index) {
				return <li key={index}>{possibleSecret.secret.name} ({possibleSecret.activePossibility ? "ACTIVE" : "inactive"})</li>;
			})}
		</ul>
	</div>
);

const ConsequentialActionListComponent = props => (
	<div>
		<h1>Consequential Actions</h1>
		<ul>
			{props.consequentialActions.map(function(consequentialAction) {
				return <ConsequentialActionComponent key={consequentialAction.action.question} consequentialAction={consequentialAction}/>;
			})}
		</ul>
	</div>
);

const ConsequentialActionComponent = props => (
	<div>
		<h2>{props.consequentialAction.action.question}</h2>
		<ul>
			{props.consequentialAction.consequences.map(function(consequence, index) {
				return <li key={index}>{consequence}</li>;
			})}
		</ul>
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
			<div>
				<RevealedSecretListComponent revealedSecrets={this.state.revealedSecrets}/>
				<UnrevealedSecretListComponent unrevealedSecrets={this.state.unrevealedSecrets}/>
				<ConsequentialActionListComponent consequentialActions={this.state.consequentialActions}/>
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

