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
		return <div>RevealedSecretList</div>;
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
	}

	render() {
		return (
			<div>
				<RevealedSecretList />
				<UnrevealedSecretList />
				<ConsequentialActionList />
			</div>
		);
	}
}

