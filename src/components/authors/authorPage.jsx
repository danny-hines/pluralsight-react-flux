import React from 'react';
import AuthorStore from '../../stores/authorStore';
import AuthorActions from '../../actions/authorActions';
import AuthorList from './authorList';
import { Link } from 'react-router';

export default React.createClass({
    _onChange() {
        this.setState({
            authors: AuthorStore.getAllAuthors()
        });
    },

    componentWillMount() {
        AuthorStore.addChangeListener(this._onChange);  
    },

    componentWillUnmount() {
        AuthorStore.removeChangeListener(this._onChange);  
    },

    getInitialState () {
        return {
            authors: AuthorStore.getAllAuthors()
        };
    },

    render () {
        return (
            <div>
                <h1>Authors</h1>
                <Link to="/author" className="btn btn-default">Add Author</Link>
                <AuthorList authors={this.state.authors} />
            </div>
        );
    }
});