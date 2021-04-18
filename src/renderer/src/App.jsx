function App(props) {
	const [state, setState] = React.useState(0);
	const [listenerOn, setListenerOn] = React.useState(false);

	if (!listenerOn) {
		setListenerOn(true);
		window.api.receive('fromMain', (data) => {
			setState(data);
		});
	}
	setTimeout(() => {
		window.api.send('toMain', state);
	}, 1000);

	return <div>{state}</div>;
}

// Add ReactApp to DOM
let domContainer = document.querySelector('#app');
ReactDOM.render(<App />, domContainer);
