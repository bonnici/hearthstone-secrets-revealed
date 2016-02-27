'use strict';

const UnrevealedSecretListComponent = props => (
	<div className="unrevealed-secrets">
		<React.addons.TransitionGroup component="div" className="ui segments">
			{props.unrevealedSecrets.map(function (secret, index) {
				return (
					<UnrevealedSecretComponent
						key={secret.id}
						unrevealedSecretIndex={index}
						unrevealedSecret={secret}
						setSecretAsRevealed={props.setSecretAsRevealed}
						setSecretAsImpossible={props.setSecretAsImpossible}
					/>
				);
			})}
			<div className="ui secondary center aligned segment">
				<button className="ui green button" onClick={props.addHunterSecret}>New Hunter Secret</button>
				<button className="ui pink button" onClick={props.addMageSecret}>New Mage Secret</button>
				<button className="ui yellow button" onClick={props.addPaladinSecret}>New Paladin Secret</button>
			</div>
		</React.addons.TransitionGroup>
	</div>
);

/*eslint-disable no-unused-vars*/
class UnrevealedSecretComponent extends React.Component {
/*eslint-enable no-unused-vars*/

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		$(ReactDOM.findDOMNode(this)).transition('slide down');
	}

	componentWillLeave(callback) {
		$(ReactDOM.findDOMNode(this)).transition({animation: 'fade', duration: '250ms', onComplete: callback });
	}

	render() {
		var props = this.props;
		return (
			<React.addons.TransitionGroup component="div" className="ui hidden center aligned unrevealed-secret segment">
				{props.unrevealedSecret.possibleSecrets.map(function(possibleSecret, index) {
					if (possibleSecret.activePossibility) {
						return (
							<UnrevealedSecretCard
								key={index}
								unrevealedSecretIndex={props.unrevealedSecretIndex}
								possibleSecretIndex={index}
								secret={possibleSecret.secret}
								setSecretAsRevealed={props.setSecretAsRevealed}
								setSecretAsImpossible={props.setSecretAsImpossible}
							/>
						);
					}
				})}
			</React.addons.TransitionGroup>
		);
	}
}

/*eslint-disable no-unused-vars*/
class UnrevealedSecretCard extends React.Component {
/*eslint-enable no-unused-vars*/

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		$(ReactDOM.findDOMNode(this)).find('img').popup({
				inline: true,
				hoverable: true,
				position: 'bottom center',
				delay: { hide: 100 }
			}).hide();

		$(ReactDOM.findDOMNode(this)).find('img').transition('horizontal flip');
	}

	componentWillLeave(callback) {
		$(ReactDOM.findDOMNode(this)).find('img').transition({animation: 'horizontal flip', duration: '250ms', onComplete: callback });
	}

	render() {
		return (
			<span>
				<img
					className="ui middle aligned hidden secret-card image"
					src={'/images/' + this.props.secret.imageFileName}
				/>
				<div className="ui special popup">
					<h2 className="ui header clicked-card-name">{this.props.secret.name}</h2>
					<p className="clicked-card-text">{this.props.secret.text}</p>

					<div className="ui labeled small buttons">
						<button className="ui basic green button" onClick={this.props.setSecretAsRevealed.bind(this, this.props.unrevealedSecretIndex, this.props.possibleSecretIndex)}>
							It was this
						</button>
						<button className="ui basic red button" onClick={this.props.setSecretAsImpossible.bind(this, this.props.unrevealedSecretIndex, this.props.possibleSecretIndex)}>
							It's not this
						</button>
					</div>
				</div>
			</span>
		);
	}
}

const ConsequentialActionListComponent = props => (
	<div className="consequential-action-list">
		<React.addons.TransitionGroup component="div" className="ui three stackable cards">
			{props.consequentialActions.map(function(consequentialAction, index) {
				return (
					<ConsequentialActionComponent
						key={consequentialAction.action.question}
						consequentialAction={consequentialAction}
						actionIndex={index}
						setConsequentialActionAsPerformed={props.setConsequentialActionAsPerformed}
					/>
				);
			})}
		</React.addons.TransitionGroup>
	</div>
);

/*eslint-disable no-unused-vars*/
class ConsequentialActionComponent extends React.Component {
/*eslint-enable no-unused-vars*/

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		$(ReactDOM.findDOMNode(this)).transition({animation: 'fade', duration: '750ms'});
		$('.consequential-action li').popup();
	}

	componentWillLeave(callback) {
		$(ReactDOM.findDOMNode(this)).transition({animation: 'fade', duration: '250ms', onComplete: callback });
	}

	render() {
		return (
			<div className="hidden fluid consequential-action card">
				<div className="content">
					<div className="header">
						{this.props.consequentialAction.action.question}&hellip;
					</div>
					<div className="description">
						<ul className="ui list">
							{this.props.consequentialAction.triggeringSecrets.map(function(triggeringSecret, index) {
								return <li key={index} data-content={triggeringSecret.name} data-variation="tiny" data-position="left center">{triggeringSecret.consequence}.</li>;
							})}
						</ul>
					</div>
				</div>
				<div className="extra content">
					<button className="fluid ui labeled icon basic green button" onClick={this.props.setConsequentialActionAsPerformed.bind(this, this.props.actionIndex)}>
						<i className="checkmark icon" />
						I did this and nothing happened
					</button>
				</div>
			</div>
		);
	}
}

/*eslint-disable no-unused-vars*/
class AppComponent extends React.Component {
/*eslint-enable no-unused-vars*/

	constructor(props) {
		super(props);
		this.subscriptions = [];

		this.state = { revealedSecrets: [], unrevealedSecrets: [], consequentialActions: [] };

		this.subscribe(events.SECRET_REVEALED, (e, data) => { this.handleSecretRevealed(e, data); });
		this.subscribe(events.UNREVEALED_SECRETS_UPDATED, (e, data) => { this.handleUnrevealedSecretsUpdated(e, data); });
		this.subscribe(events.CONSEQUENTIAL_ACTIONS_UPDATED, (e, data) => { this.handleConsequentialActionsUpdated(e, data); });
	}

	componentWillUnmount() {
		this.subscriptions.forEach((sub) => PubSub.unsubscribe(sub));
	}

	subscribe(eventName, handler) {
		this.subscriptions.push(PubSub.subscribe(eventName, handler));
	}

	render() {
		return (
			<div className="ui container">
				<h1 className="ui center aligned header">Hearthstone Secrets Revealed!</h1>
				<UnrevealedSecretListComponent
					unrevealedSecrets={this.state.unrevealedSecrets}
					setSecretAsRevealed={this.props.setSecretAsRevealed}
					setSecretAsImpossible={this.props.setSecretAsImpossible}
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

