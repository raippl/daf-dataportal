import React, { Component, PropTypes } from 'react'
import fetch from 'isomorphic-fetch';
import Select from 'react-select'
import 'react-select/dist/react-select.css';
 
class TestSelect extends Component {
    constructor(props) {
        super(props)
        this.url = this.props.url
    }
    getOptions() {
      return fetch(this.url)
		.then((response) => response.json())
		.then((json) => {
			return { options: json };
		});
        
    }
    onChange(event) {
        // console.log(event)
 
        if (this.props.input.onChange && event != null) {
            // To be aligned with how redux-form publishes its CHANGE action payload. The event received is an object with 2 keys: "value" and "label"
            this.props.input.onChange(event.value);
        } else {
            // Clear the input field
            this.props.input.onChange(null)
        }
    }
 
    render() {
        return ( 
            <Select.Async {...this.props }
            value = { this.props.input.value || '' }
            onBlur = {() => this.props.input.onBlur(this.props.input.value) }
            onChange = { this.onChange.bind(this) }
            loadOptions = { this.getOptions.bind(this) }
            />
        );
    }
}
 
export default TestSelect;

/*import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';


const TestSelect = createClass({
	displayName: 'GithubUsers',
	propTypes: {
		label: PropTypes.string,
	},
	getInitialState () {
		return {
			backspaceRemoves: true,
			multi: false
		};
	},
	onChange (value) {
		this.setState({
			value: value,
		});
	},
	switchToMulti () {
		this.setState({
			multi: true,
			value: [this.state.value],
		});
	},
	switchToSingle () {
		this.setState({
			multi: false,
			value: this.state.value ? this.state.value[0] : null
		});
	},
	getUsers (input) {
		if (!input) {
			return Promise.resolve({ options: [] });
		}

		return fetch(`https://api.github.com/search/users?q=${input}`)
		.then((response) => response.json())
		.then((json) => {
			return { options: json.items };
		});
	},
	gotoUser (value, event) {
		window.open(value.html_url);
	},
	toggleBackspaceRemoves () {
		this.setState({
			backspaceRemoves: !this.state.backspaceRemoves
		});
	},
	toggleCreatable () {
		this.setState({
			creatable: !this.state.creatable
		});
	},
	render () {
		const AsyncComponent = this.state.creatable
			? Select.AsyncCreatable
			: Select.Async;

		return (
				<AsyncComponent multi={this.state.multi} value={this.state.value} onChange={this.onChange} onValueClick={this.gotoUser} valueKey="id" labelKey="login" loadOptions={this.getUsers} backspaceRemoves={this.state.backspaceRemoves} />
		);
	}
});

export default TestSelect
*/