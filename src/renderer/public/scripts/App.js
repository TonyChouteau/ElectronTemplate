var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function App(props) {
	var _React$useState = React.useState(0),
	    _React$useState2 = _slicedToArray(_React$useState, 2),
	    state = _React$useState2[0],
	    setState = _React$useState2[1];

	var _React$useState3 = React.useState(false),
	    _React$useState4 = _slicedToArray(_React$useState3, 2),
	    listenerOn = _React$useState4[0],
	    setListenerOn = _React$useState4[1];

	if (!listenerOn) {
		setListenerOn(true);
		window.api.receive('fromMain', function (data) {
			setState(data);
		});
	}
	setTimeout(function () {
		window.api.send('toMain', state);
	}, 1000);

	return React.createElement(
		'div',
		null,
		state
	);
}

// Add ReactApp to DOM
var domContainer = document.querySelector('#app');
ReactDOM.render(React.createElement(App, null), domContainer);