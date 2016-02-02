'use strict';

/*eslint-disable no-unused-vars*/
class BaseComponent extends React.Component {
/*eslint-enable no-unused-vars*/
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
