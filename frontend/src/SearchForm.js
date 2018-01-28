import React, {Component} from 'react';
import fetch from './fetch';
import AutocompleteInput from "./containers/form/AutocompleteInput";

class SearchForm extends Component {
    constructor() {
        super();
        this.state = {
            from: null,
        };
    }

    componentDidMount() {
        fetch('places', {term: 'Brn', v: 2, locale: 'en'}).then(
            (data) => console.log(data)
        )
    }

    render() {
        const {from} = this.state;
        return (
            <form>
                <AutocompleteInput
                    name="from"
                    label="from:"
                    value={from}
                    onChange={(value) => this.setState({from: value})}
                />
            </form>
        );
    }
}

export default SearchForm;