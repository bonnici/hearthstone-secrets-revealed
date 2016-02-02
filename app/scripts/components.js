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

/* Example of simple class (no state)
const AppComponent = props => (
	<div>Hello, {props.className}!</div>
);
*/

/* Event handling
class AppComponent extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = { stateTest: 'test' };

		//todo these should be constants, not strings
		this.subscribe('testEvent', (e, data) => { this.handleTestEvent(e, data); });
		this.subscribe('testClear', () => { this.handleClearEvent(); });
	}

	render() {
		return <div>Hello, {this.props.className}! {this.state.stateTest}</div>;
	}

	handleTestEvent(e, data) {
		console.log(e);
		console.log(data);
		this.setState({stateTest: this.state.stateTest + ' something new!' + data + '!!'});
	}

	handleClearEvent() {
		console.log('clearing test event handler');
		this.subscriptions.forEach((sub) => PubSub.unsubscribe(sub));
	}
}
*/

class RevealedSecretList extends BaseComponent {
	render() {
		return (
			<div>
				<h1>RevealedSecretList</h1>
				<ul>
					{this.props.revealedSecrets.map(function(secret, index) {
						return <RevealedSecret key={index} secret={secret}/>;
					})}
				</ul>
			</div>
		);
	}
}

class RevealedSecret extends BaseComponent {
	render() {
		return (
			<div>{this.props.secret.name} ({this.props.secret.heroClass}) - {this.props.secret.text}</div>
		);
	}
}

class UnrevealedSecretList extends BaseComponent {
	render() {
		return <div>UnrevealedSecretList</div>;
	}
}

class ConsequentialActionList extends BaseComponent {
	render() {
		return <div>ConsequentialActionList</div>;
	}
}

/*eslint-disable no-unused-vars*/
class AppComponent extends BaseComponent {
/*eslint-enable no-unused-vars*/

	constructor(props) {
		super(props);
		this.state = { revealedSecrets: [] };

		this.subscribe(events.SECRET_REVEALED, (e, data) => { this.handleSecretRevealed(e, data); });
	}

	render() {
		return (
			<div>
				<RevealedSecretList revealedSecrets={this.state.revealedSecrets}/>
				<UnrevealedSecretList />
				<ConsequentialActionList />
			</div>
		);
	}

	handleSecretRevealed(e, secret) {
		this.state.revealedSecrets.push(secret);
		this.setState({ revealedSecrets: this.state.revealedSecrets });
	}
}

