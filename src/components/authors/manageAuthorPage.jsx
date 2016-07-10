import React from 'react';
import AuthorForm from './authorForm';

export default React.createClass({
    getInitialState() {
        return {
            author: {
                id: '',
                firstName: '',
                lastName: ''
            }  
        };
    },

    setAuthorState (ev) {
        var field = ev.target.name;
        var value = ev.target.value;
        this.state.author[field] = value;
        return this.setState({
            author: this.state.author
        });
    },

    render() {
        return (
            <AuthorForm 
                author={this.state.author}
                onChange={this.setAuthorState}
            />
        );
    }
});