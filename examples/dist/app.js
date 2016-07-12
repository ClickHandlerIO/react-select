require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* eslint react/prop-types: 0 */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _componentsContributors = require('./components/Contributors');

var _componentsContributors2 = _interopRequireDefault(_componentsContributors);

var _componentsGithubUsers = require('./components/GithubUsers');

var _componentsGithubUsers2 = _interopRequireDefault(_componentsGithubUsers);

var _componentsCustomComponents = require('./components/CustomComponents');

var _componentsCustomComponents2 = _interopRequireDefault(_componentsCustomComponents);

var _componentsCustomRender = require('./components/CustomRender');

var _componentsCustomRender2 = _interopRequireDefault(_componentsCustomRender);

var _componentsMultiselect = require('./components/Multiselect');

var _componentsMultiselect2 = _interopRequireDefault(_componentsMultiselect);

var _componentsNumericSelect = require('./components/NumericSelect');

var _componentsNumericSelect2 = _interopRequireDefault(_componentsNumericSelect);

var _componentsVirtualized = require('./components/Virtualized');

var _componentsVirtualized2 = _interopRequireDefault(_componentsVirtualized);

var _componentsStates = require('./components/States');

var _componentsStates2 = _interopRequireDefault(_componentsStates);

_reactDom2['default'].render(_react2['default'].createElement(
	'div',
	null,
	_react2['default'].createElement(_componentsStates2['default'], { label: 'States', searchable: true }),
	_react2['default'].createElement(_componentsMultiselect2['default'], { label: 'Multiselect' }),
	_react2['default'].createElement(_componentsVirtualized2['default'], { label: 'Virtualized' }),
	_react2['default'].createElement(_componentsContributors2['default'], { label: 'Contributors (Async)' }),
	_react2['default'].createElement(_componentsGithubUsers2['default'], { label: 'Github users (Async with fetch.js)' }),
	_react2['default'].createElement(_componentsNumericSelect2['default'], { label: 'Numeric Values' }),
	_react2['default'].createElement(_componentsCustomRender2['default'], { label: 'Custom Render Methods' }),
	_react2['default'].createElement(_componentsCustomComponents2['default'], { label: 'Custom Placeholder, Option and Value Components' })
), document.getElementById('example'));
/*
<SelectedValuesField label="Option Creation (tags mode)" options={FLAVOURS} allowCreate hint="Enter a value that's NOT in the list, then hit return" />
*/

},{"./components/Contributors":2,"./components/CustomComponents":3,"./components/CustomRender":4,"./components/GithubUsers":5,"./components/Multiselect":6,"./components/NumericSelect":7,"./components/States":8,"./components/Virtualized":9,"react":undefined,"react-dom":undefined,"react-select":undefined}],2:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var CONTRIBUTORS = require('../data/contributors');
var MAX_CONTRIBUTORS = 6;
var ASYNC_DELAY = 500;

var Contributors = _react2['default'].createClass({
	displayName: 'Contributors',
	propTypes: {
		label: _react2['default'].PropTypes.string
	},
	getInitialState: function getInitialState() {
		return {
			multi: true,
			value: [CONTRIBUTORS[0]]
		};
	},
	onChange: function onChange(value) {
		this.setState({
			value: value
		});
	},
	switchToMulti: function switchToMulti() {
		this.setState({
			multi: true,
			value: [this.state.value]
		});
	},
	switchToSingle: function switchToSingle() {
		this.setState({
			multi: false,
			value: this.state.value[0]
		});
	},
	getContributors: function getContributors(input, callback) {
		input = input.toLowerCase();
		var options = CONTRIBUTORS.filter(function (i) {
			return i.github.substr(0, input.length) === input;
		});
		var data = {
			options: options.slice(0, MAX_CONTRIBUTORS),
			complete: options.length <= MAX_CONTRIBUTORS
		};
		setTimeout(function () {
			callback(null, data);
		}, ASYNC_DELAY);
	},
	gotoContributor: function gotoContributor(value, event) {
		window.open('https://github.com/' + value.github);
	},
	render: function render() {
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'].Async, { multi: this.state.multi, value: this.state.value, onChange: this.onChange, onValueClick: this.gotoContributor, valueKey: 'github', labelKey: 'name', loadOptions: this.getContributors }),
			_react2['default'].createElement(
				'div',
				{ className: 'checkbox-list' },
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'radio', className: 'checkbox-control', checked: this.state.multi, onChange: this.switchToMulti }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Multiselect'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'radio', className: 'checkbox-control', checked: !this.state.multi, onChange: this.switchToSingle }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Single Value'
					)
				)
			),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'This example implements custom label and value properties, async options and opens the github profiles in a new window when values are clicked'
			)
		);
	}
});

module.exports = Contributors;

},{"../data/contributors":11,"react":undefined,"react-select":undefined}],3:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactGravatar = require('react-gravatar');

var _reactGravatar2 = _interopRequireDefault(_reactGravatar);

var USERS = require('../data/users');
var GRAVATAR_SIZE = 15;

var GravatarOption = _react2['default'].createClass({
	displayName: 'GravatarOption',

	propTypes: {
		children: _react2['default'].PropTypes.node,
		className: _react2['default'].PropTypes.string,
		isDisabled: _react2['default'].PropTypes.bool,
		isFocused: _react2['default'].PropTypes.bool,
		isSelected: _react2['default'].PropTypes.bool,
		onFocus: _react2['default'].PropTypes.func,
		onSelect: _react2['default'].PropTypes.func,
		option: _react2['default'].PropTypes.object.isRequired
	},
	handleMouseDown: function handleMouseDown(event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onSelect(this.props.option, event);
	},
	handleMouseEnter: function handleMouseEnter(event) {
		this.props.onFocus(this.props.option, event);
	},
	handleMouseMove: function handleMouseMove(event) {
		if (this.props.isFocused) return;
		this.props.onFocus(this.props.option, event);
	},
	render: function render() {
		var gravatarStyle = {
			borderRadius: 3,
			display: 'inline-block',
			marginRight: 10,
			position: 'relative',
			top: -2,
			verticalAlign: 'middle'
		};
		return _react2['default'].createElement(
			'div',
			{ className: this.props.className,
				onMouseDown: this.handleMouseDown,
				onMouseEnter: this.handleMouseEnter,
				onMouseMove: this.handleMouseMove,
				title: this.props.option.title },
			_react2['default'].createElement(_reactGravatar2['default'], { email: this.props.option.email, size: GRAVATAR_SIZE, style: gravatarStyle }),
			this.props.children
		);
	}
});

var GravatarValue = _react2['default'].createClass({
	displayName: 'GravatarValue',

	propTypes: {
		children: _react2['default'].PropTypes.node,
		placeholder: _react2['default'].PropTypes.string,
		value: _react2['default'].PropTypes.object
	},
	render: function render() {
		var gravatarStyle = {
			borderRadius: 3,
			display: 'inline-block',
			marginRight: 10,
			position: 'relative',
			top: -2,
			verticalAlign: 'middle'
		};
		return _react2['default'].createElement(
			'div',
			{ className: 'Select-value', title: this.props.value.title },
			_react2['default'].createElement(
				'span',
				{ className: 'Select-value-label' },
				_react2['default'].createElement(_reactGravatar2['default'], { email: this.props.value.email, size: GRAVATAR_SIZE, style: gravatarStyle }),
				this.props.children
			)
		);
	}
});

var UsersField = _react2['default'].createClass({
	displayName: 'UsersField',

	propTypes: {
		hint: _react2['default'].PropTypes.string,
		label: _react2['default'].PropTypes.string
	},
	getInitialState: function getInitialState() {
		return {};
	},
	setValue: function setValue(value) {
		this.setState({ value: value });
	},
	render: function render() {
		var placeholder = _react2['default'].createElement(
			'span',
			null,
			'☺ Select User'
		);

		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], {
				onChange: this.setValue,
				optionComponent: GravatarOption,
				options: USERS,
				placeholder: placeholder,
				value: this.state.value,
				valueComponent: GravatarValue
			}),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'This example implements custom Option and Value components to render a Gravatar image for each user based on their email. It also demonstrates rendering HTML elements as the placeholder.'
			)
		);
	}
});

module.exports = UsersField;

},{"../data/users":13,"react":undefined,"react-gravatar":29,"react-select":undefined}],4:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var DisabledUpsellOptions = _react2['default'].createClass({
	displayName: 'DisabledUpsellOptions',
	propTypes: {
		label: _react2['default'].PropTypes.string
	},
	getInitialState: function getInitialState() {
		return {};
	},
	setValue: function setValue(value) {
		this.setState({ value: value });
		console.log('Support level selected:', value.label);
	},
	renderLink: function renderLink() {
		return _react2['default'].createElement(
			'a',
			{ style: { marginLeft: 5 }, href: '/upgrade', target: '_blank' },
			'Upgrade here!'
		);
	},
	renderOption: function renderOption(option) {
		return _react2['default'].createElement(
			'span',
			{ style: { color: option.color } },
			option.label,
			' ',
			option.link
		);
	},
	renderValue: function renderValue(option) {
		return _react2['default'].createElement(
			'strong',
			{ style: { color: option.color } },
			option.label
		);
	},
	render: function render() {
		var options = [{ label: 'Basic customer support', value: 'basic', color: '#E31864' }, { label: 'Premium customer support', value: 'premium', color: '#6216A3' }, { label: 'Pro customer support', value: 'pro', disabled: true, link: this.renderLink() }];
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], {
				placeholder: 'Select your support level',
				options: options,
				optionRenderer: this.renderOption,
				onChange: this.setValue,
				value: this.state.value,
				valueRenderer: this.renderValue
			}),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'This demonstates custom render methods and links in disabled options'
			)
		);
	}
});
module.exports = DisabledUpsellOptions;

},{"react":undefined,"react-select":undefined}],5:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var GithubUsers = _react2['default'].createClass({
	displayName: 'GithubUsers',
	propTypes: {
		label: _react2['default'].PropTypes.string
	},
	getInitialState: function getInitialState() {
		return {
			multi: true
		};
	},
	onChange: function onChange(value) {
		this.setState({
			value: value
		});
	},
	switchToMulti: function switchToMulti() {
		this.setState({
			multi: true,
			value: [this.state.value]
		});
	},
	switchToSingle: function switchToSingle() {
		this.setState({
			multi: false,
			value: this.state.value ? this.state.value[0] : null
		});
	},
	getUsers: function getUsers(input) {
		return (0, _isomorphicFetch2['default'])('https://api.github.com/search/users?q=' + input).then(function (response) {
			return response.json();
		}).then(function (json) {
			return { options: json.items };
		});
	},
	gotoUser: function gotoUser(value, event) {
		window.open(value.html_url);
	},
	render: function render() {
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'].Async, { multi: this.state.multi, value: this.state.value, onChange: this.onChange, onValueClick: this.gotoUser, valueKey: 'id', labelKey: 'login', loadOptions: this.getUsers, minimumInput: 1, backspaceRemoves: false }),
			_react2['default'].createElement(
				'div',
				{ className: 'checkbox-list' },
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'radio', className: 'checkbox-control', checked: this.state.multi, onChange: this.switchToMulti }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Multiselect'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'radio', className: 'checkbox-control', checked: !this.state.multi, onChange: this.switchToSingle }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Single Value'
					)
				)
			),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'This example uses fetch.js for showing Async options with Promises'
			)
		);
	}
});

module.exports = GithubUsers;

},{"isomorphic-fetch":21,"react":undefined,"react-select":undefined}],6:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var FLAVOURS = [{ label: 'Chocolate', value: 'chocolate' }, { label: 'Vanilla', value: 'vanilla' }, { label: 'Strawberry', value: 'strawberry' }, { label: 'Caramel', value: 'caramel' }, { label: 'Cookies and Cream', value: 'cookiescream' }, { label: 'Peppermint', value: 'peppermint' }];

var WHY_WOULD_YOU = [{ label: 'Chocolate (are you crazy?)', value: 'chocolate', disabled: true }].concat(FLAVOURS.slice(1));

var MultiSelectField = _react2['default'].createClass({
	displayName: 'MultiSelectField',
	propTypes: {
		label: _react2['default'].PropTypes.string
	},
	getInitialState: function getInitialState() {
		return {
			disabled: false,
			crazy: false,
			options: FLAVOURS,
			value: []
		};
	},
	handleSelectChange: function handleSelectChange(value) {
		console.log('You\'ve selected:', value);
		this.setState({ value: value });
	},
	toggleDisabled: function toggleDisabled(e) {
		this.setState({ disabled: e.target.checked });
	},
	toggleChocolate: function toggleChocolate(e) {
		var crazy = e.target.checked;
		this.setState({
			crazy: crazy,
			options: crazy ? WHY_WOULD_YOU : FLAVOURS
		});
	},
	render: function render() {
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], { multi: true, simpleValue: true, disabled: this.state.disabled, value: this.state.value, placeholder: 'Select your favourite(s)', options: this.state.options, onChange: this.handleSelectChange }),
			_react2['default'].createElement(
				'div',
				{ className: 'checkbox-list' },
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.disabled, onChange: this.toggleDisabled }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Disable the control'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.crazy, onChange: this.toggleChocolate }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'I don\'t like Chocolate (disabled the option)'
					)
				)
			)
		);
	}
});

module.exports = MultiSelectField;

},{"react":undefined,"react-select":undefined}],7:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var ValuesAsNumbersField = _react2['default'].createClass({
	displayName: 'ValuesAsNumbersField',
	propTypes: {
		label: _react2['default'].PropTypes.string
	},
	getInitialState: function getInitialState() {
		return {
			options: [{ value: 10, label: 'Ten' }, { value: 11, label: 'Eleven' }, { value: 12, label: 'Twelve' }, { value: 23, label: 'Twenty-three' }, { value: 24, label: 'Twenty-four' }],
			matchPos: 'any',
			matchValue: true,
			matchLabel: true,
			value: null,
			multi: false
		};
	},
	onChangeMatchStart: function onChangeMatchStart(event) {
		this.setState({
			matchPos: event.target.checked ? 'start' : 'any'
		});
	},
	onChangeMatchValue: function onChangeMatchValue(event) {
		this.setState({
			matchValue: event.target.checked
		});
	},
	onChangeMatchLabel: function onChangeMatchLabel(event) {
		this.setState({
			matchLabel: event.target.checked
		});
	},
	onChange: function onChange(value) {
		this.setState({ value: value });
		console.log('Numeric Select value changed to', value);
	},
	onChangeMulti: function onChangeMulti(event) {
		this.setState({
			multi: event.target.checked
		});
	},
	render: function render() {
		var matchProp = 'any';
		if (this.state.matchLabel && !this.state.matchValue) {
			matchProp = 'label';
		}
		if (!this.state.matchLabel && this.state.matchValue) {
			matchProp = 'value';
		}
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], {
				matchPos: this.state.matchPos,
				matchProp: matchProp,
				multi: this.state.multi,
				onChange: this.onChange,
				options: this.state.options,
				simpleValue: true,
				value: this.state.value
			}),
			_react2['default'].createElement(
				'div',
				{ className: 'checkbox-list' },
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.multi, onChange: this.onChangeMulti }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Multi-Select'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.matchValue, onChange: this.onChangeMatchValue }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Match value'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.matchLabel, onChange: this.onChangeMatchLabel }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Match label'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.matchPos === 'start', onChange: this.onChangeMatchStart }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Only include matches from the start of the string'
					)
				)
			),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'This example uses simple numeric values'
			)
		);
	}
});

module.exports = ValuesAsNumbersField;

},{"react":undefined,"react-select":undefined}],8:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var STATES = require('../data/states');

var StatesField = _react2['default'].createClass({
	displayName: 'StatesField',
	propTypes: {
		label: _react2['default'].PropTypes.string,
		searchable: _react2['default'].PropTypes.bool
	},
	getDefaultProps: function getDefaultProps() {
		return {
			label: 'States:',
			searchable: true
		};
	},
	getInitialState: function getInitialState() {
		return {
			country: 'AU',
			disabled: false,
			searchable: this.props.searchable,
			selectValue: 'new-south-wales',
			clearable: true
		};
	},
	switchCountry: function switchCountry(e) {
		var newCountry = e.target.value;
		console.log('Country changed to ' + newCountry);
		this.setState({
			country: newCountry,
			selectValue: null
		});
	},
	updateValue: function updateValue(newValue) {
		console.log('State changed to ' + newValue);
		this.setState({
			selectValue: newValue
		});
	},
	focusStateSelect: function focusStateSelect() {
		this.refs.stateSelect.focus();
	},
	toggleCheckbox: function toggleCheckbox(e) {
		var newState = {};
		newState[e.target.name] = e.target.checked;
		this.setState(newState);
	},
	render: function render() {
		var options = STATES[this.state.country];
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], { ref: 'stateSelect', autofocus: true, options: options, simpleValue: true, clearable: this.state.clearable, name: 'selected-state', disabled: this.state.disabled, value: this.state.selectValue, onChange: this.updateValue, searchable: this.state.searchable }),
			_react2['default'].createElement(
				'div',
				{ style: { marginTop: 14 } },
				_react2['default'].createElement(
					'button',
					{ type: 'button', onClick: this.focusStateSelect },
					'Focus Select'
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox', style: { marginLeft: 10 } },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', name: 'searchable', checked: this.state.searchable, onChange: this.toggleCheckbox }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Searchable'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox', style: { marginLeft: 10 } },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', name: 'disabled', checked: this.state.disabled, onChange: this.toggleCheckbox }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Disabled'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox', style: { marginLeft: 10 } },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', name: 'clearable', checked: this.state.clearable, onChange: this.toggleCheckbox }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Clearable'
					)
				)
			),
			_react2['default'].createElement(
				'div',
				{ className: 'checkbox-list' },
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'radio', className: 'checkbox-control', checked: this.state.country === 'AU', value: 'AU', onChange: this.switchCountry }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Australia'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'radio', className: 'checkbox-control', checked: this.state.country === 'US', value: 'US', onChange: this.switchCountry }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'United States'
					)
				)
			)
		);
	}
});

module.exports = StatesField;

},{"../data/states":12,"react":undefined,"react-select":undefined}],9:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactVirtualizedSelect = require('react-virtualized-select');

var _reactVirtualizedSelect2 = _interopRequireDefault(_reactVirtualizedSelect);

var DATA = require('../data/cities');

var CitiesField = _react2['default'].createClass({
	displayName: 'CitiesField',
	getInitialState: function getInitialState() {
		return {};
	},
	updateValue: function updateValue(newValue) {
		this.setState({
			selectValue: newValue
		});
	},
	render: function render() {
		var options = DATA.CITIES;
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				'Cities (Large Dataset)'
			),
			_react2['default'].createElement(_reactVirtualizedSelect2['default'], { ref: 'citySelect',
				options: options,
				simpleValue: true,
				clearable: true,
				name: 'select-city',
				value: this.state.selectValue,
				onChange: this.updateValue,
				searchable: true,
				labelKey: 'name',
				valueKey: 'name'
			}),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'Uses ',
				_react2['default'].createElement(
					'a',
					{ href: 'https://github.com/bvaughn/react-virtualized' },
					'react-virtualized'
				),
				' and ',
				_react2['default'].createElement(
					'a',
					{ href: 'https://github.com/bvaughn/react-virtualized-select/' },
					'react-virtualized-select'
				),
				' to display a list of the world\'s 1,000 largest cities.'
			)
		);
	}
});

module.exports = CitiesField;

},{"../data/cities":10,"react":undefined,"react-virtualized-select":32}],10:[function(require,module,exports){
'use strict';

exports.CITIES = [{ name: 'Abilene' }, { name: 'Addison' }, { name: 'Akron' }, { name: 'Alameda' }, { name: 'Albany' }, { name: 'Albany' }, { name: 'Albany' }, { name: 'Albuquerque' }, { name: 'Alexandria' }, { name: 'Alexandria' }, { name: 'Alhambra' }, { name: 'Aliso Viejo' }, { name: 'Allen' }, { name: 'Allentown' }, { name: 'Alpharetta' }, { name: 'Altamonte Springs' }, { name: 'Altoona' }, { name: 'Amarillo' }, { name: 'Ames' }, { name: 'Anaheim' }, { name: 'Anchorage' }, { name: 'Anderson' }, { name: 'Ankeny' }, { name: 'Ann Arbor' }, { name: 'Annapolis' }, { name: 'Antioch' }, { name: 'Apache Junction' }, { name: 'Apex' }, { name: 'Apopka' }, { name: 'Apple Valley' }, { name: 'Apple Valley' }, { name: 'Appleton' }, { name: 'Arcadia' }, { name: 'Arlington' }, { name: 'Arlington Heights' }, { name: 'Arvada' }, { name: 'Asheville' }, { name: 'Athens-Clarke County' }, { name: 'Atlanta' }, { name: 'Atlantic City' }, { name: 'Attleboro' }, { name: 'Auburn' }, { name: 'Auburn' }, { name: 'Augusta-Richmond County' }, { name: 'Aurora' }, { name: 'Aurora' }, { name: 'Austin' }, { name: 'Aventura' }, { name: 'Avondale' }, { name: 'Azusa' }, { name: 'Bakersfield' }, { name: 'Baldwin Park' }, { name: 'Baltimore' }, { name: 'Barnstable Town' }, { name: 'Bartlett' }, { name: 'Bartlett' }, { name: 'Baton Rouge' }, { name: 'Battle Creek' }, { name: 'Bayonne' }, { name: 'Baytown' }, { name: 'Beaumont' }, { name: 'Beaumont' }, { name: 'Beavercreek' }, { name: 'Beaverton' }, { name: 'Bedford' }, { name: 'Bell Gardens' }, { name: 'Belleville' }, { name: 'Bellevue' }, { name: 'Bellevue' }, { name: 'Bellflower' }, { name: 'Bellingham' }, { name: 'Beloit' }, { name: 'Bend' }, { name: 'Bentonville' }, { name: 'Berkeley' }, { name: 'Berwyn' }, { name: 'Bethlehem' }, { name: 'Beverly' }, { name: 'Billings' }, { name: 'Biloxi' }, { name: 'Binghamton' }, { name: 'Birmingham' }, { name: 'Bismarck' }, { name: 'Blacksburg' }, { name: 'Blaine' }, { name: 'Bloomington' }, { name: 'Bloomington' }, { name: 'Bloomington' }, { name: 'Blue Springs' }, { name: 'Boca Raton' }, { name: 'Boise City' }, { name: 'Bolingbrook' }, { name: 'Bonita Springs' }, { name: 'Bossier City' }, { name: 'Boston' }, { name: 'Boulder' }, { name: 'Bountiful' }, { name: 'Bowie' }, { name: 'Bowling Green' }, { name: 'Boynton Beach' }, { name: 'Bozeman' }, { name: 'Bradenton' }, { name: 'Brea' }, { name: 'Bremerton' }, { name: 'Brentwood' }, { name: 'Brentwood' }, { name: 'Bridgeport' }, { name: 'Bristol' }, { name: 'Brockton' }, { name: 'Broken Arrow' }, { name: 'Brookfield' }, { name: 'Brookhaven' }, { name: 'Brooklyn Park' }, { name: 'Broomfield' }, { name: 'Brownsville' }, { name: 'Bryan' }, { name: 'Buckeye' }, { name: 'Buena Park' }, { name: 'Buffalo' }, { name: 'Buffalo Grove' }, { name: 'Bullhead City' }, { name: 'Burbank' }, { name: 'Burien' }, { name: 'Burleson' }, { name: 'Burlington' }, { name: 'Burlington' }, { name: 'Burnsville' }, { name: 'Caldwell' }, { name: 'Calexico' }, { name: 'Calumet City' }, { name: 'Camarillo' }, { name: 'Cambridge' }, { name: 'Camden' }, { name: 'Campbell' }, { name: 'Canton' }, { name: 'Cape Coral' }, { name: 'Cape Girardeau' }, { name: 'Carlsbad' }, { name: 'Carmel' }, { name: 'Carol Stream' }, { name: 'Carpentersville' }, { name: 'Carrollton' }, { name: 'Carson' }, { name: 'Carson City' }, { name: 'Cary' }, { name: 'Casa Grande' }, { name: 'Casper' }, { name: 'Castle Rock' }, { name: 'Cathedral City' }, { name: 'Cedar Falls' }, { name: 'Cedar Hill' }, { name: 'Cedar Park' }, { name: 'Cedar Rapids' }, { name: 'Centennial' }, { name: 'Ceres' }, { name: 'Cerritos' }, { name: 'Champaign' }, { name: 'Chandler' }, { name: 'Chapel Hill' }, { name: 'Charleston' }, { name: 'Charleston' }, { name: 'Charlotte' }, { name: 'Charlottesville' }, { name: 'Chattanooga' }, { name: 'Chelsea' }, { name: 'Chesapeake' }, { name: 'Chesterfield' }, { name: 'Cheyenne' }, { name: 'Chicago' }, { name: 'Chico' }, { name: 'Chicopee' }, { name: 'Chino' }, { name: 'Chino Hills' }, { name: 'Chula Vista' }, { name: 'Cicero' }, { name: 'Cincinnati' }, { name: 'Citrus Heights' }, { name: 'Clarksville' }, { name: 'Clearwater' }, { name: 'Cleveland' }, { name: 'Cleveland' }, { name: 'Cleveland Heights' }, { name: 'Clifton' }, { name: 'Clovis' }, { name: 'Clovis' }, { name: 'Coachella' }, { name: 'Coconut Creek' }, { name: 'Coeur d\'Alene' }, { name: 'College Station' }, { name: 'Collierville' }, { name: 'Colorado Springs' }, { name: 'Colton' }, { name: 'Columbia' }, { name: 'Columbia' }, { name: 'Columbus' }, { name: 'Columbus' }, { name: 'Columbus' }, { name: 'Commerce City' }, { name: 'Compton' }, { name: 'Concord' }, { name: 'Concord' }, { name: 'Concord' }, { name: 'Conroe' }, { name: 'Conway' }, { name: 'Coon Rapids' }, { name: 'Coppell' }, { name: 'Coral Gables' }, { name: 'Coral Springs' }, { name: 'Corona' }, { name: 'Corpus Christi' }, { name: 'Corvallis' }, { name: 'Costa Mesa' }, { name: 'Council Bluffs' }, { name: 'Covina' }, { name: 'Covington' }, { name: 'Cranston' }, { name: 'Crystal Lake' }, { name: 'Culver City' }, { name: 'Cupertino' }, { name: 'Cutler Bay' }, { name: 'Cuyahoga Falls' }, { name: 'Cypress' }, { name: 'Dallas' }, { name: 'Daly City' }, { name: 'Danbury' }, { name: 'Danville' }, { name: 'Danville' }, { name: 'Davenport' }, { name: 'Davie' }, { name: 'Davis' }, { name: 'Dayton' }, { name: 'Daytona Beach' }, { name: 'DeKalb' }, { name: 'DeSoto' }, { name: 'Dearborn' }, { name: 'Dearborn Heights' }, { name: 'Decatur' }, { name: 'Decatur' }, { name: 'Deerfield Beach' }, { name: 'Delano' }, { name: 'Delray Beach' }, { name: 'Deltona' }, { name: 'Denton' }, { name: 'Denver' }, { name: 'Des Moines' }, { name: 'Des Plaines' }, { name: 'Detroit' }, { name: 'Diamond Bar' }, { name: 'Doral' }, { name: 'Dothan' }, { name: 'Dover' }, { name: 'Downers Grove' }, { name: 'Downey' }, { name: 'Draper' }, { name: 'Dublin' }, { name: 'Dublin' }, { name: 'Dubuque' }, { name: 'Duluth' }, { name: 'Duncanville' }, { name: 'Dunwoody' }, { name: 'Durham' }, { name: 'Eagan' }, { name: 'East Lansing' }, { name: 'East Orange' }, { name: 'East Providence' }, { name: 'Eastvale' }, { name: 'Eau Claire' }, { name: 'Eden Prairie' }, { name: 'Edina' }, { name: 'Edinburg' }, { name: 'Edmond' }, { name: 'Edmonds' }, { name: 'El Cajon' }, { name: 'El Centro' }, { name: 'El Monte' }, { name: 'El Paso' }, { name: 'Elgin' }, { name: 'Elizabeth' }, { name: 'Elk Grove' }, { name: 'Elkhart' }, { name: 'Elmhurst' }, { name: 'Elyria' }, { name: 'Encinitas' }, { name: 'Enid' }, { name: 'Erie' }, { name: 'Escondido' }, { name: 'Euclid' }, { name: 'Eugene' }, { name: 'Euless' }, { name: 'Evanston' }, { name: 'Evansville' }, { name: 'Everett' }, { name: 'Everett' }, { name: 'Fairfield' }, { name: 'Fairfield' }, { name: 'Fall River' }, { name: 'Fargo' }, { name: 'Farmington' }, { name: 'Farmington Hills' }, { name: 'Fayetteville' }, { name: 'Fayetteville' }, { name: 'Federal Way' }, { name: 'Findlay' }, { name: 'Fishers' }, { name: 'Fitchburg' }, { name: 'Flagstaff' }, { name: 'Flint' }, { name: 'Florence' }, { name: 'Florence' }, { name: 'Florissant' }, { name: 'Flower Mound' }, { name: 'Folsom' }, { name: 'Fond du Lac' }, { name: 'Fontana' }, { name: 'Fort Collins' }, { name: 'Fort Lauderdale' }, { name: 'Fort Myers' }, { name: 'Fort Pierce' }, { name: 'Fort Smith' }, { name: 'Fort Wayne' }, { name: 'Fort Worth' }, { name: 'Fountain Valley' }, { name: 'Franklin' }, { name: 'Frederick' }, { name: 'Freeport' }, { name: 'Fremont' }, { name: 'Fresno' }, { name: 'Friendswood' }, { name: 'Frisco' }, { name: 'Fullerton' }, { name: 'Gainesville' }, { name: 'Gaithersburg' }, { name: 'Galveston' }, { name: 'Garden Grove' }, { name: 'Gardena' }, { name: 'Garland' }, { name: 'Gary' }, { name: 'Gastonia' }, { name: 'Georgetown' }, { name: 'Germantown' }, { name: 'Gilbert' }, { name: 'Gilroy' }, { name: 'Glendale' }, { name: 'Glendale' }, { name: 'Glendora' }, { name: 'Glenview' }, { name: 'Goodyear' }, { name: 'Goose Creek' }, { name: 'Grand Forks' }, { name: 'Grand Island' }, { name: 'Grand Junction' }, { name: 'Grand Prairie' }, { name: 'Grand Rapids' }, { name: 'Grapevine' }, { name: 'Great Falls' }, { name: 'Greeley' }, { name: 'Green Bay' }, { name: 'Greenacres' }, { name: 'Greenfield' }, { name: 'Greensboro' }, { name: 'Greenville' }, { name: 'Greenville' }, { name: 'Greenwood' }, { name: 'Gresham' }, { name: 'Grove City' }, { name: 'Gulfport' }, { name: 'Hackensack' }, { name: 'Hagerstown' }, { name: 'Hallandale Beach' }, { name: 'Haltom City' }, { name: 'Hamilton' }, { name: 'Hammond' }, { name: 'Hampton' }, { name: 'Hanford' }, { name: 'Hanover Park' }, { name: 'Harlingen' }, { name: 'Harrisburg' }, { name: 'Harrisonburg' }, { name: 'Hartford' }, { name: 'Hattiesburg' }, { name: 'Haverhill' }, { name: 'Hawthorne' }, { name: 'Hayward' }, { name: 'Hemet' }, { name: 'Hempstead' }, { name: 'Henderson' }, { name: 'Hendersonville' }, { name: 'Hesperia' }, { name: 'Hialeah' }, { name: 'Hickory' }, { name: 'High Point' }, { name: 'Highland' }, { name: 'Hillsboro' }, { name: 'Hilton Head Island' }, { name: 'Hoboken' }, { name: 'Hoffman Estates' }, { name: 'Hollywood' }, { name: 'Holyoke' }, { name: 'Homestead' }, { name: 'Honolulu' }, { name: 'Hoover' }, { name: 'Houston' }, { name: 'Huber Heights' }, { name: 'Huntersville' }, { name: 'Huntington' }, { name: 'Huntington Beach' }, { name: 'Huntington Park' }, { name: 'Huntsville' }, { name: 'Huntsville' }, { name: 'Hurst' }, { name: 'Hutchinson' }, { name: 'Idaho Falls' }, { name: 'Independence' }, { name: 'Indianapolis' }, { name: 'Indio' }, { name: 'Inglewood' }, { name: 'Iowa City' }, { name: 'Irvine' }, { name: 'Irving' }, { name: 'Jackson' }, { name: 'Jackson' }, { name: 'Jacksonville' }, { name: 'Jacksonville' }, { name: 'Janesville' }, { name: 'Jefferson City' }, { name: 'Jeffersonville' }, { name: 'Jersey City' }, { name: 'Johns Creek' }, { name: 'Johnson City' }, { name: 'Joliet' }, { name: 'Jonesboro' }, { name: 'Joplin' }, { name: 'Jupiter' }, { name: 'Jurupa Valley' }, { name: 'Kalamazoo' }, { name: 'Kannapolis' }, { name: 'Kansas City' }, { name: 'Kansas City' }, { name: 'Kearny' }, { name: 'Keizer' }, { name: 'Keller' }, { name: 'Kenner' }, { name: 'Kennewick' }, { name: 'Kenosha' }, { name: 'Kent' }, { name: 'Kentwood' }, { name: 'Kettering' }, { name: 'Killeen' }, { name: 'Kingsport' }, { name: 'Kirkland' }, { name: 'Kissimmee' }, { name: 'Knoxville' }, { name: 'Kokomo' }, { name: 'La Crosse' }, { name: 'La Habra' }, { name: 'La Mesa' }, { name: 'La Mirada' }, { name: 'La Puente' }, { name: 'La Quinta' }, { name: 'Lacey' }, { name: 'Lafayette' }, { name: 'Lafayette' }, { name: 'Laguna Niguel' }, { name: 'Lake Charles' }, { name: 'Lake Elsinore' }, { name: 'Lake Forest' }, { name: 'Lake Havasu City' }, { name: 'Lake Oswego' }, { name: 'Lakeland' }, { name: 'Lakeville' }, { name: 'Lakewood' }, { name: 'Lakewood' }, { name: 'Lakewood' }, { name: 'Lakewood' }, { name: 'Lancaster' }, { name: 'Lancaster' }, { name: 'Lancaster' }, { name: 'Lancaster' }, { name: 'Lansing' }, { name: 'Laredo' }, { name: 'Largo' }, { name: 'Las Cruces' }, { name: 'Las Vegas' }, { name: 'Lauderhill' }, { name: 'Lawrence' }, { name: 'Lawrence' }, { name: 'Lawrence' }, { name: 'Lawton' }, { name: 'Layton' }, { name: 'League City' }, { name: 'Lee\'s Summit' }, { name: 'Leesburg' }, { name: 'Lehi' }, { name: 'Lenexa' }, { name: 'Leominster' }, { name: 'Lewisville' }, { name: 'Lexington-Fayette' }, { name: 'Lima' }, { name: 'Lincoln' }, { name: 'Lincoln' }, { name: 'Lincoln Park' }, { name: 'Linden' }, { name: 'Little Rock' }, { name: 'Littleton' }, { name: 'Livermore' }, { name: 'Livonia' }, { name: 'Lodi' }, { name: 'Logan' }, { name: 'Lombard' }, { name: 'Lompoc' }, { name: 'Long Beach' }, { name: 'Longmont' }, { name: 'Longview' }, { name: 'Lorain' }, { name: 'Los Angeles' }, { name: 'Louisville/Jefferson County' }, { name: 'Loveland' }, { name: 'Lowell' }, { name: 'Lubbock' }, { name: 'Lynchburg' }, { name: 'Lynn' }, { name: 'Lynwood' }, { name: 'Macon' }, { name: 'Madera' }, { name: 'Madison' }, { name: 'Madison' }, { name: 'Malden' }, { name: 'Manassas' }, { name: 'Manchester' }, { name: 'Manhattan' }, { name: 'Mankato' }, { name: 'Mansfield' }, { name: 'Mansfield' }, { name: 'Manteca' }, { name: 'Maple Grove' }, { name: 'Maplewood' }, { name: 'Marana' }, { name: 'Margate' }, { name: 'Maricopa' }, { name: 'Marietta' }, { name: 'Marlborough' }, { name: 'Martinez' }, { name: 'Marysville' }, { name: 'McAllen' }, { name: 'McKinney' }, { name: 'Medford' }, { name: 'Medford' }, { name: 'Melbourne' }, { name: 'Memphis' }, { name: 'Menifee' }, { name: 'Mentor' }, { name: 'Merced' }, { name: 'Meriden' }, { name: 'Meridian' }, { name: 'Meridian' }, { name: 'Mesa' }, { name: 'Mesquite' }, { name: 'Methuen' }, { name: 'Miami' }, { name: 'Miami Beach' }, { name: 'Miami Gardens' }, { name: 'Middletown' }, { name: 'Middletown' }, { name: 'Midland' }, { name: 'Midland' }, { name: 'Midwest City' }, { name: 'Milford' }, { name: 'Milpitas' }, { name: 'Milwaukee' }, { name: 'Minneapolis' }, { name: 'Minnetonka' }, { name: 'Minot' }, { name: 'Miramar' }, { name: 'Mishawaka' }, { name: 'Mission' }, { name: 'Mission Viejo' }, { name: 'Missoula' }, { name: 'Missouri City' }, { name: 'Mobile' }, { name: 'Modesto' }, { name: 'Moline' }, { name: 'Monroe' }, { name: 'Monrovia' }, { name: 'Montclair' }, { name: 'Montebello' }, { name: 'Monterey Park' }, { name: 'Montgomery' }, { name: 'Moore' }, { name: 'Moorhead' }, { name: 'Moreno Valley' }, { name: 'Morgan Hill' }, { name: 'Mount Pleasant' }, { name: 'Mount Prospect' }, { name: 'Mount Vernon' }, { name: 'Mountain View' }, { name: 'Muncie' }, { name: 'Murfreesboro' }, { name: 'Murray' }, { name: 'Murrieta' }, { name: 'Muskegon' }, { name: 'Muskogee' }, { name: 'Nampa' }, { name: 'Napa' }, { name: 'Naperville' }, { name: 'Nashua' }, { name: 'Nashville-Davidson' }, { name: 'National City' }, { name: 'New Bedford' }, { name: 'New Berlin' }, { name: 'New Braunfels' }, { name: 'New Britain' }, { name: 'New Brunswick' }, { name: 'New Haven' }, { name: 'New Orleans' }, { name: 'New Rochelle' }, { name: 'New York' }, { name: 'Newark' }, { name: 'Newark' }, { name: 'Newark' }, { name: 'Newport Beach' }, { name: 'Newport News' }, { name: 'Newton' }, { name: 'Niagara Falls' }, { name: 'Noblesville' }, { name: 'Norfolk' }, { name: 'Normal' }, { name: 'Norman' }, { name: 'North Charleston' }, { name: 'North Las Vegas' }, { name: 'North Lauderdale' }, { name: 'North Little Rock' }, { name: 'North Miami' }, { name: 'North Miami Beach' }, { name: 'North Port' }, { name: 'North Richland Hills' }, { name: 'Northglenn' }, { name: 'Norwalk' }, { name: 'Norwalk' }, { name: 'Norwich' }, { name: 'Novato' }, { name: 'Novi' }, { name: 'O\'Fallon' }, { name: 'Oak Lawn' }, { name: 'Oak Park' }, { name: 'Oakland' }, { name: 'Oakland Park' }, { name: 'Oakley' }, { name: 'Ocala' }, { name: 'Oceanside' }, { name: 'Ocoee' }, { name: 'Odessa' }, { name: 'Ogden' }, { name: 'Oklahoma City' }, { name: 'Olathe' }, { name: 'Olympia' }, { name: 'Omaha' }, { name: 'Ontario' }, { name: 'Orange' }, { name: 'Orem' }, { name: 'Orland Park' }, { name: 'Orlando' }, { name: 'Ormond Beach' }, { name: 'Oro Valley' }, { name: 'Oshkosh' }, { name: 'Overland Park' }, { name: 'Owensboro' }, { name: 'Oxnard' }, { name: 'Pacifica' }, { name: 'Palatine' }, { name: 'Palm Bay' }, { name: 'Palm Beach Gardens' }, { name: 'Palm Coast' }, { name: 'Palm Desert' }, { name: 'Palm Springs' }, { name: 'Palmdale' }, { name: 'Palo Alto' }, { name: 'Panama City' }, { name: 'Paramount' }, { name: 'Park Ridge' }, { name: 'Parker' }, { name: 'Parma' }, { name: 'Pasadena' }, { name: 'Pasadena' }, { name: 'Pasco' }, { name: 'Passaic' }, { name: 'Paterson' }, { name: 'Pawtucket' }, { name: 'Peabody' }, { name: 'Peachtree Corners' }, { name: 'Pearland' }, { name: 'Pembroke Pines' }, { name: 'Pensacola' }, { name: 'Peoria' }, { name: 'Peoria' }, { name: 'Perris' }, { name: 'Perth Amboy' }, { name: 'Petaluma' }, { name: 'Pflugerville' }, { name: 'Pharr' }, { name: 'Phenix City' }, { name: 'Philadelphia' }, { name: 'Phoenix' }, { name: 'Pico Rivera' }, { name: 'Pine Bluff' }, { name: 'Pinellas Park' }, { name: 'Pittsburg' }, { name: 'Pittsburgh' }, { name: 'Pittsfield' }, { name: 'Placentia' }, { name: 'Plainfield' }, { name: 'Plainfield' }, { name: 'Plano' }, { name: 'Plantation' }, { name: 'Pleasanton' }, { name: 'Plymouth' }, { name: 'Pocatello' }, { name: 'Pomona' }, { name: 'Pompano Beach' }, { name: 'Pontiac' }, { name: 'Port Arthur' }, { name: 'Port Orange' }, { name: 'Port St. Lucie' }, { name: 'Portage' }, { name: 'Porterville' }, { name: 'Portland' }, { name: 'Portland' }, { name: 'Portsmouth' }, { name: 'Poway' }, { name: 'Prescott' }, { name: 'Prescott Valley' }, { name: 'Providence' }, { name: 'Provo' }, { name: 'Pueblo' }, { name: 'Puyallup' }, { name: 'Quincy' }, { name: 'Quincy' }, { name: 'Racine' }, { name: 'Raleigh' }, { name: 'Rancho Cordova' }, { name: 'Rancho Cucamonga' }, { name: 'Rancho Palos Verdes' }, { name: 'Rancho Santa Margarita' }, { name: 'Rapid City' }, { name: 'Reading' }, { name: 'Redding' }, { name: 'Redlands' }, { name: 'Redmond' }, { name: 'Redondo Beach' }, { name: 'Redwood City' }, { name: 'Reno' }, { name: 'Renton' }, { name: 'Revere' }, { name: 'Rialto' }, { name: 'Richardson' }, { name: 'Richland' }, { name: 'Richmond' }, { name: 'Richmond' }, { name: 'Rio Rancho' }, { name: 'Riverside' }, { name: 'Riverton' }, { name: 'Roanoke' }, { name: 'Rochester' }, { name: 'Rochester' }, { name: 'Rochester Hills' }, { name: 'Rock Hill' }, { name: 'Rock Island' }, { name: 'Rockford' }, { name: 'Rocklin' }, { name: 'Rockville' }, { name: 'Rockwall' }, { name: 'Rocky Mount' }, { name: 'Rogers' }, { name: 'Rohnert Park' }, { name: 'Romeoville' }, { name: 'Rosemead' }, { name: 'Roseville' }, { name: 'Roseville' }, { name: 'Roswell' }, { name: 'Roswell' }, { name: 'Round Rock' }, { name: 'Rowlett' }, { name: 'Roy' }, { name: 'Royal Oak' }, { name: 'Sacramento' }, { name: 'Saginaw' }, { name: 'Salem' }, { name: 'Salem' }, { name: 'Salina' }, { name: 'Salinas' }, { name: 'Salt Lake City' }, { name: 'Sammamish' }, { name: 'San Angelo' }, { name: 'San Antonio' }, { name: 'San Bernardino' }, { name: 'San Bruno' }, { name: 'San Buenaventura (Ventura)' }, { name: 'San Clemente' }, { name: 'San Diego' }, { name: 'San Francisco' }, { name: 'San Gabriel' }, { name: 'San Jacinto' }, { name: 'San Jose' }, { name: 'San Leandro' }, { name: 'San Luis Obispo' }, { name: 'San Marcos' }, { name: 'San Marcos' }, { name: 'San Mateo' }, { name: 'San Rafael' }, { name: 'San Ramon' }, { name: 'Sandy' }, { name: 'Sandy Springs' }, { name: 'Sanford' }, { name: 'Santa Ana' }, { name: 'Santa Barbara' }, { name: 'Santa Clara' }, { name: 'Santa Clarita' }, { name: 'Santa Cruz' }, { name: 'Santa Fe' }, { name: 'Santa Maria' }, { name: 'Santa Monica' }, { name: 'Santa Rosa' }, { name: 'Santee' }, { name: 'Sarasota' }, { name: 'Savannah' }, { name: 'Sayreville' }, { name: 'Schaumburg' }, { name: 'Schenectady' }, { name: 'Scottsdale' }, { name: 'Scranton' }, { name: 'Seattle' }, { name: 'Shakopee' }, { name: 'Shawnee' }, { name: 'Sheboygan' }, { name: 'Shelton' }, { name: 'Sherman' }, { name: 'Shoreline' }, { name: 'Shreveport' }, { name: 'Sierra Vista' }, { name: 'Simi Valley' }, { name: 'Sioux City' }, { name: 'Sioux Falls' }, { name: 'Skokie' }, { name: 'Smyrna' }, { name: 'Smyrna' }, { name: 'Somerville' }, { name: 'South Bend' }, { name: 'South Gate' }, { name: 'South Jordan' }, { name: 'South San Francisco' }, { name: 'Southaven' }, { name: 'Southfield' }, { name: 'Spanish Fork' }, { name: 'Sparks' }, { name: 'Spartanburg' }, { name: 'Spokane' }, { name: 'Spokane Valley' }, { name: 'Springdale' }, { name: 'Springfield' }, { name: 'Springfield' }, { name: 'Springfield' }, { name: 'Springfield' }, { name: 'Springfield' }, { name: 'St. Charles' }, { name: 'St. Clair Shores' }, { name: 'St. Cloud' }, { name: 'St. Cloud' }, { name: 'St. George' }, { name: 'St. Joseph' }, { name: 'St. Louis' }, { name: 'St. Louis Park' }, { name: 'St. Paul' }, { name: 'St. Peters' }, { name: 'St. Petersburg' }, { name: 'Stamford' }, { name: 'Stanton' }, { name: 'State College' }, { name: 'Sterling Heights' }, { name: 'Stillwater' }, { name: 'Stockton' }, { name: 'Streamwood' }, { name: 'Strongsville' }, { name: 'Suffolk' }, { name: 'Sugar Land' }, { name: 'Summerville' }, { name: 'Sumter' }, { name: 'Sunnyvale' }, { name: 'Sunrise' }, { name: 'Surprise' }, { name: 'Syracuse' }, { name: 'Tacoma' }, { name: 'Tallahassee' }, { name: 'Tamarac' }, { name: 'Tampa' }, { name: 'Taunton' }, { name: 'Taylor' }, { name: 'Taylorsville' }, { name: 'Temecula' }, { name: 'Tempe' }, { name: 'Temple' }, { name: 'Terre Haute' }, { name: 'Texarkana' }, { name: 'Texas City' }, { name: 'The Colony' }, { name: 'Thornton' }, { name: 'Thousand Oaks' }, { name: 'Tigard' }, { name: 'Tinley Park' }, { name: 'Titusville' }, { name: 'Toledo' }, { name: 'Topeka' }, { name: 'Torrance' }, { name: 'Tracy' }, { name: 'Trenton' }, { name: 'Troy' }, { name: 'Troy' }, { name: 'Tucson' }, { name: 'Tulare' }, { name: 'Tulsa' }, { name: 'Turlock' }, { name: 'Tuscaloosa' }, { name: 'Tustin' }, { name: 'Twin Falls' }, { name: 'Tyler' }, { name: 'Union City' }, { name: 'Union City' }, { name: 'Upland' }, { name: 'Urbana' }, { name: 'Urbandale' }, { name: 'Utica' }, { name: 'Vacaville' }, { name: 'Valdosta' }, { name: 'Vallejo' }, { name: 'Valley Stream' }, { name: 'Vancouver' }, { name: 'Victoria' }, { name: 'Victorville' }, { name: 'Vineland' }, { name: 'Virginia Beach' }, { name: 'Visalia' }, { name: 'Vista' }, { name: 'Waco' }, { name: 'Walnut Creek' }, { name: 'Waltham' }, { name: 'Warner Robins' }, { name: 'Warren' }, { name: 'Warren' }, { name: 'Warwick' }, { name: 'Washington' }, { name: 'Waterbury' }, { name: 'Waterloo' }, { name: 'Watsonville' }, { name: 'Waukegan' }, { name: 'Waukesha' }, { name: 'Wausau' }, { name: 'Wauwatosa' }, { name: 'Wellington' }, { name: 'Weslaco' }, { name: 'West Allis' }, { name: 'West Covina' }, { name: 'West Des Moines' }, { name: 'West Haven' }, { name: 'West Jordan' }, { name: 'West New York' }, { name: 'West Palm Beach' }, { name: 'West Sacramento' }, { name: 'West Valley City' }, { name: 'Westerville' }, { name: 'Westfield' }, { name: 'Westland' }, { name: 'Westminster' }, { name: 'Westminster' }, { name: 'Weston' }, { name: 'Weymouth Town' }, { name: 'Wheaton' }, { name: 'Wheeling' }, { name: 'White Plains' }, { name: 'Whittier' }, { name: 'Wichita' }, { name: 'Wichita Falls' }, { name: 'Wilkes-Barre' }, { name: 'Wilmington' }, { name: 'Wilmington' }, { name: 'Wilson' }, { name: 'Winston-Salem' }, { name: 'Winter Garden' }, { name: 'Woburn' }, { name: 'Woodbury' }, { name: 'Woodland' }, { name: 'Woonsocket' }, { name: 'Worcester' }, { name: 'Wylie' }, { name: 'Wyoming' }, { name: 'Yakima' }, { name: 'Yonkers' }, { name: 'Yorba Linda' }, { name: 'York' }, { name: 'Youngstown' }, { name: 'Yuba City' }, { name: 'Yucaipa' }, { name: 'Yuma' }];

},{}],11:[function(require,module,exports){
'use strict';

module.exports = [{ github: 'jedwatson', name: 'Jed Watson' }, { github: 'bruderstein', name: 'Dave Brotherstone' }, { github: 'jossmac', name: 'Joss Mackison' }, { github: 'jniechcial', name: 'Jakub Niechciał' }, { github: 'craigdallimore', name: 'Craig Dallimore' }, { github: 'julen', name: 'Julen Ruiz Aizpuru' }, { github: 'dcousens', name: 'Daniel Cousens' }, { github: 'jgautsch', name: 'Jon Gautsch' }, { github: 'dmitry-smirnov', name: 'Dmitry Smirnov' }];

},{}],12:[function(require,module,exports){
'use strict';

exports.AU = [{ value: 'australian-capital-territory', label: 'Australian Capital Territory', className: 'State-ACT' }, { value: 'new-south-wales', label: 'New South Wales', className: 'State-NSW' }, { value: 'victoria', label: 'Victoria', className: 'State-Vic' }, { value: 'queensland', label: 'Queensland', className: 'State-Qld' }, { value: 'western-australia', label: 'Western Australia', className: 'State-WA' }, { value: 'south-australia', label: 'South Australia', className: 'State-SA' }, { value: 'tasmania', label: 'Tasmania', className: 'State-Tas' }, { value: 'northern-territory', label: 'Northern Territory', className: 'State-NT' }];

exports.US = [{ value: 'AL', label: 'Alabama', disabled: true }, { value: 'AK', label: 'Alaska' }, { value: 'AS', label: 'American Samoa' }, { value: 'AZ', label: 'Arizona' }, { value: 'AR', label: 'Arkansas' }, { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' }, { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' }, { value: 'DC', label: 'District Of Columbia' }, { value: 'FM', label: 'Federated States Of Micronesia' }, { value: 'FL', label: 'Florida' }, { value: 'GA', label: 'Georgia' }, { value: 'GU', label: 'Guam' }, { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' }, { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' }, { value: 'IA', label: 'Iowa' }, { value: 'KS', label: 'Kansas' }, { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' }, { value: 'ME', label: 'Maine' }, { value: 'MH', label: 'Marshall Islands' }, { value: 'MD', label: 'Maryland' }, { value: 'MA', label: 'Massachusetts' }, { value: 'MI', label: 'Michigan' }, { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' }, { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' }, { value: 'NE', label: 'Nebraska' }, { value: 'NV', label: 'Nevada' }, { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' }, { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' }, { value: 'NC', label: 'North Carolina' }, { value: 'ND', label: 'North Dakota' }, { value: 'MP', label: 'Northern Mariana Islands' }, { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' }, { value: 'OR', label: 'Oregon' }, { value: 'PW', label: 'Palau' }, { value: 'PA', label: 'Pennsylvania' }, { value: 'PR', label: 'Puerto Rico' }, { value: 'RI', label: 'Rhode Island' }, { value: 'SC', label: 'South Carolina' }, { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' }, { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' }, { value: 'VT', label: 'Vermont' }, { value: 'VI', label: 'Virgin Islands' }, { value: 'VA', label: 'Virginia' }, { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' }, { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' }];

},{}],13:[function(require,module,exports){
'use strict';

module.exports = [{ value: 'John Smith', label: 'John Smith', email: 'john@smith.com' }, { value: 'Merry Jane', label: 'Merry Jane', email: 'merry@jane.com' }, { value: 'Stan Hoper', label: 'Stan Hoper', email: 'stan@hoper.com' }];

},{}],14:[function(require,module,exports){
var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;

},{}],15:[function(require,module,exports){
(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();

},{}],16:[function(require,module,exports){
'use strict';
module.exports = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
},{}],17:[function(require,module,exports){
'use strict';

var canUseDOM = require('./inDOM');

var size;

module.exports = function (recalc) {
  if (!size || recalc) {
    if (canUseDOM) {
      var scrollDiv = document.createElement('div');

      scrollDiv.style.position = 'absolute';
      scrollDiv.style.top = '-9999px';
      scrollDiv.style.width = '50px';
      scrollDiv.style.height = '50px';
      scrollDiv.style.overflow = 'scroll';

      document.body.appendChild(scrollDiv);
      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
    }
  }

  return size;
};
},{"./inDOM":16}],18:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */

'use strict';

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return x !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;
},{}],19:[function(require,module,exports){
/**
 * Determine if an object is Buffer
 *
 * Author:   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * License:  MIT
 *
 * `npm install is-buffer`
 */

module.exports = function (obj) {
  return !!(obj != null &&
    (obj._isBuffer || // For Safari 5-7 (missing Object.prototype.constructor)
      (obj.constructor &&
      typeof obj.constructor.isBuffer === 'function' &&
      obj.constructor.isBuffer(obj))
    ))
}

},{}],20:[function(require,module,exports){
module.exports = function() {
  var mediaQuery;
  if (typeof window !== "undefined" && window !== null) {
    mediaQuery = "(-webkit-min-device-pixel-ratio: 1.25), (min--moz-device-pixel-ratio: 1.25), (-o-min-device-pixel-ratio: 5/4), (min-resolution: 1.25dppx)";
    if (window.devicePixelRatio > 1.25) {
      return true;
    }
    if (window.matchMedia && window.matchMedia(mediaQuery).matches) {
      return true;
    }
  }
  return false;
};

},{}],21:[function(require,module,exports){
// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
require('whatwg-fetch');
module.exports = self.fetch.bind(self);

},{"whatwg-fetch":70}],22:[function(require,module,exports){
(function(){
  var crypt = require('crypt'),
      utf8 = require('charenc').utf8,
      isBuffer = require('is-buffer'),
      bin = require('charenc').bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message))
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if(typeof message == 'undefined')
      return;

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();

},{"charenc":14,"crypt":15,"is-buffer":19}],23:[function(require,module,exports){
'use strict';
/* eslint-disable no-unused-vars */
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (e) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (Object.getOwnPropertySymbols) {
			symbols = Object.getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],24:[function(require,module,exports){
(function (process){
// Generated by CoffeeScript 1.7.1
(function() {
  var getNanoSeconds, hrtime, loadTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - loadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    loadTime = getNanoSeconds();
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

}).call(this,require('_process'))

},{"_process":25}],25:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

(function () {
  try {
    cachedSetTimeout = setTimeout;
  } catch (e) {
    cachedSetTimeout = function () {
      throw new Error('setTimeout is not defined');
    }
  }
  try {
    cachedClearTimeout = clearTimeout;
  } catch (e) {
    cachedClearTimeout = function () {
      throw new Error('clearTimeout is not defined');
    }
  }
} ())
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = cachedSetTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    cachedClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        cachedSetTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],26:[function(require,module,exports){
'use strict';
var strictUriEncode = require('strict-uri-encode');
var objectAssign = require('object-assign');

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

exports.extract = function (str) {
	return str.split('?')[1] || '';
};

exports.parse = function (str) {
	// Create an object with no prototype
	// https://github.com/sindresorhus/query-string/issues/47
	var ret = Object.create(null);

	if (typeof str !== 'string') {
		return ret;
	}

	str = str.trim().replace(/^(\?|#|&)/, '');

	if (!str) {
		return ret;
	}

	str.split('&').forEach(function (param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		key = decodeURIComponent(key);

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeURIComponent(val);

		if (ret[key] === undefined) {
			ret[key] = val;
		} else if (Array.isArray(ret[key])) {
			ret[key].push(val);
		} else {
			ret[key] = [ret[key], val];
		}
	});

	return ret;
};

exports.stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true
	};

	opts = objectAssign(defaults, opts);

	return obj ? Object.keys(obj).sort().map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return encode(key, opts);
		}

		if (Array.isArray(val)) {
			var result = [];

			val.slice().forEach(function (val2) {
				if (val2 === undefined) {
					return;
				}

				if (val2 === null) {
					result.push(encode(key, opts));
				} else {
					result.push(encode(key, opts) + '=' + encode(val2, opts));
				}
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};

},{"object-assign":23,"strict-uri-encode":69}],27:[function(require,module,exports){
(function (global){
var now = require('performance-now')
  , root = typeof window === 'undefined' ? global : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = root['request' + suffix]
  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

for(var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix]
  caf = root[vendors[i] + 'Cancel' + suffix]
      || root[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
}
module.exports.cancel = function() {
  caf.apply(root, arguments)
}
module.exports.polyfill = function() {
  root.requestAnimationFrame = raf
  root.cancelAnimationFrame = caf
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"performance-now":24}],28:[function(require,module,exports){
module.exports = require('react/lib/shallowCompare');
},{"react/lib/shallowCompare":68}],29:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _isRetina = require('is-retina');

var _isRetina2 = _interopRequireDefault(_isRetina);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gravatar = function (_React$Component) {
  _inherits(Gravatar, _React$Component);

  function Gravatar() {
    _classCallCheck(this, Gravatar);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Gravatar).apply(this, arguments));
  }

  _createClass(Gravatar, [{
    key: 'render',
    value: function render() {
      var base = void 0;
      if (this.props.https) {
        base = 'https://secure.gravatar.com/avatar/';
      } else {
        base = 'http://www.gravatar.com/avatar/';
      }

      var query = _queryString2.default.stringify({
        s: this.props.size,
        r: this.props.rating,
        d: this.props.default
      });

      var retinaQuery = _queryString2.default.stringify({
        s: this.props.size * 2,
        r: this.props.rating,
        d: this.props.default
      });

      var hash = void 0;
      if (this.props.md5) {
        hash = this.props.md5;
      } else if (this.props.email) {
        hash = (0, _md2.default)(this.props.email);
      } else {
        console.warn('Gravatar image can not be fetched. Either the "email" or "md5" prop must be specified.');
        return _react2.default.createElement('script', null);
      }

      var src = '' + base + hash + '?' + query;
      var retinaSrc = '' + base + hash + '?' + retinaQuery;

      var modernBrowser = true; // server-side, we render for modern browsers

      if (typeof window !== 'undefined') {
        // this is not NodeJS
        modernBrowser = 'srcset' in document.createElement('img');
      }

      var className = 'react-gravatar';
      if (this.props.className) {
        className = className + ' ' + this.props.className;
      }

      // Clone this.props and then delete Component specific props so we can
      // spread the rest into the img.

      var rest = _objectWithoutProperties(this.props, []);

      delete rest.https;
      delete rest.md5;
      delete rest.email;
      delete rest.rating;
      delete rest.size;
      delete rest.style;
      delete rest.className;
      delete rest.default;
      if (!modernBrowser && (0, _isRetina2.default)()) {
        return _react2.default.createElement('img', _extends({
          alt: 'Gravatar for ' + this.props.email,
          style: this.props.style,
          src: retinaSrc,
          height: this.props.size,
          width: this.props.size
        }, rest, {
          className: className
        }));
      }
      return _react2.default.createElement('img', _extends({
        alt: 'Gravatar for ' + this.props.email,
        style: this.props.style,
        src: src,
        srcSet: retinaSrc + ' 2x',
        height: this.props.size,
        width: this.props.size
      }, rest, {
        className: className
      }));
    }
  }]);

  return Gravatar;
}(_react2.default.Component);

Gravatar.displayName = 'Gravatar';
Gravatar.propTypes = {
  email: _react2.default.PropTypes.string,
  md5: _react2.default.PropTypes.string,
  size: _react2.default.PropTypes.number,
  rating: _react2.default.PropTypes.string,
  https: _react2.default.PropTypes.bool,
  default: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  style: _react2.default.PropTypes.object
};
Gravatar.defaultProps = {
  size: 50,
  rating: 'g',
  https: false,
  default: 'retro'
};


module.exports = Gravatar;
},{"is-retina":20,"md5":22,"query-string":26,"react":undefined}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactVirtualized = require('react-virtualized');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VirtualizedSelect = function (_Component) {
  _inherits(VirtualizedSelect, _Component);

  function VirtualizedSelect(props, context) {
    _classCallCheck(this, VirtualizedSelect);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VirtualizedSelect).call(this, props, context));

    _this._renderMenu = _this._renderMenu.bind(_this);
    _this._optionRenderer = _this._optionRenderer.bind(_this);
    return _this;
  }

  _createClass(VirtualizedSelect, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_reactSelect2.default, _extends({}, this.props, {
        menuRenderer: this._renderMenu,
        menuStyle: { overflow: 'hidden' }
      }));
    }

    // See https://github.com/JedWatson/react-select/#effeciently-rendering-large-lists-with-windowing

  }, {
    key: '_renderMenu',
    value: function _renderMenu(_ref) {
      var focusedOption = _ref.focusedOption;
      var focusOption = _ref.focusOption;
      var labelKey = _ref.labelKey;
      var options = _ref.options;
      var selectValue = _ref.selectValue;
      var valueArray = _ref.valueArray;
      var _props = this.props;
      var maxHeight = _props.maxHeight;
      var optionHeight = _props.optionHeight;
      var optionRenderer = _props.optionRenderer;

      var focusedOptionIndex = options.indexOf(focusedOption);
      var height = Math.min(maxHeight, options.length * optionHeight);
      var innerRowRenderer = optionRenderer || this._optionRenderer;

      function wrappedRowRenderer(index) {
        var option = options[index];

        return innerRowRenderer({ focusedOption: focusedOption, focusedOptionIndex: focusedOptionIndex, focusOption: focusOption, labelKey: labelKey, option: option, options: options, selectValue: selectValue, valueArray: valueArray });
      }

      return _react2.default.createElement(
        _reactVirtualized.AutoSizer,
        { disableHeight: true },
        function (_ref2) {
          var width = _ref2.width;
          return _react2.default.createElement(_reactVirtualized.VirtualScroll, {
            className: 'VirtualSelectGrid',
            height: height,
            rowHeight: optionHeight,
            rowRenderer: wrappedRowRenderer,
            rowsCount: options.length,
            scrollToIndex: focusedOptionIndex,
            width: width
          });
        }
      );
    }
  }, {
    key: '_optionRenderer',
    value: function _optionRenderer(_ref3) {
      var focusedOption = _ref3.focusedOption;
      var focusOption = _ref3.focusOption;
      var labelKey = _ref3.labelKey;
      var option = _ref3.option;
      var selectValue = _ref3.selectValue;
      var optionHeight = this.props.optionHeight;


      var className = option === focusedOption ? 'VirtualizedSelectOption VirtualizedSelectFocusedOption' : 'VirtualizedSelectOption';

      return _react2.default.createElement(
        'div',
        {
          className: className,
          onClick: function onClick() {
            return selectValue(option);
          },
          onMouseOver: function onMouseOver() {
            return focusOption(option);
          },
          style: {
            height: optionHeight
          }
        },
        option[labelKey]
      );
    }
  }]);

  return VirtualizedSelect;
}(_react.Component);

VirtualizedSelect.propTypes = {
  maxHeight: _react.PropTypes.number.isRequired,
  optionHeight: _react.PropTypes.number.isRequired,
  optionRenderer: _react.PropTypes.func
};
VirtualizedSelect.defaultProps = {
  maxHeight: 200,
  optionHeight: 35
};
exports.default = VirtualizedSelect;
},{"react":undefined,"react-select":undefined,"react-virtualized":63}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _VirtualizedSelect = require('./VirtualizedSelect');

var _VirtualizedSelect2 = _interopRequireDefault(_VirtualizedSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _VirtualizedSelect2.default;
},{"./VirtualizedSelect":30}],32:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"./VirtualizedSelect":31,"dup":31}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This HOC decorates a virtualized component and responds to arrow-key events by scrolling one row or column at a time.
 */

var ArrowKeyStepper = function (_Component) {
  _inherits(ArrowKeyStepper, _Component);

  function ArrowKeyStepper(props, context) {
    _classCallCheck(this, ArrowKeyStepper);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ArrowKeyStepper).call(this, props, context));

    _this.state = {
      scrollToColumn: 0,
      scrollToRow: 0
    };

    _this._columnStartIndex = 0;
    _this._columnStopIndex = 0;
    _this._rowStartIndex = 0;
    _this._rowStopIndex = 0;

    _this._onKeyDown = _this._onKeyDown.bind(_this);
    _this._onSectionRendered = _this._onSectionRendered.bind(_this);
    return _this;
  }

  _createClass(ArrowKeyStepper, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var children = _props.children;
      var _state = this.state;
      var scrollToColumn = _state.scrollToColumn;
      var scrollToRow = _state.scrollToRow;


      return _react2.default.createElement(
        'div',
        {
          className: className,
          onKeyDown: this._onKeyDown
        },
        children({
          onSectionRendered: this._onSectionRendered,
          scrollToColumn: scrollToColumn,
          scrollToRow: scrollToRow
        })
      );
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_onKeyDown',
    value: function _onKeyDown(event) {
      var _props2 = this.props;
      var columnsCount = _props2.columnsCount;
      var rowsCount = _props2.rowsCount;

      // The above cases all prevent default event event behavior.
      // This is to keep the grid from scrolling after the snap-to update.

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          this.setState({
            scrollToRow: Math.min(this._rowStopIndex + 1, rowsCount - 1)
          });
          break;
        case 'ArrowLeft':
          event.preventDefault();
          this.setState({
            scrollToColumn: Math.max(this._columnStartIndex - 1, 0)
          });
          break;
        case 'ArrowRight':
          event.preventDefault();
          this.setState({
            scrollToColumn: Math.min(this._columnStopIndex + 1, columnsCount - 1)
          });
          break;
        case 'ArrowUp':
          event.preventDefault();
          this.setState({
            scrollToRow: Math.max(this._rowStartIndex - 1, 0)
          });
          break;
      }
    }
  }, {
    key: '_onSectionRendered',
    value: function _onSectionRendered(_ref) {
      var columnStartIndex = _ref.columnStartIndex;
      var columnStopIndex = _ref.columnStopIndex;
      var rowStartIndex = _ref.rowStartIndex;
      var rowStopIndex = _ref.rowStopIndex;

      this._columnStartIndex = columnStartIndex;
      this._columnStopIndex = columnStopIndex;
      this._rowStartIndex = rowStartIndex;
      this._rowStopIndex = rowStopIndex;
    }
  }]);

  return ArrowKeyStepper;
}(_react.Component);

ArrowKeyStepper.propTypes = {
  children: _react.PropTypes.func.isRequired,
  className: _react.PropTypes.string,
  columnsCount: _react.PropTypes.number.isRequired,
  rowsCount: _react.PropTypes.number.isRequired
};
exports.default = ArrowKeyStepper;
},{"react":undefined,"react-addons-shallow-compare":28}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrowKeyStepper = exports.default = undefined;

var _ArrowKeyStepper2 = require('./ArrowKeyStepper');

var _ArrowKeyStepper3 = _interopRequireDefault(_ArrowKeyStepper2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ArrowKeyStepper3.default;
exports.ArrowKeyStepper = _ArrowKeyStepper3.default;
},{"./ArrowKeyStepper":33}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Decorator component that automatically adjusts the width and height of a single child.
 * Child component should not be declared as a child but should rather be specified by a `ChildComponent` property.
 * All other properties will be passed through to the child component.
 */

var AutoSizer = function (_Component) {
  _inherits(AutoSizer, _Component);

  function AutoSizer(props) {
    _classCallCheck(this, AutoSizer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AutoSizer).call(this, props));

    _this.state = {
      height: 0,
      width: 0
    };

    _this._onResize = _this._onResize.bind(_this);
    _this._onScroll = _this._onScroll.bind(_this);
    _this._setRef = _this._setRef.bind(_this);
    return _this;
  }

  _createClass(AutoSizer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Defer requiring resize handler in order to support server-side rendering.
      // See issue #41
      this._detectElementResize = require('../vendor/detectElementResize');
      this._detectElementResize.addResizeListener(this._parentNode, this._onResize);

      this._onResize();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._detectElementResize) {
        this._detectElementResize.removeResizeListener(this._parentNode, this._onResize);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var disableHeight = _props.disableHeight;
      var disableWidth = _props.disableWidth;
      var _state = this.state;
      var height = _state.height;
      var width = _state.width;

      // Outer div should not force width/height since that may prevent containers from shrinking.
      // Inner component should overflow and use calculated width/height.
      // See issue #68 for more information.

      var outerStyle = { overflow: 'visible' };

      if (!disableHeight) {
        outerStyle.height = 0;
      }

      if (!disableWidth) {
        outerStyle.width = 0;
      }

      return _react2.default.createElement(
        'div',
        {
          ref: this._setRef,
          onScroll: this._onScroll,
          style: outerStyle
        },
        children({ height: height, width: width })
      );
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      var onResize = this.props.onResize;

      // Gaurd against AutoSizer component being removed from the DOM immediately after being added.
      // This can result in invalid style values which can result in NaN values if we don't handle them.
      // See issue #150 for more context.

      var boundingRect = this._parentNode.getBoundingClientRect();
      var height = boundingRect.height || 0;
      var width = boundingRect.width || 0;

      var style = getComputedStyle(this._parentNode);
      var paddingLeft = parseInt(style.paddingLeft, 10) || 0;
      var paddingRight = parseInt(style.paddingRight, 10) || 0;
      var paddingTop = parseInt(style.paddingTop, 10) || 0;
      var paddingBottom = parseInt(style.paddingBottom, 10) || 0;

      this.setState({
        height: height - paddingTop - paddingBottom,
        width: width - paddingLeft - paddingRight
      });

      onResize({ height: height, width: width });
    }
  }, {
    key: '_onScroll',
    value: function _onScroll(event) {
      // Prevent detectElementResize library from being triggered by this scroll event.
      event.stopPropagation();
    }
  }, {
    key: '_setRef',
    value: function _setRef(autoSizer) {
      // In case the component has been unmounted
      this._parentNode = autoSizer && autoSizer.parentNode;
    }
  }]);

  return AutoSizer;
}(_react.Component);

AutoSizer.propTypes = {
  /**
   * Function respondible for rendering children.
   * This function should implement the following signature:
   * ({ height, width }) => PropTypes.element
   */
  children: _react.PropTypes.func.isRequired,

  /** Disable dynamic :height property */
  disableHeight: _react.PropTypes.bool,

  /** Disable dynamic :width property */
  disableWidth: _react.PropTypes.bool,

  /** Callback to be invoked on-resize: ({ height, width }) */
  onResize: _react.PropTypes.func.isRequired
};
AutoSizer.defaultProps = {
  onResize: function onResize() {}
};
exports.default = AutoSizer;
},{"../vendor/detectElementResize":67,"react":undefined,"react-addons-shallow-compare":28}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoSizer = exports.default = undefined;

var _AutoSizer2 = require('./AutoSizer');

var _AutoSizer3 = _interopRequireDefault(_AutoSizer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _AutoSizer3.default;
exports.AutoSizer = _AutoSizer3.default;
},{"./AutoSizer":35}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CollectionView = require('./CollectionView');

var _CollectionView2 = _interopRequireDefault(_CollectionView);

var _calculateSizeAndPositionData2 = require('./utils/calculateSizeAndPositionData');

var _calculateSizeAndPositionData3 = _interopRequireDefault(_calculateSizeAndPositionData2);

var _getUpdatedOffsetForIndex = require('../utils/getUpdatedOffsetForIndex');

var _getUpdatedOffsetForIndex2 = _interopRequireDefault(_getUpdatedOffsetForIndex);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Renders scattered or non-linear data.
 * Unlike Grid, which renders checkerboard data, Collection can render arbitrarily positioned- even overlapping- data.
 */

var Collection = function (_Component) {
  _inherits(Collection, _Component);

  function Collection(props, context) {
    _classCallCheck(this, Collection);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Collection).call(this, props, context));

    _this._cellMetadata = [];
    _this._lastRenderedCellIndices = [];
    return _this;
  }

  /** React lifecycle methods */

  _createClass(Collection, [{
    key: 'render',
    value: function render() {
      var props = _objectWithoutProperties(this.props, []);

      return _react2.default.createElement(_CollectionView2.default, _extends({
        cellLayoutManager: this,
        ref: 'CollectionView'
      }, props));
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }

    /** CellLayoutManager interface */

  }, {
    key: 'calculateSizeAndPositionData',
    value: function calculateSizeAndPositionData() {
      var _props = this.props;
      var cellCount = _props.cellCount;
      var cellSizeAndPositionGetter = _props.cellSizeAndPositionGetter;
      var sectionSize = _props.sectionSize;


      var data = (0, _calculateSizeAndPositionData3.default)({
        cellCount: cellCount,
        cellSizeAndPositionGetter: cellSizeAndPositionGetter,
        sectionSize: sectionSize
      });

      this._cellMetadata = data.cellMetadata;
      this._sectionManager = data.sectionManager;
      this._height = data.height;
      this._width = data.width;
    }

    /**
     * Returns the most recently rendered set of cell indices.
     */

  }, {
    key: 'getLastRenderedIndices',
    value: function getLastRenderedIndices() {
      return this._lastRenderedCellIndices;
    }

    /**
     * Calculates the minimum amount of change from the current scroll position to ensure the specified cell is (fully) visible.
     */

  }, {
    key: 'getScrollPositionForCell',
    value: function getScrollPositionForCell(_ref) {
      var cellIndex = _ref.cellIndex;
      var height = _ref.height;
      var scrollLeft = _ref.scrollLeft;
      var scrollTop = _ref.scrollTop;
      var width = _ref.width;
      var cellCount = this.props.cellCount;


      if (cellIndex >= 0 && cellIndex < cellCount) {
        var cellMetadata = this._cellMetadata[cellIndex];

        scrollLeft = (0, _getUpdatedOffsetForIndex2.default)({
          cellOffset: cellMetadata.x,
          cellSize: cellMetadata.width,
          containerSize: width,
          currentOffset: scrollLeft,
          targetIndex: cellIndex
        });

        scrollTop = (0, _getUpdatedOffsetForIndex2.default)({
          cellOffset: cellMetadata.y,
          cellSize: cellMetadata.height,
          containerSize: height,
          currentOffset: scrollTop,
          targetIndex: cellIndex
        });
      }

      return {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop
      };
    }
  }, {
    key: 'getTotalSize',
    value: function getTotalSize() {
      return {
        height: this._height,
        width: this._width
      };
    }
  }, {
    key: 'renderCells',
    value: function renderCells(_ref2) {
      var _this2 = this;

      var height = _ref2.height;
      var isScrolling = _ref2.isScrolling;
      var width = _ref2.width;
      var x = _ref2.x;
      var y = _ref2.y;
      var _props2 = this.props;
      var cellGroupRenderer = _props2.cellGroupRenderer;
      var cellRenderer = _props2.cellRenderer;

      // Store for later calls to getLastRenderedIndices()

      this._lastRenderedCellIndices = this._sectionManager.getCellIndices({
        height: height,
        width: width,
        x: x,
        y: y
      });

      return cellGroupRenderer({
        cellRenderer: cellRenderer,
        cellSizeAndPositionGetter: function cellSizeAndPositionGetter(index) {
          return _this2._sectionManager.getCellMetadata(index);
        },
        indices: this._lastRenderedCellIndices
      });
    }
  }]);

  return Collection;
}(_react.Component);

Collection.propTypes = {
  'aria-label': _react.PropTypes.string,

  /**
   * Number of cells in Collection.
   */
  cellCount: _react.PropTypes.number.isRequired,

  /**
   * Responsible for rendering a group of cells given their indices.
   * Should implement the following interface: ({
   *   cellSizeAndPositionGetter:Function,
   *   indices: Array<number>,
   *   cellRenderer: Function
   * }): Array<PropTypes.node>
   */
  cellGroupRenderer: _react.PropTypes.func.isRequired,

  /**
   * Responsible for rendering a cell given an row and column index.
   * Should implement the following interface: (index: number): PropTypes.node
   */
  cellRenderer: _react.PropTypes.func.isRequired,

  /**
   * Callback responsible for returning size and offset/position information for a given cell (index).
   * (index): { height: number, width: number, x: number, y: number }
   */
  cellSizeAndPositionGetter: _react.PropTypes.func.isRequired,

  /**
   * Optionally override the size of the sections a Collection's cells are split into.
   */
  sectionSize: _react.PropTypes.number
};
Collection.defaultProps = {
  'aria-label': 'grid',
  cellGroupRenderer: defaultCellGroupRenderer
};
exports.default = Collection;


function defaultCellGroupRenderer(_ref3) {
  var cellRenderer = _ref3.cellRenderer;
  var cellSizeAndPositionGetter = _ref3.cellSizeAndPositionGetter;
  var indices = _ref3.indices;

  return indices.map(function (index) {
    var cellMetadata = cellSizeAndPositionGetter(index);
    var renderedCell = cellRenderer(index);

    if (renderedCell == null || renderedCell === false) {
      return null;
    }

    return _react2.default.createElement(
      'div',
      {
        className: 'Collection__cell',
        key: index,
        style: {
          height: cellMetadata.height,
          left: cellMetadata.x,
          top: cellMetadata.y,
          width: cellMetadata.width
        }
      },
      renderedCell
    );
  }).filter(function (renderedCell) {
    return !!renderedCell;
  });
}
},{"../utils/getUpdatedOffsetForIndex":65,"./CollectionView":38,"./utils/calculateSizeAndPositionData":42,"react":undefined,"react-addons-shallow-compare":28}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _createCallbackMemoizer = require('../utils/createCallbackMemoizer');

var _createCallbackMemoizer2 = _interopRequireDefault(_createCallbackMemoizer);

var _scrollbarSize = require('dom-helpers/util/scrollbarSize');

var _scrollbarSize2 = _interopRequireDefault(_scrollbarSize);

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// @TODO It would be nice to refactor Grid to use this code as well.

/**
 * Specifies the number of miliseconds during which to disable pointer events while a scroll is in progress.
 * This improves performance and makes scrolling smoother.
 */
var IS_SCROLLING_TIMEOUT = 150;

/**
 * Controls whether the Grid updates the DOM element's scrollLeft/scrollTop based on the current state or just observes it.
 * This prevents Grid from interrupting mouse-wheel animations (see issue #2).
 */
var SCROLL_POSITION_CHANGE_REASONS = {
  OBSERVED: 'observed',
  REQUESTED: 'requested'
};

/**
 * Monitors changes in properties (eg. cellCount) and state (eg. scroll offsets) to determine when rendering needs to occur.
 * This component does not render any visible content itself; it defers to the specified :cellLayoutManager.
 */

var CollectionView = function (_Component) {
  _inherits(CollectionView, _Component);

  function CollectionView(props, context) {
    _classCallCheck(this, CollectionView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CollectionView).call(this, props, context));

    _this.state = {
      calculateSizeAndPositionDataOnNextUpdate: false,
      isScrolling: false,
      scrollLeft: 0,
      scrollTop: 0
    };

    // Invokes callbacks only when their values have changed.
    _this._onSectionRenderedMemoizer = (0, _createCallbackMemoizer2.default)();
    _this._onScrollMemoizer = (0, _createCallbackMemoizer2.default)(false);

    // Bind functions to instance so they don't lose context when passed around.
    _this._invokeOnSectionRenderedHelper = _this._invokeOnSectionRenderedHelper.bind(_this);
    _this._onScroll = _this._onScroll.bind(_this);
    _this._updateScrollPositionForScrollToCell = _this._updateScrollPositionForScrollToCell.bind(_this);
    return _this;
  }

  /**
   * Forced recompute of cell sizes and positions.
   * This function should be called if cell sizes have changed but nothing else has.
   * Since cell positions are calculated by callbacks, the collection view has no way of detecting when the underlying data has changed.
   */


  _createClass(CollectionView, [{
    key: 'recomputeCellSizesAndPositions',
    value: function recomputeCellSizesAndPositions() {
      this.setState({
        calculateSizeAndPositionDataOnNextUpdate: true
      });
    }

    /* ---------------------------- Component lifecycle methods ---------------------------- */

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props;
      var cellLayoutManager = _props.cellLayoutManager;
      var scrollLeft = _props.scrollLeft;
      var scrollToCell = _props.scrollToCell;
      var scrollTop = _props.scrollTop;


      this._scrollbarSize = (0, _scrollbarSize2.default)();

      if (scrollToCell >= 0) {
        this._updateScrollPositionForScrollToCell();
      } else if (scrollLeft >= 0 || scrollTop >= 0) {
        this._setScrollPosition({ scrollLeft: scrollLeft, scrollTop: scrollTop });
      }

      // Update onSectionRendered callback.
      this._invokeOnSectionRenderedHelper();

      var _cellLayoutManager$ge = cellLayoutManager.getTotalSize();

      var totalHeight = _cellLayoutManager$ge.height;
      var totalWidth = _cellLayoutManager$ge.width;

      // Initialize onScroll callback.

      this._invokeOnScrollMemoizer({
        scrollLeft: scrollLeft || 0,
        scrollTop: scrollTop || 0,
        totalHeight: totalHeight,
        totalWidth: totalWidth
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _props2 = this.props;
      var height = _props2.height;
      var scrollToCell = _props2.scrollToCell;
      var width = _props2.width;
      var _state = this.state;
      var scrollLeft = _state.scrollLeft;
      var scrollPositionChangeReason = _state.scrollPositionChangeReason;
      var scrollTop = _state.scrollTop;

      // Make sure requested changes to :scrollLeft or :scrollTop get applied.
      // Assigning to scrollLeft/scrollTop tells the browser to interrupt any running scroll animations,
      // And to discard any pending async changes to the scroll position that may have happened in the meantime (e.g. on a separate scrolling thread).
      // So we only set these when we require an adjustment of the scroll position.
      // See issue #2 for more information.

      if (scrollPositionChangeReason === SCROLL_POSITION_CHANGE_REASONS.REQUESTED) {
        if (scrollLeft >= 0 && scrollLeft !== prevState.scrollLeft && scrollLeft !== this.refs.scrollingContainer.scrollLeft) {
          this.refs.scrollingContainer.scrollLeft = scrollLeft;
        }
        if (scrollTop >= 0 && scrollTop !== prevState.scrollTop && scrollTop !== this.refs.scrollingContainer.scrollTop) {
          this.refs.scrollingContainer.scrollTop = scrollTop;
        }
      }

      // Update scroll offsets if the current :scrollToCell values requires it
      if (height !== prevProps.height || scrollToCell !== prevProps.scrollToCell || width !== prevProps.width) {
        this._updateScrollPositionForScrollToCell();
      }

      // Update onRowsRendered callback if start/stop indices have changed
      this._invokeOnSectionRenderedHelper();
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var cellLayoutManager = this.props.cellLayoutManager;


      cellLayoutManager.calculateSizeAndPositionData();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._disablePointerEventsTimeoutId) {
        clearTimeout(this._disablePointerEventsTimeoutId);
      }

      if (this._setNextStateAnimationFrameId) {
        _raf2.default.cancel(this._setNextStateAnimationFrameId);
      }
    }

    /**
     * @private
     * This method updates scrollLeft/scrollTop in state for the following conditions:
     * 1) Empty content (0 rows or columns)
     * 2) New scroll props overriding the current state
     * 3) Cells-count or cells-size has changed, making previous scroll offsets invalid
     */

  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (nextProps.cellCount === 0 && (nextState.scrollLeft !== 0 || nextState.scrollTop !== 0)) {
        this._setScrollPosition({
          scrollLeft: 0,
          scrollTop: 0
        });
      } else if (nextProps.scrollLeft !== this.props.scrollLeft || nextProps.scrollTop !== this.props.scrollTop) {
        this._setScrollPosition({
          scrollLeft: nextProps.scrollLeft,
          scrollTop: nextProps.scrollTop
        });
      }

      if (nextProps.cellCount !== this.props.cellCount || nextProps.cellLayoutManager !== this.props.cellLayoutManager || nextState.calculateSizeAndPositionDataOnNextUpdate) {
        nextProps.cellLayoutManager.calculateSizeAndPositionData();
      }

      if (nextState.calculateSizeAndPositionDataOnNextUpdate) {
        this.setState({
          calculateSizeAndPositionDataOnNextUpdate: false
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var cellLayoutManager = _props3.cellLayoutManager;
      var className = _props3.className;
      var height = _props3.height;
      var noContentRenderer = _props3.noContentRenderer;
      var width = _props3.width;
      var _state2 = this.state;
      var isScrolling = _state2.isScrolling;
      var scrollLeft = _state2.scrollLeft;
      var scrollTop = _state2.scrollTop;


      var childrenToDisplay = height > 0 && width > 0 ? cellLayoutManager.renderCells({
        height: height,
        isScrolling: isScrolling,
        width: width,
        x: scrollLeft,
        y: scrollTop
      }) : [];

      var _cellLayoutManager$ge2 = cellLayoutManager.getTotalSize();

      var totalHeight = _cellLayoutManager$ge2.height;
      var totalWidth = _cellLayoutManager$ge2.width;


      var gridStyle = {
        height: height,
        width: width
      };

      // Force browser to hide scrollbars when we know they aren't necessary.
      // Otherwise once scrollbars appear they may not disappear again.
      // For more info see issue #116
      if (totalHeight <= height) {
        gridStyle.overflowY = 'hidden';
      }
      if (totalWidth <= width) {
        gridStyle.overflowX = 'hidden';
      }

      return _react2.default.createElement(
        'div',
        {
          ref: 'scrollingContainer',
          'aria-label': this.props['aria-label'],
          className: (0, _classnames2.default)('Collection', className),
          onScroll: this._onScroll,
          role: 'grid',
          style: gridStyle,
          tabIndex: 0
        },
        childrenToDisplay.length > 0 && _react2.default.createElement(
          'div',
          {
            className: 'Collection__innerScrollContainer',
            style: {
              height: totalHeight,
              maxHeight: totalHeight,
              maxWidth: totalWidth,
              pointerEvents: isScrolling ? 'none' : 'auto',
              width: totalWidth
            }
          },
          childrenToDisplay
        ),
        childrenToDisplay.length === 0 && noContentRenderer()
      );
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }

    /* ---------------------------- Helper methods ---------------------------- */

    /**
     * Sets an :isScrolling flag for a small window of time.
     * This flag is used to disable pointer events on the scrollable portion of the Collection.
     * This prevents jerky/stuttery mouse-wheel scrolling.
     */

  }, {
    key: '_enablePointerEventsAfterDelay',
    value: function _enablePointerEventsAfterDelay() {
      var _this2 = this;

      if (this._disablePointerEventsTimeoutId) {
        clearTimeout(this._disablePointerEventsTimeoutId);
      }

      this._disablePointerEventsTimeoutId = setTimeout(function () {
        _this2._disablePointerEventsTimeoutId = null;
        _this2.setState({
          isScrolling: false
        });
      }, IS_SCROLLING_TIMEOUT);
    }
  }, {
    key: '_invokeOnSectionRenderedHelper',
    value: function _invokeOnSectionRenderedHelper() {
      var _props4 = this.props;
      var cellLayoutManager = _props4.cellLayoutManager;
      var onSectionRendered = _props4.onSectionRendered;


      this._onSectionRenderedMemoizer({
        callback: onSectionRendered,
        indices: cellLayoutManager.getLastRenderedIndices()
      });
    }
  }, {
    key: '_invokeOnScrollMemoizer',
    value: function _invokeOnScrollMemoizer(_ref) {
      var _this3 = this;

      var scrollLeft = _ref.scrollLeft;
      var scrollTop = _ref.scrollTop;
      var totalHeight = _ref.totalHeight;
      var totalWidth = _ref.totalWidth;

      this._onScrollMemoizer({
        callback: function callback(_ref2) {
          var scrollLeft = _ref2.scrollLeft;
          var scrollTop = _ref2.scrollTop;
          var _props5 = _this3.props;
          var height = _props5.height;
          var onScroll = _props5.onScroll;
          var width = _props5.width;


          onScroll({
            clientHeight: height,
            clientWidth: width,
            scrollHeight: totalHeight,
            scrollLeft: scrollLeft,
            scrollTop: scrollTop,
            scrollWidth: totalWidth
          });
        },
        indices: {
          scrollLeft: scrollLeft,
          scrollTop: scrollTop
        }
      });
    }

    /**
     * Updates the state during the next animation frame.
     * Use this method to avoid multiple renders in a small span of time.
     * This helps performance for bursty events (like onScroll).
     */

  }, {
    key: '_setNextState',
    value: function _setNextState(state) {
      var _this4 = this;

      if (this._setNextStateAnimationFrameId) {
        _raf2.default.cancel(this._setNextStateAnimationFrameId);
      }

      this._setNextStateAnimationFrameId = (0, _raf2.default)(function () {
        _this4._setNextStateAnimationFrameId = null;
        _this4.setState(state);
      });
    }
  }, {
    key: '_setScrollPosition',
    value: function _setScrollPosition(_ref3) {
      var scrollLeft = _ref3.scrollLeft;
      var scrollTop = _ref3.scrollTop;

      var newState = {
        scrollPositionChangeReason: SCROLL_POSITION_CHANGE_REASONS.REQUESTED
      };

      if (scrollLeft >= 0) {
        newState.scrollLeft = scrollLeft;
      }

      if (scrollTop >= 0) {
        newState.scrollTop = scrollTop;
      }

      if (scrollLeft >= 0 && scrollLeft !== this.state.scrollLeft || scrollTop >= 0 && scrollTop !== this.state.scrollTop) {
        this.setState(newState);
      }
    }
  }, {
    key: '_updateScrollPositionForScrollToCell',
    value: function _updateScrollPositionForScrollToCell() {
      var _props6 = this.props;
      var cellLayoutManager = _props6.cellLayoutManager;
      var height = _props6.height;
      var scrollToCell = _props6.scrollToCell;
      var width = _props6.width;
      var _state3 = this.state;
      var scrollLeft = _state3.scrollLeft;
      var scrollTop = _state3.scrollTop;


      if (scrollToCell >= 0) {
        var scrollPosition = cellLayoutManager.getScrollPositionForCell({
          cellIndex: scrollToCell,
          height: height,
          scrollLeft: scrollLeft,
          scrollTop: scrollTop,
          width: width
        });

        if (scrollPosition.scrollLeft !== scrollLeft || scrollPosition.scrollTop !== scrollTop) {
          this._setScrollPosition(scrollPosition);
        }
      }
    }
  }, {
    key: '_onScroll',
    value: function _onScroll(event) {
      // In certain edge-cases React dispatches an onScroll event with an invalid target.scrollLeft / target.scrollTop.
      // This invalid event can be detected by comparing event.target to this component's scrollable DOM element.
      // See issue #404 for more information.
      if (event.target !== this.refs.scrollingContainer) {
        return;
      }

      // Prevent pointer events from interrupting a smooth scroll
      this._enablePointerEventsAfterDelay();

      // When this component is shrunk drastically, React dispatches a series of back-to-back scroll events,
      // Gradually converging on a scrollTop that is within the bounds of the new, smaller height.
      // This causes a series of rapid renders that is slow for long lists.
      // We can avoid that by doing some simple bounds checking to ensure that scrollTop never exceeds the total height.
      var _props7 = this.props;
      var cellLayoutManager = _props7.cellLayoutManager;
      var height = _props7.height;
      var width = _props7.width;

      var scrollbarSize = this._scrollbarSize;

      var _cellLayoutManager$ge3 = cellLayoutManager.getTotalSize();

      var totalHeight = _cellLayoutManager$ge3.height;
      var totalWidth = _cellLayoutManager$ge3.width;

      var scrollLeft = Math.min(totalWidth - width + scrollbarSize, event.target.scrollLeft);
      var scrollTop = Math.min(totalHeight - height + scrollbarSize, event.target.scrollTop);

      // Certain devices (like Apple touchpad) rapid-fire duplicate events.
      // Don't force a re-render if this is the case.
      // The mouse may move faster then the animation frame does.
      // Use requestAnimationFrame to avoid over-updating.
      if (this.state.scrollLeft !== scrollLeft || this.state.scrollTop !== scrollTop) {
        // Browsers with cancelable scroll events (eg. Firefox) interrupt scrolling animations if scrollTop/scrollLeft is set.
        // Other browsers (eg. Safari) don't scroll as well without the help under certain conditions (DOM or style changes during scrolling).
        // All things considered, this seems to be the best current work around that I'm aware of.
        // For more information see https://github.com/bvaughn/react-virtualized/pull/124
        var scrollPositionChangeReason = event.cancelable ? SCROLL_POSITION_CHANGE_REASONS.OBSERVED : SCROLL_POSITION_CHANGE_REASONS.REQUESTED;

        // Synchronously set :isScrolling the first time (since _setNextState will reschedule its animation frame each time it's called)
        if (!this.state.isScrolling) {
          this.setState({
            isScrolling: true
          });
        }

        this._setNextState({
          isScrolling: true,
          scrollLeft: scrollLeft,
          scrollPositionChangeReason: scrollPositionChangeReason,
          scrollTop: scrollTop
        });
      }

      this._invokeOnScrollMemoizer({
        scrollLeft: scrollLeft,
        scrollTop: scrollTop,
        totalWidth: totalWidth,
        totalHeight: totalHeight
      });
    }
  }]);

  return CollectionView;
}(_react.Component);

CollectionView.propTypes = {
  'aria-label': _react.PropTypes.string,

  /**
   * Number of cells in collection.
   */
  cellCount: _react.PropTypes.number.isRequired,

  /**
   * Calculates cell sizes and positions and manages rendering the appropriate cells given a specified window.
   */
  cellLayoutManager: _react.PropTypes.object.isRequired,

  /**
   * Optional custom CSS class name to attach to root Collection element.
   */
  className: _react.PropTypes.string,

  /**
   * Height of Collection; this property determines the number of visible (vs virtualized) rows.
   */
  height: _react.PropTypes.number.isRequired,

  /**
   * Optional renderer to be used in place of rows when either :rowsCount or :cellCount is 0.
   */
  noContentRenderer: _react.PropTypes.func.isRequired,

  /**
   * Callback invoked whenever the scroll offset changes within the inner scrollable region.
   * This callback can be used to sync scrolling between lists, tables, or grids.
   * ({ clientHeight, clientWidth, scrollHeight, scrollLeft, scrollTop, scrollWidth }): void
   */
  onScroll: _react.PropTypes.func.isRequired,

  /**
   * Callback invoked with information about the section of the Collection that was just rendered.
   * This callback is passed an array of the most recently rendered section indices.
   */
  onSectionRendered: _react.PropTypes.func.isRequired,

  /**
   * Horizontal offset.
   */
  scrollLeft: _react.PropTypes.number,

  /**
   * Cell index to ensure visible (by forcefully scrolling if necessary).
   */
  scrollToCell: _react.PropTypes.number,

  /**
   * Vertical offset.
   */
  scrollTop: _react.PropTypes.number,

  /**
   * Width of Collection; this property determines the number of visible (vs virtualized) columns.
   */
  width: _react.PropTypes.number.isRequired
};
CollectionView.defaultProps = {
  'aria-label': 'grid',
  noContentRenderer: function noContentRenderer() {
    return null;
  },
  onScroll: function onScroll() {
    return null;
  },
  onSectionRendered: function onSectionRendered() {
    return null;
  }
};
exports.default = CollectionView;
},{"../utils/createCallbackMemoizer":64,"classnames":undefined,"dom-helpers/util/scrollbarSize":17,"raf":27,"react":undefined,"react-addons-shallow-compare":28}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A section of the Window.
 * Window Sections are used to group nearby cells.
 * This enables us to more quickly determine which cells to display in a given region of the Window.
 * Sections have a fixed size and contain 0 to many cells (tracked by their indices).
 */

var Section = function () {
  function Section(_ref) {
    var height = _ref.height;
    var width = _ref.width;
    var x = _ref.x;
    var y = _ref.y;

    _classCallCheck(this, Section);

    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;

    this._indexMap = {};
    this._indices = [];
  }

  /** Add a cell to this section. */


  _createClass(Section, [{
    key: 'addCellIndex',
    value: function addCellIndex(index) {
      if (!this._indexMap[index]) {
        this._indexMap[index] = true;
        this._indices.push(index);
      }
    }

    /** Get all cell indices that have been added to this section. */

  }, {
    key: 'getCellIndices',
    value: function getCellIndices() {
      return this._indices;
    }

    /** Intended for debugger/test purposes only */

  }, {
    key: 'toString',
    value: function toString() {
      return this.x + ',' + this.y + ' ' + this.width + 'x' + this.height;
    }
  }]);

  return Section;
}(); /** @rlow */


exports.default = Section;
},{}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Window Sections are used to group nearby cells.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This enables us to more quickly determine which cells to display in a given region of the Window.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _Section = require('./Section');

var _Section2 = _interopRequireDefault(_Section);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SECTION_SIZE = 100;

/**
 * Contains 0 to many Sections.
 * Grows (and adds Sections) dynamically as cells are registered.
 * Automatically adds cells to the appropriate Section(s).
 */

var SectionManager = function () {
  function SectionManager() {
    var sectionSize = arguments.length <= 0 || arguments[0] === undefined ? SECTION_SIZE : arguments[0];

    _classCallCheck(this, SectionManager);

    this._sectionSize = sectionSize;

    this._cellMetadata = [];
    this._sections = {};
  }

  /**
   * Gets all cell indices contained in the specified region.
   * A region may encompass 1 or more Sections.
   */


  _createClass(SectionManager, [{
    key: 'getCellIndices',
    value: function getCellIndices(_ref) {
      var height = _ref.height;
      var width = _ref.width;
      var x = _ref.x;
      var y = _ref.y;

      var indices = {};

      this.getSections({ height: height, width: width, x: x, y: y }).forEach(function (section) {
        return section.getCellIndices().forEach(function (index) {
          return indices[index] = index;
        });
      });

      // Object keys are strings; this function returns numbers
      return Object.keys(indices).map(function (index) {
        return indices[index];
      });
    }

    /** Get size and position information for the cell specified. */

  }, {
    key: 'getCellMetadata',
    value: function getCellMetadata(index) {
      return this._cellMetadata[index];
    }

    /** Get all Sections overlapping the specified region. */

  }, {
    key: 'getSections',
    value: function getSections(_ref2) {
      var height = _ref2.height;
      var width = _ref2.width;
      var x = _ref2.x;
      var y = _ref2.y;

      var sectionXStart = Math.floor(x / this._sectionSize);
      var sectionXStop = Math.floor((x + width - 1) / this._sectionSize);
      var sectionYStart = Math.floor(y / this._sectionSize);
      var sectionYStop = Math.floor((y + height - 1) / this._sectionSize);

      var sections = [];

      for (var sectionX = sectionXStart; sectionX <= sectionXStop; sectionX++) {
        for (var sectionY = sectionYStart; sectionY <= sectionYStop; sectionY++) {
          var key = sectionX + '.' + sectionY;

          if (!this._sections[key]) {
            this._sections[key] = new _Section2.default({
              height: this._sectionSize,
              width: this._sectionSize,
              x: sectionX * this._sectionSize,
              y: sectionY * this._sectionSize
            });
          }

          sections.push(this._sections[key]);
        }
      }

      return sections;
    }

    /** Total number of Sections based on the currently registered cells. */

  }, {
    key: 'getTotalSectionCount',
    value: function getTotalSectionCount() {
      return Object.keys(this._sections).length;
    }

    /** Intended for debugger/test purposes only */

  }, {
    key: 'toString',
    value: function toString() {
      var _this = this;

      return Object.keys(this._sections).map(function (index) {
        return _this._sections[index].toString();
      });
    }

    /** Adds a cell to the appropriate Sections and registers it metadata for later retrievable. */

  }, {
    key: 'registerCell',
    value: function registerCell(_ref3) {
      var cellMetadatum = _ref3.cellMetadatum;
      var index = _ref3.index;

      this._cellMetadata[index] = cellMetadatum;

      this.getSections(cellMetadatum).forEach(function (section) {
        return section.addCellIndex(index);
      });
    }
  }]);

  return SectionManager;
}();

exports.default = SectionManager;
},{"./Section":39}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Collection = exports.default = undefined;

var _Collection2 = require('./Collection');

var _Collection3 = _interopRequireDefault(_Collection2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Collection3.default;
exports.Collection = _Collection3.default;
},{"./Collection":37}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calculateSizeAndPositionData;

var _SectionManager = require('../SectionManager');

var _SectionManager2 = _interopRequireDefault(_SectionManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calculateSizeAndPositionData(_ref) {
  var cellCount = _ref.cellCount;
  var cellSizeAndPositionGetter = _ref.cellSizeAndPositionGetter;
  var sectionSize = _ref.sectionSize;

  var cellMetadata = [];
  var sectionManager = new _SectionManager2.default(sectionSize);
  var height = 0;
  var width = 0;

  for (var index = 0; index < cellCount; index++) {
    var cellMetadatum = cellSizeAndPositionGetter(index);

    if (cellMetadatum.height == null || isNaN(cellMetadatum.height) || cellMetadatum.width == null || isNaN(cellMetadatum.width) || cellMetadatum.x == null || isNaN(cellMetadatum.x) || cellMetadatum.y == null || isNaN(cellMetadatum.y)) {
      throw Error('Invalid metadata returned for cell ' + index + ':\n        x:' + cellMetadatum.x + ', y:' + cellMetadatum.y + ', width:' + cellMetadatum.width + ', height:' + cellMetadatum.height);
    }

    height = Math.max(height, cellMetadatum.y + cellMetadatum.height);
    width = Math.max(width, cellMetadatum.x + cellMetadatum.width);

    cellMetadata[index] = cellMetadatum;
    sectionManager.registerCell({
      cellMetadatum: cellMetadatum,
      index: index
    });
  }

  return {
    cellMetadata: cellMetadata,
    height: height,
    sectionManager: sectionManager,
    width: width
  };
}
},{"../SectionManager":40}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _Grid = require('../Grid');

var _Grid2 = _interopRequireDefault(_Grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * High-order component that auto-calculates column-widths for `Grid` cells.
 */

var ColumnSizer = function (_Component) {
  _inherits(ColumnSizer, _Component);

  function ColumnSizer(props, context) {
    _classCallCheck(this, ColumnSizer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ColumnSizer).call(this, props, context));

    _this._registerChild = _this._registerChild.bind(_this);
    return _this;
  }

  _createClass(ColumnSizer, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _props = this.props;
      var columnMaxWidth = _props.columnMaxWidth;
      var columnMinWidth = _props.columnMinWidth;
      var columnsCount = _props.columnsCount;
      var width = _props.width;


      if (columnMaxWidth !== prevProps.columnMaxWidth || columnMinWidth !== prevProps.columnMinWidth || columnsCount !== prevProps.columnsCount || width !== prevProps.width) {
        if (this._registeredChild) {
          this._registeredChild.recomputeGridSize();
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var children = _props2.children;
      var columnMaxWidth = _props2.columnMaxWidth;
      var columnMinWidth = _props2.columnMinWidth;
      var columnsCount = _props2.columnsCount;
      var width = _props2.width;


      var safeColumnMinWidth = columnMinWidth || 1;

      var safeColumnMaxWidth = columnMaxWidth ? Math.min(columnMaxWidth, width) : width;

      var columnWidth = width / columnsCount;
      columnWidth = Math.max(safeColumnMinWidth, columnWidth);
      columnWidth = Math.min(safeColumnMaxWidth, columnWidth);
      columnWidth = Math.floor(columnWidth);

      var adjustedWidth = Math.min(width, columnWidth * columnsCount);

      return children({
        adjustedWidth: adjustedWidth,
        getColumnWidth: function getColumnWidth() {
          return columnWidth;
        },
        registerChild: this._registerChild
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_registerChild',
    value: function _registerChild(child) {
      if (child !== null && !(child instanceof _Grid2.default)) {
        throw Error('Unexpected child type registered; only Grid children are supported.');
      }

      this._registeredChild = child;

      if (this._registeredChild) {
        this._registeredChild.recomputeGridSize();
      }
    }
  }]);

  return ColumnSizer;
}(_react.Component);

ColumnSizer.propTypes = {
  /**
   * Function respondible for rendering a virtualized Grid.
   * This function should implement the following signature:
   * ({ adjustedWidth, getColumnWidth, registerChild }) => PropTypes.element
   *
   * The specified :getColumnWidth function should be passed to the Grid's :columnWidth property.
   * The :registerChild should be passed to the Grid's :ref property.
   * The :adjustedWidth property is optional; it reflects the lesser of the overall width or the width of all columns.
   */
  children: _react.PropTypes.func.isRequired,

  /** Optional maximum allowed column width */
  columnMaxWidth: _react.PropTypes.number,

  /** Optional minimum allowed column width */
  columnMinWidth: _react.PropTypes.number,

  /** Number of columns in Grid or FlexTable child */
  columnsCount: _react.PropTypes.number.isRequired,

  /** Width of Grid or FlexTable child */
  width: _react.PropTypes.number.isRequired
};
exports.default = ColumnSizer;
},{"../Grid":51,"react":undefined,"react-addons-shallow-compare":28}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnSizer = exports.default = undefined;

var _ColumnSizer2 = require('./ColumnSizer');

var _ColumnSizer3 = _interopRequireDefault(_ColumnSizer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ColumnSizer3.default;
exports.ColumnSizer = _ColumnSizer3.default;
},{"./ColumnSizer":43}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultCellRenderer = defaultCellRenderer;
exports.defaultCellDataGetter = defaultCellDataGetter;
exports.defaultHeaderRenderer = defaultHeaderRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SortIndicator = require('./SortIndicator');

var _SortIndicator2 = _interopRequireDefault(_SortIndicator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Default cell renderer that displays an attribute as a simple string
 * You should override the column's cellRenderer if your data is some other type of object.
 */
function defaultCellRenderer(cellData, cellDataKey, rowData, rowIndex, columnData) {
  if (cellData === null || cellData === undefined) {
    return '';
  } else {
    return String(cellData);
  }
}

/**
 * Default accessor for returning a cell value for a given attribute.
 * This function expects to operate on either a vanilla Object or an Immutable Map.
 * You should override the column's cellDataGetter if your data is some other type of object.
 */
function defaultCellDataGetter(dataKey, rowData, columnData) {
  if (rowData.get instanceof Function) {
    return rowData.get(dataKey);
  } else {
    return rowData[dataKey];
  }
}

/**
 * Default table header renderer.
 */
function defaultHeaderRenderer(_ref) {
  var columnData = _ref.columnData;
  var dataKey = _ref.dataKey;
  var disableSort = _ref.disableSort;
  var label = _ref.label;
  var sortBy = _ref.sortBy;
  var sortDirection = _ref.sortDirection;

  var showSortIndicator = sortBy === dataKey;
  var children = [_react2.default.createElement(
    'div',
    {
      className: 'FlexTable__headerTruncatedText',
      key: 'label',
      title: label
    },
    label
  )];

  if (showSortIndicator) {
    children.push(_react2.default.createElement(_SortIndicator2.default, {
      key: 'SortIndicator',
      sortDirection: sortDirection
    }));
  }

  return children;
}

/**
 * Describes the header and cell contents of a table column.
 */

var Column = function (_Component) {
  _inherits(Column, _Component);

  function Column() {
    _classCallCheck(this, Column);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Column).apply(this, arguments));
  }

  return Column;
}(_react.Component);

Column.defaultProps = {
  cellDataGetter: defaultCellDataGetter,
  cellRenderer: defaultCellRenderer,
  flexGrow: 0,
  flexShrink: 1,
  headerRenderer: defaultHeaderRenderer
};
Column.propTypes = {
  /** Optional aria-label value to set on the column header */
  'aria-label': _react.PropTypes.string,

  /** Optional CSS class to apply to cell */
  cellClassName: _react.PropTypes.string,

  /**
   * Callback responsible for returning a cell's data, given its :dataKey
   * (dataKey: string, rowData: any): any
   */
  cellDataGetter: _react.PropTypes.func,

  /**
   * Callback responsible for rendering a cell's contents.
   * (cellData: any, cellDataKey: string, rowData: any, rowIndex: number, columnData: any): element
   */
  cellRenderer: _react.PropTypes.func,

  /** Optional additional data passed to this column's :cellDataGetter */
  columnData: _react.PropTypes.object,

  /** Uniquely identifies the row-data attribute correspnding to this cell */
  dataKey: _react.PropTypes.any.isRequired,

  /** If sort is enabled for the table at large, disable it for this column */
  disableSort: _react.PropTypes.bool,

  /** Flex grow style; defaults to 0 */
  flexGrow: _react.PropTypes.number,

  /** Flex shrink style; defaults to 1 */
  flexShrink: _react.PropTypes.number,

  /** Optional CSS class to apply to this column's header */
  headerClassName: _react.PropTypes.string,

  /**
   * Optional callback responsible for rendering a column header contents.
   * ({ columnData: object, dataKey: string, disableSort: boolean, label: string, sortBy: string, sortDirection: string }): PropTypes.node
   */
  headerRenderer: _react.PropTypes.func.isRequired,

  /** Header label for this column */
  label: _react.PropTypes.string,

  /** Maximum width of column; this property will only be used if :flexGrow is > 0. */
  maxWidth: _react.PropTypes.number,

  /** Minimum width of column. */
  minWidth: _react.PropTypes.number,

  /** Flex basis (width) for this column; This value can grow or shrink based on :flexGrow and :flexShrink properties. */
  width: _react.PropTypes.number.isRequired
};
exports.default = Column;
},{"./SortIndicator":48,"react":undefined}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _FlexColumn = require('./FlexColumn');

var _FlexColumn2 = _interopRequireDefault(_FlexColumn);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _Grid = require('../Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _SortDirection = require('./SortDirection');

var _SortDirection2 = _interopRequireDefault(_SortDirection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Table component with fixed headers and virtualized rows for improved performance with large data sets.
 * This component expects explicit width, height, and padding parameters.
 */

var FlexTable = function (_Component) {
  _inherits(FlexTable, _Component);

  function FlexTable(props) {
    _classCallCheck(this, FlexTable);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FlexTable).call(this, props));

    _this.state = {
      scrollbarWidth: 0
    };

    _this._createRow = _this._createRow.bind(_this);
    return _this;
  }

  /**
   * See Grid#recomputeGridSize
   */


  _createClass(FlexTable, [{
    key: 'recomputeRowHeights',
    value: function recomputeRowHeights() {
      this.refs.Grid.recomputeGridSize();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._setScrollbarWidth();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._setScrollbarWidth();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var className = _props.className;
      var disableHeader = _props.disableHeader;
      var headerHeight = _props.headerHeight;
      var height = _props.height;
      var noRowsRenderer = _props.noRowsRenderer;
      var onRowsRendered = _props.onRowsRendered;
      var _onScroll = _props.onScroll;
      var overscanRowsCount = _props.overscanRowsCount;
      var rowClassName = _props.rowClassName;
      var rowHeight = _props.rowHeight;
      var rowsCount = _props.rowsCount;
      var scrollToIndex = _props.scrollToIndex;
      var scrollTop = _props.scrollTop;
      var width = _props.width;
      var scrollbarWidth = this.state.scrollbarWidth;


      var availableRowsHeight = height - headerHeight;

      // This row-renderer wrapper function is necessary in order to trigger re-render when the
      // sort-by or sort-direction have changed (else Grid will not see any props changes)
      var rowRenderer = function rowRenderer(index) {
        return _this2._createRow(index);
      };

      var rowClass = rowClassName instanceof Function ? rowClassName(-1) : rowClassName;

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('FlexTable', className)
        },
        !disableHeader && _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)('FlexTable__headerRow', rowClass),
            style: {
              height: headerHeight,
              paddingRight: scrollbarWidth,
              width: width
            }
          },
          this._getRenderedHeaderRow()
        ),
        _react2.default.createElement(_Grid2.default, {
          'aria-label': this.props['aria-label'],
          ref: 'Grid',
          className: 'FlexTable__Grid',
          columnWidth: width,
          columnsCount: 1,
          height: availableRowsHeight,
          noContentRenderer: noRowsRenderer,
          onScroll: function onScroll(_ref) {
            var clientHeight = _ref.clientHeight;
            var scrollHeight = _ref.scrollHeight;
            var scrollTop = _ref.scrollTop;
            return _onScroll({ clientHeight: clientHeight, scrollHeight: scrollHeight, scrollTop: scrollTop });
          },
          onSectionRendered: function onSectionRendered(_ref2) {
            var rowOverscanStartIndex = _ref2.rowOverscanStartIndex;
            var rowOverscanStopIndex = _ref2.rowOverscanStopIndex;
            var rowStartIndex = _ref2.rowStartIndex;
            var rowStopIndex = _ref2.rowStopIndex;
            return onRowsRendered({
              overscanStartIndex: rowOverscanStartIndex,
              overscanStopIndex: rowOverscanStopIndex,
              startIndex: rowStartIndex,
              stopIndex: rowStopIndex
            });
          },
          overscanRowsCount: overscanRowsCount,
          renderCell: function renderCell(_ref3) {
            var columnIndex = _ref3.columnIndex;
            var rowIndex = _ref3.rowIndex;
            return rowRenderer(rowIndex);
          },
          rowHeight: rowHeight,
          rowsCount: rowsCount,
          scrollToRow: scrollToIndex,
          scrollTop: scrollTop,
          width: width
        })
      );
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_createColumn',
    value: function _createColumn(column, columnIndex, rowData, rowIndex) {
      var _column$props = column.props;
      var cellClassName = _column$props.cellClassName;
      var cellDataGetter = _column$props.cellDataGetter;
      var columnData = _column$props.columnData;
      var dataKey = _column$props.dataKey;
      var cellRenderer = _column$props.cellRenderer;

      var cellData = cellDataGetter(dataKey, rowData, columnData);
      var renderedCell = cellRenderer(cellData, dataKey, rowData, rowIndex, columnData);

      var style = this._getFlexStyleForColumn(column);

      var title = typeof renderedCell === 'string' ? renderedCell : null;

      return _react2.default.createElement(
        'div',
        {
          key: 'Row' + rowIndex + '-Col' + columnIndex,
          className: (0, _classnames2.default)('FlexTable__rowColumn', cellClassName),
          style: style
        },
        _react2.default.createElement(
          'div',
          {
            className: 'FlexTable__truncatedColumnText',
            title: title
          },
          renderedCell
        )
      );
    }
  }, {
    key: '_createHeader',
    value: function _createHeader(column, columnIndex) {
      var _props2 = this.props;
      var headerClassName = _props2.headerClassName;
      var onHeaderClick = _props2.onHeaderClick;
      var sort = _props2.sort;
      var sortBy = _props2.sortBy;
      var sortDirection = _props2.sortDirection;
      var _column$props2 = column.props;
      var dataKey = _column$props2.dataKey;
      var disableSort = _column$props2.disableSort;
      var headerRenderer = _column$props2.headerRenderer;
      var label = _column$props2.label;
      var columnData = _column$props2.columnData;

      var sortEnabled = !disableSort && sort;

      var classNames = (0, _classnames2.default)('FlexTable__headerColumn', headerClassName, column.props.headerClassName, {
        'FlexTable__sortableHeaderColumn': sortEnabled
      });
      var style = this._getFlexStyleForColumn(column);

      var renderedHeader = headerRenderer({
        columnData: columnData,
        dataKey: dataKey,
        disableSort: disableSort,
        label: label,
        sortBy: sortBy,
        sortDirection: sortDirection
      });

      var a11yProps = {};

      if (sortEnabled || onHeaderClick) {
        (function () {
          // If this is a sortable header, clicking it should update the table data's sorting.
          var newSortDirection = sortBy !== dataKey || sortDirection === _SortDirection2.default.DESC ? _SortDirection2.default.ASC : _SortDirection2.default.DESC;

          var onClick = function onClick() {
            sortEnabled && sort(dataKey, newSortDirection);
            onHeaderClick && onHeaderClick(dataKey, columnData);
          };

          var onKeyDown = function onKeyDown(event) {
            if (event.key === 'Enter' || event.key === ' ') {
              onClick();
            }
          };

          a11yProps['aria-label'] = column.props['aria-label'] || label || dataKey;
          a11yProps.role = 'rowheader';
          a11yProps.tabIndex = 0;
          a11yProps.onClick = onClick;
          a11yProps.onKeyDown = onKeyDown;
        })();
      }

      return _react2.default.createElement(
        'div',
        _extends({}, a11yProps, {
          key: 'Header-Col' + columnIndex,
          className: classNames,
          style: style
        }),
        renderedHeader
      );
    }
  }, {
    key: '_createRow',
    value: function _createRow(rowIndex) {
      var _this3 = this;

      var _props3 = this.props;
      var children = _props3.children;
      var onRowClick = _props3.onRowClick;
      var rowClassName = _props3.rowClassName;
      var rowGetter = _props3.rowGetter;
      var scrollbarWidth = this.state.scrollbarWidth;


      var rowClass = rowClassName instanceof Function ? rowClassName(rowIndex) : rowClassName;
      var rowData = rowGetter(rowIndex);

      var renderedRow = _react2.default.Children.toArray(children).map(function (column, columnIndex) {
        return _this3._createColumn(column, columnIndex, rowData, rowIndex);
      });

      var a11yProps = {};

      if (onRowClick) {
        a11yProps['aria-label'] = 'row';
        a11yProps.role = 'row';
        a11yProps.tabIndex = 0;
        a11yProps.onClick = function () {
          return onRowClick(rowIndex);
        };
      }

      return _react2.default.createElement(
        'div',
        _extends({}, a11yProps, {
          key: rowIndex,
          className: (0, _classnames2.default)('FlexTable__row', rowClass),
          style: {
            height: this._getRowHeight(rowIndex),
            paddingRight: scrollbarWidth
          }
        }),
        renderedRow
      );
    }

    /**
     * Determines the flex-shrink, flex-grow, and width values for a cell (header or column).
     */

  }, {
    key: '_getFlexStyleForColumn',
    value: function _getFlexStyleForColumn(column) {
      var flexValue = column.props.flexGrow + ' ' + column.props.flexShrink + ' ' + column.props.width + 'px';

      var style = {
        flex: flexValue,
        msFlex: flexValue,
        WebkitFlex: flexValue
      };

      if (column.props.maxWidth) {
        style.maxWidth = column.props.maxWidth;
      }

      if (column.props.minWidth) {
        style.minWidth = column.props.minWidth;
      }

      return style;
    }
  }, {
    key: '_getRenderedHeaderRow',
    value: function _getRenderedHeaderRow() {
      var _this4 = this;

      var _props4 = this.props;
      var children = _props4.children;
      var disableHeader = _props4.disableHeader;

      var items = disableHeader ? [] : _react2.default.Children.toArray(children);

      return items.map(function (column, index) {
        return _this4._createHeader(column, index);
      });
    }
  }, {
    key: '_getRowHeight',
    value: function _getRowHeight(rowIndex) {
      var rowHeight = this.props.rowHeight;


      return rowHeight instanceof Function ? rowHeight(rowIndex) : rowHeight;
    }
  }, {
    key: '_setScrollbarWidth',
    value: function _setScrollbarWidth() {
      var Grid = (0, _reactDom.findDOMNode)(this.refs.Grid);
      var clientWidth = Grid.clientWidth || 0;
      var offsetWidth = Grid.offsetWidth || 0;
      var scrollbarWidth = offsetWidth - clientWidth;

      this.setState({ scrollbarWidth: scrollbarWidth });
    }
  }]);

  return FlexTable;
}(_react.Component);

FlexTable.propTypes = {
  'aria-label': _react.PropTypes.string,

  /** One or more FlexColumns describing the data displayed in this row */
  children: function children(props, propName, componentName) {
    var children = _react2.default.Children.toArray(props.children);
    for (var i = 0; i < children.length; i++) {
      if (children[i].type !== _FlexColumn2.default) {
        return new Error('FlexTable only accepts children of type FlexColumn');
      }
    }
  },

  /** Optional CSS class name */
  className: _react.PropTypes.string,

  /** Disable rendering the header at all */
  disableHeader: _react.PropTypes.bool,

  /** Optional CSS class to apply to all column headers */
  headerClassName: _react.PropTypes.string,

  /** Fixed height of header row */
  headerHeight: _react.PropTypes.number.isRequired,

  /** Fixed/available height for out DOM element */
  height: _react.PropTypes.number.isRequired,

  /** Optional renderer to be used in place of table body rows when rowsCount is 0 */
  noRowsRenderer: _react.PropTypes.func,

  /**
  * Optional callback when a column's header is clicked.
  * (dataKey: string): void
  */
  onHeaderClick: _react.PropTypes.func,

  /**
   * Callback invoked when a user clicks on a table row.
   * (rowIndex: number): void
   */
  onRowClick: _react.PropTypes.func,

  /**
   * Callback invoked with information about the slice of rows that were just rendered.
   * ({ startIndex, stopIndex }): void
   */
  onRowsRendered: _react.PropTypes.func,

  /**
   * Callback invoked whenever the scroll offset changes within the inner scrollable region.
   * This callback can be used to sync scrolling between lists, tables, or grids.
   * ({ clientHeight, scrollHeight, scrollTop }): void
   */
  onScroll: _react.PropTypes.func.isRequired,

  /**
   * Number of rows to render above/below the visible bounds of the list.
   * These rows can help for smoother scrolling on touch devices.
   */
  overscanRowsCount: _react.PropTypes.number.isRequired,

  /**
   * Optional CSS class to apply to all table rows (including the header row).
   * This property can be a CSS class name (string) or a function that returns a class name.
   * If a function is provided its signature should be: (rowIndex: number): string
   */
  rowClassName: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),

  /**
   * Callback responsible for returning a data row given an index.
   * (index: number): any
   */
  rowGetter: _react.PropTypes.func.isRequired,

  /**
   * Either a fixed row height (number) or a function that returns the height of a row given its index.
   * (index: number): number
   */
  rowHeight: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]).isRequired,

  /** Number of rows in table. */
  rowsCount: _react.PropTypes.number.isRequired,

  /** Row index to ensure visible (by forcefully scrolling if necessary) */
  scrollToIndex: _react.PropTypes.number,

  /** Vertical offset. */
  scrollTop: _react.PropTypes.number,

  /**
   * Sort function to be called if a sortable header is clicked.
   * (dataKey: string, sortDirection: SortDirection): void
   */
  sort: _react.PropTypes.func,

  /** FlexTable data is currently sorted by this :dataKey (if it is sorted at all) */
  sortBy: _react.PropTypes.string,

  /** FlexTable data is currently sorted in this direction (if it is sorted at all) */
  sortDirection: _react.PropTypes.oneOf([_SortDirection2.default.ASC, _SortDirection2.default.DESC]),

  /** Width of list */
  width: _react.PropTypes.number.isRequired
};
FlexTable.defaultProps = {
  disableHeader: false,
  headerHeight: 0,
  noRowsRenderer: function noRowsRenderer() {
    return null;
  },
  onRowsRendered: function onRowsRendered() {
    return null;
  },
  onScroll: function onScroll() {
    return null;
  },
  overscanRowsCount: 10
};
exports.default = FlexTable;
},{"../Grid":51,"./FlexColumn":45,"./SortDirection":47,"classnames":undefined,"react":undefined,"react-addons-shallow-compare":28,"react-dom":undefined}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SortDirection = {
  /**
   * Sort items in ascending order.
   * This means arranging from the lowest value to the highest (e.g. a-z, 0-9).
   */
  ASC: 'ASC',

  /**
   * Sort items in descending order.
   * This means arranging from the highest value to the lowest (e.g. z-a, 9-0).
   */
  DESC: 'DESC'
};

exports.default = SortDirection;
},{}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SortIndicator;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _SortDirection = require('./SortDirection');

var _SortDirection2 = _interopRequireDefault(_SortDirection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Displayed beside a header to indicate that a FlexTable is currently sorted by this column.
 */
function SortIndicator(_ref) {
  var sortDirection = _ref.sortDirection;

  var classNames = (0, _classnames2.default)('FlexTable__sortableHeaderIcon', {
    'FlexTable__sortableHeaderIcon--ASC': sortDirection === _SortDirection2.default.ASC,
    'FlexTable__sortableHeaderIcon--DESC': sortDirection === _SortDirection2.default.DESC
  });

  return _react2.default.createElement(
    'svg',
    {
      className: classNames,
      width: 18,
      height: 18,
      viewBox: '0 0 24 24',
      xmlns: 'http://www.w3.org/2000/svg'
    },
    sortDirection === _SortDirection2.default.ASC ? _react2.default.createElement('path', { d: 'M7 14l5-5 5 5z' }) : _react2.default.createElement('path', { d: 'M7 10l5 5 5-5z' }),
    _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
  );
}
SortIndicator.propTypes = {
  sortDirection: _react.PropTypes.oneOf([_SortDirection2.default.ASC, _SortDirection2.default.DESC])
};
},{"./SortDirection":47,"classnames":undefined,"react":undefined}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortIndicator = exports.SortDirection = exports.FlexColumn = exports.FlexTable = exports.default = undefined;

var _FlexTable2 = require('./FlexTable');

var _FlexTable3 = _interopRequireDefault(_FlexTable2);

var _FlexColumn2 = require('./FlexColumn');

var _FlexColumn3 = _interopRequireDefault(_FlexColumn2);

var _SortDirection2 = require('./SortDirection');

var _SortDirection3 = _interopRequireDefault(_SortDirection2);

var _SortIndicator2 = require('./SortIndicator');

var _SortIndicator3 = _interopRequireDefault(_SortIndicator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _FlexTable3.default;
exports.FlexTable = _FlexTable3.default;
exports.FlexColumn = _FlexColumn3.default;
exports.SortDirection = _SortDirection3.default;
exports.SortIndicator = _SortIndicator3.default;
},{"./FlexColumn":45,"./FlexTable":46,"./SortDirection":47,"./SortIndicator":48}],50:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _calculateSizeAndPositionDataAndUpdateScrollOffset = require('./utils/calculateSizeAndPositionDataAndUpdateScrollOffset');

var _calculateSizeAndPositionDataAndUpdateScrollOffset2 = _interopRequireDefault(_calculateSizeAndPositionDataAndUpdateScrollOffset);

var _createCallbackMemoizer = require('../utils/createCallbackMemoizer');

var _createCallbackMemoizer2 = _interopRequireDefault(_createCallbackMemoizer);

var _getNearestIndex = require('./utils/getNearestIndex');

var _getNearestIndex2 = _interopRequireDefault(_getNearestIndex);

var _getOverscanIndices = require('./utils/getOverscanIndices');

var _getOverscanIndices2 = _interopRequireDefault(_getOverscanIndices);

var _scrollbarSize = require('dom-helpers/util/scrollbarSize');

var _scrollbarSize2 = _interopRequireDefault(_scrollbarSize);

var _getUpdatedOffsetForIndex = require('../utils/getUpdatedOffsetForIndex');

var _getUpdatedOffsetForIndex2 = _interopRequireDefault(_getUpdatedOffsetForIndex);

var _getVisibleCellIndices = require('./utils/getVisibleCellIndices');

var _getVisibleCellIndices2 = _interopRequireDefault(_getVisibleCellIndices);

var _initCellMetadata = require('../utils/initCellMetadata');

var _initCellMetadata2 = _interopRequireDefault(_initCellMetadata);

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _updateScrollIndexHelper = require('./utils/updateScrollIndexHelper');

var _updateScrollIndexHelper2 = _interopRequireDefault(_updateScrollIndexHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Specifies the number of miliseconds during which to disable pointer events while a scroll is in progress.
 * This improves performance and makes scrolling smoother.
 */
var IS_SCROLLING_TIMEOUT = 150;

/**
 * Controls whether the Grid updates the DOM element's scrollLeft/scrollTop based on the current state or just observes it.
 * This prevents Grid from interrupting mouse-wheel animations (see issue #2).
 */
var SCROLL_POSITION_CHANGE_REASONS = {
  OBSERVED: 'observed',
  REQUESTED: 'requested'
};

/**
 * Renders tabular data with virtualization along the vertical and horizontal axes.
 * Row heights and column widths must be known ahead of time and specified as properties.
 */

var Grid = function (_Component) {
  _inherits(Grid, _Component);

  function Grid(props, context) {
    _classCallCheck(this, Grid);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Grid).call(this, props, context));

    _this.state = {
      computeGridMetadataOnNextUpdate: false,
      isScrolling: false,
      scrollLeft: 0,
      scrollTop: 0
    };

    // Invokes onSectionRendered callback only when start/stop row or column indices change
    _this._onGridRenderedMemoizer = (0, _createCallbackMemoizer2.default)();
    _this._onScrollMemoizer = (0, _createCallbackMemoizer2.default)(false);

    // Bind functions to instance so they don't lose context when passed around
    _this._computeColumnMetadata = _this._computeColumnMetadata.bind(_this);
    _this._computeRowMetadata = _this._computeRowMetadata.bind(_this);
    _this._invokeOnGridRenderedHelper = _this._invokeOnGridRenderedHelper.bind(_this);
    _this._onScroll = _this._onScroll.bind(_this);
    _this._updateScrollLeftForScrollToColumn = _this._updateScrollLeftForScrollToColumn.bind(_this);
    _this._updateScrollTopForScrollToRow = _this._updateScrollTopForScrollToRow.bind(_this);
    return _this;
  }

  /**
   * Forced recompute of row heights and column widths.
   * This function should be called if dynamic column or row sizes have changed but nothing else has.
   * Since Grid only receives :columnsCount and :rowsCount it has no way of detecting when the underlying data changes.
   */


  _createClass(Grid, [{
    key: 'recomputeGridSize',
    value: function recomputeGridSize() {
      this.setState({
        computeGridMetadataOnNextUpdate: true
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props;
      var scrollLeft = _props.scrollLeft;
      var scrollToColumn = _props.scrollToColumn;
      var scrollTop = _props.scrollTop;
      var scrollToRow = _props.scrollToRow;


      this._scrollbarSize = (0, _scrollbarSize2.default)();

      if (scrollLeft >= 0 || scrollTop >= 0) {
        this._setScrollPosition({ scrollLeft: scrollLeft, scrollTop: scrollTop });
      }

      if (scrollToColumn >= 0 || scrollToRow >= 0) {
        this._updateScrollLeftForScrollToColumn();
        this._updateScrollTopForScrollToRow();
      }

      // Update onRowsRendered callback
      this._invokeOnGridRenderedHelper();

      // Initialize onScroll callback
      this._invokeOnScrollMemoizer({
        scrollLeft: scrollLeft || 0,
        scrollTop: scrollTop || 0,
        totalColumnsWidth: this._getTotalColumnsWidth(),
        totalRowsHeight: this._getTotalRowsHeight()
      });
    }

    /**
     * @private
     * This method updates scrollLeft/scrollTop in state for the following conditions:
     * 1) New scroll-to-cell props have been set
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      var _props2 = this.props;
      var columnsCount = _props2.columnsCount;
      var columnWidth = _props2.columnWidth;
      var height = _props2.height;
      var rowHeight = _props2.rowHeight;
      var rowsCount = _props2.rowsCount;
      var scrollToColumn = _props2.scrollToColumn;
      var scrollToRow = _props2.scrollToRow;
      var width = _props2.width;
      var _state = this.state;
      var scrollLeft = _state.scrollLeft;
      var scrollPositionChangeReason = _state.scrollPositionChangeReason;
      var scrollTop = _state.scrollTop;

      // Make sure requested changes to :scrollLeft or :scrollTop get applied.
      // Assigning to scrollLeft/scrollTop tells the browser to interrupt any running scroll animations,
      // And to discard any pending async changes to the scroll position that may have happened in the meantime (e.g. on a separate scrolling thread).
      // So we only set these when we require an adjustment of the scroll position.
      // See issue #2 for more information.

      if (scrollPositionChangeReason === SCROLL_POSITION_CHANGE_REASONS.REQUESTED) {
        if (scrollLeft >= 0 && scrollLeft !== prevState.scrollLeft && scrollLeft !== this.refs.scrollingContainer.scrollLeft) {
          this.refs.scrollingContainer.scrollLeft = scrollLeft;
        }
        if (scrollTop >= 0 && scrollTop !== prevState.scrollTop && scrollTop !== this.refs.scrollingContainer.scrollTop) {
          this.refs.scrollingContainer.scrollTop = scrollTop;
        }
      }

      // Update scroll offsets if the current :scrollToColumn or :scrollToRow values requires it
      // @TODO Do we also need this check or can the one in componentWillUpdate() suffice?
      (0, _updateScrollIndexHelper2.default)({
        cellCount: columnsCount,
        cellMetadata: this._columnMetadata,
        cellSize: columnWidth,
        previousCellsCount: prevProps.columnsCount,
        previousCellSize: prevProps.columnWidth,
        previousScrollToIndex: prevProps.scrollToColumn,
        previousSize: prevProps.width,
        scrollOffset: scrollLeft,
        scrollToIndex: scrollToColumn,
        size: width,
        updateScrollIndexCallback: function updateScrollIndexCallback(scrollToColumn) {
          return _this2._updateScrollLeftForScrollToColumn(_extends({}, _this2.props, { scrollToColumn: scrollToColumn }));
        }
      });
      (0, _updateScrollIndexHelper2.default)({
        cellCount: rowsCount,
        cellMetadata: this._rowMetadata,
        cellSize: rowHeight,
        previousCellsCount: prevProps.rowsCount,
        previousCellSize: prevProps.rowHeight,
        previousScrollToIndex: prevProps.scrollToRow,
        previousSize: prevProps.height,
        scrollOffset: scrollTop,
        scrollToIndex: scrollToRow,
        size: height,
        updateScrollIndexCallback: function updateScrollIndexCallback(scrollToRow) {
          return _this2._updateScrollTopForScrollToRow(_extends({}, _this2.props, { scrollToRow: scrollToRow }));
        }
      });

      // Update onRowsRendered callback if start/stop indices have changed
      this._invokeOnGridRenderedHelper();
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._computeColumnMetadata(this.props);
      this._computeRowMetadata(this.props);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._disablePointerEventsTimeoutId) {
        clearTimeout(this._disablePointerEventsTimeoutId);
      }

      if (this._setNextStateAnimationFrameId) {
        _raf2.default.cancel(this._setNextStateAnimationFrameId);
      }
    }

    /**
     * @private
     * This method updates scrollLeft/scrollTop in state for the following conditions:
     * 1) Empty content (0 rows or columns)
     * 2) New scroll props overriding the current state
     * 3) Cells-count or cells-size has changed, making previous scroll offsets invalid
     */

  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      var _this3 = this;

      if (nextProps.columnsCount === 0 && nextState.scrollLeft !== 0 || nextProps.rowsCount === 0 && nextState.scrollTop !== 0) {
        this._setScrollPosition({
          scrollLeft: 0,
          scrollTop: 0
        });
      } else if (nextProps.scrollLeft !== this.props.scrollLeft || nextProps.scrollTop !== this.props.scrollTop) {
        this._setScrollPosition({
          scrollLeft: nextProps.scrollLeft,
          scrollTop: nextProps.scrollTop
        });
      }

      // Update scroll offsets if the size or number of cells have changed, invalidating the previous value
      (0, _calculateSizeAndPositionDataAndUpdateScrollOffset2.default)({
        cellCount: this.props.columnsCount,
        cellSize: this.props.columnWidth,
        computeMetadataCallback: this._computeColumnMetadata,
        computeMetadataCallbackProps: nextProps,
        computeMetadataOnNextUpdate: nextState.computeGridMetadataOnNextUpdate,
        nextCellsCount: nextProps.columnsCount,
        nextCellSize: nextProps.columnWidth,
        nextScrollToIndex: nextProps.scrollToColumn,
        scrollToIndex: this.props.scrollToColumn,
        updateScrollOffsetForScrollToIndex: function updateScrollOffsetForScrollToIndex() {
          return _this3._updateScrollLeftForScrollToColumn(nextProps, nextState);
        }
      });
      (0, _calculateSizeAndPositionDataAndUpdateScrollOffset2.default)({
        cellCount: this.props.rowsCount,
        cellSize: this.props.rowHeight,
        computeMetadataCallback: this._computeRowMetadata,
        computeMetadataCallbackProps: nextProps,
        computeMetadataOnNextUpdate: nextState.computeGridMetadataOnNextUpdate,
        nextCellsCount: nextProps.rowsCount,
        nextCellSize: nextProps.rowHeight,
        nextScrollToIndex: nextProps.scrollToRow,
        scrollToIndex: this.props.scrollToRow,
        updateScrollOffsetForScrollToIndex: function updateScrollOffsetForScrollToIndex() {
          return _this3._updateScrollTopForScrollToRow(nextProps, nextState);
        }
      });

      this.setState({
        computeGridMetadataOnNextUpdate: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var className = _props3.className;
      var columnsCount = _props3.columnsCount;
      var height = _props3.height;
      var noContentRenderer = _props3.noContentRenderer;
      var overscanColumnsCount = _props3.overscanColumnsCount;
      var overscanRowsCount = _props3.overscanRowsCount;
      var renderCell = _props3.renderCell;
      var renderCellRanges = _props3.renderCellRanges;
      var rowsCount = _props3.rowsCount;
      var width = _props3.width;
      var _state2 = this.state;
      var isScrolling = _state2.isScrolling;
      var scrollLeft = _state2.scrollLeft;
      var scrollTop = _state2.scrollTop;


      var childrenToDisplay = [];

      // Render only enough columns and rows to cover the visible area of the grid.
      if (height > 0 && width > 0) {
        var visibleColumnIndices = (0, _getVisibleCellIndices2.default)({
          cellMetadata: this._columnMetadata,
          containerSize: width,
          currentOffset: scrollLeft
        });

        var visibleRowIndices = (0, _getVisibleCellIndices2.default)({
          cellMetadata: this._rowMetadata,
          containerSize: height,
          currentOffset: scrollTop
        });

        // Store for _invokeOnGridRenderedHelper()
        this._renderedColumnStartIndex = visibleColumnIndices.start;
        this._renderedColumnStopIndex = visibleColumnIndices.stop;
        this._renderedRowStartIndex = visibleRowIndices.start;
        this._renderedRowStopIndex = visibleRowIndices.stop;

        var overscanColumnIndices = (0, _getOverscanIndices2.default)({
          cellCount: columnsCount,
          overscanCellsCount: overscanColumnsCount,
          startIndex: this._renderedColumnStartIndex,
          stopIndex: this._renderedColumnStopIndex
        });

        var overscanRowIndices = (0, _getOverscanIndices2.default)({
          cellCount: rowsCount,
          overscanCellsCount: overscanRowsCount,
          startIndex: this._renderedRowStartIndex,
          stopIndex: this._renderedRowStopIndex
        });

        // Store for _invokeOnGridRenderedHelper()
        this._columnStartIndex = overscanColumnIndices.overscanStartIndex;
        this._columnStopIndex = overscanColumnIndices.overscanStopIndex;
        this._rowStartIndex = overscanRowIndices.overscanStartIndex;
        this._rowStopIndex = overscanRowIndices.overscanStopIndex;

        childrenToDisplay = renderCellRanges({
          columnMetadata: this._columnMetadata,
          columnStartIndex: this._columnStartIndex,
          columnStopIndex: this._columnStopIndex,
          renderCell: renderCell,
          rowMetadata: this._rowMetadata,
          rowStartIndex: this._rowStartIndex,
          rowStopIndex: this._rowStopIndex
        });
      }

      var gridStyle = {
        height: height,
        width: width
      };

      var totalColumnsWidth = this._getTotalColumnsWidth();
      var totalRowsHeight = this._getTotalRowsHeight();

      // Force browser to hide scrollbars when we know they aren't necessary.
      // Otherwise once scrollbars appear they may not disappear again.
      // For more info see issue #116
      if (totalColumnsWidth <= width) {
        gridStyle.overflowX = 'hidden';
      }

      if (totalRowsHeight <= height) {
        gridStyle.overflowY = 'hidden';
      }

      return _react2.default.createElement(
        'div',
        {
          ref: 'scrollingContainer',
          'aria-label': this.props['aria-label'],
          className: (0, _classnames2.default)('Grid', className),
          onScroll: this._onScroll,
          role: 'grid',
          style: gridStyle,
          tabIndex: 0
        },
        childrenToDisplay.length > 0 && _react2.default.createElement(
          'div',
          {
            className: 'Grid__innerScrollContainer',
            style: {
              width: totalColumnsWidth,
              height: totalRowsHeight,
              maxWidth: totalColumnsWidth,
              maxHeight: totalRowsHeight,
              pointerEvents: isScrolling ? 'none' : 'auto'
            }
          },
          childrenToDisplay
        ),
        childrenToDisplay.length === 0 && noContentRenderer()
      );
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }

    /* ---------------------------- Helper methods ---------------------------- */

  }, {
    key: '_computeColumnMetadata',
    value: function _computeColumnMetadata(props) {
      var columnsCount = props.columnsCount;
      var columnWidth = props.columnWidth;


      this._columnMetadata = (0, _initCellMetadata2.default)({
        cellCount: columnsCount,
        size: columnWidth
      });
    }
  }, {
    key: '_computeRowMetadata',
    value: function _computeRowMetadata(props) {
      var rowHeight = props.rowHeight;
      var rowsCount = props.rowsCount;


      this._rowMetadata = (0, _initCellMetadata2.default)({
        cellCount: rowsCount,
        size: rowHeight
      });
    }

    /**
     * Sets an :isScrolling flag for a small window of time.
     * This flag is used to disable pointer events on the scrollable portion of the Grid.
     * This prevents jerky/stuttery mouse-wheel scrolling.
     */

  }, {
    key: '_enablePointerEventsAfterDelay',
    value: function _enablePointerEventsAfterDelay() {
      var _this4 = this;

      if (this._disablePointerEventsTimeoutId) {
        clearTimeout(this._disablePointerEventsTimeoutId);
      }

      this._disablePointerEventsTimeoutId = setTimeout(function () {
        _this4._disablePointerEventsTimeoutId = null;
        _this4.setState({
          isScrolling: false
        });
      }, IS_SCROLLING_TIMEOUT);
    }
  }, {
    key: '_getTotalColumnsWidth',
    value: function _getTotalColumnsWidth() {
      if (this._columnMetadata.length === 0) {
        return 0;
      }

      var datum = this._columnMetadata[this._columnMetadata.length - 1];
      return datum.offset + datum.size;
    }
  }, {
    key: '_getTotalRowsHeight',
    value: function _getTotalRowsHeight() {
      if (this._rowMetadata.length === 0) {
        return 0;
      }

      var datum = this._rowMetadata[this._rowMetadata.length - 1];
      return datum.offset + datum.size;
    }
  }, {
    key: '_invokeOnGridRenderedHelper',
    value: function _invokeOnGridRenderedHelper() {
      var onSectionRendered = this.props.onSectionRendered;


      this._onGridRenderedMemoizer({
        callback: onSectionRendered,
        indices: {
          columnOverscanStartIndex: this._columnStartIndex,
          columnOverscanStopIndex: this._columnStopIndex,
          columnStartIndex: this._renderedColumnStartIndex,
          columnStopIndex: this._renderedColumnStopIndex,
          rowOverscanStartIndex: this._rowStartIndex,
          rowOverscanStopIndex: this._rowStopIndex,
          rowStartIndex: this._renderedRowStartIndex,
          rowStopIndex: this._renderedRowStopIndex
        }
      });
    }
  }, {
    key: '_invokeOnScrollMemoizer',
    value: function _invokeOnScrollMemoizer(_ref) {
      var _this5 = this;

      var scrollLeft = _ref.scrollLeft;
      var scrollTop = _ref.scrollTop;
      var totalColumnsWidth = _ref.totalColumnsWidth;
      var totalRowsHeight = _ref.totalRowsHeight;

      this._onScrollMemoizer({
        callback: function callback(_ref2) {
          var scrollLeft = _ref2.scrollLeft;
          var scrollTop = _ref2.scrollTop;
          var _props4 = _this5.props;
          var height = _props4.height;
          var onScroll = _props4.onScroll;
          var width = _props4.width;


          onScroll({
            clientHeight: height,
            clientWidth: width,
            scrollHeight: totalRowsHeight,
            scrollLeft: scrollLeft,
            scrollTop: scrollTop,
            scrollWidth: totalColumnsWidth
          });
        },
        indices: {
          scrollLeft: scrollLeft,
          scrollTop: scrollTop
        }
      });
    }

    /**
     * Updates the state during the next animation frame.
     * Use this method to avoid multiple renders in a small span of time.
     * This helps performance for bursty events (like onScroll).
     */

  }, {
    key: '_setNextState',
    value: function _setNextState(state) {
      var _this6 = this;

      if (this._setNextStateAnimationFrameId) {
        _raf2.default.cancel(this._setNextStateAnimationFrameId);
      }

      this._setNextStateAnimationFrameId = (0, _raf2.default)(function () {
        _this6._setNextStateAnimationFrameId = null;
        _this6.setState(state);
      });
    }
  }, {
    key: '_setScrollPosition',
    value: function _setScrollPosition(_ref3) {
      var scrollLeft = _ref3.scrollLeft;
      var scrollTop = _ref3.scrollTop;

      var newState = {
        scrollPositionChangeReason: SCROLL_POSITION_CHANGE_REASONS.REQUESTED
      };

      if (scrollLeft >= 0) {
        newState.scrollLeft = scrollLeft;
      }

      if (scrollTop >= 0) {
        newState.scrollTop = scrollTop;
      }

      if (scrollLeft >= 0 && scrollLeft !== this.state.scrollLeft || scrollTop >= 0 && scrollTop !== this.state.scrollTop) {
        this.setState(newState);
      }
    }
  }, {
    key: '_updateScrollLeftForScrollToColumn',
    value: function _updateScrollLeftForScrollToColumn() {
      var props = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
      var state = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      var _ref4 = props || this.props;

      var columnsCount = _ref4.columnsCount;
      var scrollToColumn = _ref4.scrollToColumn;
      var width = _ref4.width;

      var _ref5 = state || this.state;

      var scrollLeft = _ref5.scrollLeft;


      if (scrollToColumn >= 0 && columnsCount > 0) {
        var targetIndex = (0, _getNearestIndex2.default)({
          cellCount: this._columnMetadata.length,
          targetIndex: scrollToColumn
        });

        var columnMetadata = this._columnMetadata[targetIndex];

        var calculatedScrollLeft = (0, _getUpdatedOffsetForIndex2.default)({
          cellOffset: columnMetadata.offset,
          cellSize: columnMetadata.size,
          containerSize: width,
          currentOffset: scrollLeft,
          targetIndex: scrollToColumn
        });

        if (scrollLeft !== calculatedScrollLeft) {
          this._setScrollPosition({
            scrollLeft: calculatedScrollLeft
          });
        }
      }
    }
  }, {
    key: '_updateScrollTopForScrollToRow',
    value: function _updateScrollTopForScrollToRow() {
      var props = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
      var state = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      var _ref6 = props || this.props;

      var height = _ref6.height;
      var rowsCount = _ref6.rowsCount;
      var scrollToRow = _ref6.scrollToRow;

      var _ref7 = state || this.state;

      var scrollTop = _ref7.scrollTop;


      if (scrollToRow >= 0 && rowsCount > 0) {
        var targetIndex = (0, _getNearestIndex2.default)({
          cellCount: this._rowMetadata.length,
          targetIndex: scrollToRow
        });

        var rowMetadata = this._rowMetadata[targetIndex];

        var calculatedScrollTop = (0, _getUpdatedOffsetForIndex2.default)({
          cellOffset: rowMetadata.offset,
          cellSize: rowMetadata.size,
          containerSize: height,
          currentOffset: scrollTop,
          targetIndex: scrollToRow
        });

        if (scrollTop !== calculatedScrollTop) {
          this._setScrollPosition({
            scrollTop: calculatedScrollTop
          });
        }
      }
    }
  }, {
    key: '_onScroll',
    value: function _onScroll(event) {
      // In certain edge-cases React dispatches an onScroll event with an invalid target.scrollLeft / target.scrollTop.
      // This invalid event can be detected by comparing event.target to this component's scrollable DOM element.
      // See issue #404 for more information.
      if (event.target !== this.refs.scrollingContainer) {
        return;
      }

      // Prevent pointer events from interrupting a smooth scroll
      this._enablePointerEventsAfterDelay();

      // When this component is shrunk drastically, React dispatches a series of back-to-back scroll events,
      // Gradually converging on a scrollTop that is within the bounds of the new, smaller height.
      // This causes a series of rapid renders that is slow for long lists.
      // We can avoid that by doing some simple bounds checking to ensure that scrollTop never exceeds the total height.
      var _props5 = this.props;
      var height = _props5.height;
      var width = _props5.width;

      var scrollbarSize = this._scrollbarSize;
      var totalRowsHeight = this._getTotalRowsHeight();
      var totalColumnsWidth = this._getTotalColumnsWidth();
      var scrollLeft = Math.min(totalColumnsWidth - width + scrollbarSize, event.target.scrollLeft);
      var scrollTop = Math.min(totalRowsHeight - height + scrollbarSize, event.target.scrollTop);

      // Certain devices (like Apple touchpad) rapid-fire duplicate events.
      // Don't force a re-render if this is the case.
      // The mouse may move faster then the animation frame does.
      // Use requestAnimationFrame to avoid over-updating.
      if (this.state.scrollLeft !== scrollLeft || this.state.scrollTop !== scrollTop) {
        // Browsers with cancelable scroll events (eg. Firefox) interrupt scrolling animations if scrollTop/scrollLeft is set.
        // Other browsers (eg. Safari) don't scroll as well without the help under certain conditions (DOM or style changes during scrolling).
        // All things considered, this seems to be the best current work around that I'm aware of.
        // For more information see https://github.com/bvaughn/react-virtualized/pull/124
        var scrollPositionChangeReason = event.cancelable ? SCROLL_POSITION_CHANGE_REASONS.OBSERVED : SCROLL_POSITION_CHANGE_REASONS.REQUESTED;

        if (!this.state.isScrolling) {
          this.setState({
            isScrolling: true
          });
        }

        this._setNextState({
          isScrolling: true,
          scrollLeft: scrollLeft,
          scrollPositionChangeReason: scrollPositionChangeReason,
          scrollTop: scrollTop
        });
      }

      this._invokeOnScrollMemoizer({ scrollLeft: scrollLeft, scrollTop: scrollTop, totalColumnsWidth: totalColumnsWidth, totalRowsHeight: totalRowsHeight });
    }
  }]);

  return Grid;
}(_react.Component);

Grid.propTypes = {
  'aria-label': _react.PropTypes.string,

  /**
   * Optional custom CSS class name to attach to root Grid element.
   */
  className: _react.PropTypes.string,

  /**
   * Number of columns in grid.
   */
  columnsCount: _react.PropTypes.number.isRequired,

  /**
   * Either a fixed column width (number) or a function that returns the width of a column given its index.
   * Should implement the following interface: (index: number): number
   */
  columnWidth: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]).isRequired,

  /**
   * Height of Grid; this property determines the number of visible (vs virtualized) rows.
   */
  height: _react.PropTypes.number.isRequired,

  /**
   * Optional renderer to be used in place of rows when either :rowsCount or :columnsCount is 0.
   */
  noContentRenderer: _react.PropTypes.func.isRequired,

  /**
   * Callback invoked whenever the scroll offset changes within the inner scrollable region.
   * This callback can be used to sync scrolling between lists, tables, or grids.
   * ({ clientHeight, clientWidth, scrollHeight, scrollLeft, scrollTop, scrollWidth }): void
   */
  onScroll: _react.PropTypes.func.isRequired,

  /**
   * Callback invoked with information about the section of the Grid that was just rendered.
   * ({ columnStartIndex, columnStopIndex, rowStartIndex, rowStopIndex }): void
   */
  onSectionRendered: _react.PropTypes.func.isRequired,

  /**
   * Number of columns to render before/after the visible section of the grid.
   * These columns can help for smoother scrolling on touch devices or browsers that send scroll events infrequently.
   */
  overscanColumnsCount: _react.PropTypes.number.isRequired,

  /**
   * Number of rows to render above/below the visible section of the grid.
   * These rows can help for smoother scrolling on touch devices or browsers that send scroll events infrequently.
   */
  overscanRowsCount: _react.PropTypes.number.isRequired,

  /**
   * Responsible for rendering a cell given an row and column index.
   * Should implement the following interface: ({ columnIndex: number, rowIndex: number }): PropTypes.node
   */
  renderCell: _react.PropTypes.func.isRequired,

  /**
   * Responsible for rendering a group of cells given their index ranges.
   * Should implement the following interface: ({
   *   columnMetadata:Array<Object>,
   *   columnStartIndex: number,
   *   columnStopIndex: number,
   *   renderCell: Function,
   *   rowMetadata:Array<Object>,
   *   rowStartIndex: number,
   *   rowStopIndex: number
   * }): Array<PropTypes.node>
   */
  renderCellRanges: _react.PropTypes.func.isRequired,

  /**
   * Either a fixed row height (number) or a function that returns the height of a row given its index.
   * Should implement the following interface: (index: number): number
   */
  rowHeight: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]).isRequired,

  /**
   * Number of rows in grid.
   */
  rowsCount: _react.PropTypes.number.isRequired,

  /** Horizontal offset. */
  scrollLeft: _react.PropTypes.number,

  /**
   * Column index to ensure visible (by forcefully scrolling if necessary)
   */
  scrollToColumn: _react.PropTypes.number,

  /** Vertical offset. */
  scrollTop: _react.PropTypes.number,

  /**
   * Row index to ensure visible (by forcefully scrolling if necessary)
   */
  scrollToRow: _react.PropTypes.number,

  /**
   * Width of Grid; this property determines the number of visible (vs virtualized) columns.
   */
  width: _react.PropTypes.number.isRequired
};
Grid.defaultProps = {
  'aria-label': 'grid',
  noContentRenderer: function noContentRenderer() {
    return null;
  },
  onScroll: function onScroll() {
    return null;
  },
  onSectionRendered: function onSectionRendered() {
    return null;
  },
  overscanColumnsCount: 0,
  overscanRowsCount: 10,
  renderCellRanges: defaultRenderCellRanges
};
exports.default = Grid;


function defaultRenderCellRanges(_ref8) {
  var columnMetadata = _ref8.columnMetadata;
  var columnStartIndex = _ref8.columnStartIndex;
  var columnStopIndex = _ref8.columnStopIndex;
  var renderCell = _ref8.renderCell;
  var rowMetadata = _ref8.rowMetadata;
  var rowStartIndex = _ref8.rowStartIndex;
  var rowStopIndex = _ref8.rowStopIndex;

  var renderedCells = [];

  for (var rowIndex = rowStartIndex; rowIndex <= rowStopIndex; rowIndex++) {
    var rowDatum = rowMetadata[rowIndex];

    for (var columnIndex = columnStartIndex; columnIndex <= columnStopIndex; columnIndex++) {
      var columnDatum = columnMetadata[columnIndex];
      var renderedCell = renderCell({ columnIndex: columnIndex, rowIndex: rowIndex });
      var key = rowIndex + '-' + columnIndex;

      if (renderedCell == null || renderedCell === false) {
        continue;
      }

      var child = _react2.default.createElement(
        'div',
        {
          key: key,
          className: 'Grid__cell',
          style: {
            height: rowDatum.size,
            left: columnDatum.offset,
            top: rowDatum.offset,
            width: columnDatum.size
          }
        },
        renderedCell
      );

      renderedCells.push(child);
    }
  }

  return renderedCells;
}
},{"../utils/createCallbackMemoizer":64,"../utils/getUpdatedOffsetForIndex":65,"../utils/initCellMetadata":66,"./utils/calculateSizeAndPositionDataAndUpdateScrollOffset":52,"./utils/getNearestIndex":53,"./utils/getOverscanIndices":54,"./utils/getVisibleCellIndices":55,"./utils/updateScrollIndexHelper":56,"classnames":undefined,"dom-helpers/util/scrollbarSize":17,"raf":27,"react":undefined,"react-addons-shallow-compare":28}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Grid = exports.default = undefined;

var _Grid2 = require('./Grid');

var _Grid3 = _interopRequireDefault(_Grid2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Grid3.default;
exports.Grid = _Grid3.default;
},{"./Grid":50}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calculateSizeAndPositionDataAndUpdateScrollOffset;
/**
 * Helper method that determines when to recalculate row or column metadata.
 *
 * @param cellCount Number of rows or columns in the current axis
 * @param cellsSize Width or height of cells for the current axis
 * @param computeMetadataCallback Method to invoke if cell metadata should be recalculated
 * @param computeMetadataCallbackProps Parameters to pass to :computeMetadataCallback
 * @param computeMetadataOnNextUpdate Flag specifying that metadata should be recalculated
 * @param nextCellsCount Newly updated number of rows or columns in the current axis
 * @param nextCellsSize Newly updated width or height of cells for the current axis
 * @param nextScrollToIndex Newly updated scroll-to-index
 * @param scrollToIndex Scroll-to-index
 * @param updateScrollOffsetForScrollToIndex Callback to invoke if the scroll position should be recalculated
 */
function calculateSizeAndPositionDataAndUpdateScrollOffset(_ref) {
  var cellCount = _ref.cellCount;
  var cellSize = _ref.cellSize;
  var computeMetadataCallback = _ref.computeMetadataCallback;
  var computeMetadataCallbackProps = _ref.computeMetadataCallbackProps;
  var computeMetadataOnNextUpdate = _ref.computeMetadataOnNextUpdate;
  var nextCellsCount = _ref.nextCellsCount;
  var nextCellSize = _ref.nextCellSize;
  var nextScrollToIndex = _ref.nextScrollToIndex;
  var scrollToIndex = _ref.scrollToIndex;
  var updateScrollOffsetForScrollToIndex = _ref.updateScrollOffsetForScrollToIndex;

  // Don't compare cell sizes if they are functions because inline functions would cause infinite loops.
  // In that event users should use the manual recompute methods to inform of changes.
  if (computeMetadataOnNextUpdate || cellCount !== nextCellsCount || (typeof cellSize === 'number' || typeof nextCellSize === 'number') && cellSize !== nextCellSize) {
    computeMetadataCallback(computeMetadataCallbackProps);

    // Updated cell metadata may have hidden the previous scrolled-to item.
    // In this case we should also update the scrollTop to ensure it stays visible.
    if (scrollToIndex >= 0 && scrollToIndex === nextScrollToIndex) {
      updateScrollOffsetForScrollToIndex();
    }
  }
}
},{}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNearestIndex;
/**
 * Finds the nearest valid index to the one specified if the specified index is invalid.
 * @param cellCount Number of rows or columns in the current axis
 * @param targetIndex Index to use if possible
 */
function getNearestIndex(_ref) {
  var cellCount = _ref.cellCount;
  var targetIndex = _ref.targetIndex;

  return Math.max(0, Math.min(cellCount - 1, targetIndex));
}
},{}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOverscanIndices;
/**
 * Calculates the number of cells to overscan before and after a specified range.
 * This function ensures that overscanning doesn't exceed the available cells.
 * @param cellCount Number of rows or columns in the current axis
 * @param overscanCellsCount Maximum number of cells to over-render in either direction
 * @param startIndex Begin of range of visible cells
 * @param stopIndex End of range of visible cells
 */
function getOverscanIndices(_ref) {
  var cellCount = _ref.cellCount;
  var overscanCellsCount = _ref.overscanCellsCount;
  var startIndex = _ref.startIndex;
  var stopIndex = _ref.stopIndex;

  return {
    overscanStartIndex: Math.max(0, startIndex - overscanCellsCount),
    overscanStopIndex: Math.min(cellCount - 1, stopIndex + overscanCellsCount)
  };
}
},{}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getVisibleCellIndices;
/**
 * Determines the range of cells to display for a given offset in order to fill the specified container.
 *
 * @param cellMetadata Metadata initially computed by initCellMetadata()
 * @param containerSize Total size (width or height) of the container
 * @param currentOffset Container's current (x or y) offset
 * @return An object containing :start and :stop attributes, each specifying a cell index
 */
function getVisibleCellIndices(_ref) {
  var cellMetadata = _ref.cellMetadata;
  var containerSize = _ref.containerSize;
  var currentOffset = _ref.currentOffset;

  var cellCount = cellMetadata.length;

  if (cellCount === 0) {
    return {};
  }

  // TODO Add better guards here against NaN offset

  var lastDatum = cellMetadata[cellMetadata.length - 1];
  var totalCellSize = lastDatum.offset + lastDatum.size;

  // Ensure offset is within reasonable bounds
  currentOffset = Math.max(0, Math.min(totalCellSize - containerSize, currentOffset));

  var maxOffset = Math.min(totalCellSize, currentOffset + containerSize);

  var start = findNearestCell({
    cellMetadata: cellMetadata,
    mode: EQUAL_OR_LOWER,
    offset: currentOffset
  });

  var datum = cellMetadata[start];
  currentOffset = datum.offset + datum.size;

  var stop = start;

  while (currentOffset < maxOffset && stop < cellCount - 1) {
    stop++;

    currentOffset += cellMetadata[stop].size;
  }

  return {
    start: start,
    stop: stop
  };
}

/**
 * Binary search function inspired by react-infinite.
 */
function findNearestCell(_ref2) {
  var cellMetadata = _ref2.cellMetadata;
  var mode = _ref2.mode;
  var offset = _ref2.offset;

  var high = cellMetadata.length - 1;
  var low = 0;
  var middle = undefined;
  var currentOffset = undefined;

  // TODO Add better guards here against NaN offset

  while (low <= high) {
    middle = low + Math.floor((high - low) / 2);
    currentOffset = cellMetadata[middle].offset;

    if (currentOffset === offset) {
      return middle;
    } else if (currentOffset < offset) {
      low = middle + 1;
    } else if (currentOffset > offset) {
      high = middle - 1;
    }
  }

  if (mode === EQUAL_OR_LOWER && low > 0) {
    return low - 1;
  } else if (mode === EQUAL_OR_HIGHER && high < cellMetadata.length - 1) {
    return high + 1;
  }
}

var EQUAL_OR_LOWER = 1;
var EQUAL_OR_HIGHER = 2;
},{}],56:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateScrollIndexHelper;

var _getNearestIndex = require('./getNearestIndex');

var _getNearestIndex2 = _interopRequireDefault(_getNearestIndex);

var _getUpdatedOffsetForIndex = require('../../utils/getUpdatedOffsetForIndex');

var _getUpdatedOffsetForIndex2 = _interopRequireDefault(_getUpdatedOffsetForIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Helper function that determines when to update scroll offsets to ensure that a scroll-to-index remains visible.
 *
 * @param cellMetadata Metadata initially computed by initCellMetadata()
 * @param cellCount Number of rows or columns in the current axis
 * @param cellsSize Width or height of cells for the current axis
 * @param previousCellsCount Previous number of rows or columns
 * @param previousCellsSize Previous width or height of cells
 * @param previousScrollToIndex Previous scroll-to-index
 * @param previousSize Previous width or height of the virtualized container
 * @param scrollOffset Current scrollLeft or scrollTop
 * @param scrollToIndex Scroll-to-index
 * @param size Width or height of the virtualized container
 * @param updateScrollIndexCallback Callback to invoke with an scroll-to-index value
 */
function updateScrollIndexHelper(_ref) {
  var cellMetadata = _ref.cellMetadata;
  var cellCount = _ref.cellCount;
  var cellSize = _ref.cellSize;
  var previousCellsCount = _ref.previousCellsCount;
  var previousCellSize = _ref.previousCellSize;
  var previousScrollToIndex = _ref.previousScrollToIndex;
  var previousSize = _ref.previousSize;
  var scrollOffset = _ref.scrollOffset;
  var scrollToIndex = _ref.scrollToIndex;
  var size = _ref.size;
  var updateScrollIndexCallback = _ref.updateScrollIndexCallback;

  var hasScrollToIndex = scrollToIndex >= 0 && scrollToIndex < cellCount;
  var sizeHasChanged = size !== previousSize || !previousCellSize || typeof cellSize === 'number' && cellSize !== previousCellSize;

  // If we have a new scroll target OR if height/row-height has changed,
  // We should ensure that the scroll target is visible.
  if (hasScrollToIndex && (sizeHasChanged || scrollToIndex !== previousScrollToIndex)) {
    updateScrollIndexCallback(scrollToIndex);

    // If we don't have a selected item but list size or number of children have decreased,
    // Make sure we aren't scrolled too far past the current content.
  } else if (!hasScrollToIndex && cellCount > 0 && (size < previousSize || cellCount < previousCellsCount)) {
      scrollToIndex = (0, _getNearestIndex2.default)({
        cellCount: cellCount,
        targetIndex: cellCount - 1
      });

      if (scrollToIndex < cellCount) {
        var cellMetadatum = cellMetadata[scrollToIndex];
        var calculatedScrollOffset = (0, _getUpdatedOffsetForIndex2.default)({
          cellOffset: cellMetadatum.offset,
          cellSize: cellMetadatum.size,
          containerSize: size,
          currentOffset: scrollOffset
        });

        // Only adjust the scroll position if we've scrolled below the last set of rows.
        if (calculatedScrollOffset < scrollOffset) {
          updateScrollIndexCallback(cellCount - 1);
        }
      }
    }
}
},{"../../utils/getUpdatedOffsetForIndex":65,"./getNearestIndex":53}],57:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.isRangeVisible = isRangeVisible;
exports.scanForUnloadedRanges = scanForUnloadedRanges;

var _react = require('react');

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Higher-order component that manages lazy-loading for "infinite" data.
 * This component decorates a virtual component and just-in-time prefetches rows as a user scrolls.
 * It is intended as a convenience component; fork it if you'd like finer-grained control over data-loading.
 */

var InfiniteLoader = function (_Component) {
  _inherits(InfiniteLoader, _Component);

  function InfiniteLoader(props, context) {
    _classCallCheck(this, InfiniteLoader);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InfiniteLoader).call(this, props, context));

    _this._onRowsRendered = _this._onRowsRendered.bind(_this);
    _this._registerChild = _this._registerChild.bind(_this);
    return _this;
  }

  _createClass(InfiniteLoader, [{
    key: 'render',
    value: function render() {
      var children = this.props.children;


      return children({
        onRowsRendered: this._onRowsRendered,
        registerChild: this._registerChild
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_onRowsRendered',
    value: function _onRowsRendered(_ref) {
      var _this2 = this;

      var startIndex = _ref.startIndex;
      var stopIndex = _ref.stopIndex;
      var _props = this.props;
      var isRowLoaded = _props.isRowLoaded;
      var loadMoreRows = _props.loadMoreRows;
      var minimumBatchSize = _props.minimumBatchSize;
      var rowsCount = _props.rowsCount;
      var threshold = _props.threshold;


      this._lastRenderedStartIndex = startIndex;
      this._lastRenderedStopIndex = stopIndex;

      var unloadedRanges = scanForUnloadedRanges({
        isRowLoaded: isRowLoaded,
        minimumBatchSize: minimumBatchSize,
        rowsCount: rowsCount,
        startIndex: Math.max(0, startIndex - threshold),
        stopIndex: Math.min(rowsCount - 1, stopIndex + threshold)
      });

      unloadedRanges.forEach(function (unloadedRange) {
        var promise = loadMoreRows(unloadedRange);
        if (promise) {
          promise.then(function () {
            // Refresh the visible rows if any of them have just been loaded.
            // Otherwise they will remain in their unloaded visual state.
            if (isRangeVisible({
              lastRenderedStartIndex: _this2._lastRenderedStartIndex,
              lastRenderedStopIndex: _this2._lastRenderedStopIndex,
              startIndex: unloadedRange.startIndex,
              stopIndex: unloadedRange.stopIndex
            })) {
              if (_this2._registeredChild) {
                _this2._registeredChild.forceUpdate();
              }
            }
          });
        }
      });
    }
  }, {
    key: '_registerChild',
    value: function _registerChild(registeredChild) {
      this._registeredChild = registeredChild;
    }
  }]);

  return InfiniteLoader;
}(_react.Component);

/**
 * Determines if the specified start/stop range is visible based on the most recently rendered range.
 */


InfiniteLoader.propTypes = {
  /**
   * Function respondible for rendering a virtualized component.
   * This function should implement the following signature:
   * ({ onRowsRendered, registerChild }) => PropTypes.element
   *
   * The specified :onRowsRendered function should be passed through to the child's :onRowsRendered property.
   * The :registerChild callback should be set as the virtualized component's :ref.
   */
  children: _react.PropTypes.func.isRequired,

  /**
   * Function responsible for tracking the loaded state of each row.
   * It should implement the following signature: (index: number): boolean
   */
  isRowLoaded: _react.PropTypes.func.isRequired,

  /**
   * Callback to be invoked when more rows must be loaded.
   * It should implement the following signature: ({ startIndex, stopIndex }): Promise
   * The returned Promise should be resolved once row data has finished loading.
   * It will be used to determine when to refresh the list with the newly-loaded data.
   * This callback may be called multiple times in reaction to a single scroll event.
   */
  loadMoreRows: _react.PropTypes.func.isRequired,

  /**
   * Minimum number of rows to be loaded at a time.
   * This property can be used to batch requests to reduce HTTP requests.
   */
  minimumBatchSize: _react.PropTypes.number.isRequired,

  /**
   * Number of rows in list; can be arbitrary high number if actual number is unknown.
   */
  rowsCount: _react.PropTypes.number.isRequired,

  /**
   * Threshold at which to pre-fetch data.
   * A threshold X means that data will start loading when a user scrolls within X rows.
   * This value defaults to 15.
   */
  threshold: _react.PropTypes.number.isRequired
};
InfiniteLoader.defaultProps = {
  minimumBatchSize: 10,
  rowsCount: 0,
  threshold: 15
};
exports.default = InfiniteLoader;
function isRangeVisible(_ref2) {
  var lastRenderedStartIndex = _ref2.lastRenderedStartIndex;
  var lastRenderedStopIndex = _ref2.lastRenderedStopIndex;
  var startIndex = _ref2.startIndex;
  var stopIndex = _ref2.stopIndex;

  return !(startIndex > lastRenderedStopIndex || stopIndex < lastRenderedStartIndex);
}

/**
 * Returns all of the ranges within a larger range that contain unloaded rows.
 */
function scanForUnloadedRanges(_ref3) {
  var isRowLoaded = _ref3.isRowLoaded;
  var minimumBatchSize = _ref3.minimumBatchSize;
  var rowsCount = _ref3.rowsCount;
  var startIndex = _ref3.startIndex;
  var stopIndex = _ref3.stopIndex;

  var unloadedRanges = [];

  var rangeStartIndex = null;
  var rangeStopIndex = null;

  for (var i = startIndex; i <= stopIndex; i++) {
    var loaded = isRowLoaded(i);

    if (!loaded) {
      rangeStopIndex = i;
      if (rangeStartIndex === null) {
        rangeStartIndex = i;
      }
    } else if (rangeStopIndex !== null) {
      unloadedRanges.push({
        startIndex: rangeStartIndex,
        stopIndex: rangeStopIndex
      });

      rangeStartIndex = rangeStopIndex = null;
    }
  }

  if (rangeStopIndex !== null) {
    // Attempt to satisfy :minimumBatchSize requirement but don't exceed :rowsCount
    var potentialStopIndex = Math.min(Math.max(rangeStopIndex, rangeStartIndex + minimumBatchSize - 1), rowsCount - 1);

    for (var i = rangeStopIndex + 1; i <= potentialStopIndex; i++) {
      if (!isRowLoaded(i)) {
        rangeStopIndex = i;
      } else {
        break;
      }
    }

    unloadedRanges.push({
      startIndex: rangeStartIndex,
      stopIndex: rangeStopIndex
    });
  }

  return unloadedRanges;
}
},{"react":undefined,"react-addons-shallow-compare":28}],58:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfiniteLoader = exports.default = undefined;

var _InfiniteLoader2 = require('./InfiniteLoader');

var _InfiniteLoader3 = _interopRequireDefault(_InfiniteLoader2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _InfiniteLoader3.default;
exports.InfiniteLoader = _InfiniteLoader3.default;
},{"./InfiniteLoader":57}],59:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * HOC that simplifies the process of synchronizing scrolling between two or more virtualized components.
 */

var ScrollSync = function (_Component) {
  _inherits(ScrollSync, _Component);

  function ScrollSync(props, context) {
    _classCallCheck(this, ScrollSync);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ScrollSync).call(this, props, context));

    _this.state = {
      clientHeight: 0,
      clientWidth: 0,
      scrollHeight: 0,
      scrollLeft: 0,
      scrollTop: 0,
      scrollWidth: 0
    };

    _this._onScroll = _this._onScroll.bind(_this);
    return _this;
  }

  _createClass(ScrollSync, [{
    key: 'render',
    value: function render() {
      var children = this.props.children;
      var _state = this.state;
      var clientHeight = _state.clientHeight;
      var clientWidth = _state.clientWidth;
      var scrollHeight = _state.scrollHeight;
      var scrollLeft = _state.scrollLeft;
      var scrollTop = _state.scrollTop;
      var scrollWidth = _state.scrollWidth;


      return children({
        clientHeight: clientHeight,
        clientWidth: clientWidth,
        onScroll: this._onScroll,
        scrollHeight: scrollHeight,
        scrollLeft: scrollLeft,
        scrollTop: scrollTop,
        scrollWidth: scrollWidth
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }, {
    key: '_onScroll',
    value: function _onScroll(_ref) {
      var clientHeight = _ref.clientHeight;
      var clientWidth = _ref.clientWidth;
      var scrollHeight = _ref.scrollHeight;
      var scrollLeft = _ref.scrollLeft;
      var scrollTop = _ref.scrollTop;
      var scrollWidth = _ref.scrollWidth;

      this.setState({ clientHeight: clientHeight, clientWidth: clientWidth, scrollHeight: scrollHeight, scrollLeft: scrollLeft, scrollTop: scrollTop, scrollWidth: scrollWidth });
    }
  }]);

  return ScrollSync;
}(_react.Component);

ScrollSync.propTypes = {
  /**
   * Function respondible for rendering 2 or more virtualized components.
   * This function should implement the following signature:
   * ({ onScroll, scrollLeft, scrollTop }) => PropTypes.element
   */
  children: _react.PropTypes.func.isRequired
};
exports.default = ScrollSync;
},{"react":undefined,"react-addons-shallow-compare":28}],60:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollSync = exports.default = undefined;

var _ScrollSync2 = require('./ScrollSync');

var _ScrollSync3 = _interopRequireDefault(_ScrollSync2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ScrollSync3.default;
exports.ScrollSync = _ScrollSync3.default;
},{"./ScrollSync":59}],61:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Grid = require('../Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * It is inefficient to create and manage a large list of DOM elements within a scrolling container
 * if only a few of those elements are visible. The primary purpose of this component is to improve
 * performance by only rendering the DOM nodes that a user is able to see based on their current
 * scroll position.
 *
 * This component renders a virtualized list of elements with either fixed or dynamic heights.
 */

var VirtualScroll = function (_Component) {
  _inherits(VirtualScroll, _Component);

  function VirtualScroll() {
    _classCallCheck(this, VirtualScroll);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(VirtualScroll).apply(this, arguments));
  }

  _createClass(VirtualScroll, [{
    key: 'recomputeRowHeights',


    /**
     * See Grid#recomputeGridSize
     */
    value: function recomputeRowHeights() {
      this.refs.Grid.recomputeGridSize();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;
      var height = _props.height;
      var noRowsRenderer = _props.noRowsRenderer;
      var onRowsRendered = _props.onRowsRendered;
      var _onScroll = _props.onScroll;
      var rowHeight = _props.rowHeight;
      var rowRenderer = _props.rowRenderer;
      var overscanRowsCount = _props.overscanRowsCount;
      var rowsCount = _props.rowsCount;
      var scrollToIndex = _props.scrollToIndex;
      var scrollTop = _props.scrollTop;
      var width = _props.width;


      var classNames = (0, _classnames2.default)('VirtualScroll', className);

      return _react2.default.createElement(_Grid2.default, {
        ref: 'Grid',
        'aria-label': this.props['aria-label'],
        className: classNames,
        columnWidth: width,
        columnsCount: 1,
        height: height,
        noContentRenderer: noRowsRenderer,
        onScroll: function onScroll(_ref) {
          var clientHeight = _ref.clientHeight;
          var scrollHeight = _ref.scrollHeight;
          var scrollTop = _ref.scrollTop;
          return _onScroll({ clientHeight: clientHeight, scrollHeight: scrollHeight, scrollTop: scrollTop });
        },
        onSectionRendered: function onSectionRendered(_ref2) {
          var rowOverscanStartIndex = _ref2.rowOverscanStartIndex;
          var rowOverscanStopIndex = _ref2.rowOverscanStopIndex;
          var rowStartIndex = _ref2.rowStartIndex;
          var rowStopIndex = _ref2.rowStopIndex;
          return onRowsRendered({
            overscanStartIndex: rowOverscanStartIndex,
            overscanStopIndex: rowOverscanStopIndex,
            startIndex: rowStartIndex,
            stopIndex: rowStopIndex
          });
        },
        overscanRowsCount: overscanRowsCount,
        renderCell: function renderCell(_ref3) {
          var columnIndex = _ref3.columnIndex;
          var rowIndex = _ref3.rowIndex;
          return rowRenderer(rowIndex);
        },
        rowHeight: rowHeight,
        rowsCount: rowsCount,
        scrollToRow: scrollToIndex,
        scrollTop: scrollTop,
        width: width
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
    }
  }]);

  return VirtualScroll;
}(_react.Component);

VirtualScroll.propTypes = {
  'aria-label': _react.PropTypes.string,

  /** Optional CSS class name */
  className: _react.PropTypes.string,

  /** Height constraint for list (determines how many actual rows are rendered) */
  height: _react.PropTypes.number.isRequired,

  /** Optional renderer to be used in place of rows when rowsCount is 0 */
  noRowsRenderer: _react.PropTypes.func.isRequired,

  /**
   * Callback invoked with information about the slice of rows that were just rendered.
   * ({ startIndex, stopIndex }): void
   */
  onRowsRendered: _react.PropTypes.func.isRequired,

  /**
   * Number of rows to render above/below the visible bounds of the list.
   * These rows can help for smoother scrolling on touch devices.
   */
  overscanRowsCount: _react.PropTypes.number.isRequired,

  /**
   * Callback invoked whenever the scroll offset changes within the inner scrollable region.
   * This callback can be used to sync scrolling between lists, tables, or grids.
   * ({ clientHeight, scrollHeight, scrollTop }): void
   */
  onScroll: _react.PropTypes.func.isRequired,

  /**
   * Either a fixed row height (number) or a function that returns the height of a row given its index.
   * (index: number): number
   */
  rowHeight: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]).isRequired,

  /** Responsbile for rendering a row given an index */
  rowRenderer: _react.PropTypes.func.isRequired,

  /** Number of rows in list. */
  rowsCount: _react.PropTypes.number.isRequired,

  /** Row index to ensure visible (by forcefully scrolling if necessary) */
  scrollToIndex: _react.PropTypes.number,

  /** Vertical offset. */
  scrollTop: _react.PropTypes.number,

  /** Width of list */
  width: _react.PropTypes.number.isRequired
};
VirtualScroll.defaultProps = {
  noRowsRenderer: function noRowsRenderer() {
    return null;
  },
  onRowsRendered: function onRowsRendered() {
    return null;
  },
  onScroll: function onScroll() {
    return null;
  },
  overscanRowsCount: 10
};
exports.default = VirtualScroll;
},{"../Grid":51,"classnames":undefined,"react":undefined,"react-addons-shallow-compare":28}],62:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VirtualScroll = exports.default = undefined;

var _VirtualScroll2 = require('./VirtualScroll');

var _VirtualScroll3 = _interopRequireDefault(_VirtualScroll2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _VirtualScroll3.default;
exports.VirtualScroll = _VirtualScroll3.default;
},{"./VirtualScroll":61}],63:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ArrowKeyStepper = require('./ArrowKeyStepper');

Object.defineProperty(exports, 'ArrowKeyStepper', {
  enumerable: true,
  get: function get() {
    return _ArrowKeyStepper.ArrowKeyStepper;
  }
});

var _AutoSizer = require('./AutoSizer');

Object.defineProperty(exports, 'AutoSizer', {
  enumerable: true,
  get: function get() {
    return _AutoSizer.AutoSizer;
  }
});

var _Collection = require('./Collection');

Object.defineProperty(exports, 'Collection', {
  enumerable: true,
  get: function get() {
    return _Collection.Collection;
  }
});

var _ColumnSizer = require('./ColumnSizer');

Object.defineProperty(exports, 'ColumnSizer', {
  enumerable: true,
  get: function get() {
    return _ColumnSizer.ColumnSizer;
  }
});

var _FlexTable = require('./FlexTable');

Object.defineProperty(exports, 'FlexTable', {
  enumerable: true,
  get: function get() {
    return _FlexTable.FlexTable;
  }
});
Object.defineProperty(exports, 'FlexColumn', {
  enumerable: true,
  get: function get() {
    return _FlexTable.FlexColumn;
  }
});
Object.defineProperty(exports, 'SortDirection', {
  enumerable: true,
  get: function get() {
    return _FlexTable.SortDirection;
  }
});
Object.defineProperty(exports, 'SortIndicator', {
  enumerable: true,
  get: function get() {
    return _FlexTable.SortIndicator;
  }
});

var _Grid = require('./Grid');

Object.defineProperty(exports, 'Grid', {
  enumerable: true,
  get: function get() {
    return _Grid.Grid;
  }
});

var _InfiniteLoader = require('./InfiniteLoader');

Object.defineProperty(exports, 'InfiniteLoader', {
  enumerable: true,
  get: function get() {
    return _InfiniteLoader.InfiniteLoader;
  }
});

var _ScrollSync = require('./ScrollSync');

Object.defineProperty(exports, 'ScrollSync', {
  enumerable: true,
  get: function get() {
    return _ScrollSync.ScrollSync;
  }
});

var _VirtualScroll = require('./VirtualScroll');

Object.defineProperty(exports, 'VirtualScroll', {
  enumerable: true,
  get: function get() {
    return _VirtualScroll.VirtualScroll;
  }
});
},{"./ArrowKeyStepper":34,"./AutoSizer":36,"./Collection":41,"./ColumnSizer":44,"./FlexTable":49,"./Grid":51,"./InfiniteLoader":58,"./ScrollSync":60,"./VirtualScroll":62}],64:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createCallbackMemoizer;
/**
 * Helper utility that updates the specified callback whenever any of the specified indices have changed.
 */
function createCallbackMemoizer() {
  var requireAllKeys = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

  var cachedIndices = {};

  return function (_ref) {
    var callback = _ref.callback;
    var indices = _ref.indices;

    var keys = Object.keys(indices);
    var allInitialized = !requireAllKeys || keys.every(function (key) {
      return indices[key] >= 0;
    });
    var indexChanged = keys.length !== Object.keys(cachedIndices).length || keys.some(function (key) {
      return cachedIndices[key] !== indices[key];
    });

    cachedIndices = indices;

    if (allInitialized && indexChanged) {
      callback(indices);
    }
  };
}
},{}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUpdatedOffsetForIndex;
/**
 * Determines a new offset that ensures a certain cell is visible, given the current offset.
 * If the cell is already visible then the current offset will be returned.
 * If the current offset is too great or small, it will be adjusted just enough to ensure the specified index is visible.
 *
 * @param cellOffset Offset (x or y) position for cell
 * @param cellSize Size (width or height) of cell
 * @param containerSize Total size (width or height) of the container
 * @param currentOffset Container's current (x or y) offset
 * @return Offset to use to ensure the specified cell is visible
 */
function getUpdatedOffsetForIndex(_ref) {
  var cellOffset = _ref.cellOffset;
  var cellSize = _ref.cellSize;
  var containerSize = _ref.containerSize;
  var currentOffset = _ref.currentOffset;

  var maxOffset = cellOffset;
  var minOffset = maxOffset - containerSize + cellSize;
  var newOffset = Math.max(minOffset, Math.min(maxOffset, currentOffset));

  return newOffset;
}
},{}],66:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initCellMetadata;
/**
 * Initializes metadata for an axis and its cells.
 * This data is used to determine which cells are visible given a container size and scroll position.
 *
 * @param cellCount Total number of cells.
 * @param size Either a fixed size or a function that returns the size for a given given an index.
 * @return Object mapping cell index to cell metadata (size, offset)
 */
function initCellMetadata(_ref) {
  var cellCount = _ref.cellCount;
  var size = _ref.size;

  var sizeGetter = size instanceof Function ? size : function (index) {
    return size;
  };

  var cellMetadata = [];
  var offset = 0;

  for (var i = 0; i < cellCount; i++) {
    var _size = sizeGetter(i);

    if (_size == null || isNaN(_size)) {
      throw Error("Invalid size returned for cell " + i + " of value " + _size);
    }

    cellMetadata[i] = {
      size: _size,
      offset: offset
    };

    offset += _size;
  }

  return cellMetadata;
}
},{}],67:[function(require,module,exports){
'use strict';

/**
* Detect Element Resize.
* Forked in order to guard against unsafe 'window' and 'document' references.
*
* https://github.com/sdecima/javascript-detect-element-resize
* Sebastian Decima
*
* version: 0.5.3
**/

// Check `document` and `window` in case of server-side rendering
var _window;
if (typeof window !== 'undefined') {
  _window = window;
} else if (typeof self !== 'undefined') {
  _window = self;
} else {
  _window = undefined;
}

var attachEvent = typeof document !== 'undefined' && document.attachEvent;
var stylesCreated = false;

if (!attachEvent) {
  var requestFrame = function () {
    var raf = _window.requestAnimationFrame || _window.mozRequestAnimationFrame || _window.webkitRequestAnimationFrame || function (fn) {
      return _window.setTimeout(fn, 20);
    };
    return function (fn) {
      return raf(fn);
    };
  }();

  var cancelFrame = function () {
    var cancel = _window.cancelAnimationFrame || _window.mozCancelAnimationFrame || _window.webkitCancelAnimationFrame || _window.clearTimeout;
    return function (id) {
      return cancel(id);
    };
  }();

  var resetTriggers = function resetTriggers(element) {
    var triggers = element.__resizeTriggers__,
        expand = triggers.firstElementChild,
        contract = triggers.lastElementChild,
        expandChild = expand.firstElementChild;
    contract.scrollLeft = contract.scrollWidth;
    contract.scrollTop = contract.scrollHeight;
    expandChild.style.width = expand.offsetWidth + 1 + 'px';
    expandChild.style.height = expand.offsetHeight + 1 + 'px';
    expand.scrollLeft = expand.scrollWidth;
    expand.scrollTop = expand.scrollHeight;
  };

  var checkTriggers = function checkTriggers(element) {
    return element.offsetWidth != element.__resizeLast__.width || element.offsetHeight != element.__resizeLast__.height;
  };

  var scrollListener = function scrollListener(e) {
    var element = this;
    resetTriggers(this);
    if (this.__resizeRAF__) cancelFrame(this.__resizeRAF__);
    this.__resizeRAF__ = requestFrame(function () {
      if (checkTriggers(element)) {
        element.__resizeLast__.width = element.offsetWidth;
        element.__resizeLast__.height = element.offsetHeight;
        element.__resizeListeners__.forEach(function (fn) {
          fn.call(element, e);
        });
      }
    });
  };

  /* Detect CSS Animations support to detect element display/re-attach */
  var animation = false,
      animationstring = 'animation',
      keyframeprefix = '',
      animationstartevent = 'animationstart',
      domPrefixes = 'Webkit Moz O ms'.split(' '),
      startEvents = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(' '),
      pfx = '';
  {
    var elm = document.createElement('fakeelement');
    if (elm.style.animationName !== undefined) {
      animation = true;
    }

    if (animation === false) {
      for (var i = 0; i < domPrefixes.length; i++) {
        if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
          pfx = domPrefixes[i];
          animationstring = pfx + 'Animation';
          keyframeprefix = '-' + pfx.toLowerCase() + '-';
          animationstartevent = startEvents[i];
          animation = true;
          break;
        }
      }
    }
  }

  var animationName = 'resizeanim';
  var animationKeyframes = '@' + keyframeprefix + 'keyframes ' + animationName + ' { from { opacity: 0; } to { opacity: 0; } } ';
  var animationStyle = keyframeprefix + 'animation: 1ms ' + animationName + '; ';
}

var createStyles = function createStyles() {
  if (!stylesCreated) {
    //opacity:0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
    var css = (animationKeyframes ? animationKeyframes : '') + '.resize-triggers { ' + (animationStyle ? animationStyle : '') + 'visibility: hidden; opacity: 0; } ' + '.resize-triggers, .resize-triggers > div, .contract-trigger:before { content: \" \"; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
    stylesCreated = true;
  }
};

var addResizeListener = function addResizeListener(element, fn) {
  if (attachEvent) element.attachEvent('onresize', fn);else {
    if (!element.__resizeTriggers__) {
      if (getComputedStyle(element).position == 'static') element.style.position = 'relative';
      createStyles();
      element.__resizeLast__ = {};
      element.__resizeListeners__ = [];
      (element.__resizeTriggers__ = document.createElement('div')).className = 'resize-triggers';
      element.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div>' + '<div class="contract-trigger"></div>';
      element.appendChild(element.__resizeTriggers__);
      resetTriggers(element);
      element.addEventListener('scroll', scrollListener, true);

      /* Listen for a css animation to detect element display/re-attach */
      animationstartevent && element.__resizeTriggers__.addEventListener(animationstartevent, function (e) {
        if (e.animationName == animationName) resetTriggers(element);
      });
    }
    element.__resizeListeners__.push(fn);
  }
};

var removeResizeListener = function removeResizeListener(element, fn) {
  if (attachEvent) element.detachEvent('onresize', fn);else {
    element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
    if (!element.__resizeListeners__.length) {
      element.removeEventListener('scroll', scrollListener);
      element.__resizeTriggers__ = !element.removeChild(element.__resizeTriggers__);
    }
  }
};

module.exports = {
  addResizeListener: addResizeListener,
  removeResizeListener: removeResizeListener
};
},{}],68:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
* @providesModule shallowCompare
*/

'use strict';

var shallowEqual = require('fbjs/lib/shallowEqual');

/**
 * Does a shallow comparison for props and state.
 * See ReactComponentWithPureRenderMixin
 * See also https://facebook.github.io/react/docs/shallow-compare.html
 */
function shallowCompare(instance, nextProps, nextState) {
  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
}

module.exports = shallowCompare;
},{"fbjs/lib/shallowEqual":18}],69:[function(require,module,exports){
'use strict';
module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};

},{}],70:[function(require,module,exports){
(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var list = this.map[name]
    if (!list) {
      list = []
      this.map[name] = list
    }
    list.push(value)
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    var values = this.map[normalizeName(name)]
    return values ? values[0] : null
  }

  Headers.prototype.getAll = function(name) {
    return this.map[normalizeName(name)] || []
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)]
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this)
      }, this)
    }, this)
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    return fileReaderReady(reader)
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    reader.readAsText(blob)
    return fileReaderReady(reader)
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (!body) {
        this._bodyText = ''
      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        // Only support ArrayBuffers for POST method.
        // Receiving ArrayBuffers happens via Blobs, instead.
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        return this.blob().then(readBlobAsArrayBuffer)
      }

      this.text = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text')
        } else {
          return Promise.resolve(this._bodyText)
        }
      }
    } else {
      this.text = function() {
        var rejected = consumed(this)
        return rejected ? rejected : Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body
    if (Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = input
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this)
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function headers(xhr) {
    var head = new Headers()
    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
    pairs.forEach(function(header) {
      var split = header.trim().split(':')
      var key = split.shift().trim()
      var value = split.join(':').trim()
      head.append(key, value)
    })
    return head
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = options.statusText
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input
      } else {
        request = new Request(input, init)
      }

      var xhr = new XMLHttpRequest()

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL')
        }

        return
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        }
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvcmVwb3MvQ2xpY2tIYW5kbGVySU8vcmVhY3Qtc2VsZWN0L2V4YW1wbGVzL3NyYy9hcHAuanMiLCIvcmVwb3MvQ2xpY2tIYW5kbGVySU8vcmVhY3Qtc2VsZWN0L2V4YW1wbGVzL3NyYy9jb21wb25lbnRzL0NvbnRyaWJ1dG9ycy5qcyIsIi9yZXBvcy9DbGlja0hhbmRsZXJJTy9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvQ3VzdG9tQ29tcG9uZW50cy5qcyIsIi9yZXBvcy9DbGlja0hhbmRsZXJJTy9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvQ3VzdG9tUmVuZGVyLmpzIiwiL3JlcG9zL0NsaWNrSGFuZGxlcklPL3JlYWN0LXNlbGVjdC9leGFtcGxlcy9zcmMvY29tcG9uZW50cy9HaXRodWJVc2Vycy5qcyIsIi9yZXBvcy9DbGlja0hhbmRsZXJJTy9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvTXVsdGlzZWxlY3QuanMiLCIvcmVwb3MvQ2xpY2tIYW5kbGVySU8vcmVhY3Qtc2VsZWN0L2V4YW1wbGVzL3NyYy9jb21wb25lbnRzL051bWVyaWNTZWxlY3QuanMiLCIvcmVwb3MvQ2xpY2tIYW5kbGVySU8vcmVhY3Qtc2VsZWN0L2V4YW1wbGVzL3NyYy9jb21wb25lbnRzL1N0YXRlcy5qcyIsIi9yZXBvcy9DbGlja0hhbmRsZXJJTy9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvVmlydHVhbGl6ZWQuanMiLCIvcmVwb3MvQ2xpY2tIYW5kbGVySU8vcmVhY3Qtc2VsZWN0L2V4YW1wbGVzL3NyYy9kYXRhL2NpdGllcy5qcyIsIi9yZXBvcy9DbGlja0hhbmRsZXJJTy9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2RhdGEvY29udHJpYnV0b3JzLmpzIiwiL3JlcG9zL0NsaWNrSGFuZGxlcklPL3JlYWN0LXNlbGVjdC9leGFtcGxlcy9zcmMvZGF0YS9zdGF0ZXMuanMiLCIvcmVwb3MvQ2xpY2tIYW5kbGVySU8vcmVhY3Qtc2VsZWN0L2V4YW1wbGVzL3NyYy9kYXRhL3VzZXJzLmpzIiwibm9kZV9tb2R1bGVzL2NoYXJlbmMvY2hhcmVuYy5qcyIsIm5vZGVfbW9kdWxlcy9jcnlwdC9jcnlwdC5qcyIsIm5vZGVfbW9kdWxlcy9kb20taGVscGVycy91dGlsL2luRE9NLmpzIiwibm9kZV9tb2R1bGVzL2RvbS1oZWxwZXJzL3V0aWwvc2Nyb2xsYmFyU2l6ZS5qcyIsIm5vZGVfbW9kdWxlcy9mYmpzL2xpYi9zaGFsbG93RXF1YWwuanMiLCJub2RlX21vZHVsZXMvaXMtYnVmZmVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2lzLXJldGluYS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9pc29tb3JwaGljLWZldGNoL2ZldGNoLW5wbS1icm93c2VyaWZ5LmpzIiwibm9kZV9tb2R1bGVzL21kNS9tZDUuanMiLCJub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wZXJmb3JtYW5jZS1ub3cvbGliL3BlcmZvcm1hbmNlLW5vdy5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvcXVlcnktc3RyaW5nL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JhZi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC1hZGRvbnMtc2hhbGxvdy1jb21wYXJlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWdyYXZhdGFyL2Rpc3QvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQtc2VsZWN0L2Rpc3QvY29tbW9uanMvVmlydHVhbGl6ZWRTZWxlY3QvVmlydHVhbGl6ZWRTZWxlY3QuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQtc2VsZWN0L2Rpc3QvY29tbW9uanMvVmlydHVhbGl6ZWRTZWxlY3QvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9BcnJvd0tleVN0ZXBwZXIvQXJyb3dLZXlTdGVwcGVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvQXJyb3dLZXlTdGVwcGVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvQXV0b1NpemVyL0F1dG9TaXplci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0F1dG9TaXplci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0NvbGxlY3Rpb24vQ29sbGVjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0NvbGxlY3Rpb24vQ29sbGVjdGlvblZpZXcuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9Db2xsZWN0aW9uL1NlY3Rpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9Db2xsZWN0aW9uL1NlY3Rpb25NYW5hZ2VyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvQ29sbGVjdGlvbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0NvbGxlY3Rpb24vdXRpbHMvY2FsY3VsYXRlU2l6ZUFuZFBvc2l0aW9uRGF0YS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0NvbHVtblNpemVyL0NvbHVtblNpemVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvQ29sdW1uU2l6ZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9GbGV4VGFibGUvRmxleENvbHVtbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0ZsZXhUYWJsZS9GbGV4VGFibGUuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9GbGV4VGFibGUvU29ydERpcmVjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0ZsZXhUYWJsZS9Tb3J0SW5kaWNhdG9yLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvRmxleFRhYmxlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvR3JpZC9HcmlkLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvR3JpZC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0dyaWQvdXRpbHMvY2FsY3VsYXRlU2l6ZUFuZFBvc2l0aW9uRGF0YUFuZFVwZGF0ZVNjcm9sbE9mZnNldC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0dyaWQvdXRpbHMvZ2V0TmVhcmVzdEluZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvR3JpZC91dGlscy9nZXRPdmVyc2NhbkluZGljZXMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9HcmlkL3V0aWxzL2dldFZpc2libGVDZWxsSW5kaWNlcy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0dyaWQvdXRpbHMvdXBkYXRlU2Nyb2xsSW5kZXhIZWxwZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9JbmZpbml0ZUxvYWRlci9JbmZpbml0ZUxvYWRlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL0luZmluaXRlTG9hZGVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvU2Nyb2xsU3luYy9TY3JvbGxTeW5jLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvU2Nyb2xsU3luYy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL1ZpcnR1YWxTY3JvbGwvVmlydHVhbFNjcm9sbC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL1ZpcnR1YWxTY3JvbGwvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC9kaXN0L2NvbW1vbmpzL3V0aWxzL2NyZWF0ZUNhbGxiYWNrTWVtb2l6ZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy91dGlscy9nZXRVcGRhdGVkT2Zmc2V0Rm9ySW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy91dGlscy9pbml0Q2VsbE1ldGFkYXRhLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvdmVuZG9yL2RldGVjdEVsZW1lbnRSZXNpemUuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL3NoYWxsb3dDb21wYXJlLmpzIiwibm9kZV9tb2R1bGVzL3N0cmljdC11cmktZW5jb2RlL2luZGV4LmpzIiwibm9kZV9t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SSxFQUFFLGNBQWMsRUFBRSxFQUN4QixFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxFQUMzQixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFDaEIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsRUFDMUIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEVBQ3hCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFDakIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLEVBQzNCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxFQUN4QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFB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dkIsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEVBQ3hCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFDekIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUNoQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNy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Q3ZCLEVBQUUsSUFBSSxFQUFFLDZCQUE2QixFQUFFLEVBQ3ZDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFDaEIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUNqQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUNyQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQ3BCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxF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QUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ25CLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFDckIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxFQUN4QixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFDdEIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsRUFDeEIsRUFBRSxJQUFJLEVBQUUscUJBQXFCLEVBQUUsRUFDL0IsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUN0QixFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsRUFDeEIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsRUFDMUIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQ3RCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFDdkIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ3ZCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUN2QixFQUFFLElBQUksRUFBRSxhQUFh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QUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFDL0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFDbEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFDakMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFDOUIsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFDaEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFDbEMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsRUFDbkMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFDL0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxFQUMxQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUNsQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxFQUN2QyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUNsQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxFQUNuQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxFQUNyQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUNsQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUNqQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUNsQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUNoQyxF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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hHQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2xHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3hFQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL2tCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0NUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogZXNsaW50IHJlYWN0L3Byb3AtdHlwZXM6IDAgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xuXG5pbXBvcnQgQ29udHJpYnV0b3JzIGZyb20gJy4vY29tcG9uZW50cy9Db250cmlidXRvcnMnO1xuaW1wb3J0IEdpdGh1YlVzZXJzIGZyb20gJy4vY29tcG9uZW50cy9HaXRodWJVc2Vycyc7XG5pbXBvcnQgQ3VzdG9tQ29tcG9uZW50cyBmcm9tICcuL2NvbXBvbmVudHMvQ3VzdG9tQ29tcG9uZW50cyc7XG5pbXBvcnQgQ3VzdG9tUmVuZGVyIGZyb20gJy4vY29tcG9uZW50cy9DdXN0b21SZW5kZXInO1xuaW1wb3J0IE11bHRpc2VsZWN0IGZyb20gJy4vY29tcG9uZW50cy9NdWx0aXNlbGVjdCc7XG5pbXBvcnQgTnVtZXJpY1NlbGVjdCBmcm9tICcuL2NvbXBvbmVudHMvTnVtZXJpY1NlbGVjdCc7XG5pbXBvcnQgVmlydHVhbGl6ZWQgZnJvbSAnLi9jb21wb25lbnRzL1ZpcnR1YWxpemVkJztcbmltcG9ydCBTdGF0ZXMgZnJvbSAnLi9jb21wb25lbnRzL1N0YXRlcyc7XG5cblJlYWN0RE9NLnJlbmRlcihcblx0PGRpdj5cblx0XHQ8U3RhdGVzIGxhYmVsPVwiU3RhdGVzXCIgc2VhcmNoYWJsZSAvPlxuXHRcdDxNdWx0aXNlbGVjdCBsYWJlbD1cIk11bHRpc2VsZWN0XCIgLz5cblx0XHQ8VmlydHVhbGl6ZWQgbGFiZWw9XCJWaXJ0dWFsaXplZFwiIC8+XG5cdFx0PENvbnRyaWJ1dG9ycyBsYWJlbD1cIkNvbnRyaWJ1dG9ycyAoQXN5bmMpXCIgLz5cblx0XHQ8R2l0aHViVXNlcnMgbGFiZWw9XCJHaXRodWIgdXNlcnMgKEFzeW5jIHdpdGggZmV0Y2guanMpXCIgLz5cblx0XHQ8TnVtZXJpY1NlbGVjdCBsYWJlbD1cIk51bWVyaWMgVmFsdWVzXCIgLz5cblx0XHQ8Q3VzdG9tUmVuZGVyIGxhYmVsPVwiQ3VzdG9tIFJlbmRlciBNZXRob2RzXCIvPlxuXHRcdDxDdXN0b21Db21wb25lbnRzIGxhYmVsPVwiQ3VzdG9tIFBsYWNlaG9sZGVyLCBPcHRpb24gYW5kIFZhbHVlIENvbXBvbmVudHNcIiAvPlxuXHRcdHsvKlxuXHRcdDxTZWxlY3RlZFZhbHVlc0ZpZWxkIGxhYmVsPVwiT3B0aW9uIENyZWF0aW9uICh0YWdzIG1vZGUpXCIgb3B0aW9ucz17RkxBVk9VUlN9IGFsbG93Q3JlYXRlIGhpbnQ9XCJFbnRlciBhIHZhbHVlIHRoYXQncyBOT1QgaW4gdGhlIGxpc3QsIHRoZW4gaGl0IHJldHVyblwiIC8+XG5cdFx0Ki99XG5cdDwvZGl2Pixcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V4YW1wbGUnKVxuKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5cbmNvbnN0IENPTlRSSUJVVE9SUyA9IHJlcXVpcmUoJy4uL2RhdGEvY29udHJpYnV0b3JzJyk7XG5jb25zdCBNQVhfQ09OVFJJQlVUT1JTID0gNjtcbmNvbnN0IEFTWU5DX0RFTEFZID0gNTAwO1xuXG5jb25zdCBDb250cmlidXRvcnMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnQ29udHJpYnV0b3JzJyxcblx0cHJvcFR5cGVzOiB7XG5cdFx0bGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG11bHRpOiB0cnVlLFxuXHRcdFx0dmFsdWU6IFtDT05UUklCVVRPUlNbMF1dLFxuXHRcdH07XG5cdH0sXG5cdG9uQ2hhbmdlICh2YWx1ZSkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0dmFsdWU6IHZhbHVlLFxuXHRcdH0pO1xuXHR9LFxuXHRzd2l0Y2hUb011bHRpICgpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdG11bHRpOiB0cnVlLFxuXHRcdFx0dmFsdWU6IFt0aGlzLnN0YXRlLnZhbHVlXSxcblx0XHR9KTtcblx0fSxcblx0c3dpdGNoVG9TaW5nbGUgKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0bXVsdGk6IGZhbHNlLFxuXHRcdFx0dmFsdWU6IHRoaXMuc3RhdGUudmFsdWVbMF0sXG5cdFx0fSk7XG5cdH0sXG5cdGdldENvbnRyaWJ1dG9ycyAoaW5wdXQsIGNhbGxiYWNrKSB7XG5cdFx0aW5wdXQgPSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xuXHRcdHZhciBvcHRpb25zID0gQ09OVFJJQlVUT1JTLmZpbHRlcihpID0+IHtcblx0XHRcdHJldHVybiBpLmdpdGh1Yi5zdWJzdHIoMCwgaW5wdXQubGVuZ3RoKSA9PT0gaW5wdXQ7XG5cdFx0fSk7XG5cdFx0dmFyIGRhdGEgPSB7XG5cdFx0XHRvcHRpb25zOiBvcHRpb25zLnNsaWNlKDAsIE1BWF9DT05UUklCVVRPUlMpLFxuXHRcdFx0Y29tcGxldGU6IG9wdGlvbnMubGVuZ3RoIDw9IE1BWF9DT05UUklCVVRPUlMsXG5cdFx0fTtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0Y2FsbGJhY2sobnVsbCwgZGF0YSk7XG5cdFx0fSwgQVNZTkNfREVMQVkpO1xuXHR9LFxuXHRnb3RvQ29udHJpYnV0b3IgKHZhbHVlLCBldmVudCkge1xuXHRcdHdpbmRvdy5vcGVuKCdodHRwczovL2dpdGh1Yi5jb20vJyArIHZhbHVlLmdpdGh1Yik7XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxuXHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwic2VjdGlvbi1oZWFkaW5nXCI+e3RoaXMucHJvcHMubGFiZWx9PC9oMz5cblx0XHRcdFx0PFNlbGVjdC5Bc3luYyBtdWx0aT17dGhpcy5zdGF0ZS5tdWx0aX0gdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfSBvblZhbHVlQ2xpY2s9e3RoaXMuZ290b0NvbnRyaWJ1dG9yfSB2YWx1ZUtleT1cImdpdGh1YlwiIGxhYmVsS2V5PVwibmFtZVwiIGxvYWRPcHRpb25zPXt0aGlzLmdldENvbnRyaWJ1dG9yc30gLz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveC1saXN0XCI+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInJhZGlvXCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUubXVsdGl9IG9uQ2hhbmdlPXt0aGlzLnN3aXRjaFRvTXVsdGl9Lz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+TXVsdGlzZWxlY3Q8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgY2hlY2tlZD17IXRoaXMuc3RhdGUubXVsdGl9IG9uQ2hhbmdlPXt0aGlzLnN3aXRjaFRvU2luZ2xlfS8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPlNpbmdsZSBWYWx1ZTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJoaW50XCI+VGhpcyBleGFtcGxlIGltcGxlbWVudHMgY3VzdG9tIGxhYmVsIGFuZCB2YWx1ZSBwcm9wZXJ0aWVzLCBhc3luYyBvcHRpb25zIGFuZCBvcGVucyB0aGUgZ2l0aHViIHByb2ZpbGVzIGluIGEgbmV3IHdpbmRvdyB3aGVuIHZhbHVlcyBhcmUgY2xpY2tlZDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29udHJpYnV0b3JzO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcbmltcG9ydCBHcmF2YXRhciBmcm9tICdyZWFjdC1ncmF2YXRhcic7XG5cbmNvbnN0IFVTRVJTID0gcmVxdWlyZSgnLi4vZGF0YS91c2VycycpO1xuY29uc3QgR1JBVkFUQVJfU0laRSA9IDE1O1xuXG5jb25zdCBHcmF2YXRhck9wdGlvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cHJvcFR5cGVzOiB7XG5cdFx0Y2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuXHRcdGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0XHRpc0Rpc2FibGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcblx0XHRpc0ZvY3VzZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuXHRcdGlzU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuXHRcdG9uRm9jdXM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXHRcdG9uU2VsZWN0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblx0XHRvcHRpb246IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcblx0fSxcblx0aGFuZGxlTW91c2VEb3duIChldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0dGhpcy5wcm9wcy5vblNlbGVjdCh0aGlzLnByb3BzLm9wdGlvbiwgZXZlbnQpO1xuXHR9LFxuXHRoYW5kbGVNb3VzZUVudGVyIChldmVudCkge1xuXHRcdHRoaXMucHJvcHMub25Gb2N1cyh0aGlzLnByb3BzLm9wdGlvbiwgZXZlbnQpO1xuXHR9LFxuXHRoYW5kbGVNb3VzZU1vdmUgKGV2ZW50KSB7XG5cdFx0aWYgKHRoaXMucHJvcHMuaXNGb2N1c2VkKSByZXR1cm47XG5cdFx0dGhpcy5wcm9wcy5vbkZvY3VzKHRoaXMucHJvcHMub3B0aW9uLCBldmVudCk7XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0bGV0IGdyYXZhdGFyU3R5bGUgPSB7XG5cdFx0XHRib3JkZXJSYWRpdXM6IDMsXG5cdFx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcblx0XHRcdG1hcmdpblJpZ2h0OiAxMCxcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuXHRcdFx0dG9wOiAtMixcblx0XHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxuXHRcdH07XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNsYXNzTmFtZX1cblx0XHRcdFx0b25Nb3VzZURvd249e3RoaXMuaGFuZGxlTW91c2VEb3dufVxuXHRcdFx0XHRvbk1vdXNlRW50ZXI9e3RoaXMuaGFuZGxlTW91c2VFbnRlcn1cblx0XHRcdFx0b25Nb3VzZU1vdmU9e3RoaXMuaGFuZGxlTW91c2VNb3ZlfVxuXHRcdFx0XHR0aXRsZT17dGhpcy5wcm9wcy5vcHRpb24udGl0bGV9PlxuXHRcdFx0XHQ8R3JhdmF0YXIgZW1haWw9e3RoaXMucHJvcHMub3B0aW9uLmVtYWlsfSBzaXplPXtHUkFWQVRBUl9TSVpFfSBzdHlsZT17Z3JhdmF0YXJTdHlsZX0gLz5cblx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxuY29uc3QgR3JhdmF0YXJWYWx1ZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cHJvcFR5cGVzOiB7XG5cdFx0Y2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuXHRcdHBsYWNlaG9sZGVyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0dmFyIGdyYXZhdGFyU3R5bGUgPSB7XG5cdFx0XHRib3JkZXJSYWRpdXM6IDMsXG5cdFx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcblx0XHRcdG1hcmdpblJpZ2h0OiAxMCxcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuXHRcdFx0dG9wOiAtMixcblx0XHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxuXHRcdH07XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiU2VsZWN0LXZhbHVlXCIgdGl0bGU9e3RoaXMucHJvcHMudmFsdWUudGl0bGV9PlxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJTZWxlY3QtdmFsdWUtbGFiZWxcIj5cblx0XHRcdFx0XHQ8R3JhdmF0YXIgZW1haWw9e3RoaXMucHJvcHMudmFsdWUuZW1haWx9IHNpemU9e0dSQVZBVEFSX1NJWkV9IHN0eWxlPXtncmF2YXRhclN0eWxlfSAvPlxuXHRcdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxuY29uc3QgVXNlcnNGaWVsZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cHJvcFR5cGVzOiB7XG5cdFx0aGludDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0XHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcblx0XHRyZXR1cm4ge307XG5cdH0sXG5cdHNldFZhbHVlICh2YWx1ZSkge1xuXHRcdHRoaXMuc2V0U3RhdGUoeyB2YWx1ZSB9KTtcblx0fSxcblx0cmVuZGVyICgpIHtcblx0XHR2YXIgcGxhY2Vob2xkZXIgPSA8c3Bhbj4mIzk3ODY7IFNlbGVjdCBVc2VyPC9zcGFuPjtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInNlY3Rpb24taGVhZGluZ1wiPnt0aGlzLnByb3BzLmxhYmVsfTwvaDM+XG5cdFx0XHRcdDxTZWxlY3Rcblx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5zZXRWYWx1ZX1cblx0XHRcdFx0XHRvcHRpb25Db21wb25lbnQ9e0dyYXZhdGFyT3B0aW9ufVxuXHRcdFx0XHRcdG9wdGlvbnM9e1VTRVJTfVxuXHRcdFx0XHRcdHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cblx0XHRcdFx0XHR2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cblx0XHRcdFx0XHR2YWx1ZUNvbXBvbmVudD17R3JhdmF0YXJWYWx1ZX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImhpbnRcIj5cblx0XHRcdFx0XHRUaGlzIGV4YW1wbGUgaW1wbGVtZW50cyBjdXN0b20gT3B0aW9uIGFuZCBWYWx1ZSBjb21wb25lbnRzIHRvIHJlbmRlciBhIEdyYXZhdGFyIGltYWdlIGZvciBlYWNoIHVzZXIgYmFzZWQgb24gdGhlaXIgZW1haWwuXG5cdFx0XHRcdFx0SXQgYWxzbyBkZW1vbnN0cmF0ZXMgcmVuZGVyaW5nIEhUTUwgZWxlbWVudHMgYXMgdGhlIHBsYWNlaG9sZGVyLlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJzRmllbGQ7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xuXG52YXIgRGlzYWJsZWRVcHNlbGxPcHRpb25zID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTogJ0Rpc2FibGVkVXBzZWxsT3B0aW9ucycsXG5cdHByb3BUeXBlczoge1xuXHRcdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHR9LFxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xuXHRcdHJldHVybiB7fTtcblx0fSxcblx0c2V0VmFsdWUgKHZhbHVlKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IHZhbHVlIH0pO1xuXHRcdGNvbnNvbGUubG9nKCdTdXBwb3J0IGxldmVsIHNlbGVjdGVkOicsIHZhbHVlLmxhYmVsKTtcblx0fSxcblx0cmVuZGVyTGluazogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIDxhIHN0eWxlPXt7IG1hcmdpbkxlZnQ6IDUgfX0gaHJlZj1cIi91cGdyYWRlXCIgdGFyZ2V0PVwiX2JsYW5rXCI+VXBncmFkZSBoZXJlITwvYT47XG5cdH0sXG5cdHJlbmRlck9wdGlvbjogZnVuY3Rpb24ob3B0aW9uKSB7XG5cdFx0cmV0dXJuIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiBvcHRpb24uY29sb3IgfX0+e29wdGlvbi5sYWJlbH0ge29wdGlvbi5saW5rfTwvc3Bhbj47XG5cdH0sXG5cdHJlbmRlclZhbHVlOiBmdW5jdGlvbihvcHRpb24pIHtcblx0XHRyZXR1cm4gPHN0cm9uZyBzdHlsZT17eyBjb2xvcjogb3B0aW9uLmNvbG9yIH19PntvcHRpb24ubGFiZWx9PC9zdHJvbmc+O1xuXHR9LFxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBvcHRpb25zID0gW1xuXHRcdFx0eyBsYWJlbDogJ0Jhc2ljIGN1c3RvbWVyIHN1cHBvcnQnLCB2YWx1ZTogJ2Jhc2ljJywgY29sb3I6ICcjRTMxODY0JyB9LFxuXHRcdFx0eyBsYWJlbDogJ1ByZW1pdW0gY3VzdG9tZXIgc3VwcG9ydCcsIHZhbHVlOiAncHJlbWl1bScsIGNvbG9yOiAnIzYyMTZBMycgfSxcblx0XHRcdHsgbGFiZWw6ICdQcm8gY3VzdG9tZXIgc3VwcG9ydCcsIHZhbHVlOiAncHJvJywgZGlzYWJsZWQ6IHRydWUsIGxpbms6IHRoaXMucmVuZGVyTGluaygpIH0sXG5cdFx0XTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XG5cdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJzZWN0aW9uLWhlYWRpbmdcIj57dGhpcy5wcm9wcy5sYWJlbH08L2gzPlxuXHRcdFx0XHQ8U2VsZWN0XG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCJTZWxlY3QgeW91ciBzdXBwb3J0IGxldmVsXCJcblx0XHRcdFx0XHRvcHRpb25zPXtvcHRpb25zfVxuXHRcdFx0XHRcdG9wdGlvblJlbmRlcmVyPXt0aGlzLnJlbmRlck9wdGlvbn1cblx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5zZXRWYWx1ZX1cblx0XHRcdFx0XHR2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX1cblx0XHRcdFx0XHR2YWx1ZVJlbmRlcmVyPXt0aGlzLnJlbmRlclZhbHVlfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaGludFwiPlRoaXMgZGVtb25zdGF0ZXMgY3VzdG9tIHJlbmRlciBtZXRob2RzIGFuZCBsaW5rcyBpbiBkaXNhYmxlZCBvcHRpb25zPC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcbm1vZHVsZS5leHBvcnRzID0gRGlzYWJsZWRVcHNlbGxPcHRpb25zO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcbmltcG9ydCBmZXRjaCBmcm9tICdpc29tb3JwaGljLWZldGNoJztcblxuXG5jb25zdCBHaXRodWJVc2VycyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6ICdHaXRodWJVc2VycycsXG5cdHByb3BUeXBlczoge1xuXHRcdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHR9LFxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRtdWx0aTogdHJ1ZVxuXHRcdH07XG5cdH0sXG5cdG9uQ2hhbmdlICh2YWx1ZSkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0dmFsdWU6IHZhbHVlLFxuXHRcdH0pO1xuXHR9LFxuXHRzd2l0Y2hUb011bHRpICgpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdG11bHRpOiB0cnVlLFxuXHRcdFx0dmFsdWU6IFt0aGlzLnN0YXRlLnZhbHVlXSxcblx0XHR9KTtcblx0fSxcblx0c3dpdGNoVG9TaW5nbGUgKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0bXVsdGk6IGZhbHNlLFxuXHRcdFx0dmFsdWU6IHRoaXMuc3RhdGUudmFsdWUgPyB0aGlzLnN0YXRlLnZhbHVlWzBdIDogbnVsbFxuXHRcdH0pO1xuXHR9LFxuXHRnZXRVc2VycyAoaW5wdXQpIHtcblx0XHRyZXR1cm4gZmV0Y2goYGh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vc2VhcmNoL3VzZXJzP3E9JHtpbnB1dH1gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbigoanNvbikgPT4ge1xuICAgICAgICByZXR1cm4geyBvcHRpb25zOiBqc29uLml0ZW1zIH07XG4gICAgICB9KTtcblx0fSxcblx0Z290b1VzZXIgKHZhbHVlLCBldmVudCkge1xuXHRcdHdpbmRvdy5vcGVuKHZhbHVlLmh0bWxfdXJsKTtcblx0fSxcblx0cmVuZGVyICgpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XG5cdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJzZWN0aW9uLWhlYWRpbmdcIj57dGhpcy5wcm9wcy5sYWJlbH08L2gzPlxuXHRcdFx0XHQ8U2VsZWN0LkFzeW5jIG11bHRpPXt0aGlzLnN0YXRlLm11bHRpfSB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX0gb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9IG9uVmFsdWVDbGljaz17dGhpcy5nb3RvVXNlcn0gdmFsdWVLZXk9XCJpZFwiIGxhYmVsS2V5PVwibG9naW5cIiBsb2FkT3B0aW9ucz17dGhpcy5nZXRVc2Vyc30gbWluaW11bUlucHV0PXsxfSBiYWNrc3BhY2VSZW1vdmVzPXtmYWxzZX0gLz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveC1saXN0XCI+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInJhZGlvXCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUubXVsdGl9IG9uQ2hhbmdlPXt0aGlzLnN3aXRjaFRvTXVsdGl9Lz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+TXVsdGlzZWxlY3Q8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgY2hlY2tlZD17IXRoaXMuc3RhdGUubXVsdGl9IG9uQ2hhbmdlPXt0aGlzLnN3aXRjaFRvU2luZ2xlfS8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPlNpbmdsZSBWYWx1ZTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJoaW50XCI+VGhpcyBleGFtcGxlIHVzZXMgZmV0Y2guanMgZm9yIHNob3dpbmcgQXN5bmMgb3B0aW9ucyB3aXRoIFByb21pc2VzPC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBHaXRodWJVc2VycztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5cbmNvbnN0IEZMQVZPVVJTID0gW1xuXHR7IGxhYmVsOiAnQ2hvY29sYXRlJywgdmFsdWU6ICdjaG9jb2xhdGUnIH0sXG5cdHsgbGFiZWw6ICdWYW5pbGxhJywgdmFsdWU6ICd2YW5pbGxhJyB9LFxuXHR7IGxhYmVsOiAnU3RyYXdiZXJyeScsIHZhbHVlOiAnc3RyYXdiZXJyeScgfSxcblx0eyBsYWJlbDogJ0NhcmFtZWwnLCB2YWx1ZTogJ2NhcmFtZWwnIH0sXG5cdHsgbGFiZWw6ICdDb29raWVzIGFuZCBDcmVhbScsIHZhbHVlOiAnY29va2llc2NyZWFtJyB9LFxuXHR7IGxhYmVsOiAnUGVwcGVybWludCcsIHZhbHVlOiAncGVwcGVybWludCcgfSxcbl07XG5cbmNvbnN0IFdIWV9XT1VMRF9ZT1UgPSBbXG5cdHsgbGFiZWw6ICdDaG9jb2xhdGUgKGFyZSB5b3UgY3Jhenk/KScsIHZhbHVlOiAnY2hvY29sYXRlJywgZGlzYWJsZWQ6IHRydWUgfSxcbl0uY29uY2F0KEZMQVZPVVJTLnNsaWNlKDEpKTtcblxudmFyIE11bHRpU2VsZWN0RmllbGQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnTXVsdGlTZWxlY3RGaWVsZCcsXG5cdHByb3BUeXBlczoge1xuXHRcdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHR9LFxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRkaXNhYmxlZDogZmFsc2UsXG5cdFx0XHRjcmF6eTogZmFsc2UsXG5cdFx0XHRvcHRpb25zOiBGTEFWT1VSUyxcblx0XHRcdHZhbHVlOiBbXSxcblx0XHR9O1xuXHR9LFxuXHRoYW5kbGVTZWxlY3RDaGFuZ2UgKHZhbHVlKSB7XG5cdFx0Y29uc29sZS5sb2coJ1lvdVxcJ3ZlIHNlbGVjdGVkOicsIHZhbHVlKTtcblx0XHR0aGlzLnNldFN0YXRlKHsgdmFsdWUgfSk7XG5cdH0sXG5cdHRvZ2dsZURpc2FibGVkIChlKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IGRpc2FibGVkOiBlLnRhcmdldC5jaGVja2VkIH0pO1xuXHR9LFxuXHR0b2dnbGVDaG9jb2xhdGUgKGUpIHtcblx0XHRsZXQgY3JhenkgPSBlLnRhcmdldC5jaGVja2VkO1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Y3Jhenk6IGNyYXp5LFxuXHRcdFx0b3B0aW9uczogY3JhenkgPyBXSFlfV09VTERfWU9VIDogRkxBVk9VUlMsXG5cdFx0fSk7XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxuXHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwic2VjdGlvbi1oZWFkaW5nXCI+e3RoaXMucHJvcHMubGFiZWx9PC9oMz5cblx0XHRcdFx0PFNlbGVjdCBtdWx0aSBzaW1wbGVWYWx1ZSBkaXNhYmxlZD17dGhpcy5zdGF0ZS5kaXNhYmxlZH0gdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9IHBsYWNlaG9sZGVyPVwiU2VsZWN0IHlvdXIgZmF2b3VyaXRlKHMpXCIgb3B0aW9ucz17dGhpcy5zdGF0ZS5vcHRpb25zfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVTZWxlY3RDaGFuZ2V9IC8+XG5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveC1saXN0XCI+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUuZGlzYWJsZWR9IG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZURpc2FibGVkfSAvPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tib3gtbGFiZWxcIj5EaXNhYmxlIHRoZSBjb250cm9sPC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUuY3Jhenl9IG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUNob2NvbGF0ZX0gLz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+SSBkb24ndCBsaWtlIENob2NvbGF0ZSAoZGlzYWJsZWQgdGhlIG9wdGlvbik8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBNdWx0aVNlbGVjdEZpZWxkO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcblxudmFyIFZhbHVlc0FzTnVtYmVyc0ZpZWxkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTogJ1ZhbHVlc0FzTnVtYmVyc0ZpZWxkJyxcblx0cHJvcFR5cGVzOiB7XG5cdFx0bGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0b3B0aW9uczogW1xuXHRcdFx0XHR7IHZhbHVlOiAxMCwgbGFiZWw6ICdUZW4nIH0sXG5cdFx0XHRcdHsgdmFsdWU6IDExLCBsYWJlbDogJ0VsZXZlbicgfSxcblx0XHRcdFx0eyB2YWx1ZTogMTIsIGxhYmVsOiAnVHdlbHZlJyB9LFxuXHRcdFx0XHR7IHZhbHVlOiAyMywgbGFiZWw6ICdUd2VudHktdGhyZWUnIH0sXG5cdFx0XHRcdHsgdmFsdWU6IDI0LCBsYWJlbDogJ1R3ZW50eS1mb3VyJyB9XG5cdFx0XHRdLFxuXHRcdFx0bWF0Y2hQb3M6ICdhbnknLFxuXHRcdFx0bWF0Y2hWYWx1ZTogdHJ1ZSxcblx0XHRcdG1hdGNoTGFiZWw6IHRydWUsXG5cdFx0XHR2YWx1ZTogbnVsbCxcblx0XHRcdG11bHRpOiBmYWxzZVxuXHRcdH07XG5cdH0sXG5cdG9uQ2hhbmdlTWF0Y2hTdGFydChldmVudCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0bWF0Y2hQb3M6IGV2ZW50LnRhcmdldC5jaGVja2VkID8gJ3N0YXJ0JyA6ICdhbnknXG5cdFx0fSk7XG5cdH0sXG5cdG9uQ2hhbmdlTWF0Y2hWYWx1ZShldmVudCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0bWF0Y2hWYWx1ZTogZXZlbnQudGFyZ2V0LmNoZWNrZWRcblx0XHR9KTtcblx0fSxcblx0b25DaGFuZ2VNYXRjaExhYmVsKGV2ZW50KSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRtYXRjaExhYmVsOiBldmVudC50YXJnZXQuY2hlY2tlZFxuXHRcdH0pO1xuXHR9LFxuXHRvbkNoYW5nZSh2YWx1ZSkge1xuXHRcdHRoaXMuc2V0U3RhdGUoeyB2YWx1ZSB9KTtcblx0XHRjb25zb2xlLmxvZygnTnVtZXJpYyBTZWxlY3QgdmFsdWUgY2hhbmdlZCB0bycsIHZhbHVlKTtcblx0fSxcblx0b25DaGFuZ2VNdWx0aShldmVudCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0bXVsdGk6IGV2ZW50LnRhcmdldC5jaGVja2VkXG5cdFx0fSk7XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0dmFyIG1hdGNoUHJvcCA9ICdhbnknO1xuXHRcdGlmICh0aGlzLnN0YXRlLm1hdGNoTGFiZWwgJiYgIXRoaXMuc3RhdGUubWF0Y2hWYWx1ZSkge1xuXHRcdFx0bWF0Y2hQcm9wID0gJ2xhYmVsJztcblx0XHR9XG5cdFx0aWYgKCF0aGlzLnN0YXRlLm1hdGNoTGFiZWwgJiYgdGhpcy5zdGF0ZS5tYXRjaFZhbHVlKSB7XG5cdFx0XHRtYXRjaFByb3AgPSAndmFsdWUnO1xuXHRcdH1cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XG5cdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJzZWN0aW9uLWhlYWRpbmdcIj57dGhpcy5wcm9wcy5sYWJlbH08L2gzPlxuXHRcdFx0XHQ8U2VsZWN0XG5cdFx0XHRcdFx0bWF0Y2hQb3M9e3RoaXMuc3RhdGUubWF0Y2hQb3N9XG5cdFx0XHRcdFx0bWF0Y2hQcm9wPXttYXRjaFByb3B9XG5cdFx0XHRcdFx0bXVsdGk9e3RoaXMuc3RhdGUubXVsdGl9XG5cdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG5cdFx0XHRcdFx0b3B0aW9ucz17dGhpcy5zdGF0ZS5vcHRpb25zfVxuXHRcdFx0XHRcdHNpbXBsZVZhbHVlXG5cdFx0XHRcdFx0dmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveC1saXN0XCI+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUubXVsdGl9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlTXVsdGl9IC8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPk11bHRpLVNlbGVjdDwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBjaGVja2VkPXt0aGlzLnN0YXRlLm1hdGNoVmFsdWV9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlTWF0Y2hWYWx1ZX0gLz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+TWF0Y2ggdmFsdWU8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5tYXRjaExhYmVsfSBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZU1hdGNoTGFiZWx9IC8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPk1hdGNoIGxhYmVsPC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUubWF0Y2hQb3MgPT09ICdzdGFydCd9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlTWF0Y2hTdGFydH0gLz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+T25seSBpbmNsdWRlIG1hdGNoZXMgZnJvbSB0aGUgc3RhcnQgb2YgdGhlIHN0cmluZzwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJoaW50XCI+VGhpcyBleGFtcGxlIHVzZXMgc2ltcGxlIG51bWVyaWMgdmFsdWVzPC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBWYWx1ZXNBc051bWJlcnNGaWVsZDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5cbmNvbnN0IFNUQVRFUyA9IHJlcXVpcmUoJy4uL2RhdGEvc3RhdGVzJyk7XG5cbnZhciBTdGF0ZXNGaWVsZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6ICdTdGF0ZXNGaWVsZCcsXG5cdHByb3BUeXBlczoge1xuXHRcdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHRcdHNlYXJjaGFibGU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuXHR9LFxuXHRnZXREZWZhdWx0UHJvcHMgKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRsYWJlbDogJ1N0YXRlczonLFxuXHRcdFx0c2VhcmNoYWJsZTogdHJ1ZSxcblx0XHR9O1xuXHR9LFxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRjb3VudHJ5OiAnQVUnLFxuXHRcdFx0ZGlzYWJsZWQ6IGZhbHNlLFxuXHRcdFx0c2VhcmNoYWJsZTogdGhpcy5wcm9wcy5zZWFyY2hhYmxlLFxuXHRcdFx0c2VsZWN0VmFsdWU6ICduZXctc291dGgtd2FsZXMnLFxuXHRcdFx0Y2xlYXJhYmxlOiB0cnVlLFxuXHRcdH07XG5cdH0sXG5cdHN3aXRjaENvdW50cnkgKGUpIHtcblx0XHR2YXIgbmV3Q291bnRyeSA9IGUudGFyZ2V0LnZhbHVlO1xuXHRcdGNvbnNvbGUubG9nKCdDb3VudHJ5IGNoYW5nZWQgdG8gJyArIG5ld0NvdW50cnkpO1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Y291bnRyeTogbmV3Q291bnRyeSxcblx0XHRcdHNlbGVjdFZhbHVlOiBudWxsXG5cdFx0fSk7XG5cdH0sXG5cdHVwZGF0ZVZhbHVlIChuZXdWYWx1ZSkge1xuXHRcdGNvbnNvbGUubG9nKCdTdGF0ZSBjaGFuZ2VkIHRvICcgKyBuZXdWYWx1ZSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRzZWxlY3RWYWx1ZTogbmV3VmFsdWVcblx0XHR9KTtcblx0fSxcblx0Zm9jdXNTdGF0ZVNlbGVjdCAoKSB7XG5cdFx0dGhpcy5yZWZzLnN0YXRlU2VsZWN0LmZvY3VzKCk7XG5cdH0sXG5cdHRvZ2dsZUNoZWNrYm94IChlKSB7XG5cdFx0bGV0IG5ld1N0YXRlID0ge307XG5cdFx0bmV3U3RhdGVbZS50YXJnZXQubmFtZV0gPSBlLnRhcmdldC5jaGVja2VkO1xuXHRcdHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xuXHR9LFxuXHRyZW5kZXIgKCkge1xuXHRcdHZhciBvcHRpb25zID0gU1RBVEVTW3RoaXMuc3RhdGUuY291bnRyeV07XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxuXHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwic2VjdGlvbi1oZWFkaW5nXCI+e3RoaXMucHJvcHMubGFiZWx9PC9oMz5cblx0XHRcdFx0PFNlbGVjdCByZWY9XCJzdGF0ZVNlbGVjdFwiIGF1dG9mb2N1cyBvcHRpb25zPXtvcHRpb25zfSBzaW1wbGVWYWx1ZSBjbGVhcmFibGU9e3RoaXMuc3RhdGUuY2xlYXJhYmxlfSBuYW1lPVwic2VsZWN0ZWQtc3RhdGVcIiBkaXNhYmxlZD17dGhpcy5zdGF0ZS5kaXNhYmxlZH0gdmFsdWU9e3RoaXMuc3RhdGUuc2VsZWN0VmFsdWV9IG9uQ2hhbmdlPXt0aGlzLnVwZGF0ZVZhbHVlfSBzZWFyY2hhYmxlPXt0aGlzLnN0YXRlLnNlYXJjaGFibGV9IC8+XG5cblx0XHRcdFx0PGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6IDE0IH19PlxuXHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e3RoaXMuZm9jdXNTdGF0ZVNlbGVjdH0+Rm9jdXMgU2VsZWN0PC9idXR0b24+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCIgc3R5bGU9e3sgbWFyZ2luTGVmdDogMTAgfX0+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIG5hbWU9XCJzZWFyY2hhYmxlXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5zZWFyY2hhYmxlfSBvbkNoYW5nZT17dGhpcy50b2dnbGVDaGVja2JveH0vPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tib3gtbGFiZWxcIj5TZWFyY2hhYmxlPC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCIgc3R5bGU9e3sgbWFyZ2luTGVmdDogMTAgfX0+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIG5hbWU9XCJkaXNhYmxlZFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUuZGlzYWJsZWR9IG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZUNoZWNrYm94fS8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPkRpc2FibGVkPC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCIgc3R5bGU9e3sgbWFyZ2luTGVmdDogMTAgfX0+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIG5hbWU9XCJjbGVhcmFibGVcIiBjaGVja2VkPXt0aGlzLnN0YXRlLmNsZWFyYWJsZX0gb25DaGFuZ2U9e3RoaXMudG9nZ2xlQ2hlY2tib3h9Lz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+Q2xlYXJhYmxlPC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94LWxpc3RcIj5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5jb3VudHJ5ID09PSAnQVUnfSB2YWx1ZT1cIkFVXCIgb25DaGFuZ2U9e3RoaXMuc3dpdGNoQ291bnRyeX0vPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tib3gtbGFiZWxcIj5BdXN0cmFsaWE8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5jb3VudHJ5ID09PSAnVVMnfSB2YWx1ZT1cIlVTXCIgb25DaGFuZ2U9e3RoaXMuc3dpdGNoQ291bnRyeX0vPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tib3gtbGFiZWxcIj5Vbml0ZWQgU3RhdGVzPC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBTdGF0ZXNGaWVsZDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVmlydHVhbGl6ZWRTZWxlY3QgZnJvbSAncmVhY3QtdmlydHVhbGl6ZWQtc2VsZWN0JztcblxuY29uc3QgREFUQSA9IHJlcXVpcmUoJy4uL2RhdGEvY2l0aWVzJyk7XG5cbnZhciBDaXRpZXNGaWVsZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6ICdDaXRpZXNGaWVsZCcsXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XG5cdFx0cmV0dXJuIHt9O1xuXHR9LFxuXHR1cGRhdGVWYWx1ZSAobmV3VmFsdWUpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdHNlbGVjdFZhbHVlOiBuZXdWYWx1ZVxuXHRcdH0pO1xuXHR9LFxuXHRyZW5kZXIgKCkge1xuXHRcdHZhciBvcHRpb25zID0gREFUQS5DSVRJRVM7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxuXHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwic2VjdGlvbi1oZWFkaW5nXCI+Q2l0aWVzIChMYXJnZSBEYXRhc2V0KTwvaDM+XG5cdFx0XHRcdDxWaXJ0dWFsaXplZFNlbGVjdCByZWY9XCJjaXR5U2VsZWN0XCJcblx0XHRcdFx0XHRvcHRpb25zPXtvcHRpb25zfVxuXHRcdFx0XHRcdHNpbXBsZVZhbHVlXG5cdFx0XHRcdFx0Y2xlYXJhYmxlXG5cdFx0XHRcdFx0bmFtZT1cInNlbGVjdC1jaXR5XCJcblx0XHRcdFx0XHR2YWx1ZT17dGhpcy5zdGF0ZS5zZWxlY3RWYWx1ZX1cblx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy51cGRhdGVWYWx1ZX1cblx0XHRcdFx0XHRzZWFyY2hhYmxlXG5cdFx0XHRcdFx0bGFiZWxLZXk9XCJuYW1lXCJcblx0XHRcdFx0XHR2YWx1ZUtleT1cIm5hbWVcIlxuXHRcdFx0XHQvPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImhpbnRcIj5cblx0XHRcdFx0XHRVc2VzIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vYnZhdWdobi9yZWFjdC12aXJ0dWFsaXplZFwiPnJlYWN0LXZpcnR1YWxpemVkPC9hPiBhbmQgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9idmF1Z2huL3JlYWN0LXZpcnR1YWxpemVkLXNlbGVjdC9cIj5yZWFjdC12aXJ0dWFsaXplZC1zZWxlY3Q8L2E+IHRvIGRpc3BsYXkgYSBsaXN0IG9mIHRoZSB3b3JsZCdzIDEsMDAwIGxhcmdlc3QgY2l0aWVzLlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gQ2l0aWVzRmllbGQ7XG4iLCJleHBvcnRzLkNJVElFUyA9IFtcbiAgeyBuYW1lOiAnQWJpbGVuZScgfSxcbiAgeyBuYW1lOiAnQWRkaXNvbicgfSxcbiAgeyBuYW1lOiAnQWtyb24nIH0sXG4gIHsgbmFtZTogJ0FsYW1lZGEnIH0sXG4gIHsgbmFtZTogJ0FsYmFueScgfSxcbiAgeyBuYW1lOiAnQWxiYW55JyB9LFxuICB7IG5hbWU6ICdBbGJhbnknIH0sXG4gIHsgbmFtZTogJ0FsYnVxdWVycXVlJyB9LFxuICB7IG5hbWU6ICdBbGV4YW5kcmlhJyB9LFxuICB7IG5hbWU6ICdBbGV4YW5kcmlhJyB9LFxuICB7IG5hbWU6ICdBbGhhbWJyYScgfSxcbiAgeyBuYW1lOiAnQWxpc28gVmllam8nIH0sXG4gIHsgbmFtZTogJ0FsbGVuJyB9LFxuICB7IG5hbWU6ICdBbGxlbnRvd24nIH0sXG4gIHsgbmFtZTogJ0FscGhhcmV0dGEnIH0sXG4gIHsgbmFtZTogJ0FsdGFtb250ZSBTcHJpbmdzJyB9LFxuICB7IG5hbWU6ICdBbHRvb25hJyB9LFxuICB7IG5hbWU6ICdBbWFyaWxsbycgfSxcbiAgeyBuYW1lOiAnQW1lcycgfSxcbiAgeyBuYW1lOiAnQW5haGVpbScgfSxcbiAgeyBuYW1lOiAnQW5jaG9yYWdlJyB9LFxuICB7IG5hbWU6ICdBbmRlcnNvbicgfSxcbiAgeyBuYW1lOiAnQW5rZW55JyB9LFxuICB7IG5hbWU6ICdBbm4gQXJib3InIH0sXG4gIHsgbmFtZTogJ0FubmFwb2xpcycgfSxcbiAgeyBuYW1lOiAnQW50aW9jaCcgfSxcbiAgeyBuYW1lOiAnQXBhY2hlIEp1bmN0aW9uJyB9LFxuICB7IG5hbWU6ICdBcGV4JyB9LFxuICB7IG5hbWU6ICdBcG9wa2EnIH0sXG4gIHsgbmFtZTogJ0FwcGxlIFZhbGxleScgfSxcbiAgeyBuYW1lOiAnQXBwbGUgVmFsbGV5JyB9LFxuICB7IG5hbWU6ICdBcHBsZXRvbicgfSxcbiAgeyBuYW1lOiAnQXJjYWRpYScgfSxcbiAgeyBuYW1lOiAnQXJsaW5ndG9uJyB9LFxuICB7IG5hbWU6ICdBcmxpbmd0b24gSGVpZ2h0cycgfSxcbiAgeyBuYW1lOiAnQXJ2YWRhJyB9LFxuICB7IG5hbWU6ICdBc2hldmlsbGUnIH0sXG4gIHsgbmFtZTogJ0F0aGVucy1DbGFya2UgQ291bnR5JyB9LFxuICB7IG5hbWU6ICdBdGxhbnRhJyB9LFxuICB7IG5hbWU6ICdBdGxhbnRpYyBDaXR5JyB9LFxuICB7IG5hbWU6ICdBdHRsZWJvcm8nIH0sXG4gIHsgbmFtZTogJ0F1YnVybicgfSxcbiAgeyBuYW1lOiAnQXVidXJuJyB9LFxuICB7IG5hbWU6ICdBdWd1c3RhLVJpY2htb25kIENvdW50eScgfSxcbiAgeyBuYW1lOiAnQXVyb3JhJyB9LFxuICB7IG5hbWU6ICdBdXJvcmEnIH0sXG4gIHsgbmFtZTogJ0F1c3RpbicgfSxcbiAgeyBuYW1lOiAnQXZlbnR1cmEnIH0sXG4gIHsgbmFtZTogJ0F2b25kYWxlJyB9LFxuICB7IG5hbWU6ICdBenVzYScgfSxcbiAgeyBuYW1lOiAnQmFrZXJzZmllbGQnIH0sXG4gIHsgbmFtZTogJ0JhbGR3aW4gUGFyaycgfSxcbiAgeyBuYW1lOiAnQmFsdGltb3JlJyB9LFxuICB7IG5hbWU6ICdCYXJuc3RhYmxlIFRvd24nIH0sXG4gIHsgbmFtZTogJ0JhcnRsZXR0JyB9LFxuICB7IG5hbWU6ICdCYXJ0bGV0dCcgfSxcbiAgeyBuYW1lOiAnQmF0b24gUm91Z2UnIH0sXG4gIHsgbmFtZTogJ0JhdHRsZSBDcmVlaycgfSxcbiAgeyBuYW1lOiAnQmF5b25uZScgfSxcbiAgeyBuYW1lOiAnQmF5dG93bicgfSxcbiAgeyBuYW1lOiAnQmVhdW1vbnQnIH0sXG4gIHsgbmFtZTogJ0JlYXVtb250JyB9LFxuICB7IG5hbWU6ICdCZWF2ZXJjcmVlaycgfSxcbiAgeyBuYW1lOiAnQmVhdmVydG9uJyB9LFxuICB7IG5hbWU6ICdCZWRmb3JkJyB9LFxuICB7IG5hbWU6ICdCZWxsIEdhcmRlbnMnIH0sXG4gIHsgbmFtZTogJ0JlbGxldmlsbGUnIH0sXG4gIHsgbmFtZTogJ0JlbGxldnVlJyB9LFxuICB7IG5hbWU6ICdCZWxsZXZ1ZScgfSxcbiAgeyBuYW1lOiAnQmVsbGZsb3dlcicgfSxcbiAgeyBuYW1lOiAnQmVsbGluZ2hhbScgfSxcbiAgeyBuYW1lOiAnQmVsb2l0JyB9LFxuICB7IG5hbWU6ICdCZW5kJyB9LFxuICB7IG5hbWU6ICdCZW50b252aWxsZScgfSxcbiAgeyBuYW1lOiAnQmVya2VsZXknIH0sXG4gIHsgbmFtZTogJ0Jlcnd5bicgfSxcbiAgeyBuYW1lOiAnQmV0aGxlaGVtJyB9LFxuICB7IG5hbWU6ICdCZXZlcmx5JyB9LFxuICB7IG5hbWU6ICdCaWxsaW5ncycgfSxcbiAgeyBuYW1lOiAnQmlsb3hpJyB9LFxuICB7IG5hbWU6ICdCaW5naGFtdG9uJyB9LFxuICB7IG5hbWU6ICdCaXJtaW5naGFtJyB9LFxuICB7IG5hbWU6ICdCaXNtYXJjaycgfSxcbiAgeyBuYW1lOiAnQmxhY2tzYnVyZycgfSxcbiAgeyBuYW1lOiAnQmxhaW5lJyB9LFxuICB7IG5hbWU6ICdCbG9vbWluZ3RvbicgfSxcbiAgeyBuYW1lOiAnQmxvb21pbmd0b24nIH0sXG4gIHsgbmFtZTogJ0Jsb29taW5ndG9uJyB9LFxuICB7IG5hbWU6ICdCbHVlIFNwcmluZ3MnIH0sXG4gIHsgbmFtZTogJ0JvY2EgUmF0b24nIH0sXG4gIHsgbmFtZTogJ0JvaXNlIENpdHknIH0sXG4gIHsgbmFtZTogJ0JvbGluZ2Jyb29rJyB9LFxuICB7IG5hbWU6ICdCb25pdGEgU3ByaW5ncycgfSxcbiAgeyBuYW1lOiAnQm9zc2llciBDaXR5JyB9LFxuICB7IG5hbWU6ICdCb3N0b24nIH0sXG4gIHsgbmFtZTogJ0JvdWxkZXInIH0sXG4gIHsgbmFtZTogJ0JvdW50aWZ1bCcgfSxcbiAgeyBuYW1lOiAnQm93aWUnIH0sXG4gIHsgbmFtZTogJ0Jvd2xpbmcgR3JlZW4nIH0sXG4gIHsgbmFtZTogJ0JveW50b24gQmVhY2gnIH0sXG4gIHsgbmFtZTogJ0JvemVtYW4nIH0sXG4gIHsgbmFtZTogJ0JyYWRlbnRvbicgfSxcbiAgeyBuYW1lOiAnQnJlYScgfSxcbiAgeyBuYW1lOiAnQnJlbWVydG9uJyB9LFxuICB7IG5hbWU6ICdCcmVudHdvb2QnIH0sXG4gIHsgbmFtZTogJ0JyZW50d29vZCcgfSxcbiAgeyBuYW1lOiAnQnJpZGdlcG9ydCcgfSxcbiAgeyBuYW1lOiAnQnJpc3RvbCcgfSxcbiAgeyBuYW1lOiAnQnJvY2t0b24nIH0sXG4gIHsgbmFtZTogJ0Jyb2tlbiBBcnJvdycgfSxcbiAgeyBuYW1lOiAnQnJvb2tmaWVsZCcgfSxcbiAgeyBuYW1lOiAnQnJvb2toYXZlbicgfSxcbiAgeyBuYW1lOiAnQnJvb2tseW4gUGFyaycgfSxcbiAgeyBuYW1lOiAnQnJvb21maWVsZCcgfSxcbiAgeyBuYW1lOiAnQnJvd25zdmlsbGUnIH0sXG4gIHsgbmFtZTogJ0JyeWFuJyB9LFxuICB7IG5hbWU6ICdCdWNrZXllJyB9LFxuICB7IG5hbWU6ICdCdWVuYSBQYXJrJyB9LFxuICB7IG5hbWU6ICdCdWZmYWxvJyB9LFxuICB7IG5hbWU6ICdCdWZmYWxvIEdyb3ZlJyB9LFxuICB7IG5hbWU6ICdCdWxsaGVhZCBDaXR5JyB9LFxuICB7IG5hbWU6ICdCdXJiYW5rJyB9LFxuICB7IG5hbWU6ICdCdXJpZW4nIH0sXG4gIHsgbmFtZTogJ0J1cmxlc29uJyB9LFxuICB7IG5hbWU6ICdCdXJsaW5ndG9uJyB9LFxuICB7IG5hbWU6ICdCdXJsaW5ndG9uJyB9LFxuICB7IG5hbWU6ICdCdXJuc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdDYWxkd2VsbCcgfSxcbiAgeyBuYW1lOiAnQ2FsZXhpY28nIH0sXG4gIHsgbmFtZTogJ0NhbHVtZXQgQ2l0eScgfSxcbiAgeyBuYW1lOiAnQ2FtYXJpbGxvJyB9LFxuICB7IG5hbWU6ICdDYW1icmlkZ2UnIH0sXG4gIHsgbmFtZTogJ0NhbWRlbicgfSxcbiAgeyBuYW1lOiAnQ2FtcGJlbGwnIH0sXG4gIHsgbmFtZTogJ0NhbnRvbicgfSxcbiAgeyBuYW1lOiAnQ2FwZSBDb3JhbCcgfSxcbiAgeyBuYW1lOiAnQ2FwZSBHaXJhcmRlYXUnIH0sXG4gIHsgbmFtZTogJ0NhcmxzYmFkJyB9LFxuICB7IG5hbWU6ICdDYXJtZWwnIH0sXG4gIHsgbmFtZTogJ0Nhcm9sIFN0cmVhbScgfSxcbiAgeyBuYW1lOiAnQ2FycGVudGVyc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdDYXJyb2xsdG9uJyB9LFxuICB7IG5hbWU6ICdDYXJzb24nIH0sXG4gIHsgbmFtZTogJ0NhcnNvbiBDaXR5JyB9LFxuICB7IG5hbWU6ICdDYXJ5JyB9LFxuICB7IG5hbWU6ICdDYXNhIEdyYW5kZScgfSxcbiAgeyBuYW1lOiAnQ2FzcGVyJyB9LFxuICB7IG5hbWU6ICdDYXN0bGUgUm9jaycgfSxcbiAgeyBuYW1lOiAnQ2F0aGVkcmFsIENpdHknIH0sXG4gIHsgbmFtZTogJ0NlZGFyIEZhbGxzJyB9LFxuICB7IG5hbWU6ICdDZWRhciBIaWxsJyB9LFxuICB7IG5hbWU6ICdDZWRhciBQYXJrJyB9LFxuICB7IG5hbWU6ICdDZWRhciBSYXBpZHMnIH0sXG4gIHsgbmFtZTogJ0NlbnRlbm5pYWwnIH0sXG4gIHsgbmFtZTogJ0NlcmVzJyB9LFxuICB7IG5hbWU6ICdDZXJyaXRvcycgfSxcbiAgeyBuYW1lOiAnQ2hhbXBhaWduJyB9LFxuICB7IG5hbWU6ICdDaGFuZGxlcicgfSxcbiAgeyBuYW1lOiAnQ2hhcGVsIEhpbGwnIH0sXG4gIHsgbmFtZTogJ0NoYXJsZXN0b24nIH0sXG4gIHsgbmFtZTogJ0NoYXJsZXN0b24nIH0sXG4gIHsgbmFtZTogJ0NoYXJsb3R0ZScgfSxcbiAgeyBuYW1lOiAnQ2hhcmxvdHRlc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdDaGF0dGFub29nYScgfSxcbiAgeyBuYW1lOiAnQ2hlbHNlYScgfSxcbiAgeyBuYW1lOiAnQ2hlc2FwZWFrZScgfSxcbiAgeyBuYW1lOiAnQ2hlc3RlcmZpZWxkJyB9LFxuICB7IG5hbWU6ICdDaGV5ZW5uZScgfSxcbiAgeyBuYW1lOiAnQ2hpY2FnbycgfSxcbiAgeyBuYW1lOiAnQ2hpY28nIH0sXG4gIHsgbmFtZTogJ0NoaWNvcGVlJyB9LFxuICB7IG5hbWU6ICdDaGlubycgfSxcbiAgeyBuYW1lOiAnQ2hpbm8gSGlsbHMnIH0sXG4gIHsgbmFtZTogJ0NodWxhIFZpc3RhJyB9LFxuICB7IG5hbWU6ICdDaWNlcm8nIH0sXG4gIHsgbmFtZTogJ0NpbmNpbm5hdGknIH0sXG4gIHsgbmFtZTogJ0NpdHJ1cyBIZWlnaHRzJyB9LFxuICB7IG5hbWU6ICdDbGFya3N2aWxsZScgfSxcbiAgeyBuYW1lOiAnQ2xlYXJ3YXRlcicgfSxcbiAgeyBuYW1lOiAnQ2xldmVsYW5kJyB9LFxuICB7IG5hbWU6ICdDbGV2ZWxhbmQnIH0sXG4gIHsgbmFtZTogJ0NsZXZlbGFuZCBIZWlnaHRzJyB9LFxuICB7IG5hbWU6ICdDbGlmdG9uJyB9LFxuICB7IG5hbWU6ICdDbG92aXMnIH0sXG4gIHsgbmFtZTogJ0Nsb3ZpcycgfSxcbiAgeyBuYW1lOiAnQ29hY2hlbGxhJyB9LFxuICB7IG5hbWU6ICdDb2NvbnV0IENyZWVrJyB9LFxuICB7IG5hbWU6ICdDb2V1ciBkXFwnQWxlbmUnIH0sXG4gIHsgbmFtZTogJ0NvbGxlZ2UgU3RhdGlvbicgfSxcbiAgeyBuYW1lOiAnQ29sbGllcnZpbGxlJyB9LFxuICB7IG5hbWU6ICdDb2xvcmFkbyBTcHJpbmdzJyB9LFxuICB7IG5hbWU6ICdDb2x0b24nIH0sXG4gIHsgbmFtZTogJ0NvbHVtYmlhJyB9LFxuICB7IG5hbWU6ICdDb2x1bWJpYScgfSxcbiAgeyBuYW1lOiAnQ29sdW1idXMnIH0sXG4gIHsgbmFtZTogJ0NvbHVtYnVzJyB9LFxuICB7IG5hbWU6ICdDb2x1bWJ1cycgfSxcbiAgeyBuYW1lOiAnQ29tbWVyY2UgQ2l0eScgfSxcbiAgeyBuYW1lOiAnQ29tcHRvbicgfSxcbiAgeyBuYW1lOiAnQ29uY29yZCcgfSxcbiAgeyBuYW1lOiAnQ29uY29yZCcgfSxcbiAgeyBuYW1lOiAnQ29uY29yZCcgfSxcbiAgeyBuYW1lOiAnQ29ucm9lJyB9LFxuICB7IG5hbWU6ICdDb253YXknIH0sXG4gIHsgbmFtZTogJ0Nvb24gUmFwaWRzJyB9LFxuICB7IG5hbWU6ICdDb3BwZWxsJyB9LFxuICB7IG5hbWU6ICdDb3JhbCBHYWJsZXMnIH0sXG4gIHsgbmFtZTogJ0NvcmFsIFNwcmluZ3MnIH0sXG4gIHsgbmFtZTogJ0Nvcm9uYScgfSxcbiAgeyBuYW1lOiAnQ29ycHVzIENocmlzdGknIH0sXG4gIHsgbmFtZTogJ0NvcnZhbGxpcycgfSxcbiAgeyBuYW1lOiAnQ29zdGEgTWVzYScgfSxcbiAgeyBuYW1lOiAnQ291bmNpbCBCbHVmZnMnIH0sXG4gIHsgbmFtZTogJ0NvdmluYScgfSxcbiAgeyBuYW1lOiAnQ292aW5ndG9uJyB9LFxuICB7IG5hbWU6ICdDcmFuc3RvbicgfSxcbiAgeyBuYW1lOiAnQ3J5c3RhbCBMYWtlJyB9LFxuICB7IG5hbWU6ICdDdWx2ZXIgQ2l0eScgfSxcbiAgeyBuYW1lOiAnQ3VwZXJ0aW5vJyB9LFxuICB7IG5hbWU6ICdDdXRsZXIgQmF5JyB9LFxuICB7IG5hbWU6ICdDdXlhaG9nYSBGYWxscycgfSxcbiAgeyBuYW1lOiAnQ3lwcmVzcycgfSxcbiAgeyBuYW1lOiAnRGFsbGFzJyB9LFxuICB7IG5hbWU6ICdEYWx5IENpdHknIH0sXG4gIHsgbmFtZTogJ0RhbmJ1cnknIH0sXG4gIHsgbmFtZTogJ0RhbnZpbGxlJyB9LFxuICB7IG5hbWU6ICdEYW52aWxsZScgfSxcbiAgeyBuYW1lOiAnRGF2ZW5wb3J0JyB9LFxuICB7IG5hbWU6ICdEYXZpZScgfSxcbiAgeyBuYW1lOiAnRGF2aXMnIH0sXG4gIHsgbmFtZTogJ0RheXRvbicgfSxcbiAgeyBuYW1lOiAnRGF5dG9uYSBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnRGVLYWxiJyB9LFxuICB7IG5hbWU6ICdEZVNvdG8nIH0sXG4gIHsgbmFtZTogJ0RlYXJib3JuJyB9LFxuICB7IG5hbWU6ICdEZWFyYm9ybiBIZWlnaHRzJyB9LFxuICB7IG5hbWU6ICdEZWNhdHVyJyB9LFxuICB7IG5hbWU6ICdEZWNhdHVyJyB9LFxuICB7IG5hbWU6ICdEZWVyZmllbGQgQmVhY2gnIH0sXG4gIHsgbmFtZTogJ0RlbGFubycgfSxcbiAgeyBuYW1lOiAnRGVscmF5IEJlYWNoJyB9LFxuICB7IG5hbWU6ICdEZWx0b25hJyB9LFxuICB7IG5hbWU6ICdEZW50b24nIH0sXG4gIHsgbmFtZTogJ0RlbnZlcicgfSxcbiAgeyBuYW1lOiAnRGVzIE1vaW5lcycgfSxcbiAgeyBuYW1lOiAnRGVzIFBsYWluZXMnIH0sXG4gIHsgbmFtZTogJ0RldHJvaXQnIH0sXG4gIHsgbmFtZTogJ0RpYW1vbmQgQmFyJyB9LFxuICB7IG5hbWU6ICdEb3JhbCcgfSxcbiAgeyBuYW1lOiAnRG90aGFuJyB9LFxuICB7IG5hbWU6ICdEb3ZlcicgfSxcbiAgeyBuYW1lOiAnRG93bmVycyBHcm92ZScgfSxcbiAgeyBuYW1lOiAnRG93bmV5JyB9LFxuICB7IG5hbWU6ICdEcmFwZXInIH0sXG4gIHsgbmFtZTogJ0R1YmxpbicgfSxcbiAgeyBuYW1lOiAnRHVibGluJyB9LFxuICB7IG5hbWU6ICdEdWJ1cXVlJyB9LFxuICB7IG5hbWU6ICdEdWx1dGgnIH0sXG4gIHsgbmFtZTogJ0R1bmNhbnZpbGxlJyB9LFxuICB7IG5hbWU6ICdEdW53b29keScgfSxcbiAgeyBuYW1lOiAnRHVyaGFtJyB9LFxuICB7IG5hbWU6ICdFYWdhbicgfSxcbiAgeyBuYW1lOiAnRWFzdCBMYW5zaW5nJyB9LFxuICB7IG5hbWU6ICdFYXN0IE9yYW5nZScgfSxcbiAgeyBuYW1lOiAnRWFzdCBQcm92aWRlbmNlJyB9LFxuICB7IG5hbWU6ICdFYXN0dmFsZScgfSxcbiAgeyBuYW1lOiAnRWF1IENsYWlyZScgfSxcbiAgeyBuYW1lOiAnRWRlbiBQcmFpcmllJyB9LFxuICB7IG5hbWU6ICdFZGluYScgfSxcbiAgeyBuYW1lOiAnRWRpbmJ1cmcnIH0sXG4gIHsgbmFtZTogJ0VkbW9uZCcgfSxcbiAgeyBuYW1lOiAnRWRtb25kcycgfSxcbiAgeyBuYW1lOiAnRWwgQ2Fqb24nIH0sXG4gIHsgbmFtZTogJ0VsIENlbnRybycgfSxcbiAgeyBuYW1lOiAnRWwgTW9udGUnIH0sXG4gIHsgbmFtZTogJ0VsIFBhc28nIH0sXG4gIHsgbmFtZTogJ0VsZ2luJyB9LFxuICB7IG5hbWU6ICdFbGl6YWJldGgnIH0sXG4gIHsgbmFtZTogJ0VsayBHcm92ZScgfSxcbiAgeyBuYW1lOiAnRWxraGFydCcgfSxcbiAgeyBuYW1lOiAnRWxtaHVyc3QnIH0sXG4gIHsgbmFtZTogJ0VseXJpYScgfSxcbiAgeyBuYW1lOiAnRW5jaW5pdGFzJyB9LFxuICB7IG5hbWU6ICdFbmlkJyB9LFxuICB7IG5hbWU6ICdFcmllJyB9LFxuICB7IG5hbWU6ICdFc2NvbmRpZG8nIH0sXG4gIHsgbmFtZTogJ0V1Y2xpZCcgfSxcbiAgeyBuYW1lOiAnRXVnZW5lJyB9LFxuICB7IG5hbWU6ICdFdWxlc3MnIH0sXG4gIHsgbmFtZTogJ0V2YW5zdG9uJyB9LFxuICB7IG5hbWU6ICdFdmFuc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdFdmVyZXR0JyB9LFxuICB7IG5hbWU6ICdFdmVyZXR0JyB9LFxuICB7IG5hbWU6ICdGYWlyZmllbGQnIH0sXG4gIHsgbmFtZTogJ0ZhaXJmaWVsZCcgfSxcbiAgeyBuYW1lOiAnRmFsbCBSaXZlcicgfSxcbiAgeyBuYW1lOiAnRmFyZ28nIH0sXG4gIHsgbmFtZTogJ0Zhcm1pbmd0b24nIH0sXG4gIHsgbmFtZTogJ0Zhcm1pbmd0b24gSGlsbHMnIH0sXG4gIHsgbmFtZTogJ0ZheWV0dGV2aWxsZScgfSxcbiAgeyBuYW1lOiAnRmF5ZXR0ZXZpbGxlJyB9LFxuICB7IG5hbWU6ICdGZWRlcmFsIFdheScgfSxcbiAgeyBuYW1lOiAnRmluZGxheScgfSxcbiAgeyBuYW1lOiAnRmlzaGVycycgfSxcbiAgeyBuYW1lOiAnRml0Y2hidXJnJyB9LFxuICB7IG5hbWU6ICdGbGFnc3RhZmYnIH0sXG4gIHsgbmFtZTogJ0ZsaW50JyB9LFxuICB7IG5hbWU6ICdGbG9yZW5jZScgfSxcbiAgeyBuYW1lOiAnRmxvcmVuY2UnIH0sXG4gIHsgbmFtZTogJ0Zsb3Jpc3NhbnQnIH0sXG4gIHsgbmFtZTogJ0Zsb3dlciBNb3VuZCcgfSxcbiAgeyBuYW1lOiAnRm9sc29tJyB9LFxuICB7IG5hbWU6ICdGb25kIGR1IExhYycgfSxcbiAgeyBuYW1lOiAnRm9udGFuYScgfSxcbiAgeyBuYW1lOiAnRm9ydCBDb2xsaW5zJyB9LFxuICB7IG5hbWU6ICdGb3J0IExhdWRlcmRhbGUnIH0sXG4gIHsgbmFtZTogJ0ZvcnQgTXllcnMnIH0sXG4gIHsgbmFtZTogJ0ZvcnQgUGllcmNlJyB9LFxuICB7IG5hbWU6ICdGb3J0IFNtaXRoJyB9LFxuICB7IG5hbWU6ICdGb3J0IFdheW5lJyB9LFxuICB7IG5hbWU6ICdGb3J0IFdvcnRoJyB9LFxuICB7IG5hbWU6ICdGb3VudGFpbiBWYWxsZXknIH0sXG4gIHsgbmFtZTogJ0ZyYW5rbGluJyB9LFxuICB7IG5hbWU6ICdGcmVkZXJpY2snIH0sXG4gIHsgbmFtZTogJ0ZyZWVwb3J0JyB9LFxuICB7IG5hbWU6ICdGcmVtb250JyB9LFxuICB7IG5hbWU6ICdGcmVzbm8nIH0sXG4gIHsgbmFtZTogJ0ZyaWVuZHN3b29kJyB9LFxuICB7IG5hbWU6ICdGcmlzY28nIH0sXG4gIHsgbmFtZTogJ0Z1bGxlcnRvbicgfSxcbiAgeyBuYW1lOiAnR2FpbmVzdmlsbGUnIH0sXG4gIHsgbmFtZTogJ0dhaXRoZXJzYnVyZycgfSxcbiAgeyBuYW1lOiAnR2FsdmVzdG9uJyB9LFxuICB7IG5hbWU6ICdHYXJkZW4gR3JvdmUnIH0sXG4gIHsgbmFtZTogJ0dhcmRlbmEnIH0sXG4gIHsgbmFtZTogJ0dhcmxhbmQnIH0sXG4gIHsgbmFtZTogJ0dhcnknIH0sXG4gIHsgbmFtZTogJ0dhc3RvbmlhJyB9LFxuICB7IG5hbWU6ICdHZW9yZ2V0b3duJyB9LFxuICB7IG5hbWU6ICdHZXJtYW50b3duJyB9LFxuICB7IG5hbWU6ICdHaWxiZXJ0JyB9LFxuICB7IG5hbWU6ICdHaWxyb3knIH0sXG4gIHsgbmFtZTogJ0dsZW5kYWxlJyB9LFxuICB7IG5hbWU6ICdHbGVuZGFsZScgfSxcbiAgeyBuYW1lOiAnR2xlbmRvcmEnIH0sXG4gIHsgbmFtZTogJ0dsZW52aWV3JyB9LFxuICB7IG5hbWU6ICdHb29keWVhcicgfSxcbiAgeyBuYW1lOiAnR29vc2UgQ3JlZWsnIH0sXG4gIHsgbmFtZTogJ0dyYW5kIEZvcmtzJyB9LFxuICB7IG5hbWU6ICdHcmFuZCBJc2xhbmQnIH0sXG4gIHsgbmFtZTogJ0dyYW5kIEp1bmN0aW9uJyB9LFxuICB7IG5hbWU6ICdHcmFuZCBQcmFpcmllJyB9LFxuICB7IG5hbWU6ICdHcmFuZCBSYXBpZHMnIH0sXG4gIHsgbmFtZTogJ0dyYXBldmluZScgfSxcbiAgeyBuYW1lOiAnR3JlYXQgRmFsbHMnIH0sXG4gIHsgbmFtZTogJ0dyZWVsZXknIH0sXG4gIHsgbmFtZTogJ0dyZWVuIEJheScgfSxcbiAgeyBuYW1lOiAnR3JlZW5hY3JlcycgfSxcbiAgeyBuYW1lOiAnR3JlZW5maWVsZCcgfSxcbiAgeyBuYW1lOiAnR3JlZW5zYm9ybycgfSxcbiAgeyBuYW1lOiAnR3JlZW52aWxsZScgfSxcbiAgeyBuYW1lOiAnR3JlZW52aWxsZScgfSxcbiAgeyBuYW1lOiAnR3JlZW53b29kJyB9LFxuICB7IG5hbWU6ICdHcmVzaGFtJyB9LFxuICB7IG5hbWU6ICdHcm92ZSBDaXR5JyB9LFxuICB7IG5hbWU6ICdHdWxmcG9ydCcgfSxcbiAgeyBuYW1lOiAnSGFja2Vuc2FjaycgfSxcbiAgeyBuYW1lOiAnSGFnZXJzdG93bicgfSxcbiAgeyBuYW1lOiAnSGFsbGFuZGFsZSBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnSGFsdG9tIENpdHknIH0sXG4gIHsgbmFtZTogJ0hhbWlsdG9uJyB9LFxuICB7IG5hbWU6ICdIYW1tb25kJyB9LFxuICB7IG5hbWU6ICdIYW1wdG9uJyB9LFxuICB7IG5hbWU6ICdIYW5mb3JkJyB9LFxuICB7IG5hbWU6ICdIYW5vdmVyIFBhcmsnIH0sXG4gIHsgbmFtZTogJ0hhcmxpbmdlbicgfSxcbiAgeyBuYW1lOiAnSGFycmlzYnVyZycgfSxcbiAgeyBuYW1lOiAnSGFycmlzb25idXJnJyB9LFxuICB7IG5hbWU6ICdIYXJ0Zm9yZCcgfSxcbiAgeyBuYW1lOiAnSGF0dGllc2J1cmcnIH0sXG4gIHsgbmFtZTogJ0hhdmVyaGlsbCcgfSxcbiAgeyBuYW1lOiAnSGF3dGhvcm5lJyB9LFxuICB7IG5hbWU6ICdIYXl3YXJkJyB9LFxuICB7IG5hbWU6ICdIZW1ldCcgfSxcbiAgeyBuYW1lOiAnSGVtcHN0ZWFkJyB9LFxuICB7IG5hbWU6ICdIZW5kZXJzb24nIH0sXG4gIHsgbmFtZTogJ0hlbmRlcnNvbnZpbGxlJyB9LFxuICB7IG5hbWU6ICdIZXNwZXJpYScgfSxcbiAgeyBuYW1lOiAnSGlhbGVhaCcgfSxcbiAgeyBuYW1lOiAnSGlja29yeScgfSxcbiAgeyBuYW1lOiAnSGlnaCBQb2ludCcgfSxcbiAgeyBuYW1lOiAnSGlnaGxhbmQnIH0sXG4gIHsgbmFtZTogJ0hpbGxzYm9ybycgfSxcbiAgeyBuYW1lOiAnSGlsdG9uIEhlYWQgSXNsYW5kJyB9LFxuICB7IG5hbWU6ICdIb2Jva2VuJyB9LFxuICB7IG5hbWU6ICdIb2ZmbWFuIEVzdGF0ZXMnIH0sXG4gIHsgbmFtZTogJ0hvbGx5d29vZCcgfSxcbiAgeyBuYW1lOiAnSG9seW9rZScgfSxcbiAgeyBuYW1lOiAnSG9tZXN0ZWFkJyB9LFxuICB7IG5hbWU6ICdIb25vbHVsdScgfSxcbiAgeyBuYW1lOiAnSG9vdmVyJyB9LFxuICB7IG5hbWU6ICdIb3VzdG9uJyB9LFxuICB7IG5hbWU6ICdIdWJlciBIZWlnaHRzJyB9LFxuICB7IG5hbWU6ICdIdW50ZXJzdmlsbGUnIH0sXG4gIHsgbmFtZTogJ0h1bnRpbmd0b24nIH0sXG4gIHsgbmFtZTogJ0h1bnRpbmd0b24gQmVhY2gnIH0sXG4gIHsgbmFtZTogJ0h1bnRpbmd0b24gUGFyaycgfSxcbiAgeyBuYW1lOiAnSHVudHN2aWxsZScgfSxcbiAgeyBuYW1lOiAnSHVudHN2aWxsZScgfSxcbiAgeyBuYW1lOiAnSHVyc3QnIH0sXG4gIHsgbmFtZTogJ0h1dGNoaW5zb24nIH0sXG4gIHsgbmFtZTogJ0lkYWhvIEZhbGxzJyB9LFxuICB7IG5hbWU6ICdJbmRlcGVuZGVuY2UnIH0sXG4gIHsgbmFtZTogJ0luZGlhbmFwb2xpcycgfSxcbiAgeyBuYW1lOiAnSW5kaW8nIH0sXG4gIHsgbmFtZTogJ0luZ2xld29vZCcgfSxcbiAgeyBuYW1lOiAnSW93YSBDaXR5JyB9LFxuICB7IG5hbWU6ICdJcnZpbmUnIH0sXG4gIHsgbmFtZTogJ0lydmluZycgfSxcbiAgeyBuYW1lOiAnSmFja3NvbicgfSxcbiAgeyBuYW1lOiAnSmFja3NvbicgfSxcbiAgeyBuYW1lOiAnSmFja3NvbnZpbGxlJyB9LFxuICB7IG5hbWU6ICdKYWNrc29udmlsbGUnIH0sXG4gIHsgbmFtZTogJ0phbmVzdmlsbGUnIH0sXG4gIHsgbmFtZTogJ0plZmZlcnNvbiBDaXR5JyB9LFxuICB7IG5hbWU6ICdKZWZmZXJzb252aWxsZScgfSxcbiAgeyBuYW1lOiAnSmVyc2V5IENpdHknIH0sXG4gIHsgbmFtZTogJ0pvaG5zIENyZWVrJyB9LFxuICB7IG5hbWU6ICdKb2huc29uIENpdHknIH0sXG4gIHsgbmFtZTogJ0pvbGlldCcgfSxcbiAgeyBuYW1lOiAnSm9uZXNib3JvJyB9LFxuICB7IG5hbWU6ICdKb3BsaW4nIH0sXG4gIHsgbmFtZTogJ0p1cGl0ZXInIH0sXG4gIHsgbmFtZTogJ0p1cnVwYSBWYWxsZXknIH0sXG4gIHsgbmFtZTogJ0thbGFtYXpvbycgfSxcbiAgeyBuYW1lOiAnS2FubmFwb2xpcycgfSxcbiAgeyBuYW1lOiAnS2Fuc2FzIENpdHknIH0sXG4gIHsgbmFtZTogJ0thbnNhcyBDaXR5JyB9LFxuICB7IG5hbWU6ICdLZWFybnknIH0sXG4gIHsgbmFtZTogJ0tlaXplcicgfSxcbiAgeyBuYW1lOiAnS2VsbGVyJyB9LFxuICB7IG5hbWU6ICdLZW5uZXInIH0sXG4gIHsgbmFtZTogJ0tlbm5ld2ljaycgfSxcbiAgeyBuYW1lOiAnS2Vub3NoYScgfSxcbiAgeyBuYW1lOiAnS2VudCcgfSxcbiAgeyBuYW1lOiAnS2VudHdvb2QnIH0sXG4gIHsgbmFtZTogJ0tldHRlcmluZycgfSxcbiAgeyBuYW1lOiAnS2lsbGVlbicgfSxcbiAgeyBuYW1lOiAnS2luZ3Nwb3J0JyB9LFxuICB7IG5hbWU6ICdLaXJrbGFuZCcgfSxcbiAgeyBuYW1lOiAnS2lzc2ltbWVlJyB9LFxuICB7IG5hbWU6ICdLbm94dmlsbGUnIH0sXG4gIHsgbmFtZTogJ0tva29tbycgfSxcbiAgeyBuYW1lOiAnTGEgQ3Jvc3NlJyB9LFxuICB7IG5hbWU6ICdMYSBIYWJyYScgfSxcbiAgeyBuYW1lOiAnTGEgTWVzYScgfSxcbiAgeyBuYW1lOiAnTGEgTWlyYWRhJyB9LFxuICB7IG5hbWU6ICdMYSBQdWVudGUnIH0sXG4gIHsgbmFtZTogJ0xhIFF1aW50YScgfSxcbiAgeyBuYW1lOiAnTGFjZXknIH0sXG4gIHsgbmFtZTogJ0xhZmF5ZXR0ZScgfSxcbiAgeyBuYW1lOiAnTGFmYXlldHRlJyB9LFxuICB7IG5hbWU6ICdMYWd1bmEgTmlndWVsJyB9LFxuICB7IG5hbWU6ICdMYWtlIENoYXJsZXMnIH0sXG4gIHsgbmFtZTogJ0xha2UgRWxzaW5vcmUnIH0sXG4gIHsgbmFtZTogJ0xha2UgRm9yZXN0JyB9LFxuICB7IG5hbWU6ICdMYWtlIEhhdmFzdSBDaXR5JyB9LFxuICB7IG5hbWU6ICdMYWtlIE9zd2VnbycgfSxcbiAgeyBuYW1lOiAnTGFrZWxhbmQnIH0sXG4gIHsgbmFtZTogJ0xha2V2aWxsZScgfSxcbiAgeyBuYW1lOiAnTGFrZXdvb2QnIH0sXG4gIHsgbmFtZTogJ0xha2V3b29kJyB9LFxuICB7IG5hbWU6ICdMYWtld29vZCcgfSxcbiAgeyBuYW1lOiAnTGFrZXdvb2QnIH0sXG4gIHsgbmFtZTogJ0xhbmNhc3RlcicgfSxcbiAgeyBuYW1lOiAnTGFuY2FzdGVyJyB9LFxuICB7IG5hbWU6ICdMYW5jYXN0ZXInIH0sXG4gIHsgbmFtZTogJ0xhbmNhc3RlcicgfSxcbiAgeyBuYW1lOiAnTGFuc2luZycgfSxcbiAgeyBuYW1lOiAnTGFyZWRvJyB9LFxuICB7IG5hbWU6ICdMYXJnbycgfSxcbiAgeyBuYW1lOiAnTGFzIENydWNlcycgfSxcbiAgeyBuYW1lOiAnTGFzIFZlZ2FzJyB9LFxuICB7IG5hbWU6ICdMYXVkZXJoaWxsJyB9LFxuICB7IG5hbWU6ICdMYXdyZW5jZScgfSxcbiAgeyBuYW1lOiAnTGF3cmVuY2UnIH0sXG4gIHsgbmFtZTogJ0xhd3JlbmNlJyB9LFxuICB7IG5hbWU6ICdMYXd0b24nIH0sXG4gIHsgbmFtZTogJ0xheXRvbicgfSxcbiAgeyBuYW1lOiAnTGVhZ3VlIENpdHknIH0sXG4gIHsgbmFtZTogJ0xlZVxcJ3MgU3VtbWl0JyB9LFxuICB7IG5hbWU6ICdMZWVzYnVyZycgfSxcbiAgeyBuYW1lOiAnTGVoaScgfSxcbiAgeyBuYW1lOiAnTGVuZXhhJyB9LFxuICB7IG5hbWU6ICdMZW9taW5zdGVyJyB9LFxuICB7IG5hbWU6ICdMZXdpc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdMZXhpbmd0b24tRmF5ZXR0ZScgfSxcbiAgeyBuYW1lOiAnTGltYScgfSxcbiAgeyBuYW1lOiAnTGluY29sbicgfSxcbiAgeyBuYW1lOiAnTGluY29sbicgfSxcbiAgeyBuYW1lOiAnTGluY29sbiBQYXJrJyB9LFxuICB7IG5hbWU6ICdMaW5kZW4nIH0sXG4gIHsgbmFtZTogJ0xpdHRsZSBSb2NrJyB9LFxuICB7IG5hbWU6ICdMaXR0bGV0b24nIH0sXG4gIHsgbmFtZTogJ0xpdmVybW9yZScgfSxcbiAgeyBuYW1lOiAnTGl2b25pYScgfSxcbiAgeyBuYW1lOiAnTG9kaScgfSxcbiAgeyBuYW1lOiAnTG9nYW4nIH0sXG4gIHsgbmFtZTogJ0xvbWJhcmQnIH0sXG4gIHsgbmFtZTogJ0xvbXBvYycgfSxcbiAgeyBuYW1lOiAnTG9uZyBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnTG9uZ21vbnQnIH0sXG4gIHsgbmFtZTogJ0xvbmd2aWV3JyB9LFxuICB7IG5hbWU6ICdMb3JhaW4nIH0sXG4gIHsgbmFtZTogJ0xvcyBBbmdlbGVzJyB9LFxuICB7IG5hbWU6ICdMb3Vpc3ZpbGxlL0plZmZlcnNvbiBDb3VudHknIH0sXG4gIHsgbmFtZTogJ0xvdmVsYW5kJyB9LFxuICB7IG5hbWU6ICdMb3dlbGwnIH0sXG4gIHsgbmFtZTogJ0x1YmJvY2snIH0sXG4gIHsgbmFtZTogJ0x5bmNoYnVyZycgfSxcbiAgeyBuYW1lOiAnTHlubicgfSxcbiAgeyBuYW1lOiAnTHlud29vZCcgfSxcbiAgeyBuYW1lOiAnTWFjb24nIH0sXG4gIHsgbmFtZTogJ01hZGVyYScgfSxcbiAgeyBuYW1lOiAnTWFkaXNvbicgfSxcbiAgeyBuYW1lOiAnTWFkaXNvbicgfSxcbiAgeyBuYW1lOiAnTWFsZGVuJyB9LFxuICB7IG5hbWU6ICdNYW5hc3NhcycgfSxcbiAgeyBuYW1lOiAnTWFuY2hlc3RlcicgfSxcbiAgeyBuYW1lOiAnTWFuaGF0dGFuJyB9LFxuICB7IG5hbWU6ICdNYW5rYXRvJyB9LFxuICB7IG5hbWU6ICdNYW5zZmllbGQnIH0sXG4gIHsgbmFtZTogJ01hbnNmaWVsZCcgfSxcbiAgeyBuYW1lOiAnTWFudGVjYScgfSxcbiAgeyBuYW1lOiAnTWFwbGUgR3JvdmUnIH0sXG4gIHsgbmFtZTogJ01hcGxld29vZCcgfSxcbiAgeyBuYW1lOiAnTWFyYW5hJyB9LFxuICB7IG5hbWU6ICdNYXJnYXRlJyB9LFxuICB7IG5hbWU6ICdNYXJpY29wYScgfSxcbiAgeyBuYW1lOiAnTWFyaWV0dGEnIH0sXG4gIHsgbmFtZTogJ01hcmxib3JvdWdoJyB9LFxuICB7IG5hbWU6ICdNYXJ0aW5leicgfSxcbiAgeyBuYW1lOiAnTWFyeXN2aWxsZScgfSxcbiAgeyBuYW1lOiAnTWNBbGxlbicgfSxcbiAgeyBuYW1lOiAnTWNLaW5uZXknIH0sXG4gIHsgbmFtZTogJ01lZGZvcmQnIH0sXG4gIHsgbmFtZTogJ01lZGZvcmQnIH0sXG4gIHsgbmFtZTogJ01lbGJvdXJuZScgfSxcbiAgeyBuYW1lOiAnTWVtcGhpcycgfSxcbiAgeyBuYW1lOiAnTWVuaWZlZScgfSxcbiAgeyBuYW1lOiAnTWVudG9yJyB9LFxuICB7IG5hbWU6ICdNZXJjZWQnIH0sXG4gIHsgbmFtZTogJ01lcmlkZW4nIH0sXG4gIHsgbmFtZTogJ01lcmlkaWFuJyB9LFxuICB7IG5hbWU6ICdNZXJpZGlhbicgfSxcbiAgeyBuYW1lOiAnTWVzYScgfSxcbiAgeyBuYW1lOiAnTWVzcXVpdGUnIH0sXG4gIHsgbmFtZTogJ01ldGh1ZW4nIH0sXG4gIHsgbmFtZTogJ01pYW1pJyB9LFxuICB7IG5hbWU6ICdNaWFtaSBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnTWlhbWkgR2FyZGVucycgfSxcbiAgeyBuYW1lOiAnTWlkZGxldG93bicgfSxcbiAgeyBuYW1lOiAnTWlkZGxldG93bicgfSxcbiAgeyBuYW1lOiAnTWlkbGFuZCcgfSxcbiAgeyBuYW1lOiAnTWlkbGFuZCcgfSxcbiAgeyBuYW1lOiAnTWlkd2VzdCBDaXR5JyB9LFxuICB7IG5hbWU6ICdNaWxmb3JkJyB9LFxuICB7IG5hbWU6ICdNaWxwaXRhcycgfSxcbiAgeyBuYW1lOiAnTWlsd2F1a2VlJyB9LFxuICB7IG5hbWU6ICdNaW5uZWFwb2xpcycgfSxcbiAgeyBuYW1lOiAnTWlubmV0b25rYScgfSxcbiAgeyBuYW1lOiAnTWlub3QnIH0sXG4gIHsgbmFtZTogJ01pcmFtYXInIH0sXG4gIHsgbmFtZTogJ01pc2hhd2FrYScgfSxcbiAgeyBuYW1lOiAnTWlzc2lvbicgfSxcbiAgeyBuYW1lOiAnTWlzc2lvbiBWaWVqbycgfSxcbiAgeyBuYW1lOiAnTWlzc291bGEnIH0sXG4gIHsgbmFtZTogJ01pc3NvdXJpIENpdHknIH0sXG4gIHsgbmFtZTogJ01vYmlsZScgfSxcbiAgeyBuYW1lOiAnTW9kZXN0bycgfSxcbiAgeyBuYW1lOiAnTW9saW5lJyB9LFxuICB7IG5hbWU6ICdNb25yb2UnIH0sXG4gIHsgbmFtZTogJ01vbnJvdmlhJyB9LFxuICB7IG5hbWU6ICdNb250Y2xhaXInIH0sXG4gIHsgbmFtZTogJ01vbnRlYmVsbG8nIH0sXG4gIHsgbmFtZTogJ01vbnRlcmV5IFBhcmsnIH0sXG4gIHsgbmFtZTogJ01vbnRnb21lcnknIH0sXG4gIHsgbmFtZTogJ01vb3JlJyB9LFxuICB7IG5hbWU6ICdNb29yaGVhZCcgfSxcbiAgeyBuYW1lOiAnTW9yZW5vIFZhbGxleScgfSxcbiAgeyBuYW1lOiAnTW9yZ2FuIEhpbGwnIH0sXG4gIHsgbmFtZTogJ01vdW50IFBsZWFzYW50JyB9LFxuICB7IG5hbWU6ICdNb3VudCBQcm9zcGVjdCcgfSxcbiAgeyBuYW1lOiAnTW91bnQgVmVybm9uJyB9LFxuICB7IG5hbWU6ICdNb3VudGFpbiBWaWV3JyB9LFxuICB7IG5hbWU6ICdNdW5jaWUnIH0sXG4gIHsgbmFtZTogJ011cmZyZWVzYm9ybycgfSxcbiAgeyBuYW1lOiAnTXVycmF5JyB9LFxuICB7IG5hbWU6ICdNdXJyaWV0YScgfSxcbiAgeyBuYW1lOiAnTXVza2Vnb24nIH0sXG4gIHsgbmFtZTogJ011c2tvZ2VlJyB9LFxuICB7IG5hbWU6ICdOYW1wYScgfSxcbiAgeyBuYW1lOiAnTmFwYScgfSxcbiAgeyBuYW1lOiAnTmFwZXJ2aWxsZScgfSxcbiAgeyBuYW1lOiAnTmFzaHVhJyB9LFxuICB7IG5hbWU6ICdOYXNodmlsbGUtRGF2aWRzb24nIH0sXG4gIHsgbmFtZTogJ05hdGlvbmFsIENpdHknIH0sXG4gIHsgbmFtZTogJ05ldyBCZWRmb3JkJyB9LFxuICB7IG5hbWU6ICdOZXcgQmVybGluJyB9LFxuICB7IG5hbWU6ICdOZXcgQnJhdW5mZWxzJyB9LFxuICB7IG5hbWU6ICdOZXcgQnJpdGFpbicgfSxcbiAgeyBuYW1lOiAnTmV3IEJydW5zd2ljaycgfSxcbiAgeyBuYW1lOiAnTmV3IEhhdmVuJyB9LFxuICB7IG5hbWU6ICdOZXcgT3JsZWFucycgfSxcbiAgeyBuYW1lOiAnTmV3IFJvY2hlbGxlJyB9LFxuICB7IG5hbWU6ICdOZXcgWW9yaycgfSxcbiAgeyBuYW1lOiAnTmV3YXJrJyB9LFxuICB7IG5hbWU6ICdOZXdhcmsnIH0sXG4gIHsgbmFtZTogJ05ld2FyaycgfSxcbiAgeyBuYW1lOiAnTmV3cG9ydCBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnTmV3cG9ydCBOZXdzJyB9LFxuICB7IG5hbWU6ICdOZXd0b24nIH0sXG4gIHsgbmFtZTogJ05pYWdhcmEgRmFsbHMnIH0sXG4gIHsgbmFtZTogJ05vYmxlc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdOb3Jmb2xrJyB9LFxuICB7IG5hbWU6ICdOb3JtYWwnIH0sXG4gIHsgbmFtZTogJ05vcm1hbicgfSxcbiAgeyBuYW1lOiAnTm9ydGggQ2hhcmxlc3RvbicgfSxcbiAgeyBuYW1lOiAnTm9ydGggTGFzIFZlZ2FzJyB9LFxuICB7IG5hbWU6ICdOb3J0aCBMYXVkZXJkYWxlJyB9LFxuICB7IG5hbWU6ICdOb3J0aCBMaXR0bGUgUm9jaycgfSxcbiAgeyBuYW1lOiAnTm9ydGggTWlhbWknIH0sXG4gIHsgbmFtZTogJ05vcnRoIE1pYW1pIEJlYWNoJyB9LFxuICB7IG5hbWU6ICdOb3J0aCBQb3J0JyB9LFxuICB7IG5hbWU6ICdOb3J0aCBSaWNobGFuZCBIaWxscycgfSxcbiAgeyBuYW1lOiAnTm9ydGhnbGVubicgfSxcbiAgeyBuYW1lOiAnTm9yd2FsaycgfSxcbiAgeyBuYW1lOiAnTm9yd2FsaycgfSxcbiAgeyBuYW1lOiAnTm9yd2ljaCcgfSxcbiAgeyBuYW1lOiAnTm92YXRvJyB9LFxuICB7IG5hbWU6ICdOb3ZpJyB9LFxuICB7IG5hbWU6ICdPXFwnRmFsbG9uJyB9LFxuICB7IG5hbWU6ICdPYWsgTGF3bicgfSxcbiAgeyBuYW1lOiAnT2FrIFBhcmsnIH0sXG4gIHsgbmFtZTogJ09ha2xhbmQnIH0sXG4gIHsgbmFtZTogJ09ha2xhbmQgUGFyaycgfSxcbiAgeyBuYW1lOiAnT2FrbGV5JyB9LFxuICB7IG5hbWU6ICdPY2FsYScgfSxcbiAgeyBuYW1lOiAnT2NlYW5zaWRlJyB9LFxuICB7IG5hbWU6ICdPY29lZScgfSxcbiAgeyBuYW1lOiAnT2Rlc3NhJyB9LFxuICB7IG5hbWU6ICdPZ2RlbicgfSxcbiAgeyBuYW1lOiAnT2tsYWhvbWEgQ2l0eScgfSxcbiAgeyBuYW1lOiAnT2xhdGhlJyB9LFxuICB7IG5hbWU6ICdPbHltcGlhJyB9LFxuICB7IG5hbWU6ICdPbWFoYScgfSxcbiAgeyBuYW1lOiAnT250YXJpbycgfSxcbiAgeyBuYW1lOiAnT3JhbmdlJyB9LFxuICB7IG5hbWU6ICdPcmVtJyB9LFxuICB7IG5hbWU6ICdPcmxhbmQgUGFyaycgfSxcbiAgeyBuYW1lOiAnT3JsYW5kbycgfSxcbiAgeyBuYW1lOiAnT3Jtb25kIEJlYWNoJyB9LFxuICB7IG5hbWU6ICdPcm8gVmFsbGV5JyB9LFxuICB7IG5hbWU6ICdPc2hrb3NoJyB9LFxuICB7IG5hbWU6ICdPdmVybGFuZCBQYXJrJyB9LFxuICB7IG5hbWU6ICdPd2Vuc2Jvcm8nIH0sXG4gIHsgbmFtZTogJ094bmFyZCcgfSxcbiAgeyBuYW1lOiAnUGFjaWZpY2EnIH0sXG4gIHsgbmFtZTogJ1BhbGF0aW5lJyB9LFxuICB7IG5hbWU6ICdQYWxtIEJheScgfSxcbiAgeyBuYW1lOiAnUGFsbSBCZWFjaCBHYXJkZW5zJyB9LFxuICB7IG5hbWU6ICdQYWxtIENvYXN0JyB9LFxuICB7IG5hbWU6ICdQYWxtIERlc2VydCcgfSxcbiAgeyBuYW1lOiAnUGFsbSBTcHJpbmdzJyB9LFxuICB7IG5hbWU6ICdQYWxtZGFsZScgfSxcbiAgeyBuYW1lOiAnUGFsbyBBbHRvJyB9LFxuICB7IG5hbWU6ICdQYW5hbWEgQ2l0eScgfSxcbiAgeyBuYW1lOiAnUGFyYW1vdW50JyB9LFxuICB7IG5hbWU6ICdQYXJrIFJpZGdlJyB9LFxuICB7IG5hbWU6ICdQYXJrZXInIH0sXG4gIHsgbmFtZTogJ1Bhcm1hJyB9LFxuICB7IG5hbWU6ICdQYXNhZGVuYScgfSxcbiAgeyBuYW1lOiAnUGFzYWRlbmEnIH0sXG4gIHsgbmFtZTogJ1Bhc2NvJyB9LFxuICB7IG5hbWU6ICdQYXNzYWljJyB9LFxuICB7IG5hbWU6ICdQYXRlcnNvbicgfSxcbiAgeyBuYW1lOiAnUGF3dHVja2V0JyB9LFxuICB7IG5hbWU6ICdQZWFib2R5JyB9LFxuICB7IG5hbWU6ICdQZWFjaHRyZWUgQ29ybmVycycgfSxcbiAgeyBuYW1lOiAnUGVhcmxhbmQnIH0sXG4gIHsgbmFtZTogJ1BlbWJyb2tlIFBpbmVzJyB9LFxuICB7IG5hbWU6ICdQZW5zYWNvbGEnIH0sXG4gIHsgbmFtZTogJ1Blb3JpYScgfSxcbiAgeyBuYW1lOiAnUGVvcmlhJyB9LFxuICB7IG5hbWU6ICdQZXJyaXMnIH0sXG4gIHsgbmFtZTogJ1BlcnRoIEFtYm95JyB9LFxuICB7IG5hbWU6ICdQZXRhbHVtYScgfSxcbiAgeyBuYW1lOiAnUGZsdWdlcnZpbGxlJyB9LFxuICB7IG5hbWU6ICdQaGFycicgfSxcbiAgeyBuYW1lOiAnUGhlbml4IENpdHknIH0sXG4gIHsgbmFtZTogJ1BoaWxhZGVscGhpYScgfSxcbiAgeyBuYW1lOiAnUGhvZW5peCcgfSxcbiAgeyBuYW1lOiAnUGljbyBSaXZlcmEnIH0sXG4gIHsgbmFtZTogJ1BpbmUgQmx1ZmYnIH0sXG4gIHsgbmFtZTogJ1BpbmVsbGFzIFBhcmsnIH0sXG4gIHsgbmFtZTogJ1BpdHRzYnVyZycgfSxcbiAgeyBuYW1lOiAnUGl0dHNidXJnaCcgfSxcbiAgeyBuYW1lOiAnUGl0dHNmaWVsZCcgfSxcbiAgeyBuYW1lOiAnUGxhY2VudGlhJyB9LFxuICB7IG5hbWU6ICdQbGFpbmZpZWxkJyB9LFxuICB7IG5hbWU6ICdQbGFpbmZpZWxkJyB9LFxuICB7IG5hbWU6ICdQbGFubycgfSxcbiAgeyBuYW1lOiAnUGxhbnRhdGlvbicgfSxcbiAgeyBuYW1lOiAnUGxlYXNhbnRvbicgfSxcbiAgeyBuYW1lOiAnUGx5bW91dGgnIH0sXG4gIHsgbmFtZTogJ1BvY2F0ZWxsbycgfSxcbiAgeyBuYW1lOiAnUG9tb25hJyB9LFxuICB7IG5hbWU6ICdQb21wYW5vIEJlYWNoJyB9LFxuICB7IG5hbWU6ICdQb250aWFjJyB9LFxuICB7IG5hbWU6ICdQb3J0IEFydGh1cicgfSxcbiAgeyBuYW1lOiAnUG9ydCBPcmFuZ2UnIH0sXG4gIHsgbmFtZTogJ1BvcnQgU3QuIEx1Y2llJyB9LFxuICB7IG5hbWU6ICdQb3J0YWdlJyB9LFxuICB7IG5hbWU6ICdQb3J0ZXJ2aWxsZScgfSxcbiAgeyBuYW1lOiAnUG9ydGxhbmQnIH0sXG4gIHsgbmFtZTogJ1BvcnRsYW5kJyB9LFxuICB7IG5hbWU6ICdQb3J0c21vdXRoJyB9LFxuICB7IG5hbWU6ICdQb3dheScgfSxcbiAgeyBuYW1lOiAnUHJlc2NvdHQnIH0sXG4gIHsgbmFtZTogJ1ByZXNjb3R0IFZhbGxleScgfSxcbiAgeyBuYW1lOiAnUHJvdmlkZW5jZScgfSxcbiAgeyBuYW1lOiAnUHJvdm8nIH0sXG4gIHsgbmFtZTogJ1B1ZWJsbycgfSxcbiAgeyBuYW1lOiAnUHV5YWxsdXAnIH0sXG4gIHsgbmFtZTogJ1F1aW5jeScgfSxcbiAgeyBuYW1lOiAnUXVpbmN5JyB9LFxuICB7IG5hbWU6ICdSYWNpbmUnIH0sXG4gIHsgbmFtZTogJ1JhbGVpZ2gnIH0sXG4gIHsgbmFtZTogJ1JhbmNobyBDb3Jkb3ZhJyB9LFxuICB7IG5hbWU6ICdSYW5jaG8gQ3VjYW1vbmdhJyB9LFxuICB7IG5hbWU6ICdSYW5jaG8gUGFsb3MgVmVyZGVzJyB9LFxuICB7IG5hbWU6ICdSYW5jaG8gU2FudGEgTWFyZ2FyaXRhJyB9LFxuICB7IG5hbWU6ICdSYXBpZCBDaXR5JyB9LFxuICB7IG5hbWU6ICdSZWFkaW5nJyB9LFxuICB7IG5hbWU6ICdSZWRkaW5nJyB9LFxuICB7IG5hbWU6ICdSZWRsYW5kcycgfSxcbiAgeyBuYW1lOiAnUmVkbW9uZCcgfSxcbiAgeyBuYW1lOiAnUmVkb25kbyBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnUmVkd29vZCBDaXR5JyB9LFxuICB7IG5hbWU6ICdSZW5vJyB9LFxuICB7IG5hbWU6ICdSZW50b24nIH0sXG4gIHsgbmFtZTogJ1JldmVyZScgfSxcbiAgeyBuYW1lOiAnUmlhbHRvJyB9LFxuICB7IG5hbWU6ICdSaWNoYXJkc29uJyB9LFxuICB7IG5hbWU6ICdSaWNobGFuZCcgfSxcbiAgeyBuYW1lOiAnUmljaG1vbmQnIH0sXG4gIHsgbmFtZTogJ1JpY2htb25kJyB9LFxuICB7IG5hbWU6ICdSaW8gUmFuY2hvJyB9LFxuICB7IG5hbWU6ICdSaXZlcnNpZGUnIH0sXG4gIHsgbmFtZTogJ1JpdmVydG9uJyB9LFxuICB7IG5hbWU6ICdSb2Fub2tlJyB9LFxuICB7IG5hbWU6ICdSb2NoZXN0ZXInIH0sXG4gIHsgbmFtZTogJ1JvY2hlc3RlcicgfSxcbiAgeyBuYW1lOiAnUm9jaGVzdGVyIEhpbGxzJyB9LFxuICB7IG5hbWU6ICdSb2NrIEhpbGwnIH0sXG4gIHsgbmFtZTogJ1JvY2sgSXNsYW5kJyB9LFxuICB7IG5hbWU6ICdSb2NrZm9yZCcgfSxcbiAgeyBuYW1lOiAnUm9ja2xpbicgfSxcbiAgeyBuYW1lOiAnUm9ja3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdSb2Nrd2FsbCcgfSxcbiAgeyBuYW1lOiAnUm9ja3kgTW91bnQnIH0sXG4gIHsgbmFtZTogJ1JvZ2VycycgfSxcbiAgeyBuYW1lOiAnUm9obmVydCBQYXJrJyB9LFxuICB7IG5hbWU6ICdSb21lb3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdSb3NlbWVhZCcgfSxcbiAgeyBuYW1lOiAnUm9zZXZpbGxlJyB9LFxuICB7IG5hbWU6ICdSb3NldmlsbGUnIH0sXG4gIHsgbmFtZTogJ1Jvc3dlbGwnIH0sXG4gIHsgbmFtZTogJ1Jvc3dlbGwnIH0sXG4gIHsgbmFtZTogJ1JvdW5kIFJvY2snIH0sXG4gIHsgbmFtZTogJ1Jvd2xldHQnIH0sXG4gIHsgbmFtZTogJ1JveScgfSxcbiAgeyBuYW1lOiAnUm95YWwgT2FrJyB9LFxuICB7IG5hbWU6ICdTYWNyYW1lbnRvJyB9LFxuICB7IG5hbWU6ICdTYWdpbmF3JyB9LFxuICB7IG5hbWU6ICdTYWxlbScgfSxcbiAgeyBuYW1lOiAnU2FsZW0nIH0sXG4gIHsgbmFtZTogJ1NhbGluYScgfSxcbiAgeyBuYW1lOiAnU2FsaW5hcycgfSxcbiAgeyBuYW1lOiAnU2FsdCBMYWtlIENpdHknIH0sXG4gIHsgbmFtZTogJ1NhbW1hbWlzaCcgfSxcbiAgeyBuYW1lOiAnU2FuIEFuZ2VsbycgfSxcbiAgeyBuYW1lOiAnU2FuIEFudG9uaW8nIH0sXG4gIHsgbmFtZTogJ1NhbiBCZXJuYXJkaW5vJyB9LFxuICB7IG5hbWU6ICdTYW4gQnJ1bm8nIH0sXG4gIHsgbmFtZTogJ1NhbiBCdWVuYXZlbnR1cmEgKFZlbnR1cmEpJyB9LFxuICB7IG5hbWU6ICdTYW4gQ2xlbWVudGUnIH0sXG4gIHsgbmFtZTogJ1NhbiBEaWVnbycgfSxcbiAgeyBuYW1lOiAnU2FuIEZyYW5jaXNjbycgfSxcbiAgeyBuYW1lOiAnU2FuIEdhYnJpZWwnIH0sXG4gIHsgbmFtZTogJ1NhbiBKYWNpbnRvJyB9LFxuICB7IG5hbWU6ICdTYW4gSm9zZScgfSxcbiAgeyBuYW1lOiAnU2FuIExlYW5kcm8nIH0sXG4gIHsgbmFtZTogJ1NhbiBMdWlzIE9iaXNwbycgfSxcbiAgeyBuYW1lOiAnU2FuIE1hcmNvcycgfSxcbiAgeyBuYW1lOiAnU2FuIE1hcmNvcycgfSxcbiAgeyBuYW1lOiAnU2FuIE1hdGVvJyB9LFxuICB7IG5hbWU6ICdTYW4gUmFmYWVsJyB9LFxuICB7IG5hbWU6ICdTYW4gUmFtb24nIH0sXG4gIHsgbmFtZTogJ1NhbmR5JyB9LFxuICB7IG5hbWU6ICdTYW5keSBTcHJpbmdzJyB9LFxuICB7IG5hbWU6ICdTYW5mb3JkJyB9LFxuICB7IG5hbWU6ICdTYW50YSBBbmEnIH0sXG4gIHsgbmFtZTogJ1NhbnRhIEJhcmJhcmEnIH0sXG4gIHsgbmFtZTogJ1NhbnRhIENsYXJhJyB9LFxuICB7IG5hbWU6ICdTYW50YSBDbGFyaXRhJyB9LFxuICB7IG5hbWU6ICdTYW50YSBDcnV6JyB9LFxuICB7IG5hbWU6ICdTYW50YSBGZScgfSxcbiAgeyBuYW1lOiAnU2FudGEgTWFyaWEnIH0sXG4gIHsgbmFtZTogJ1NhbnRhIE1vbmljYScgfSxcbiAgeyBuYW1lOiAnU2FudGEgUm9zYScgfSxcbiAgeyBuYW1lOiAnU2FudGVlJyB9LFxuICB7IG5hbWU6ICdTYXJhc290YScgfSxcbiAgeyBuYW1lOiAnU2F2YW5uYWgnIH0sXG4gIHsgbmFtZTogJ1NheXJldmlsbGUnIH0sXG4gIHsgbmFtZTogJ1NjaGF1bWJ1cmcnIH0sXG4gIHsgbmFtZTogJ1NjaGVuZWN0YWR5JyB9LFxuICB7IG5hbWU6ICdTY290dHNkYWxlJyB9LFxuICB7IG5hbWU6ICdTY3JhbnRvbicgfSxcbiAgeyBuYW1lOiAnU2VhdHRsZScgfSxcbiAgeyBuYW1lOiAnU2hha29wZWUnIH0sXG4gIHsgbmFtZTogJ1NoYXduZWUnIH0sXG4gIHsgbmFtZTogJ1NoZWJveWdhbicgfSxcbiAgeyBuYW1lOiAnU2hlbHRvbicgfSxcbiAgeyBuYW1lOiAnU2hlcm1hbicgfSxcbiAgeyBuYW1lOiAnU2hvcmVsaW5lJyB9LFxuICB7IG5hbWU6ICdTaHJldmVwb3J0JyB9LFxuICB7IG5hbWU6ICdTaWVycmEgVmlzdGEnIH0sXG4gIHsgbmFtZTogJ1NpbWkgVmFsbGV5JyB9LFxuICB7IG5hbWU6ICdTaW91eCBDaXR5JyB9LFxuICB7IG5hbWU6ICdTaW91eCBGYWxscycgfSxcbiAgeyBuYW1lOiAnU2tva2llJyB9LFxuICB7IG5hbWU6ICdTbXlybmEnIH0sXG4gIHsgbmFtZTogJ1NteXJuYScgfSxcbiAgeyBuYW1lOiAnU29tZXJ2aWxsZScgfSxcbiAgeyBuYW1lOiAnU291dGggQmVuZCcgfSxcbiAgeyBuYW1lOiAnU291dGggR2F0ZScgfSxcbiAgeyBuYW1lOiAnU291dGggSm9yZGFuJyB9LFxuICB7IG5hbWU6ICdTb3V0aCBTYW4gRnJhbmNpc2NvJyB9LFxuICB7IG5hbWU6ICdTb3V0aGF2ZW4nIH0sXG4gIHsgbmFtZTogJ1NvdXRoZmllbGQnIH0sXG4gIHsgbmFtZTogJ1NwYW5pc2ggRm9yaycgfSxcbiAgeyBuYW1lOiAnU3BhcmtzJyB9LFxuICB7IG5hbWU6ICdTcGFydGFuYnVyZycgfSxcbiAgeyBuYW1lOiAnU3Bva2FuZScgfSxcbiAgeyBuYW1lOiAnU3Bva2FuZSBWYWxsZXknIH0sXG4gIHsgbmFtZTogJ1NwcmluZ2RhbGUnIH0sXG4gIHsgbmFtZTogJ1NwcmluZ2ZpZWxkJyB9LFxuICB7IG5hbWU6ICdTcHJpbmdmaWVsZCcgfSxcbiAgeyBuYW1lOiAnU3ByaW5nZmllbGQnIH0sXG4gIHsgbmFtZTogJ1NwcmluZ2ZpZWxkJyB9LFxuICB7IG5hbWU6ICdTcHJpbmdmaWVsZCcgfSxcbiAgeyBuYW1lOiAnU3QuIENoYXJsZXMnIH0sXG4gIHsgbmFtZTogJ1N0LiBDbGFpciBTaG9yZXMnIH0sXG4gIHsgbmFtZTogJ1N0LiBDbG91ZCcgfSxcbiAgeyBuYW1lOiAnU3QuIENsb3VkJyB9LFxuICB7IG5hbWU6ICdTdC4gR2VvcmdlJyB9LFxuICB7IG5hbWU6ICdTdC4gSm9zZXBoJyB9LFxuICB7IG5hbWU6ICdTdC4gTG91aXMnIH0sXG4gIHsgbmFtZTogJ1N0LiBMb3VpcyBQYXJrJyB9LFxuICB7IG5hbWU6ICdTdC4gUGF1bCcgfSxcbiAgeyBuYW1lOiAnU3QuIFBldGVycycgfSxcbiAgeyBuYW1lOiAnU3QuIFBldGVyc2J1cmcnIH0sXG4gIHsgbmFtZTogJ1N0YW1mb3JkJyB9LFxuICB7IG5hbWU6ICdTdGFudG9uJyB9LFxuICB7IG5hbWU6ICdTdGF0ZSBDb2xsZWdlJyB9LFxuICB7IG5hbWU6ICdTdGVybGluZyBIZWlnaHRzJyB9LFxuICB7IG5hbWU6ICdTdGlsbHdhdGVyJyB9LFxuICB7IG5hbWU6ICdTdG9ja3RvbicgfSxcbiAgeyBuYW1lOiAnU3RyZWFtd29vZCcgfSxcbiAgeyBuYW1lOiAnU3Ryb25nc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdTdWZmb2xrJyB9LFxuICB7IG5hbWU6ICdTdWdhciBMYW5kJyB9LFxuICB7IG5hbWU6ICdTdW1tZXJ2aWxsZScgfSxcbiAgeyBuYW1lOiAnU3VtdGVyJyB9LFxuICB7IG5hbWU6ICdTdW5ueXZhbGUnIH0sXG4gIHsgbmFtZTogJ1N1bnJpc2UnIH0sXG4gIHsgbmFtZTogJ1N1cnByaXNlJyB9LFxuICB7IG5hbWU6ICdTeXJhY3VzZScgfSxcbiAgeyBuYW1lOiAnVGFjb21hJyB9LFxuICB7IG5hbWU6ICdUYWxsYWhhc3NlZScgfSxcbiAgeyBuYW1lOiAnVGFtYXJhYycgfSxcbiAgeyBuYW1lOiAnVGFtcGEnIH0sXG4gIHsgbmFtZTogJ1RhdW50b24nIH0sXG4gIHsgbmFtZTogJ1RheWxvcicgfSxcbiAgeyBuYW1lOiAnVGF5bG9yc3ZpbGxlJyB9LFxuICB7IG5hbWU6ICdUZW1lY3VsYScgfSxcbiAgeyBuYW1lOiAnVGVtcGUnIH0sXG4gIHsgbmFtZTogJ1RlbXBsZScgfSxcbiAgeyBuYW1lOiAnVGVycmUgSGF1dGUnIH0sXG4gIHsgbmFtZTogJ1RleGFya2FuYScgfSxcbiAgeyBuYW1lOiAnVGV4YXMgQ2l0eScgfSxcbiAgeyBuYW1lOiAnVGhlIENvbG9ueScgfSxcbiAgeyBuYW1lOiAnVGhvcm50b24nIH0sXG4gIHsgbmFtZTogJ1Rob3VzYW5kIE9ha3MnIH0sXG4gIHsgbmFtZTogJ1RpZ2FyZCcgfSxcbiAgeyBuYW1lOiAnVGlubGV5IFBhcmsnIH0sXG4gIHsgbmFtZTogJ1RpdHVzdmlsbGUnIH0sXG4gIHsgbmFtZTogJ1RvbGVkbycgfSxcbiAgeyBuYW1lOiAnVG9wZWthJyB9LFxuICB7IG5hbWU6ICdUb3JyYW5jZScgfSxcbiAgeyBuYW1lOiAnVHJhY3knIH0sXG4gIHsgbmFtZTogJ1RyZW50b24nIH0sXG4gIHsgbmFtZTogJ1Ryb3knIH0sXG4gIHsgbmFtZTogJ1Ryb3knIH0sXG4gIHsgbmFtZTogJ1R1Y3NvbicgfSxcbiAgeyBuYW1lOiAnVHVsYXJlJyB9LFxuICB7IG5hbWU6ICdUdWxzYScgfSxcbiAgeyBuYW1lOiAnVHVybG9jaycgfSxcbiAgeyBuYW1lOiAnVHVzY2Fsb29zYScgfSxcbiAgeyBuYW1lOiAnVHVzdGluJyB9LFxuICB7IG5hbWU6ICdUd2luIEZhbGxzJyB9LFxuICB7IG5hbWU6ICdUeWxlcicgfSxcbiAgeyBuYW1lOiAnVW5pb24gQ2l0eScgfSxcbiAgeyBuYW1lOiAnVW5pb24gQ2l0eScgfSxcbiAgeyBuYW1lOiAnVXBsYW5kJyB9LFxuICB7IG5hbWU6ICdVcmJhbmEnIH0sXG4gIHsgbmFtZTogJ1VyYmFuZGFsZScgfSxcbiAgeyBuYW1lOiAnVXRpY2EnIH0sXG4gIHsgbmFtZTogJ1ZhY2F2aWxsZScgfSxcbiAgeyBuYW1lOiAnVmFsZG9zdGEnIH0sXG4gIHsgbmFtZTogJ1ZhbGxlam8nIH0sXG4gIHsgbmFtZTogJ1ZhbGxleSBTdHJlYW0nIH0sXG4gIHsgbmFtZTogJ1ZhbmNvdXZlcicgfSxcbiAgeyBuYW1lOiAnVmljdG9yaWEnIH0sXG4gIHsgbmFtZTogJ1ZpY3RvcnZpbGxlJyB9LFxuICB7IG5hbWU6ICdWaW5lbGFuZCcgfSxcbiAgeyBuYW1lOiAnVmlyZ2luaWEgQmVhY2gnIH0sXG4gIHsgbmFtZTogJ1Zpc2FsaWEnIH0sXG4gIHsgbmFtZTogJ1Zpc3RhJyB9LFxuICB7IG5hbWU6ICdXYWNvJyB9LFxuICB7IG5hbWU6ICdXYWxudXQgQ3JlZWsnIH0sXG4gIHsgbmFtZTogJ1dhbHRoYW0nIH0sXG4gIHsgbmFtZTogJ1dhcm5lciBSb2JpbnMnIH0sXG4gIHsgbmFtZTogJ1dhcnJlbicgfSxcbiAgeyBuYW1lOiAnV2FycmVuJyB9LFxuICB7IG5hbWU6ICdXYXJ3aWNrJyB9LFxuICB7IG5hbWU6ICdXYXNoaW5ndG9uJyB9LFxuICB7IG5hbWU6ICdXYXRlcmJ1cnknIH0sXG4gIHsgbmFtZTogJ1dhdGVybG9vJyB9LFxuICB7IG5hbWU6ICdXYXRzb252aWxsZScgfSxcbiAgeyBuYW1lOiAnV2F1a2VnYW4nIH0sXG4gIHsgbmFtZTogJ1dhdWtlc2hhJyB9LFxuICB7IG5hbWU6ICdXYXVzYXUnIH0sXG4gIHsgbmFtZTogJ1dhdXdhdG9zYScgfSxcbiAgeyBuYW1lOiAnV2VsbGluZ3RvbicgfSxcbiAgeyBuYW1lOiAnV2VzbGFjbycgfSxcbiAgeyBuYW1lOiAnV2VzdCBBbGxpcycgfSxcbiAgeyBuYW1lOiAnV2VzdCBDb3ZpbmEnIH0sXG4gIHsgbmFtZTogJ1dlc3QgRGVzIE1vaW5lcycgfSxcbiAgeyBuYW1lOiAnV2VzdCBIYXZlbicgfSxcbiAgeyBuYW1lOiAnV2VzdCBKb3JkYW4nIH0sXG4gIHsgbmFtZTogJ1dlc3QgTmV3IFlvcmsnIH0sXG4gIHsgbmFtZTogJ1dlc3QgUGFsbSBCZWFjaCcgfSxcbiAgeyBuYW1lOiAnV2VzdCBTYWNyYW1lbnRvJyB9LFxuICB7IG5hbWU6ICdXZXN0IFZhbGxleSBDaXR5JyB9LFxuICB7IG5hbWU6ICdXZXN0ZXJ2aWxsZScgfSxcbiAgeyBuYW1lOiAnV2VzdGZpZWxkJyB9LFxuICB7IG5hbWU6ICdXZXN0bGFuZCcgfSxcbiAgeyBuYW1lOiAnV2VzdG1pbnN0ZXInIH0sXG4gIHsgbmFtZTogJ1dlc3RtaW5zdGVyJyB9LFxuICB7IG5hbWU6ICdXZXN0b24nIH0sXG4gIHsgbmFtZTogJ1dleW1vdXRoIFRvd24nIH0sXG4gIHsgbmFtZTogJ1doZWF0b24nIH0sXG4gIHsgbmFtZTogJ1doZWVsaW5nJyB9LFxuICB7IG5hbWU6ICdXaGl0ZSBQbGFpbnMnIH0sXG4gIHsgbmFtZTogJ1doaXR0aWVyJyB9LFxuICB7IG5hbWU6ICdXaWNoaXRhJyB9LFxuICB7IG5hbWU6ICdXaWNoaXRhIEZhbGxzJyB9LFxuICB7IG5hbWU6ICdXaWxrZXMtQmFycmUnIH0sXG4gIHsgbmFtZTogJ1dpbG1pbmd0b24nIH0sXG4gIHsgbmFtZTogJ1dpbG1pbmd0b24nIH0sXG4gIHsgbmFtZTogJ1dpbHNvbicgfSxcbiAgeyBuYW1lOiAnV2luc3Rvbi1TYWxlbScgfSxcbiAgeyBuYW1lOiAnV2ludGVyIEdhcmRlbicgfSxcbiAgeyBuYW1lOiAnV29idXJuJyB9LFxuICB7IG5hbWU6ICdXb29kYnVyeScgfSxcbiAgeyBuYW1lOiAnV29vZGxhbmQnIH0sXG4gIHsgbmFtZTogJ1dvb25zb2NrZXQnIH0sXG4gIHsgbmFtZTogJ1dvcmNlc3RlcicgfSxcbiAgeyBuYW1lOiAnV3lsaWUnIH0sXG4gIHsgbmFtZTogJ1d5b21pbmcnIH0sXG4gIHsgbmFtZTogJ1lha2ltYScgfSxcbiAgeyBuYW1lOiAnWW9ua2VycycgfSxcbiAgeyBuYW1lOiAnWW9yYmEgTGluZGEnIH0sXG4gIHsgbmFtZTogJ1lvcmsnIH0sXG4gIHsgbmFtZTogJ1lvdW5nc3Rvd24nIH0sXG4gIHsgbmFtZTogJ1l1YmEgQ2l0eScgfSxcbiAgeyBuYW1lOiAnWXVjYWlwYScgfSxcbiAgeyBuYW1lOiAnWXVtYScgfVxuXTtcbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuXHR7IGdpdGh1YjogJ2plZHdhdHNvbicsIG5hbWU6ICdKZWQgV2F0c29uJyB9LFxuXHR7IGdpdGh1YjogJ2JydWRlcnN0ZWluJywgbmFtZTogJ0RhdmUgQnJvdGhlcnN0b25lJyB9LFxuXHR7IGdpdGh1YjogJ2pvc3NtYWMnLCBuYW1lOiAnSm9zcyBNYWNraXNvbicgfSxcblx0eyBnaXRodWI6ICdqbmllY2hjaWFsJywgbmFtZTogJ0pha3ViIE5pZWNoY2lhxYInIH0sXG5cdHsgZ2l0aHViOiAnY3JhaWdkYWxsaW1vcmUnLCBuYW1lOiAnQ3JhaWcgRGFsbGltb3JlJyB9LFxuXHR7IGdpdGh1YjogJ2p1bGVuJywgbmFtZTogJ0p1bGVuIFJ1aXogQWl6cHVydScgfSxcblx0eyBnaXRodWI6ICdkY291c2VucycsIG5hbWU6ICdEYW5pZWwgQ291c2VucycgfSxcblx0eyBnaXRodWI6ICdqZ2F1dHNjaCcsIG5hbWU6ICdKb24gR2F1dHNjaCcgfSxcblx0eyBnaXRodWI6ICdkbWl0cnktc21pcm5vdicsIG5hbWU6ICdEbWl0cnkgU21pcm5vdicgfSxcbl07XG4iLCJleHBvcnRzLkFVID0gW1xuXHR7IHZhbHVlOiAnYXVzdHJhbGlhbi1jYXBpdGFsLXRlcnJpdG9yeScsIGxhYmVsOiAnQXVzdHJhbGlhbiBDYXBpdGFsIFRlcnJpdG9yeScsIGNsYXNzTmFtZTogJ1N0YXRlLUFDVCcgfSxcblx0eyB2YWx1ZTogJ25ldy1zb3V0aC13YWxlcycsIGxhYmVsOiAnTmV3IFNvdXRoIFdhbGVzJywgY2xhc3NOYW1lOiAnU3RhdGUtTlNXJyB9LFxuXHR7IHZhbHVlOiAndmljdG9yaWEnLCBsYWJlbDogJ1ZpY3RvcmlhJywgY2xhc3NOYW1lOiAnU3RhdGUtVmljJyB9LFxuXHR7IHZhbHVlOiAncXVlZW5zbGFuZCcsIGxhYmVsOiAnUXVlZW5zbGFuZCcsIGNsYXNzTmFtZTogJ1N0YXRlLVFsZCcgfSxcblx0eyB2YWx1ZTogJ3dlc3Rlcm4tYXVzdHJhbGlhJywgbGFiZWw6ICdXZXN0ZXJuIEF1c3RyYWxpYScsIGNsYXNzTmFtZTogJ1N0YXRlLVdBJyB9LFxuXHR7IHZhbHVlOiAnc291dGgtYXVzdHJhbGlhJywgbGFiZWw6ICdTb3V0aCBBdXN0cmFsaWEnLCBjbGFzc05hbWU6ICdTdGF0ZS1TQScgfSxcblx0eyB2YWx1ZTogJ3Rhc21hbmlhJywgbGFiZWw6ICdUYXNtYW5pYScsIGNsYXNzTmFtZTogJ1N0YXRlLVRhcycgfSxcblx0eyB2YWx1ZTogJ25vcnRoZXJuLXRlcnJpdG9yeScsIGxhYmVsOiAnTm9ydGhlcm4gVGVycml0b3J5JywgY2xhc3NOYW1lOiAnU3RhdGUtTlQnIH0sXG5dO1xuXG5leHBvcnRzLlVTID0gW1xuICAgIHsgdmFsdWU6ICdBTCcsIGxhYmVsOiAnQWxhYmFtYScsIGRpc2FibGVkOiB0cnVlIH0sXG4gICAgeyB2YWx1ZTogJ0FLJywgbGFiZWw6ICdBbGFza2EnIH0sXG4gICAgeyB2YWx1ZTogJ0FTJywgbGFiZWw6ICdBbWVyaWNhbiBTYW1vYScgfSxcbiAgICB7IHZhbHVlOiAnQVonLCBsYWJlbDogJ0FyaXpvbmEnIH0sXG4gICAgeyB2YWx1ZTogJ0FSJywgbGFiZWw6ICdBcmthbnNhcycgfSxcbiAgICB7IHZhbHVlOiAnQ0EnLCBsYWJlbDogJ0NhbGlmb3JuaWEnIH0sXG4gICAgeyB2YWx1ZTogJ0NPJywgbGFiZWw6ICdDb2xvcmFkbycgfSxcbiAgICB7IHZhbHVlOiAnQ1QnLCBsYWJlbDogJ0Nvbm5lY3RpY3V0JyB9LFxuICAgIHsgdmFsdWU6ICdERScsIGxhYmVsOiAnRGVsYXdhcmUnIH0sXG4gICAgeyB2YWx1ZTogJ0RDJywgbGFiZWw6ICdEaXN0cmljdCBPZiBDb2x1bWJpYScgfSxcbiAgICB7IHZhbHVlOiAnRk0nLCBsYWJlbDogJ0ZlZGVyYXRlZCBTdGF0ZXMgT2YgTWljcm9uZXNpYScgfSxcbiAgICB7IHZhbHVlOiAnRkwnLCBsYWJlbDogJ0Zsb3JpZGEnIH0sXG4gICAgeyB2YWx1ZTogJ0dBJywgbGFiZWw6ICdHZW9yZ2lhJyB9LFxuICAgIHsgdmFsdWU6ICdHVScsIGxhYmVsOiAnR3VhbScgfSxcbiAgICB7IHZhbHVlOiAnSEknLCBsYWJlbDogJ0hhd2FpaScgfSxcbiAgICB7IHZhbHVlOiAnSUQnLCBsYWJlbDogJ0lkYWhvJyB9LFxuICAgIHsgdmFsdWU6ICdJTCcsIGxhYmVsOiAnSWxsaW5vaXMnIH0sXG4gICAgeyB2YWx1ZTogJ0lOJywgbGFiZWw6ICdJbmRpYW5hJyB9LFxuICAgIHsgdmFsdWU6ICdJQScsIGxhYmVsOiAnSW93YScgfSxcbiAgICB7IHZhbHVlOiAnS1MnLCBsYWJlbDogJ0thbnNhcycgfSxcbiAgICB7IHZhbHVlOiAnS1knLCBsYWJlbDogJ0tlbnR1Y2t5JyB9LFxuICAgIHsgdmFsdWU6ICdMQScsIGxhYmVsOiAnTG91aXNpYW5hJyB9LFxuICAgIHsgdmFsdWU6ICdNRScsIGxhYmVsOiAnTWFpbmUnIH0sXG4gICAgeyB2YWx1ZTogJ01IJywgbGFiZWw6ICdNYXJzaGFsbCBJc2xhbmRzJyB9LFxuICAgIHsgdmFsdWU6ICdNRCcsIGxhYmVsOiAnTWFyeWxhbmQnIH0sXG4gICAgeyB2YWx1ZTogJ01BJywgbGFiZWw6ICdNYXNzYWNodXNldHRzJyB9LFxuICAgIHsgdmFsdWU6ICdNSScsIGxhYmVsOiAnTWljaGlnYW4nIH0sXG4gICAgeyB2YWx1ZTogJ01OJywgbGFiZWw6ICdNaW5uZXNvdGEnIH0sXG4gICAgeyB2YWx1ZTogJ01TJywgbGFiZWw6ICdNaXNzaXNzaXBwaScgfSxcbiAgICB7IHZhbHVlOiAnTU8nLCBsYWJlbDogJ01pc3NvdXJpJyB9LFxuICAgIHsgdmFsdWU6ICdNVCcsIGxhYmVsOiAnTW9udGFuYScgfSxcbiAgICB7IHZhbHVlOiAnTkUnLCBsYWJlbDogJ05lYnJhc2thJyB9LFxuICAgIHsgdmFsdWU6ICdOVicsIGxhYmVsOiAnTmV2YWRhJyB9LFxuICAgIHsgdmFsdWU6ICdOSCcsIGxhYmVsOiAnTmV3IEhhbXBzaGlyZScgfSxcbiAgICB7IHZhbHVlOiAnTkonLCBsYWJlbDogJ05ldyBKZXJzZXknIH0sXG4gICAgeyB2YWx1ZTogJ05NJywgbGFiZWw6ICdOZXcgTWV4aWNvJyB9LFxuICAgIHsgdmFsdWU6ICdOWScsIGxhYmVsOiAnTmV3IFlvcmsnIH0sXG4gICAgeyB2YWx1ZTogJ05DJywgbGFiZWw6ICdOb3J0aCBDYXJvbGluYScgfSxcbiAgICB7IHZhbHVlOiAnTkQnLCBsYWJlbDogJ05vcnRoIERha290YScgfSxcbiAgICB7IHZhbHVlOiAnTVAnLCBsYWJlbDogJ05vcnRoZXJuIE1hcmlhbmEgSXNsYW5kcycgfSxcbiAgICB7IHZhbHVlOiAnT0gnLCBsYWJlbDogJ09oaW8nIH0sXG4gICAgeyB2YWx1ZTogJ09LJywgbGFiZWw6ICdPa2xhaG9tYScgfSxcbiAgICB7IHZhbHVlOiAnT1InLCBsYWJlbDogJ09yZWdvbicgfSxcbiAgICB7IHZhbHVlOiAnUFcnLCBsYWJlbDogJ1BhbGF1JyB9LFxuICAgIHsgdmFsdWU6ICdQQScsIGxhYmVsOiAnUGVubnN5bHZhbmlhJyB9LFxuICAgIHsgdmFsdWU6ICdQUicsIGxhYmVsOiAnUHVlcnRvIFJpY28nIH0sXG4gICAgeyB2YWx1ZTogJ1JJJywgbGFiZWw6ICdSaG9kZSBJc2xhbmQnIH0sXG4gICAgeyB2YWx1ZTogJ1NDJywgbGFiZWw6ICdTb3V0aCBDYXJvbGluYScgfSxcbiAgICB7IHZhbHVlOiAnU0QnLCBsYWJlbDogJ1NvdXRoIERha290YScgfSxcbiAgICB7IHZhbHVlOiAnVE4nLCBsYWJlbDogJ1Rlbm5lc3NlZScgfSxcbiAgICB7IHZhbHVlOiAnVFgnLCBsYWJlbDogJ1RleGFzJyB9LFxuICAgIHsgdmFsdWU6ICdVVCcsIGxhYmVsOiAnVXRhaCcgfSxcbiAgICB7IHZhbHVlOiAnVlQnLCBsYWJlbDogJ1Zlcm1vbnQnIH0sXG4gICAgeyB2YWx1ZTogJ1ZJJywgbGFiZWw6ICdWaXJnaW4gSXNsYW5kcycgfSxcbiAgICB7IHZhbHVlOiAnVkEnLCBsYWJlbDogJ1ZpcmdpbmlhJyB9LFxuICAgIHsgdmFsdWU6ICdXQScsIGxhYmVsOiAnV2FzaGluZ3RvbicgfSxcbiAgICB7IHZhbHVlOiAnV1YnLCBsYWJlbDogJ1dlc3QgVmlyZ2luaWEnIH0sXG4gICAgeyB2YWx1ZTogJ1dJJywgbGFiZWw6ICdXaXNjb25zaW4nIH0sXG4gICAgeyB2YWx1ZTogJ1dZJywgbGFiZWw6ICdXeW9taW5nJyB9LFxuXTtcbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuXHR7IHZhbHVlOiAnSm9obiBTbWl0aCcsIGxhYmVsOiAnSm9obiBTbWl0aCcsIGVtYWlsOiAnam9obkBzbWl0aC5jb20nIH0sXG5cdHsgdmFsdWU6ICdNZXJyeSBKYW5lJywgbGFiZWw6ICdNZXJyeSBKYW5lJywgZW1haWw6ICdtZXJyeUBqYW5lLmNvbScgfSxcblx0eyB2YWx1ZTogJ1N0YW4gSG9wZXInLCBsYWJlbDogJ1N0YW4gSG9wZXInLCBlbWFpbDogJ3N0YW5AaG9wZXIuY29tJyB9XG5dO1xuIiwidmFyIGNoYXJlbmMgPSB7XG4gIC8vIFVURi04IGVuY29kaW5nXG4gIHV0Zjg6IHtcbiAgICAvLyBDb252ZXJ0IGEgc3RyaW5nIHRvIGEgYnl0ZSBhcnJheVxuICAgIHN0cmluZ1RvQnl0ZXM6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgcmV0dXJuIGNoYXJlbmMuYmluLnN0cmluZ1RvQnl0ZXModW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHN0cikpKTtcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBhIGJ5dGUgYXJyYXkgdG8gYSBzdHJpbmdcbiAgICBieXRlc1RvU3RyaW5nOiBmdW5jdGlvbihieXRlcykge1xuICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlc2NhcGUoY2hhcmVuYy5iaW4uYnl0ZXNUb1N0cmluZyhieXRlcykpKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gQmluYXJ5IGVuY29kaW5nXG4gIGJpbjoge1xuICAgIC8vIENvbnZlcnQgYSBzdHJpbmcgdG8gYSBieXRlIGFycmF5XG4gICAgc3RyaW5nVG9CeXRlczogZnVuY3Rpb24oc3RyKSB7XG4gICAgICBmb3IgKHZhciBieXRlcyA9IFtdLCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKylcbiAgICAgICAgYnl0ZXMucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpO1xuICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgYnl0ZSBhcnJheSB0byBhIHN0cmluZ1xuICAgIGJ5dGVzVG9TdHJpbmc6IGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICBmb3IgKHZhciBzdHIgPSBbXSwgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkrKylcbiAgICAgICAgc3RyLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSkpO1xuICAgICAgcmV0dXJuIHN0ci5qb2luKCcnKTtcbiAgICB9XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2hhcmVuYztcbiIsIihmdW5jdGlvbigpIHtcbiAgdmFyIGJhc2U2NG1hcFxuICAgICAgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLycsXG5cbiAgY3J5cHQgPSB7XG4gICAgLy8gQml0LXdpc2Ugcm90YXRpb24gbGVmdFxuICAgIHJvdGw6IGZ1bmN0aW9uKG4sIGIpIHtcbiAgICAgIHJldHVybiAobiA8PCBiKSB8IChuID4+PiAoMzIgLSBiKSk7XG4gICAgfSxcblxuICAgIC8vIEJpdC13aXNlIHJvdGF0aW9uIHJpZ2h0XG4gICAgcm90cjogZnVuY3Rpb24obiwgYikge1xuICAgICAgcmV0dXJuIChuIDw8ICgzMiAtIGIpKSB8IChuID4+PiBiKTtcbiAgICB9LFxuXG4gICAgLy8gU3dhcCBiaWctZW5kaWFuIHRvIGxpdHRsZS1lbmRpYW4gYW5kIHZpY2UgdmVyc2FcbiAgICBlbmRpYW46IGZ1bmN0aW9uKG4pIHtcbiAgICAgIC8vIElmIG51bWJlciBnaXZlbiwgc3dhcCBlbmRpYW5cbiAgICAgIGlmIChuLmNvbnN0cnVjdG9yID09IE51bWJlcikge1xuICAgICAgICByZXR1cm4gY3J5cHQucm90bChuLCA4KSAmIDB4MDBGRjAwRkYgfCBjcnlwdC5yb3RsKG4sIDI0KSAmIDB4RkYwMEZGMDA7XG4gICAgICB9XG5cbiAgICAgIC8vIEVsc2UsIGFzc3VtZSBhcnJheSBhbmQgc3dhcCBhbGwgaXRlbXNcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbi5sZW5ndGg7IGkrKylcbiAgICAgICAgbltpXSA9IGNyeXB0LmVuZGlhbihuW2ldKTtcbiAgICAgIHJldHVybiBuO1xuICAgIH0sXG5cbiAgICAvLyBHZW5lcmF0ZSBhbiBhcnJheSBvZiBhbnkgbGVuZ3RoIG9mIHJhbmRvbSBieXRlc1xuICAgIHJhbmRvbUJ5dGVzOiBmdW5jdGlvbihuKSB7XG4gICAgICBmb3IgKHZhciBieXRlcyA9IFtdOyBuID4gMDsgbi0tKVxuICAgICAgICBieXRlcy5wdXNoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NikpO1xuICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgYnl0ZSBhcnJheSB0byBiaWctZW5kaWFuIDMyLWJpdCB3b3Jkc1xuICAgIGJ5dGVzVG9Xb3JkczogZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGZvciAodmFyIHdvcmRzID0gW10sIGkgPSAwLCBiID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrLCBiICs9IDgpXG4gICAgICAgIHdvcmRzW2IgPj4+IDVdIHw9IGJ5dGVzW2ldIDw8ICgyNCAtIGIgJSAzMik7XG4gICAgICByZXR1cm4gd29yZHM7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYmlnLWVuZGlhbiAzMi1iaXQgd29yZHMgdG8gYSBieXRlIGFycmF5XG4gICAgd29yZHNUb0J5dGVzOiBmdW5jdGlvbih3b3Jkcykge1xuICAgICAgZm9yICh2YXIgYnl0ZXMgPSBbXSwgYiA9IDA7IGIgPCB3b3Jkcy5sZW5ndGggKiAzMjsgYiArPSA4KVxuICAgICAgICBieXRlcy5wdXNoKCh3b3Jkc1tiID4+PiA1XSA+Pj4gKDI0IC0gYiAlIDMyKSkgJiAweEZGKTtcbiAgICAgIHJldHVybiBieXRlcztcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBhIGJ5dGUgYXJyYXkgdG8gYSBoZXggc3RyaW5nXG4gICAgYnl0ZXNUb0hleDogZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGZvciAodmFyIGhleCA9IFtdLCBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGhleC5wdXNoKChieXRlc1tpXSA+Pj4gNCkudG9TdHJpbmcoMTYpKTtcbiAgICAgICAgaGV4LnB1c2goKGJ5dGVzW2ldICYgMHhGKS50b1N0cmluZygxNikpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhleC5qb2luKCcnKTtcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBhIGhleCBzdHJpbmcgdG8gYSBieXRlIGFycmF5XG4gICAgaGV4VG9CeXRlczogZnVuY3Rpb24oaGV4KSB7XG4gICAgICBmb3IgKHZhciBieXRlcyA9IFtdLCBjID0gMDsgYyA8IGhleC5sZW5ndGg7IGMgKz0gMilcbiAgICAgICAgYnl0ZXMucHVzaChwYXJzZUludChoZXguc3Vic3RyKGMsIDIpLCAxNikpO1xuICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgYnl0ZSBhcnJheSB0byBhIGJhc2UtNjQgc3RyaW5nXG4gICAgYnl0ZXNUb0Jhc2U2NDogZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGZvciAodmFyIGJhc2U2NCA9IFtdLCBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAzKSB7XG4gICAgICAgIHZhciB0cmlwbGV0ID0gKGJ5dGVzW2ldIDw8IDE2KSB8IChieXRlc1tpICsgMV0gPDwgOCkgfCBieXRlc1tpICsgMl07XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgNDsgaisrKVxuICAgICAgICAgIGlmIChpICogOCArIGogKiA2IDw9IGJ5dGVzLmxlbmd0aCAqIDgpXG4gICAgICAgICAgICBiYXNlNjQucHVzaChiYXNlNjRtYXAuY2hhckF0KCh0cmlwbGV0ID4+PiA2ICogKDMgLSBqKSkgJiAweDNGKSk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgYmFzZTY0LnB1c2goJz0nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBiYXNlNjQuam9pbignJyk7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYSBiYXNlLTY0IHN0cmluZyB0byBhIGJ5dGUgYXJyYXlcbiAgICBiYXNlNjRUb0J5dGVzOiBmdW5jdGlvbihiYXNlNjQpIHtcbiAgICAgIC8vIFJlbW92ZSBub24tYmFzZS02NCBjaGFyYWN0ZXJzXG4gICAgICBiYXNlNjQgPSBiYXNlNjQucmVwbGFjZSgvW15BLVowLTkrXFwvXS9pZywgJycpO1xuXG4gICAgICBmb3IgKHZhciBieXRlcyA9IFtdLCBpID0gMCwgaW1vZDQgPSAwOyBpIDwgYmFzZTY0Lmxlbmd0aDtcbiAgICAgICAgICBpbW9kNCA9ICsraSAlIDQpIHtcbiAgICAgICAgaWYgKGltb2Q0ID09IDApIGNvbnRpbnVlO1xuICAgICAgICBieXRlcy5wdXNoKCgoYmFzZTY0bWFwLmluZGV4T2YoYmFzZTY0LmNoYXJBdChpIC0gMSkpXG4gICAgICAgICAgICAmIChNYXRoLnBvdygyLCAtMiAqIGltb2Q0ICsgOCkgLSAxKSkgPDwgKGltb2Q0ICogMikpXG4gICAgICAgICAgICB8IChiYXNlNjRtYXAuaW5kZXhPZihiYXNlNjQuY2hhckF0KGkpKSA+Pj4gKDYgLSBpbW9kNCAqIDIpKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfVxuICB9O1xuXG4gIG1vZHVsZS5leHBvcnRzID0gY3J5cHQ7XG59KSgpO1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSAhISh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQgJiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNhblVzZURPTSA9IHJlcXVpcmUoJy4vaW5ET00nKTtcblxudmFyIHNpemU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHJlY2FsYykge1xuICBpZiAoIXNpemUgfHwgcmVjYWxjKSB7XG4gICAgaWYgKGNhblVzZURPTSkge1xuICAgICAgdmFyIHNjcm9sbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICBzY3JvbGxEaXYuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgc2Nyb2xsRGl2LnN0eWxlLnRvcCA9ICctOTk5OXB4JztcbiAgICAgIHNjcm9sbERpdi5zdHlsZS53aWR0aCA9ICc1MHB4JztcbiAgICAgIHNjcm9sbERpdi5zdHlsZS5oZWlnaHQgPSAnNTBweCc7XG4gICAgICBzY3JvbGxEaXYuc3R5bGUub3ZlcmZsb3cgPSAnc2Nyb2xsJztcblxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JvbGxEaXYpO1xuICAgICAgc2l6ZSA9IHNjcm9sbERpdi5vZmZzZXRXaWR0aCAtIHNjcm9sbERpdi5jbGllbnRXaWR0aDtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoc2Nyb2xsRGl2KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc2l6ZTtcbn07IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEB0eXBlY2hlY2tzXG4gKiBcbiAqL1xuXG4vKmVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogaW5saW5lZCBPYmplY3QuaXMgcG9seWZpbGwgdG8gYXZvaWQgcmVxdWlyaW5nIGNvbnN1bWVycyBzaGlwIHRoZWlyIG93blxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2lzXG4gKi9cbmZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgLy8gU2FtZVZhbHVlIGFsZ29yaXRobVxuICBpZiAoeCA9PT0geSkge1xuICAgIC8vIFN0ZXBzIDEtNSwgNy0xMFxuICAgIC8vIFN0ZXBzIDYuYi02LmU6ICswICE9IC0wXG4gICAgcmV0dXJuIHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICB9IGVsc2Uge1xuICAgIC8vIFN0ZXAgNi5hOiBOYU4gPT0gTmFOXG4gICAgcmV0dXJuIHggIT09IHggJiYgeSAhPT0geTtcbiAgfVxufVxuXG4vKipcbiAqIFBlcmZvcm1zIGVxdWFsaXR5IGJ5IGl0ZXJhdGluZyB0aHJvdWdoIGtleXMgb24gYW4gb2JqZWN0IGFuZCByZXR1cm5pbmcgZmFsc2VcbiAqIHdoZW4gYW55IGtleSBoYXMgdmFsdWVzIHdoaWNoIGFyZSBub3Qgc3RyaWN0bHkgZXF1YWwgYmV0d2VlbiB0aGUgYXJndW1lbnRzLlxuICogUmV0dXJucyB0cnVlIHdoZW4gdGhlIHZhbHVlcyBvZiBhbGwga2V5cyBhcmUgc3RyaWN0bHkgZXF1YWwuXG4gKi9cbmZ1bmN0aW9uIHNoYWxsb3dFcXVhbChvYmpBLCBvYmpCKSB7XG4gIGlmIChpcyhvYmpBLCBvYmpCKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvYmpBICE9PSAnb2JqZWN0JyB8fCBvYmpBID09PSBudWxsIHx8IHR5cGVvZiBvYmpCICE9PSAnb2JqZWN0JyB8fCBvYmpCID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGtleXNBID0gT2JqZWN0LmtleXMob2JqQSk7XG4gIHZhciBrZXlzQiA9IE9iamVjdC5rZXlzKG9iakIpO1xuXG4gIGlmIChrZXlzQS5sZW5ndGggIT09IGtleXNCLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIFRlc3QgZm9yIEEncyBrZXlzIGRpZmZlcmVudCBmcm9tIEIuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5c0EubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIWhhc093blByb3BlcnR5LmNhbGwob2JqQiwga2V5c0FbaV0pIHx8ICFpcyhvYmpBW2tleXNBW2ldXSwgb2JqQltrZXlzQVtpXV0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hhbGxvd0VxdWFsOyIsIi8qKlxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBCdWZmZXJcbiAqXG4gKiBBdXRob3I6ICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIExpY2Vuc2U6ICBNSVRcbiAqXG4gKiBgbnBtIGluc3RhbGwgaXMtYnVmZmVyYFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gISEob2JqICE9IG51bGwgJiZcbiAgICAob2JqLl9pc0J1ZmZlciB8fCAvLyBGb3IgU2FmYXJpIDUtNyAobWlzc2luZyBPYmplY3QucHJvdG90eXBlLmNvbnN0cnVjdG9yKVxuICAgICAgKG9iai5jb25zdHJ1Y3RvciAmJlxuICAgICAgdHlwZW9mIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iaikpXG4gICAgKSlcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtZWRpYVF1ZXJ5O1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cgIT09IG51bGwpIHtcbiAgICBtZWRpYVF1ZXJ5ID0gXCIoLXdlYmtpdC1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAxLjI1KSwgKG1pbi0tbW96LWRldmljZS1waXhlbC1yYXRpbzogMS4yNSksICgtby1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiA1LzQpLCAobWluLXJlc29sdXRpb246IDEuMjVkcHB4KVwiO1xuICAgIGlmICh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA+IDEuMjUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEobWVkaWFRdWVyeSkubWF0Y2hlcykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG4iLCIvLyB0aGUgd2hhdHdnLWZldGNoIHBvbHlmaWxsIGluc3RhbGxzIHRoZSBmZXRjaCgpIGZ1bmN0aW9uXG4vLyBvbiB0aGUgZ2xvYmFsIG9iamVjdCAod2luZG93IG9yIHNlbGYpXG4vL1xuLy8gUmV0dXJuIHRoYXQgYXMgdGhlIGV4cG9ydCBmb3IgdXNlIGluIFdlYnBhY2ssIEJyb3dzZXJpZnkgZXRjLlxucmVxdWlyZSgnd2hhdHdnLWZldGNoJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHNlbGYuZmV0Y2guYmluZChzZWxmKTtcbiIsIihmdW5jdGlvbigpe1xyXG4gIHZhciBjcnlwdCA9IHJlcXVpcmUoJ2NyeXB0JyksXHJcbiAgICAgIHV0ZjggPSByZXF1aXJlKCdjaGFyZW5jJykudXRmOCxcclxuICAgICAgaXNCdWZmZXIgPSByZXF1aXJlKCdpcy1idWZmZXInKSxcclxuICAgICAgYmluID0gcmVxdWlyZSgnY2hhcmVuYycpLmJpbixcclxuXHJcbiAgLy8gVGhlIGNvcmVcclxuICBtZDUgPSBmdW5jdGlvbiAobWVzc2FnZSwgb3B0aW9ucykge1xyXG4gICAgLy8gQ29udmVydCB0byBieXRlIGFycmF5XHJcbiAgICBpZiAobWVzc2FnZS5jb25zdHJ1Y3RvciA9PSBTdHJpbmcpXHJcbiAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZW5jb2RpbmcgPT09ICdiaW5hcnknKVxyXG4gICAgICAgIG1lc3NhZ2UgPSBiaW4uc3RyaW5nVG9CeXRlcyhtZXNzYWdlKTtcclxuICAgICAgZWxzZVxyXG4gICAgICAgIG1lc3NhZ2UgPSB1dGY4LnN0cmluZ1RvQnl0ZXMobWVzc2FnZSk7XHJcbiAgICBlbHNlIGlmIChpc0J1ZmZlcihtZXNzYWdlKSlcclxuICAgICAgbWVzc2FnZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG1lc3NhZ2UsIDApO1xyXG4gICAgZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkobWVzc2FnZSkpXHJcbiAgICAgIG1lc3NhZ2UgPSBtZXNzYWdlLnRvU3RyaW5nKCk7XHJcbiAgICAvLyBlbHNlLCBhc3N1bWUgYnl0ZSBhcnJheSBhbHJlYWR5XHJcblxyXG4gICAgdmFyIG0gPSBjcnlwdC5ieXRlc1RvV29yZHMobWVzc2FnZSksXHJcbiAgICAgICAgbCA9IG1lc3NhZ2UubGVuZ3RoICogOCxcclxuICAgICAgICBhID0gIDE3MzI1ODQxOTMsXHJcbiAgICAgICAgYiA9IC0yNzE3MzM4NzksXHJcbiAgICAgICAgYyA9IC0xNzMyNTg0MTk0LFxyXG4gICAgICAgIGQgPSAgMjcxNzMzODc4O1xyXG5cclxuICAgIC8vIFN3YXAgZW5kaWFuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbVtpXSA9ICgobVtpXSA8PCAgOCkgfCAobVtpXSA+Pj4gMjQpKSAmIDB4MDBGRjAwRkYgfFxyXG4gICAgICAgICAgICAgKChtW2ldIDw8IDI0KSB8IChtW2ldID4+PiAgOCkpICYgMHhGRjAwRkYwMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBQYWRkaW5nXHJcbiAgICBtW2wgPj4+IDVdIHw9IDB4ODAgPDwgKGwgJSAzMik7XHJcbiAgICBtWygoKGwgKyA2NCkgPj4+IDkpIDw8IDQpICsgMTRdID0gbDtcclxuXHJcbiAgICAvLyBNZXRob2Qgc2hvcnRjdXRzXHJcbiAgICB2YXIgRkYgPSBtZDUuX2ZmLFxyXG4gICAgICAgIEdHID0gbWQ1Ll9nZyxcclxuICAgICAgICBISCA9IG1kNS5faGgsXHJcbiAgICAgICAgSUkgPSBtZDUuX2lpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbS5sZW5ndGg7IGkgKz0gMTYpIHtcclxuXHJcbiAgICAgIHZhciBhYSA9IGEsXHJcbiAgICAgICAgICBiYiA9IGIsXHJcbiAgICAgICAgICBjYyA9IGMsXHJcbiAgICAgICAgICBkZCA9IGQ7XHJcblxyXG4gICAgICBhID0gRkYoYSwgYiwgYywgZCwgbVtpKyAwXSwgIDcsIC02ODA4NzY5MzYpO1xyXG4gICAgICBkID0gRkYoZCwgYSwgYiwgYywgbVtpKyAxXSwgMTIsIC0zODk1NjQ1ODYpO1xyXG4gICAgICBjID0gRkYoYywgZCwgYSwgYiwgbVtpKyAyXSwgMTcsICA2MDYxMDU4MTkpO1xyXG4gICAgICBiID0gRkYoYiwgYywgZCwgYSwgbVtpKyAzXSwgMjIsIC0xMDQ0NTI1MzMwKTtcclxuICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIG1baSsgNF0sICA3LCAtMTc2NDE4ODk3KTtcclxuICAgICAgZCA9IEZGKGQsIGEsIGIsIGMsIG1baSsgNV0sIDEyLCAgMTIwMDA4MDQyNik7XHJcbiAgICAgIGMgPSBGRihjLCBkLCBhLCBiLCBtW2krIDZdLCAxNywgLTE0NzMyMzEzNDEpO1xyXG4gICAgICBiID0gRkYoYiwgYywgZCwgYSwgbVtpKyA3XSwgMjIsIC00NTcwNTk4Myk7XHJcbiAgICAgIGEgPSBGRihhLCBiLCBjLCBkLCBtW2krIDhdLCAgNywgIDE3NzAwMzU0MTYpO1xyXG4gICAgICBkID0gRkYoZCwgYSwgYiwgYywgbVtpKyA5XSwgMTIsIC0xOTU4NDE0NDE3KTtcclxuICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIG1baSsxMF0sIDE3LCAtNDIwNjMpO1xyXG4gICAgICBiID0gRkYoYiwgYywgZCwgYSwgbVtpKzExXSwgMjIsIC0xOTkwNDA0MTYyKTtcclxuICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIG1baSsxMl0sICA3LCAgMTgwNDYwMzY4Mik7XHJcbiAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBtW2krMTNdLCAxMiwgLTQwMzQxMTAxKTtcclxuICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIG1baSsxNF0sIDE3LCAtMTUwMjAwMjI5MCk7XHJcbiAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBtW2krMTVdLCAyMiwgIDEyMzY1MzUzMjkpO1xyXG5cclxuICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIG1baSsgMV0sICA1LCAtMTY1Nzk2NTEwKTtcclxuICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIG1baSsgNl0sICA5LCAtMTA2OTUwMTYzMik7XHJcbiAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBtW2krMTFdLCAxNCwgIDY0MzcxNzcxMyk7XHJcbiAgICAgIGIgPSBHRyhiLCBjLCBkLCBhLCBtW2krIDBdLCAyMCwgLTM3Mzg5NzMwMik7XHJcbiAgICAgIGEgPSBHRyhhLCBiLCBjLCBkLCBtW2krIDVdLCAgNSwgLTcwMTU1ODY5MSk7XHJcbiAgICAgIGQgPSBHRyhkLCBhLCBiLCBjLCBtW2krMTBdLCAgOSwgIDM4MDE2MDgzKTtcclxuICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIG1baSsxNV0sIDE0LCAtNjYwNDc4MzM1KTtcclxuICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIG1baSsgNF0sIDIwLCAtNDA1NTM3ODQ4KTtcclxuICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIG1baSsgOV0sICA1LCAgNTY4NDQ2NDM4KTtcclxuICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIG1baSsxNF0sICA5LCAtMTAxOTgwMzY5MCk7XHJcbiAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBtW2krIDNdLCAxNCwgLTE4NzM2Mzk2MSk7XHJcbiAgICAgIGIgPSBHRyhiLCBjLCBkLCBhLCBtW2krIDhdLCAyMCwgIDExNjM1MzE1MDEpO1xyXG4gICAgICBhID0gR0coYSwgYiwgYywgZCwgbVtpKzEzXSwgIDUsIC0xNDQ0NjgxNDY3KTtcclxuICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIG1baSsgMl0sICA5LCAtNTE0MDM3ODQpO1xyXG4gICAgICBjID0gR0coYywgZCwgYSwgYiwgbVtpKyA3XSwgMTQsICAxNzM1MzI4NDczKTtcclxuICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIG1baSsxMl0sIDIwLCAtMTkyNjYwNzczNCk7XHJcblxyXG4gICAgICBhID0gSEgoYSwgYiwgYywgZCwgbVtpKyA1XSwgIDQsIC0zNzg1NTgpO1xyXG4gICAgICBkID0gSEgoZCwgYSwgYiwgYywgbVtpKyA4XSwgMTEsIC0yMDIyNTc0NDYzKTtcclxuICAgICAgYyA9IEhIKGMsIGQsIGEsIGIsIG1baSsxMV0sIDE2LCAgMTgzOTAzMDU2Mik7XHJcbiAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBtW2krMTRdLCAyMywgLTM1MzA5NTU2KTtcclxuICAgICAgYSA9IEhIKGEsIGIsIGMsIGQsIG1baSsgMV0sICA0LCAtMTUzMDk5MjA2MCk7XHJcbiAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBtW2krIDRdLCAxMSwgIDEyNzI4OTMzNTMpO1xyXG4gICAgICBjID0gSEgoYywgZCwgYSwgYiwgbVtpKyA3XSwgMTYsIC0xNTU0OTc2MzIpO1xyXG4gICAgICBiID0gSEgoYiwgYywgZCwgYSwgbVtpKzEwXSwgMjMsIC0xMDk0NzMwNjQwKTtcclxuICAgICAgYSA9IEhIKGEsIGIsIGMsIGQsIG1baSsxM10sICA0LCAgNjgxMjc5MTc0KTtcclxuICAgICAgZCA9IEhIKGQsIGEsIGIsIGMsIG1baSsgMF0sIDExLCAtMzU4NTM3MjIyKTtcclxuICAgICAgYyA9IEhIKGMsIGQsIGEsIGIsIG1baSsgM10sIDE2LCAtNzIyNTIxOTc5KTtcclxuICAgICAgYiA9IEhIKGIsIGMsIGQsIGEsIG1baSsgNl0sIDIzLCAgNzYwMjkxODkpO1xyXG4gICAgICBhID0gSEgoYSwgYiwgYywgZCwgbVtpKyA5XSwgIDQsIC02NDAzNjQ0ODcpO1xyXG4gICAgICBkID0gSEgoZCwgYSwgYiwgYywgbVtpKzEyXSwgMTEsIC00MjE4MTU4MzUpO1xyXG4gICAgICBjID0gSEgoYywgZCwgYSwgYiwgbVtpKzE1XSwgMTYsICA1MzA3NDI1MjApO1xyXG4gICAgICBiID0gSEgoYiwgYywgZCwgYSwgbVtpKyAyXSwgMjMsIC05OTUzMzg2NTEpO1xyXG5cclxuICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIG1baSsgMF0sICA2LCAtMTk4NjMwODQ0KTtcclxuICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIG1baSsgN10sIDEwLCAgMTEyNjg5MTQxNSk7XHJcbiAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBtW2krMTRdLCAxNSwgLTE0MTYzNTQ5MDUpO1xyXG4gICAgICBiID0gSUkoYiwgYywgZCwgYSwgbVtpKyA1XSwgMjEsIC01NzQzNDA1NSk7XHJcbiAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBtW2krMTJdLCAgNiwgIDE3MDA0ODU1NzEpO1xyXG4gICAgICBkID0gSUkoZCwgYSwgYiwgYywgbVtpKyAzXSwgMTAsIC0xODk0OTg2NjA2KTtcclxuICAgICAgYyA9IElJKGMsIGQsIGEsIGIsIG1baSsxMF0sIDE1LCAtMTA1MTUyMyk7XHJcbiAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBtW2krIDFdLCAyMSwgLTIwNTQ5MjI3OTkpO1xyXG4gICAgICBhID0gSUkoYSwgYiwgYywgZCwgbVtpKyA4XSwgIDYsICAxODczMzEzMzU5KTtcclxuICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIG1baSsxNV0sIDEwLCAtMzA2MTE3NDQpO1xyXG4gICAgICBjID0gSUkoYywgZCwgYSwgYiwgbVtpKyA2XSwgMTUsIC0xNTYwMTk4MzgwKTtcclxuICAgICAgYiA9IElJKGIsIGMsIGQsIGEsIG1baSsxM10sIDIxLCAgMTMwOTE1MTY0OSk7XHJcbiAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBtW2krIDRdLCAgNiwgLTE0NTUyMzA3MCk7XHJcbiAgICAgIGQgPSBJSShkLCBhLCBiLCBjLCBtW2krMTFdLCAxMCwgLTExMjAyMTAzNzkpO1xyXG4gICAgICBjID0gSUkoYywgZCwgYSwgYiwgbVtpKyAyXSwgMTUsICA3MTg3ODcyNTkpO1xyXG4gICAgICBiID0gSUkoYiwgYywgZCwgYSwgbVtpKyA5XSwgMjEsIC0zNDM0ODU1NTEpO1xyXG5cclxuICAgICAgYSA9IChhICsgYWEpID4+PiAwO1xyXG4gICAgICBiID0gKGIgKyBiYikgPj4+IDA7XHJcbiAgICAgIGMgPSAoYyArIGNjKSA+Pj4gMDtcclxuICAgICAgZCA9IChkICsgZGQpID4+PiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjcnlwdC5lbmRpYW4oW2EsIGIsIGMsIGRdKTtcclxuICB9O1xyXG5cclxuICAvLyBBdXhpbGlhcnkgZnVuY3Rpb25zXHJcbiAgbWQ1Ll9mZiAgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCwgeCwgcywgdCkge1xyXG4gICAgdmFyIG4gPSBhICsgKGIgJiBjIHwgfmIgJiBkKSArICh4ID4+PiAwKSArIHQ7XHJcbiAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xyXG4gIH07XHJcbiAgbWQ1Ll9nZyAgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCwgeCwgcywgdCkge1xyXG4gICAgdmFyIG4gPSBhICsgKGIgJiBkIHwgYyAmIH5kKSArICh4ID4+PiAwKSArIHQ7XHJcbiAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xyXG4gIH07XHJcbiAgbWQ1Ll9oaCAgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCwgeCwgcywgdCkge1xyXG4gICAgdmFyIG4gPSBhICsgKGIgXiBjIF4gZCkgKyAoeCA+Pj4gMCkgKyB0O1xyXG4gICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcclxuICB9O1xyXG4gIG1kNS5faWkgID0gZnVuY3Rpb24gKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcclxuICAgIHZhciBuID0gYSArIChjIF4gKGIgfCB+ZCkpICsgKHggPj4+IDApICsgdDtcclxuICAgIHJldHVybiAoKG4gPDwgcykgfCAobiA+Pj4gKDMyIC0gcykpKSArIGI7XHJcbiAgfTtcclxuXHJcbiAgLy8gUGFja2FnZSBwcml2YXRlIGJsb2Nrc2l6ZVxyXG4gIG1kNS5fYmxvY2tzaXplID0gMTY7XHJcbiAgbWQ1Ll9kaWdlc3RzaXplID0gMTY7XHJcblxyXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG1lc3NhZ2UsIG9wdGlvbnMpIHtcclxuICAgIGlmKHR5cGVvZiBtZXNzYWdlID09ICd1bmRlZmluZWQnKVxyXG4gICAgICByZXR1cm47XHJcblxyXG4gICAgdmFyIGRpZ2VzdGJ5dGVzID0gY3J5cHQud29yZHNUb0J5dGVzKG1kNShtZXNzYWdlLCBvcHRpb25zKSk7XHJcbiAgICByZXR1cm4gb3B0aW9ucyAmJiBvcHRpb25zLmFzQnl0ZXMgPyBkaWdlc3RieXRlcyA6XHJcbiAgICAgICAgb3B0aW9ucyAmJiBvcHRpb25zLmFzU3RyaW5nID8gYmluLmJ5dGVzVG9TdHJpbmcoZGlnZXN0Ynl0ZXMpIDpcclxuICAgICAgICBjcnlwdC5ieXRlc1RvSGV4KGRpZ2VzdGJ5dGVzKTtcclxuICB9O1xyXG5cclxufSkoKTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjcuMVxuKGZ1bmN0aW9uKCkge1xuICB2YXIgZ2V0TmFub1NlY29uZHMsIGhydGltZSwgbG9hZFRpbWU7XG5cbiAgaWYgKCh0eXBlb2YgcGVyZm9ybWFuY2UgIT09IFwidW5kZWZpbmVkXCIgJiYgcGVyZm9ybWFuY2UgIT09IG51bGwpICYmIHBlcmZvcm1hbmNlLm5vdykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgfTtcbiAgfSBlbHNlIGlmICgodHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2VzcyAhPT0gbnVsbCkgJiYgcHJvY2Vzcy5ocnRpbWUpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIChnZXROYW5vU2Vjb25kcygpIC0gbG9hZFRpbWUpIC8gMWU2O1xuICAgIH07XG4gICAgaHJ0aW1lID0gcHJvY2Vzcy5ocnRpbWU7XG4gICAgZ2V0TmFub1NlY29uZHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBocjtcbiAgICAgIGhyID0gaHJ0aW1lKCk7XG4gICAgICByZXR1cm4gaHJbMF0gKiAxZTkgKyBoclsxXTtcbiAgICB9O1xuICAgIGxvYWRUaW1lID0gZ2V0TmFub1NlY29uZHMoKTtcbiAgfSBlbHNlIGlmIChEYXRlLm5vdykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gRGF0ZS5ub3coKSAtIGxvYWRUaW1lO1xuICAgIH07XG4gICAgbG9hZFRpbWUgPSBEYXRlLm5vdygpO1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBsb2FkVGltZTtcbiAgICB9O1xuICAgIGxvYWRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIH1cblxufSkuY2FsbCh0aGlzKTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbihmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGlzIG5vdCBkZWZpbmVkJyk7XG4gICAgfVxuICB9XG4gIHRyeSB7XG4gICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICB9IGNhdGNoIChlKSB7XG4gICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaXMgbm90IGRlZmluZWQnKTtcbiAgICB9XG4gIH1cbn0gKCkpXG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBjYWNoZWRTZXRUaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBjYWNoZWRDbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHN0cmljdFVyaUVuY29kZSA9IHJlcXVpcmUoJ3N0cmljdC11cmktZW5jb2RlJyk7XG52YXIgb2JqZWN0QXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsdWUsIG9wdHMpIHtcblx0aWYgKG9wdHMuZW5jb2RlKSB7XG5cdFx0cmV0dXJuIG9wdHMuc3RyaWN0ID8gc3RyaWN0VXJpRW5jb2RlKHZhbHVlKSA6IGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG5cdH1cblxuXHRyZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydHMuZXh0cmFjdCA9IGZ1bmN0aW9uIChzdHIpIHtcblx0cmV0dXJuIHN0ci5zcGxpdCgnPycpWzFdIHx8ICcnO1xufTtcblxuZXhwb3J0cy5wYXJzZSA9IGZ1bmN0aW9uIChzdHIpIHtcblx0Ly8gQ3JlYXRlIGFuIG9iamVjdCB3aXRoIG5vIHByb3RvdHlwZVxuXHQvLyBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL3F1ZXJ5LXN0cmluZy9pc3N1ZXMvNDdcblx0dmFyIHJldCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cblx0aWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIHJldDtcblx0fVxuXG5cdHN0ciA9IHN0ci50cmltKCkucmVwbGFjZSgvXihcXD98I3wmKS8sICcnKTtcblxuXHRpZiAoIXN0cikge1xuXHRcdHJldHVybiByZXQ7XG5cdH1cblxuXHRzdHIuc3BsaXQoJyYnKS5mb3JFYWNoKGZ1bmN0aW9uIChwYXJhbSkge1xuXHRcdHZhciBwYXJ0cyA9IHBhcmFtLnJlcGxhY2UoL1xcKy9nLCAnICcpLnNwbGl0KCc9Jyk7XG5cdFx0Ly8gRmlyZWZveCAocHJlIDQwKSBkZWNvZGVzIGAlM0RgIHRvIGA9YFxuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvcXVlcnktc3RyaW5nL3B1bGwvMzdcblx0XHR2YXIga2V5ID0gcGFydHMuc2hpZnQoKTtcblx0XHR2YXIgdmFsID0gcGFydHMubGVuZ3RoID4gMCA/IHBhcnRzLmpvaW4oJz0nKSA6IHVuZGVmaW5lZDtcblxuXHRcdGtleSA9IGRlY29kZVVSSUNvbXBvbmVudChrZXkpO1xuXG5cdFx0Ly8gbWlzc2luZyBgPWAgc2hvdWxkIGJlIGBudWxsYDpcblx0XHQvLyBodHRwOi8vdzMub3JnL1RSLzIwMTIvV0QtdXJsLTIwMTIwNTI0LyNjb2xsZWN0LXVybC1wYXJhbWV0ZXJzXG5cdFx0dmFsID0gdmFsID09PSB1bmRlZmluZWQgPyBudWxsIDogZGVjb2RlVVJJQ29tcG9uZW50KHZhbCk7XG5cblx0XHRpZiAocmV0W2tleV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0W2tleV0gPSB2YWw7XG5cdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHJldFtrZXldKSkge1xuXHRcdFx0cmV0W2tleV0ucHVzaCh2YWwpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXRba2V5XSA9IFtyZXRba2V5XSwgdmFsXTtcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiByZXQ7XG59O1xuXG5leHBvcnRzLnN0cmluZ2lmeSA9IGZ1bmN0aW9uIChvYmosIG9wdHMpIHtcblx0dmFyIGRlZmF1bHRzID0ge1xuXHRcdGVuY29kZTogdHJ1ZSxcblx0XHRzdHJpY3Q6IHRydWVcblx0fTtcblxuXHRvcHRzID0gb2JqZWN0QXNzaWduKGRlZmF1bHRzLCBvcHRzKTtcblxuXHRyZXR1cm4gb2JqID8gT2JqZWN0LmtleXMob2JqKS5zb3J0KCkubWFwKGZ1bmN0aW9uIChrZXkpIHtcblx0XHR2YXIgdmFsID0gb2JqW2tleV07XG5cblx0XHRpZiAodmFsID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cblx0XHRpZiAodmFsID09PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gZW5jb2RlKGtleSwgb3B0cyk7XG5cdFx0fVxuXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IFtdO1xuXG5cdFx0XHR2YWwuc2xpY2UoKS5mb3JFYWNoKGZ1bmN0aW9uICh2YWwyKSB7XG5cdFx0XHRcdGlmICh2YWwyID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodmFsMiA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKGVuY29kZShrZXksIG9wdHMpKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChlbmNvZGUoa2V5LCBvcHRzKSArICc9JyArIGVuY29kZSh2YWwyLCBvcHRzKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oJyYnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZW5jb2RlKGtleSwgb3B0cykgKyAnPScgKyBlbmNvZGUodmFsLCBvcHRzKTtcblx0fSkuZmlsdGVyKGZ1bmN0aW9uICh4KSB7XG5cdFx0cmV0dXJuIHgubGVuZ3RoID4gMDtcblx0fSkuam9pbignJicpIDogJyc7XG59O1xuIiwidmFyIG5vdyA9IHJlcXVpcmUoJ3BlcmZvcm1hbmNlLW5vdycpXG4gICwgcm9vdCA9IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93XG4gICwgdmVuZG9ycyA9IFsnbW96JywgJ3dlYmtpdCddXG4gICwgc3VmZml4ID0gJ0FuaW1hdGlvbkZyYW1lJ1xuICAsIHJhZiA9IHJvb3RbJ3JlcXVlc3QnICsgc3VmZml4XVxuICAsIGNhZiA9IHJvb3RbJ2NhbmNlbCcgKyBzdWZmaXhdIHx8IHJvb3RbJ2NhbmNlbFJlcXVlc3QnICsgc3VmZml4XVxuXG5mb3IodmFyIGkgPSAwOyAhcmFmICYmIGkgPCB2ZW5kb3JzLmxlbmd0aDsgaSsrKSB7XG4gIHJhZiA9IHJvb3RbdmVuZG9yc1tpXSArICdSZXF1ZXN0JyArIHN1ZmZpeF1cbiAgY2FmID0gcm9vdFt2ZW5kb3JzW2ldICsgJ0NhbmNlbCcgKyBzdWZmaXhdXG4gICAgICB8fCByb290W3ZlbmRvcnNbaV0gKyAnQ2FuY2VsUmVxdWVzdCcgKyBzdWZmaXhdXG59XG5cbi8vIFNvbWUgdmVyc2lvbnMgb2YgRkYgaGF2ZSByQUYgYnV0IG5vdCBjQUZcbmlmKCFyYWYgfHwgIWNhZikge1xuICB2YXIgbGFzdCA9IDBcbiAgICAsIGlkID0gMFxuICAgICwgcXVldWUgPSBbXVxuICAgICwgZnJhbWVEdXJhdGlvbiA9IDEwMDAgLyA2MFxuXG4gIHJhZiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgaWYocXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgICB2YXIgX25vdyA9IG5vdygpXG4gICAgICAgICwgbmV4dCA9IE1hdGgubWF4KDAsIGZyYW1lRHVyYXRpb24gLSAoX25vdyAtIGxhc3QpKVxuICAgICAgbGFzdCA9IG5leHQgKyBfbm93XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY3AgPSBxdWV1ZS5zbGljZSgwKVxuICAgICAgICAvLyBDbGVhciBxdWV1ZSBoZXJlIHRvIHByZXZlbnRcbiAgICAgICAgLy8gY2FsbGJhY2tzIGZyb20gYXBwZW5kaW5nIGxpc3RlbmVyc1xuICAgICAgICAvLyB0byB0aGUgY3VycmVudCBmcmFtZSdzIHF1ZXVlXG4gICAgICAgIHF1ZXVlLmxlbmd0aCA9IDBcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGNwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYoIWNwW2ldLmNhbmNlbGxlZCkge1xuICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICBjcFtpXS5jYWxsYmFjayhsYXN0KVxuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IHRocm93IGUgfSwgMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIE1hdGgucm91bmQobmV4dCkpXG4gICAgfVxuICAgIHF1ZXVlLnB1c2goe1xuICAgICAgaGFuZGxlOiArK2lkLFxuICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgY2FuY2VsbGVkOiBmYWxzZVxuICAgIH0pXG4gICAgcmV0dXJuIGlkXG4gIH1cblxuICBjYWYgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKHF1ZXVlW2ldLmhhbmRsZSA9PT0gaGFuZGxlKSB7XG4gICAgICAgIHF1ZXVlW2ldLmNhbmNlbGxlZCA9IHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbikge1xuICAvLyBXcmFwIGluIGEgbmV3IGZ1bmN0aW9uIHRvIHByZXZlbnRcbiAgLy8gYGNhbmNlbGAgcG90ZW50aWFsbHkgYmVpbmcgYXNzaWduZWRcbiAgLy8gdG8gdGhlIG5hdGl2ZSByQUYgZnVuY3Rpb25cbiAgcmV0dXJuIHJhZi5jYWxsKHJvb3QsIGZuKVxufVxubW9kdWxlLmV4cG9ydHMuY2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gIGNhZi5hcHBseShyb290LCBhcmd1bWVudHMpXG59XG5tb2R1bGUuZXhwb3J0cy5wb2x5ZmlsbCA9IGZ1bmN0aW9uKCkge1xuICByb290LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHJhZlxuICByb290LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gY2FmXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9zaGFsbG93Q29tcGFyZScpOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX21kID0gcmVxdWlyZSgnbWQ1Jyk7XG5cbnZhciBfbWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWQpO1xuXG52YXIgX3F1ZXJ5U3RyaW5nID0gcmVxdWlyZSgncXVlcnktc3RyaW5nJyk7XG5cbnZhciBfcXVlcnlTdHJpbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcXVlcnlTdHJpbmcpO1xuXG52YXIgX2lzUmV0aW5hID0gcmVxdWlyZSgnaXMtcmV0aW5hJyk7XG5cbnZhciBfaXNSZXRpbmEyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNSZXRpbmEpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob2JqLCBrZXlzKSB7IHZhciB0YXJnZXQgPSB7fTsgZm9yICh2YXIgaSBpbiBvYmopIHsgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTsgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7IHRhcmdldFtpXSA9IG9ialtpXTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIEdyYXZhdGFyID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzKEdyYXZhdGFyLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBHcmF2YXRhcigpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgR3JhdmF0YXIpO1xuXG4gICAgcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihHcmF2YXRhcikuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoR3JhdmF0YXIsIFt7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIGJhc2UgPSB2b2lkIDA7XG4gICAgICBpZiAodGhpcy5wcm9wcy5odHRwcykge1xuICAgICAgICBiYXNlID0gJ2h0dHBzOi8vc2VjdXJlLmdyYXZhdGFyLmNvbS9hdmF0YXIvJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJhc2UgPSAnaHR0cDovL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyLyc7XG4gICAgICB9XG5cbiAgICAgIHZhciBxdWVyeSA9IF9xdWVyeVN0cmluZzIuZGVmYXVsdC5zdHJpbmdpZnkoe1xuICAgICAgICBzOiB0aGlzLnByb3BzLnNpemUsXG4gICAgICAgIHI6IHRoaXMucHJvcHMucmF0aW5nLFxuICAgICAgICBkOiB0aGlzLnByb3BzLmRlZmF1bHRcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgcmV0aW5hUXVlcnkgPSBfcXVlcnlTdHJpbmcyLmRlZmF1bHQuc3RyaW5naWZ5KHtcbiAgICAgICAgczogdGhpcy5wcm9wcy5zaXplICogMixcbiAgICAgICAgcjogdGhpcy5wcm9wcy5yYXRpbmcsXG4gICAgICAgIGQ6IHRoaXMucHJvcHMuZGVmYXVsdFxuICAgICAgfSk7XG5cbiAgICAgIHZhciBoYXNoID0gdm9pZCAwO1xuICAgICAgaWYgKHRoaXMucHJvcHMubWQ1KSB7XG4gICAgICAgIGhhc2ggPSB0aGlzLnByb3BzLm1kNTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5lbWFpbCkge1xuICAgICAgICBoYXNoID0gKDAsIF9tZDIuZGVmYXVsdCkodGhpcy5wcm9wcy5lbWFpbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0dyYXZhdGFyIGltYWdlIGNhbiBub3QgYmUgZmV0Y2hlZC4gRWl0aGVyIHRoZSBcImVtYWlsXCIgb3IgXCJtZDVcIiBwcm9wIG11c3QgYmUgc3BlY2lmaWVkLicpO1xuICAgICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcsIG51bGwpO1xuICAgICAgfVxuXG4gICAgICB2YXIgc3JjID0gJycgKyBiYXNlICsgaGFzaCArICc/JyArIHF1ZXJ5O1xuICAgICAgdmFyIHJldGluYVNyYyA9ICcnICsgYmFzZSArIGhhc2ggKyAnPycgKyByZXRpbmFRdWVyeTtcblxuICAgICAgdmFyIG1vZGVybkJyb3dzZXIgPSB0cnVlOyAvLyBzZXJ2ZXItc2lkZSwgd2UgcmVuZGVyIGZvciBtb2Rlcm4gYnJvd3NlcnNcblxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIHRoaXMgaXMgbm90IE5vZGVKU1xuICAgICAgICBtb2Rlcm5Ccm93c2VyID0gJ3NyY3NldCcgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICB9XG5cbiAgICAgIHZhciBjbGFzc05hbWUgPSAncmVhY3QtZ3JhdmF0YXInO1xuICAgICAgaWYgKHRoaXMucHJvcHMuY2xhc3NOYW1lKSB7XG4gICAgICAgIGNsYXNzTmFtZSA9IGNsYXNzTmFtZSArICcgJyArIHRoaXMucHJvcHMuY2xhc3NOYW1lO1xuICAgICAgfVxuXG4gICAgICAvLyBDbG9uZSB0aGlzLnByb3BzIGFuZCB0aGVuIGRlbGV0ZSBDb21wb25lbnQgc3BlY2lmaWMgcHJvcHMgc28gd2UgY2FuXG4gICAgICAvLyBzcHJlYWQgdGhlIHJlc3QgaW50byB0aGUgaW1nLlxuXG4gICAgICB2YXIgcmVzdCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyh0aGlzLnByb3BzLCBbXSk7XG5cbiAgICAgIGRlbGV0ZSByZXN0Lmh0dHBzO1xuICAgICAgZGVsZXRlIHJlc3QubWQ1O1xuICAgICAgZGVsZXRlIHJlc3QuZW1haWw7XG4gICAgICBkZWxldGUgcmVzdC5yYXRpbmc7XG4gICAgICBkZWxldGUgcmVzdC5zaXplO1xuICAgICAgZGVsZXRlIHJlc3Quc3R5bGU7XG4gICAgICBkZWxldGUgcmVzdC5jbGFzc05hbWU7XG4gICAgICBkZWxldGUgcmVzdC5kZWZhdWx0O1xuICAgICAgaWYgKCFtb2Rlcm5Ccm93c2VyICYmICgwLCBfaXNSZXRpbmEyLmRlZmF1bHQpKCkpIHtcbiAgICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdpbWcnLCBfZXh0ZW5kcyh7XG4gICAgICAgICAgYWx0OiAnR3JhdmF0YXIgZm9yICcgKyB0aGlzLnByb3BzLmVtYWlsLFxuICAgICAgICAgIHN0eWxlOiB0aGlzLnByb3BzLnN0eWxlLFxuICAgICAgICAgIHNyYzogcmV0aW5hU3JjLFxuICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5zaXplLFxuICAgICAgICAgIHdpZHRoOiB0aGlzLnByb3BzLnNpemVcbiAgICAgICAgfSwgcmVzdCwge1xuICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgnaW1nJywgX2V4dGVuZHMoe1xuICAgICAgICBhbHQ6ICdHcmF2YXRhciBmb3IgJyArIHRoaXMucHJvcHMuZW1haWwsXG4gICAgICAgIHN0eWxlOiB0aGlzLnByb3BzLnN0eWxlLFxuICAgICAgICBzcmM6IHNyYyxcbiAgICAgICAgc3JjU2V0OiByZXRpbmFTcmMgKyAnIDJ4JyxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLnByb3BzLnNpemUsXG4gICAgICAgIHdpZHRoOiB0aGlzLnByb3BzLnNpemVcbiAgICAgIH0sIHJlc3QsIHtcbiAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWVcbiAgICAgIH0pKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gR3JhdmF0YXI7XG59KF9yZWFjdDIuZGVmYXVsdC5Db21wb25lbnQpO1xuXG5HcmF2YXRhci5kaXNwbGF5TmFtZSA9ICdHcmF2YXRhcic7XG5HcmF2YXRhci5wcm9wVHlwZXMgPSB7XG4gIGVtYWlsOiBfcmVhY3QyLmRlZmF1bHQuUHJvcFR5cGVzLnN0cmluZyxcbiAgbWQ1OiBfcmVhY3QyLmRlZmF1bHQuUHJvcFR5cGVzLnN0cmluZyxcbiAgc2l6ZTogX3JlYWN0Mi5kZWZhdWx0LlByb3BUeXBlcy5udW1iZXIsXG4gIHJhdGluZzogX3JlYWN0Mi5kZWZhdWx0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGh0dHBzOiBfcmVhY3QyLmRlZmF1bHQuUHJvcFR5cGVzLmJvb2wsXG4gIGRlZmF1bHQ6IF9yZWFjdDIuZGVmYXVsdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBjbGFzc05hbWU6IF9yZWFjdDIuZGVmYXVsdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICBzdHlsZTogX3JlYWN0Mi5kZWZhdWx0LlByb3BUeXBlcy5vYmplY3Rcbn07XG5HcmF2YXRhci5kZWZhdWx0UHJvcHMgPSB7XG4gIHNpemU6IDUwLFxuICByYXRpbmc6ICdnJyxcbiAgaHR0cHM6IGZhbHNlLFxuICBkZWZhdWx0OiAncmV0cm8nXG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gR3JhdmF0YXI7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3RTZWxlY3QgPSByZXF1aXJlKCdyZWFjdC1zZWxlY3QnKTtcblxudmFyIF9yZWFjdFNlbGVjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdFNlbGVjdCk7XG5cbnZhciBfcmVhY3RWaXJ0dWFsaXplZCA9IHJlcXVpcmUoJ3JlYWN0LXZpcnR1YWxpemVkJyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIFZpcnR1YWxpemVkU2VsZWN0ID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKFZpcnR1YWxpemVkU2VsZWN0LCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBWaXJ0dWFsaXplZFNlbGVjdChwcm9wcywgY29udGV4dCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBWaXJ0dWFsaXplZFNlbGVjdCk7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoVmlydHVhbGl6ZWRTZWxlY3QpLmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpKTtcblxuICAgIF90aGlzLl9yZW5kZXJNZW51ID0gX3RoaXMuX3JlbmRlck1lbnUuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX29wdGlvblJlbmRlcmVyID0gX3RoaXMuX29wdGlvblJlbmRlcmVyLmJpbmQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhWaXJ0dWFsaXplZFNlbGVjdCwgW3tcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX3JlYWN0U2VsZWN0Mi5kZWZhdWx0LCBfZXh0ZW5kcyh7fSwgdGhpcy5wcm9wcywge1xuICAgICAgICBtZW51UmVuZGVyZXI6IHRoaXMuX3JlbmRlck1lbnUsXG4gICAgICAgIG1lbnVTdHlsZTogeyBvdmVyZmxvdzogJ2hpZGRlbicgfVxuICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vSmVkV2F0c29uL3JlYWN0LXNlbGVjdC8jZWZmZWNpZW50bHktcmVuZGVyaW5nLWxhcmdlLWxpc3RzLXdpdGgtd2luZG93aW5nXG5cbiAgfSwge1xuICAgIGtleTogJ19yZW5kZXJNZW51JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3JlbmRlck1lbnUoX3JlZikge1xuICAgICAgdmFyIGZvY3VzZWRPcHRpb24gPSBfcmVmLmZvY3VzZWRPcHRpb247XG4gICAgICB2YXIgZm9jdXNPcHRpb24gPSBfcmVmLmZvY3VzT3B0aW9uO1xuICAgICAgdmFyIGxhYmVsS2V5ID0gX3JlZi5sYWJlbEtleTtcbiAgICAgIHZhciBvcHRpb25zID0gX3JlZi5vcHRpb25zO1xuICAgICAgdmFyIHNlbGVjdFZhbHVlID0gX3JlZi5zZWxlY3RWYWx1ZTtcbiAgICAgIHZhciB2YWx1ZUFycmF5ID0gX3JlZi52YWx1ZUFycmF5O1xuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgbWF4SGVpZ2h0ID0gX3Byb3BzLm1heEhlaWdodDtcbiAgICAgIHZhciBvcHRpb25IZWlnaHQgPSBfcHJvcHMub3B0aW9uSGVpZ2h0O1xuICAgICAgdmFyIG9wdGlvblJlbmRlcmVyID0gX3Byb3BzLm9wdGlvblJlbmRlcmVyO1xuXG4gICAgICB2YXIgZm9jdXNlZE9wdGlvbkluZGV4ID0gb3B0aW9ucy5pbmRleE9mKGZvY3VzZWRPcHRpb24pO1xuICAgICAgdmFyIGhlaWdodCA9IE1hdGgubWluKG1heEhlaWdodCwgb3B0aW9ucy5sZW5ndGggKiBvcHRpb25IZWlnaHQpO1xuICAgICAgdmFyIGlubmVyUm93UmVuZGVyZXIgPSBvcHRpb25SZW5kZXJlciB8fCB0aGlzLl9vcHRpb25SZW5kZXJlcjtcblxuICAgICAgZnVuY3Rpb24gd3JhcHBlZFJvd1JlbmRlcmVyKGluZGV4KSB7XG4gICAgICAgIHZhciBvcHRpb24gPSBvcHRpb25zW2luZGV4XTtcblxuICAgICAgICByZXR1cm4gaW5uZXJSb3dSZW5kZXJlcih7IGZvY3VzZWRPcHRpb246IGZvY3VzZWRPcHRpb24sIGZvY3VzZWRPcHRpb25JbmRleDogZm9jdXNlZE9wdGlvbkluZGV4LCBmb2N1c09wdGlvbjogZm9jdXNPcHRpb24sIGxhYmVsS2V5OiBsYWJlbEtleSwgb3B0aW9uOiBvcHRpb24sIG9wdGlvbnM6IG9wdGlvbnMsIHNlbGVjdFZhbHVlOiBzZWxlY3RWYWx1ZSwgdmFsdWVBcnJheTogdmFsdWVBcnJheSB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICBfcmVhY3RWaXJ0dWFsaXplZC5BdXRvU2l6ZXIsXG4gICAgICAgIHsgZGlzYWJsZUhlaWdodDogdHJ1ZSB9LFxuICAgICAgICBmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICAgICAgICB2YXIgd2lkdGggPSBfcmVmMi53aWR0aDtcbiAgICAgICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX3JlYWN0VmlydHVhbGl6ZWQuVmlydHVhbFNjcm9sbCwge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiAnVmlydHVhbFNlbGVjdEdyaWQnLFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgICAgICByb3dIZWlnaHQ6IG9wdGlvbkhlaWdodCxcbiAgICAgICAgICAgIHJvd1JlbmRlcmVyOiB3cmFwcGVkUm93UmVuZGVyZXIsXG4gICAgICAgICAgICByb3dzQ291bnQ6IG9wdGlvbnMubGVuZ3RoLFxuICAgICAgICAgICAgc2Nyb2xsVG9JbmRleDogZm9jdXNlZE9wdGlvbkluZGV4LFxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29wdGlvblJlbmRlcmVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29wdGlvblJlbmRlcmVyKF9yZWYzKSB7XG4gICAgICB2YXIgZm9jdXNlZE9wdGlvbiA9IF9yZWYzLmZvY3VzZWRPcHRpb247XG4gICAgICB2YXIgZm9jdXNPcHRpb24gPSBfcmVmMy5mb2N1c09wdGlvbjtcbiAgICAgIHZhciBsYWJlbEtleSA9IF9yZWYzLmxhYmVsS2V5O1xuICAgICAgdmFyIG9wdGlvbiA9IF9yZWYzLm9wdGlvbjtcbiAgICAgIHZhciBzZWxlY3RWYWx1ZSA9IF9yZWYzLnNlbGVjdFZhbHVlO1xuICAgICAgdmFyIG9wdGlvbkhlaWdodCA9IHRoaXMucHJvcHMub3B0aW9uSGVpZ2h0O1xuXG5cbiAgICAgIHZhciBjbGFzc05hbWUgPSBvcHRpb24gPT09IGZvY3VzZWRPcHRpb24gPyAnVmlydHVhbGl6ZWRTZWxlY3RPcHRpb24gVmlydHVhbGl6ZWRTZWxlY3RGb2N1c2VkT3B0aW9uJyA6ICdWaXJ0dWFsaXplZFNlbGVjdE9wdGlvbic7XG5cbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHtcbiAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiBvbkNsaWNrKCkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdFZhbHVlKG9wdGlvbik7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbk1vdXNlT3ZlcjogZnVuY3Rpb24gb25Nb3VzZU92ZXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gZm9jdXNPcHRpb24ob3B0aW9uKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBoZWlnaHQ6IG9wdGlvbkhlaWdodFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9uW2xhYmVsS2V5XVxuICAgICAgKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gVmlydHVhbGl6ZWRTZWxlY3Q7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG5WaXJ0dWFsaXplZFNlbGVjdC5wcm9wVHlwZXMgPSB7XG4gIG1heEhlaWdodDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgb3B0aW9uSGVpZ2h0OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICBvcHRpb25SZW5kZXJlcjogX3JlYWN0LlByb3BUeXBlcy5mdW5jXG59O1xuVmlydHVhbGl6ZWRTZWxlY3QuZGVmYXVsdFByb3BzID0ge1xuICBtYXhIZWlnaHQ6IDIwMCxcbiAgb3B0aW9uSGVpZ2h0OiAzNVxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IFZpcnR1YWxpemVkU2VsZWN0OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHVuZGVmaW5lZDtcblxudmFyIF9WaXJ0dWFsaXplZFNlbGVjdCA9IHJlcXVpcmUoJy4vVmlydHVhbGl6ZWRTZWxlY3QnKTtcblxudmFyIF9WaXJ0dWFsaXplZFNlbGVjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9WaXJ0dWFsaXplZFNlbGVjdCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9WaXJ0dWFsaXplZFNlbGVjdDIuZGVmYXVsdDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlID0gcmVxdWlyZSgncmVhY3QtYWRkb25zLXNoYWxsb3ctY29tcGFyZScpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBUaGlzIEhPQyBkZWNvcmF0ZXMgYSB2aXJ0dWFsaXplZCBjb21wb25lbnQgYW5kIHJlc3BvbmRzIHRvIGFycm93LWtleSBldmVudHMgYnkgc2Nyb2xsaW5nIG9uZSByb3cgb3IgY29sdW1uIGF0IGEgdGltZS5cbiAqL1xuXG52YXIgQXJyb3dLZXlTdGVwcGVyID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKEFycm93S2V5U3RlcHBlciwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gQXJyb3dLZXlTdGVwcGVyKHByb3BzLCBjb250ZXh0KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEFycm93S2V5U3RlcHBlcik7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQXJyb3dLZXlTdGVwcGVyKS5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0KSk7XG5cbiAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNjcm9sbFRvQ29sdW1uOiAwLFxuICAgICAgc2Nyb2xsVG9Sb3c6IDBcbiAgICB9O1xuXG4gICAgX3RoaXMuX2NvbHVtblN0YXJ0SW5kZXggPSAwO1xuICAgIF90aGlzLl9jb2x1bW5TdG9wSW5kZXggPSAwO1xuICAgIF90aGlzLl9yb3dTdGFydEluZGV4ID0gMDtcbiAgICBfdGhpcy5fcm93U3RvcEluZGV4ID0gMDtcblxuICAgIF90aGlzLl9vbktleURvd24gPSBfdGhpcy5fb25LZXlEb3duLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9vblNlY3Rpb25SZW5kZXJlZCA9IF90aGlzLl9vblNlY3Rpb25SZW5kZXJlZC5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQXJyb3dLZXlTdGVwcGVyLCBbe1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGNsYXNzTmFtZSA9IF9wcm9wcy5jbGFzc05hbWU7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBfcHJvcHMuY2hpbGRyZW47XG4gICAgICB2YXIgX3N0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgIHZhciBzY3JvbGxUb0NvbHVtbiA9IF9zdGF0ZS5zY3JvbGxUb0NvbHVtbjtcbiAgICAgIHZhciBzY3JvbGxUb1JvdyA9IF9zdGF0ZS5zY3JvbGxUb1JvdztcblxuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdkaXYnLFxuICAgICAgICB7XG4gICAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsXG4gICAgICAgICAgb25LZXlEb3duOiB0aGlzLl9vbktleURvd25cbiAgICAgICAgfSxcbiAgICAgICAgY2hpbGRyZW4oe1xuICAgICAgICAgIG9uU2VjdGlvblJlbmRlcmVkOiB0aGlzLl9vblNlY3Rpb25SZW5kZXJlZCxcbiAgICAgICAgICBzY3JvbGxUb0NvbHVtbjogc2Nyb2xsVG9Db2x1bW4sXG4gICAgICAgICAgc2Nyb2xsVG9Sb3c6IHNjcm9sbFRvUm93XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Nob3VsZENvbXBvbmVudFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgcmV0dXJuICgwLCBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIuZGVmYXVsdCkodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbktleURvd24nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25LZXlEb3duKGV2ZW50KSB7XG4gICAgICB2YXIgX3Byb3BzMiA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY29sdW1uc0NvdW50ID0gX3Byb3BzMi5jb2x1bW5zQ291bnQ7XG4gICAgICB2YXIgcm93c0NvdW50ID0gX3Byb3BzMi5yb3dzQ291bnQ7XG5cbiAgICAgIC8vIFRoZSBhYm92ZSBjYXNlcyBhbGwgcHJldmVudCBkZWZhdWx0IGV2ZW50IGV2ZW50IGJlaGF2aW9yLlxuICAgICAgLy8gVGhpcyBpcyB0byBrZWVwIHRoZSBncmlkIGZyb20gc2Nyb2xsaW5nIGFmdGVyIHRoZSBzbmFwLXRvIHVwZGF0ZS5cblxuICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9Sb3c6IE1hdGgubWluKHRoaXMuX3Jvd1N0b3BJbmRleCArIDEsIHJvd3NDb3VudCAtIDEpXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvQ29sdW1uOiBNYXRoLm1heCh0aGlzLl9jb2x1bW5TdGFydEluZGV4IC0gMSwgMClcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvQ29sdW1uOiBNYXRoLm1pbih0aGlzLl9jb2x1bW5TdG9wSW5kZXggKyAxLCBjb2x1bW5zQ291bnQgLSAxKVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9Sb3c6IE1hdGgubWF4KHRoaXMuX3Jvd1N0YXJ0SW5kZXggLSAxLCAwKVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vblNlY3Rpb25SZW5kZXJlZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblNlY3Rpb25SZW5kZXJlZChfcmVmKSB7XG4gICAgICB2YXIgY29sdW1uU3RhcnRJbmRleCA9IF9yZWYuY29sdW1uU3RhcnRJbmRleDtcbiAgICAgIHZhciBjb2x1bW5TdG9wSW5kZXggPSBfcmVmLmNvbHVtblN0b3BJbmRleDtcbiAgICAgIHZhciByb3dTdGFydEluZGV4ID0gX3JlZi5yb3dTdGFydEluZGV4O1xuICAgICAgdmFyIHJvd1N0b3BJbmRleCA9IF9yZWYucm93U3RvcEluZGV4O1xuXG4gICAgICB0aGlzLl9jb2x1bW5TdGFydEluZGV4ID0gY29sdW1uU3RhcnRJbmRleDtcbiAgICAgIHRoaXMuX2NvbHVtblN0b3BJbmRleCA9IGNvbHVtblN0b3BJbmRleDtcbiAgICAgIHRoaXMuX3Jvd1N0YXJ0SW5kZXggPSByb3dTdGFydEluZGV4O1xuICAgICAgdGhpcy5fcm93U3RvcEluZGV4ID0gcm93U3RvcEluZGV4O1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBBcnJvd0tleVN0ZXBwZXI7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG5BcnJvd0tleVN0ZXBwZXIucHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNsYXNzTmFtZTogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gIGNvbHVtbnNDb3VudDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgcm93c0NvdW50OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gQXJyb3dLZXlTdGVwcGVyOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuQXJyb3dLZXlTdGVwcGVyID0gZXhwb3J0cy5kZWZhdWx0ID0gdW5kZWZpbmVkO1xuXG52YXIgX0Fycm93S2V5U3RlcHBlcjIgPSByZXF1aXJlKCcuL0Fycm93S2V5U3RlcHBlcicpO1xuXG52YXIgX0Fycm93S2V5U3RlcHBlcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BcnJvd0tleVN0ZXBwZXIyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX0Fycm93S2V5U3RlcHBlcjMuZGVmYXVsdDtcbmV4cG9ydHMuQXJyb3dLZXlTdGVwcGVyID0gX0Fycm93S2V5U3RlcHBlcjMuZGVmYXVsdDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlID0gcmVxdWlyZSgncmVhY3QtYWRkb25zLXNoYWxsb3ctY29tcGFyZScpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBEZWNvcmF0b3IgY29tcG9uZW50IHRoYXQgYXV0b21hdGljYWxseSBhZGp1c3RzIHRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIGEgc2luZ2xlIGNoaWxkLlxuICogQ2hpbGQgY29tcG9uZW50IHNob3VsZCBub3QgYmUgZGVjbGFyZWQgYXMgYSBjaGlsZCBidXQgc2hvdWxkIHJhdGhlciBiZSBzcGVjaWZpZWQgYnkgYSBgQ2hpbGRDb21wb25lbnRgIHByb3BlcnR5LlxuICogQWxsIG90aGVyIHByb3BlcnRpZXMgd2lsbCBiZSBwYXNzZWQgdGhyb3VnaCB0byB0aGUgY2hpbGQgY29tcG9uZW50LlxuICovXG5cbnZhciBBdXRvU2l6ZXIgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoQXV0b1NpemVyLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBBdXRvU2l6ZXIocHJvcHMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQXV0b1NpemVyKTtcblxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihBdXRvU2l6ZXIpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgaGVpZ2h0OiAwLFxuICAgICAgd2lkdGg6IDBcbiAgICB9O1xuXG4gICAgX3RoaXMuX29uUmVzaXplID0gX3RoaXMuX29uUmVzaXplLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl9vblNjcm9sbCA9IF90aGlzLl9vblNjcm9sbC5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fc2V0UmVmID0gX3RoaXMuX3NldFJlZi5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQXV0b1NpemVyLCBbe1xuICAgIGtleTogJ2NvbXBvbmVudERpZE1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAvLyBEZWZlciByZXF1aXJpbmcgcmVzaXplIGhhbmRsZXIgaW4gb3JkZXIgdG8gc3VwcG9ydCBzZXJ2ZXItc2lkZSByZW5kZXJpbmcuXG4gICAgICAvLyBTZWUgaXNzdWUgIzQxXG4gICAgICB0aGlzLl9kZXRlY3RFbGVtZW50UmVzaXplID0gcmVxdWlyZSgnLi4vdmVuZG9yL2RldGVjdEVsZW1lbnRSZXNpemUnKTtcbiAgICAgIHRoaXMuX2RldGVjdEVsZW1lbnRSZXNpemUuYWRkUmVzaXplTGlzdGVuZXIodGhpcy5fcGFyZW50Tm9kZSwgdGhpcy5fb25SZXNpemUpO1xuXG4gICAgICB0aGlzLl9vblJlc2l6ZSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudFdpbGxVbm1vdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICBpZiAodGhpcy5fZGV0ZWN0RWxlbWVudFJlc2l6ZSkge1xuICAgICAgICB0aGlzLl9kZXRlY3RFbGVtZW50UmVzaXplLnJlbW92ZVJlc2l6ZUxpc3RlbmVyKHRoaXMuX3BhcmVudE5vZGUsIHRoaXMuX29uUmVzaXplKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjaGlsZHJlbiA9IF9wcm9wcy5jaGlsZHJlbjtcbiAgICAgIHZhciBkaXNhYmxlSGVpZ2h0ID0gX3Byb3BzLmRpc2FibGVIZWlnaHQ7XG4gICAgICB2YXIgZGlzYWJsZVdpZHRoID0gX3Byb3BzLmRpc2FibGVXaWR0aDtcbiAgICAgIHZhciBfc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgdmFyIGhlaWdodCA9IF9zdGF0ZS5oZWlnaHQ7XG4gICAgICB2YXIgd2lkdGggPSBfc3RhdGUud2lkdGg7XG5cbiAgICAgIC8vIE91dGVyIGRpdiBzaG91bGQgbm90IGZvcmNlIHdpZHRoL2hlaWdodCBzaW5jZSB0aGF0IG1heSBwcmV2ZW50IGNvbnRhaW5lcnMgZnJvbSBzaHJpbmtpbmcuXG4gICAgICAvLyBJbm5lciBjb21wb25lbnQgc2hvdWxkIG92ZXJmbG93IGFuZCB1c2UgY2FsY3VsYXRlZCB3aWR0aC9oZWlnaHQuXG4gICAgICAvLyBTZWUgaXNzdWUgIzY4IGZvciBtb3JlIGluZm9ybWF0aW9uLlxuXG4gICAgICB2YXIgb3V0ZXJTdHlsZSA9IHsgb3ZlcmZsb3c6ICd2aXNpYmxlJyB9O1xuXG4gICAgICBpZiAoIWRpc2FibGVIZWlnaHQpIHtcbiAgICAgICAgb3V0ZXJTdHlsZS5oZWlnaHQgPSAwO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWRpc2FibGVXaWR0aCkge1xuICAgICAgICBvdXRlclN0eWxlLndpZHRoID0gMDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAge1xuICAgICAgICAgIHJlZjogdGhpcy5fc2V0UmVmLFxuICAgICAgICAgIG9uU2Nyb2xsOiB0aGlzLl9vblNjcm9sbCxcbiAgICAgICAgICBzdHlsZTogb3V0ZXJTdHlsZVxuICAgICAgICB9LFxuICAgICAgICBjaGlsZHJlbih7IGhlaWdodDogaGVpZ2h0LCB3aWR0aDogd2lkdGggfSlcbiAgICAgICk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2hvdWxkQ29tcG9uZW50VXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICByZXR1cm4gKDAsIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMi5kZWZhdWx0KSh0aGlzLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uUmVzaXplJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uUmVzaXplKCkge1xuICAgICAgdmFyIG9uUmVzaXplID0gdGhpcy5wcm9wcy5vblJlc2l6ZTtcblxuICAgICAgLy8gR2F1cmQgYWdhaW5zdCBBdXRvU2l6ZXIgY29tcG9uZW50IGJlaW5nIHJlbW92ZWQgZnJvbSB0aGUgRE9NIGltbWVkaWF0ZWx5IGFmdGVyIGJlaW5nIGFkZGVkLlxuICAgICAgLy8gVGhpcyBjYW4gcmVzdWx0IGluIGludmFsaWQgc3R5bGUgdmFsdWVzIHdoaWNoIGNhbiByZXN1bHQgaW4gTmFOIHZhbHVlcyBpZiB3ZSBkb24ndCBoYW5kbGUgdGhlbS5cbiAgICAgIC8vIFNlZSBpc3N1ZSAjMTUwIGZvciBtb3JlIGNvbnRleHQuXG5cbiAgICAgIHZhciBib3VuZGluZ1JlY3QgPSB0aGlzLl9wYXJlbnROb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgdmFyIGhlaWdodCA9IGJvdW5kaW5nUmVjdC5oZWlnaHQgfHwgMDtcbiAgICAgIHZhciB3aWR0aCA9IGJvdW5kaW5nUmVjdC53aWR0aCB8fCAwO1xuXG4gICAgICB2YXIgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuX3BhcmVudE5vZGUpO1xuICAgICAgdmFyIHBhZGRpbmdMZWZ0ID0gcGFyc2VJbnQoc3R5bGUucGFkZGluZ0xlZnQsIDEwKSB8fCAwO1xuICAgICAgdmFyIHBhZGRpbmdSaWdodCA9IHBhcnNlSW50KHN0eWxlLnBhZGRpbmdSaWdodCwgMTApIHx8IDA7XG4gICAgICB2YXIgcGFkZGluZ1RvcCA9IHBhcnNlSW50KHN0eWxlLnBhZGRpbmdUb3AsIDEwKSB8fCAwO1xuICAgICAgdmFyIHBhZGRpbmdCb3R0b20gPSBwYXJzZUludChzdHlsZS5wYWRkaW5nQm90dG9tLCAxMCkgfHwgMDtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGhlaWdodDogaGVpZ2h0IC0gcGFkZGluZ1RvcCAtIHBhZGRpbmdCb3R0b20sXG4gICAgICAgIHdpZHRoOiB3aWR0aCAtIHBhZGRpbmdMZWZ0IC0gcGFkZGluZ1JpZ2h0XG4gICAgICB9KTtcblxuICAgICAgb25SZXNpemUoeyBoZWlnaHQ6IGhlaWdodCwgd2lkdGg6IHdpZHRoIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vblNjcm9sbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblNjcm9sbChldmVudCkge1xuICAgICAgLy8gUHJldmVudCBkZXRlY3RFbGVtZW50UmVzaXplIGxpYnJhcnkgZnJvbSBiZWluZyB0cmlnZ2VyZWQgYnkgdGhpcyBzY3JvbGwgZXZlbnQuXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfc2V0UmVmJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3NldFJlZihhdXRvU2l6ZXIpIHtcbiAgICAgIC8vIEluIGNhc2UgdGhlIGNvbXBvbmVudCBoYXMgYmVlbiB1bm1vdW50ZWRcbiAgICAgIHRoaXMuX3BhcmVudE5vZGUgPSBhdXRvU2l6ZXIgJiYgYXV0b1NpemVyLnBhcmVudE5vZGU7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEF1dG9TaXplcjtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cbkF1dG9TaXplci5wcm9wVHlwZXMgPSB7XG4gIC8qKlxuICAgKiBGdW5jdGlvbiByZXNwb25kaWJsZSBmb3IgcmVuZGVyaW5nIGNoaWxkcmVuLlxuICAgKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhlIGZvbGxvd2luZyBzaWduYXR1cmU6XG4gICAqICh7IGhlaWdodCwgd2lkdGggfSkgPT4gUHJvcFR5cGVzLmVsZW1lbnRcbiAgICovXG4gIGNoaWxkcmVuOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKiogRGlzYWJsZSBkeW5hbWljIDpoZWlnaHQgcHJvcGVydHkgKi9cbiAgZGlzYWJsZUhlaWdodDogX3JlYWN0LlByb3BUeXBlcy5ib29sLFxuXG4gIC8qKiBEaXNhYmxlIGR5bmFtaWMgOndpZHRoIHByb3BlcnR5ICovXG4gIGRpc2FibGVXaWR0aDogX3JlYWN0LlByb3BUeXBlcy5ib29sLFxuXG4gIC8qKiBDYWxsYmFjayB0byBiZSBpbnZva2VkIG9uLXJlc2l6ZTogKHsgaGVpZ2h0LCB3aWR0aCB9KSAqL1xuICBvblJlc2l6ZTogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn07XG5BdXRvU2l6ZXIuZGVmYXVsdFByb3BzID0ge1xuICBvblJlc2l6ZTogZnVuY3Rpb24gb25SZXNpemUoKSB7fVxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IEF1dG9TaXplcjsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkF1dG9TaXplciA9IGV4cG9ydHMuZGVmYXVsdCA9IHVuZGVmaW5lZDtcblxudmFyIF9BdXRvU2l6ZXIyID0gcmVxdWlyZSgnLi9BdXRvU2l6ZXInKTtcblxudmFyIF9BdXRvU2l6ZXIzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQXV0b1NpemVyMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9BdXRvU2l6ZXIzLmRlZmF1bHQ7XG5leHBvcnRzLkF1dG9TaXplciA9IF9BdXRvU2l6ZXIzLmRlZmF1bHQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfQ29sbGVjdGlvblZpZXcgPSByZXF1aXJlKCcuL0NvbGxlY3Rpb25WaWV3Jyk7XG5cbnZhciBfQ29sbGVjdGlvblZpZXcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ29sbGVjdGlvblZpZXcpO1xuXG52YXIgX2NhbGN1bGF0ZVNpemVBbmRQb3NpdGlvbkRhdGEyID0gcmVxdWlyZSgnLi91dGlscy9jYWxjdWxhdGVTaXplQW5kUG9zaXRpb25EYXRhJyk7XG5cbnZhciBfY2FsY3VsYXRlU2l6ZUFuZFBvc2l0aW9uRGF0YTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jYWxjdWxhdGVTaXplQW5kUG9zaXRpb25EYXRhMik7XG5cbnZhciBfZ2V0VXBkYXRlZE9mZnNldEZvckluZGV4ID0gcmVxdWlyZSgnLi4vdXRpbHMvZ2V0VXBkYXRlZE9mZnNldEZvckluZGV4Jyk7XG5cbnZhciBfZ2V0VXBkYXRlZE9mZnNldEZvckluZGV4MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldFVwZGF0ZWRPZmZzZXRGb3JJbmRleCk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSA9IHJlcXVpcmUoJ3JlYWN0LWFkZG9ucy1zaGFsbG93LWNvbXBhcmUnKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob2JqLCBrZXlzKSB7IHZhciB0YXJnZXQgPSB7fTsgZm9yICh2YXIgaSBpbiBvYmopIHsgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTsgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7IHRhcmdldFtpXSA9IG9ialtpXTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBSZW5kZXJzIHNjYXR0ZXJlZCBvciBub24tbGluZWFyIGRhdGEuXG4gKiBVbmxpa2UgR3JpZCwgd2hpY2ggcmVuZGVycyBjaGVja2VyYm9hcmQgZGF0YSwgQ29sbGVjdGlvbiBjYW4gcmVuZGVyIGFyYml0cmFyaWx5IHBvc2l0aW9uZWQtIGV2ZW4gb3ZlcmxhcHBpbmctIGRhdGEuXG4gKi9cblxudmFyIENvbGxlY3Rpb24gPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoQ29sbGVjdGlvbiwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gQ29sbGVjdGlvbihwcm9wcywgY29udGV4dCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb2xsZWN0aW9uKTtcblxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihDb2xsZWN0aW9uKS5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0KSk7XG5cbiAgICBfdGhpcy5fY2VsbE1ldGFkYXRhID0gW107XG4gICAgX3RoaXMuX2xhc3RSZW5kZXJlZENlbGxJbmRpY2VzID0gW107XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgLyoqIFJlYWN0IGxpZmVjeWNsZSBtZXRob2RzICovXG5cbiAgX2NyZWF0ZUNsYXNzKENvbGxlY3Rpb24sIFt7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIHByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKHRoaXMucHJvcHMsIFtdKTtcblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9Db2xsZWN0aW9uVmlldzIuZGVmYXVsdCwgX2V4dGVuZHMoe1xuICAgICAgICBjZWxsTGF5b3V0TWFuYWdlcjogdGhpcyxcbiAgICAgICAgcmVmOiAnQ29sbGVjdGlvblZpZXcnXG4gICAgICB9LCBwcm9wcykpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Nob3VsZENvbXBvbmVudFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgcmV0dXJuICgwLCBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIuZGVmYXVsdCkodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgIH1cblxuICAgIC8qKiBDZWxsTGF5b3V0TWFuYWdlciBpbnRlcmZhY2UgKi9cblxuICB9LCB7XG4gICAga2V5OiAnY2FsY3VsYXRlU2l6ZUFuZFBvc2l0aW9uRGF0YScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNhbGN1bGF0ZVNpemVBbmRQb3NpdGlvbkRhdGEoKSB7XG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjZWxsQ291bnQgPSBfcHJvcHMuY2VsbENvdW50O1xuICAgICAgdmFyIGNlbGxTaXplQW5kUG9zaXRpb25HZXR0ZXIgPSBfcHJvcHMuY2VsbFNpemVBbmRQb3NpdGlvbkdldHRlcjtcbiAgICAgIHZhciBzZWN0aW9uU2l6ZSA9IF9wcm9wcy5zZWN0aW9uU2l6ZTtcblxuXG4gICAgICB2YXIgZGF0YSA9ICgwLCBfY2FsY3VsYXRlU2l6ZUFuZFBvc2l0aW9uRGF0YTMuZGVmYXVsdCkoe1xuICAgICAgICBjZWxsQ291bnQ6IGNlbGxDb3VudCxcbiAgICAgICAgY2VsbFNpemVBbmRQb3NpdGlvbkdldHRlcjogY2VsbFNpemVBbmRQb3NpdGlvbkdldHRlcixcbiAgICAgICAgc2VjdGlvblNpemU6IHNlY3Rpb25TaXplXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fY2VsbE1ldGFkYXRhID0gZGF0YS5jZWxsTWV0YWRhdGE7XG4gICAgICB0aGlzLl9zZWN0aW9uTWFuYWdlciA9IGRhdGEuc2VjdGlvbk1hbmFnZXI7XG4gICAgICB0aGlzLl9oZWlnaHQgPSBkYXRhLmhlaWdodDtcbiAgICAgIHRoaXMuX3dpZHRoID0gZGF0YS53aWR0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBtb3N0IHJlY2VudGx5IHJlbmRlcmVkIHNldCBvZiBjZWxsIGluZGljZXMuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2dldExhc3RSZW5kZXJlZEluZGljZXMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRMYXN0UmVuZGVyZWRJbmRpY2VzKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2xhc3RSZW5kZXJlZENlbGxJbmRpY2VzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlIG1pbmltdW0gYW1vdW50IG9mIGNoYW5nZSBmcm9tIHRoZSBjdXJyZW50IHNjcm9sbCBwb3NpdGlvbiB0byBlbnN1cmUgdGhlIHNwZWNpZmllZCBjZWxsIGlzIChmdWxseSkgdmlzaWJsZS5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZ2V0U2Nyb2xsUG9zaXRpb25Gb3JDZWxsJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0U2Nyb2xsUG9zaXRpb25Gb3JDZWxsKF9yZWYpIHtcbiAgICAgIHZhciBjZWxsSW5kZXggPSBfcmVmLmNlbGxJbmRleDtcbiAgICAgIHZhciBoZWlnaHQgPSBfcmVmLmhlaWdodDtcbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gX3JlZi5zY3JvbGxMZWZ0O1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IF9yZWYuc2Nyb2xsVG9wO1xuICAgICAgdmFyIHdpZHRoID0gX3JlZi53aWR0aDtcbiAgICAgIHZhciBjZWxsQ291bnQgPSB0aGlzLnByb3BzLmNlbGxDb3VudDtcblxuXG4gICAgICBpZiAoY2VsbEluZGV4ID49IDAgJiYgY2VsbEluZGV4IDwgY2VsbENvdW50KSB7XG4gICAgICAgIHZhciBjZWxsTWV0YWRhdGEgPSB0aGlzLl9jZWxsTWV0YWRhdGFbY2VsbEluZGV4XTtcblxuICAgICAgICBzY3JvbGxMZWZ0ID0gKDAsIF9nZXRVcGRhdGVkT2Zmc2V0Rm9ySW5kZXgyLmRlZmF1bHQpKHtcbiAgICAgICAgICBjZWxsT2Zmc2V0OiBjZWxsTWV0YWRhdGEueCxcbiAgICAgICAgICBjZWxsU2l6ZTogY2VsbE1ldGFkYXRhLndpZHRoLFxuICAgICAgICAgIGNvbnRhaW5lclNpemU6IHdpZHRoLFxuICAgICAgICAgIGN1cnJlbnRPZmZzZXQ6IHNjcm9sbExlZnQsXG4gICAgICAgICAgdGFyZ2V0SW5kZXg6IGNlbGxJbmRleFxuICAgICAgICB9KTtcblxuICAgICAgICBzY3JvbGxUb3AgPSAoMCwgX2dldFVwZGF0ZWRPZmZzZXRGb3JJbmRleDIuZGVmYXVsdCkoe1xuICAgICAgICAgIGNlbGxPZmZzZXQ6IGNlbGxNZXRhZGF0YS55LFxuICAgICAgICAgIGNlbGxTaXplOiBjZWxsTWV0YWRhdGEuaGVpZ2h0LFxuICAgICAgICAgIGNvbnRhaW5lclNpemU6IGhlaWdodCxcbiAgICAgICAgICBjdXJyZW50T2Zmc2V0OiBzY3JvbGxUb3AsXG4gICAgICAgICAgdGFyZ2V0SW5kZXg6IGNlbGxJbmRleFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCxcbiAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxUb3BcbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0VG90YWxTaXplJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VG90YWxTaXplKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaGVpZ2h0OiB0aGlzLl9oZWlnaHQsXG4gICAgICAgIHdpZHRoOiB0aGlzLl93aWR0aFxuICAgICAgfTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXJDZWxscycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlckNlbGxzKF9yZWYyKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdmFyIGhlaWdodCA9IF9yZWYyLmhlaWdodDtcbiAgICAgIHZhciBpc1Njcm9sbGluZyA9IF9yZWYyLmlzU2Nyb2xsaW5nO1xuICAgICAgdmFyIHdpZHRoID0gX3JlZjIud2lkdGg7XG4gICAgICB2YXIgeCA9IF9yZWYyLng7XG4gICAgICB2YXIgeSA9IF9yZWYyLnk7XG4gICAgICB2YXIgX3Byb3BzMiA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY2VsbEdyb3VwUmVuZGVyZXIgPSBfcHJvcHMyLmNlbGxHcm91cFJlbmRlcmVyO1xuICAgICAgdmFyIGNlbGxSZW5kZXJlciA9IF9wcm9wczIuY2VsbFJlbmRlcmVyO1xuXG4gICAgICAvLyBTdG9yZSBmb3IgbGF0ZXIgY2FsbHMgdG8gZ2V0TGFzdFJlbmRlcmVkSW5kaWNlcygpXG5cbiAgICAgIHRoaXMuX2xhc3RSZW5kZXJlZENlbGxJbmRpY2VzID0gdGhpcy5fc2VjdGlvbk1hbmFnZXIuZ2V0Q2VsbEluZGljZXMoe1xuICAgICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICB4OiB4LFxuICAgICAgICB5OiB5XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGNlbGxHcm91cFJlbmRlcmVyKHtcbiAgICAgICAgY2VsbFJlbmRlcmVyOiBjZWxsUmVuZGVyZXIsXG4gICAgICAgIGNlbGxTaXplQW5kUG9zaXRpb25HZXR0ZXI6IGZ1bmN0aW9uIGNlbGxTaXplQW5kUG9zaXRpb25HZXR0ZXIoaW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMyLl9zZWN0aW9uTWFuYWdlci5nZXRDZWxsTWV0YWRhdGEoaW5kZXgpO1xuICAgICAgICB9LFxuICAgICAgICBpbmRpY2VzOiB0aGlzLl9sYXN0UmVuZGVyZWRDZWxsSW5kaWNlc1xuICAgICAgfSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIENvbGxlY3Rpb247XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG5Db2xsZWN0aW9uLnByb3BUeXBlcyA9IHtcbiAgJ2FyaWEtbGFiZWwnOiBfcmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKipcbiAgICogTnVtYmVyIG9mIGNlbGxzIGluIENvbGxlY3Rpb24uXG4gICAqL1xuICBjZWxsQ291bnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIFJlc3BvbnNpYmxlIGZvciByZW5kZXJpbmcgYSBncm91cCBvZiBjZWxscyBnaXZlbiB0aGVpciBpbmRpY2VzLlxuICAgKiBTaG91bGQgaW1wbGVtZW50IHRoZSBmb2xsb3dpbmcgaW50ZXJmYWNlOiAoe1xuICAgKiAgIGNlbGxTaXplQW5kUG9zaXRpb25HZXR0ZXI6RnVuY3Rpb24sXG4gICAqICAgaW5kaWNlczogQXJyYXk8bnVtYmVyPixcbiAgICogICBjZWxsUmVuZGVyZXI6IEZ1bmN0aW9uXG4gICAqIH0pOiBBcnJheTxQcm9wVHlwZXMubm9kZT5cbiAgICovXG4gIGNlbGxHcm91cFJlbmRlcmVyOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogUmVzcG9uc2libGUgZm9yIHJlbmRlcmluZyBhIGNlbGwgZ2l2ZW4gYW4gcm93IGFuZCBjb2x1bW4gaW5kZXguXG4gICAqIFNob3VsZCBpbXBsZW1lbnQgdGhlIGZvbGxvd2luZyBpbnRlcmZhY2U6IChpbmRleDogbnVtYmVyKTogUHJvcFR5cGVzLm5vZGVcbiAgICovXG4gIGNlbGxSZW5kZXJlcjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIHJlc3BvbnNpYmxlIGZvciByZXR1cm5pbmcgc2l6ZSBhbmQgb2Zmc2V0L3Bvc2l0aW9uIGluZm9ybWF0aW9uIGZvciBhIGdpdmVuIGNlbGwgKGluZGV4KS5cbiAgICogKGluZGV4KTogeyBoZWlnaHQ6IG51bWJlciwgd2lkdGg6IG51bWJlciwgeDogbnVtYmVyLCB5OiBudW1iZXIgfVxuICAgKi9cbiAgY2VsbFNpemVBbmRQb3NpdGlvbkdldHRlcjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIE9wdGlvbmFsbHkgb3ZlcnJpZGUgdGhlIHNpemUgb2YgdGhlIHNlY3Rpb25zIGEgQ29sbGVjdGlvbidzIGNlbGxzIGFyZSBzcGxpdCBpbnRvLlxuICAgKi9cbiAgc2VjdGlvblNpemU6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyXG59O1xuQ29sbGVjdGlvbi5kZWZhdWx0UHJvcHMgPSB7XG4gICdhcmlhLWxhYmVsJzogJ2dyaWQnLFxuICBjZWxsR3JvdXBSZW5kZXJlcjogZGVmYXVsdENlbGxHcm91cFJlbmRlcmVyXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gQ29sbGVjdGlvbjtcblxuXG5mdW5jdGlvbiBkZWZhdWx0Q2VsbEdyb3VwUmVuZGVyZXIoX3JlZjMpIHtcbiAgdmFyIGNlbGxSZW5kZXJlciA9IF9yZWYzLmNlbGxSZW5kZXJlcjtcbiAgdmFyIGNlbGxTaXplQW5kUG9zaXRpb25HZXR0ZXIgPSBfcmVmMy5jZWxsU2l6ZUFuZFBvc2l0aW9uR2V0dGVyO1xuICB2YXIgaW5kaWNlcyA9IF9yZWYzLmluZGljZXM7XG5cbiAgcmV0dXJuIGluZGljZXMubWFwKGZ1bmN0aW9uIChpbmRleCkge1xuICAgIHZhciBjZWxsTWV0YWRhdGEgPSBjZWxsU2l6ZUFuZFBvc2l0aW9uR2V0dGVyKGluZGV4KTtcbiAgICB2YXIgcmVuZGVyZWRDZWxsID0gY2VsbFJlbmRlcmVyKGluZGV4KTtcblxuICAgIGlmIChyZW5kZXJlZENlbGwgPT0gbnVsbCB8fCByZW5kZXJlZENlbGwgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAnZGl2JyxcbiAgICAgIHtcbiAgICAgICAgY2xhc3NOYW1lOiAnQ29sbGVjdGlvbl9fY2VsbCcsXG4gICAgICAgIGtleTogaW5kZXgsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgaGVpZ2h0OiBjZWxsTWV0YWRhdGEuaGVpZ2h0LFxuICAgICAgICAgIGxlZnQ6IGNlbGxNZXRhZGF0YS54LFxuICAgICAgICAgIHRvcDogY2VsbE1ldGFkYXRhLnksXG4gICAgICAgICAgd2lkdGg6IGNlbGxNZXRhZGF0YS53aWR0aFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcmVuZGVyZWRDZWxsXG4gICAgKTtcbiAgfSkuZmlsdGVyKGZ1bmN0aW9uIChyZW5kZXJlZENlbGwpIHtcbiAgICByZXR1cm4gISFyZW5kZXJlZENlbGw7XG4gIH0pO1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX2NsYXNzbmFtZXMgPSByZXF1aXJlKCdjbGFzc25hbWVzJyk7XG5cbnZhciBfY2xhc3NuYW1lczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc25hbWVzKTtcblxudmFyIF9jcmVhdGVDYWxsYmFja01lbW9pemVyID0gcmVxdWlyZSgnLi4vdXRpbHMvY3JlYXRlQ2FsbGJhY2tNZW1vaXplcicpO1xuXG52YXIgX2NyZWF0ZUNhbGxiYWNrTWVtb2l6ZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2FsbGJhY2tNZW1vaXplcik7XG5cbnZhciBfc2Nyb2xsYmFyU2l6ZSA9IHJlcXVpcmUoJ2RvbS1oZWxwZXJzL3V0aWwvc2Nyb2xsYmFyU2l6ZScpO1xuXG52YXIgX3Njcm9sbGJhclNpemUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2Nyb2xsYmFyU2l6ZSk7XG5cbnZhciBfcmFmID0gcmVxdWlyZSgncmFmJyk7XG5cbnZhciBfcmFmMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JhZik7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSA9IHJlcXVpcmUoJ3JlYWN0LWFkZG9ucy1zaGFsbG93LWNvbXBhcmUnKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbi8vIEBUT0RPIEl0IHdvdWxkIGJlIG5pY2UgdG8gcmVmYWN0b3IgR3JpZCB0byB1c2UgdGhpcyBjb2RlIGFzIHdlbGwuXG5cbi8qKlxuICogU3BlY2lmaWVzIHRoZSBudW1iZXIgb2YgbWlsaXNlY29uZHMgZHVyaW5nIHdoaWNoIHRvIGRpc2FibGUgcG9pbnRlciBldmVudHMgd2hpbGUgYSBzY3JvbGwgaXMgaW4gcHJvZ3Jlc3MuXG4gKiBUaGlzIGltcHJvdmVzIHBlcmZvcm1hbmNlIGFuZCBtYWtlcyBzY3JvbGxpbmcgc21vb3RoZXIuXG4gKi9cbnZhciBJU19TQ1JPTExJTkdfVElNRU9VVCA9IDE1MDtcblxuLyoqXG4gKiBDb250cm9scyB3aGV0aGVyIHRoZSBHcmlkIHVwZGF0ZXMgdGhlIERPTSBlbGVtZW50J3Mgc2Nyb2xsTGVmdC9zY3JvbGxUb3AgYmFzZWQgb24gdGhlIGN1cnJlbnQgc3RhdGUgb3IganVzdCBvYnNlcnZlcyBpdC5cbiAqIFRoaXMgcHJldmVudHMgR3JpZCBmcm9tIGludGVycnVwdGluZyBtb3VzZS13aGVlbCBhbmltYXRpb25zIChzZWUgaXNzdWUgIzIpLlxuICovXG52YXIgU0NST0xMX1BPU0lUSU9OX0NIQU5HRV9SRUFTT05TID0ge1xuICBPQlNFUlZFRDogJ29ic2VydmVkJyxcbiAgUkVRVUVTVEVEOiAncmVxdWVzdGVkJ1xufTtcblxuLyoqXG4gKiBNb25pdG9ycyBjaGFuZ2VzIGluIHByb3BlcnRpZXMgKGVnLiBjZWxsQ291bnQpIGFuZCBzdGF0ZSAoZWcuIHNjcm9sbCBvZmZzZXRzKSB0byBkZXRlcm1pbmUgd2hlbiByZW5kZXJpbmcgbmVlZHMgdG8gb2NjdXIuXG4gKiBUaGlzIGNvbXBvbmVudCBkb2VzIG5vdCByZW5kZXIgYW55IHZpc2libGUgY29udGVudCBpdHNlbGY7IGl0IGRlZmVycyB0byB0aGUgc3BlY2lmaWVkIDpjZWxsTGF5b3V0TWFuYWdlci5cbiAqL1xuXG52YXIgQ29sbGVjdGlvblZpZXcgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoQ29sbGVjdGlvblZpZXcsIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIENvbGxlY3Rpb25WaWV3KHByb3BzLCBjb250ZXh0KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvbGxlY3Rpb25WaWV3KTtcblxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihDb2xsZWN0aW9uVmlldykuY2FsbCh0aGlzLCBwcm9wcywgY29udGV4dCkpO1xuXG4gICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICBjYWxjdWxhdGVTaXplQW5kUG9zaXRpb25EYXRhT25OZXh0VXBkYXRlOiBmYWxzZSxcbiAgICAgIGlzU2Nyb2xsaW5nOiBmYWxzZSxcbiAgICAgIHNjcm9sbExlZnQ6IDAsXG4gICAgICBzY3JvbGxUb3A6IDBcbiAgICB9O1xuXG4gICAgLy8gSW52b2tlcyBjYWxsYmFja3Mgb25seSB3aGVuIHRoZWlyIHZhbHVlcyBoYXZlIGNoYW5nZWQuXG4gICAgX3RoaXMuX29uU2VjdGlvblJlbmRlcmVkTWVtb2l6ZXIgPSAoMCwgX2NyZWF0ZUNhbGxiYWNrTWVtb2l6ZXIyLmRlZmF1bHQpKCk7XG4gICAgX3RoaXMuX29uU2Nyb2xsTWVtb2l6ZXIgPSAoMCwgX2NyZWF0ZUNhbGxiYWNrTWVtb2l6ZXIyLmRlZmF1bHQpKGZhbHNlKTtcblxuICAgIC8vIEJpbmQgZnVuY3Rpb25zIHRvIGluc3RhbmNlIHNvIHRoZXkgZG9uJ3QgbG9zZSBjb250ZXh0IHdoZW4gcGFzc2VkIGFyb3VuZC5cbiAgICBfdGhpcy5faW52b2tlT25TZWN0aW9uUmVuZGVyZWRIZWxwZXIgPSBfdGhpcy5faW52b2tlT25TZWN0aW9uUmVuZGVyZWRIZWxwZXIuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX29uU2Nyb2xsID0gX3RoaXMuX29uU2Nyb2xsLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl91cGRhdGVTY3JvbGxQb3NpdGlvbkZvclNjcm9sbFRvQ2VsbCA9IF90aGlzLl91cGRhdGVTY3JvbGxQb3NpdGlvbkZvclNjcm9sbFRvQ2VsbC5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICAvKipcbiAgICogRm9yY2VkIHJlY29tcHV0ZSBvZiBjZWxsIHNpemVzIGFuZCBwb3NpdGlvbnMuXG4gICAqIFRoaXMgZnVuY3Rpb24gc2hvdWxkIGJlIGNhbGxlZCBpZiBjZWxsIHNpemVzIGhhdmUgY2hhbmdlZCBidXQgbm90aGluZyBlbHNlIGhhcy5cbiAgICogU2luY2UgY2VsbCBwb3NpdGlvbnMgYXJlIGNhbGN1bGF0ZWQgYnkgY2FsbGJhY2tzLCB0aGUgY29sbGVjdGlvbiB2aWV3IGhhcyBubyB3YXkgb2YgZGV0ZWN0aW5nIHdoZW4gdGhlIHVuZGVybHlpbmcgZGF0YSBoYXMgY2hhbmdlZC5cbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoQ29sbGVjdGlvblZpZXcsIFt7XG4gICAga2V5OiAncmVjb21wdXRlQ2VsbFNpemVzQW5kUG9zaXRpb25zJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVjb21wdXRlQ2VsbFNpemVzQW5kUG9zaXRpb25zKCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNhbGN1bGF0ZVNpemVBbmRQb3NpdGlvbkRhdGFPbk5leHRVcGRhdGU6IHRydWVcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gQ29tcG9uZW50IGxpZmVjeWNsZSBtZXRob2RzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50RGlkTW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGNlbGxMYXlvdXRNYW5hZ2VyID0gX3Byb3BzLmNlbGxMYXlvdXRNYW5hZ2VyO1xuICAgICAgdmFyIHNjcm9sbExlZnQgPSBfcHJvcHMuc2Nyb2xsTGVmdDtcbiAgICAgIHZhciBzY3JvbGxUb0NlbGwgPSBfcHJvcHMuc2Nyb2xsVG9DZWxsO1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IF9wcm9wcy5zY3JvbGxUb3A7XG5cblxuICAgICAgdGhpcy5fc2Nyb2xsYmFyU2l6ZSA9ICgwLCBfc2Nyb2xsYmFyU2l6ZTIuZGVmYXVsdCkoKTtcblxuICAgICAgaWYgKHNjcm9sbFRvQ2VsbCA+PSAwKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVNjcm9sbFBvc2l0aW9uRm9yU2Nyb2xsVG9DZWxsKCk7XG4gICAgICB9IGVsc2UgaWYgKHNjcm9sbExlZnQgPj0gMCB8fCBzY3JvbGxUb3AgPj0gMCkge1xuICAgICAgICB0aGlzLl9zZXRTY3JvbGxQb3NpdGlvbih7IHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsIHNjcm9sbFRvcDogc2Nyb2xsVG9wIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgb25TZWN0aW9uUmVuZGVyZWQgY2FsbGJhY2suXG4gICAgICB0aGlzLl9pbnZva2VPblNlY3Rpb25SZW5kZXJlZEhlbHBlcigpO1xuXG4gICAgICB2YXIgX2NlbGxMYXlvdXRNYW5hZ2VyJGdlID0gY2VsbExheW91dE1hbmFnZXIuZ2V0VG90YWxTaXplKCk7XG5cbiAgICAgIHZhciB0b3RhbEhlaWdodCA9IF9jZWxsTGF5b3V0TWFuYWdlciRnZS5oZWlnaHQ7XG4gICAgICB2YXIgdG90YWxXaWR0aCA9IF9jZWxsTGF5b3V0TWFuYWdlciRnZS53aWR0aDtcblxuICAgICAgLy8gSW5pdGlhbGl6ZSBvblNjcm9sbCBjYWxsYmFjay5cblxuICAgICAgdGhpcy5faW52b2tlT25TY3JvbGxNZW1vaXplcih7XG4gICAgICAgIHNjcm9sbExlZnQ6IHNjcm9sbExlZnQgfHwgMCxcbiAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxUb3AgfHwgMCxcbiAgICAgICAgdG90YWxIZWlnaHQ6IHRvdGFsSGVpZ2h0LFxuICAgICAgICB0b3RhbFdpZHRoOiB0b3RhbFdpZHRoXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnREaWRVcGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgIHZhciBfcHJvcHMyID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBoZWlnaHQgPSBfcHJvcHMyLmhlaWdodDtcbiAgICAgIHZhciBzY3JvbGxUb0NlbGwgPSBfcHJvcHMyLnNjcm9sbFRvQ2VsbDtcbiAgICAgIHZhciB3aWR0aCA9IF9wcm9wczIud2lkdGg7XG4gICAgICB2YXIgX3N0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gX3N0YXRlLnNjcm9sbExlZnQ7XG4gICAgICB2YXIgc2Nyb2xsUG9zaXRpb25DaGFuZ2VSZWFzb24gPSBfc3RhdGUuc2Nyb2xsUG9zaXRpb25DaGFuZ2VSZWFzb247XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gX3N0YXRlLnNjcm9sbFRvcDtcblxuICAgICAgLy8gTWFrZSBzdXJlIHJlcXVlc3RlZCBjaGFuZ2VzIHRvIDpzY3JvbGxMZWZ0IG9yIDpzY3JvbGxUb3AgZ2V0IGFwcGxpZWQuXG4gICAgICAvLyBBc3NpZ25pbmcgdG8gc2Nyb2xsTGVmdC9zY3JvbGxUb3AgdGVsbHMgdGhlIGJyb3dzZXIgdG8gaW50ZXJydXB0IGFueSBydW5uaW5nIHNjcm9sbCBhbmltYXRpb25zLFxuICAgICAgLy8gQW5kIHRvIGRpc2NhcmQgYW55IHBlbmRpbmcgYXN5bmMgY2hhbmdlcyB0byB0aGUgc2Nyb2xsIHBvc2l0aW9uIHRoYXQgbWF5IGhhdmUgaGFwcGVuZWQgaW4gdGhlIG1lYW50aW1lIChlLmcuIG9uIGEgc2VwYXJhdGUgc2Nyb2xsaW5nIHRocmVhZCkuXG4gICAgICAvLyBTbyB3ZSBvbmx5IHNldCB0aGVzZSB3aGVuIHdlIHJlcXVpcmUgYW4gYWRqdXN0bWVudCBvZiB0aGUgc2Nyb2xsIHBvc2l0aW9uLlxuICAgICAgLy8gU2VlIGlzc3VlICMyIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuXG4gICAgICBpZiAoc2Nyb2xsUG9zaXRpb25DaGFuZ2VSZWFzb24gPT09IFNDUk9MTF9QT1NJVElPTl9DSEFOR0VfUkVBU09OUy5SRVFVRVNURUQpIHtcbiAgICAgICAgaWYgKHNjcm9sbExlZnQgPj0gMCAmJiBzY3JvbGxMZWZ0ICE9PSBwcmV2U3RhdGUuc2Nyb2xsTGVmdCAmJiBzY3JvbGxMZWZ0ICE9PSB0aGlzLnJlZnMuc2Nyb2xsaW5nQ29udGFpbmVyLnNjcm9sbExlZnQpIHtcbiAgICAgICAgICB0aGlzLnJlZnMuc2Nyb2xsaW5nQ29udGFpbmVyLnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY3JvbGxUb3AgPj0gMCAmJiBzY3JvbGxUb3AgIT09IHByZXZTdGF0ZS5zY3JvbGxUb3AgJiYgc2Nyb2xsVG9wICE9PSB0aGlzLnJlZnMuc2Nyb2xsaW5nQ29udGFpbmVyLnNjcm9sbFRvcCkge1xuICAgICAgICAgIHRoaXMucmVmcy5zY3JvbGxpbmdDb250YWluZXIuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSBzY3JvbGwgb2Zmc2V0cyBpZiB0aGUgY3VycmVudCA6c2Nyb2xsVG9DZWxsIHZhbHVlcyByZXF1aXJlcyBpdFxuICAgICAgaWYgKGhlaWdodCAhPT0gcHJldlByb3BzLmhlaWdodCB8fCBzY3JvbGxUb0NlbGwgIT09IHByZXZQcm9wcy5zY3JvbGxUb0NlbGwgfHwgd2lkdGggIT09IHByZXZQcm9wcy53aWR0aCkge1xuICAgICAgICB0aGlzLl91cGRhdGVTY3JvbGxQb3NpdGlvbkZvclNjcm9sbFRvQ2VsbCgpO1xuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgb25Sb3dzUmVuZGVyZWQgY2FsbGJhY2sgaWYgc3RhcnQvc3RvcCBpbmRpY2VzIGhhdmUgY2hhbmdlZFxuICAgICAgdGhpcy5faW52b2tlT25TZWN0aW9uUmVuZGVyZWRIZWxwZXIoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnRXaWxsTW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICB2YXIgY2VsbExheW91dE1hbmFnZXIgPSB0aGlzLnByb3BzLmNlbGxMYXlvdXRNYW5hZ2VyO1xuXG5cbiAgICAgIGNlbGxMYXlvdXRNYW5hZ2VyLmNhbGN1bGF0ZVNpemVBbmRQb3NpdGlvbkRhdGEoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnRXaWxsVW5tb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgaWYgKHRoaXMuX2Rpc2FibGVQb2ludGVyRXZlbnRzVGltZW91dElkKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9kaXNhYmxlUG9pbnRlckV2ZW50c1RpbWVvdXRJZCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9zZXROZXh0U3RhdGVBbmltYXRpb25GcmFtZUlkKSB7XG4gICAgICAgIF9yYWYyLmRlZmF1bHQuY2FuY2VsKHRoaXMuX3NldE5leHRTdGF0ZUFuaW1hdGlvbkZyYW1lSWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogVGhpcyBtZXRob2QgdXBkYXRlcyBzY3JvbGxMZWZ0L3Njcm9sbFRvcCBpbiBzdGF0ZSBmb3IgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICAgICAqIDEpIEVtcHR5IGNvbnRlbnQgKDAgcm93cyBvciBjb2x1bW5zKVxuICAgICAqIDIpIE5ldyBzY3JvbGwgcHJvcHMgb3ZlcnJpZGluZyB0aGUgY3VycmVudCBzdGF0ZVxuICAgICAqIDMpIENlbGxzLWNvdW50IG9yIGNlbGxzLXNpemUgaGFzIGNoYW5nZWQsIG1ha2luZyBwcmV2aW91cyBzY3JvbGwgb2Zmc2V0cyBpbnZhbGlkXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudFdpbGxVcGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICBpZiAobmV4dFByb3BzLmNlbGxDb3VudCA9PT0gMCAmJiAobmV4dFN0YXRlLnNjcm9sbExlZnQgIT09IDAgfHwgbmV4dFN0YXRlLnNjcm9sbFRvcCAhPT0gMCkpIHtcbiAgICAgICAgdGhpcy5fc2V0U2Nyb2xsUG9zaXRpb24oe1xuICAgICAgICAgIHNjcm9sbExlZnQ6IDAsXG4gICAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChuZXh0UHJvcHMuc2Nyb2xsTGVmdCAhPT0gdGhpcy5wcm9wcy5zY3JvbGxMZWZ0IHx8IG5leHRQcm9wcy5zY3JvbGxUb3AgIT09IHRoaXMucHJvcHMuc2Nyb2xsVG9wKSB7XG4gICAgICAgIHRoaXMuX3NldFNjcm9sbFBvc2l0aW9uKHtcbiAgICAgICAgICBzY3JvbGxMZWZ0OiBuZXh0UHJvcHMuc2Nyb2xsTGVmdCxcbiAgICAgICAgICBzY3JvbGxUb3A6IG5leHRQcm9wcy5zY3JvbGxUb3BcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXh0UHJvcHMuY2VsbENvdW50ICE9PSB0aGlzLnByb3BzLmNlbGxDb3VudCB8fCBuZXh0UHJvcHMuY2VsbExheW91dE1hbmFnZXIgIT09IHRoaXMucHJvcHMuY2VsbExheW91dE1hbmFnZXIgfHwgbmV4dFN0YXRlLmNhbGN1bGF0ZVNpemVBbmRQb3NpdGlvbkRhdGFPbk5leHRVcGRhdGUpIHtcbiAgICAgICAgbmV4dFByb3BzLmNlbGxMYXlvdXRNYW5hZ2VyLmNhbGN1bGF0ZVNpemVBbmRQb3NpdGlvbkRhdGEoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5leHRTdGF0ZS5jYWxjdWxhdGVTaXplQW5kUG9zaXRpb25EYXRhT25OZXh0VXBkYXRlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGNhbGN1bGF0ZVNpemVBbmRQb3NpdGlvbkRhdGFPbk5leHRVcGRhdGU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfcHJvcHMzID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjZWxsTGF5b3V0TWFuYWdlciA9IF9wcm9wczMuY2VsbExheW91dE1hbmFnZXI7XG4gICAgICB2YXIgY2xhc3NOYW1lID0gX3Byb3BzMy5jbGFzc05hbWU7XG4gICAgICB2YXIgaGVpZ2h0ID0gX3Byb3BzMy5oZWlnaHQ7XG4gICAgICB2YXIgbm9Db250ZW50UmVuZGVyZXIgPSBfcHJvcHMzLm5vQ29udGVudFJlbmRlcmVyO1xuICAgICAgdmFyIHdpZHRoID0gX3Byb3BzMy53aWR0aDtcbiAgICAgIHZhciBfc3RhdGUyID0gdGhpcy5zdGF0ZTtcbiAgICAgIHZhciBpc1Njcm9sbGluZyA9IF9zdGF0ZTIuaXNTY3JvbGxpbmc7XG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IF9zdGF0ZTIuc2Nyb2xsTGVmdDtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfc3RhdGUyLnNjcm9sbFRvcDtcblxuXG4gICAgICB2YXIgY2hpbGRyZW5Ub0Rpc3BsYXkgPSBoZWlnaHQgPiAwICYmIHdpZHRoID4gMCA/IGNlbGxMYXlvdXRNYW5hZ2VyLnJlbmRlckNlbGxzKHtcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgIGlzU2Nyb2xsaW5nOiBpc1Njcm9sbGluZyxcbiAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICB4OiBzY3JvbGxMZWZ0LFxuICAgICAgICB5OiBzY3JvbGxUb3BcbiAgICAgIH0pIDogW107XG5cbiAgICAgIHZhciBfY2VsbExheW91dE1hbmFnZXIkZ2UyID0gY2VsbExheW91dE1hbmFnZXIuZ2V0VG90YWxTaXplKCk7XG5cbiAgICAgIHZhciB0b3RhbEhlaWdodCA9IF9jZWxsTGF5b3V0TWFuYWdlciRnZTIuaGVpZ2h0O1xuICAgICAgdmFyIHRvdGFsV2lkdGggPSBfY2VsbExheW91dE1hbmFnZXIkZ2UyLndpZHRoO1xuXG5cbiAgICAgIHZhciBncmlkU3R5bGUgPSB7XG4gICAgICAgIGhlaWdodDogaGVpZ2h0LFxuICAgICAgICB3aWR0aDogd2lkdGhcbiAgICAgIH07XG5cbiAgICAgIC8vIEZvcmNlIGJyb3dzZXIgdG8gaGlkZSBzY3JvbGxiYXJzIHdoZW4gd2Uga25vdyB0aGV5IGFyZW4ndCBuZWNlc3NhcnkuXG4gICAgICAvLyBPdGhlcndpc2Ugb25jZSBzY3JvbGxiYXJzIGFwcGVhciB0aGV5IG1heSBub3QgZGlzYXBwZWFyIGFnYWluLlxuICAgICAgLy8gRm9yIG1vcmUgaW5mbyBzZWUgaXNzdWUgIzExNlxuICAgICAgaWYgKHRvdGFsSGVpZ2h0IDw9IGhlaWdodCkge1xuICAgICAgICBncmlkU3R5bGUub3ZlcmZsb3dZID0gJ2hpZGRlbic7XG4gICAgICB9XG4gICAgICBpZiAodG90YWxXaWR0aCA8PSB3aWR0aCkge1xuICAgICAgICBncmlkU3R5bGUub3ZlcmZsb3dYID0gJ2hpZGRlbic7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHtcbiAgICAgICAgICByZWY6ICdzY3JvbGxpbmdDb250YWluZXInLFxuICAgICAgICAgICdhcmlhLWxhYmVsJzogdGhpcy5wcm9wc1snYXJpYS1sYWJlbCddLFxuICAgICAgICAgIGNsYXNzTmFtZTogKDAsIF9jbGFzc25hbWVzMi5kZWZhdWx0KSgnQ29sbGVjdGlvbicsIGNsYXNzTmFtZSksXG4gICAgICAgICAgb25TY3JvbGw6IHRoaXMuX29uU2Nyb2xsLFxuICAgICAgICAgIHJvbGU6ICdncmlkJyxcbiAgICAgICAgICBzdHlsZTogZ3JpZFN0eWxlLFxuICAgICAgICAgIHRhYkluZGV4OiAwXG4gICAgICAgIH0sXG4gICAgICAgIGNoaWxkcmVuVG9EaXNwbGF5Lmxlbmd0aCA+IDAgJiYgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgJ2RpdicsXG4gICAgICAgICAge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiAnQ29sbGVjdGlvbl9faW5uZXJTY3JvbGxDb250YWluZXInLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgaGVpZ2h0OiB0b3RhbEhlaWdodCxcbiAgICAgICAgICAgICAgbWF4SGVpZ2h0OiB0b3RhbEhlaWdodCxcbiAgICAgICAgICAgICAgbWF4V2lkdGg6IHRvdGFsV2lkdGgsXG4gICAgICAgICAgICAgIHBvaW50ZXJFdmVudHM6IGlzU2Nyb2xsaW5nID8gJ25vbmUnIDogJ2F1dG8nLFxuICAgICAgICAgICAgICB3aWR0aDogdG90YWxXaWR0aFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY2hpbGRyZW5Ub0Rpc3BsYXlcbiAgICAgICAgKSxcbiAgICAgICAgY2hpbGRyZW5Ub0Rpc3BsYXkubGVuZ3RoID09PSAwICYmIG5vQ29udGVudFJlbmRlcmVyKClcbiAgICAgICk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2hvdWxkQ29tcG9uZW50VXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICByZXR1cm4gKDAsIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMi5kZWZhdWx0KSh0aGlzLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSk7XG4gICAgfVxuXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBIZWxwZXIgbWV0aG9kcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGFuIDppc1Njcm9sbGluZyBmbGFnIGZvciBhIHNtYWxsIHdpbmRvdyBvZiB0aW1lLlxuICAgICAqIFRoaXMgZmxhZyBpcyB1c2VkIHRvIGRpc2FibGUgcG9pbnRlciBldmVudHMgb24gdGhlIHNjcm9sbGFibGUgcG9ydGlvbiBvZiB0aGUgQ29sbGVjdGlvbi5cbiAgICAgKiBUaGlzIHByZXZlbnRzIGplcmt5L3N0dXR0ZXJ5IG1vdXNlLXdoZWVsIHNjcm9sbGluZy5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnX2VuYWJsZVBvaW50ZXJFdmVudHNBZnRlckRlbGF5JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2VuYWJsZVBvaW50ZXJFdmVudHNBZnRlckRlbGF5KCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIGlmICh0aGlzLl9kaXNhYmxlUG9pbnRlckV2ZW50c1RpbWVvdXRJZCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fZGlzYWJsZVBvaW50ZXJFdmVudHNUaW1lb3V0SWQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9kaXNhYmxlUG9pbnRlckV2ZW50c1RpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpczIuX2Rpc2FibGVQb2ludGVyRXZlbnRzVGltZW91dElkID0gbnVsbDtcbiAgICAgICAgX3RoaXMyLnNldFN0YXRlKHtcbiAgICAgICAgICBpc1Njcm9sbGluZzogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9LCBJU19TQ1JPTExJTkdfVElNRU9VVCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2ludm9rZU9uU2VjdGlvblJlbmRlcmVkSGVscGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2ludm9rZU9uU2VjdGlvblJlbmRlcmVkSGVscGVyKCkge1xuICAgICAgdmFyIF9wcm9wczQgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGNlbGxMYXlvdXRNYW5hZ2VyID0gX3Byb3BzNC5jZWxsTGF5b3V0TWFuYWdlcjtcbiAgICAgIHZhciBvblNlY3Rpb25SZW5kZXJlZCA9IF9wcm9wczQub25TZWN0aW9uUmVuZGVyZWQ7XG5cblxuICAgICAgdGhpcy5fb25TZWN0aW9uUmVuZGVyZWRNZW1vaXplcih7XG4gICAgICAgIGNhbGxiYWNrOiBvblNlY3Rpb25SZW5kZXJlZCxcbiAgICAgICAgaW5kaWNlczogY2VsbExheW91dE1hbmFnZXIuZ2V0TGFzdFJlbmRlcmVkSW5kaWNlcygpXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfaW52b2tlT25TY3JvbGxNZW1vaXplcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9pbnZva2VPblNjcm9sbE1lbW9pemVyKF9yZWYpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IF9yZWYuc2Nyb2xsTGVmdDtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfcmVmLnNjcm9sbFRvcDtcbiAgICAgIHZhciB0b3RhbEhlaWdodCA9IF9yZWYudG90YWxIZWlnaHQ7XG4gICAgICB2YXIgdG90YWxXaWR0aCA9IF9yZWYudG90YWxXaWR0aDtcblxuICAgICAgdGhpcy5fb25TY3JvbGxNZW1vaXplcih7XG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbiBjYWxsYmFjayhfcmVmMikge1xuICAgICAgICAgIHZhciBzY3JvbGxMZWZ0ID0gX3JlZjIuc2Nyb2xsTGVmdDtcbiAgICAgICAgICB2YXIgc2Nyb2xsVG9wID0gX3JlZjIuc2Nyb2xsVG9wO1xuICAgICAgICAgIHZhciBfcHJvcHM1ID0gX3RoaXMzLnByb3BzO1xuICAgICAgICAgIHZhciBoZWlnaHQgPSBfcHJvcHM1LmhlaWdodDtcbiAgICAgICAgICB2YXIgb25TY3JvbGwgPSBfcHJvcHM1Lm9uU2Nyb2xsO1xuICAgICAgICAgIHZhciB3aWR0aCA9IF9wcm9wczUud2lkdGg7XG5cblxuICAgICAgICAgIG9uU2Nyb2xsKHtcbiAgICAgICAgICAgIGNsaWVudEhlaWdodDogaGVpZ2h0LFxuICAgICAgICAgICAgY2xpZW50V2lkdGg6IHdpZHRoLFxuICAgICAgICAgICAgc2Nyb2xsSGVpZ2h0OiB0b3RhbEhlaWdodCxcbiAgICAgICAgICAgIHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsXG4gICAgICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFRvcCxcbiAgICAgICAgICAgIHNjcm9sbFdpZHRoOiB0b3RhbFdpZHRoXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGluZGljZXM6IHtcbiAgICAgICAgICBzY3JvbGxMZWZ0OiBzY3JvbGxMZWZ0LFxuICAgICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIHN0YXRlIGR1cmluZyB0aGUgbmV4dCBhbmltYXRpb24gZnJhbWUuXG4gICAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGF2b2lkIG11bHRpcGxlIHJlbmRlcnMgaW4gYSBzbWFsbCBzcGFuIG9mIHRpbWUuXG4gICAgICogVGhpcyBoZWxwcyBwZXJmb3JtYW5jZSBmb3IgYnVyc3R5IGV2ZW50cyAobGlrZSBvblNjcm9sbCkuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ19zZXROZXh0U3RhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfc2V0TmV4dFN0YXRlKHN0YXRlKSB7XG4gICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgaWYgKHRoaXMuX3NldE5leHRTdGF0ZUFuaW1hdGlvbkZyYW1lSWQpIHtcbiAgICAgICAgX3JhZjIuZGVmYXVsdC5jYW5jZWwodGhpcy5fc2V0TmV4dFN0YXRlQW5pbWF0aW9uRnJhbWVJZCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3NldE5leHRTdGF0ZUFuaW1hdGlvbkZyYW1lSWQgPSAoMCwgX3JhZjIuZGVmYXVsdCkoZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpczQuX3NldE5leHRTdGF0ZUFuaW1hdGlvbkZyYW1lSWQgPSBudWxsO1xuICAgICAgICBfdGhpczQuc2V0U3RhdGUoc3RhdGUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX3NldFNjcm9sbFBvc2l0aW9uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3NldFNjcm9sbFBvc2l0aW9uKF9yZWYzKSB7XG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IF9yZWYzLnNjcm9sbExlZnQ7XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gX3JlZjMuc2Nyb2xsVG9wO1xuXG4gICAgICB2YXIgbmV3U3RhdGUgPSB7XG4gICAgICAgIHNjcm9sbFBvc2l0aW9uQ2hhbmdlUmVhc29uOiBTQ1JPTExfUE9TSVRJT05fQ0hBTkdFX1JFQVNPTlMuUkVRVUVTVEVEXG4gICAgICB9O1xuXG4gICAgICBpZiAoc2Nyb2xsTGVmdCA+PSAwKSB7XG4gICAgICAgIG5ld1N0YXRlLnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0O1xuICAgICAgfVxuXG4gICAgICBpZiAoc2Nyb2xsVG9wID49IDApIHtcbiAgICAgICAgbmV3U3RhdGUuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2Nyb2xsTGVmdCA+PSAwICYmIHNjcm9sbExlZnQgIT09IHRoaXMuc3RhdGUuc2Nyb2xsTGVmdCB8fCBzY3JvbGxUb3AgPj0gMCAmJiBzY3JvbGxUb3AgIT09IHRoaXMuc3RhdGUuc2Nyb2xsVG9wKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ191cGRhdGVTY3JvbGxQb3NpdGlvbkZvclNjcm9sbFRvQ2VsbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF91cGRhdGVTY3JvbGxQb3NpdGlvbkZvclNjcm9sbFRvQ2VsbCgpIHtcbiAgICAgIHZhciBfcHJvcHM2ID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBjZWxsTGF5b3V0TWFuYWdlciA9IF9wcm9wczYuY2VsbExheW91dE1hbmFnZXI7XG4gICAgICB2YXIgaGVpZ2h0ID0gX3Byb3BzNi5oZWlnaHQ7XG4gICAgICB2YXIgc2Nyb2xsVG9DZWxsID0gX3Byb3BzNi5zY3JvbGxUb0NlbGw7XG4gICAgICB2YXIgd2lkdGggPSBfcHJvcHM2LndpZHRoO1xuICAgICAgdmFyIF9zdGF0ZTMgPSB0aGlzLnN0YXRlO1xuICAgICAgdmFyIHNjcm9sbExlZnQgPSBfc3RhdGUzLnNjcm9sbExlZnQ7XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gX3N0YXRlMy5zY3JvbGxUb3A7XG5cblxuICAgICAgaWYgKHNjcm9sbFRvQ2VsbCA+PSAwKSB7XG4gICAgICAgIHZhciBzY3JvbGxQb3NpdGlvbiA9IGNlbGxMYXlvdXRNYW5hZ2VyLmdldFNjcm9sbFBvc2l0aW9uRm9yQ2VsbCh7XG4gICAgICAgICAgY2VsbEluZGV4OiBzY3JvbGxUb0NlbGwsXG4gICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgICAgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCxcbiAgICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFRvcCxcbiAgICAgICAgICB3aWR0aDogd2lkdGhcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHNjcm9sbFBvc2l0aW9uLnNjcm9sbExlZnQgIT09IHNjcm9sbExlZnQgfHwgc2Nyb2xsUG9zaXRpb24uc2Nyb2xsVG9wICE9PSBzY3JvbGxUb3ApIHtcbiAgICAgICAgICB0aGlzLl9zZXRTY3JvbGxQb3NpdGlvbihzY3JvbGxQb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25TY3JvbGwnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25TY3JvbGwoZXZlbnQpIHtcbiAgICAgIC8vIEluIGNlcnRhaW4gZWRnZS1jYXNlcyBSZWFjdCBkaXNwYXRjaGVzIGFuIG9uU2Nyb2xsIGV2ZW50IHdpdGggYW4gaW52YWxpZCB0YXJnZXQuc2Nyb2xsTGVmdCAvIHRhcmdldC5zY3JvbGxUb3AuXG4gICAgICAvLyBUaGlzIGludmFsaWQgZXZlbnQgY2FuIGJlIGRldGVjdGVkIGJ5IGNvbXBhcmluZyBldmVudC50YXJnZXQgdG8gdGhpcyBjb21wb25lbnQncyBzY3JvbGxhYmxlIERPTSBlbGVtZW50LlxuICAgICAgLy8gU2VlIGlzc3VlICM0MDQgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAgICBpZiAoZXZlbnQudGFyZ2V0ICE9PSB0aGlzLnJlZnMuc2Nyb2xsaW5nQ29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUHJldmVudCBwb2ludGVyIGV2ZW50cyBmcm9tIGludGVycnVwdGluZyBhIHNtb290aCBzY3JvbGxcbiAgICAgIHRoaXMuX2VuYWJsZVBvaW50ZXJFdmVudHNBZnRlckRlbGF5KCk7XG5cbiAgICAgIC8vIFdoZW4gdGhpcyBjb21wb25lbnQgaXMgc2hydW5rIGRyYXN0aWNhbGx5LCBSZWFjdCBkaXNwYXRjaGVzIGEgc2VyaWVzIG9mIGJhY2stdG8tYmFjayBzY3JvbGwgZXZlbnRzLFxuICAgICAgLy8gR3JhZHVhbGx5IGNvbnZlcmdpbmcgb24gYSBzY3JvbGxUb3AgdGhhdCBpcyB3aXRoaW4gdGhlIGJvdW5kcyBvZiB0aGUgbmV3LCBzbWFsbGVyIGhlaWdodC5cbiAgICAgIC8vIFRoaXMgY2F1c2VzIGEgc2VyaWVzIG9mIHJhcGlkIHJlbmRlcnMgdGhhdCBpcyBzbG93IGZvciBsb25nIGxpc3RzLlxuICAgICAgLy8gV2UgY2FuIGF2b2lkIHRoYXQgYnkgZG9pbmcgc29tZSBzaW1wbGUgYm91bmRzIGNoZWNraW5nIHRvIGVuc3VyZSB0aGF0IHNjcm9sbFRvcCBuZXZlciBleGNlZWRzIHRoZSB0b3RhbCBoZWlnaHQuXG4gICAgICB2YXIgX3Byb3BzNyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY2VsbExheW91dE1hbmFnZXIgPSBfcHJvcHM3LmNlbGxMYXlvdXRNYW5hZ2VyO1xuICAgICAgdmFyIGhlaWdodCA9IF9wcm9wczcuaGVpZ2h0O1xuICAgICAgdmFyIHdpZHRoID0gX3Byb3BzNy53aWR0aDtcblxuICAgICAgdmFyIHNjcm9sbGJhclNpemUgPSB0aGlzLl9zY3JvbGxiYXJTaXplO1xuXG4gICAgICB2YXIgX2NlbGxMYXlvdXRNYW5hZ2VyJGdlMyA9IGNlbGxMYXlvdXRNYW5hZ2VyLmdldFRvdGFsU2l6ZSgpO1xuXG4gICAgICB2YXIgdG90YWxIZWlnaHQgPSBfY2VsbExheW91dE1hbmFnZXIkZ2UzLmhlaWdodDtcbiAgICAgIHZhciB0b3RhbFdpZHRoID0gX2NlbGxMYXlvdXRNYW5hZ2VyJGdlMy53aWR0aDtcblxuICAgICAgdmFyIHNjcm9sbExlZnQgPSBNYXRoLm1pbih0b3RhbFdpZHRoIC0gd2lkdGggKyBzY3JvbGxiYXJTaXplLCBldmVudC50YXJnZXQuc2Nyb2xsTGVmdCk7XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gTWF0aC5taW4odG90YWxIZWlnaHQgLSBoZWlnaHQgKyBzY3JvbGxiYXJTaXplLCBldmVudC50YXJnZXQuc2Nyb2xsVG9wKTtcblxuICAgICAgLy8gQ2VydGFpbiBkZXZpY2VzIChsaWtlIEFwcGxlIHRvdWNocGFkKSByYXBpZC1maXJlIGR1cGxpY2F0ZSBldmVudHMuXG4gICAgICAvLyBEb24ndCBmb3JjZSBhIHJlLXJlbmRlciBpZiB0aGlzIGlzIHRoZSBjYXNlLlxuICAgICAgLy8gVGhlIG1vdXNlIG1heSBtb3ZlIGZhc3RlciB0aGVuIHRoZSBhbmltYXRpb24gZnJhbWUgZG9lcy5cbiAgICAgIC8vIFVzZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgdG8gYXZvaWQgb3Zlci11cGRhdGluZy5cbiAgICAgIGlmICh0aGlzLnN0YXRlLnNjcm9sbExlZnQgIT09IHNjcm9sbExlZnQgfHwgdGhpcy5zdGF0ZS5zY3JvbGxUb3AgIT09IHNjcm9sbFRvcCkge1xuICAgICAgICAvLyBCcm93c2VycyB3aXRoIGNhbmNlbGFibGUgc2Nyb2xsIGV2ZW50cyAoZWcuIEZpcmVmb3gpIGludGVycnVwdCBzY3JvbGxpbmcgYW5pbWF0aW9ucyBpZiBzY3JvbGxUb3Avc2Nyb2xsTGVmdCBpcyBzZXQuXG4gICAgICAgIC8vIE90aGVyIGJyb3dzZXJzIChlZy4gU2FmYXJpKSBkb24ndCBzY3JvbGwgYXMgd2VsbCB3aXRob3V0IHRoZSBoZWxwIHVuZGVyIGNlcnRhaW4gY29uZGl0aW9ucyAoRE9NIG9yIHN0eWxlIGNoYW5nZXMgZHVyaW5nIHNjcm9sbGluZykuXG4gICAgICAgIC8vIEFsbCB0aGluZ3MgY29uc2lkZXJlZCwgdGhpcyBzZWVtcyB0byBiZSB0aGUgYmVzdCBjdXJyZW50IHdvcmsgYXJvdW5kIHRoYXQgSSdtIGF3YXJlIG9mLlxuICAgICAgICAvLyBGb3IgbW9yZSBpbmZvcm1hdGlvbiBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2J2YXVnaG4vcmVhY3QtdmlydHVhbGl6ZWQvcHVsbC8xMjRcbiAgICAgICAgdmFyIHNjcm9sbFBvc2l0aW9uQ2hhbmdlUmVhc29uID0gZXZlbnQuY2FuY2VsYWJsZSA/IFNDUk9MTF9QT1NJVElPTl9DSEFOR0VfUkVBU09OUy5PQlNFUlZFRCA6IFNDUk9MTF9QT1NJVElPTl9DSEFOR0VfUkVBU09OUy5SRVFVRVNURUQ7XG5cbiAgICAgICAgLy8gU3luY2hyb25vdXNseSBzZXQgOmlzU2Nyb2xsaW5nIHRoZSBmaXJzdCB0aW1lIChzaW5jZSBfc2V0TmV4dFN0YXRlIHdpbGwgcmVzY2hlZHVsZSBpdHMgYW5pbWF0aW9uIGZyYW1lIGVhY2ggdGltZSBpdCdzIGNhbGxlZClcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmlzU2Nyb2xsaW5nKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBpc1Njcm9sbGluZzogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2V0TmV4dFN0YXRlKHtcbiAgICAgICAgICBpc1Njcm9sbGluZzogdHJ1ZSxcbiAgICAgICAgICBzY3JvbGxMZWZ0OiBzY3JvbGxMZWZ0LFxuICAgICAgICAgIHNjcm9sbFBvc2l0aW9uQ2hhbmdlUmVhc29uOiBzY3JvbGxQb3NpdGlvbkNoYW5nZVJlYXNvbixcbiAgICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFRvcFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5faW52b2tlT25TY3JvbGxNZW1vaXplcih7XG4gICAgICAgIHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsXG4gICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wLFxuICAgICAgICB0b3RhbFdpZHRoOiB0b3RhbFdpZHRoLFxuICAgICAgICB0b3RhbEhlaWdodDogdG90YWxIZWlnaHRcbiAgICAgIH0pO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBDb2xsZWN0aW9uVmlldztcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cbkNvbGxlY3Rpb25WaWV3LnByb3BUeXBlcyA9IHtcbiAgJ2FyaWEtbGFiZWwnOiBfcmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKipcbiAgICogTnVtYmVyIG9mIGNlbGxzIGluIGNvbGxlY3Rpb24uXG4gICAqL1xuICBjZWxsQ291bnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgY2VsbCBzaXplcyBhbmQgcG9zaXRpb25zIGFuZCBtYW5hZ2VzIHJlbmRlcmluZyB0aGUgYXBwcm9wcmlhdGUgY2VsbHMgZ2l2ZW4gYSBzcGVjaWZpZWQgd2luZG93LlxuICAgKi9cbiAgY2VsbExheW91dE1hbmFnZXI6IF9yZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIE9wdGlvbmFsIGN1c3RvbSBDU1MgY2xhc3MgbmFtZSB0byBhdHRhY2ggdG8gcm9vdCBDb2xsZWN0aW9uIGVsZW1lbnQuXG4gICAqL1xuICBjbGFzc05hbWU6IF9yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKlxuICAgKiBIZWlnaHQgb2YgQ29sbGVjdGlvbjsgdGhpcyBwcm9wZXJ0eSBkZXRlcm1pbmVzIHRoZSBudW1iZXIgb2YgdmlzaWJsZSAodnMgdmlydHVhbGl6ZWQpIHJvd3MuXG4gICAqL1xuICBoZWlnaHQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIE9wdGlvbmFsIHJlbmRlcmVyIHRvIGJlIHVzZWQgaW4gcGxhY2Ugb2Ygcm93cyB3aGVuIGVpdGhlciA6cm93c0NvdW50IG9yIDpjZWxsQ291bnQgaXMgMC5cbiAgICovXG4gIG5vQ29udGVudFJlbmRlcmVyOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgaW52b2tlZCB3aGVuZXZlciB0aGUgc2Nyb2xsIG9mZnNldCBjaGFuZ2VzIHdpdGhpbiB0aGUgaW5uZXIgc2Nyb2xsYWJsZSByZWdpb24uXG4gICAqIFRoaXMgY2FsbGJhY2sgY2FuIGJlIHVzZWQgdG8gc3luYyBzY3JvbGxpbmcgYmV0d2VlbiBsaXN0cywgdGFibGVzLCBvciBncmlkcy5cbiAgICogKHsgY2xpZW50SGVpZ2h0LCBjbGllbnRXaWR0aCwgc2Nyb2xsSGVpZ2h0LCBzY3JvbGxMZWZ0LCBzY3JvbGxUb3AsIHNjcm9sbFdpZHRoIH0pOiB2b2lkXG4gICAqL1xuICBvblNjcm9sbDogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGludm9rZWQgd2l0aCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgc2VjdGlvbiBvZiB0aGUgQ29sbGVjdGlvbiB0aGF0IHdhcyBqdXN0IHJlbmRlcmVkLlxuICAgKiBUaGlzIGNhbGxiYWNrIGlzIHBhc3NlZCBhbiBhcnJheSBvZiB0aGUgbW9zdCByZWNlbnRseSByZW5kZXJlZCBzZWN0aW9uIGluZGljZXMuXG4gICAqL1xuICBvblNlY3Rpb25SZW5kZXJlZDogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIEhvcml6b250YWwgb2Zmc2V0LlxuICAgKi9cbiAgc2Nyb2xsTGVmdDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqXG4gICAqIENlbGwgaW5kZXggdG8gZW5zdXJlIHZpc2libGUgKGJ5IGZvcmNlZnVsbHkgc2Nyb2xsaW5nIGlmIG5lY2Vzc2FyeSkuXG4gICAqL1xuICBzY3JvbGxUb0NlbGw6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKlxuICAgKiBWZXJ0aWNhbCBvZmZzZXQuXG4gICAqL1xuICBzY3JvbGxUb3A6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKlxuICAgKiBXaWR0aCBvZiBDb2xsZWN0aW9uOyB0aGlzIHByb3BlcnR5IGRldGVybWluZXMgdGhlIG51bWJlciBvZiB2aXNpYmxlICh2cyB2aXJ0dWFsaXplZCkgY29sdW1ucy5cbiAgICovXG4gIHdpZHRoOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG59O1xuQ29sbGVjdGlvblZpZXcuZGVmYXVsdFByb3BzID0ge1xuICAnYXJpYS1sYWJlbCc6ICdncmlkJyxcbiAgbm9Db250ZW50UmVuZGVyZXI6IGZ1bmN0aW9uIG5vQ29udGVudFJlbmRlcmVyKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBvblNjcm9sbDogZnVuY3Rpb24gb25TY3JvbGwoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIG9uU2VjdGlvblJlbmRlcmVkOiBmdW5jdGlvbiBvblNlY3Rpb25SZW5kZXJlZCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IENvbGxlY3Rpb25WaWV3OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyoqXG4gKiBBIHNlY3Rpb24gb2YgdGhlIFdpbmRvdy5cbiAqIFdpbmRvdyBTZWN0aW9ucyBhcmUgdXNlZCB0byBncm91cCBuZWFyYnkgY2VsbHMuXG4gKiBUaGlzIGVuYWJsZXMgdXMgdG8gbW9yZSBxdWlja2x5IGRldGVybWluZSB3aGljaCBjZWxscyB0byBkaXNwbGF5IGluIGEgZ2l2ZW4gcmVnaW9uIG9mIHRoZSBXaW5kb3cuXG4gKiBTZWN0aW9ucyBoYXZlIGEgZml4ZWQgc2l6ZSBhbmQgY29udGFpbiAwIHRvIG1hbnkgY2VsbHMgKHRyYWNrZWQgYnkgdGhlaXIgaW5kaWNlcykuXG4gKi9cblxudmFyIFNlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFNlY3Rpb24oX3JlZikge1xuICAgIHZhciBoZWlnaHQgPSBfcmVmLmhlaWdodDtcbiAgICB2YXIgd2lkdGggPSBfcmVmLndpZHRoO1xuICAgIHZhciB4ID0gX3JlZi54O1xuICAgIHZhciB5ID0gX3JlZi55O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFNlY3Rpb24pO1xuXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcblxuICAgIHRoaXMuX2luZGV4TWFwID0ge307XG4gICAgdGhpcy5faW5kaWNlcyA9IFtdO1xuICB9XG5cbiAgLyoqIEFkZCBhIGNlbGwgdG8gdGhpcyBzZWN0aW9uLiAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKFNlY3Rpb24sIFt7XG4gICAga2V5OiAnYWRkQ2VsbEluZGV4JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkQ2VsbEluZGV4KGluZGV4KSB7XG4gICAgICBpZiAoIXRoaXMuX2luZGV4TWFwW2luZGV4XSkge1xuICAgICAgICB0aGlzLl9pbmRleE1hcFtpbmRleF0gPSB0cnVlO1xuICAgICAgICB0aGlzLl9pbmRpY2VzLnB1c2goaW5kZXgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBHZXQgYWxsIGNlbGwgaW5kaWNlcyB0aGF0IGhhdmUgYmVlbiBhZGRlZCB0byB0aGlzIHNlY3Rpb24uICovXG5cbiAgfSwge1xuICAgIGtleTogJ2dldENlbGxJbmRpY2VzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2VsbEluZGljZXMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5faW5kaWNlcztcbiAgICB9XG5cbiAgICAvKiogSW50ZW5kZWQgZm9yIGRlYnVnZ2VyL3Rlc3QgcHVycG9zZXMgb25seSAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICd0b1N0cmluZycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgICAgcmV0dXJuIHRoaXMueCArICcsJyArIHRoaXMueSArICcgJyArIHRoaXMud2lkdGggKyAneCcgKyB0aGlzLmhlaWdodDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gU2VjdGlvbjtcbn0oKTsgLyoqIEBybG93ICovXG5cblxuZXhwb3J0cy5kZWZhdWx0ID0gU2VjdGlvbjsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7IC8qKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIFdpbmRvdyBTZWN0aW9ucyBhcmUgdXNlZCB0byBncm91cCBuZWFyYnkgY2VsbHMuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogVGhpcyBlbmFibGVzIHVzIHRvIG1vcmUgcXVpY2tseSBkZXRlcm1pbmUgd2hpY2ggY2VsbHMgdG8gZGlzcGxheSBpbiBhIGdpdmVuIHJlZ2lvbiBvZiB0aGUgV2luZG93LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXG5cbnZhciBfU2VjdGlvbiA9IHJlcXVpcmUoJy4vU2VjdGlvbicpO1xuXG52YXIgX1NlY3Rpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU2VjdGlvbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBTRUNUSU9OX1NJWkUgPSAxMDA7XG5cbi8qKlxuICogQ29udGFpbnMgMCB0byBtYW55IFNlY3Rpb25zLlxuICogR3Jvd3MgKGFuZCBhZGRzIFNlY3Rpb25zKSBkeW5hbWljYWxseSBhcyBjZWxscyBhcmUgcmVnaXN0ZXJlZC5cbiAqIEF1dG9tYXRpY2FsbHkgYWRkcyBjZWxscyB0byB0aGUgYXBwcm9wcmlhdGUgU2VjdGlvbihzKS5cbiAqL1xuXG52YXIgU2VjdGlvbk1hbmFnZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFNlY3Rpb25NYW5hZ2VyKCkge1xuICAgIHZhciBzZWN0aW9uU2l6ZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IFNFQ1RJT05fU0laRSA6IGFyZ3VtZW50c1swXTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTZWN0aW9uTWFuYWdlcik7XG5cbiAgICB0aGlzLl9zZWN0aW9uU2l6ZSA9IHNlY3Rpb25TaXplO1xuXG4gICAgdGhpcy5fY2VsbE1ldGFkYXRhID0gW107XG4gICAgdGhpcy5fc2VjdGlvbnMgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCBjZWxsIGluZGljZXMgY29udGFpbmVkIGluIHRoZSBzcGVjaWZpZWQgcmVnaW9uLlxuICAgKiBBIHJlZ2lvbiBtYXkgZW5jb21wYXNzIDEgb3IgbW9yZSBTZWN0aW9ucy5cbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoU2VjdGlvbk1hbmFnZXIsIFt7XG4gICAga2V5OiAnZ2V0Q2VsbEluZGljZXMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDZWxsSW5kaWNlcyhfcmVmKSB7XG4gICAgICB2YXIgaGVpZ2h0ID0gX3JlZi5oZWlnaHQ7XG4gICAgICB2YXIgd2lkdGggPSBfcmVmLndpZHRoO1xuICAgICAgdmFyIHggPSBfcmVmLng7XG4gICAgICB2YXIgeSA9IF9yZWYueTtcblxuICAgICAgdmFyIGluZGljZXMgPSB7fTtcblxuICAgICAgdGhpcy5nZXRTZWN0aW9ucyh7IGhlaWdodDogaGVpZ2h0LCB3aWR0aDogd2lkdGgsIHg6IHgsIHk6IHkgfSkuZm9yRWFjaChmdW5jdGlvbiAoc2VjdGlvbikge1xuICAgICAgICByZXR1cm4gc2VjdGlvbi5nZXRDZWxsSW5kaWNlcygpLmZvckVhY2goZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIGluZGljZXNbaW5kZXhdID0gaW5kZXg7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIE9iamVjdCBrZXlzIGFyZSBzdHJpbmdzOyB0aGlzIGZ1bmN0aW9uIHJldHVybnMgbnVtYmVyc1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGluZGljZXMpLm1hcChmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGluZGljZXNbaW5kZXhdO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIEdldCBzaXplIGFuZCBwb3NpdGlvbiBpbmZvcm1hdGlvbiBmb3IgdGhlIGNlbGwgc3BlY2lmaWVkLiAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdnZXRDZWxsTWV0YWRhdGEnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDZWxsTWV0YWRhdGEoaW5kZXgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jZWxsTWV0YWRhdGFbaW5kZXhdO1xuICAgIH1cblxuICAgIC8qKiBHZXQgYWxsIFNlY3Rpb25zIG92ZXJsYXBwaW5nIHRoZSBzcGVjaWZpZWQgcmVnaW9uLiAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdnZXRTZWN0aW9ucycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFNlY3Rpb25zKF9yZWYyKSB7XG4gICAgICB2YXIgaGVpZ2h0ID0gX3JlZjIuaGVpZ2h0O1xuICAgICAgdmFyIHdpZHRoID0gX3JlZjIud2lkdGg7XG4gICAgICB2YXIgeCA9IF9yZWYyLng7XG4gICAgICB2YXIgeSA9IF9yZWYyLnk7XG5cbiAgICAgIHZhciBzZWN0aW9uWFN0YXJ0ID0gTWF0aC5mbG9vcih4IC8gdGhpcy5fc2VjdGlvblNpemUpO1xuICAgICAgdmFyIHNlY3Rpb25YU3RvcCA9IE1hdGguZmxvb3IoKHggKyB3aWR0aCAtIDEpIC8gdGhpcy5fc2VjdGlvblNpemUpO1xuICAgICAgdmFyIHNlY3Rpb25ZU3RhcnQgPSBNYXRoLmZsb29yKHkgLyB0aGlzLl9zZWN0aW9uU2l6ZSk7XG4gICAgICB2YXIgc2VjdGlvbllTdG9wID0gTWF0aC5mbG9vcigoeSArIGhlaWdodCAtIDEpIC8gdGhpcy5fc2VjdGlvblNpemUpO1xuXG4gICAgICB2YXIgc2VjdGlvbnMgPSBbXTtcblxuICAgICAgZm9yICh2YXIgc2VjdGlvblggPSBzZWN0aW9uWFN0YXJ0OyBzZWN0aW9uWCA8PSBzZWN0aW9uWFN0b3A7IHNlY3Rpb25YKyspIHtcbiAgICAgICAgZm9yICh2YXIgc2VjdGlvblkgPSBzZWN0aW9uWVN0YXJ0OyBzZWN0aW9uWSA8PSBzZWN0aW9uWVN0b3A7IHNlY3Rpb25ZKyspIHtcbiAgICAgICAgICB2YXIga2V5ID0gc2VjdGlvblggKyAnLicgKyBzZWN0aW9uWTtcblxuICAgICAgICAgIGlmICghdGhpcy5fc2VjdGlvbnNba2V5XSkge1xuICAgICAgICAgICAgdGhpcy5fc2VjdGlvbnNba2V5XSA9IG5ldyBfU2VjdGlvbjIuZGVmYXVsdCh7XG4gICAgICAgICAgICAgIGhlaWdodDogdGhpcy5fc2VjdGlvblNpemUsXG4gICAgICAgICAgICAgIHdpZHRoOiB0aGlzLl9zZWN0aW9uU2l6ZSxcbiAgICAgICAgICAgICAgeDogc2VjdGlvblggKiB0aGlzLl9zZWN0aW9uU2l6ZSxcbiAgICAgICAgICAgICAgeTogc2VjdGlvblkgKiB0aGlzLl9zZWN0aW9uU2l6ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2VjdGlvbnMucHVzaCh0aGlzLl9zZWN0aW9uc1trZXldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VjdGlvbnM7XG4gICAgfVxuXG4gICAgLyoqIFRvdGFsIG51bWJlciBvZiBTZWN0aW9ucyBiYXNlZCBvbiB0aGUgY3VycmVudGx5IHJlZ2lzdGVyZWQgY2VsbHMuICovXG5cbiAgfSwge1xuICAgIGtleTogJ2dldFRvdGFsU2VjdGlvbkNvdW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VG90YWxTZWN0aW9uQ291bnQoKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5fc2VjdGlvbnMpLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvKiogSW50ZW5kZWQgZm9yIGRlYnVnZ2VyL3Rlc3QgcHVycG9zZXMgb25seSAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICd0b1N0cmluZycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX3NlY3Rpb25zKS5tYXAoZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHJldHVybiBfdGhpcy5fc2VjdGlvbnNbaW5kZXhdLnRvU3RyaW5nKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogQWRkcyBhIGNlbGwgdG8gdGhlIGFwcHJvcHJpYXRlIFNlY3Rpb25zIGFuZCByZWdpc3RlcnMgaXQgbWV0YWRhdGEgZm9yIGxhdGVyIHJldHJpZXZhYmxlLiAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdyZWdpc3RlckNlbGwnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZWdpc3RlckNlbGwoX3JlZjMpIHtcbiAgICAgIHZhciBjZWxsTWV0YWRhdHVtID0gX3JlZjMuY2VsbE1ldGFkYXR1bTtcbiAgICAgIHZhciBpbmRleCA9IF9yZWYzLmluZGV4O1xuXG4gICAgICB0aGlzLl9jZWxsTWV0YWRhdGFbaW5kZXhdID0gY2VsbE1ldGFkYXR1bTtcblxuICAgICAgdGhpcy5nZXRTZWN0aW9ucyhjZWxsTWV0YWRhdHVtKS5mb3JFYWNoKGZ1bmN0aW9uIChzZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBzZWN0aW9uLmFkZENlbGxJbmRleChpbmRleCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gU2VjdGlvbk1hbmFnZXI7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFNlY3Rpb25NYW5hZ2VyOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuQ29sbGVjdGlvbiA9IGV4cG9ydHMuZGVmYXVsdCA9IHVuZGVmaW5lZDtcblxudmFyIF9Db2xsZWN0aW9uMiA9IHJlcXVpcmUoJy4vQ29sbGVjdGlvbicpO1xuXG52YXIgX0NvbGxlY3Rpb24zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ29sbGVjdGlvbjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfQ29sbGVjdGlvbjMuZGVmYXVsdDtcbmV4cG9ydHMuQ29sbGVjdGlvbiA9IF9Db2xsZWN0aW9uMy5kZWZhdWx0OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNhbGN1bGF0ZVNpemVBbmRQb3NpdGlvbkRhdGE7XG5cbnZhciBfU2VjdGlvbk1hbmFnZXIgPSByZXF1aXJlKCcuLi9TZWN0aW9uTWFuYWdlcicpO1xuXG52YXIgX1NlY3Rpb25NYW5hZ2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NlY3Rpb25NYW5hZ2VyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gY2FsY3VsYXRlU2l6ZUFuZFBvc2l0aW9uRGF0YShfcmVmKSB7XG4gIHZhciBjZWxsQ291bnQgPSBfcmVmLmNlbGxDb3VudDtcbiAgdmFyIGNlbGxTaXplQW5kUG9zaXRpb25HZXR0ZXIgPSBfcmVmLmNlbGxTaXplQW5kUG9zaXRpb25HZXR0ZXI7XG4gIHZhciBzZWN0aW9uU2l6ZSA9IF9yZWYuc2VjdGlvblNpemU7XG5cbiAgdmFyIGNlbGxNZXRhZGF0YSA9IFtdO1xuICB2YXIgc2VjdGlvbk1hbmFnZXIgPSBuZXcgX1NlY3Rpb25NYW5hZ2VyMi5kZWZhdWx0KHNlY3Rpb25TaXplKTtcbiAgdmFyIGhlaWdodCA9IDA7XG4gIHZhciB3aWR0aCA9IDA7XG5cbiAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGNlbGxDb3VudDsgaW5kZXgrKykge1xuICAgIHZhciBjZWxsTWV0YWRhdHVtID0gY2VsbFNpemVBbmRQb3NpdGlvbkdldHRlcihpbmRleCk7XG5cbiAgICBpZiAoY2VsbE1ldGFkYXR1bS5oZWlnaHQgPT0gbnVsbCB8fCBpc05hTihjZWxsTWV0YWRhdHVtLmhlaWdodCkgfHwgY2VsbE1ldGFkYXR1bS53aWR0aCA9PSBudWxsIHx8IGlzTmFOKGNlbGxNZXRhZGF0dW0ud2lkdGgpIHx8IGNlbGxNZXRhZGF0dW0ueCA9PSBudWxsIHx8IGlzTmFOKGNlbGxNZXRhZGF0dW0ueCkgfHwgY2VsbE1ldGFkYXR1bS55ID09IG51bGwgfHwgaXNOYU4oY2VsbE1ldGFkYXR1bS55KSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0ludmFsaWQgbWV0YWRhdGEgcmV0dXJuZWQgZm9yIGNlbGwgJyArIGluZGV4ICsgJzpcXG4gICAgICAgIHg6JyArIGNlbGxNZXRhZGF0dW0ueCArICcsIHk6JyArIGNlbGxNZXRhZGF0dW0ueSArICcsIHdpZHRoOicgKyBjZWxsTWV0YWRhdHVtLndpZHRoICsgJywgaGVpZ2h0OicgKyBjZWxsTWV0YWRhdHVtLmhlaWdodCk7XG4gICAgfVxuXG4gICAgaGVpZ2h0ID0gTWF0aC5tYXgoaGVpZ2h0LCBjZWxsTWV0YWRhdHVtLnkgKyBjZWxsTWV0YWRhdHVtLmhlaWdodCk7XG4gICAgd2lkdGggPSBNYXRoLm1heCh3aWR0aCwgY2VsbE1ldGFkYXR1bS54ICsgY2VsbE1ldGFkYXR1bS53aWR0aCk7XG5cbiAgICBjZWxsTWV0YWRhdGFbaW5kZXhdID0gY2VsbE1ldGFkYXR1bTtcbiAgICBzZWN0aW9uTWFuYWdlci5yZWdpc3RlckNlbGwoe1xuICAgICAgY2VsbE1ldGFkYXR1bTogY2VsbE1ldGFkYXR1bSxcbiAgICAgIGluZGV4OiBpbmRleFxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjZWxsTWV0YWRhdGE6IGNlbGxNZXRhZGF0YSxcbiAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICBzZWN0aW9uTWFuYWdlcjogc2VjdGlvbk1hbmFnZXIsXG4gICAgd2lkdGg6IHdpZHRoXG4gIH07XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlID0gcmVxdWlyZSgncmVhY3QtYWRkb25zLXNoYWxsb3ctY29tcGFyZScpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSk7XG5cbnZhciBfR3JpZCA9IHJlcXVpcmUoJy4uL0dyaWQnKTtcblxudmFyIF9HcmlkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0dyaWQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbi8qKlxuICogSGlnaC1vcmRlciBjb21wb25lbnQgdGhhdCBhdXRvLWNhbGN1bGF0ZXMgY29sdW1uLXdpZHRocyBmb3IgYEdyaWRgIGNlbGxzLlxuICovXG5cbnZhciBDb2x1bW5TaXplciA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhDb2x1bW5TaXplciwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gQ29sdW1uU2l6ZXIocHJvcHMsIGNvbnRleHQpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29sdW1uU2l6ZXIpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKENvbHVtblNpemVyKS5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0KSk7XG5cbiAgICBfdGhpcy5fcmVnaXN0ZXJDaGlsZCA9IF90aGlzLl9yZWdpc3RlckNoaWxkLmJpbmQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhDb2x1bW5TaXplciwgW3tcbiAgICBrZXk6ICdjb21wb25lbnREaWRVcGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGNvbHVtbk1heFdpZHRoID0gX3Byb3BzLmNvbHVtbk1heFdpZHRoO1xuICAgICAgdmFyIGNvbHVtbk1pbldpZHRoID0gX3Byb3BzLmNvbHVtbk1pbldpZHRoO1xuICAgICAgdmFyIGNvbHVtbnNDb3VudCA9IF9wcm9wcy5jb2x1bW5zQ291bnQ7XG4gICAgICB2YXIgd2lkdGggPSBfcHJvcHMud2lkdGg7XG5cblxuICAgICAgaWYgKGNvbHVtbk1heFdpZHRoICE9PSBwcmV2UHJvcHMuY29sdW1uTWF4V2lkdGggfHwgY29sdW1uTWluV2lkdGggIT09IHByZXZQcm9wcy5jb2x1bW5NaW5XaWR0aCB8fCBjb2x1bW5zQ291bnQgIT09IHByZXZQcm9wcy5jb2x1bW5zQ291bnQgfHwgd2lkdGggIT09IHByZXZQcm9wcy53aWR0aCkge1xuICAgICAgICBpZiAodGhpcy5fcmVnaXN0ZXJlZENoaWxkKSB7XG4gICAgICAgICAgdGhpcy5fcmVnaXN0ZXJlZENoaWxkLnJlY29tcHV0ZUdyaWRTaXplKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3Byb3BzMiA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBfcHJvcHMyLmNoaWxkcmVuO1xuICAgICAgdmFyIGNvbHVtbk1heFdpZHRoID0gX3Byb3BzMi5jb2x1bW5NYXhXaWR0aDtcbiAgICAgIHZhciBjb2x1bW5NaW5XaWR0aCA9IF9wcm9wczIuY29sdW1uTWluV2lkdGg7XG4gICAgICB2YXIgY29sdW1uc0NvdW50ID0gX3Byb3BzMi5jb2x1bW5zQ291bnQ7XG4gICAgICB2YXIgd2lkdGggPSBfcHJvcHMyLndpZHRoO1xuXG5cbiAgICAgIHZhciBzYWZlQ29sdW1uTWluV2lkdGggPSBjb2x1bW5NaW5XaWR0aCB8fCAxO1xuXG4gICAgICB2YXIgc2FmZUNvbHVtbk1heFdpZHRoID0gY29sdW1uTWF4V2lkdGggPyBNYXRoLm1pbihjb2x1bW5NYXhXaWR0aCwgd2lkdGgpIDogd2lkdGg7XG5cbiAgICAgIHZhciBjb2x1bW5XaWR0aCA9IHdpZHRoIC8gY29sdW1uc0NvdW50O1xuICAgICAgY29sdW1uV2lkdGggPSBNYXRoLm1heChzYWZlQ29sdW1uTWluV2lkdGgsIGNvbHVtbldpZHRoKTtcbiAgICAgIGNvbHVtbldpZHRoID0gTWF0aC5taW4oc2FmZUNvbHVtbk1heFdpZHRoLCBjb2x1bW5XaWR0aCk7XG4gICAgICBjb2x1bW5XaWR0aCA9IE1hdGguZmxvb3IoY29sdW1uV2lkdGgpO1xuXG4gICAgICB2YXIgYWRqdXN0ZWRXaWR0aCA9IE1hdGgubWluKHdpZHRoLCBjb2x1bW5XaWR0aCAqIGNvbHVtbnNDb3VudCk7XG5cbiAgICAgIHJldHVybiBjaGlsZHJlbih7XG4gICAgICAgIGFkanVzdGVkV2lkdGg6IGFkanVzdGVkV2lkdGgsXG4gICAgICAgIGdldENvbHVtbldpZHRoOiBmdW5jdGlvbiBnZXRDb2x1bW5XaWR0aCgpIHtcbiAgICAgICAgICByZXR1cm4gY29sdW1uV2lkdGg7XG4gICAgICAgIH0sXG4gICAgICAgIHJlZ2lzdGVyQ2hpbGQ6IHRoaXMuX3JlZ2lzdGVyQ2hpbGRcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Nob3VsZENvbXBvbmVudFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgcmV0dXJuICgwLCBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIuZGVmYXVsdCkodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19yZWdpc3RlckNoaWxkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3JlZ2lzdGVyQ2hpbGQoY2hpbGQpIHtcbiAgICAgIGlmIChjaGlsZCAhPT0gbnVsbCAmJiAhKGNoaWxkIGluc3RhbmNlb2YgX0dyaWQyLmRlZmF1bHQpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdVbmV4cGVjdGVkIGNoaWxkIHR5cGUgcmVnaXN0ZXJlZDsgb25seSBHcmlkIGNoaWxkcmVuIGFyZSBzdXBwb3J0ZWQuJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3JlZ2lzdGVyZWRDaGlsZCA9IGNoaWxkO1xuXG4gICAgICBpZiAodGhpcy5fcmVnaXN0ZXJlZENoaWxkKSB7XG4gICAgICAgIHRoaXMuX3JlZ2lzdGVyZWRDaGlsZC5yZWNvbXB1dGVHcmlkU2l6ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBDb2x1bW5TaXplcjtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cbkNvbHVtblNpemVyLnByb3BUeXBlcyA9IHtcbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHJlc3BvbmRpYmxlIGZvciByZW5kZXJpbmcgYSB2aXJ0dWFsaXplZCBHcmlkLlxuICAgKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhlIGZvbGxvd2luZyBzaWduYXR1cmU6XG4gICAqICh7IGFkanVzdGVkV2lkdGgsIGdldENvbHVtbldpZHRoLCByZWdpc3RlckNoaWxkIH0pID0+IFByb3BUeXBlcy5lbGVtZW50XG4gICAqXG4gICAqIFRoZSBzcGVjaWZpZWQgOmdldENvbHVtbldpZHRoIGZ1bmN0aW9uIHNob3VsZCBiZSBwYXNzZWQgdG8gdGhlIEdyaWQncyA6Y29sdW1uV2lkdGggcHJvcGVydHkuXG4gICAqIFRoZSA6cmVnaXN0ZXJDaGlsZCBzaG91bGQgYmUgcGFzc2VkIHRvIHRoZSBHcmlkJ3MgOnJlZiBwcm9wZXJ0eS5cbiAgICogVGhlIDphZGp1c3RlZFdpZHRoIHByb3BlcnR5IGlzIG9wdGlvbmFsOyBpdCByZWZsZWN0cyB0aGUgbGVzc2VyIG9mIHRoZSBvdmVyYWxsIHdpZHRoIG9yIHRoZSB3aWR0aCBvZiBhbGwgY29sdW1ucy5cbiAgICovXG4gIGNoaWxkcmVuOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKiogT3B0aW9uYWwgbWF4aW11bSBhbGxvd2VkIGNvbHVtbiB3aWR0aCAqL1xuICBjb2x1bW5NYXhXaWR0aDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqIE9wdGlvbmFsIG1pbmltdW0gYWxsb3dlZCBjb2x1bW4gd2lkdGggKi9cbiAgY29sdW1uTWluV2lkdGg6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKiBOdW1iZXIgb2YgY29sdW1ucyBpbiBHcmlkIG9yIEZsZXhUYWJsZSBjaGlsZCAqL1xuICBjb2x1bW5zQ291bnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqIFdpZHRoIG9mIEdyaWQgb3IgRmxleFRhYmxlIGNoaWxkICovXG4gIHdpZHRoOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gQ29sdW1uU2l6ZXI7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5Db2x1bW5TaXplciA9IGV4cG9ydHMuZGVmYXVsdCA9IHVuZGVmaW5lZDtcblxudmFyIF9Db2x1bW5TaXplcjIgPSByZXF1aXJlKCcuL0NvbHVtblNpemVyJyk7XG5cbnZhciBfQ29sdW1uU2l6ZXIzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ29sdW1uU2l6ZXIyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX0NvbHVtblNpemVyMy5kZWZhdWx0O1xuZXhwb3J0cy5Db2x1bW5TaXplciA9IF9Db2x1bW5TaXplcjMuZGVmYXVsdDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHRDZWxsUmVuZGVyZXIgPSBkZWZhdWx0Q2VsbFJlbmRlcmVyO1xuZXhwb3J0cy5kZWZhdWx0Q2VsbERhdGFHZXR0ZXIgPSBkZWZhdWx0Q2VsbERhdGFHZXR0ZXI7XG5leHBvcnRzLmRlZmF1bHRIZWFkZXJSZW5kZXJlciA9IGRlZmF1bHRIZWFkZXJSZW5kZXJlcjtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX1NvcnRJbmRpY2F0b3IgPSByZXF1aXJlKCcuL1NvcnRJbmRpY2F0b3InKTtcblxudmFyIF9Tb3J0SW5kaWNhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NvcnRJbmRpY2F0b3IpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbi8qKlxuICogRGVmYXVsdCBjZWxsIHJlbmRlcmVyIHRoYXQgZGlzcGxheXMgYW4gYXR0cmlidXRlIGFzIGEgc2ltcGxlIHN0cmluZ1xuICogWW91IHNob3VsZCBvdmVycmlkZSB0aGUgY29sdW1uJ3MgY2VsbFJlbmRlcmVyIGlmIHlvdXIgZGF0YSBpcyBzb21lIG90aGVyIHR5cGUgb2Ygb2JqZWN0LlxuICovXG5mdW5jdGlvbiBkZWZhdWx0Q2VsbFJlbmRlcmVyKGNlbGxEYXRhLCBjZWxsRGF0YUtleSwgcm93RGF0YSwgcm93SW5kZXgsIGNvbHVtbkRhdGEpIHtcbiAgaWYgKGNlbGxEYXRhID09PSBudWxsIHx8IGNlbGxEYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gJyc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFN0cmluZyhjZWxsRGF0YSk7XG4gIH1cbn1cblxuLyoqXG4gKiBEZWZhdWx0IGFjY2Vzc29yIGZvciByZXR1cm5pbmcgYSBjZWxsIHZhbHVlIGZvciBhIGdpdmVuIGF0dHJpYnV0ZS5cbiAqIFRoaXMgZnVuY3Rpb24gZXhwZWN0cyB0byBvcGVyYXRlIG9uIGVpdGhlciBhIHZhbmlsbGEgT2JqZWN0IG9yIGFuIEltbXV0YWJsZSBNYXAuXG4gKiBZb3Ugc2hvdWxkIG92ZXJyaWRlIHRoZSBjb2x1bW4ncyBjZWxsRGF0YUdldHRlciBpZiB5b3VyIGRhdGEgaXMgc29tZSBvdGhlciB0eXBlIG9mIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdENlbGxEYXRhR2V0dGVyKGRhdGFLZXksIHJvd0RhdGEsIGNvbHVtbkRhdGEpIHtcbiAgaWYgKHJvd0RhdGEuZ2V0IGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICByZXR1cm4gcm93RGF0YS5nZXQoZGF0YUtleSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJvd0RhdGFbZGF0YUtleV07XG4gIH1cbn1cblxuLyoqXG4gKiBEZWZhdWx0IHRhYmxlIGhlYWRlciByZW5kZXJlci5cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdEhlYWRlclJlbmRlcmVyKF9yZWYpIHtcbiAgdmFyIGNvbHVtbkRhdGEgPSBfcmVmLmNvbHVtbkRhdGE7XG4gIHZhciBkYXRhS2V5ID0gX3JlZi5kYXRhS2V5O1xuICB2YXIgZGlzYWJsZVNvcnQgPSBfcmVmLmRpc2FibGVTb3J0O1xuICB2YXIgbGFiZWwgPSBfcmVmLmxhYmVsO1xuICB2YXIgc29ydEJ5ID0gX3JlZi5zb3J0Qnk7XG4gIHZhciBzb3J0RGlyZWN0aW9uID0gX3JlZi5zb3J0RGlyZWN0aW9uO1xuXG4gIHZhciBzaG93U29ydEluZGljYXRvciA9IHNvcnRCeSA9PT0gZGF0YUtleTtcbiAgdmFyIGNoaWxkcmVuID0gW19yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICdkaXYnLFxuICAgIHtcbiAgICAgIGNsYXNzTmFtZTogJ0ZsZXhUYWJsZV9faGVhZGVyVHJ1bmNhdGVkVGV4dCcsXG4gICAgICBrZXk6ICdsYWJlbCcsXG4gICAgICB0aXRsZTogbGFiZWxcbiAgICB9LFxuICAgIGxhYmVsXG4gICldO1xuXG4gIGlmIChzaG93U29ydEluZGljYXRvcikge1xuICAgIGNoaWxkcmVuLnB1c2goX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX1NvcnRJbmRpY2F0b3IyLmRlZmF1bHQsIHtcbiAgICAgIGtleTogJ1NvcnRJbmRpY2F0b3InLFxuICAgICAgc29ydERpcmVjdGlvbjogc29ydERpcmVjdGlvblxuICAgIH0pKTtcbiAgfVxuXG4gIHJldHVybiBjaGlsZHJlbjtcbn1cblxuLyoqXG4gKiBEZXNjcmliZXMgdGhlIGhlYWRlciBhbmQgY2VsbCBjb250ZW50cyBvZiBhIHRhYmxlIGNvbHVtbi5cbiAqL1xuXG52YXIgQ29sdW1uID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKENvbHVtbiwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gQ29sdW1uKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb2x1bW4pO1xuXG4gICAgcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihDb2x1bW4pLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIENvbHVtbjtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cbkNvbHVtbi5kZWZhdWx0UHJvcHMgPSB7XG4gIGNlbGxEYXRhR2V0dGVyOiBkZWZhdWx0Q2VsbERhdGFHZXR0ZXIsXG4gIGNlbGxSZW5kZXJlcjogZGVmYXVsdENlbGxSZW5kZXJlcixcbiAgZmxleEdyb3c6IDAsXG4gIGZsZXhTaHJpbms6IDEsXG4gIGhlYWRlclJlbmRlcmVyOiBkZWZhdWx0SGVhZGVyUmVuZGVyZXJcbn07XG5Db2x1bW4ucHJvcFR5cGVzID0ge1xuICAvKiogT3B0aW9uYWwgYXJpYS1sYWJlbCB2YWx1ZSB0byBzZXQgb24gdGhlIGNvbHVtbiBoZWFkZXIgKi9cbiAgJ2FyaWEtbGFiZWwnOiBfcmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKiogT3B0aW9uYWwgQ1NTIGNsYXNzIHRvIGFwcGx5IHRvIGNlbGwgKi9cbiAgY2VsbENsYXNzTmFtZTogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIHJlc3BvbnNpYmxlIGZvciByZXR1cm5pbmcgYSBjZWxsJ3MgZGF0YSwgZ2l2ZW4gaXRzIDpkYXRhS2V5XG4gICAqIChkYXRhS2V5OiBzdHJpbmcsIHJvd0RhdGE6IGFueSk6IGFueVxuICAgKi9cbiAgY2VsbERhdGFHZXR0ZXI6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgcmVzcG9uc2libGUgZm9yIHJlbmRlcmluZyBhIGNlbGwncyBjb250ZW50cy5cbiAgICogKGNlbGxEYXRhOiBhbnksIGNlbGxEYXRhS2V5OiBzdHJpbmcsIHJvd0RhdGE6IGFueSwgcm93SW5kZXg6IG51bWJlciwgY29sdW1uRGF0YTogYW55KTogZWxlbWVudFxuICAgKi9cbiAgY2VsbFJlbmRlcmVyOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqIE9wdGlvbmFsIGFkZGl0aW9uYWwgZGF0YSBwYXNzZWQgdG8gdGhpcyBjb2x1bW4ncyA6Y2VsbERhdGFHZXR0ZXIgKi9cbiAgY29sdW1uRGF0YTogX3JlYWN0LlByb3BUeXBlcy5vYmplY3QsXG5cbiAgLyoqIFVuaXF1ZWx5IGlkZW50aWZpZXMgdGhlIHJvdy1kYXRhIGF0dHJpYnV0ZSBjb3JyZXNwbmRpbmcgdG8gdGhpcyBjZWxsICovXG4gIGRhdGFLZXk6IF9yZWFjdC5Qcm9wVHlwZXMuYW55LmlzUmVxdWlyZWQsXG5cbiAgLyoqIElmIHNvcnQgaXMgZW5hYmxlZCBmb3IgdGhlIHRhYmxlIGF0IGxhcmdlLCBkaXNhYmxlIGl0IGZvciB0aGlzIGNvbHVtbiAqL1xuICBkaXNhYmxlU29ydDogX3JlYWN0LlByb3BUeXBlcy5ib29sLFxuXG4gIC8qKiBGbGV4IGdyb3cgc3R5bGU7IGRlZmF1bHRzIHRvIDAgKi9cbiAgZmxleEdyb3c6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKiBGbGV4IHNocmluayBzdHlsZTsgZGVmYXVsdHMgdG8gMSAqL1xuICBmbGV4U2hyaW5rOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKiogT3B0aW9uYWwgQ1NTIGNsYXNzIHRvIGFwcGx5IHRvIHRoaXMgY29sdW1uJ3MgaGVhZGVyICovXG4gIGhlYWRlckNsYXNzTmFtZTogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqXG4gICAqIE9wdGlvbmFsIGNhbGxiYWNrIHJlc3BvbnNpYmxlIGZvciByZW5kZXJpbmcgYSBjb2x1bW4gaGVhZGVyIGNvbnRlbnRzLlxuICAgKiAoeyBjb2x1bW5EYXRhOiBvYmplY3QsIGRhdGFLZXk6IHN0cmluZywgZGlzYWJsZVNvcnQ6IGJvb2xlYW4sIGxhYmVsOiBzdHJpbmcsIHNvcnRCeTogc3RyaW5nLCBzb3J0RGlyZWN0aW9uOiBzdHJpbmcgfSk6IFByb3BUeXBlcy5ub2RlXG4gICAqL1xuICBoZWFkZXJSZW5kZXJlcjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqIEhlYWRlciBsYWJlbCBmb3IgdGhpcyBjb2x1bW4gKi9cbiAgbGFiZWw6IF9yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKiBNYXhpbXVtIHdpZHRoIG9mIGNvbHVtbjsgdGhpcyBwcm9wZXJ0eSB3aWxsIG9ubHkgYmUgdXNlZCBpZiA6ZmxleEdyb3cgaXMgPiAwLiAqL1xuICBtYXhXaWR0aDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqIE1pbmltdW0gd2lkdGggb2YgY29sdW1uLiAqL1xuICBtaW5XaWR0aDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqIEZsZXggYmFzaXMgKHdpZHRoKSBmb3IgdGhpcyBjb2x1bW47IFRoaXMgdmFsdWUgY2FuIGdyb3cgb3Igc2hyaW5rIGJhc2VkIG9uIDpmbGV4R3JvdyBhbmQgOmZsZXhTaHJpbmsgcHJvcGVydGllcy4gKi9cbiAgd2lkdGg6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBDb2x1bW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX2NsYXNzbmFtZXMgPSByZXF1aXJlKCdjbGFzc25hbWVzJyk7XG5cbnZhciBfY2xhc3NuYW1lczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jbGFzc25hbWVzKTtcblxudmFyIF9GbGV4Q29sdW1uID0gcmVxdWlyZSgnLi9GbGV4Q29sdW1uJyk7XG5cbnZhciBfRmxleENvbHVtbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9GbGV4Q29sdW1uKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlYWN0RG9tID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSA9IHJlcXVpcmUoJ3JlYWN0LWFkZG9ucy1zaGFsbG93LWNvbXBhcmUnKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUpO1xuXG52YXIgX0dyaWQgPSByZXF1aXJlKCcuLi9HcmlkJyk7XG5cbnZhciBfR3JpZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9HcmlkKTtcblxudmFyIF9Tb3J0RGlyZWN0aW9uID0gcmVxdWlyZSgnLi9Tb3J0RGlyZWN0aW9uJyk7XG5cbnZhciBfU29ydERpcmVjdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Tb3J0RGlyZWN0aW9uKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIFRhYmxlIGNvbXBvbmVudCB3aXRoIGZpeGVkIGhlYWRlcnMgYW5kIHZpcnR1YWxpemVkIHJvd3MgZm9yIGltcHJvdmVkIHBlcmZvcm1hbmNlIHdpdGggbGFyZ2UgZGF0YSBzZXRzLlxuICogVGhpcyBjb21wb25lbnQgZXhwZWN0cyBleHBsaWNpdCB3aWR0aCwgaGVpZ2h0LCBhbmQgcGFkZGluZyBwYXJhbWV0ZXJzLlxuICovXG5cbnZhciBGbGV4VGFibGUgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoRmxleFRhYmxlLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBGbGV4VGFibGUocHJvcHMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRmxleFRhYmxlKTtcblxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihGbGV4VGFibGUpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgc2Nyb2xsYmFyV2lkdGg6IDBcbiAgICB9O1xuXG4gICAgX3RoaXMuX2NyZWF0ZVJvdyA9IF90aGlzLl9jcmVhdGVSb3cuYmluZChfdGhpcyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlZSBHcmlkI3JlY29tcHV0ZUdyaWRTaXplXG4gICAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKEZsZXhUYWJsZSwgW3tcbiAgICBrZXk6ICdyZWNvbXB1dGVSb3dIZWlnaHRzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVjb21wdXRlUm93SGVpZ2h0cygpIHtcbiAgICAgIHRoaXMucmVmcy5HcmlkLnJlY29tcHV0ZUdyaWRTaXplKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50RGlkTW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIHRoaXMuX3NldFNjcm9sbGJhcldpZHRoKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50RGlkVXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgdGhpcy5fc2V0U2Nyb2xsYmFyV2lkdGgoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY2xhc3NOYW1lID0gX3Byb3BzLmNsYXNzTmFtZTtcbiAgICAgIHZhciBkaXNhYmxlSGVhZGVyID0gX3Byb3BzLmRpc2FibGVIZWFkZXI7XG4gICAgICB2YXIgaGVhZGVySGVpZ2h0ID0gX3Byb3BzLmhlYWRlckhlaWdodDtcbiAgICAgIHZhciBoZWlnaHQgPSBfcHJvcHMuaGVpZ2h0O1xuICAgICAgdmFyIG5vUm93c1JlbmRlcmVyID0gX3Byb3BzLm5vUm93c1JlbmRlcmVyO1xuICAgICAgdmFyIG9uUm93c1JlbmRlcmVkID0gX3Byb3BzLm9uUm93c1JlbmRlcmVkO1xuICAgICAgdmFyIF9vblNjcm9sbCA9IF9wcm9wcy5vblNjcm9sbDtcbiAgICAgIHZhciBvdmVyc2NhblJvd3NDb3VudCA9IF9wcm9wcy5vdmVyc2NhblJvd3NDb3VudDtcbiAgICAgIHZhciByb3dDbGFzc05hbWUgPSBfcHJvcHMucm93Q2xhc3NOYW1lO1xuICAgICAgdmFyIHJvd0hlaWdodCA9IF9wcm9wcy5yb3dIZWlnaHQ7XG4gICAgICB2YXIgcm93c0NvdW50ID0gX3Byb3BzLnJvd3NDb3VudDtcbiAgICAgIHZhciBzY3JvbGxUb0luZGV4ID0gX3Byb3BzLnNjcm9sbFRvSW5kZXg7XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gX3Byb3BzLnNjcm9sbFRvcDtcbiAgICAgIHZhciB3aWR0aCA9IF9wcm9wcy53aWR0aDtcbiAgICAgIHZhciBzY3JvbGxiYXJXaWR0aCA9IHRoaXMuc3RhdGUuc2Nyb2xsYmFyV2lkdGg7XG5cblxuICAgICAgdmFyIGF2YWlsYWJsZVJvd3NIZWlnaHQgPSBoZWlnaHQgLSBoZWFkZXJIZWlnaHQ7XG5cbiAgICAgIC8vIFRoaXMgcm93LXJlbmRlcmVyIHdyYXBwZXIgZnVuY3Rpb24gaXMgbmVjZXNzYXJ5IGluIG9yZGVyIHRvIHRyaWdnZXIgcmUtcmVuZGVyIHdoZW4gdGhlXG4gICAgICAvLyBzb3J0LWJ5IG9yIHNvcnQtZGlyZWN0aW9uIGhhdmUgY2hhbmdlZCAoZWxzZSBHcmlkIHdpbGwgbm90IHNlZSBhbnkgcHJvcHMgY2hhbmdlcylcbiAgICAgIHZhciByb3dSZW5kZXJlciA9IGZ1bmN0aW9uIHJvd1JlbmRlcmVyKGluZGV4KSB7XG4gICAgICAgIHJldHVybiBfdGhpczIuX2NyZWF0ZVJvdyhpbmRleCk7XG4gICAgICB9O1xuXG4gICAgICB2YXIgcm93Q2xhc3MgPSByb3dDbGFzc05hbWUgaW5zdGFuY2VvZiBGdW5jdGlvbiA/IHJvd0NsYXNzTmFtZSgtMSkgOiByb3dDbGFzc05hbWU7XG5cbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHtcbiAgICAgICAgICBjbGFzc05hbWU6ICgwLCBfY2xhc3NuYW1lczIuZGVmYXVsdCkoJ0ZsZXhUYWJsZScsIGNsYXNzTmFtZSlcbiAgICAgICAgfSxcbiAgICAgICAgIWRpc2FibGVIZWFkZXIgJiYgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgJ2RpdicsXG4gICAgICAgICAge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiAoMCwgX2NsYXNzbmFtZXMyLmRlZmF1bHQpKCdGbGV4VGFibGVfX2hlYWRlclJvdycsIHJvd0NsYXNzKSxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIGhlaWdodDogaGVhZGVySGVpZ2h0LFxuICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHNjcm9sbGJhcldpZHRoLFxuICAgICAgICAgICAgICB3aWR0aDogd2lkdGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHRoaXMuX2dldFJlbmRlcmVkSGVhZGVyUm93KClcbiAgICAgICAgKSxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX0dyaWQyLmRlZmF1bHQsIHtcbiAgICAgICAgICAnYXJpYS1sYWJlbCc6IHRoaXMucHJvcHNbJ2FyaWEtbGFiZWwnXSxcbiAgICAgICAgICByZWY6ICdHcmlkJyxcbiAgICAgICAgICBjbGFzc05hbWU6ICdGbGV4VGFibGVfX0dyaWQnLFxuICAgICAgICAgIGNvbHVtbldpZHRoOiB3aWR0aCxcbiAgICAgICAgICBjb2x1bW5zQ291bnQ6IDEsXG4gICAgICAgICAgaGVpZ2h0OiBhdmFpbGFibGVSb3dzSGVpZ2h0LFxuICAgICAgICAgIG5vQ29udGVudFJlbmRlcmVyOiBub1Jvd3NSZW5kZXJlcixcbiAgICAgICAgICBvblNjcm9sbDogZnVuY3Rpb24gb25TY3JvbGwoX3JlZikge1xuICAgICAgICAgICAgdmFyIGNsaWVudEhlaWdodCA9IF9yZWYuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgdmFyIHNjcm9sbEhlaWdodCA9IF9yZWYuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgICAgdmFyIHNjcm9sbFRvcCA9IF9yZWYuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgcmV0dXJuIF9vblNjcm9sbCh7IGNsaWVudEhlaWdodDogY2xpZW50SGVpZ2h0LCBzY3JvbGxIZWlnaHQ6IHNjcm9sbEhlaWdodCwgc2Nyb2xsVG9wOiBzY3JvbGxUb3AgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvblNlY3Rpb25SZW5kZXJlZDogZnVuY3Rpb24gb25TZWN0aW9uUmVuZGVyZWQoX3JlZjIpIHtcbiAgICAgICAgICAgIHZhciByb3dPdmVyc2NhblN0YXJ0SW5kZXggPSBfcmVmMi5yb3dPdmVyc2NhblN0YXJ0SW5kZXg7XG4gICAgICAgICAgICB2YXIgcm93T3ZlcnNjYW5TdG9wSW5kZXggPSBfcmVmMi5yb3dPdmVyc2NhblN0b3BJbmRleDtcbiAgICAgICAgICAgIHZhciByb3dTdGFydEluZGV4ID0gX3JlZjIucm93U3RhcnRJbmRleDtcbiAgICAgICAgICAgIHZhciByb3dTdG9wSW5kZXggPSBfcmVmMi5yb3dTdG9wSW5kZXg7XG4gICAgICAgICAgICByZXR1cm4gb25Sb3dzUmVuZGVyZWQoe1xuICAgICAgICAgICAgICBvdmVyc2NhblN0YXJ0SW5kZXg6IHJvd092ZXJzY2FuU3RhcnRJbmRleCxcbiAgICAgICAgICAgICAgb3ZlcnNjYW5TdG9wSW5kZXg6IHJvd092ZXJzY2FuU3RvcEluZGV4LFxuICAgICAgICAgICAgICBzdGFydEluZGV4OiByb3dTdGFydEluZGV4LFxuICAgICAgICAgICAgICBzdG9wSW5kZXg6IHJvd1N0b3BJbmRleFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvdmVyc2NhblJvd3NDb3VudDogb3ZlcnNjYW5Sb3dzQ291bnQsXG4gICAgICAgICAgcmVuZGVyQ2VsbDogZnVuY3Rpb24gcmVuZGVyQ2VsbChfcmVmMykge1xuICAgICAgICAgICAgdmFyIGNvbHVtbkluZGV4ID0gX3JlZjMuY29sdW1uSW5kZXg7XG4gICAgICAgICAgICB2YXIgcm93SW5kZXggPSBfcmVmMy5yb3dJbmRleDtcbiAgICAgICAgICAgIHJldHVybiByb3dSZW5kZXJlcihyb3dJbmRleCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICByb3dIZWlnaHQ6IHJvd0hlaWdodCxcbiAgICAgICAgICByb3dzQ291bnQ6IHJvd3NDb3VudCxcbiAgICAgICAgICBzY3JvbGxUb1Jvdzogc2Nyb2xsVG9JbmRleCxcbiAgICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFRvcCxcbiAgICAgICAgICB3aWR0aDogd2lkdGhcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2hvdWxkQ29tcG9uZW50VXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICByZXR1cm4gKDAsIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMi5kZWZhdWx0KSh0aGlzLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2NyZWF0ZUNvbHVtbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9jcmVhdGVDb2x1bW4oY29sdW1uLCBjb2x1bW5JbmRleCwgcm93RGF0YSwgcm93SW5kZXgpIHtcbiAgICAgIHZhciBfY29sdW1uJHByb3BzID0gY29sdW1uLnByb3BzO1xuICAgICAgdmFyIGNlbGxDbGFzc05hbWUgPSBfY29sdW1uJHByb3BzLmNlbGxDbGFzc05hbWU7XG4gICAgICB2YXIgY2VsbERhdGFHZXR0ZXIgPSBfY29sdW1uJHByb3BzLmNlbGxEYXRhR2V0dGVyO1xuICAgICAgdmFyIGNvbHVtbkRhdGEgPSBfY29sdW1uJHByb3BzLmNvbHVtbkRhdGE7XG4gICAgICB2YXIgZGF0YUtleSA9IF9jb2x1bW4kcHJvcHMuZGF0YUtleTtcbiAgICAgIHZhciBjZWxsUmVuZGVyZXIgPSBfY29sdW1uJHByb3BzLmNlbGxSZW5kZXJlcjtcblxuICAgICAgdmFyIGNlbGxEYXRhID0gY2VsbERhdGFHZXR0ZXIoZGF0YUtleSwgcm93RGF0YSwgY29sdW1uRGF0YSk7XG4gICAgICB2YXIgcmVuZGVyZWRDZWxsID0gY2VsbFJlbmRlcmVyKGNlbGxEYXRhLCBkYXRhS2V5LCByb3dEYXRhLCByb3dJbmRleCwgY29sdW1uRGF0YSk7XG5cbiAgICAgIHZhciBzdHlsZSA9IHRoaXMuX2dldEZsZXhTdHlsZUZvckNvbHVtbihjb2x1bW4pO1xuXG4gICAgICB2YXIgdGl0bGUgPSB0eXBlb2YgcmVuZGVyZWRDZWxsID09PSAnc3RyaW5nJyA/IHJlbmRlcmVkQ2VsbCA6IG51bGw7XG5cbiAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHtcbiAgICAgICAgICBrZXk6ICdSb3cnICsgcm93SW5kZXggKyAnLUNvbCcgKyBjb2x1bW5JbmRleCxcbiAgICAgICAgICBjbGFzc05hbWU6ICgwLCBfY2xhc3NuYW1lczIuZGVmYXVsdCkoJ0ZsZXhUYWJsZV9fcm93Q29sdW1uJywgY2VsbENsYXNzTmFtZSksXG4gICAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICAgIH0sXG4gICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICdkaXYnLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ0ZsZXhUYWJsZV9fdHJ1bmNhdGVkQ29sdW1uVGV4dCcsXG4gICAgICAgICAgICB0aXRsZTogdGl0bGVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlbmRlcmVkQ2VsbFxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19jcmVhdGVIZWFkZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfY3JlYXRlSGVhZGVyKGNvbHVtbiwgY29sdW1uSW5kZXgpIHtcbiAgICAgIHZhciBfcHJvcHMyID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBoZWFkZXJDbGFzc05hbWUgPSBfcHJvcHMyLmhlYWRlckNsYXNzTmFtZTtcbiAgICAgIHZhciBvbkhlYWRlckNsaWNrID0gX3Byb3BzMi5vbkhlYWRlckNsaWNrO1xuICAgICAgdmFyIHNvcnQgPSBfcHJvcHMyLnNvcnQ7XG4gICAgICB2YXIgc29ydEJ5ID0gX3Byb3BzMi5zb3J0Qnk7XG4gICAgICB2YXIgc29ydERpcmVjdGlvbiA9IF9wcm9wczIuc29ydERpcmVjdGlvbjtcbiAgICAgIHZhciBfY29sdW1uJHByb3BzMiA9IGNvbHVtbi5wcm9wcztcbiAgICAgIHZhciBkYXRhS2V5ID0gX2NvbHVtbiRwcm9wczIuZGF0YUtleTtcbiAgICAgIHZhciBkaXNhYmxlU29ydCA9IF9jb2x1bW4kcHJvcHMyLmRpc2FibGVTb3J0O1xuICAgICAgdmFyIGhlYWRlclJlbmRlcmVyID0gX2NvbHVtbiRwcm9wczIuaGVhZGVyUmVuZGVyZXI7XG4gICAgICB2YXIgbGFiZWwgPSBfY29sdW1uJHByb3BzMi5sYWJlbDtcbiAgICAgIHZhciBjb2x1bW5EYXRhID0gX2NvbHVtbiRwcm9wczIuY29sdW1uRGF0YTtcblxuICAgICAgdmFyIHNvcnRFbmFibGVkID0gIWRpc2FibGVTb3J0ICYmIHNvcnQ7XG5cbiAgICAgIHZhciBjbGFzc05hbWVzID0gKDAsIF9jbGFzc25hbWVzMi5kZWZhdWx0KSgnRmxleFRhYmxlX19oZWFkZXJDb2x1bW4nLCBoZWFkZXJDbGFzc05hbWUsIGNvbHVtbi5wcm9wcy5oZWFkZXJDbGFzc05hbWUsIHtcbiAgICAgICAgJ0ZsZXhUYWJsZV9fc29ydGFibGVIZWFkZXJDb2x1bW4nOiBzb3J0RW5hYmxlZFxuICAgICAgfSk7XG4gICAgICB2YXIgc3R5bGUgPSB0aGlzLl9nZXRGbGV4U3R5bGVGb3JDb2x1bW4oY29sdW1uKTtcblxuICAgICAgdmFyIHJlbmRlcmVkSGVhZGVyID0gaGVhZGVyUmVuZGVyZXIoe1xuICAgICAgICBjb2x1bW5EYXRhOiBjb2x1bW5EYXRhLFxuICAgICAgICBkYXRhS2V5OiBkYXRhS2V5LFxuICAgICAgICBkaXNhYmxlU29ydDogZGlzYWJsZVNvcnQsXG4gICAgICAgIGxhYmVsOiBsYWJlbCxcbiAgICAgICAgc29ydEJ5OiBzb3J0QnksXG4gICAgICAgIHNvcnREaXJlY3Rpb246IHNvcnREaXJlY3Rpb25cbiAgICAgIH0pO1xuXG4gICAgICB2YXIgYTExeVByb3BzID0ge307XG5cbiAgICAgIGlmIChzb3J0RW5hYmxlZCB8fCBvbkhlYWRlckNsaWNrKSB7XG4gICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gSWYgdGhpcyBpcyBhIHNvcnRhYmxlIGhlYWRlciwgY2xpY2tpbmcgaXQgc2hvdWxkIHVwZGF0ZSB0aGUgdGFibGUgZGF0YSdzIHNvcnRpbmcuXG4gICAgICAgICAgdmFyIG5ld1NvcnREaXJlY3Rpb24gPSBzb3J0QnkgIT09IGRhdGFLZXkgfHwgc29ydERpcmVjdGlvbiA9PT0gX1NvcnREaXJlY3Rpb24yLmRlZmF1bHQuREVTQyA/IF9Tb3J0RGlyZWN0aW9uMi5kZWZhdWx0LkFTQyA6IF9Tb3J0RGlyZWN0aW9uMi5kZWZhdWx0LkRFU0M7XG5cbiAgICAgICAgICB2YXIgb25DbGljayA9IGZ1bmN0aW9uIG9uQ2xpY2soKSB7XG4gICAgICAgICAgICBzb3J0RW5hYmxlZCAmJiBzb3J0KGRhdGFLZXksIG5ld1NvcnREaXJlY3Rpb24pO1xuICAgICAgICAgICAgb25IZWFkZXJDbGljayAmJiBvbkhlYWRlckNsaWNrKGRhdGFLZXksIGNvbHVtbkRhdGEpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgb25LZXlEb3duID0gZnVuY3Rpb24gb25LZXlEb3duKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInIHx8IGV2ZW50LmtleSA9PT0gJyAnKSB7XG4gICAgICAgICAgICAgIG9uQ2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgYTExeVByb3BzWydhcmlhLWxhYmVsJ10gPSBjb2x1bW4ucHJvcHNbJ2FyaWEtbGFiZWwnXSB8fCBsYWJlbCB8fCBkYXRhS2V5O1xuICAgICAgICAgIGExMXlQcm9wcy5yb2xlID0gJ3Jvd2hlYWRlcic7XG4gICAgICAgICAgYTExeVByb3BzLnRhYkluZGV4ID0gMDtcbiAgICAgICAgICBhMTF5UHJvcHMub25DbGljayA9IG9uQ2xpY2s7XG4gICAgICAgICAgYTExeVByb3BzLm9uS2V5RG93biA9IG9uS2V5RG93bjtcbiAgICAgICAgfSkoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAgX2V4dGVuZHMoe30sIGExMXlQcm9wcywge1xuICAgICAgICAgIGtleTogJ0hlYWRlci1Db2wnICsgY29sdW1uSW5kZXgsXG4gICAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzLFxuICAgICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgICB9KSxcbiAgICAgICAgcmVuZGVyZWRIZWFkZXJcbiAgICAgICk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2NyZWF0ZVJvdycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9jcmVhdGVSb3cocm93SW5kZXgpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICB2YXIgX3Byb3BzMyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBfcHJvcHMzLmNoaWxkcmVuO1xuICAgICAgdmFyIG9uUm93Q2xpY2sgPSBfcHJvcHMzLm9uUm93Q2xpY2s7XG4gICAgICB2YXIgcm93Q2xhc3NOYW1lID0gX3Byb3BzMy5yb3dDbGFzc05hbWU7XG4gICAgICB2YXIgcm93R2V0dGVyID0gX3Byb3BzMy5yb3dHZXR0ZXI7XG4gICAgICB2YXIgc2Nyb2xsYmFyV2lkdGggPSB0aGlzLnN0YXRlLnNjcm9sbGJhcldpZHRoO1xuXG5cbiAgICAgIHZhciByb3dDbGFzcyA9IHJvd0NsYXNzTmFtZSBpbnN0YW5jZW9mIEZ1bmN0aW9uID8gcm93Q2xhc3NOYW1lKHJvd0luZGV4KSA6IHJvd0NsYXNzTmFtZTtcbiAgICAgIHZhciByb3dEYXRhID0gcm93R2V0dGVyKHJvd0luZGV4KTtcblxuICAgICAgdmFyIHJlbmRlcmVkUm93ID0gX3JlYWN0Mi5kZWZhdWx0LkNoaWxkcmVuLnRvQXJyYXkoY2hpbGRyZW4pLm1hcChmdW5jdGlvbiAoY29sdW1uLCBjb2x1bW5JbmRleCkge1xuICAgICAgICByZXR1cm4gX3RoaXMzLl9jcmVhdGVDb2x1bW4oY29sdW1uLCBjb2x1bW5JbmRleCwgcm93RGF0YSwgcm93SW5kZXgpO1xuICAgICAgfSk7XG5cbiAgICAgIHZhciBhMTF5UHJvcHMgPSB7fTtcblxuICAgICAgaWYgKG9uUm93Q2xpY2spIHtcbiAgICAgICAgYTExeVByb3BzWydhcmlhLWxhYmVsJ10gPSAncm93JztcbiAgICAgICAgYTExeVByb3BzLnJvbGUgPSAncm93JztcbiAgICAgICAgYTExeVByb3BzLnRhYkluZGV4ID0gMDtcbiAgICAgICAgYTExeVByb3BzLm9uQ2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIG9uUm93Q2xpY2socm93SW5kZXgpO1xuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdkaXYnLFxuICAgICAgICBfZXh0ZW5kcyh7fSwgYTExeVByb3BzLCB7XG4gICAgICAgICAga2V5OiByb3dJbmRleCxcbiAgICAgICAgICBjbGFzc05hbWU6ICgwLCBfY2xhc3NuYW1lczIuZGVmYXVsdCkoJ0ZsZXhUYWJsZV9fcm93Jywgcm93Q2xhc3MpLFxuICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuX2dldFJvd0hlaWdodChyb3dJbmRleCksXG4gICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHNjcm9sbGJhcldpZHRoXG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgcmVuZGVyZWRSb3dcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyB0aGUgZmxleC1zaHJpbmssIGZsZXgtZ3JvdywgYW5kIHdpZHRoIHZhbHVlcyBmb3IgYSBjZWxsIChoZWFkZXIgb3IgY29sdW1uKS5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnX2dldEZsZXhTdHlsZUZvckNvbHVtbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRGbGV4U3R5bGVGb3JDb2x1bW4oY29sdW1uKSB7XG4gICAgICB2YXIgZmxleFZhbHVlID0gY29sdW1uLnByb3BzLmZsZXhHcm93ICsgJyAnICsgY29sdW1uLnByb3BzLmZsZXhTaHJpbmsgKyAnICcgKyBjb2x1bW4ucHJvcHMud2lkdGggKyAncHgnO1xuXG4gICAgICB2YXIgc3R5bGUgPSB7XG4gICAgICAgIGZsZXg6IGZsZXhWYWx1ZSxcbiAgICAgICAgbXNGbGV4OiBmbGV4VmFsdWUsXG4gICAgICAgIFdlYmtpdEZsZXg6IGZsZXhWYWx1ZVxuICAgICAgfTtcblxuICAgICAgaWYgKGNvbHVtbi5wcm9wcy5tYXhXaWR0aCkge1xuICAgICAgICBzdHlsZS5tYXhXaWR0aCA9IGNvbHVtbi5wcm9wcy5tYXhXaWR0aDtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbHVtbi5wcm9wcy5taW5XaWR0aCkge1xuICAgICAgICBzdHlsZS5taW5XaWR0aCA9IGNvbHVtbi5wcm9wcy5taW5XaWR0aDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0eWxlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19nZXRSZW5kZXJlZEhlYWRlclJvdycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRSZW5kZXJlZEhlYWRlclJvdygpIHtcbiAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICB2YXIgX3Byb3BzNCA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBfcHJvcHM0LmNoaWxkcmVuO1xuICAgICAgdmFyIGRpc2FibGVIZWFkZXIgPSBfcHJvcHM0LmRpc2FibGVIZWFkZXI7XG5cbiAgICAgIHZhciBpdGVtcyA9IGRpc2FibGVIZWFkZXIgPyBbXSA6IF9yZWFjdDIuZGVmYXVsdC5DaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuKTtcblxuICAgICAgcmV0dXJuIGl0ZW1zLm1hcChmdW5jdGlvbiAoY29sdW1uLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gX3RoaXM0Ll9jcmVhdGVIZWFkZXIoY29sdW1uLCBpbmRleCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfZ2V0Um93SGVpZ2h0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2dldFJvd0hlaWdodChyb3dJbmRleCkge1xuICAgICAgdmFyIHJvd0hlaWdodCA9IHRoaXMucHJvcHMucm93SGVpZ2h0O1xuXG5cbiAgICAgIHJldHVybiByb3dIZWlnaHQgaW5zdGFuY2VvZiBGdW5jdGlvbiA/IHJvd0hlaWdodChyb3dJbmRleCkgOiByb3dIZWlnaHQ7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX3NldFNjcm9sbGJhcldpZHRoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3NldFNjcm9sbGJhcldpZHRoKCkge1xuICAgICAgdmFyIEdyaWQgPSAoMCwgX3JlYWN0RG9tLmZpbmRET01Ob2RlKSh0aGlzLnJlZnMuR3JpZCk7XG4gICAgICB2YXIgY2xpZW50V2lkdGggPSBHcmlkLmNsaWVudFdpZHRoIHx8IDA7XG4gICAgICB2YXIgb2Zmc2V0V2lkdGggPSBHcmlkLm9mZnNldFdpZHRoIHx8IDA7XG4gICAgICB2YXIgc2Nyb2xsYmFyV2lkdGggPSBvZmZzZXRXaWR0aCAtIGNsaWVudFdpZHRoO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHsgc2Nyb2xsYmFyV2lkdGg6IHNjcm9sbGJhcldpZHRoIH0pO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBGbGV4VGFibGU7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG5GbGV4VGFibGUucHJvcFR5cGVzID0ge1xuICAnYXJpYS1sYWJlbCc6IF9yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKiBPbmUgb3IgbW9yZSBGbGV4Q29sdW1ucyBkZXNjcmliaW5nIHRoZSBkYXRhIGRpc3BsYXllZCBpbiB0aGlzIHJvdyAqL1xuICBjaGlsZHJlbjogZnVuY3Rpb24gY2hpbGRyZW4ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gICAgdmFyIGNoaWxkcmVuID0gX3JlYWN0Mi5kZWZhdWx0LkNoaWxkcmVuLnRvQXJyYXkocHJvcHMuY2hpbGRyZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChjaGlsZHJlbltpXS50eXBlICE9PSBfRmxleENvbHVtbjIuZGVmYXVsdCkge1xuICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdGbGV4VGFibGUgb25seSBhY2NlcHRzIGNoaWxkcmVuIG9mIHR5cGUgRmxleENvbHVtbicpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvKiogT3B0aW9uYWwgQ1NTIGNsYXNzIG5hbWUgKi9cbiAgY2xhc3NOYW1lOiBfcmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKiogRGlzYWJsZSByZW5kZXJpbmcgdGhlIGhlYWRlciBhdCBhbGwgKi9cbiAgZGlzYWJsZUhlYWRlcjogX3JlYWN0LlByb3BUeXBlcy5ib29sLFxuXG4gIC8qKiBPcHRpb25hbCBDU1MgY2xhc3MgdG8gYXBwbHkgdG8gYWxsIGNvbHVtbiBoZWFkZXJzICovXG4gIGhlYWRlckNsYXNzTmFtZTogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqIEZpeGVkIGhlaWdodCBvZiBoZWFkZXIgcm93ICovXG4gIGhlYWRlckhlaWdodDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKiogRml4ZWQvYXZhaWxhYmxlIGhlaWdodCBmb3Igb3V0IERPTSBlbGVtZW50ICovXG4gIGhlaWdodDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKiogT3B0aW9uYWwgcmVuZGVyZXIgdG8gYmUgdXNlZCBpbiBwbGFjZSBvZiB0YWJsZSBib2R5IHJvd3Mgd2hlbiByb3dzQ291bnQgaXMgMCAqL1xuICBub1Jvd3NSZW5kZXJlcjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAqIE9wdGlvbmFsIGNhbGxiYWNrIHdoZW4gYSBjb2x1bW4ncyBoZWFkZXIgaXMgY2xpY2tlZC5cbiAgKiAoZGF0YUtleTogc3RyaW5nKTogdm9pZFxuICAqL1xuICBvbkhlYWRlckNsaWNrOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGludm9rZWQgd2hlbiBhIHVzZXIgY2xpY2tzIG9uIGEgdGFibGUgcm93LlxuICAgKiAocm93SW5kZXg6IG51bWJlcik6IHZvaWRcbiAgICovXG4gIG9uUm93Q2xpY2s6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgaW52b2tlZCB3aXRoIGluZm9ybWF0aW9uIGFib3V0IHRoZSBzbGljZSBvZiByb3dzIHRoYXQgd2VyZSBqdXN0IHJlbmRlcmVkLlxuICAgKiAoeyBzdGFydEluZGV4LCBzdG9wSW5kZXggfSk6IHZvaWRcbiAgICovXG4gIG9uUm93c1JlbmRlcmVkOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGludm9rZWQgd2hlbmV2ZXIgdGhlIHNjcm9sbCBvZmZzZXQgY2hhbmdlcyB3aXRoaW4gdGhlIGlubmVyIHNjcm9sbGFibGUgcmVnaW9uLlxuICAgKiBUaGlzIGNhbGxiYWNrIGNhbiBiZSB1c2VkIHRvIHN5bmMgc2Nyb2xsaW5nIGJldHdlZW4gbGlzdHMsIHRhYmxlcywgb3IgZ3JpZHMuXG4gICAqICh7IGNsaWVudEhlaWdodCwgc2Nyb2xsSGVpZ2h0LCBzY3JvbGxUb3AgfSk6IHZvaWRcbiAgICovXG4gIG9uU2Nyb2xsOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogTnVtYmVyIG9mIHJvd3MgdG8gcmVuZGVyIGFib3ZlL2JlbG93IHRoZSB2aXNpYmxlIGJvdW5kcyBvZiB0aGUgbGlzdC5cbiAgICogVGhlc2Ugcm93cyBjYW4gaGVscCBmb3Igc21vb3RoZXIgc2Nyb2xsaW5nIG9uIHRvdWNoIGRldmljZXMuXG4gICAqL1xuICBvdmVyc2NhblJvd3NDb3VudDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogT3B0aW9uYWwgQ1NTIGNsYXNzIHRvIGFwcGx5IHRvIGFsbCB0YWJsZSByb3dzIChpbmNsdWRpbmcgdGhlIGhlYWRlciByb3cpLlxuICAgKiBUaGlzIHByb3BlcnR5IGNhbiBiZSBhIENTUyBjbGFzcyBuYW1lIChzdHJpbmcpIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgY2xhc3MgbmFtZS5cbiAgICogSWYgYSBmdW5jdGlvbiBpcyBwcm92aWRlZCBpdHMgc2lnbmF0dXJlIHNob3VsZCBiZTogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmdcbiAgICovXG4gIHJvd0NsYXNzTmFtZTogX3JlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW19yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCBfcmVhY3QuUHJvcFR5cGVzLmZ1bmNdKSxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgcmVzcG9uc2libGUgZm9yIHJldHVybmluZyBhIGRhdGEgcm93IGdpdmVuIGFuIGluZGV4LlxuICAgKiAoaW5kZXg6IG51bWJlcik6IGFueVxuICAgKi9cbiAgcm93R2V0dGVyOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogRWl0aGVyIGEgZml4ZWQgcm93IGhlaWdodCAobnVtYmVyKSBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgaGVpZ2h0IG9mIGEgcm93IGdpdmVuIGl0cyBpbmRleC5cbiAgICogKGluZGV4OiBudW1iZXIpOiBudW1iZXJcbiAgICovXG4gIHJvd0hlaWdodDogX3JlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW19yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLCBfcmVhY3QuUHJvcFR5cGVzLmZ1bmNdKS5pc1JlcXVpcmVkLFxuXG4gIC8qKiBOdW1iZXIgb2Ygcm93cyBpbiB0YWJsZS4gKi9cbiAgcm93c0NvdW50OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKiBSb3cgaW5kZXggdG8gZW5zdXJlIHZpc2libGUgKGJ5IGZvcmNlZnVsbHkgc2Nyb2xsaW5nIGlmIG5lY2Vzc2FyeSkgKi9cbiAgc2Nyb2xsVG9JbmRleDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqIFZlcnRpY2FsIG9mZnNldC4gKi9cbiAgc2Nyb2xsVG9wOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKipcbiAgICogU29ydCBmdW5jdGlvbiB0byBiZSBjYWxsZWQgaWYgYSBzb3J0YWJsZSBoZWFkZXIgaXMgY2xpY2tlZC5cbiAgICogKGRhdGFLZXk6IHN0cmluZywgc29ydERpcmVjdGlvbjogU29ydERpcmVjdGlvbik6IHZvaWRcbiAgICovXG4gIHNvcnQ6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblxuICAvKiogRmxleFRhYmxlIGRhdGEgaXMgY3VycmVudGx5IHNvcnRlZCBieSB0aGlzIDpkYXRhS2V5IChpZiBpdCBpcyBzb3J0ZWQgYXQgYWxsKSAqL1xuICBzb3J0Qnk6IF9yZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8qKiBGbGV4VGFibGUgZGF0YSBpcyBjdXJyZW50bHkgc29ydGVkIGluIHRoaXMgZGlyZWN0aW9uIChpZiBpdCBpcyBzb3J0ZWQgYXQgYWxsKSAqL1xuICBzb3J0RGlyZWN0aW9uOiBfcmVhY3QuUHJvcFR5cGVzLm9uZU9mKFtfU29ydERpcmVjdGlvbjIuZGVmYXVsdC5BU0MsIF9Tb3J0RGlyZWN0aW9uMi5kZWZhdWx0LkRFU0NdKSxcblxuICAvKiogV2lkdGggb2YgbGlzdCAqL1xuICB3aWR0aDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxufTtcbkZsZXhUYWJsZS5kZWZhdWx0UHJvcHMgPSB7XG4gIGRpc2FibGVIZWFkZXI6IGZhbHNlLFxuICBoZWFkZXJIZWlnaHQ6IDAsXG4gIG5vUm93c1JlbmRlcmVyOiBmdW5jdGlvbiBub1Jvd3NSZW5kZXJlcigpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgb25Sb3dzUmVuZGVyZWQ6IGZ1bmN0aW9uIG9uUm93c1JlbmRlcmVkKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBvblNjcm9sbDogZnVuY3Rpb24gb25TY3JvbGwoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIG92ZXJzY2FuUm93c0NvdW50OiAxMFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IEZsZXhUYWJsZTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgU29ydERpcmVjdGlvbiA9IHtcbiAgLyoqXG4gICAqIFNvcnQgaXRlbXMgaW4gYXNjZW5kaW5nIG9yZGVyLlxuICAgKiBUaGlzIG1lYW5zIGFycmFuZ2luZyBmcm9tIHRoZSBsb3dlc3QgdmFsdWUgdG8gdGhlIGhpZ2hlc3QgKGUuZy4gYS16LCAwLTkpLlxuICAgKi9cbiAgQVNDOiAnQVNDJyxcblxuICAvKipcbiAgICogU29ydCBpdGVtcyBpbiBkZXNjZW5kaW5nIG9yZGVyLlxuICAgKiBUaGlzIG1lYW5zIGFycmFuZ2luZyBmcm9tIHRoZSBoaWdoZXN0IHZhbHVlIHRvIHRoZSBsb3dlc3QgKGUuZy4gei1hLCA5LTApLlxuICAgKi9cbiAgREVTQzogJ0RFU0MnXG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTb3J0RGlyZWN0aW9uOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IFNvcnRJbmRpY2F0b3I7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9jbGFzc25hbWVzID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpO1xuXG52YXIgX2NsYXNzbmFtZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NuYW1lcyk7XG5cbnZhciBfU29ydERpcmVjdGlvbiA9IHJlcXVpcmUoJy4vU29ydERpcmVjdGlvbicpO1xuXG52YXIgX1NvcnREaXJlY3Rpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU29ydERpcmVjdGlvbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogRGlzcGxheWVkIGJlc2lkZSBhIGhlYWRlciB0byBpbmRpY2F0ZSB0aGF0IGEgRmxleFRhYmxlIGlzIGN1cnJlbnRseSBzb3J0ZWQgYnkgdGhpcyBjb2x1bW4uXG4gKi9cbmZ1bmN0aW9uIFNvcnRJbmRpY2F0b3IoX3JlZikge1xuICB2YXIgc29ydERpcmVjdGlvbiA9IF9yZWYuc29ydERpcmVjdGlvbjtcblxuICB2YXIgY2xhc3NOYW1lcyA9ICgwLCBfY2xhc3NuYW1lczIuZGVmYXVsdCkoJ0ZsZXhUYWJsZV9fc29ydGFibGVIZWFkZXJJY29uJywge1xuICAgICdGbGV4VGFibGVfX3NvcnRhYmxlSGVhZGVySWNvbi0tQVNDJzogc29ydERpcmVjdGlvbiA9PT0gX1NvcnREaXJlY3Rpb24yLmRlZmF1bHQuQVNDLFxuICAgICdGbGV4VGFibGVfX3NvcnRhYmxlSGVhZGVySWNvbi0tREVTQyc6IHNvcnREaXJlY3Rpb24gPT09IF9Tb3J0RGlyZWN0aW9uMi5kZWZhdWx0LkRFU0NcbiAgfSk7XG5cbiAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICdzdmcnLFxuICAgIHtcbiAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcyxcbiAgICAgIHdpZHRoOiAxOCxcbiAgICAgIGhlaWdodDogMTgsXG4gICAgICB2aWV3Qm94OiAnMCAwIDI0IDI0JyxcbiAgICAgIHhtbG5zOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnXG4gICAgfSxcbiAgICBzb3J0RGlyZWN0aW9uID09PSBfU29ydERpcmVjdGlvbjIuZGVmYXVsdC5BU0MgPyBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgncGF0aCcsIHsgZDogJ003IDE0bDUtNSA1IDV6JyB9KSA6IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdwYXRoJywgeyBkOiAnTTcgMTBsNSA1IDUtNXonIH0pLFxuICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdwYXRoJywgeyBkOiAnTTAgMGgyNHYyNEgweicsIGZpbGw6ICdub25lJyB9KVxuICApO1xufVxuU29ydEluZGljYXRvci5wcm9wVHlwZXMgPSB7XG4gIHNvcnREaXJlY3Rpb246IF9yZWFjdC5Qcm9wVHlwZXMub25lT2YoW19Tb3J0RGlyZWN0aW9uMi5kZWZhdWx0LkFTQywgX1NvcnREaXJlY3Rpb24yLmRlZmF1bHQuREVTQ10pXG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuU29ydEluZGljYXRvciA9IGV4cG9ydHMuU29ydERpcmVjdGlvbiA9IGV4cG9ydHMuRmxleENvbHVtbiA9IGV4cG9ydHMuRmxleFRhYmxlID0gZXhwb3J0cy5kZWZhdWx0ID0gdW5kZWZpbmVkO1xuXG52YXIgX0ZsZXhUYWJsZTIgPSByZXF1aXJlKCcuL0ZsZXhUYWJsZScpO1xuXG52YXIgX0ZsZXhUYWJsZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9GbGV4VGFibGUyKTtcblxudmFyIF9GbGV4Q29sdW1uMiA9IHJlcXVpcmUoJy4vRmxleENvbHVtbicpO1xuXG52YXIgX0ZsZXhDb2x1bW4zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRmxleENvbHVtbjIpO1xuXG52YXIgX1NvcnREaXJlY3Rpb24yID0gcmVxdWlyZSgnLi9Tb3J0RGlyZWN0aW9uJyk7XG5cbnZhciBfU29ydERpcmVjdGlvbjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Tb3J0RGlyZWN0aW9uMik7XG5cbnZhciBfU29ydEluZGljYXRvcjIgPSByZXF1aXJlKCcuL1NvcnRJbmRpY2F0b3InKTtcblxudmFyIF9Tb3J0SW5kaWNhdG9yMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NvcnRJbmRpY2F0b3IyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX0ZsZXhUYWJsZTMuZGVmYXVsdDtcbmV4cG9ydHMuRmxleFRhYmxlID0gX0ZsZXhUYWJsZTMuZGVmYXVsdDtcbmV4cG9ydHMuRmxleENvbHVtbiA9IF9GbGV4Q29sdW1uMy5kZWZhdWx0O1xuZXhwb3J0cy5Tb3J0RGlyZWN0aW9uID0gX1NvcnREaXJlY3Rpb24zLmRlZmF1bHQ7XG5leHBvcnRzLlNvcnRJbmRpY2F0b3IgPSBfU29ydEluZGljYXRvcjMuZGVmYXVsdDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9jbGFzc25hbWVzID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpO1xuXG52YXIgX2NsYXNzbmFtZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NuYW1lcyk7XG5cbnZhciBfY2FsY3VsYXRlU2l6ZUFuZFBvc2l0aW9uRGF0YUFuZFVwZGF0ZVNjcm9sbE9mZnNldCA9IHJlcXVpcmUoJy4vdXRpbHMvY2FsY3VsYXRlU2l6ZUFuZFBvc2l0aW9uRGF0YUFuZFVwZGF0ZVNjcm9sbE9mZnNldCcpO1xuXG52YXIgX2NhbGN1bGF0ZVNpemVBbmRQb3NpdGlvbkRhdGFBbmRVcGRhdGVTY3JvbGxPZmZzZXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2FsY3VsYXRlU2l6ZUFuZFBvc2l0aW9uRGF0YUFuZFVwZGF0ZVNjcm9sbE9mZnNldCk7XG5cbnZhciBfY3JlYXRlQ2FsbGJhY2tNZW1vaXplciA9IHJlcXVpcmUoJy4uL3V0aWxzL2NyZWF0ZUNhbGxiYWNrTWVtb2l6ZXInKTtcblxudmFyIF9jcmVhdGVDYWxsYmFja01lbW9pemVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUNhbGxiYWNrTWVtb2l6ZXIpO1xuXG52YXIgX2dldE5lYXJlc3RJbmRleCA9IHJlcXVpcmUoJy4vdXRpbHMvZ2V0TmVhcmVzdEluZGV4Jyk7XG5cbnZhciBfZ2V0TmVhcmVzdEluZGV4MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldE5lYXJlc3RJbmRleCk7XG5cbnZhciBfZ2V0T3ZlcnNjYW5JbmRpY2VzID0gcmVxdWlyZSgnLi91dGlscy9nZXRPdmVyc2NhbkluZGljZXMnKTtcblxudmFyIF9nZXRPdmVyc2NhbkluZGljZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0T3ZlcnNjYW5JbmRpY2VzKTtcblxudmFyIF9zY3JvbGxiYXJTaXplID0gcmVxdWlyZSgnZG9tLWhlbHBlcnMvdXRpbC9zY3JvbGxiYXJTaXplJyk7XG5cbnZhciBfc2Nyb2xsYmFyU2l6ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zY3JvbGxiYXJTaXplKTtcblxudmFyIF9nZXRVcGRhdGVkT2Zmc2V0Rm9ySW5kZXggPSByZXF1aXJlKCcuLi91dGlscy9nZXRVcGRhdGVkT2Zmc2V0Rm9ySW5kZXgnKTtcblxudmFyIF9nZXRVcGRhdGVkT2Zmc2V0Rm9ySW5kZXgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0VXBkYXRlZE9mZnNldEZvckluZGV4KTtcblxudmFyIF9nZXRWaXNpYmxlQ2VsbEluZGljZXMgPSByZXF1aXJlKCcuL3V0aWxzL2dldFZpc2libGVDZWxsSW5kaWNlcycpO1xuXG52YXIgX2dldFZpc2libGVDZWxsSW5kaWNlczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRWaXNpYmxlQ2VsbEluZGljZXMpO1xuXG52YXIgX2luaXRDZWxsTWV0YWRhdGEgPSByZXF1aXJlKCcuLi91dGlscy9pbml0Q2VsbE1ldGFkYXRhJyk7XG5cbnZhciBfaW5pdENlbGxNZXRhZGF0YTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbml0Q2VsbE1ldGFkYXRhKTtcblxudmFyIF9yYWYgPSByZXF1aXJlKCdyYWYnKTtcblxudmFyIF9yYWYyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmFmKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlID0gcmVxdWlyZSgncmVhY3QtYWRkb25zLXNoYWxsb3ctY29tcGFyZScpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSk7XG5cbnZhciBfdXBkYXRlU2Nyb2xsSW5kZXhIZWxwZXIgPSByZXF1aXJlKCcuL3V0aWxzL3VwZGF0ZVNjcm9sbEluZGV4SGVscGVyJyk7XG5cbnZhciBfdXBkYXRlU2Nyb2xsSW5kZXhIZWxwZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXBkYXRlU2Nyb2xsSW5kZXhIZWxwZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbi8qKlxuICogU3BlY2lmaWVzIHRoZSBudW1iZXIgb2YgbWlsaXNlY29uZHMgZHVyaW5nIHdoaWNoIHRvIGRpc2FibGUgcG9pbnRlciBldmVudHMgd2hpbGUgYSBzY3JvbGwgaXMgaW4gcHJvZ3Jlc3MuXG4gKiBUaGlzIGltcHJvdmVzIHBlcmZvcm1hbmNlIGFuZCBtYWtlcyBzY3JvbGxpbmcgc21vb3RoZXIuXG4gKi9cbnZhciBJU19TQ1JPTExJTkdfVElNRU9VVCA9IDE1MDtcblxuLyoqXG4gKiBDb250cm9scyB3aGV0aGVyIHRoZSBHcmlkIHVwZGF0ZXMgdGhlIERPTSBlbGVtZW50J3Mgc2Nyb2xsTGVmdC9zY3JvbGxUb3AgYmFzZWQgb24gdGhlIGN1cnJlbnQgc3RhdGUgb3IganVzdCBvYnNlcnZlcyBpdC5cbiAqIFRoaXMgcHJldmVudHMgR3JpZCBmcm9tIGludGVycnVwdGluZyBtb3VzZS13aGVlbCBhbmltYXRpb25zIChzZWUgaXNzdWUgIzIpLlxuICovXG52YXIgU0NST0xMX1BPU0lUSU9OX0NIQU5HRV9SRUFTT05TID0ge1xuICBPQlNFUlZFRDogJ29ic2VydmVkJyxcbiAgUkVRVUVTVEVEOiAncmVxdWVzdGVkJ1xufTtcblxuLyoqXG4gKiBSZW5kZXJzIHRhYnVsYXIgZGF0YSB3aXRoIHZpcnR1YWxpemF0aW9uIGFsb25nIHRoZSB2ZXJ0aWNhbCBhbmQgaG9yaXpvbnRhbCBheGVzLlxuICogUm93IGhlaWdodHMgYW5kIGNvbHVtbiB3aWR0aHMgbXVzdCBiZSBrbm93biBhaGVhZCBvZiB0aW1lIGFuZCBzcGVjaWZpZWQgYXMgcHJvcGVydGllcy5cbiAqL1xuXG52YXIgR3JpZCA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhHcmlkLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBHcmlkKHByb3BzLCBjb250ZXh0KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEdyaWQpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKEdyaWQpLmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpKTtcblxuICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgY29tcHV0ZUdyaWRNZXRhZGF0YU9uTmV4dFVwZGF0ZTogZmFsc2UsXG4gICAgICBpc1Njcm9sbGluZzogZmFsc2UsXG4gICAgICBzY3JvbGxMZWZ0OiAwLFxuICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgfTtcblxuICAgIC8vIEludm9rZXMgb25TZWN0aW9uUmVuZGVyZWQgY2FsbGJhY2sgb25seSB3aGVuIHN0YXJ0L3N0b3Agcm93IG9yIGNvbHVtbiBpbmRpY2VzIGNoYW5nZVxuICAgIF90aGlzLl9vbkdyaWRSZW5kZXJlZE1lbW9pemVyID0gKDAsIF9jcmVhdGVDYWxsYmFja01lbW9pemVyMi5kZWZhdWx0KSgpO1xuICAgIF90aGlzLl9vblNjcm9sbE1lbW9pemVyID0gKDAsIF9jcmVhdGVDYWxsYmFja01lbW9pemVyMi5kZWZhdWx0KShmYWxzZSk7XG5cbiAgICAvLyBCaW5kIGZ1bmN0aW9ucyB0byBpbnN0YW5jZSBzbyB0aGV5IGRvbid0IGxvc2UgY29udGV4dCB3aGVuIHBhc3NlZCBhcm91bmRcbiAgICBfdGhpcy5fY29tcHV0ZUNvbHVtbk1ldGFkYXRhID0gX3RoaXMuX2NvbXB1dGVDb2x1bW5NZXRhZGF0YS5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5fY29tcHV0ZVJvd01ldGFkYXRhID0gX3RoaXMuX2NvbXB1dGVSb3dNZXRhZGF0YS5iaW5kKF90aGlzKTtcbiAgICBfdGhpcy5faW52b2tlT25HcmlkUmVuZGVyZWRIZWxwZXIgPSBfdGhpcy5faW52b2tlT25HcmlkUmVuZGVyZWRIZWxwZXIuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX29uU2Nyb2xsID0gX3RoaXMuX29uU2Nyb2xsLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl91cGRhdGVTY3JvbGxMZWZ0Rm9yU2Nyb2xsVG9Db2x1bW4gPSBfdGhpcy5fdXBkYXRlU2Nyb2xsTGVmdEZvclNjcm9sbFRvQ29sdW1uLmJpbmQoX3RoaXMpO1xuICAgIF90aGlzLl91cGRhdGVTY3JvbGxUb3BGb3JTY3JvbGxUb1JvdyA9IF90aGlzLl91cGRhdGVTY3JvbGxUb3BGb3JTY3JvbGxUb1Jvdy5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICAvKipcbiAgICogRm9yY2VkIHJlY29tcHV0ZSBvZiByb3cgaGVpZ2h0cyBhbmQgY29sdW1uIHdpZHRocy5cbiAgICogVGhpcyBmdW5jdGlvbiBzaG91bGQgYmUgY2FsbGVkIGlmIGR5bmFtaWMgY29sdW1uIG9yIHJvdyBzaXplcyBoYXZlIGNoYW5nZWQgYnV0IG5vdGhpbmcgZWxzZSBoYXMuXG4gICAqIFNpbmNlIEdyaWQgb25seSByZWNlaXZlcyA6Y29sdW1uc0NvdW50IGFuZCA6cm93c0NvdW50IGl0IGhhcyBubyB3YXkgb2YgZGV0ZWN0aW5nIHdoZW4gdGhlIHVuZGVybHlpbmcgZGF0YSBjaGFuZ2VzLlxuICAgKi9cblxuXG4gIF9jcmVhdGVDbGFzcyhHcmlkLCBbe1xuICAgIGtleTogJ3JlY29tcHV0ZUdyaWRTaXplJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVjb21wdXRlR3JpZFNpemUoKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY29tcHV0ZUdyaWRNZXRhZGF0YU9uTmV4dFVwZGF0ZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50RGlkTW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIHZhciBfcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIHNjcm9sbExlZnQgPSBfcHJvcHMuc2Nyb2xsTGVmdDtcbiAgICAgIHZhciBzY3JvbGxUb0NvbHVtbiA9IF9wcm9wcy5zY3JvbGxUb0NvbHVtbjtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfcHJvcHMuc2Nyb2xsVG9wO1xuICAgICAgdmFyIHNjcm9sbFRvUm93ID0gX3Byb3BzLnNjcm9sbFRvUm93O1xuXG5cbiAgICAgIHRoaXMuX3Njcm9sbGJhclNpemUgPSAoMCwgX3Njcm9sbGJhclNpemUyLmRlZmF1bHQpKCk7XG5cbiAgICAgIGlmIChzY3JvbGxMZWZ0ID49IDAgfHwgc2Nyb2xsVG9wID49IDApIHtcbiAgICAgICAgdGhpcy5fc2V0U2Nyb2xsUG9zaXRpb24oeyBzY3JvbGxMZWZ0OiBzY3JvbGxMZWZ0LCBzY3JvbGxUb3A6IHNjcm9sbFRvcCB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNjcm9sbFRvQ29sdW1uID49IDAgfHwgc2Nyb2xsVG9Sb3cgPj0gMCkge1xuICAgICAgICB0aGlzLl91cGRhdGVTY3JvbGxMZWZ0Rm9yU2Nyb2xsVG9Db2x1bW4oKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlU2Nyb2xsVG9wRm9yU2Nyb2xsVG9Sb3coKTtcbiAgICAgIH1cblxuICAgICAgLy8gVXBkYXRlIG9uUm93c1JlbmRlcmVkIGNhbGxiYWNrXG4gICAgICB0aGlzLl9pbnZva2VPbkdyaWRSZW5kZXJlZEhlbHBlcigpO1xuXG4gICAgICAvLyBJbml0aWFsaXplIG9uU2Nyb2xsIGNhbGxiYWNrXG4gICAgICB0aGlzLl9pbnZva2VPblNjcm9sbE1lbW9pemVyKHtcbiAgICAgICAgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCB8fCAwLFxuICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFRvcCB8fCAwLFxuICAgICAgICB0b3RhbENvbHVtbnNXaWR0aDogdGhpcy5fZ2V0VG90YWxDb2x1bW5zV2lkdGgoKSxcbiAgICAgICAgdG90YWxSb3dzSGVpZ2h0OiB0aGlzLl9nZXRUb3RhbFJvd3NIZWlnaHQoKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBUaGlzIG1ldGhvZCB1cGRhdGVzIHNjcm9sbExlZnQvc2Nyb2xsVG9wIGluIHN0YXRlIGZvciB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gICAgICogMSkgTmV3IHNjcm9sbC10by1jZWxsIHByb3BzIGhhdmUgYmVlbiBzZXRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50RGlkVXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdmFyIF9wcm9wczIgPSB0aGlzLnByb3BzO1xuICAgICAgdmFyIGNvbHVtbnNDb3VudCA9IF9wcm9wczIuY29sdW1uc0NvdW50O1xuICAgICAgdmFyIGNvbHVtbldpZHRoID0gX3Byb3BzMi5jb2x1bW5XaWR0aDtcbiAgICAgIHZhciBoZWlnaHQgPSBfcHJvcHMyLmhlaWdodDtcbiAgICAgIHZhciByb3dIZWlnaHQgPSBfcHJvcHMyLnJvd0hlaWdodDtcbiAgICAgIHZhciByb3dzQ291bnQgPSBfcHJvcHMyLnJvd3NDb3VudDtcbiAgICAgIHZhciBzY3JvbGxUb0NvbHVtbiA9IF9wcm9wczIuc2Nyb2xsVG9Db2x1bW47XG4gICAgICB2YXIgc2Nyb2xsVG9Sb3cgPSBfcHJvcHMyLnNjcm9sbFRvUm93O1xuICAgICAgdmFyIHdpZHRoID0gX3Byb3BzMi53aWR0aDtcbiAgICAgIHZhciBfc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgdmFyIHNjcm9sbExlZnQgPSBfc3RhdGUuc2Nyb2xsTGVmdDtcbiAgICAgIHZhciBzY3JvbGxQb3NpdGlvbkNoYW5nZVJlYXNvbiA9IF9zdGF0ZS5zY3JvbGxQb3NpdGlvbkNoYW5nZVJlYXNvbjtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfc3RhdGUuc2Nyb2xsVG9wO1xuXG4gICAgICAvLyBNYWtlIHN1cmUgcmVxdWVzdGVkIGNoYW5nZXMgdG8gOnNjcm9sbExlZnQgb3IgOnNjcm9sbFRvcCBnZXQgYXBwbGllZC5cbiAgICAgIC8vIEFzc2lnbmluZyB0byBzY3JvbGxMZWZ0L3Njcm9sbFRvcCB0ZWxscyB0aGUgYnJvd3NlciB0byBpbnRlcnJ1cHQgYW55IHJ1bm5pbmcgc2Nyb2xsIGFuaW1hdGlvbnMsXG4gICAgICAvLyBBbmQgdG8gZGlzY2FyZCBhbnkgcGVuZGluZyBhc3luYyBjaGFuZ2VzIHRvIHRoZSBzY3JvbGwgcG9zaXRpb24gdGhhdCBtYXkgaGF2ZSBoYXBwZW5lZCBpbiB0aGUgbWVhbnRpbWUgKGUuZy4gb24gYSBzZXBhcmF0ZSBzY3JvbGxpbmcgdGhyZWFkKS5cbiAgICAgIC8vIFNvIHdlIG9ubHkgc2V0IHRoZXNlIHdoZW4gd2UgcmVxdWlyZSBhbiBhZGp1c3RtZW50IG9mIHRoZSBzY3JvbGwgcG9zaXRpb24uXG4gICAgICAvLyBTZWUgaXNzdWUgIzIgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG5cbiAgICAgIGlmIChzY3JvbGxQb3NpdGlvbkNoYW5nZVJlYXNvbiA9PT0gU0NST0xMX1BPU0lUSU9OX0NIQU5HRV9SRUFTT05TLlJFUVVFU1RFRCkge1xuICAgICAgICBpZiAoc2Nyb2xsTGVmdCA+PSAwICYmIHNjcm9sbExlZnQgIT09IHByZXZTdGF0ZS5zY3JvbGxMZWZ0ICYmIHNjcm9sbExlZnQgIT09IHRoaXMucmVmcy5zY3JvbGxpbmdDb250YWluZXIuc2Nyb2xsTGVmdCkge1xuICAgICAgICAgIHRoaXMucmVmcy5zY3JvbGxpbmdDb250YWluZXIuc2Nyb2xsTGVmdCA9IHNjcm9sbExlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjcm9sbFRvcCA+PSAwICYmIHNjcm9sbFRvcCAhPT0gcHJldlN0YXRlLnNjcm9sbFRvcCAmJiBzY3JvbGxUb3AgIT09IHRoaXMucmVmcy5zY3JvbGxpbmdDb250YWluZXIuc2Nyb2xsVG9wKSB7XG4gICAgICAgICAgdGhpcy5yZWZzLnNjcm9sbGluZ0NvbnRhaW5lci5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVXBkYXRlIHNjcm9sbCBvZmZzZXRzIGlmIHRoZSBjdXJyZW50IDpzY3JvbGxUb0NvbHVtbiBvciA6c2Nyb2xsVG9Sb3cgdmFsdWVzIHJlcXVpcmVzIGl0XG4gICAgICAvLyBAVE9ETyBEbyB3ZSBhbHNvIG5lZWQgdGhpcyBjaGVjayBvciBjYW4gdGhlIG9uZSBpbiBjb21wb25lbnRXaWxsVXBkYXRlKCkgc3VmZmljZT9cbiAgICAgICgwLCBfdXBkYXRlU2Nyb2xsSW5kZXhIZWxwZXIyLmRlZmF1bHQpKHtcbiAgICAgICAgY2VsbENvdW50OiBjb2x1bW5zQ291bnQsXG4gICAgICAgIGNlbGxNZXRhZGF0YTogdGhpcy5fY29sdW1uTWV0YWRhdGEsXG4gICAgICAgIGNlbGxTaXplOiBjb2x1bW5XaWR0aCxcbiAgICAgICAgcHJldmlvdXNDZWxsc0NvdW50OiBwcmV2UHJvcHMuY29sdW1uc0NvdW50LFxuICAgICAgICBwcmV2aW91c0NlbGxTaXplOiBwcmV2UHJvcHMuY29sdW1uV2lkdGgsXG4gICAgICAgIHByZXZpb3VzU2Nyb2xsVG9JbmRleDogcHJldlByb3BzLnNjcm9sbFRvQ29sdW1uLFxuICAgICAgICBwcmV2aW91c1NpemU6IHByZXZQcm9wcy53aWR0aCxcbiAgICAgICAgc2Nyb2xsT2Zmc2V0OiBzY3JvbGxMZWZ0LFxuICAgICAgICBzY3JvbGxUb0luZGV4OiBzY3JvbGxUb0NvbHVtbixcbiAgICAgICAgc2l6ZTogd2lkdGgsXG4gICAgICAgIHVwZGF0ZVNjcm9sbEluZGV4Q2FsbGJhY2s6IGZ1bmN0aW9uIHVwZGF0ZVNjcm9sbEluZGV4Q2FsbGJhY2soc2Nyb2xsVG9Db2x1bW4pIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMyLl91cGRhdGVTY3JvbGxMZWZ0Rm9yU2Nyb2xsVG9Db2x1bW4oX2V4dGVuZHMoe30sIF90aGlzMi5wcm9wcywgeyBzY3JvbGxUb0NvbHVtbjogc2Nyb2xsVG9Db2x1bW4gfSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgICgwLCBfdXBkYXRlU2Nyb2xsSW5kZXhIZWxwZXIyLmRlZmF1bHQpKHtcbiAgICAgICAgY2VsbENvdW50OiByb3dzQ291bnQsXG4gICAgICAgIGNlbGxNZXRhZGF0YTogdGhpcy5fcm93TWV0YWRhdGEsXG4gICAgICAgIGNlbGxTaXplOiByb3dIZWlnaHQsXG4gICAgICAgIHByZXZpb3VzQ2VsbHNDb3VudDogcHJldlByb3BzLnJvd3NDb3VudCxcbiAgICAgICAgcHJldmlvdXNDZWxsU2l6ZTogcHJldlByb3BzLnJvd0hlaWdodCxcbiAgICAgICAgcHJldmlvdXNTY3JvbGxUb0luZGV4OiBwcmV2UHJvcHMuc2Nyb2xsVG9Sb3csXG4gICAgICAgIHByZXZpb3VzU2l6ZTogcHJldlByb3BzLmhlaWdodCxcbiAgICAgICAgc2Nyb2xsT2Zmc2V0OiBzY3JvbGxUb3AsXG4gICAgICAgIHNjcm9sbFRvSW5kZXg6IHNjcm9sbFRvUm93LFxuICAgICAgICBzaXplOiBoZWlnaHQsXG4gICAgICAgIHVwZGF0ZVNjcm9sbEluZGV4Q2FsbGJhY2s6IGZ1bmN0aW9uIHVwZGF0ZVNjcm9sbEluZGV4Q2FsbGJhY2soc2Nyb2xsVG9Sb3cpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMyLl91cGRhdGVTY3JvbGxUb3BGb3JTY3JvbGxUb1JvdyhfZXh0ZW5kcyh7fSwgX3RoaXMyLnByb3BzLCB7IHNjcm9sbFRvUm93OiBzY3JvbGxUb1JvdyB9KSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBVcGRhdGUgb25Sb3dzUmVuZGVyZWQgY2FsbGJhY2sgaWYgc3RhcnQvc3RvcCBpbmRpY2VzIGhhdmUgY2hhbmdlZFxuICAgICAgdGhpcy5faW52b2tlT25HcmlkUmVuZGVyZWRIZWxwZXIoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnRXaWxsTW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICB0aGlzLl9jb21wdXRlQ29sdW1uTWV0YWRhdGEodGhpcy5wcm9wcyk7XG4gICAgICB0aGlzLl9jb21wdXRlUm93TWV0YWRhdGEodGhpcy5wcm9wcyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50V2lsbFVubW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIGlmICh0aGlzLl9kaXNhYmxlUG9pbnRlckV2ZW50c1RpbWVvdXRJZCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fZGlzYWJsZVBvaW50ZXJFdmVudHNUaW1lb3V0SWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fc2V0TmV4dFN0YXRlQW5pbWF0aW9uRnJhbWVJZCkge1xuICAgICAgICBfcmFmMi5kZWZhdWx0LmNhbmNlbCh0aGlzLl9zZXROZXh0U3RhdGVBbmltYXRpb25GcmFtZUlkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIFRoaXMgbWV0aG9kIHVwZGF0ZXMgc2Nyb2xsTGVmdC9zY3JvbGxUb3AgaW4gc3RhdGUgZm9yIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAgICAgKiAxKSBFbXB0eSBjb250ZW50ICgwIHJvd3Mgb3IgY29sdW1ucylcbiAgICAgKiAyKSBOZXcgc2Nyb2xsIHByb3BzIG92ZXJyaWRpbmcgdGhlIGN1cnJlbnQgc3RhdGVcbiAgICAgKiAzKSBDZWxscy1jb3VudCBvciBjZWxscy1zaXplIGhhcyBjaGFuZ2VkLCBtYWtpbmcgcHJldmlvdXMgc2Nyb2xsIG9mZnNldHMgaW52YWxpZFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnRXaWxsVXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIGlmIChuZXh0UHJvcHMuY29sdW1uc0NvdW50ID09PSAwICYmIG5leHRTdGF0ZS5zY3JvbGxMZWZ0ICE9PSAwIHx8IG5leHRQcm9wcy5yb3dzQ291bnQgPT09IDAgJiYgbmV4dFN0YXRlLnNjcm9sbFRvcCAhPT0gMCkge1xuICAgICAgICB0aGlzLl9zZXRTY3JvbGxQb3NpdGlvbih7XG4gICAgICAgICAgc2Nyb2xsTGVmdDogMCxcbiAgICAgICAgICBzY3JvbGxUb3A6IDBcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKG5leHRQcm9wcy5zY3JvbGxMZWZ0ICE9PSB0aGlzLnByb3BzLnNjcm9sbExlZnQgfHwgbmV4dFByb3BzLnNjcm9sbFRvcCAhPT0gdGhpcy5wcm9wcy5zY3JvbGxUb3ApIHtcbiAgICAgICAgdGhpcy5fc2V0U2Nyb2xsUG9zaXRpb24oe1xuICAgICAgICAgIHNjcm9sbExlZnQ6IG5leHRQcm9wcy5zY3JvbGxMZWZ0LFxuICAgICAgICAgIHNjcm9sbFRvcDogbmV4dFByb3BzLnNjcm9sbFRvcFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gVXBkYXRlIHNjcm9sbCBvZmZzZXRzIGlmIHRoZSBzaXplIG9yIG51bWJlciBvZiBjZWxscyBoYXZlIGNoYW5nZWQsIGludmFsaWRhdGluZyB0aGUgcHJldmlvdXMgdmFsdWVcbiAgICAgICgwLCBfY2FsY3VsYXRlU2l6ZUFuZFBvc2l0aW9uRGF0YUFuZFVwZGF0ZVNjcm9sbE9mZnNldDIuZGVmYXVsdCkoe1xuICAgICAgICBjZWxsQ291bnQ6IHRoaXMucHJvcHMuY29sdW1uc0NvdW50LFxuICAgICAgICBjZWxsU2l6ZTogdGhpcy5wcm9wcy5jb2x1bW5XaWR0aCxcbiAgICAgICAgY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2s6IHRoaXMuX2NvbXB1dGVDb2x1bW5NZXRhZGF0YSxcbiAgICAgICAgY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2tQcm9wczogbmV4dFByb3BzLFxuICAgICAgICBjb21wdXRlTWV0YWRhdGFPbk5leHRVcGRhdGU6IG5leHRTdGF0ZS5jb21wdXRlR3JpZE1ldGFkYXRhT25OZXh0VXBkYXRlLFxuICAgICAgICBuZXh0Q2VsbHNDb3VudDogbmV4dFByb3BzLmNvbHVtbnNDb3VudCxcbiAgICAgICAgbmV4dENlbGxTaXplOiBuZXh0UHJvcHMuY29sdW1uV2lkdGgsXG4gICAgICAgIG5leHRTY3JvbGxUb0luZGV4OiBuZXh0UHJvcHMuc2Nyb2xsVG9Db2x1bW4sXG4gICAgICAgIHNjcm9sbFRvSW5kZXg6IHRoaXMucHJvcHMuc2Nyb2xsVG9Db2x1bW4sXG4gICAgICAgIHVwZGF0ZVNjcm9sbE9mZnNldEZvclNjcm9sbFRvSW5kZXg6IGZ1bmN0aW9uIHVwZGF0ZVNjcm9sbE9mZnNldEZvclNjcm9sbFRvSW5kZXgoKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzMy5fdXBkYXRlU2Nyb2xsTGVmdEZvclNjcm9sbFRvQ29sdW1uKG5leHRQcm9wcywgbmV4dFN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAoMCwgX2NhbGN1bGF0ZVNpemVBbmRQb3NpdGlvbkRhdGFBbmRVcGRhdGVTY3JvbGxPZmZzZXQyLmRlZmF1bHQpKHtcbiAgICAgICAgY2VsbENvdW50OiB0aGlzLnByb3BzLnJvd3NDb3VudCxcbiAgICAgICAgY2VsbFNpemU6IHRoaXMucHJvcHMucm93SGVpZ2h0LFxuICAgICAgICBjb21wdXRlTWV0YWRhdGFDYWxsYmFjazogdGhpcy5fY29tcHV0ZVJvd01ldGFkYXRhLFxuICAgICAgICBjb21wdXRlTWV0YWRhdGFDYWxsYmFja1Byb3BzOiBuZXh0UHJvcHMsXG4gICAgICAgIGNvbXB1dGVNZXRhZGF0YU9uTmV4dFVwZGF0ZTogbmV4dFN0YXRlLmNvbXB1dGVHcmlkTWV0YWRhdGFPbk5leHRVcGRhdGUsXG4gICAgICAgIG5leHRDZWxsc0NvdW50OiBuZXh0UHJvcHMucm93c0NvdW50LFxuICAgICAgICBuZXh0Q2VsbFNpemU6IG5leHRQcm9wcy5yb3dIZWlnaHQsXG4gICAgICAgIG5leHRTY3JvbGxUb0luZGV4OiBuZXh0UHJvcHMuc2Nyb2xsVG9Sb3csXG4gICAgICAgIHNjcm9sbFRvSW5kZXg6IHRoaXMucHJvcHMuc2Nyb2xsVG9Sb3csXG4gICAgICAgIHVwZGF0ZVNjcm9sbE9mZnNldEZvclNjcm9sbFRvSW5kZXg6IGZ1bmN0aW9uIHVwZGF0ZVNjcm9sbE9mZnNldEZvclNjcm9sbFRvSW5kZXgoKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzMy5fdXBkYXRlU2Nyb2xsVG9wRm9yU2Nyb2xsVG9Sb3cobmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNvbXB1dGVHcmlkTWV0YWRhdGFPbk5leHRVcGRhdGU6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3Byb3BzMyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY2xhc3NOYW1lID0gX3Byb3BzMy5jbGFzc05hbWU7XG4gICAgICB2YXIgY29sdW1uc0NvdW50ID0gX3Byb3BzMy5jb2x1bW5zQ291bnQ7XG4gICAgICB2YXIgaGVpZ2h0ID0gX3Byb3BzMy5oZWlnaHQ7XG4gICAgICB2YXIgbm9Db250ZW50UmVuZGVyZXIgPSBfcHJvcHMzLm5vQ29udGVudFJlbmRlcmVyO1xuICAgICAgdmFyIG92ZXJzY2FuQ29sdW1uc0NvdW50ID0gX3Byb3BzMy5vdmVyc2NhbkNvbHVtbnNDb3VudDtcbiAgICAgIHZhciBvdmVyc2NhblJvd3NDb3VudCA9IF9wcm9wczMub3ZlcnNjYW5Sb3dzQ291bnQ7XG4gICAgICB2YXIgcmVuZGVyQ2VsbCA9IF9wcm9wczMucmVuZGVyQ2VsbDtcbiAgICAgIHZhciByZW5kZXJDZWxsUmFuZ2VzID0gX3Byb3BzMy5yZW5kZXJDZWxsUmFuZ2VzO1xuICAgICAgdmFyIHJvd3NDb3VudCA9IF9wcm9wczMucm93c0NvdW50O1xuICAgICAgdmFyIHdpZHRoID0gX3Byb3BzMy53aWR0aDtcbiAgICAgIHZhciBfc3RhdGUyID0gdGhpcy5zdGF0ZTtcbiAgICAgIHZhciBpc1Njcm9sbGluZyA9IF9zdGF0ZTIuaXNTY3JvbGxpbmc7XG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IF9zdGF0ZTIuc2Nyb2xsTGVmdDtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfc3RhdGUyLnNjcm9sbFRvcDtcblxuXG4gICAgICB2YXIgY2hpbGRyZW5Ub0Rpc3BsYXkgPSBbXTtcblxuICAgICAgLy8gUmVuZGVyIG9ubHkgZW5vdWdoIGNvbHVtbnMgYW5kIHJvd3MgdG8gY292ZXIgdGhlIHZpc2libGUgYXJlYSBvZiB0aGUgZ3JpZC5cbiAgICAgIGlmIChoZWlnaHQgPiAwICYmIHdpZHRoID4gMCkge1xuICAgICAgICB2YXIgdmlzaWJsZUNvbHVtbkluZGljZXMgPSAoMCwgX2dldFZpc2libGVDZWxsSW5kaWNlczIuZGVmYXVsdCkoe1xuICAgICAgICAgIGNlbGxNZXRhZGF0YTogdGhpcy5fY29sdW1uTWV0YWRhdGEsXG4gICAgICAgICAgY29udGFpbmVyU2l6ZTogd2lkdGgsXG4gICAgICAgICAgY3VycmVudE9mZnNldDogc2Nyb2xsTGVmdFxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgdmlzaWJsZVJvd0luZGljZXMgPSAoMCwgX2dldFZpc2libGVDZWxsSW5kaWNlczIuZGVmYXVsdCkoe1xuICAgICAgICAgIGNlbGxNZXRhZGF0YTogdGhpcy5fcm93TWV0YWRhdGEsXG4gICAgICAgICAgY29udGFpbmVyU2l6ZTogaGVpZ2h0LFxuICAgICAgICAgIGN1cnJlbnRPZmZzZXQ6IHNjcm9sbFRvcFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTdG9yZSBmb3IgX2ludm9rZU9uR3JpZFJlbmRlcmVkSGVscGVyKClcbiAgICAgICAgdGhpcy5fcmVuZGVyZWRDb2x1bW5TdGFydEluZGV4ID0gdmlzaWJsZUNvbHVtbkluZGljZXMuc3RhcnQ7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVkQ29sdW1uU3RvcEluZGV4ID0gdmlzaWJsZUNvbHVtbkluZGljZXMuc3RvcDtcbiAgICAgICAgdGhpcy5fcmVuZGVyZWRSb3dTdGFydEluZGV4ID0gdmlzaWJsZVJvd0luZGljZXMuc3RhcnQ7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVkUm93U3RvcEluZGV4ID0gdmlzaWJsZVJvd0luZGljZXMuc3RvcDtcblxuICAgICAgICB2YXIgb3ZlcnNjYW5Db2x1bW5JbmRpY2VzID0gKDAsIF9nZXRPdmVyc2NhbkluZGljZXMyLmRlZmF1bHQpKHtcbiAgICAgICAgICBjZWxsQ291bnQ6IGNvbHVtbnNDb3VudCxcbiAgICAgICAgICBvdmVyc2NhbkNlbGxzQ291bnQ6IG92ZXJzY2FuQ29sdW1uc0NvdW50LFxuICAgICAgICAgIHN0YXJ0SW5kZXg6IHRoaXMuX3JlbmRlcmVkQ29sdW1uU3RhcnRJbmRleCxcbiAgICAgICAgICBzdG9wSW5kZXg6IHRoaXMuX3JlbmRlcmVkQ29sdW1uU3RvcEluZGV4XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBvdmVyc2NhblJvd0luZGljZXMgPSAoMCwgX2dldE92ZXJzY2FuSW5kaWNlczIuZGVmYXVsdCkoe1xuICAgICAgICAgIGNlbGxDb3VudDogcm93c0NvdW50LFxuICAgICAgICAgIG92ZXJzY2FuQ2VsbHNDb3VudDogb3ZlcnNjYW5Sb3dzQ291bnQsXG4gICAgICAgICAgc3RhcnRJbmRleDogdGhpcy5fcmVuZGVyZWRSb3dTdGFydEluZGV4LFxuICAgICAgICAgIHN0b3BJbmRleDogdGhpcy5fcmVuZGVyZWRSb3dTdG9wSW5kZXhcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU3RvcmUgZm9yIF9pbnZva2VPbkdyaWRSZW5kZXJlZEhlbHBlcigpXG4gICAgICAgIHRoaXMuX2NvbHVtblN0YXJ0SW5kZXggPSBvdmVyc2NhbkNvbHVtbkluZGljZXMub3ZlcnNjYW5TdGFydEluZGV4O1xuICAgICAgICB0aGlzLl9jb2x1bW5TdG9wSW5kZXggPSBvdmVyc2NhbkNvbHVtbkluZGljZXMub3ZlcnNjYW5TdG9wSW5kZXg7XG4gICAgICAgIHRoaXMuX3Jvd1N0YXJ0SW5kZXggPSBvdmVyc2NhblJvd0luZGljZXMub3ZlcnNjYW5TdGFydEluZGV4O1xuICAgICAgICB0aGlzLl9yb3dTdG9wSW5kZXggPSBvdmVyc2NhblJvd0luZGljZXMub3ZlcnNjYW5TdG9wSW5kZXg7XG5cbiAgICAgICAgY2hpbGRyZW5Ub0Rpc3BsYXkgPSByZW5kZXJDZWxsUmFuZ2VzKHtcbiAgICAgICAgICBjb2x1bW5NZXRhZGF0YTogdGhpcy5fY29sdW1uTWV0YWRhdGEsXG4gICAgICAgICAgY29sdW1uU3RhcnRJbmRleDogdGhpcy5fY29sdW1uU3RhcnRJbmRleCxcbiAgICAgICAgICBjb2x1bW5TdG9wSW5kZXg6IHRoaXMuX2NvbHVtblN0b3BJbmRleCxcbiAgICAgICAgICByZW5kZXJDZWxsOiByZW5kZXJDZWxsLFxuICAgICAgICAgIHJvd01ldGFkYXRhOiB0aGlzLl9yb3dNZXRhZGF0YSxcbiAgICAgICAgICByb3dTdGFydEluZGV4OiB0aGlzLl9yb3dTdGFydEluZGV4LFxuICAgICAgICAgIHJvd1N0b3BJbmRleDogdGhpcy5fcm93U3RvcEluZGV4XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB2YXIgZ3JpZFN0eWxlID0ge1xuICAgICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgd2lkdGg6IHdpZHRoXG4gICAgICB9O1xuXG4gICAgICB2YXIgdG90YWxDb2x1bW5zV2lkdGggPSB0aGlzLl9nZXRUb3RhbENvbHVtbnNXaWR0aCgpO1xuICAgICAgdmFyIHRvdGFsUm93c0hlaWdodCA9IHRoaXMuX2dldFRvdGFsUm93c0hlaWdodCgpO1xuXG4gICAgICAvLyBGb3JjZSBicm93c2VyIHRvIGhpZGUgc2Nyb2xsYmFycyB3aGVuIHdlIGtub3cgdGhleSBhcmVuJ3QgbmVjZXNzYXJ5LlxuICAgICAgLy8gT3RoZXJ3aXNlIG9uY2Ugc2Nyb2xsYmFycyBhcHBlYXIgdGhleSBtYXkgbm90IGRpc2FwcGVhciBhZ2Fpbi5cbiAgICAgIC8vIEZvciBtb3JlIGluZm8gc2VlIGlzc3VlICMxMTZcbiAgICAgIGlmICh0b3RhbENvbHVtbnNXaWR0aCA8PSB3aWR0aCkge1xuICAgICAgICBncmlkU3R5bGUub3ZlcmZsb3dYID0gJ2hpZGRlbic7XG4gICAgICB9XG5cbiAgICAgIGlmICh0b3RhbFJvd3NIZWlnaHQgPD0gaGVpZ2h0KSB7XG4gICAgICAgIGdyaWRTdHlsZS5vdmVyZmxvd1kgPSAnaGlkZGVuJztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAnZGl2JyxcbiAgICAgICAge1xuICAgICAgICAgIHJlZjogJ3Njcm9sbGluZ0NvbnRhaW5lcicsXG4gICAgICAgICAgJ2FyaWEtbGFiZWwnOiB0aGlzLnByb3BzWydhcmlhLWxhYmVsJ10sXG4gICAgICAgICAgY2xhc3NOYW1lOiAoMCwgX2NsYXNzbmFtZXMyLmRlZmF1bHQpKCdHcmlkJywgY2xhc3NOYW1lKSxcbiAgICAgICAgICBvblNjcm9sbDogdGhpcy5fb25TY3JvbGwsXG4gICAgICAgICAgcm9sZTogJ2dyaWQnLFxuICAgICAgICAgIHN0eWxlOiBncmlkU3R5bGUsXG4gICAgICAgICAgdGFiSW5kZXg6IDBcbiAgICAgICAgfSxcbiAgICAgICAgY2hpbGRyZW5Ub0Rpc3BsYXkubGVuZ3RoID4gMCAmJiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjbGFzc05hbWU6ICdHcmlkX19pbm5lclNjcm9sbENvbnRhaW5lcicsXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICB3aWR0aDogdG90YWxDb2x1bW5zV2lkdGgsXG4gICAgICAgICAgICAgIGhlaWdodDogdG90YWxSb3dzSGVpZ2h0LFxuICAgICAgICAgICAgICBtYXhXaWR0aDogdG90YWxDb2x1bW5zV2lkdGgsXG4gICAgICAgICAgICAgIG1heEhlaWdodDogdG90YWxSb3dzSGVpZ2h0LFxuICAgICAgICAgICAgICBwb2ludGVyRXZlbnRzOiBpc1Njcm9sbGluZyA/ICdub25lJyA6ICdhdXRvJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY2hpbGRyZW5Ub0Rpc3BsYXlcbiAgICAgICAgKSxcbiAgICAgICAgY2hpbGRyZW5Ub0Rpc3BsYXkubGVuZ3RoID09PSAwICYmIG5vQ29udGVudFJlbmRlcmVyKClcbiAgICAgICk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2hvdWxkQ29tcG9uZW50VXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICByZXR1cm4gKDAsIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMi5kZWZhdWx0KSh0aGlzLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSk7XG4gICAgfVxuXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBIZWxwZXIgbWV0aG9kcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbiAgfSwge1xuICAgIGtleTogJ19jb21wdXRlQ29sdW1uTWV0YWRhdGEnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfY29tcHV0ZUNvbHVtbk1ldGFkYXRhKHByb3BzKSB7XG4gICAgICB2YXIgY29sdW1uc0NvdW50ID0gcHJvcHMuY29sdW1uc0NvdW50O1xuICAgICAgdmFyIGNvbHVtbldpZHRoID0gcHJvcHMuY29sdW1uV2lkdGg7XG5cblxuICAgICAgdGhpcy5fY29sdW1uTWV0YWRhdGEgPSAoMCwgX2luaXRDZWxsTWV0YWRhdGEyLmRlZmF1bHQpKHtcbiAgICAgICAgY2VsbENvdW50OiBjb2x1bW5zQ291bnQsXG4gICAgICAgIHNpemU6IGNvbHVtbldpZHRoXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfY29tcHV0ZVJvd01ldGFkYXRhJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2NvbXB1dGVSb3dNZXRhZGF0YShwcm9wcykge1xuICAgICAgdmFyIHJvd0hlaWdodCA9IHByb3BzLnJvd0hlaWdodDtcbiAgICAgIHZhciByb3dzQ291bnQgPSBwcm9wcy5yb3dzQ291bnQ7XG5cblxuICAgICAgdGhpcy5fcm93TWV0YWRhdGEgPSAoMCwgX2luaXRDZWxsTWV0YWRhdGEyLmRlZmF1bHQpKHtcbiAgICAgICAgY2VsbENvdW50OiByb3dzQ291bnQsXG4gICAgICAgIHNpemU6IHJvd0hlaWdodFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyBhbiA6aXNTY3JvbGxpbmcgZmxhZyBmb3IgYSBzbWFsbCB3aW5kb3cgb2YgdGltZS5cbiAgICAgKiBUaGlzIGZsYWcgaXMgdXNlZCB0byBkaXNhYmxlIHBvaW50ZXIgZXZlbnRzIG9uIHRoZSBzY3JvbGxhYmxlIHBvcnRpb24gb2YgdGhlIEdyaWQuXG4gICAgICogVGhpcyBwcmV2ZW50cyBqZXJreS9zdHV0dGVyeSBtb3VzZS13aGVlbCBzY3JvbGxpbmcuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ19lbmFibGVQb2ludGVyRXZlbnRzQWZ0ZXJEZWxheScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9lbmFibGVQb2ludGVyRXZlbnRzQWZ0ZXJEZWxheSgpIHtcbiAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICBpZiAodGhpcy5fZGlzYWJsZVBvaW50ZXJFdmVudHNUaW1lb3V0SWQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2Rpc2FibGVQb2ludGVyRXZlbnRzVGltZW91dElkKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fZGlzYWJsZVBvaW50ZXJFdmVudHNUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXM0Ll9kaXNhYmxlUG9pbnRlckV2ZW50c1RpbWVvdXRJZCA9IG51bGw7XG4gICAgICAgIF90aGlzNC5zZXRTdGF0ZSh7XG4gICAgICAgICAgaXNTY3JvbGxpbmc6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfSwgSVNfU0NST0xMSU5HX1RJTUVPVVQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19nZXRUb3RhbENvbHVtbnNXaWR0aCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRUb3RhbENvbHVtbnNXaWR0aCgpIHtcbiAgICAgIGlmICh0aGlzLl9jb2x1bW5NZXRhZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG5cbiAgICAgIHZhciBkYXR1bSA9IHRoaXMuX2NvbHVtbk1ldGFkYXRhW3RoaXMuX2NvbHVtbk1ldGFkYXRhLmxlbmd0aCAtIDFdO1xuICAgICAgcmV0dXJuIGRhdHVtLm9mZnNldCArIGRhdHVtLnNpemU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2dldFRvdGFsUm93c0hlaWdodCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRUb3RhbFJvd3NIZWlnaHQoKSB7XG4gICAgICBpZiAodGhpcy5fcm93TWV0YWRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuXG4gICAgICB2YXIgZGF0dW0gPSB0aGlzLl9yb3dNZXRhZGF0YVt0aGlzLl9yb3dNZXRhZGF0YS5sZW5ndGggLSAxXTtcbiAgICAgIHJldHVybiBkYXR1bS5vZmZzZXQgKyBkYXR1bS5zaXplO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19pbnZva2VPbkdyaWRSZW5kZXJlZEhlbHBlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9pbnZva2VPbkdyaWRSZW5kZXJlZEhlbHBlcigpIHtcbiAgICAgIHZhciBvblNlY3Rpb25SZW5kZXJlZCA9IHRoaXMucHJvcHMub25TZWN0aW9uUmVuZGVyZWQ7XG5cblxuICAgICAgdGhpcy5fb25HcmlkUmVuZGVyZWRNZW1vaXplcih7XG4gICAgICAgIGNhbGxiYWNrOiBvblNlY3Rpb25SZW5kZXJlZCxcbiAgICAgICAgaW5kaWNlczoge1xuICAgICAgICAgIGNvbHVtbk92ZXJzY2FuU3RhcnRJbmRleDogdGhpcy5fY29sdW1uU3RhcnRJbmRleCxcbiAgICAgICAgICBjb2x1bW5PdmVyc2NhblN0b3BJbmRleDogdGhpcy5fY29sdW1uU3RvcEluZGV4LFxuICAgICAgICAgIGNvbHVtblN0YXJ0SW5kZXg6IHRoaXMuX3JlbmRlcmVkQ29sdW1uU3RhcnRJbmRleCxcbiAgICAgICAgICBjb2x1bW5TdG9wSW5kZXg6IHRoaXMuX3JlbmRlcmVkQ29sdW1uU3RvcEluZGV4LFxuICAgICAgICAgIHJvd092ZXJzY2FuU3RhcnRJbmRleDogdGhpcy5fcm93U3RhcnRJbmRleCxcbiAgICAgICAgICByb3dPdmVyc2NhblN0b3BJbmRleDogdGhpcy5fcm93U3RvcEluZGV4LFxuICAgICAgICAgIHJvd1N0YXJ0SW5kZXg6IHRoaXMuX3JlbmRlcmVkUm93U3RhcnRJbmRleCxcbiAgICAgICAgICByb3dTdG9wSW5kZXg6IHRoaXMuX3JlbmRlcmVkUm93U3RvcEluZGV4XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19pbnZva2VPblNjcm9sbE1lbW9pemVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2ludm9rZU9uU2Nyb2xsTWVtb2l6ZXIoX3JlZikge1xuICAgICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gX3JlZi5zY3JvbGxMZWZ0O1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IF9yZWYuc2Nyb2xsVG9wO1xuICAgICAgdmFyIHRvdGFsQ29sdW1uc1dpZHRoID0gX3JlZi50b3RhbENvbHVtbnNXaWR0aDtcbiAgICAgIHZhciB0b3RhbFJvd3NIZWlnaHQgPSBfcmVmLnRvdGFsUm93c0hlaWdodDtcblxuICAgICAgdGhpcy5fb25TY3JvbGxNZW1vaXplcih7XG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbiBjYWxsYmFjayhfcmVmMikge1xuICAgICAgICAgIHZhciBzY3JvbGxMZWZ0ID0gX3JlZjIuc2Nyb2xsTGVmdDtcbiAgICAgICAgICB2YXIgc2Nyb2xsVG9wID0gX3JlZjIuc2Nyb2xsVG9wO1xuICAgICAgICAgIHZhciBfcHJvcHM0ID0gX3RoaXM1LnByb3BzO1xuICAgICAgICAgIHZhciBoZWlnaHQgPSBfcHJvcHM0LmhlaWdodDtcbiAgICAgICAgICB2YXIgb25TY3JvbGwgPSBfcHJvcHM0Lm9uU2Nyb2xsO1xuICAgICAgICAgIHZhciB3aWR0aCA9IF9wcm9wczQud2lkdGg7XG5cblxuICAgICAgICAgIG9uU2Nyb2xsKHtcbiAgICAgICAgICAgIGNsaWVudEhlaWdodDogaGVpZ2h0LFxuICAgICAgICAgICAgY2xpZW50V2lkdGg6IHdpZHRoLFxuICAgICAgICAgICAgc2Nyb2xsSGVpZ2h0OiB0b3RhbFJvd3NIZWlnaHQsXG4gICAgICAgICAgICBzY3JvbGxMZWZ0OiBzY3JvbGxMZWZ0LFxuICAgICAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxUb3AsXG4gICAgICAgICAgICBzY3JvbGxXaWR0aDogdG90YWxDb2x1bW5zV2lkdGhcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5kaWNlczoge1xuICAgICAgICAgIHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsXG4gICAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxUb3BcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgc3RhdGUgZHVyaW5nIHRoZSBuZXh0IGFuaW1hdGlvbiBmcmFtZS5cbiAgICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gYXZvaWQgbXVsdGlwbGUgcmVuZGVycyBpbiBhIHNtYWxsIHNwYW4gb2YgdGltZS5cbiAgICAgKiBUaGlzIGhlbHBzIHBlcmZvcm1hbmNlIGZvciBidXJzdHkgZXZlbnRzIChsaWtlIG9uU2Nyb2xsKS5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnX3NldE5leHRTdGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9zZXROZXh0U3RhdGUoc3RhdGUpIHtcbiAgICAgIHZhciBfdGhpczYgPSB0aGlzO1xuXG4gICAgICBpZiAodGhpcy5fc2V0TmV4dFN0YXRlQW5pbWF0aW9uRnJhbWVJZCkge1xuICAgICAgICBfcmFmMi5kZWZhdWx0LmNhbmNlbCh0aGlzLl9zZXROZXh0U3RhdGVBbmltYXRpb25GcmFtZUlkKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fc2V0TmV4dFN0YXRlQW5pbWF0aW9uRnJhbWVJZCA9ICgwLCBfcmFmMi5kZWZhdWx0KShmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzNi5fc2V0TmV4dFN0YXRlQW5pbWF0aW9uRnJhbWVJZCA9IG51bGw7XG4gICAgICAgIF90aGlzNi5zZXRTdGF0ZShzdGF0ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfc2V0U2Nyb2xsUG9zaXRpb24nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfc2V0U2Nyb2xsUG9zaXRpb24oX3JlZjMpIHtcbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gX3JlZjMuc2Nyb2xsTGVmdDtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfcmVmMy5zY3JvbGxUb3A7XG5cbiAgICAgIHZhciBuZXdTdGF0ZSA9IHtcbiAgICAgICAgc2Nyb2xsUG9zaXRpb25DaGFuZ2VSZWFzb246IFNDUk9MTF9QT1NJVElPTl9DSEFOR0VfUkVBU09OUy5SRVFVRVNURURcbiAgICAgIH07XG5cbiAgICAgIGlmIChzY3JvbGxMZWZ0ID49IDApIHtcbiAgICAgICAgbmV3U3RhdGUuc2Nyb2xsTGVmdCA9IHNjcm9sbExlZnQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChzY3JvbGxUb3AgPj0gMCkge1xuICAgICAgICBuZXdTdGF0ZS5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7XG4gICAgICB9XG5cbiAgICAgIGlmIChzY3JvbGxMZWZ0ID49IDAgJiYgc2Nyb2xsTGVmdCAhPT0gdGhpcy5zdGF0ZS5zY3JvbGxMZWZ0IHx8IHNjcm9sbFRvcCA+PSAwICYmIHNjcm9sbFRvcCAhPT0gdGhpcy5zdGF0ZS5zY3JvbGxUb3ApIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX3VwZGF0ZVNjcm9sbExlZnRGb3JTY3JvbGxUb0NvbHVtbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF91cGRhdGVTY3JvbGxMZWZ0Rm9yU2Nyb2xsVG9Db2x1bW4oKSB7XG4gICAgICB2YXIgcHJvcHMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyBudWxsIDogYXJndW1lbnRzWzBdO1xuICAgICAgdmFyIHN0YXRlID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGFyZ3VtZW50c1sxXTtcblxuICAgICAgdmFyIF9yZWY0ID0gcHJvcHMgfHwgdGhpcy5wcm9wcztcblxuICAgICAgdmFyIGNvbHVtbnNDb3VudCA9IF9yZWY0LmNvbHVtbnNDb3VudDtcbiAgICAgIHZhciBzY3JvbGxUb0NvbHVtbiA9IF9yZWY0LnNjcm9sbFRvQ29sdW1uO1xuICAgICAgdmFyIHdpZHRoID0gX3JlZjQud2lkdGg7XG5cbiAgICAgIHZhciBfcmVmNSA9IHN0YXRlIHx8IHRoaXMuc3RhdGU7XG5cbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gX3JlZjUuc2Nyb2xsTGVmdDtcblxuXG4gICAgICBpZiAoc2Nyb2xsVG9Db2x1bW4gPj0gMCAmJiBjb2x1bW5zQ291bnQgPiAwKSB7XG4gICAgICAgIHZhciB0YXJnZXRJbmRleCA9ICgwLCBfZ2V0TmVhcmVzdEluZGV4Mi5kZWZhdWx0KSh7XG4gICAgICAgICAgY2VsbENvdW50OiB0aGlzLl9jb2x1bW5NZXRhZGF0YS5sZW5ndGgsXG4gICAgICAgICAgdGFyZ2V0SW5kZXg6IHNjcm9sbFRvQ29sdW1uXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBjb2x1bW5NZXRhZGF0YSA9IHRoaXMuX2NvbHVtbk1ldGFkYXRhW3RhcmdldEluZGV4XTtcblxuICAgICAgICB2YXIgY2FsY3VsYXRlZFNjcm9sbExlZnQgPSAoMCwgX2dldFVwZGF0ZWRPZmZzZXRGb3JJbmRleDIuZGVmYXVsdCkoe1xuICAgICAgICAgIGNlbGxPZmZzZXQ6IGNvbHVtbk1ldGFkYXRhLm9mZnNldCxcbiAgICAgICAgICBjZWxsU2l6ZTogY29sdW1uTWV0YWRhdGEuc2l6ZSxcbiAgICAgICAgICBjb250YWluZXJTaXplOiB3aWR0aCxcbiAgICAgICAgICBjdXJyZW50T2Zmc2V0OiBzY3JvbGxMZWZ0LFxuICAgICAgICAgIHRhcmdldEluZGV4OiBzY3JvbGxUb0NvbHVtblxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoc2Nyb2xsTGVmdCAhPT0gY2FsY3VsYXRlZFNjcm9sbExlZnQpIHtcbiAgICAgICAgICB0aGlzLl9zZXRTY3JvbGxQb3NpdGlvbih7XG4gICAgICAgICAgICBzY3JvbGxMZWZ0OiBjYWxjdWxhdGVkU2Nyb2xsTGVmdFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX3VwZGF0ZVNjcm9sbFRvcEZvclNjcm9sbFRvUm93JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3VwZGF0ZVNjcm9sbFRvcEZvclNjcm9sbFRvUm93KCkge1xuICAgICAgdmFyIHByb3BzID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGFyZ3VtZW50c1swXTtcbiAgICAgIHZhciBzdGF0ZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IG51bGwgOiBhcmd1bWVudHNbMV07XG5cbiAgICAgIHZhciBfcmVmNiA9IHByb3BzIHx8IHRoaXMucHJvcHM7XG5cbiAgICAgIHZhciBoZWlnaHQgPSBfcmVmNi5oZWlnaHQ7XG4gICAgICB2YXIgcm93c0NvdW50ID0gX3JlZjYucm93c0NvdW50O1xuICAgICAgdmFyIHNjcm9sbFRvUm93ID0gX3JlZjYuc2Nyb2xsVG9Sb3c7XG5cbiAgICAgIHZhciBfcmVmNyA9IHN0YXRlIHx8IHRoaXMuc3RhdGU7XG5cbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfcmVmNy5zY3JvbGxUb3A7XG5cblxuICAgICAgaWYgKHNjcm9sbFRvUm93ID49IDAgJiYgcm93c0NvdW50ID4gMCkge1xuICAgICAgICB2YXIgdGFyZ2V0SW5kZXggPSAoMCwgX2dldE5lYXJlc3RJbmRleDIuZGVmYXVsdCkoe1xuICAgICAgICAgIGNlbGxDb3VudDogdGhpcy5fcm93TWV0YWRhdGEubGVuZ3RoLFxuICAgICAgICAgIHRhcmdldEluZGV4OiBzY3JvbGxUb1Jvd1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgcm93TWV0YWRhdGEgPSB0aGlzLl9yb3dNZXRhZGF0YVt0YXJnZXRJbmRleF07XG5cbiAgICAgICAgdmFyIGNhbGN1bGF0ZWRTY3JvbGxUb3AgPSAoMCwgX2dldFVwZGF0ZWRPZmZzZXRGb3JJbmRleDIuZGVmYXVsdCkoe1xuICAgICAgICAgIGNlbGxPZmZzZXQ6IHJvd01ldGFkYXRhLm9mZnNldCxcbiAgICAgICAgICBjZWxsU2l6ZTogcm93TWV0YWRhdGEuc2l6ZSxcbiAgICAgICAgICBjb250YWluZXJTaXplOiBoZWlnaHQsXG4gICAgICAgICAgY3VycmVudE9mZnNldDogc2Nyb2xsVG9wLFxuICAgICAgICAgIHRhcmdldEluZGV4OiBzY3JvbGxUb1Jvd1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoc2Nyb2xsVG9wICE9PSBjYWxjdWxhdGVkU2Nyb2xsVG9wKSB7XG4gICAgICAgICAgdGhpcy5fc2V0U2Nyb2xsUG9zaXRpb24oe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiBjYWxjdWxhdGVkU2Nyb2xsVG9wXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25TY3JvbGwnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25TY3JvbGwoZXZlbnQpIHtcbiAgICAgIC8vIEluIGNlcnRhaW4gZWRnZS1jYXNlcyBSZWFjdCBkaXNwYXRjaGVzIGFuIG9uU2Nyb2xsIGV2ZW50IHdpdGggYW4gaW52YWxpZCB0YXJnZXQuc2Nyb2xsTGVmdCAvIHRhcmdldC5zY3JvbGxUb3AuXG4gICAgICAvLyBUaGlzIGludmFsaWQgZXZlbnQgY2FuIGJlIGRldGVjdGVkIGJ5IGNvbXBhcmluZyBldmVudC50YXJnZXQgdG8gdGhpcyBjb21wb25lbnQncyBzY3JvbGxhYmxlIERPTSBlbGVtZW50LlxuICAgICAgLy8gU2VlIGlzc3VlICM0MDQgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAgICBpZiAoZXZlbnQudGFyZ2V0ICE9PSB0aGlzLnJlZnMuc2Nyb2xsaW5nQ29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUHJldmVudCBwb2ludGVyIGV2ZW50cyBmcm9tIGludGVycnVwdGluZyBhIHNtb290aCBzY3JvbGxcbiAgICAgIHRoaXMuX2VuYWJsZVBvaW50ZXJFdmVudHNBZnRlckRlbGF5KCk7XG5cbiAgICAgIC8vIFdoZW4gdGhpcyBjb21wb25lbnQgaXMgc2hydW5rIGRyYXN0aWNhbGx5LCBSZWFjdCBkaXNwYXRjaGVzIGEgc2VyaWVzIG9mIGJhY2stdG8tYmFjayBzY3JvbGwgZXZlbnRzLFxuICAgICAgLy8gR3JhZHVhbGx5IGNvbnZlcmdpbmcgb24gYSBzY3JvbGxUb3AgdGhhdCBpcyB3aXRoaW4gdGhlIGJvdW5kcyBvZiB0aGUgbmV3LCBzbWFsbGVyIGhlaWdodC5cbiAgICAgIC8vIFRoaXMgY2F1c2VzIGEgc2VyaWVzIG9mIHJhcGlkIHJlbmRlcnMgdGhhdCBpcyBzbG93IGZvciBsb25nIGxpc3RzLlxuICAgICAgLy8gV2UgY2FuIGF2b2lkIHRoYXQgYnkgZG9pbmcgc29tZSBzaW1wbGUgYm91bmRzIGNoZWNraW5nIHRvIGVuc3VyZSB0aGF0IHNjcm9sbFRvcCBuZXZlciBleGNlZWRzIHRoZSB0b3RhbCBoZWlnaHQuXG4gICAgICB2YXIgX3Byb3BzNSA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgaGVpZ2h0ID0gX3Byb3BzNS5oZWlnaHQ7XG4gICAgICB2YXIgd2lkdGggPSBfcHJvcHM1LndpZHRoO1xuXG4gICAgICB2YXIgc2Nyb2xsYmFyU2l6ZSA9IHRoaXMuX3Njcm9sbGJhclNpemU7XG4gICAgICB2YXIgdG90YWxSb3dzSGVpZ2h0ID0gdGhpcy5fZ2V0VG90YWxSb3dzSGVpZ2h0KCk7XG4gICAgICB2YXIgdG90YWxDb2x1bW5zV2lkdGggPSB0aGlzLl9nZXRUb3RhbENvbHVtbnNXaWR0aCgpO1xuICAgICAgdmFyIHNjcm9sbExlZnQgPSBNYXRoLm1pbih0b3RhbENvbHVtbnNXaWR0aCAtIHdpZHRoICsgc2Nyb2xsYmFyU2l6ZSwgZXZlbnQudGFyZ2V0LnNjcm9sbExlZnQpO1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IE1hdGgubWluKHRvdGFsUm93c0hlaWdodCAtIGhlaWdodCArIHNjcm9sbGJhclNpemUsIGV2ZW50LnRhcmdldC5zY3JvbGxUb3ApO1xuXG4gICAgICAvLyBDZXJ0YWluIGRldmljZXMgKGxpa2UgQXBwbGUgdG91Y2hwYWQpIHJhcGlkLWZpcmUgZHVwbGljYXRlIGV2ZW50cy5cbiAgICAgIC8vIERvbid0IGZvcmNlIGEgcmUtcmVuZGVyIGlmIHRoaXMgaXMgdGhlIGNhc2UuXG4gICAgICAvLyBUaGUgbW91c2UgbWF5IG1vdmUgZmFzdGVyIHRoZW4gdGhlIGFuaW1hdGlvbiBmcmFtZSBkb2VzLlxuICAgICAgLy8gVXNlIHJlcXVlc3RBbmltYXRpb25GcmFtZSB0byBhdm9pZCBvdmVyLXVwZGF0aW5nLlxuICAgICAgaWYgKHRoaXMuc3RhdGUuc2Nyb2xsTGVmdCAhPT0gc2Nyb2xsTGVmdCB8fCB0aGlzLnN0YXRlLnNjcm9sbFRvcCAhPT0gc2Nyb2xsVG9wKSB7XG4gICAgICAgIC8vIEJyb3dzZXJzIHdpdGggY2FuY2VsYWJsZSBzY3JvbGwgZXZlbnRzIChlZy4gRmlyZWZveCkgaW50ZXJydXB0IHNjcm9sbGluZyBhbmltYXRpb25zIGlmIHNjcm9sbFRvcC9zY3JvbGxMZWZ0IGlzIHNldC5cbiAgICAgICAgLy8gT3RoZXIgYnJvd3NlcnMgKGVnLiBTYWZhcmkpIGRvbid0IHNjcm9sbCBhcyB3ZWxsIHdpdGhvdXQgdGhlIGhlbHAgdW5kZXIgY2VydGFpbiBjb25kaXRpb25zIChET00gb3Igc3R5bGUgY2hhbmdlcyBkdXJpbmcgc2Nyb2xsaW5nKS5cbiAgICAgICAgLy8gQWxsIHRoaW5ncyBjb25zaWRlcmVkLCB0aGlzIHNlZW1zIHRvIGJlIHRoZSBiZXN0IGN1cnJlbnQgd29yayBhcm91bmQgdGhhdCBJJ20gYXdhcmUgb2YuXG4gICAgICAgIC8vIEZvciBtb3JlIGluZm9ybWF0aW9uIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYnZhdWdobi9yZWFjdC12aXJ0dWFsaXplZC9wdWxsLzEyNFxuICAgICAgICB2YXIgc2Nyb2xsUG9zaXRpb25DaGFuZ2VSZWFzb24gPSBldmVudC5jYW5jZWxhYmxlID8gU0NST0xMX1BPU0lUSU9OX0NIQU5HRV9SRUFTT05TLk9CU0VSVkVEIDogU0NST0xMX1BPU0lUSU9OX0NIQU5HRV9SRUFTT05TLlJFUVVFU1RFRDtcblxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuaXNTY3JvbGxpbmcpIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGlzU2Nyb2xsaW5nOiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9zZXROZXh0U3RhdGUoe1xuICAgICAgICAgIGlzU2Nyb2xsaW5nOiB0cnVlLFxuICAgICAgICAgIHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsXG4gICAgICAgICAgc2Nyb2xsUG9zaXRpb25DaGFuZ2VSZWFzb246IHNjcm9sbFBvc2l0aW9uQ2hhbmdlUmVhc29uLFxuICAgICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsVG9wXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9pbnZva2VPblNjcm9sbE1lbW9pemVyKHsgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCwgc2Nyb2xsVG9wOiBzY3JvbGxUb3AsIHRvdGFsQ29sdW1uc1dpZHRoOiB0b3RhbENvbHVtbnNXaWR0aCwgdG90YWxSb3dzSGVpZ2h0OiB0b3RhbFJvd3NIZWlnaHQgfSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEdyaWQ7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG5HcmlkLnByb3BUeXBlcyA9IHtcbiAgJ2FyaWEtbGFiZWwnOiBfcmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKipcbiAgICogT3B0aW9uYWwgY3VzdG9tIENTUyBjbGFzcyBuYW1lIHRvIGF0dGFjaCB0byByb290IEdyaWQgZWxlbWVudC5cbiAgICovXG4gIGNsYXNzTmFtZTogX3JlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiBjb2x1bW5zIGluIGdyaWQuXG4gICAqL1xuICBjb2x1bW5zQ291bnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIEVpdGhlciBhIGZpeGVkIGNvbHVtbiB3aWR0aCAobnVtYmVyKSBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgd2lkdGggb2YgYSBjb2x1bW4gZ2l2ZW4gaXRzIGluZGV4LlxuICAgKiBTaG91bGQgaW1wbGVtZW50IHRoZSBmb2xsb3dpbmcgaW50ZXJmYWNlOiAoaW5kZXg6IG51bWJlcik6IG51bWJlclxuICAgKi9cbiAgY29sdW1uV2lkdGg6IF9yZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtfcmVhY3QuUHJvcFR5cGVzLm51bWJlciwgX3JlYWN0LlByb3BUeXBlcy5mdW5jXSkuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogSGVpZ2h0IG9mIEdyaWQ7IHRoaXMgcHJvcGVydHkgZGV0ZXJtaW5lcyB0aGUgbnVtYmVyIG9mIHZpc2libGUgKHZzIHZpcnR1YWxpemVkKSByb3dzLlxuICAgKi9cbiAgaGVpZ2h0OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBPcHRpb25hbCByZW5kZXJlciB0byBiZSB1c2VkIGluIHBsYWNlIG9mIHJvd3Mgd2hlbiBlaXRoZXIgOnJvd3NDb3VudCBvciA6Y29sdW1uc0NvdW50IGlzIDAuXG4gICAqL1xuICBub0NvbnRlbnRSZW5kZXJlcjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGludm9rZWQgd2hlbmV2ZXIgdGhlIHNjcm9sbCBvZmZzZXQgY2hhbmdlcyB3aXRoaW4gdGhlIGlubmVyIHNjcm9sbGFibGUgcmVnaW9uLlxuICAgKiBUaGlzIGNhbGxiYWNrIGNhbiBiZSB1c2VkIHRvIHN5bmMgc2Nyb2xsaW5nIGJldHdlZW4gbGlzdHMsIHRhYmxlcywgb3IgZ3JpZHMuXG4gICAqICh7IGNsaWVudEhlaWdodCwgY2xpZW50V2lkdGgsIHNjcm9sbEhlaWdodCwgc2Nyb2xsTGVmdCwgc2Nyb2xsVG9wLCBzY3JvbGxXaWR0aCB9KTogdm9pZFxuICAgKi9cbiAgb25TY3JvbGw6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBpbnZva2VkIHdpdGggaW5mb3JtYXRpb24gYWJvdXQgdGhlIHNlY3Rpb24gb2YgdGhlIEdyaWQgdGhhdCB3YXMganVzdCByZW5kZXJlZC5cbiAgICogKHsgY29sdW1uU3RhcnRJbmRleCwgY29sdW1uU3RvcEluZGV4LCByb3dTdGFydEluZGV4LCByb3dTdG9wSW5kZXggfSk6IHZvaWRcbiAgICovXG4gIG9uU2VjdGlvblJlbmRlcmVkOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogTnVtYmVyIG9mIGNvbHVtbnMgdG8gcmVuZGVyIGJlZm9yZS9hZnRlciB0aGUgdmlzaWJsZSBzZWN0aW9uIG9mIHRoZSBncmlkLlxuICAgKiBUaGVzZSBjb2x1bW5zIGNhbiBoZWxwIGZvciBzbW9vdGhlciBzY3JvbGxpbmcgb24gdG91Y2ggZGV2aWNlcyBvciBicm93c2VycyB0aGF0IHNlbmQgc2Nyb2xsIGV2ZW50cyBpbmZyZXF1ZW50bHkuXG4gICAqL1xuICBvdmVyc2NhbkNvbHVtbnNDb3VudDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogTnVtYmVyIG9mIHJvd3MgdG8gcmVuZGVyIGFib3ZlL2JlbG93IHRoZSB2aXNpYmxlIHNlY3Rpb24gb2YgdGhlIGdyaWQuXG4gICAqIFRoZXNlIHJvd3MgY2FuIGhlbHAgZm9yIHNtb290aGVyIHNjcm9sbGluZyBvbiB0b3VjaCBkZXZpY2VzIG9yIGJyb3dzZXJzIHRoYXQgc2VuZCBzY3JvbGwgZXZlbnRzIGluZnJlcXVlbnRseS5cbiAgICovXG4gIG92ZXJzY2FuUm93c0NvdW50OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBSZXNwb25zaWJsZSBmb3IgcmVuZGVyaW5nIGEgY2VsbCBnaXZlbiBhbiByb3cgYW5kIGNvbHVtbiBpbmRleC5cbiAgICogU2hvdWxkIGltcGxlbWVudCB0aGUgZm9sbG93aW5nIGludGVyZmFjZTogKHsgY29sdW1uSW5kZXg6IG51bWJlciwgcm93SW5kZXg6IG51bWJlciB9KTogUHJvcFR5cGVzLm5vZGVcbiAgICovXG4gIHJlbmRlckNlbGw6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBSZXNwb25zaWJsZSBmb3IgcmVuZGVyaW5nIGEgZ3JvdXAgb2YgY2VsbHMgZ2l2ZW4gdGhlaXIgaW5kZXggcmFuZ2VzLlxuICAgKiBTaG91bGQgaW1wbGVtZW50IHRoZSBmb2xsb3dpbmcgaW50ZXJmYWNlOiAoe1xuICAgKiAgIGNvbHVtbk1ldGFkYXRhOkFycmF5PE9iamVjdD4sXG4gICAqICAgY29sdW1uU3RhcnRJbmRleDogbnVtYmVyLFxuICAgKiAgIGNvbHVtblN0b3BJbmRleDogbnVtYmVyLFxuICAgKiAgIHJlbmRlckNlbGw6IEZ1bmN0aW9uLFxuICAgKiAgIHJvd01ldGFkYXRhOkFycmF5PE9iamVjdD4sXG4gICAqICAgcm93U3RhcnRJbmRleDogbnVtYmVyLFxuICAgKiAgIHJvd1N0b3BJbmRleDogbnVtYmVyXG4gICAqIH0pOiBBcnJheTxQcm9wVHlwZXMubm9kZT5cbiAgICovXG4gIHJlbmRlckNlbGxSYW5nZXM6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBFaXRoZXIgYSBmaXhlZCByb3cgaGVpZ2h0IChudW1iZXIpIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBoZWlnaHQgb2YgYSByb3cgZ2l2ZW4gaXRzIGluZGV4LlxuICAgKiBTaG91bGQgaW1wbGVtZW50IHRoZSBmb2xsb3dpbmcgaW50ZXJmYWNlOiAoaW5kZXg6IG51bWJlcik6IG51bWJlclxuICAgKi9cbiAgcm93SGVpZ2h0OiBfcmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsIF9yZWFjdC5Qcm9wVHlwZXMuZnVuY10pLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiByb3dzIGluIGdyaWQuXG4gICAqL1xuICByb3dzQ291bnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqIEhvcml6b250YWwgb2Zmc2V0LiAqL1xuICBzY3JvbGxMZWZ0OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKipcbiAgICogQ29sdW1uIGluZGV4IHRvIGVuc3VyZSB2aXNpYmxlIChieSBmb3JjZWZ1bGx5IHNjcm9sbGluZyBpZiBuZWNlc3NhcnkpXG4gICAqL1xuICBzY3JvbGxUb0NvbHVtbjogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqIFZlcnRpY2FsIG9mZnNldC4gKi9cbiAgc2Nyb2xsVG9wOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKipcbiAgICogUm93IGluZGV4IHRvIGVuc3VyZSB2aXNpYmxlIChieSBmb3JjZWZ1bGx5IHNjcm9sbGluZyBpZiBuZWNlc3NhcnkpXG4gICAqL1xuICBzY3JvbGxUb1JvdzogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqXG4gICAqIFdpZHRoIG9mIEdyaWQ7IHRoaXMgcHJvcGVydHkgZGV0ZXJtaW5lcyB0aGUgbnVtYmVyIG9mIHZpc2libGUgKHZzIHZpcnR1YWxpemVkKSBjb2x1bW5zLlxuICAgKi9cbiAgd2lkdGg6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcbn07XG5HcmlkLmRlZmF1bHRQcm9wcyA9IHtcbiAgJ2FyaWEtbGFiZWwnOiAnZ3JpZCcsXG4gIG5vQ29udGVudFJlbmRlcmVyOiBmdW5jdGlvbiBub0NvbnRlbnRSZW5kZXJlcigpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgb25TY3JvbGw6IGZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBvblNlY3Rpb25SZW5kZXJlZDogZnVuY3Rpb24gb25TZWN0aW9uUmVuZGVyZWQoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIG92ZXJzY2FuQ29sdW1uc0NvdW50OiAwLFxuICBvdmVyc2NhblJvd3NDb3VudDogMTAsXG4gIHJlbmRlckNlbGxSYW5nZXM6IGRlZmF1bHRSZW5kZXJDZWxsUmFuZ2VzXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gR3JpZDtcblxuXG5mdW5jdGlvbiBkZWZhdWx0UmVuZGVyQ2VsbFJhbmdlcyhfcmVmOCkge1xuICB2YXIgY29sdW1uTWV0YWRhdGEgPSBfcmVmOC5jb2x1bW5NZXRhZGF0YTtcbiAgdmFyIGNvbHVtblN0YXJ0SW5kZXggPSBfcmVmOC5jb2x1bW5TdGFydEluZGV4O1xuICB2YXIgY29sdW1uU3RvcEluZGV4ID0gX3JlZjguY29sdW1uU3RvcEluZGV4O1xuICB2YXIgcmVuZGVyQ2VsbCA9IF9yZWY4LnJlbmRlckNlbGw7XG4gIHZhciByb3dNZXRhZGF0YSA9IF9yZWY4LnJvd01ldGFkYXRhO1xuICB2YXIgcm93U3RhcnRJbmRleCA9IF9yZWY4LnJvd1N0YXJ0SW5kZXg7XG4gIHZhciByb3dTdG9wSW5kZXggPSBfcmVmOC5yb3dTdG9wSW5kZXg7XG5cbiAgdmFyIHJlbmRlcmVkQ2VsbHMgPSBbXTtcblxuICBmb3IgKHZhciByb3dJbmRleCA9IHJvd1N0YXJ0SW5kZXg7IHJvd0luZGV4IDw9IHJvd1N0b3BJbmRleDsgcm93SW5kZXgrKykge1xuICAgIHZhciByb3dEYXR1bSA9IHJvd01ldGFkYXRhW3Jvd0luZGV4XTtcblxuICAgIGZvciAodmFyIGNvbHVtbkluZGV4ID0gY29sdW1uU3RhcnRJbmRleDsgY29sdW1uSW5kZXggPD0gY29sdW1uU3RvcEluZGV4OyBjb2x1bW5JbmRleCsrKSB7XG4gICAgICB2YXIgY29sdW1uRGF0dW0gPSBjb2x1bW5NZXRhZGF0YVtjb2x1bW5JbmRleF07XG4gICAgICB2YXIgcmVuZGVyZWRDZWxsID0gcmVuZGVyQ2VsbCh7IGNvbHVtbkluZGV4OiBjb2x1bW5JbmRleCwgcm93SW5kZXg6IHJvd0luZGV4IH0pO1xuICAgICAgdmFyIGtleSA9IHJvd0luZGV4ICsgJy0nICsgY29sdW1uSW5kZXg7XG5cbiAgICAgIGlmIChyZW5kZXJlZENlbGwgPT0gbnVsbCB8fCByZW5kZXJlZENlbGwgPT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgY2hpbGQgPSBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHtcbiAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICBjbGFzc05hbWU6ICdHcmlkX19jZWxsJyxcbiAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgaGVpZ2h0OiByb3dEYXR1bS5zaXplLFxuICAgICAgICAgICAgbGVmdDogY29sdW1uRGF0dW0ub2Zmc2V0LFxuICAgICAgICAgICAgdG9wOiByb3dEYXR1bS5vZmZzZXQsXG4gICAgICAgICAgICB3aWR0aDogY29sdW1uRGF0dW0uc2l6ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcmVuZGVyZWRDZWxsXG4gICAgICApO1xuXG4gICAgICByZW5kZXJlZENlbGxzLnB1c2goY2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZW5kZXJlZENlbGxzO1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuR3JpZCA9IGV4cG9ydHMuZGVmYXVsdCA9IHVuZGVmaW5lZDtcblxudmFyIF9HcmlkMiA9IHJlcXVpcmUoJy4vR3JpZCcpO1xuXG52YXIgX0dyaWQzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfR3JpZDIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfR3JpZDMuZGVmYXVsdDtcbmV4cG9ydHMuR3JpZCA9IF9HcmlkMy5kZWZhdWx0OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNhbGN1bGF0ZVNpemVBbmRQb3NpdGlvbkRhdGFBbmRVcGRhdGVTY3JvbGxPZmZzZXQ7XG4vKipcbiAqIEhlbHBlciBtZXRob2QgdGhhdCBkZXRlcm1pbmVzIHdoZW4gdG8gcmVjYWxjdWxhdGUgcm93IG9yIGNvbHVtbiBtZXRhZGF0YS5cbiAqXG4gKiBAcGFyYW0gY2VsbENvdW50IE51bWJlciBvZiByb3dzIG9yIGNvbHVtbnMgaW4gdGhlIGN1cnJlbnQgYXhpc1xuICogQHBhcmFtIGNlbGxzU2l6ZSBXaWR0aCBvciBoZWlnaHQgb2YgY2VsbHMgZm9yIHRoZSBjdXJyZW50IGF4aXNcbiAqIEBwYXJhbSBjb21wdXRlTWV0YWRhdGFDYWxsYmFjayBNZXRob2QgdG8gaW52b2tlIGlmIGNlbGwgbWV0YWRhdGEgc2hvdWxkIGJlIHJlY2FsY3VsYXRlZFxuICogQHBhcmFtIGNvbXB1dGVNZXRhZGF0YUNhbGxiYWNrUHJvcHMgUGFyYW1ldGVycyB0byBwYXNzIHRvIDpjb21wdXRlTWV0YWRhdGFDYWxsYmFja1xuICogQHBhcmFtIGNvbXB1dGVNZXRhZGF0YU9uTmV4dFVwZGF0ZSBGbGFnIHNwZWNpZnlpbmcgdGhhdCBtZXRhZGF0YSBzaG91bGQgYmUgcmVjYWxjdWxhdGVkXG4gKiBAcGFyYW0gbmV4dENlbGxzQ291bnQgTmV3bHkgdXBkYXRlZCBudW1iZXIgb2Ygcm93cyBvciBjb2x1bW5zIGluIHRoZSBjdXJyZW50IGF4aXNcbiAqIEBwYXJhbSBuZXh0Q2VsbHNTaXplIE5ld2x5IHVwZGF0ZWQgd2lkdGggb3IgaGVpZ2h0IG9mIGNlbGxzIGZvciB0aGUgY3VycmVudCBheGlzXG4gKiBAcGFyYW0gbmV4dFNjcm9sbFRvSW5kZXggTmV3bHkgdXBkYXRlZCBzY3JvbGwtdG8taW5kZXhcbiAqIEBwYXJhbSBzY3JvbGxUb0luZGV4IFNjcm9sbC10by1pbmRleFxuICogQHBhcmFtIHVwZGF0ZVNjcm9sbE9mZnNldEZvclNjcm9sbFRvSW5kZXggQ2FsbGJhY2sgdG8gaW52b2tlIGlmIHRoZSBzY3JvbGwgcG9zaXRpb24gc2hvdWxkIGJlIHJlY2FsY3VsYXRlZFxuICovXG5mdW5jdGlvbiBjYWxjdWxhdGVTaXplQW5kUG9zaXRpb25EYXRhQW5kVXBkYXRlU2Nyb2xsT2Zmc2V0KF9yZWYpIHtcbiAgdmFyIGNlbGxDb3VudCA9IF9yZWYuY2VsbENvdW50O1xuICB2YXIgY2VsbFNpemUgPSBfcmVmLmNlbGxTaXplO1xuICB2YXIgY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2sgPSBfcmVmLmNvbXB1dGVNZXRhZGF0YUNhbGxiYWNrO1xuICB2YXIgY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2tQcm9wcyA9IF9yZWYuY29tcHV0ZU1ldGFkYXRhQ2FsbGJhY2tQcm9wcztcbiAgdmFyIGNvbXB1dGVNZXRhZGF0YU9uTmV4dFVwZGF0ZSA9IF9yZWYuY29tcHV0ZU1ldGFkYXRhT25OZXh0VXBkYXRlO1xuICB2YXIgbmV4dENlbGxzQ291bnQgPSBfcmVmLm5leHRDZWxsc0NvdW50O1xuICB2YXIgbmV4dENlbGxTaXplID0gX3JlZi5uZXh0Q2VsbFNpemU7XG4gIHZhciBuZXh0U2Nyb2xsVG9JbmRleCA9IF9yZWYubmV4dFNjcm9sbFRvSW5kZXg7XG4gIHZhciBzY3JvbGxUb0luZGV4ID0gX3JlZi5zY3JvbGxUb0luZGV4O1xuICB2YXIgdXBkYXRlU2Nyb2xsT2Zmc2V0Rm9yU2Nyb2xsVG9JbmRleCA9IF9yZWYudXBkYXRlU2Nyb2xsT2Zmc2V0Rm9yU2Nyb2xsVG9JbmRleDtcblxuICAvLyBEb24ndCBjb21wYXJlIGNlbGwgc2l6ZXMgaWYgdGhleSBhcmUgZnVuY3Rpb25zIGJlY2F1c2UgaW5saW5lIGZ1bmN0aW9ucyB3b3VsZCBjYXVzZSBpbmZpbml0ZSBsb29wcy5cbiAgLy8gSW4gdGhhdCBldmVudCB1c2VycyBzaG91bGQgdXNlIHRoZSBtYW51YWwgcmVjb21wdXRlIG1ldGhvZHMgdG8gaW5mb3JtIG9mIGNoYW5nZXMuXG4gIGlmIChjb21wdXRlTWV0YWRhdGFPbk5leHRVcGRhdGUgfHwgY2VsbENvdW50ICE9PSBuZXh0Q2VsbHNDb3VudCB8fCAodHlwZW9mIGNlbGxTaXplID09PSAnbnVtYmVyJyB8fCB0eXBlb2YgbmV4dENlbGxTaXplID09PSAnbnVtYmVyJykgJiYgY2VsbFNpemUgIT09IG5leHRDZWxsU2l6ZSkge1xuICAgIGNvbXB1dGVNZXRhZGF0YUNhbGxiYWNrKGNvbXB1dGVNZXRhZGF0YUNhbGxiYWNrUHJvcHMpO1xuXG4gICAgLy8gVXBkYXRlZCBjZWxsIG1ldGFkYXRhIG1heSBoYXZlIGhpZGRlbiB0aGUgcHJldmlvdXMgc2Nyb2xsZWQtdG8gaXRlbS5cbiAgICAvLyBJbiB0aGlzIGNhc2Ugd2Ugc2hvdWxkIGFsc28gdXBkYXRlIHRoZSBzY3JvbGxUb3AgdG8gZW5zdXJlIGl0IHN0YXlzIHZpc2libGUuXG4gICAgaWYgKHNjcm9sbFRvSW5kZXggPj0gMCAmJiBzY3JvbGxUb0luZGV4ID09PSBuZXh0U2Nyb2xsVG9JbmRleCkge1xuICAgICAgdXBkYXRlU2Nyb2xsT2Zmc2V0Rm9yU2Nyb2xsVG9JbmRleCgpO1xuICAgIH1cbiAgfVxufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0TmVhcmVzdEluZGV4O1xuLyoqXG4gKiBGaW5kcyB0aGUgbmVhcmVzdCB2YWxpZCBpbmRleCB0byB0aGUgb25lIHNwZWNpZmllZCBpZiB0aGUgc3BlY2lmaWVkIGluZGV4IGlzIGludmFsaWQuXG4gKiBAcGFyYW0gY2VsbENvdW50IE51bWJlciBvZiByb3dzIG9yIGNvbHVtbnMgaW4gdGhlIGN1cnJlbnQgYXhpc1xuICogQHBhcmFtIHRhcmdldEluZGV4IEluZGV4IHRvIHVzZSBpZiBwb3NzaWJsZVxuICovXG5mdW5jdGlvbiBnZXROZWFyZXN0SW5kZXgoX3JlZikge1xuICB2YXIgY2VsbENvdW50ID0gX3JlZi5jZWxsQ291bnQ7XG4gIHZhciB0YXJnZXRJbmRleCA9IF9yZWYudGFyZ2V0SW5kZXg7XG5cbiAgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWluKGNlbGxDb3VudCAtIDEsIHRhcmdldEluZGV4KSk7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBnZXRPdmVyc2NhbkluZGljZXM7XG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIG51bWJlciBvZiBjZWxscyB0byBvdmVyc2NhbiBiZWZvcmUgYW5kIGFmdGVyIGEgc3BlY2lmaWVkIHJhbmdlLlxuICogVGhpcyBmdW5jdGlvbiBlbnN1cmVzIHRoYXQgb3ZlcnNjYW5uaW5nIGRvZXNuJ3QgZXhjZWVkIHRoZSBhdmFpbGFibGUgY2VsbHMuXG4gKiBAcGFyYW0gY2VsbENvdW50IE51bWJlciBvZiByb3dzIG9yIGNvbHVtbnMgaW4gdGhlIGN1cnJlbnQgYXhpc1xuICogQHBhcmFtIG92ZXJzY2FuQ2VsbHNDb3VudCBNYXhpbXVtIG51bWJlciBvZiBjZWxscyB0byBvdmVyLXJlbmRlciBpbiBlaXRoZXIgZGlyZWN0aW9uXG4gKiBAcGFyYW0gc3RhcnRJbmRleCBCZWdpbiBvZiByYW5nZSBvZiB2aXNpYmxlIGNlbGxzXG4gKiBAcGFyYW0gc3RvcEluZGV4IEVuZCBvZiByYW5nZSBvZiB2aXNpYmxlIGNlbGxzXG4gKi9cbmZ1bmN0aW9uIGdldE92ZXJzY2FuSW5kaWNlcyhfcmVmKSB7XG4gIHZhciBjZWxsQ291bnQgPSBfcmVmLmNlbGxDb3VudDtcbiAgdmFyIG92ZXJzY2FuQ2VsbHNDb3VudCA9IF9yZWYub3ZlcnNjYW5DZWxsc0NvdW50O1xuICB2YXIgc3RhcnRJbmRleCA9IF9yZWYuc3RhcnRJbmRleDtcbiAgdmFyIHN0b3BJbmRleCA9IF9yZWYuc3RvcEluZGV4O1xuXG4gIHJldHVybiB7XG4gICAgb3ZlcnNjYW5TdGFydEluZGV4OiBNYXRoLm1heCgwLCBzdGFydEluZGV4IC0gb3ZlcnNjYW5DZWxsc0NvdW50KSxcbiAgICBvdmVyc2NhblN0b3BJbmRleDogTWF0aC5taW4oY2VsbENvdW50IC0gMSwgc3RvcEluZGV4ICsgb3ZlcnNjYW5DZWxsc0NvdW50KVxuICB9O1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0VmlzaWJsZUNlbGxJbmRpY2VzO1xuLyoqXG4gKiBEZXRlcm1pbmVzIHRoZSByYW5nZSBvZiBjZWxscyB0byBkaXNwbGF5IGZvciBhIGdpdmVuIG9mZnNldCBpbiBvcmRlciB0byBmaWxsIHRoZSBzcGVjaWZpZWQgY29udGFpbmVyLlxuICpcbiAqIEBwYXJhbSBjZWxsTWV0YWRhdGEgTWV0YWRhdGEgaW5pdGlhbGx5IGNvbXB1dGVkIGJ5IGluaXRDZWxsTWV0YWRhdGEoKVxuICogQHBhcmFtIGNvbnRhaW5lclNpemUgVG90YWwgc2l6ZSAod2lkdGggb3IgaGVpZ2h0KSBvZiB0aGUgY29udGFpbmVyXG4gKiBAcGFyYW0gY3VycmVudE9mZnNldCBDb250YWluZXIncyBjdXJyZW50ICh4IG9yIHkpIG9mZnNldFxuICogQHJldHVybiBBbiBvYmplY3QgY29udGFpbmluZyA6c3RhcnQgYW5kIDpzdG9wIGF0dHJpYnV0ZXMsIGVhY2ggc3BlY2lmeWluZyBhIGNlbGwgaW5kZXhcbiAqL1xuZnVuY3Rpb24gZ2V0VmlzaWJsZUNlbGxJbmRpY2VzKF9yZWYpIHtcbiAgdmFyIGNlbGxNZXRhZGF0YSA9IF9yZWYuY2VsbE1ldGFkYXRhO1xuICB2YXIgY29udGFpbmVyU2l6ZSA9IF9yZWYuY29udGFpbmVyU2l6ZTtcbiAgdmFyIGN1cnJlbnRPZmZzZXQgPSBfcmVmLmN1cnJlbnRPZmZzZXQ7XG5cbiAgdmFyIGNlbGxDb3VudCA9IGNlbGxNZXRhZGF0YS5sZW5ndGg7XG5cbiAgaWYgKGNlbGxDb3VudCA9PT0gMCkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8vIFRPRE8gQWRkIGJldHRlciBndWFyZHMgaGVyZSBhZ2FpbnN0IE5hTiBvZmZzZXRcblxuICB2YXIgbGFzdERhdHVtID0gY2VsbE1ldGFkYXRhW2NlbGxNZXRhZGF0YS5sZW5ndGggLSAxXTtcbiAgdmFyIHRvdGFsQ2VsbFNpemUgPSBsYXN0RGF0dW0ub2Zmc2V0ICsgbGFzdERhdHVtLnNpemU7XG5cbiAgLy8gRW5zdXJlIG9mZnNldCBpcyB3aXRoaW4gcmVhc29uYWJsZSBib3VuZHNcbiAgY3VycmVudE9mZnNldCA9IE1hdGgubWF4KDAsIE1hdGgubWluKHRvdGFsQ2VsbFNpemUgLSBjb250YWluZXJTaXplLCBjdXJyZW50T2Zmc2V0KSk7XG5cbiAgdmFyIG1heE9mZnNldCA9IE1hdGgubWluKHRvdGFsQ2VsbFNpemUsIGN1cnJlbnRPZmZzZXQgKyBjb250YWluZXJTaXplKTtcblxuICB2YXIgc3RhcnQgPSBmaW5kTmVhcmVzdENlbGwoe1xuICAgIGNlbGxNZXRhZGF0YTogY2VsbE1ldGFkYXRhLFxuICAgIG1vZGU6IEVRVUFMX09SX0xPV0VSLFxuICAgIG9mZnNldDogY3VycmVudE9mZnNldFxuICB9KTtcblxuICB2YXIgZGF0dW0gPSBjZWxsTWV0YWRhdGFbc3RhcnRdO1xuICBjdXJyZW50T2Zmc2V0ID0gZGF0dW0ub2Zmc2V0ICsgZGF0dW0uc2l6ZTtcblxuICB2YXIgc3RvcCA9IHN0YXJ0O1xuXG4gIHdoaWxlIChjdXJyZW50T2Zmc2V0IDwgbWF4T2Zmc2V0ICYmIHN0b3AgPCBjZWxsQ291bnQgLSAxKSB7XG4gICAgc3RvcCsrO1xuXG4gICAgY3VycmVudE9mZnNldCArPSBjZWxsTWV0YWRhdGFbc3RvcF0uc2l6ZTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc3RhcnQ6IHN0YXJ0LFxuICAgIHN0b3A6IHN0b3BcbiAgfTtcbn1cblxuLyoqXG4gKiBCaW5hcnkgc2VhcmNoIGZ1bmN0aW9uIGluc3BpcmVkIGJ5IHJlYWN0LWluZmluaXRlLlxuICovXG5mdW5jdGlvbiBmaW5kTmVhcmVzdENlbGwoX3JlZjIpIHtcbiAgdmFyIGNlbGxNZXRhZGF0YSA9IF9yZWYyLmNlbGxNZXRhZGF0YTtcbiAgdmFyIG1vZGUgPSBfcmVmMi5tb2RlO1xuICB2YXIgb2Zmc2V0ID0gX3JlZjIub2Zmc2V0O1xuXG4gIHZhciBoaWdoID0gY2VsbE1ldGFkYXRhLmxlbmd0aCAtIDE7XG4gIHZhciBsb3cgPSAwO1xuICB2YXIgbWlkZGxlID0gdW5kZWZpbmVkO1xuICB2YXIgY3VycmVudE9mZnNldCA9IHVuZGVmaW5lZDtcblxuICAvLyBUT0RPIEFkZCBiZXR0ZXIgZ3VhcmRzIGhlcmUgYWdhaW5zdCBOYU4gb2Zmc2V0XG5cbiAgd2hpbGUgKGxvdyA8PSBoaWdoKSB7XG4gICAgbWlkZGxlID0gbG93ICsgTWF0aC5mbG9vcigoaGlnaCAtIGxvdykgLyAyKTtcbiAgICBjdXJyZW50T2Zmc2V0ID0gY2VsbE1ldGFkYXRhW21pZGRsZV0ub2Zmc2V0O1xuXG4gICAgaWYgKGN1cnJlbnRPZmZzZXQgPT09IG9mZnNldCkge1xuICAgICAgcmV0dXJuIG1pZGRsZTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRPZmZzZXQgPCBvZmZzZXQpIHtcbiAgICAgIGxvdyA9IG1pZGRsZSArIDE7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50T2Zmc2V0ID4gb2Zmc2V0KSB7XG4gICAgICBoaWdoID0gbWlkZGxlIC0gMTtcbiAgICB9XG4gIH1cblxuICBpZiAobW9kZSA9PT0gRVFVQUxfT1JfTE9XRVIgJiYgbG93ID4gMCkge1xuICAgIHJldHVybiBsb3cgLSAxO1xuICB9IGVsc2UgaWYgKG1vZGUgPT09IEVRVUFMX09SX0hJR0hFUiAmJiBoaWdoIDwgY2VsbE1ldGFkYXRhLmxlbmd0aCAtIDEpIHtcbiAgICByZXR1cm4gaGlnaCArIDE7XG4gIH1cbn1cblxudmFyIEVRVUFMX09SX0xPV0VSID0gMTtcbnZhciBFUVVBTF9PUl9ISUdIRVIgPSAyOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHVwZGF0ZVNjcm9sbEluZGV4SGVscGVyO1xuXG52YXIgX2dldE5lYXJlc3RJbmRleCA9IHJlcXVpcmUoJy4vZ2V0TmVhcmVzdEluZGV4Jyk7XG5cbnZhciBfZ2V0TmVhcmVzdEluZGV4MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldE5lYXJlc3RJbmRleCk7XG5cbnZhciBfZ2V0VXBkYXRlZE9mZnNldEZvckluZGV4ID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvZ2V0VXBkYXRlZE9mZnNldEZvckluZGV4Jyk7XG5cbnZhciBfZ2V0VXBkYXRlZE9mZnNldEZvckluZGV4MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldFVwZGF0ZWRPZmZzZXRGb3JJbmRleCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRoYXQgZGV0ZXJtaW5lcyB3aGVuIHRvIHVwZGF0ZSBzY3JvbGwgb2Zmc2V0cyB0byBlbnN1cmUgdGhhdCBhIHNjcm9sbC10by1pbmRleCByZW1haW5zIHZpc2libGUuXG4gKlxuICogQHBhcmFtIGNlbGxNZXRhZGF0YSBNZXRhZGF0YSBpbml0aWFsbHkgY29tcHV0ZWQgYnkgaW5pdENlbGxNZXRhZGF0YSgpXG4gKiBAcGFyYW0gY2VsbENvdW50IE51bWJlciBvZiByb3dzIG9yIGNvbHVtbnMgaW4gdGhlIGN1cnJlbnQgYXhpc1xuICogQHBhcmFtIGNlbGxzU2l6ZSBXaWR0aCBvciBoZWlnaHQgb2YgY2VsbHMgZm9yIHRoZSBjdXJyZW50IGF4aXNcbiAqIEBwYXJhbSBwcmV2aW91c0NlbGxzQ291bnQgUHJldmlvdXMgbnVtYmVyIG9mIHJvd3Mgb3IgY29sdW1uc1xuICogQHBhcmFtIHByZXZpb3VzQ2VsbHNTaXplIFByZXZpb3VzIHdpZHRoIG9yIGhlaWdodCBvZiBjZWxsc1xuICogQHBhcmFtIHByZXZpb3VzU2Nyb2xsVG9JbmRleCBQcmV2aW91cyBzY3JvbGwtdG8taW5kZXhcbiAqIEBwYXJhbSBwcmV2aW91c1NpemUgUHJldmlvdXMgd2lkdGggb3IgaGVpZ2h0IG9mIHRoZSB2aXJ0dWFsaXplZCBjb250YWluZXJcbiAqIEBwYXJhbSBzY3JvbGxPZmZzZXQgQ3VycmVudCBzY3JvbGxMZWZ0IG9yIHNjcm9sbFRvcFxuICogQHBhcmFtIHNjcm9sbFRvSW5kZXggU2Nyb2xsLXRvLWluZGV4XG4gKiBAcGFyYW0gc2l6ZSBXaWR0aCBvciBoZWlnaHQgb2YgdGhlIHZpcnR1YWxpemVkIGNvbnRhaW5lclxuICogQHBhcmFtIHVwZGF0ZVNjcm9sbEluZGV4Q2FsbGJhY2sgQ2FsbGJhY2sgdG8gaW52b2tlIHdpdGggYW4gc2Nyb2xsLXRvLWluZGV4IHZhbHVlXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVNjcm9sbEluZGV4SGVscGVyKF9yZWYpIHtcbiAgdmFyIGNlbGxNZXRhZGF0YSA9IF9yZWYuY2VsbE1ldGFkYXRhO1xuICB2YXIgY2VsbENvdW50ID0gX3JlZi5jZWxsQ291bnQ7XG4gIHZhciBjZWxsU2l6ZSA9IF9yZWYuY2VsbFNpemU7XG4gIHZhciBwcmV2aW91c0NlbGxzQ291bnQgPSBfcmVmLnByZXZpb3VzQ2VsbHNDb3VudDtcbiAgdmFyIHByZXZpb3VzQ2VsbFNpemUgPSBfcmVmLnByZXZpb3VzQ2VsbFNpemU7XG4gIHZhciBwcmV2aW91c1Njcm9sbFRvSW5kZXggPSBfcmVmLnByZXZpb3VzU2Nyb2xsVG9JbmRleDtcbiAgdmFyIHByZXZpb3VzU2l6ZSA9IF9yZWYucHJldmlvdXNTaXplO1xuICB2YXIgc2Nyb2xsT2Zmc2V0ID0gX3JlZi5zY3JvbGxPZmZzZXQ7XG4gIHZhciBzY3JvbGxUb0luZGV4ID0gX3JlZi5zY3JvbGxUb0luZGV4O1xuICB2YXIgc2l6ZSA9IF9yZWYuc2l6ZTtcbiAgdmFyIHVwZGF0ZVNjcm9sbEluZGV4Q2FsbGJhY2sgPSBfcmVmLnVwZGF0ZVNjcm9sbEluZGV4Q2FsbGJhY2s7XG5cbiAgdmFyIGhhc1Njcm9sbFRvSW5kZXggPSBzY3JvbGxUb0luZGV4ID49IDAgJiYgc2Nyb2xsVG9JbmRleCA8IGNlbGxDb3VudDtcbiAgdmFyIHNpemVIYXNDaGFuZ2VkID0gc2l6ZSAhPT0gcHJldmlvdXNTaXplIHx8ICFwcmV2aW91c0NlbGxTaXplIHx8IHR5cGVvZiBjZWxsU2l6ZSA9PT0gJ251bWJlcicgJiYgY2VsbFNpemUgIT09IHByZXZpb3VzQ2VsbFNpemU7XG5cbiAgLy8gSWYgd2UgaGF2ZSBhIG5ldyBzY3JvbGwgdGFyZ2V0IE9SIGlmIGhlaWdodC9yb3ctaGVpZ2h0IGhhcyBjaGFuZ2VkLFxuICAvLyBXZSBzaG91bGQgZW5zdXJlIHRoYXQgdGhlIHNjcm9sbCB0YXJnZXQgaXMgdmlzaWJsZS5cbiAgaWYgKGhhc1Njcm9sbFRvSW5kZXggJiYgKHNpemVIYXNDaGFuZ2VkIHx8IHNjcm9sbFRvSW5kZXggIT09IHByZXZpb3VzU2Nyb2xsVG9JbmRleCkpIHtcbiAgICB1cGRhdGVTY3JvbGxJbmRleENhbGxiYWNrKHNjcm9sbFRvSW5kZXgpO1xuXG4gICAgLy8gSWYgd2UgZG9uJ3QgaGF2ZSBhIHNlbGVjdGVkIGl0ZW0gYnV0IGxpc3Qgc2l6ZSBvciBudW1iZXIgb2YgY2hpbGRyZW4gaGF2ZSBkZWNyZWFzZWQsXG4gICAgLy8gTWFrZSBzdXJlIHdlIGFyZW4ndCBzY3JvbGxlZCB0b28gZmFyIHBhc3QgdGhlIGN1cnJlbnQgY29udGVudC5cbiAgfSBlbHNlIGlmICghaGFzU2Nyb2xsVG9JbmRleCAmJiBjZWxsQ291bnQgPiAwICYmIChzaXplIDwgcHJldmlvdXNTaXplIHx8IGNlbGxDb3VudCA8IHByZXZpb3VzQ2VsbHNDb3VudCkpIHtcbiAgICAgIHNjcm9sbFRvSW5kZXggPSAoMCwgX2dldE5lYXJlc3RJbmRleDIuZGVmYXVsdCkoe1xuICAgICAgICBjZWxsQ291bnQ6IGNlbGxDb3VudCxcbiAgICAgICAgdGFyZ2V0SW5kZXg6IGNlbGxDb3VudCAtIDFcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoc2Nyb2xsVG9JbmRleCA8IGNlbGxDb3VudCkge1xuICAgICAgICB2YXIgY2VsbE1ldGFkYXR1bSA9IGNlbGxNZXRhZGF0YVtzY3JvbGxUb0luZGV4XTtcbiAgICAgICAgdmFyIGNhbGN1bGF0ZWRTY3JvbGxPZmZzZXQgPSAoMCwgX2dldFVwZGF0ZWRPZmZzZXRGb3JJbmRleDIuZGVmYXVsdCkoe1xuICAgICAgICAgIGNlbGxPZmZzZXQ6IGNlbGxNZXRhZGF0dW0ub2Zmc2V0LFxuICAgICAgICAgIGNlbGxTaXplOiBjZWxsTWV0YWRhdHVtLnNpemUsXG4gICAgICAgICAgY29udGFpbmVyU2l6ZTogc2l6ZSxcbiAgICAgICAgICBjdXJyZW50T2Zmc2V0OiBzY3JvbGxPZmZzZXRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gT25seSBhZGp1c3QgdGhlIHNjcm9sbCBwb3NpdGlvbiBpZiB3ZSd2ZSBzY3JvbGxlZCBiZWxvdyB0aGUgbGFzdCBzZXQgb2Ygcm93cy5cbiAgICAgICAgaWYgKGNhbGN1bGF0ZWRTY3JvbGxPZmZzZXQgPCBzY3JvbGxPZmZzZXQpIHtcbiAgICAgICAgICB1cGRhdGVTY3JvbGxJbmRleENhbGxiYWNrKGNlbGxDb3VudCAtIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZXhwb3J0cy5pc1JhbmdlVmlzaWJsZSA9IGlzUmFuZ2VWaXNpYmxlO1xuZXhwb3J0cy5zY2FuRm9yVW5sb2FkZWRSYW5nZXMgPSBzY2FuRm9yVW5sb2FkZWRSYW5nZXM7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUgPSByZXF1aXJlKCdyZWFjdC1hZGRvbnMtc2hhbGxvdy1jb21wYXJlJyk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIEhpZ2hlci1vcmRlciBjb21wb25lbnQgdGhhdCBtYW5hZ2VzIGxhenktbG9hZGluZyBmb3IgXCJpbmZpbml0ZVwiIGRhdGEuXG4gKiBUaGlzIGNvbXBvbmVudCBkZWNvcmF0ZXMgYSB2aXJ0dWFsIGNvbXBvbmVudCBhbmQganVzdC1pbi10aW1lIHByZWZldGNoZXMgcm93cyBhcyBhIHVzZXIgc2Nyb2xscy5cbiAqIEl0IGlzIGludGVuZGVkIGFzIGEgY29udmVuaWVuY2UgY29tcG9uZW50OyBmb3JrIGl0IGlmIHlvdSdkIGxpa2UgZmluZXItZ3JhaW5lZCBjb250cm9sIG92ZXIgZGF0YS1sb2FkaW5nLlxuICovXG5cbnZhciBJbmZpbml0ZUxvYWRlciA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhJbmZpbml0ZUxvYWRlciwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gSW5maW5pdGVMb2FkZXIocHJvcHMsIGNvbnRleHQpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgSW5maW5pdGVMb2FkZXIpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKEluZmluaXRlTG9hZGVyKS5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0KSk7XG5cbiAgICBfdGhpcy5fb25Sb3dzUmVuZGVyZWQgPSBfdGhpcy5fb25Sb3dzUmVuZGVyZWQuYmluZChfdGhpcyk7XG4gICAgX3RoaXMuX3JlZ2lzdGVyQ2hpbGQgPSBfdGhpcy5fcmVnaXN0ZXJDaGlsZC5iaW5kKF90aGlzKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoSW5maW5pdGVMb2FkZXIsIFt7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIGNoaWxkcmVuID0gdGhpcy5wcm9wcy5jaGlsZHJlbjtcblxuXG4gICAgICByZXR1cm4gY2hpbGRyZW4oe1xuICAgICAgICBvblJvd3NSZW5kZXJlZDogdGhpcy5fb25Sb3dzUmVuZGVyZWQsXG4gICAgICAgIHJlZ2lzdGVyQ2hpbGQ6IHRoaXMuX3JlZ2lzdGVyQ2hpbGRcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Nob3VsZENvbXBvbmVudFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgcmV0dXJuICgwLCBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZTIuZGVmYXVsdCkodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vblJvd3NSZW5kZXJlZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblJvd3NSZW5kZXJlZChfcmVmKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdmFyIHN0YXJ0SW5kZXggPSBfcmVmLnN0YXJ0SW5kZXg7XG4gICAgICB2YXIgc3RvcEluZGV4ID0gX3JlZi5zdG9wSW5kZXg7XG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcztcbiAgICAgIHZhciBpc1Jvd0xvYWRlZCA9IF9wcm9wcy5pc1Jvd0xvYWRlZDtcbiAgICAgIHZhciBsb2FkTW9yZVJvd3MgPSBfcHJvcHMubG9hZE1vcmVSb3dzO1xuICAgICAgdmFyIG1pbmltdW1CYXRjaFNpemUgPSBfcHJvcHMubWluaW11bUJhdGNoU2l6ZTtcbiAgICAgIHZhciByb3dzQ291bnQgPSBfcHJvcHMucm93c0NvdW50O1xuICAgICAgdmFyIHRocmVzaG9sZCA9IF9wcm9wcy50aHJlc2hvbGQ7XG5cblxuICAgICAgdGhpcy5fbGFzdFJlbmRlcmVkU3RhcnRJbmRleCA9IHN0YXJ0SW5kZXg7XG4gICAgICB0aGlzLl9sYXN0UmVuZGVyZWRTdG9wSW5kZXggPSBzdG9wSW5kZXg7XG5cbiAgICAgIHZhciB1bmxvYWRlZFJhbmdlcyA9IHNjYW5Gb3JVbmxvYWRlZFJhbmdlcyh7XG4gICAgICAgIGlzUm93TG9hZGVkOiBpc1Jvd0xvYWRlZCxcbiAgICAgICAgbWluaW11bUJhdGNoU2l6ZTogbWluaW11bUJhdGNoU2l6ZSxcbiAgICAgICAgcm93c0NvdW50OiByb3dzQ291bnQsXG4gICAgICAgIHN0YXJ0SW5kZXg6IE1hdGgubWF4KDAsIHN0YXJ0SW5kZXggLSB0aHJlc2hvbGQpLFxuICAgICAgICBzdG9wSW5kZXg6IE1hdGgubWluKHJvd3NDb3VudCAtIDEsIHN0b3BJbmRleCArIHRocmVzaG9sZClcbiAgICAgIH0pO1xuXG4gICAgICB1bmxvYWRlZFJhbmdlcy5mb3JFYWNoKGZ1bmN0aW9uICh1bmxvYWRlZFJhbmdlKSB7XG4gICAgICAgIHZhciBwcm9taXNlID0gbG9hZE1vcmVSb3dzKHVubG9hZGVkUmFuZ2UpO1xuICAgICAgICBpZiAocHJvbWlzZSkge1xuICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBSZWZyZXNoIHRoZSB2aXNpYmxlIHJvd3MgaWYgYW55IG9mIHRoZW0gaGF2ZSBqdXN0IGJlZW4gbG9hZGVkLlxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHRoZXkgd2lsbCByZW1haW4gaW4gdGhlaXIgdW5sb2FkZWQgdmlzdWFsIHN0YXRlLlxuICAgICAgICAgICAgaWYgKGlzUmFuZ2VWaXNpYmxlKHtcbiAgICAgICAgICAgICAgbGFzdFJlbmRlcmVkU3RhcnRJbmRleDogX3RoaXMyLl9sYXN0UmVuZGVyZWRTdGFydEluZGV4LFxuICAgICAgICAgICAgICBsYXN0UmVuZGVyZWRTdG9wSW5kZXg6IF90aGlzMi5fbGFzdFJlbmRlcmVkU3RvcEluZGV4LFxuICAgICAgICAgICAgICBzdGFydEluZGV4OiB1bmxvYWRlZFJhbmdlLnN0YXJ0SW5kZXgsXG4gICAgICAgICAgICAgIHN0b3BJbmRleDogdW5sb2FkZWRSYW5nZS5zdG9wSW5kZXhcbiAgICAgICAgICAgIH0pKSB7XG4gICAgICAgICAgICAgIGlmIChfdGhpczIuX3JlZ2lzdGVyZWRDaGlsZCkge1xuICAgICAgICAgICAgICAgIF90aGlzMi5fcmVnaXN0ZXJlZENoaWxkLmZvcmNlVXBkYXRlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX3JlZ2lzdGVyQ2hpbGQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfcmVnaXN0ZXJDaGlsZChyZWdpc3RlcmVkQ2hpbGQpIHtcbiAgICAgIHRoaXMuX3JlZ2lzdGVyZWRDaGlsZCA9IHJlZ2lzdGVyZWRDaGlsZDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gSW5maW5pdGVMb2FkZXI7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG4vKipcbiAqIERldGVybWluZXMgaWYgdGhlIHNwZWNpZmllZCBzdGFydC9zdG9wIHJhbmdlIGlzIHZpc2libGUgYmFzZWQgb24gdGhlIG1vc3QgcmVjZW50bHkgcmVuZGVyZWQgcmFuZ2UuXG4gKi9cblxuXG5JbmZpbml0ZUxvYWRlci5wcm9wVHlwZXMgPSB7XG4gIC8qKlxuICAgKiBGdW5jdGlvbiByZXNwb25kaWJsZSBmb3IgcmVuZGVyaW5nIGEgdmlydHVhbGl6ZWQgY29tcG9uZW50LlxuICAgKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhlIGZvbGxvd2luZyBzaWduYXR1cmU6XG4gICAqICh7IG9uUm93c1JlbmRlcmVkLCByZWdpc3RlckNoaWxkIH0pID0+IFByb3BUeXBlcy5lbGVtZW50XG4gICAqXG4gICAqIFRoZSBzcGVjaWZpZWQgOm9uUm93c1JlbmRlcmVkIGZ1bmN0aW9uIHNob3VsZCBiZSBwYXNzZWQgdGhyb3VnaCB0byB0aGUgY2hpbGQncyA6b25Sb3dzUmVuZGVyZWQgcHJvcGVydHkuXG4gICAqIFRoZSA6cmVnaXN0ZXJDaGlsZCBjYWxsYmFjayBzaG91bGQgYmUgc2V0IGFzIHRoZSB2aXJ0dWFsaXplZCBjb21wb25lbnQncyA6cmVmLlxuICAgKi9cbiAgY2hpbGRyZW46IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiByZXNwb25zaWJsZSBmb3IgdHJhY2tpbmcgdGhlIGxvYWRlZCBzdGF0ZSBvZiBlYWNoIHJvdy5cbiAgICogSXQgc2hvdWxkIGltcGxlbWVudCB0aGUgZm9sbG93aW5nIHNpZ25hdHVyZTogKGluZGV4OiBudW1iZXIpOiBib29sZWFuXG4gICAqL1xuICBpc1Jvd0xvYWRlZDogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIHRvIGJlIGludm9rZWQgd2hlbiBtb3JlIHJvd3MgbXVzdCBiZSBsb2FkZWQuXG4gICAqIEl0IHNob3VsZCBpbXBsZW1lbnQgdGhlIGZvbGxvd2luZyBzaWduYXR1cmU6ICh7IHN0YXJ0SW5kZXgsIHN0b3BJbmRleCB9KTogUHJvbWlzZVxuICAgKiBUaGUgcmV0dXJuZWQgUHJvbWlzZSBzaG91bGQgYmUgcmVzb2x2ZWQgb25jZSByb3cgZGF0YSBoYXMgZmluaXNoZWQgbG9hZGluZy5cbiAgICogSXQgd2lsbCBiZSB1c2VkIHRvIGRldGVybWluZSB3aGVuIHRvIHJlZnJlc2ggdGhlIGxpc3Qgd2l0aCB0aGUgbmV3bHktbG9hZGVkIGRhdGEuXG4gICAqIFRoaXMgY2FsbGJhY2sgbWF5IGJlIGNhbGxlZCBtdWx0aXBsZSB0aW1lcyBpbiByZWFjdGlvbiB0byBhIHNpbmdsZSBzY3JvbGwgZXZlbnQuXG4gICAqL1xuICBsb2FkTW9yZVJvd3M6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBNaW5pbXVtIG51bWJlciBvZiByb3dzIHRvIGJlIGxvYWRlZCBhdCBhIHRpbWUuXG4gICAqIFRoaXMgcHJvcGVydHkgY2FuIGJlIHVzZWQgdG8gYmF0Y2ggcmVxdWVzdHMgdG8gcmVkdWNlIEhUVFAgcmVxdWVzdHMuXG4gICAqL1xuICBtaW5pbXVtQmF0Y2hTaXplOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBOdW1iZXIgb2Ygcm93cyBpbiBsaXN0OyBjYW4gYmUgYXJiaXRyYXJ5IGhpZ2ggbnVtYmVyIGlmIGFjdHVhbCBudW1iZXIgaXMgdW5rbm93bi5cbiAgICovXG4gIHJvd3NDb3VudDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogVGhyZXNob2xkIGF0IHdoaWNoIHRvIHByZS1mZXRjaCBkYXRhLlxuICAgKiBBIHRocmVzaG9sZCBYIG1lYW5zIHRoYXQgZGF0YSB3aWxsIHN0YXJ0IGxvYWRpbmcgd2hlbiBhIHVzZXIgc2Nyb2xscyB3aXRoaW4gWCByb3dzLlxuICAgKiBUaGlzIHZhbHVlIGRlZmF1bHRzIHRvIDE1LlxuICAgKi9cbiAgdGhyZXNob2xkOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG59O1xuSW5maW5pdGVMb2FkZXIuZGVmYXVsdFByb3BzID0ge1xuICBtaW5pbXVtQmF0Y2hTaXplOiAxMCxcbiAgcm93c0NvdW50OiAwLFxuICB0aHJlc2hvbGQ6IDE1XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gSW5maW5pdGVMb2FkZXI7XG5mdW5jdGlvbiBpc1JhbmdlVmlzaWJsZShfcmVmMikge1xuICB2YXIgbGFzdFJlbmRlcmVkU3RhcnRJbmRleCA9IF9yZWYyLmxhc3RSZW5kZXJlZFN0YXJ0SW5kZXg7XG4gIHZhciBsYXN0UmVuZGVyZWRTdG9wSW5kZXggPSBfcmVmMi5sYXN0UmVuZGVyZWRTdG9wSW5kZXg7XG4gIHZhciBzdGFydEluZGV4ID0gX3JlZjIuc3RhcnRJbmRleDtcbiAgdmFyIHN0b3BJbmRleCA9IF9yZWYyLnN0b3BJbmRleDtcblxuICByZXR1cm4gIShzdGFydEluZGV4ID4gbGFzdFJlbmRlcmVkU3RvcEluZGV4IHx8IHN0b3BJbmRleCA8IGxhc3RSZW5kZXJlZFN0YXJ0SW5kZXgpO1xufVxuXG4vKipcbiAqIFJldHVybnMgYWxsIG9mIHRoZSByYW5nZXMgd2l0aGluIGEgbGFyZ2VyIHJhbmdlIHRoYXQgY29udGFpbiB1bmxvYWRlZCByb3dzLlxuICovXG5mdW5jdGlvbiBzY2FuRm9yVW5sb2FkZWRSYW5nZXMoX3JlZjMpIHtcbiAgdmFyIGlzUm93TG9hZGVkID0gX3JlZjMuaXNSb3dMb2FkZWQ7XG4gIHZhciBtaW5pbXVtQmF0Y2hTaXplID0gX3JlZjMubWluaW11bUJhdGNoU2l6ZTtcbiAgdmFyIHJvd3NDb3VudCA9IF9yZWYzLnJvd3NDb3VudDtcbiAgdmFyIHN0YXJ0SW5kZXggPSBfcmVmMy5zdGFydEluZGV4O1xuICB2YXIgc3RvcEluZGV4ID0gX3JlZjMuc3RvcEluZGV4O1xuXG4gIHZhciB1bmxvYWRlZFJhbmdlcyA9IFtdO1xuXG4gIHZhciByYW5nZVN0YXJ0SW5kZXggPSBudWxsO1xuICB2YXIgcmFuZ2VTdG9wSW5kZXggPSBudWxsO1xuXG4gIGZvciAodmFyIGkgPSBzdGFydEluZGV4OyBpIDw9IHN0b3BJbmRleDsgaSsrKSB7XG4gICAgdmFyIGxvYWRlZCA9IGlzUm93TG9hZGVkKGkpO1xuXG4gICAgaWYgKCFsb2FkZWQpIHtcbiAgICAgIHJhbmdlU3RvcEluZGV4ID0gaTtcbiAgICAgIGlmIChyYW5nZVN0YXJ0SW5kZXggPT09IG51bGwpIHtcbiAgICAgICAgcmFuZ2VTdGFydEluZGV4ID0gaTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJhbmdlU3RvcEluZGV4ICE9PSBudWxsKSB7XG4gICAgICB1bmxvYWRlZFJhbmdlcy5wdXNoKHtcbiAgICAgICAgc3RhcnRJbmRleDogcmFuZ2VTdGFydEluZGV4LFxuICAgICAgICBzdG9wSW5kZXg6IHJhbmdlU3RvcEluZGV4XG4gICAgICB9KTtcblxuICAgICAgcmFuZ2VTdGFydEluZGV4ID0gcmFuZ2VTdG9wSW5kZXggPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGlmIChyYW5nZVN0b3BJbmRleCAhPT0gbnVsbCkge1xuICAgIC8vIEF0dGVtcHQgdG8gc2F0aXNmeSA6bWluaW11bUJhdGNoU2l6ZSByZXF1aXJlbWVudCBidXQgZG9uJ3QgZXhjZWVkIDpyb3dzQ291bnRcbiAgICB2YXIgcG90ZW50aWFsU3RvcEluZGV4ID0gTWF0aC5taW4oTWF0aC5tYXgocmFuZ2VTdG9wSW5kZXgsIHJhbmdlU3RhcnRJbmRleCArIG1pbmltdW1CYXRjaFNpemUgLSAxKSwgcm93c0NvdW50IC0gMSk7XG5cbiAgICBmb3IgKHZhciBpID0gcmFuZ2VTdG9wSW5kZXggKyAxOyBpIDw9IHBvdGVudGlhbFN0b3BJbmRleDsgaSsrKSB7XG4gICAgICBpZiAoIWlzUm93TG9hZGVkKGkpKSB7XG4gICAgICAgIHJhbmdlU3RvcEluZGV4ID0gaTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHVubG9hZGVkUmFuZ2VzLnB1c2goe1xuICAgICAgc3RhcnRJbmRleDogcmFuZ2VTdGFydEluZGV4LFxuICAgICAgc3RvcEluZGV4OiByYW5nZVN0b3BJbmRleFxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHVubG9hZGVkUmFuZ2VzO1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuSW5maW5pdGVMb2FkZXIgPSBleHBvcnRzLmRlZmF1bHQgPSB1bmRlZmluZWQ7XG5cbnZhciBfSW5maW5pdGVMb2FkZXIyID0gcmVxdWlyZSgnLi9JbmZpbml0ZUxvYWRlcicpO1xuXG52YXIgX0luZmluaXRlTG9hZGVyMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0luZmluaXRlTG9hZGVyMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9JbmZpbml0ZUxvYWRlcjMuZGVmYXVsdDtcbmV4cG9ydHMuSW5maW5pdGVMb2FkZXIgPSBfSW5maW5pdGVMb2FkZXIzLmRlZmF1bHQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlID0gcmVxdWlyZSgncmVhY3QtYWRkb25zLXNoYWxsb3ctY29tcGFyZScpO1xuXG52YXIgX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBIT0MgdGhhdCBzaW1wbGlmaWVzIHRoZSBwcm9jZXNzIG9mIHN5bmNocm9uaXppbmcgc2Nyb2xsaW5nIGJldHdlZW4gdHdvIG9yIG1vcmUgdmlydHVhbGl6ZWQgY29tcG9uZW50cy5cbiAqL1xuXG52YXIgU2Nyb2xsU3luYyA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhTY3JvbGxTeW5jLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBTY3JvbGxTeW5jKHByb3BzLCBjb250ZXh0KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFNjcm9sbFN5bmMpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKFNjcm9sbFN5bmMpLmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpKTtcblxuICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgY2xpZW50SGVpZ2h0OiAwLFxuICAgICAgY2xpZW50V2lkdGg6IDAsXG4gICAgICBzY3JvbGxIZWlnaHQ6IDAsXG4gICAgICBzY3JvbGxMZWZ0OiAwLFxuICAgICAgc2Nyb2xsVG9wOiAwLFxuICAgICAgc2Nyb2xsV2lkdGg6IDBcbiAgICB9O1xuXG4gICAgX3RoaXMuX29uU2Nyb2xsID0gX3RoaXMuX29uU2Nyb2xsLmJpbmQoX3RoaXMpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhTY3JvbGxTeW5jLCBbe1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMucHJvcHMuY2hpbGRyZW47XG4gICAgICB2YXIgX3N0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgIHZhciBjbGllbnRIZWlnaHQgPSBfc3RhdGUuY2xpZW50SGVpZ2h0O1xuICAgICAgdmFyIGNsaWVudFdpZHRoID0gX3N0YXRlLmNsaWVudFdpZHRoO1xuICAgICAgdmFyIHNjcm9sbEhlaWdodCA9IF9zdGF0ZS5zY3JvbGxIZWlnaHQ7XG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IF9zdGF0ZS5zY3JvbGxMZWZ0O1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IF9zdGF0ZS5zY3JvbGxUb3A7XG4gICAgICB2YXIgc2Nyb2xsV2lkdGggPSBfc3RhdGUuc2Nyb2xsV2lkdGg7XG5cblxuICAgICAgcmV0dXJuIGNoaWxkcmVuKHtcbiAgICAgICAgY2xpZW50SGVpZ2h0OiBjbGllbnRIZWlnaHQsXG4gICAgICAgIGNsaWVudFdpZHRoOiBjbGllbnRXaWR0aCxcbiAgICAgICAgb25TY3JvbGw6IHRoaXMuX29uU2Nyb2xsLFxuICAgICAgICBzY3JvbGxIZWlnaHQ6IHNjcm9sbEhlaWdodCxcbiAgICAgICAgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCxcbiAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxUb3AsXG4gICAgICAgIHNjcm9sbFdpZHRoOiBzY3JvbGxXaWR0aFxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2hvdWxkQ29tcG9uZW50VXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICByZXR1cm4gKDAsIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMi5kZWZhdWx0KSh0aGlzLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uU2Nyb2xsJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uU2Nyb2xsKF9yZWYpIHtcbiAgICAgIHZhciBjbGllbnRIZWlnaHQgPSBfcmVmLmNsaWVudEhlaWdodDtcbiAgICAgIHZhciBjbGllbnRXaWR0aCA9IF9yZWYuY2xpZW50V2lkdGg7XG4gICAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gX3JlZi5zY3JvbGxIZWlnaHQ7XG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IF9yZWYuc2Nyb2xsTGVmdDtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBfcmVmLnNjcm9sbFRvcDtcbiAgICAgIHZhciBzY3JvbGxXaWR0aCA9IF9yZWYuc2Nyb2xsV2lkdGg7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBjbGllbnRIZWlnaHQ6IGNsaWVudEhlaWdodCwgY2xpZW50V2lkdGg6IGNsaWVudFdpZHRoLCBzY3JvbGxIZWlnaHQ6IHNjcm9sbEhlaWdodCwgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdCwgc2Nyb2xsVG9wOiBzY3JvbGxUb3AsIHNjcm9sbFdpZHRoOiBzY3JvbGxXaWR0aCB9KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gU2Nyb2xsU3luYztcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cblNjcm9sbFN5bmMucHJvcFR5cGVzID0ge1xuICAvKipcbiAgICogRnVuY3Rpb24gcmVzcG9uZGlibGUgZm9yIHJlbmRlcmluZyAyIG9yIG1vcmUgdmlydHVhbGl6ZWQgY29tcG9uZW50cy5cbiAgICogVGhpcyBmdW5jdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoZSBmb2xsb3dpbmcgc2lnbmF0dXJlOlxuICAgKiAoeyBvblNjcm9sbCwgc2Nyb2xsTGVmdCwgc2Nyb2xsVG9wIH0pID0+IFByb3BUeXBlcy5lbGVtZW50XG4gICAqL1xuICBjaGlsZHJlbjogX3JlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBTY3JvbGxTeW5jOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuU2Nyb2xsU3luYyA9IGV4cG9ydHMuZGVmYXVsdCA9IHVuZGVmaW5lZDtcblxudmFyIF9TY3JvbGxTeW5jMiA9IHJlcXVpcmUoJy4vU2Nyb2xsU3luYycpO1xuXG52YXIgX1Njcm9sbFN5bmMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU2Nyb2xsU3luYzIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfU2Nyb2xsU3luYzMuZGVmYXVsdDtcbmV4cG9ydHMuU2Nyb2xsU3luYyA9IF9TY3JvbGxTeW5jMy5kZWZhdWx0OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9HcmlkID0gcmVxdWlyZSgnLi4vR3JpZCcpO1xuXG52YXIgX0dyaWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfR3JpZCk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9jbGFzc25hbWVzID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpO1xuXG52YXIgX2NsYXNzbmFtZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NuYW1lcyk7XG5cbnZhciBfcmVhY3RBZGRvbnNTaGFsbG93Q29tcGFyZSA9IHJlcXVpcmUoJ3JlYWN0LWFkZG9ucy1zaGFsbG93LWNvbXBhcmUnKTtcblxudmFyIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0QWRkb25zU2hhbGxvd0NvbXBhcmUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbi8qKlxuICogSXQgaXMgaW5lZmZpY2llbnQgdG8gY3JlYXRlIGFuZCBtYW5hZ2UgYSBsYXJnZSBsaXN0IG9mIERPTSBlbGVtZW50cyB3aXRoaW4gYSBzY3JvbGxpbmcgY29udGFpbmVyXG4gKiBpZiBvbmx5IGEgZmV3IG9mIHRob3NlIGVsZW1lbnRzIGFyZSB2aXNpYmxlLiBUaGUgcHJpbWFyeSBwdXJwb3NlIG9mIHRoaXMgY29tcG9uZW50IGlzIHRvIGltcHJvdmVcbiAqIHBlcmZvcm1hbmNlIGJ5IG9ubHkgcmVuZGVyaW5nIHRoZSBET00gbm9kZXMgdGhhdCBhIHVzZXIgaXMgYWJsZSB0byBzZWUgYmFzZWQgb24gdGhlaXIgY3VycmVudFxuICogc2Nyb2xsIHBvc2l0aW9uLlxuICpcbiAqIFRoaXMgY29tcG9uZW50IHJlbmRlcnMgYSB2aXJ0dWFsaXplZCBsaXN0IG9mIGVsZW1lbnRzIHdpdGggZWl0aGVyIGZpeGVkIG9yIGR5bmFtaWMgaGVpZ2h0cy5cbiAqL1xuXG52YXIgVmlydHVhbFNjcm9sbCA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhWaXJ0dWFsU2Nyb2xsLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBWaXJ0dWFsU2Nyb2xsKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBWaXJ0dWFsU2Nyb2xsKTtcblxuICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoVmlydHVhbFNjcm9sbCkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoVmlydHVhbFNjcm9sbCwgW3tcbiAgICBrZXk6ICdyZWNvbXB1dGVSb3dIZWlnaHRzJyxcblxuXG4gICAgLyoqXG4gICAgICogU2VlIEdyaWQjcmVjb21wdXRlR3JpZFNpemVcbiAgICAgKi9cbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVjb21wdXRlUm93SGVpZ2h0cygpIHtcbiAgICAgIHRoaXMucmVmcy5HcmlkLnJlY29tcHV0ZUdyaWRTaXplKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICB2YXIgY2xhc3NOYW1lID0gX3Byb3BzLmNsYXNzTmFtZTtcbiAgICAgIHZhciBoZWlnaHQgPSBfcHJvcHMuaGVpZ2h0O1xuICAgICAgdmFyIG5vUm93c1JlbmRlcmVyID0gX3Byb3BzLm5vUm93c1JlbmRlcmVyO1xuICAgICAgdmFyIG9uUm93c1JlbmRlcmVkID0gX3Byb3BzLm9uUm93c1JlbmRlcmVkO1xuICAgICAgdmFyIF9vblNjcm9sbCA9IF9wcm9wcy5vblNjcm9sbDtcbiAgICAgIHZhciByb3dIZWlnaHQgPSBfcHJvcHMucm93SGVpZ2h0O1xuICAgICAgdmFyIHJvd1JlbmRlcmVyID0gX3Byb3BzLnJvd1JlbmRlcmVyO1xuICAgICAgdmFyIG92ZXJzY2FuUm93c0NvdW50ID0gX3Byb3BzLm92ZXJzY2FuUm93c0NvdW50O1xuICAgICAgdmFyIHJvd3NDb3VudCA9IF9wcm9wcy5yb3dzQ291bnQ7XG4gICAgICB2YXIgc2Nyb2xsVG9JbmRleCA9IF9wcm9wcy5zY3JvbGxUb0luZGV4O1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IF9wcm9wcy5zY3JvbGxUb3A7XG4gICAgICB2YXIgd2lkdGggPSBfcHJvcHMud2lkdGg7XG5cblxuICAgICAgdmFyIGNsYXNzTmFtZXMgPSAoMCwgX2NsYXNzbmFtZXMyLmRlZmF1bHQpKCdWaXJ0dWFsU2Nyb2xsJywgY2xhc3NOYW1lKTtcblxuICAgICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9HcmlkMi5kZWZhdWx0LCB7XG4gICAgICAgIHJlZjogJ0dyaWQnLFxuICAgICAgICAnYXJpYS1sYWJlbCc6IHRoaXMucHJvcHNbJ2FyaWEtbGFiZWwnXSxcbiAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzLFxuICAgICAgICBjb2x1bW5XaWR0aDogd2lkdGgsXG4gICAgICAgIGNvbHVtbnNDb3VudDogMSxcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgIG5vQ29udGVudFJlbmRlcmVyOiBub1Jvd3NSZW5kZXJlcixcbiAgICAgICAgb25TY3JvbGw6IGZ1bmN0aW9uIG9uU2Nyb2xsKF9yZWYpIHtcbiAgICAgICAgICB2YXIgY2xpZW50SGVpZ2h0ID0gX3JlZi5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgdmFyIHNjcm9sbEhlaWdodCA9IF9yZWYuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgIHZhciBzY3JvbGxUb3AgPSBfcmVmLnNjcm9sbFRvcDtcbiAgICAgICAgICByZXR1cm4gX29uU2Nyb2xsKHsgY2xpZW50SGVpZ2h0OiBjbGllbnRIZWlnaHQsIHNjcm9sbEhlaWdodDogc2Nyb2xsSGVpZ2h0LCBzY3JvbGxUb3A6IHNjcm9sbFRvcCB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TZWN0aW9uUmVuZGVyZWQ6IGZ1bmN0aW9uIG9uU2VjdGlvblJlbmRlcmVkKF9yZWYyKSB7XG4gICAgICAgICAgdmFyIHJvd092ZXJzY2FuU3RhcnRJbmRleCA9IF9yZWYyLnJvd092ZXJzY2FuU3RhcnRJbmRleDtcbiAgICAgICAgICB2YXIgcm93T3ZlcnNjYW5TdG9wSW5kZXggPSBfcmVmMi5yb3dPdmVyc2NhblN0b3BJbmRleDtcbiAgICAgICAgICB2YXIgcm93U3RhcnRJbmRleCA9IF9yZWYyLnJvd1N0YXJ0SW5kZXg7XG4gICAgICAgICAgdmFyIHJvd1N0b3BJbmRleCA9IF9yZWYyLnJvd1N0b3BJbmRleDtcbiAgICAgICAgICByZXR1cm4gb25Sb3dzUmVuZGVyZWQoe1xuICAgICAgICAgICAgb3ZlcnNjYW5TdGFydEluZGV4OiByb3dPdmVyc2NhblN0YXJ0SW5kZXgsXG4gICAgICAgICAgICBvdmVyc2NhblN0b3BJbmRleDogcm93T3ZlcnNjYW5TdG9wSW5kZXgsXG4gICAgICAgICAgICBzdGFydEluZGV4OiByb3dTdGFydEluZGV4LFxuICAgICAgICAgICAgc3RvcEluZGV4OiByb3dTdG9wSW5kZXhcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb3ZlcnNjYW5Sb3dzQ291bnQ6IG92ZXJzY2FuUm93c0NvdW50LFxuICAgICAgICByZW5kZXJDZWxsOiBmdW5jdGlvbiByZW5kZXJDZWxsKF9yZWYzKSB7XG4gICAgICAgICAgdmFyIGNvbHVtbkluZGV4ID0gX3JlZjMuY29sdW1uSW5kZXg7XG4gICAgICAgICAgdmFyIHJvd0luZGV4ID0gX3JlZjMucm93SW5kZXg7XG4gICAgICAgICAgcmV0dXJuIHJvd1JlbmRlcmVyKHJvd0luZGV4KTtcbiAgICAgICAgfSxcbiAgICAgICAgcm93SGVpZ2h0OiByb3dIZWlnaHQsXG4gICAgICAgIHJvd3NDb3VudDogcm93c0NvdW50LFxuICAgICAgICBzY3JvbGxUb1Jvdzogc2Nyb2xsVG9JbmRleCxcbiAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxUb3AsXG4gICAgICAgIHdpZHRoOiB3aWR0aFxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2hvdWxkQ29tcG9uZW50VXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICByZXR1cm4gKDAsIF9yZWFjdEFkZG9uc1NoYWxsb3dDb21wYXJlMi5kZWZhdWx0KSh0aGlzLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFZpcnR1YWxTY3JvbGw7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG5WaXJ0dWFsU2Nyb2xsLnByb3BUeXBlcyA9IHtcbiAgJ2FyaWEtbGFiZWwnOiBfcmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKiogT3B0aW9uYWwgQ1NTIGNsYXNzIG5hbWUgKi9cbiAgY2xhc3NOYW1lOiBfcmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblxuICAvKiogSGVpZ2h0IGNvbnN0cmFpbnQgZm9yIGxpc3QgKGRldGVybWluZXMgaG93IG1hbnkgYWN0dWFsIHJvd3MgYXJlIHJlbmRlcmVkKSAqL1xuICBoZWlnaHQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqIE9wdGlvbmFsIHJlbmRlcmVyIHRvIGJlIHVzZWQgaW4gcGxhY2Ugb2Ygcm93cyB3aGVuIHJvd3NDb3VudCBpcyAwICovXG4gIG5vUm93c1JlbmRlcmVyOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgaW52b2tlZCB3aXRoIGluZm9ybWF0aW9uIGFib3V0IHRoZSBzbGljZSBvZiByb3dzIHRoYXQgd2VyZSBqdXN0IHJlbmRlcmVkLlxuICAgKiAoeyBzdGFydEluZGV4LCBzdG9wSW5kZXggfSk6IHZvaWRcbiAgICovXG4gIG9uUm93c1JlbmRlcmVkOiBfcmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogTnVtYmVyIG9mIHJvd3MgdG8gcmVuZGVyIGFib3ZlL2JlbG93IHRoZSB2aXNpYmxlIGJvdW5kcyBvZiB0aGUgbGlzdC5cbiAgICogVGhlc2Ugcm93cyBjYW4gaGVscCBmb3Igc21vb3RoZXIgc2Nyb2xsaW5nIG9uIHRvdWNoIGRldmljZXMuXG4gICAqL1xuICBvdmVyc2NhblJvd3NDb3VudDogX3JlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgaW52b2tlZCB3aGVuZXZlciB0aGUgc2Nyb2xsIG9mZnNldCBjaGFuZ2VzIHdpdGhpbiB0aGUgaW5uZXIgc2Nyb2xsYWJsZSByZWdpb24uXG4gICAqIFRoaXMgY2FsbGJhY2sgY2FuIGJlIHVzZWQgdG8gc3luYyBzY3JvbGxpbmcgYmV0d2VlbiBsaXN0cywgdGFibGVzLCBvciBncmlkcy5cbiAgICogKHsgY2xpZW50SGVpZ2h0LCBzY3JvbGxIZWlnaHQsIHNjcm9sbFRvcCB9KTogdm9pZFxuICAgKi9cbiAgb25TY3JvbGw6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKlxuICAgKiBFaXRoZXIgYSBmaXhlZCByb3cgaGVpZ2h0IChudW1iZXIpIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBoZWlnaHQgb2YgYSByb3cgZ2l2ZW4gaXRzIGluZGV4LlxuICAgKiAoaW5kZXg6IG51bWJlcik6IG51bWJlclxuICAgKi9cbiAgcm93SGVpZ2h0OiBfcmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbX3JlYWN0LlByb3BUeXBlcy5udW1iZXIsIF9yZWFjdC5Qcm9wVHlwZXMuZnVuY10pLmlzUmVxdWlyZWQsXG5cbiAgLyoqIFJlc3BvbnNiaWxlIGZvciByZW5kZXJpbmcgYSByb3cgZ2l2ZW4gYW4gaW5kZXggKi9cbiAgcm93UmVuZGVyZXI6IF9yZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXG4gIC8qKiBOdW1iZXIgb2Ygcm93cyBpbiBsaXN0LiAqL1xuICByb3dzQ291bnQ6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgLyoqIFJvdyBpbmRleCB0byBlbnN1cmUgdmlzaWJsZSAoYnkgZm9yY2VmdWxseSBzY3JvbGxpbmcgaWYgbmVjZXNzYXJ5KSAqL1xuICBzY3JvbGxUb0luZGV4OiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblxuICAvKiogVmVydGljYWwgb2Zmc2V0LiAqL1xuICBzY3JvbGxUb3A6IF9yZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKiBXaWR0aCBvZiBsaXN0ICovXG4gIHdpZHRoOiBfcmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG59O1xuVmlydHVhbFNjcm9sbC5kZWZhdWx0UHJvcHMgPSB7XG4gIG5vUm93c1JlbmRlcmVyOiBmdW5jdGlvbiBub1Jvd3NSZW5kZXJlcigpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgb25Sb3dzUmVuZGVyZWQ6IGZ1bmN0aW9uIG9uUm93c1JlbmRlcmVkKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBvblNjcm9sbDogZnVuY3Rpb24gb25TY3JvbGwoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIG92ZXJzY2FuUm93c0NvdW50OiAxMFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IFZpcnR1YWxTY3JvbGw7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5WaXJ0dWFsU2Nyb2xsID0gZXhwb3J0cy5kZWZhdWx0ID0gdW5kZWZpbmVkO1xuXG52YXIgX1ZpcnR1YWxTY3JvbGwyID0gcmVxdWlyZSgnLi9WaXJ0dWFsU2Nyb2xsJyk7XG5cbnZhciBfVmlydHVhbFNjcm9sbDMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9WaXJ0dWFsU2Nyb2xsMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9WaXJ0dWFsU2Nyb2xsMy5kZWZhdWx0O1xuZXhwb3J0cy5WaXJ0dWFsU2Nyb2xsID0gX1ZpcnR1YWxTY3JvbGwzLmRlZmF1bHQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX0Fycm93S2V5U3RlcHBlciA9IHJlcXVpcmUoJy4vQXJyb3dLZXlTdGVwcGVyJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnQXJyb3dLZXlTdGVwcGVyJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0Fycm93S2V5U3RlcHBlci5BcnJvd0tleVN0ZXBwZXI7XG4gIH1cbn0pO1xuXG52YXIgX0F1dG9TaXplciA9IHJlcXVpcmUoJy4vQXV0b1NpemVyJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnQXV0b1NpemVyJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0F1dG9TaXplci5BdXRvU2l6ZXI7XG4gIH1cbn0pO1xuXG52YXIgX0NvbGxlY3Rpb24gPSByZXF1aXJlKCcuL0NvbGxlY3Rpb24nKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdDb2xsZWN0aW9uJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0NvbGxlY3Rpb24uQ29sbGVjdGlvbjtcbiAgfVxufSk7XG5cbnZhciBfQ29sdW1uU2l6ZXIgPSByZXF1aXJlKCcuL0NvbHVtblNpemVyJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnQ29sdW1uU2l6ZXInLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfQ29sdW1uU2l6ZXIuQ29sdW1uU2l6ZXI7XG4gIH1cbn0pO1xuXG52YXIgX0ZsZXhUYWJsZSA9IHJlcXVpcmUoJy4vRmxleFRhYmxlJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnRmxleFRhYmxlJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0ZsZXhUYWJsZS5GbGV4VGFibGU7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdGbGV4Q29sdW1uJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0ZsZXhUYWJsZS5GbGV4Q29sdW1uO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnU29ydERpcmVjdGlvbicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9GbGV4VGFibGUuU29ydERpcmVjdGlvbjtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1NvcnRJbmRpY2F0b3InLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfRmxleFRhYmxlLlNvcnRJbmRpY2F0b3I7XG4gIH1cbn0pO1xuXG52YXIgX0dyaWQgPSByZXF1aXJlKCcuL0dyaWQnKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdHcmlkJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX0dyaWQuR3JpZDtcbiAgfVxufSk7XG5cbnZhciBfSW5maW5pdGVMb2FkZXIgPSByZXF1aXJlKCcuL0luZmluaXRlTG9hZGVyJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnSW5maW5pdGVMb2FkZXInLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfSW5maW5pdGVMb2FkZXIuSW5maW5pdGVMb2FkZXI7XG4gIH1cbn0pO1xuXG52YXIgX1Njcm9sbFN5bmMgPSByZXF1aXJlKCcuL1Njcm9sbFN5bmMnKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdTY3JvbGxTeW5jJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX1Njcm9sbFN5bmMuU2Nyb2xsU3luYztcbiAgfVxufSk7XG5cbnZhciBfVmlydHVhbFNjcm9sbCA9IHJlcXVpcmUoJy4vVmlydHVhbFNjcm9sbCcpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1ZpcnR1YWxTY3JvbGwnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfVmlydHVhbFNjcm9sbC5WaXJ0dWFsU2Nyb2xsO1xuICB9XG59KTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZUNhbGxiYWNrTWVtb2l6ZXI7XG4vKipcbiAqIEhlbHBlciB1dGlsaXR5IHRoYXQgdXBkYXRlcyB0aGUgc3BlY2lmaWVkIGNhbGxiYWNrIHdoZW5ldmVyIGFueSBvZiB0aGUgc3BlY2lmaWVkIGluZGljZXMgaGF2ZSBjaGFuZ2VkLlxuICovXG5mdW5jdGlvbiBjcmVhdGVDYWxsYmFja01lbW9pemVyKCkge1xuICB2YXIgcmVxdWlyZUFsbEtleXMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB0cnVlIDogYXJndW1lbnRzWzBdO1xuXG4gIHZhciBjYWNoZWRJbmRpY2VzID0ge307XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIGNhbGxiYWNrID0gX3JlZi5jYWxsYmFjaztcbiAgICB2YXIgaW5kaWNlcyA9IF9yZWYuaW5kaWNlcztcblxuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoaW5kaWNlcyk7XG4gICAgdmFyIGFsbEluaXRpYWxpemVkID0gIXJlcXVpcmVBbGxLZXlzIHx8IGtleXMuZXZlcnkoZnVuY3Rpb24gKGtleSkge1xuICAgICAgcmV0dXJuIGluZGljZXNba2V5XSA+PSAwO1xuICAgIH0pO1xuICAgIHZhciBpbmRleENoYW5nZWQgPSBrZXlzLmxlbmd0aCAhPT0gT2JqZWN0LmtleXMoY2FjaGVkSW5kaWNlcykubGVuZ3RoIHx8IGtleXMuc29tZShmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4gY2FjaGVkSW5kaWNlc1trZXldICE9PSBpbmRpY2VzW2tleV07XG4gICAgfSk7XG5cbiAgICBjYWNoZWRJbmRpY2VzID0gaW5kaWNlcztcblxuICAgIGlmIChhbGxJbml0aWFsaXplZCAmJiBpbmRleENoYW5nZWQpIHtcbiAgICAgIGNhbGxiYWNrKGluZGljZXMpO1xuICAgIH1cbiAgfTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGdldFVwZGF0ZWRPZmZzZXRGb3JJbmRleDtcbi8qKlxuICogRGV0ZXJtaW5lcyBhIG5ldyBvZmZzZXQgdGhhdCBlbnN1cmVzIGEgY2VydGFpbiBjZWxsIGlzIHZpc2libGUsIGdpdmVuIHRoZSBjdXJyZW50IG9mZnNldC5cbiAqIElmIHRoZSBjZWxsIGlzIGFscmVhZHkgdmlzaWJsZSB0aGVuIHRoZSBjdXJyZW50IG9mZnNldCB3aWxsIGJlIHJldHVybmVkLlxuICogSWYgdGhlIGN1cnJlbnQgb2Zmc2V0IGlzIHRvbyBncmVhdCBvciBzbWFsbCwgaXQgd2lsbCBiZSBhZGp1c3RlZCBqdXN0IGVub3VnaCB0byBlbnN1cmUgdGhlIHNwZWNpZmllZCBpbmRleCBpcyB2aXNpYmxlLlxuICpcbiAqIEBwYXJhbSBjZWxsT2Zmc2V0IE9mZnNldCAoeCBvciB5KSBwb3NpdGlvbiBmb3IgY2VsbFxuICogQHBhcmFtIGNlbGxTaXplIFNpemUgKHdpZHRoIG9yIGhlaWdodCkgb2YgY2VsbFxuICogQHBhcmFtIGNvbnRhaW5lclNpemUgVG90YWwgc2l6ZSAod2lkdGggb3IgaGVpZ2h0KSBvZiB0aGUgY29udGFpbmVyXG4gKiBAcGFyYW0gY3VycmVudE9mZnNldCBDb250YWluZXIncyBjdXJyZW50ICh4IG9yIHkpIG9mZnNldFxuICogQHJldHVybiBPZmZzZXQgdG8gdXNlIHRvIGVuc3VyZSB0aGUgc3BlY2lmaWVkIGNlbGwgaXMgdmlzaWJsZVxuICovXG5mdW5jdGlvbiBnZXRVcGRhdGVkT2Zmc2V0Rm9ySW5kZXgoX3JlZikge1xuICB2YXIgY2VsbE9mZnNldCA9IF9yZWYuY2VsbE9mZnNldDtcbiAgdmFyIGNlbGxTaXplID0gX3JlZi5jZWxsU2l6ZTtcbiAgdmFyIGNvbnRhaW5lclNpemUgPSBfcmVmLmNvbnRhaW5lclNpemU7XG4gIHZhciBjdXJyZW50T2Zmc2V0ID0gX3JlZi5jdXJyZW50T2Zmc2V0O1xuXG4gIHZhciBtYXhPZmZzZXQgPSBjZWxsT2Zmc2V0O1xuICB2YXIgbWluT2Zmc2V0ID0gbWF4T2Zmc2V0IC0gY29udGFpbmVyU2l6ZSArIGNlbGxTaXplO1xuICB2YXIgbmV3T2Zmc2V0ID0gTWF0aC5tYXgobWluT2Zmc2V0LCBNYXRoLm1pbihtYXhPZmZzZXQsIGN1cnJlbnRPZmZzZXQpKTtcblxuICByZXR1cm4gbmV3T2Zmc2V0O1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaW5pdENlbGxNZXRhZGF0YTtcbi8qKlxuICogSW5pdGlhbGl6ZXMgbWV0YWRhdGEgZm9yIGFuIGF4aXMgYW5kIGl0cyBjZWxscy5cbiAqIFRoaXMgZGF0YSBpcyB1c2VkIHRvIGRldGVybWluZSB3aGljaCBjZWxscyBhcmUgdmlzaWJsZSBnaXZlbiBhIGNvbnRhaW5lciBzaXplIGFuZCBzY3JvbGwgcG9zaXRpb24uXG4gKlxuICogQHBhcmFtIGNlbGxDb3VudCBUb3RhbCBudW1iZXIgb2YgY2VsbHMuXG4gKiBAcGFyYW0gc2l6ZSBFaXRoZXIgYSBmaXhlZCBzaXplIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBzaXplIGZvciBhIGdpdmVuIGdpdmVuIGFuIGluZGV4LlxuICogQHJldHVybiBPYmplY3QgbWFwcGluZyBjZWxsIGluZGV4IHRvIGNlbGwgbWV0YWRhdGEgKHNpemUsIG9mZnNldClcbiAqL1xuZnVuY3Rpb24gaW5pdENlbGxNZXRhZGF0YShfcmVmKSB7XG4gIHZhciBjZWxsQ291bnQgPSBfcmVmLmNlbGxDb3VudDtcbiAgdmFyIHNpemUgPSBfcmVmLnNpemU7XG5cbiAgdmFyIHNpemVHZXR0ZXIgPSBzaXplIGluc3RhbmNlb2YgRnVuY3Rpb24gPyBzaXplIDogZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgcmV0dXJuIHNpemU7XG4gIH07XG5cbiAgdmFyIGNlbGxNZXRhZGF0YSA9IFtdO1xuICB2YXIgb2Zmc2V0ID0gMDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNlbGxDb3VudDsgaSsrKSB7XG4gICAgdmFyIF9zaXplID0gc2l6ZUdldHRlcihpKTtcblxuICAgIGlmIChfc2l6ZSA9PSBudWxsIHx8IGlzTmFOKF9zaXplKSkge1xuICAgICAgdGhyb3cgRXJyb3IoXCJJbnZhbGlkIHNpemUgcmV0dXJuZWQgZm9yIGNlbGwgXCIgKyBpICsgXCIgb2YgdmFsdWUgXCIgKyBfc2l6ZSk7XG4gICAgfVxuXG4gICAgY2VsbE1ldGFkYXRhW2ldID0ge1xuICAgICAgc2l6ZTogX3NpemUsXG4gICAgICBvZmZzZXQ6IG9mZnNldFxuICAgIH07XG5cbiAgICBvZmZzZXQgKz0gX3NpemU7XG4gIH1cblxuICByZXR1cm4gY2VsbE1ldGFkYXRhO1xufSIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4qIERldGVjdCBFbGVtZW50IFJlc2l6ZS5cbiogRm9ya2VkIGluIG9yZGVyIHRvIGd1YXJkIGFnYWluc3QgdW5zYWZlICd3aW5kb3cnIGFuZCAnZG9jdW1lbnQnIHJlZmVyZW5jZXMuXG4qXG4qIGh0dHBzOi8vZ2l0aHViLmNvbS9zZGVjaW1hL2phdmFzY3JpcHQtZGV0ZWN0LWVsZW1lbnQtcmVzaXplXG4qIFNlYmFzdGlhbiBEZWNpbWFcbipcbiogdmVyc2lvbjogMC41LjNcbioqL1xuXG4vLyBDaGVjayBgZG9jdW1lbnRgIGFuZCBgd2luZG93YCBpbiBjYXNlIG9mIHNlcnZlci1zaWRlIHJlbmRlcmluZ1xudmFyIF93aW5kb3c7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgX3dpbmRvdyA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7XG4gIF93aW5kb3cgPSBzZWxmO1xufSBlbHNlIHtcbiAgX3dpbmRvdyA9IHVuZGVmaW5lZDtcbn1cblxudmFyIGF0dGFjaEV2ZW50ID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5hdHRhY2hFdmVudDtcbnZhciBzdHlsZXNDcmVhdGVkID0gZmFsc2U7XG5cbmlmICghYXR0YWNoRXZlbnQpIHtcbiAgdmFyIHJlcXVlc3RGcmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmFmID0gX3dpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgX3dpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgX3dpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgZnVuY3Rpb24gKGZuKSB7XG4gICAgICByZXR1cm4gX3dpbmRvdy5zZXRUaW1lb3V0KGZuLCAyMCk7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGZuKSB7XG4gICAgICByZXR1cm4gcmFmKGZuKTtcbiAgICB9O1xuICB9KCk7XG5cbiAgdmFyIGNhbmNlbEZyYW1lID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW5jZWwgPSBfd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IF93aW5kb3cubW96Q2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgX3dpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSB8fCBfd2luZG93LmNsZWFyVGltZW91dDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGlkKSB7XG4gICAgICByZXR1cm4gY2FuY2VsKGlkKTtcbiAgICB9O1xuICB9KCk7XG5cbiAgdmFyIHJlc2V0VHJpZ2dlcnMgPSBmdW5jdGlvbiByZXNldFRyaWdnZXJzKGVsZW1lbnQpIHtcbiAgICB2YXIgdHJpZ2dlcnMgPSBlbGVtZW50Ll9fcmVzaXplVHJpZ2dlcnNfXyxcbiAgICAgICAgZXhwYW5kID0gdHJpZ2dlcnMuZmlyc3RFbGVtZW50Q2hpbGQsXG4gICAgICAgIGNvbnRyYWN0ID0gdHJpZ2dlcnMubGFzdEVsZW1lbnRDaGlsZCxcbiAgICAgICAgZXhwYW5kQ2hpbGQgPSBleHBhbmQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgY29udHJhY3Quc2Nyb2xsTGVmdCA9IGNvbnRyYWN0LnNjcm9sbFdpZHRoO1xuICAgIGNvbnRyYWN0LnNjcm9sbFRvcCA9IGNvbnRyYWN0LnNjcm9sbEhlaWdodDtcbiAgICBleHBhbmRDaGlsZC5zdHlsZS53aWR0aCA9IGV4cGFuZC5vZmZzZXRXaWR0aCArIDEgKyAncHgnO1xuICAgIGV4cGFuZENoaWxkLnN0eWxlLmhlaWdodCA9IGV4cGFuZC5vZmZzZXRIZWlnaHQgKyAxICsgJ3B4JztcbiAgICBleHBhbmQuc2Nyb2xsTGVmdCA9IGV4cGFuZC5zY3JvbGxXaWR0aDtcbiAgICBleHBhbmQuc2Nyb2xsVG9wID0gZXhwYW5kLnNjcm9sbEhlaWdodDtcbiAgfTtcblxuICB2YXIgY2hlY2tUcmlnZ2VycyA9IGZ1bmN0aW9uIGNoZWNrVHJpZ2dlcnMoZWxlbWVudCkge1xuICAgIHJldHVybiBlbGVtZW50Lm9mZnNldFdpZHRoICE9IGVsZW1lbnQuX19yZXNpemVMYXN0X18ud2lkdGggfHwgZWxlbWVudC5vZmZzZXRIZWlnaHQgIT0gZWxlbWVudC5fX3Jlc2l6ZUxhc3RfXy5oZWlnaHQ7XG4gIH07XG5cbiAgdmFyIHNjcm9sbExpc3RlbmVyID0gZnVuY3Rpb24gc2Nyb2xsTGlzdGVuZXIoZSkge1xuICAgIHZhciBlbGVtZW50ID0gdGhpcztcbiAgICByZXNldFRyaWdnZXJzKHRoaXMpO1xuICAgIGlmICh0aGlzLl9fcmVzaXplUkFGX18pIGNhbmNlbEZyYW1lKHRoaXMuX19yZXNpemVSQUZfXyk7XG4gICAgdGhpcy5fX3Jlc2l6ZVJBRl9fID0gcmVxdWVzdEZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChjaGVja1RyaWdnZXJzKGVsZW1lbnQpKSB7XG4gICAgICAgIGVsZW1lbnQuX19yZXNpemVMYXN0X18ud2lkdGggPSBlbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgICBlbGVtZW50Ll9fcmVzaXplTGFzdF9fLmhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICBlbGVtZW50Ll9fcmVzaXplTGlzdGVuZXJzX18uZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgICBmbi5jYWxsKGVsZW1lbnQsIGUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICAvKiBEZXRlY3QgQ1NTIEFuaW1hdGlvbnMgc3VwcG9ydCB0byBkZXRlY3QgZWxlbWVudCBkaXNwbGF5L3JlLWF0dGFjaCAqL1xuICB2YXIgYW5pbWF0aW9uID0gZmFsc2UsXG4gICAgICBhbmltYXRpb25zdHJpbmcgPSAnYW5pbWF0aW9uJyxcbiAgICAgIGtleWZyYW1lcHJlZml4ID0gJycsXG4gICAgICBhbmltYXRpb25zdGFydGV2ZW50ID0gJ2FuaW1hdGlvbnN0YXJ0JyxcbiAgICAgIGRvbVByZWZpeGVzID0gJ1dlYmtpdCBNb3ogTyBtcycuc3BsaXQoJyAnKSxcbiAgICAgIHN0YXJ0RXZlbnRzID0gJ3dlYmtpdEFuaW1hdGlvblN0YXJ0IGFuaW1hdGlvbnN0YXJ0IG9BbmltYXRpb25TdGFydCBNU0FuaW1hdGlvblN0YXJ0Jy5zcGxpdCgnICcpLFxuICAgICAgcGZ4ID0gJyc7XG4gIHtcbiAgICB2YXIgZWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZmFrZWVsZW1lbnQnKTtcbiAgICBpZiAoZWxtLnN0eWxlLmFuaW1hdGlvbk5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgYW5pbWF0aW9uID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoYW5pbWF0aW9uID09PSBmYWxzZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkb21QcmVmaXhlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZWxtLnN0eWxlW2RvbVByZWZpeGVzW2ldICsgJ0FuaW1hdGlvbk5hbWUnXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcGZ4ID0gZG9tUHJlZml4ZXNbaV07XG4gICAgICAgICAgYW5pbWF0aW9uc3RyaW5nID0gcGZ4ICsgJ0FuaW1hdGlvbic7XG4gICAgICAgICAga2V5ZnJhbWVwcmVmaXggPSAnLScgKyBwZngudG9Mb3dlckNhc2UoKSArICctJztcbiAgICAgICAgICBhbmltYXRpb25zdGFydGV2ZW50ID0gc3RhcnRFdmVudHNbaV07XG4gICAgICAgICAgYW5pbWF0aW9uID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciBhbmltYXRpb25OYW1lID0gJ3Jlc2l6ZWFuaW0nO1xuICB2YXIgYW5pbWF0aW9uS2V5ZnJhbWVzID0gJ0AnICsga2V5ZnJhbWVwcmVmaXggKyAna2V5ZnJhbWVzICcgKyBhbmltYXRpb25OYW1lICsgJyB7IGZyb20geyBvcGFjaXR5OiAwOyB9IHRvIHsgb3BhY2l0eTogMDsgfSB9ICc7XG4gIHZhciBhbmltYXRpb25TdHlsZSA9IGtleWZyYW1lcHJlZml4ICsgJ2FuaW1hdGlvbjogMW1zICcgKyBhbmltYXRpb25OYW1lICsgJzsgJztcbn1cblxudmFyIGNyZWF0ZVN0eWxlcyA9IGZ1bmN0aW9uIGNyZWF0ZVN0eWxlcygpIHtcbiAgaWYgKCFzdHlsZXNDcmVhdGVkKSB7XG4gICAgLy9vcGFjaXR5OjAgd29ya3MgYXJvdW5kIGEgY2hyb21lIGJ1ZyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9Mjg2MzYwXG4gICAgdmFyIGNzcyA9IChhbmltYXRpb25LZXlmcmFtZXMgPyBhbmltYXRpb25LZXlmcmFtZXMgOiAnJykgKyAnLnJlc2l6ZS10cmlnZ2VycyB7ICcgKyAoYW5pbWF0aW9uU3R5bGUgPyBhbmltYXRpb25TdHlsZSA6ICcnKSArICd2aXNpYmlsaXR5OiBoaWRkZW47IG9wYWNpdHk6IDA7IH0gJyArICcucmVzaXplLXRyaWdnZXJzLCAucmVzaXplLXRyaWdnZXJzID4gZGl2LCAuY29udHJhY3QtdHJpZ2dlcjpiZWZvcmUgeyBjb250ZW50OiBcXFwiIFxcXCI7IGRpc3BsYXk6IGJsb2NrOyBwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMDsgbGVmdDogMDsgaGVpZ2h0OiAxMDAlOyB3aWR0aDogMTAwJTsgb3ZlcmZsb3c6IGhpZGRlbjsgfSAucmVzaXplLXRyaWdnZXJzID4gZGl2IHsgYmFja2dyb3VuZDogI2VlZTsgb3ZlcmZsb3c6IGF1dG87IH0gLmNvbnRyYWN0LXRyaWdnZXI6YmVmb3JlIHsgd2lkdGg6IDIwMCU7IGhlaWdodDogMjAwJTsgfScsXG4gICAgICAgIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0sXG4gICAgICAgIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICAgIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICAgIH1cblxuICAgIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgIHN0eWxlc0NyZWF0ZWQgPSB0cnVlO1xuICB9XG59O1xuXG52YXIgYWRkUmVzaXplTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRSZXNpemVMaXN0ZW5lcihlbGVtZW50LCBmbikge1xuICBpZiAoYXR0YWNoRXZlbnQpIGVsZW1lbnQuYXR0YWNoRXZlbnQoJ29ucmVzaXplJywgZm4pO2Vsc2Uge1xuICAgIGlmICghZWxlbWVudC5fX3Jlc2l6ZVRyaWdnZXJzX18pIHtcbiAgICAgIGlmIChnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLnBvc2l0aW9uID09ICdzdGF0aWMnKSBlbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICAgIGNyZWF0ZVN0eWxlcygpO1xuICAgICAgZWxlbWVudC5fX3Jlc2l6ZUxhc3RfXyA9IHt9O1xuICAgICAgZWxlbWVudC5fX3Jlc2l6ZUxpc3RlbmVyc19fID0gW107XG4gICAgICAoZWxlbWVudC5fX3Jlc2l6ZVRyaWdnZXJzX18gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSkuY2xhc3NOYW1lID0gJ3Jlc2l6ZS10cmlnZ2Vycyc7XG4gICAgICBlbGVtZW50Ll9fcmVzaXplVHJpZ2dlcnNfXy5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImV4cGFuZC10cmlnZ2VyXCI+PGRpdj48L2Rpdj48L2Rpdj4nICsgJzxkaXYgY2xhc3M9XCJjb250cmFjdC10cmlnZ2VyXCI+PC9kaXY+JztcbiAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudC5fX3Jlc2l6ZVRyaWdnZXJzX18pO1xuICAgICAgcmVzZXRUcmlnZ2VycyhlbGVtZW50KTtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgc2Nyb2xsTGlzdGVuZXIsIHRydWUpO1xuXG4gICAgICAvKiBMaXN0ZW4gZm9yIGEgY3NzIGFuaW1hdGlvbiB0byBkZXRlY3QgZWxlbWVudCBkaXNwbGF5L3JlLWF0dGFjaCAqL1xuICAgICAgYW5pbWF0aW9uc3RhcnRldmVudCAmJiBlbGVtZW50Ll9fcmVzaXplVHJpZ2dlcnNfXy5hZGRFdmVudExpc3RlbmVyKGFuaW1hdGlvbnN0YXJ0ZXZlbnQsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChlLmFuaW1hdGlvbk5hbWUgPT0gYW5pbWF0aW9uTmFtZSkgcmVzZXRUcmlnZ2VycyhlbGVtZW50KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbGVtZW50Ll9fcmVzaXplTGlzdGVuZXJzX18ucHVzaChmbik7XG4gIH1cbn07XG5cbnZhciByZW1vdmVSZXNpemVMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZVJlc2l6ZUxpc3RlbmVyKGVsZW1lbnQsIGZuKSB7XG4gIGlmIChhdHRhY2hFdmVudCkgZWxlbWVudC5kZXRhY2hFdmVudCgnb25yZXNpemUnLCBmbik7ZWxzZSB7XG4gICAgZWxlbWVudC5fX3Jlc2l6ZUxpc3RlbmVyc19fLnNwbGljZShlbGVtZW50Ll9fcmVzaXplTGlzdGVuZXJzX18uaW5kZXhPZihmbiksIDEpO1xuICAgIGlmICghZWxlbWVudC5fX3Jlc2l6ZUxpc3RlbmVyc19fLmxlbmd0aCkge1xuICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBzY3JvbGxMaXN0ZW5lcik7XG4gICAgICBlbGVtZW50Ll9fcmVzaXplVHJpZ2dlcnNfXyA9ICFlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQuX19yZXNpemVUcmlnZ2Vyc19fKTtcbiAgICB9XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhZGRSZXNpemVMaXN0ZW5lcjogYWRkUmVzaXplTGlzdGVuZXIsXG4gIHJlbW92ZVJlc2l6ZUxpc3RlbmVyOiByZW1vdmVSZXNpemVMaXN0ZW5lclxufTsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4qIEBwcm92aWRlc01vZHVsZSBzaGFsbG93Q29tcGFyZVxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2hhbGxvd0VxdWFsID0gcmVxdWlyZSgnZmJqcy9saWIvc2hhbGxvd0VxdWFsJyk7XG5cbi8qKlxuICogRG9lcyBhIHNoYWxsb3cgY29tcGFyaXNvbiBmb3IgcHJvcHMgYW5kIHN0YXRlLlxuICogU2VlIFJlYWN0Q29tcG9uZW50V2l0aFB1cmVSZW5kZXJNaXhpblxuICogU2VlIGFsc28gaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy9zaGFsbG93LWNvbXBhcmUuaHRtbFxuICovXG5mdW5jdGlvbiBzaGFsbG93Q29tcGFyZShpbnN0YW5jZSwgbmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgcmV0dXJuICFzaGFsbG93RXF1YWwoaW5zdGFuY2UucHJvcHMsIG5leHRQcm9wcykgfHwgIXNoYWxsb3dFcXVhbChpbnN0YW5jZS5zdGF0ZSwgbmV4dFN0YXRlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaGFsbG93Q29tcGFyZTsiLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIpIHtcblx0cmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoL1shJygpKl0vZywgZnVuY3Rpb24gKGMpIHtcblx0XHRyZXR1cm4gJyUnICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuXHR9KTtcbn07XG4iLCIoZnVuY3Rpb24oc2VsZikge1xuICAndXNlIHN0cmljdCc7XG5cbiAgaWYgKHNlbGYuZmV0Y2gpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBzdXBwb3J0ID0ge1xuICAgIHNlYXJjaFBhcmFtczogJ1VSTFNlYXJjaFBhcmFtcycgaW4gc2VsZixcbiAgICBpdGVyYWJsZTogJ1N5bWJvbCcgaW4gc2VsZiAmJiAnaXRlcmF0b3InIGluIFN5bWJvbCxcbiAgICBibG9iOiAnRmlsZVJlYWRlcicgaW4gc2VsZiAmJiAnQmxvYicgaW4gc2VsZiAmJiAoZnVuY3Rpb24oKSB7XG4gICAgICB0cnkge1xuICAgICAgICBuZXcgQmxvYigpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSkoKSxcbiAgICBmb3JtRGF0YTogJ0Zvcm1EYXRhJyBpbiBzZWxmLFxuICAgIGFycmF5QnVmZmVyOiAnQXJyYXlCdWZmZXInIGluIHNlbGZcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZU5hbWUobmFtZSkge1xuICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIG5hbWUgPSBTdHJpbmcobmFtZSlcbiAgICB9XG4gICAgaWYgKC9bXmEtejAtOVxcLSMkJSYnKisuXFxeX2B8fl0vaS50ZXN0KG5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGNoYXJhY3RlciBpbiBoZWFkZXIgZmllbGQgbmFtZScpXG4gICAgfVxuICAgIHJldHVybiBuYW1lLnRvTG93ZXJDYXNlKClcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHZhbHVlID0gU3RyaW5nKHZhbHVlKVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIC8vIEJ1aWxkIGEgZGVzdHJ1Y3RpdmUgaXRlcmF0b3IgZm9yIHRoZSB2YWx1ZSBsaXN0XG4gIGZ1bmN0aW9uIGl0ZXJhdG9yRm9yKGl0ZW1zKSB7XG4gICAgdmFyIGl0ZXJhdG9yID0ge1xuICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGl0ZW1zLnNoaWZ0KClcbiAgICAgICAgcmV0dXJuIHtkb25lOiB2YWx1ZSA9PT0gdW5kZWZpbmVkLCB2YWx1ZTogdmFsdWV9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcbiAgICAgIGl0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZXJhdG9yXG4gIH1cblxuICBmdW5jdGlvbiBIZWFkZXJzKGhlYWRlcnMpIHtcbiAgICB0aGlzLm1hcCA9IHt9XG5cbiAgICBpZiAoaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB0aGlzLmFwcGVuZChuYW1lLCB2YWx1ZSlcbiAgICAgIH0sIHRoaXMpXG5cbiAgICB9IGVsc2UgaWYgKGhlYWRlcnMpIHtcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGhlYWRlcnMpLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgICAgICB0aGlzLmFwcGVuZChuYW1lLCBoZWFkZXJzW25hbWVdKVxuICAgICAgfSwgdGhpcylcbiAgICB9XG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpXG4gICAgdmFsdWUgPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSlcbiAgICB2YXIgbGlzdCA9IHRoaXMubWFwW25hbWVdXG4gICAgaWYgKCFsaXN0KSB7XG4gICAgICBsaXN0ID0gW11cbiAgICAgIHRoaXMubWFwW25hbWVdID0gbGlzdFxuICAgIH1cbiAgICBsaXN0LnB1c2godmFsdWUpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIHZhbHVlcyA9IHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldXG4gICAgcmV0dXJuIHZhbHVlcyA/IHZhbHVlc1swXSA6IG51bGxcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmdldEFsbCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV0gfHwgW11cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAuaGFzT3duUHJvcGVydHkobm9ybWFsaXplTmFtZShuYW1lKSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV0gPSBbbm9ybWFsaXplVmFsdWUodmFsdWUpXVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5tYXApLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgICAgdGhpcy5tYXBbbmFtZV0uZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHZhbHVlLCBuYW1lLCB0aGlzKVxuICAgICAgfSwgdGhpcylcbiAgICB9LCB0aGlzKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdXG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7IGl0ZW1zLnB1c2gobmFtZSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkgeyBpdGVtcy5wdXNoKHZhbHVlKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkgeyBpdGVtcy5wdXNoKFtuYW1lLCB2YWx1ZV0pIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcbiAgICBIZWFkZXJzLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gSGVhZGVycy5wcm90b3R5cGUuZW50cmllc1xuICB9XG5cbiAgZnVuY3Rpb24gY29uc3VtZWQoYm9keSkge1xuICAgIGlmIChib2R5LmJvZHlVc2VkKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcignQWxyZWFkeSByZWFkJykpXG4gICAgfVxuICAgIGJvZHkuYm9keVVzZWQgPSB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXNvbHZlKHJlYWRlci5yZXN1bHQpXG4gICAgICB9XG4gICAgICByZWFkZXIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QocmVhZGVyLmVycm9yKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQmxvYkFzQXJyYXlCdWZmZXIoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGJsb2IpXG4gICAgcmV0dXJuIGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQmxvYkFzVGV4dChibG9iKSB7XG4gICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcbiAgICByZWFkZXIucmVhZEFzVGV4dChibG9iKVxuICAgIHJldHVybiBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICB9XG5cbiAgZnVuY3Rpb24gQm9keSgpIHtcbiAgICB0aGlzLmJvZHlVc2VkID0gZmFsc2VcblxuICAgIHRoaXMuX2luaXRCb2R5ID0gZnVuY3Rpb24oYm9keSkge1xuICAgICAgdGhpcy5fYm9keUluaXQgPSBib2R5XG4gICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmJsb2IgJiYgQmxvYi5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5QmxvYiA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5mb3JtRGF0YSAmJiBGb3JtRGF0YS5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5Rm9ybURhdGEgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuc2VhcmNoUGFyYW1zICYmIFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHkudG9TdHJpbmcoKVxuICAgICAgfSBlbHNlIGlmICghYm9keSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9ICcnXG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIgJiYgQXJyYXlCdWZmZXIucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgLy8gT25seSBzdXBwb3J0IEFycmF5QnVmZmVycyBmb3IgUE9TVCBtZXRob2QuXG4gICAgICAgIC8vIFJlY2VpdmluZyBBcnJheUJ1ZmZlcnMgaGFwcGVucyB2aWEgQmxvYnMsIGluc3RlYWQuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIEJvZHlJbml0IHR5cGUnKVxuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04JylcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QmxvYiAmJiB0aGlzLl9ib2R5QmxvYi50eXBlKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgdGhpcy5fYm9keUJsb2IudHlwZSlcbiAgICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuYmxvYikge1xuICAgICAgdGhpcy5ibG9iID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QmxvYilcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgYmxvYicpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keVRleHRdKSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmFycmF5QnVmZmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJsb2IoKS50aGVuKHJlYWRCbG9iQXNBcnJheUJ1ZmZlcilcbiAgICAgIH1cblxuICAgICAgdGhpcy50ZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgICAgcmV0dXJuIHJlYWRCbG9iQXNUZXh0KHRoaXMuX2JvZHlCbG9iKVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlGb3JtRGF0YSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY291bGQgbm90IHJlYWQgRm9ybURhdGEgYm9keSBhcyB0ZXh0JylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlUZXh0KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgICAgICByZXR1cm4gcmVqZWN0ZWQgPyByZWplY3RlZCA6IFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5VGV4dClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5mb3JtRGF0YSkge1xuICAgICAgdGhpcy5mb3JtRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihkZWNvZGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5qc29uID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihKU09OLnBhcnNlKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBIVFRQIG1ldGhvZHMgd2hvc2UgY2FwaXRhbGl6YXRpb24gc2hvdWxkIGJlIG5vcm1hbGl6ZWRcbiAgdmFyIG1ldGhvZHMgPSBbJ0RFTEVURScsICdHRVQnLCAnSEVBRCcsICdPUFRJT05TJywgJ1BPU1QnLCAnUFVUJ11cblxuICBmdW5jdGlvbiBub3JtYWxpemVNZXRob2QobWV0aG9kKSB7XG4gICAgdmFyIHVwY2FzZWQgPSBtZXRob2QudG9VcHBlckNhc2UoKVxuICAgIHJldHVybiAobWV0aG9kcy5pbmRleE9mKHVwY2FzZWQpID4gLTEpID8gdXBjYXNlZCA6IG1ldGhvZFxuICB9XG5cbiAgZnVuY3Rpb24gUmVxdWVzdChpbnB1dCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgdmFyIGJvZHkgPSBvcHRpb25zLmJvZHlcbiAgICBpZiAoUmVxdWVzdC5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihpbnB1dCkpIHtcbiAgICAgIGlmIChpbnB1dC5ib2R5VXNlZCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKVxuICAgICAgfVxuICAgICAgdGhpcy51cmwgPSBpbnB1dC51cmxcbiAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSBpbnB1dC5jcmVkZW50aWFsc1xuICAgICAgaWYgKCFvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMoaW5wdXQuaGVhZGVycylcbiAgICAgIH1cbiAgICAgIHRoaXMubWV0aG9kID0gaW5wdXQubWV0aG9kXG4gICAgICB0aGlzLm1vZGUgPSBpbnB1dC5tb2RlXG4gICAgICBpZiAoIWJvZHkpIHtcbiAgICAgICAgYm9keSA9IGlucHV0Ll9ib2R5SW5pdFxuICAgICAgICBpbnB1dC5ib2R5VXNlZCA9IHRydWVcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cmwgPSBpbnB1dFxuICAgIH1cblxuICAgIHRoaXMuY3JlZGVudGlhbHMgPSBvcHRpb25zLmNyZWRlbnRpYWxzIHx8IHRoaXMuY3JlZGVudGlhbHMgfHwgJ29taXQnXG4gICAgaWYgKG9wdGlvbnMuaGVhZGVycyB8fCAhdGhpcy5oZWFkZXJzKSB7XG4gICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpXG4gICAgfVxuICAgIHRoaXMubWV0aG9kID0gbm9ybWFsaXplTWV0aG9kKG9wdGlvbnMubWV0aG9kIHx8IHRoaXMubWV0aG9kIHx8ICdHRVQnKVxuICAgIHRoaXMubW9kZSA9IG9wdGlvbnMubW9kZSB8fCB0aGlzLm1vZGUgfHwgbnVsbFxuICAgIHRoaXMucmVmZXJyZXIgPSBudWxsXG5cbiAgICBpZiAoKHRoaXMubWV0aG9kID09PSAnR0VUJyB8fCB0aGlzLm1ldGhvZCA9PT0gJ0hFQUQnKSAmJiBib2R5KSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdCb2R5IG5vdCBhbGxvd2VkIGZvciBHRVQgb3IgSEVBRCByZXF1ZXN0cycpXG4gICAgfVxuICAgIHRoaXMuX2luaXRCb2R5KGJvZHkpXG4gIH1cblxuICBSZXF1ZXN0LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUmVxdWVzdCh0aGlzKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVjb2RlKGJvZHkpIHtcbiAgICB2YXIgZm9ybSA9IG5ldyBGb3JtRGF0YSgpXG4gICAgYm9keS50cmltKCkuc3BsaXQoJyYnKS5mb3JFYWNoKGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICBpZiAoYnl0ZXMpIHtcbiAgICAgICAgdmFyIHNwbGl0ID0gYnl0ZXMuc3BsaXQoJz0nKVxuICAgICAgICB2YXIgbmFtZSA9IHNwbGl0LnNoaWZ0KCkucmVwbGFjZSgvXFwrL2csICcgJylcbiAgICAgICAgdmFyIHZhbHVlID0gc3BsaXQuam9pbignPScpLnJlcGxhY2UoL1xcKy9nLCAnICcpXG4gICAgICAgIGZvcm0uYXBwZW5kKGRlY29kZVVSSUNvbXBvbmVudChuYW1lKSwgZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBmb3JtXG4gIH1cblxuICBmdW5jdGlvbiBoZWFkZXJzKHhocikge1xuICAgIHZhciBoZWFkID0gbmV3IEhlYWRlcnMoKVxuICAgIHZhciBwYWlycyA9ICh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkgfHwgJycpLnRyaW0oKS5zcGxpdCgnXFxuJylcbiAgICBwYWlycy5mb3JFYWNoKGZ1bmN0aW9uKGhlYWRlcikge1xuICAgICAgdmFyIHNwbGl0ID0gaGVhZGVyLnRyaW0oKS5zcGxpdCgnOicpXG4gICAgICB2YXIga2V5ID0gc3BsaXQuc2hpZnQoKS50cmltKClcbiAgICAgIHZhciB2YWx1ZSA9IHNwbGl0LmpvaW4oJzonKS50cmltKClcbiAgICAgIGhlYWQuYXBwZW5kKGtleSwgdmFsdWUpXG4gICAgfSlcbiAgICByZXR1cm4gaGVhZFxuICB9XG5cbiAgQm9keS5jYWxsKFJlcXVlc3QucHJvdG90eXBlKVxuXG4gIGZ1bmN0aW9uIFJlc3BvbnNlKGJvZHlJbml0LCBvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0ge31cbiAgICB9XG5cbiAgICB0aGlzLnR5cGUgPSAnZGVmYXVsdCdcbiAgICB0aGlzLnN0YXR1cyA9IG9wdGlvbnMuc3RhdHVzXG4gICAgdGhpcy5vayA9IHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMFxuICAgIHRoaXMuc3RhdHVzVGV4dCA9IG9wdGlvbnMuc3RhdHVzVGV4dFxuICAgIHRoaXMuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMgPyBvcHRpb25zLmhlYWRlcnMgOiBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpXG4gICAgdGhpcy51cmwgPSBvcHRpb25zLnVybCB8fCAnJ1xuICAgIHRoaXMuX2luaXRCb2R5KGJvZHlJbml0KVxuICB9XG5cbiAgQm9keS5jYWxsKFJlc3BvbnNlLnByb3RvdHlwZSlcblxuICBSZXNwb25zZS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKHRoaXMuX2JvZHlJbml0LCB7XG4gICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgc3RhdHVzVGV4dDogdGhpcy5zdGF0dXNUZXh0LFxuICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnModGhpcy5oZWFkZXJzKSxcbiAgICAgIHVybDogdGhpcy51cmxcbiAgICB9KVxuICB9XG5cbiAgUmVzcG9uc2UuZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogMCwgc3RhdHVzVGV4dDogJyd9KVxuICAgIHJlc3BvbnNlLnR5cGUgPSAnZXJyb3InXG4gICAgcmV0dXJuIHJlc3BvbnNlXG4gIH1cblxuICB2YXIgcmVkaXJlY3RTdGF0dXNlcyA9IFszMDEsIDMwMiwgMzAzLCAzMDcsIDMwOF1cblxuICBSZXNwb25zZS5yZWRpcmVjdCA9IGZ1bmN0aW9uKHVybCwgc3RhdHVzKSB7XG4gICAgaWYgKHJlZGlyZWN0U3RhdHVzZXMuaW5kZXhPZihzdGF0dXMpID09PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgc3RhdHVzIGNvZGUnKVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogc3RhdHVzLCBoZWFkZXJzOiB7bG9jYXRpb246IHVybH19KVxuICB9XG5cbiAgc2VsZi5IZWFkZXJzID0gSGVhZGVyc1xuICBzZWxmLlJlcXVlc3QgPSBSZXF1ZXN0XG4gIHNlbGYuUmVzcG9uc2UgPSBSZXNwb25zZVxuXG4gIHNlbGYuZmV0Y2ggPSBmdW5jdGlvbihpbnB1dCwgaW5pdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZXF1ZXN0XG4gICAgICBpZiAoUmVxdWVzdC5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihpbnB1dCkgJiYgIWluaXQpIHtcbiAgICAgICAgcmVxdWVzdCA9IGlucHV0XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoaW5wdXQsIGluaXQpXG4gICAgICB9XG5cbiAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuXG4gICAgICBmdW5jdGlvbiByZXNwb25zZVVSTCgpIHtcbiAgICAgICAgaWYgKCdyZXNwb25zZVVSTCcgaW4geGhyKSB7XG4gICAgICAgICAgcmV0dXJuIHhoci5yZXNwb25zZVVSTFxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQXZvaWQgc2VjdXJpdHkgd2FybmluZ3Mgb24gZ2V0UmVzcG9uc2VIZWFkZXIgd2hlbiBub3QgYWxsb3dlZCBieSBDT1JTXG4gICAgICAgIGlmICgvXlgtUmVxdWVzdC1VUkw6L20udGVzdCh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpKSB7XG4gICAgICAgICAgcmV0dXJuIHhoci5nZXRSZXNwb25zZUhlYWRlcignWC1SZXF1ZXN0LVVSTCcpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICBzdGF0dXM6IHhoci5zdGF0dXMsXG4gICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICAgICAgaGVhZGVyczogaGVhZGVycyh4aHIpLFxuICAgICAgICAgIHVybDogcmVzcG9uc2VVUkwoKVxuICAgICAgICB9XG4gICAgICAgIHZhciBib2R5ID0gJ3Jlc3BvbnNlJyBpbiB4aHIgPyB4aHIucmVzcG9uc2UgOiB4aHIucmVzcG9uc2VUZXh0XG4gICAgICAgIHJlc29sdmUobmV3IFJlc3BvbnNlKGJvZHksIG9wdGlvbnMpKVxuICAgICAgfVxuXG4gICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfVxuXG4gICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpXG4gICAgICB9XG5cbiAgICAgIHhoci5vcGVuKHJlcXVlc3QubWV0aG9kLCByZXF1ZXN0LnVybCwgdHJ1ZSlcblxuICAgICAgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09ICdpbmNsdWRlJykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBpZiAoJ3Jlc3BvbnNlVHlwZScgaW4geGhyICYmIHN1cHBvcnQuYmxvYikge1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2Jsb2InXG4gICAgICB9XG5cbiAgICAgIHJlcXVlc3QuaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsIHZhbHVlKVxuICAgICAgfSlcblxuICAgICAgeGhyLnNlbmQodHlwZW9mIHJlcXVlc3QuX2JvZHlJbml0ID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiByZXF1ZXN0Ll9ib2R5SW5pdClcbiAgICB9KVxuICB9XG4gIHNlbGYuZmV0Y2gucG9seWZpbGwgPSB0cnVlXG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcyk7XG4iXX0=
