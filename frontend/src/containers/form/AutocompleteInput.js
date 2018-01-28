import React, {Component} from 'react';
import PropTypes from 'prop-types';
import fetch from '../../fetch';
import Autocomplete from 'react-autocomplete';
import './AutocompleteInput.css';

class AutocompleteInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            autocomplete: [],
        };

        this.onItemSelect = this.onItemSelect.bind(this);
        this.getItemValue = this.getItemValue.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onItemSelect(value, item) {
        this.props.onChange(value);
        this.setState({autocomplete: [ item ] })
    }
    getItemValue(item) {
        return item.value;
    }
    onChange(event, value) {
        this.props.onChange(value);
        fetch('places', {term: value, v: 2, locale: 'en'})
            .then(
                (items) => this.setState({autocomplete: items.slice(0, 100)})
            );
    }
    renderMenu(children) {
        return (
            <ul className="form-input--menu">
                {children}
            </ul>
        );
    }
    renderItem(item, isHighlighted) {
        return (
            <li
                className={`form-input--item ${isHighlighted ? 'form-input--item-highlighted' : ''}`}
                key={item.id}
            >
                {item.value}
            </li>
        )
    }
    render() {
        const {name, label, value} = this.props;
        return (
            <div className="form-input">
                <label htmlFor={`from-input-${name}`}>{label}</label>
                <Autocomplete
                    inputProps={{ id: `from-input-${name}` }}
                    value={value}
                    items={this.state.autocomplete}
                    getItemValue={this.getItemValue}
                    onSelect={this.onItemSelect}
                    onChange={this.onChange}
                    renderMenu={this.renderMenu}
                    renderItem={this.renderItem}
                />
            </div>
        );
    }
}

AutocompleteInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default AutocompleteInput;