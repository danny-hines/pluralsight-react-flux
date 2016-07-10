import React from 'react';
import AuthorApi from '../../api/authorApi';
import AuthorList from './authorList';
import { Link } from 'react-router';

export default React.createClass({
    getInitialState () {
        return {
            authors: []  
        };
    },

    componentDidMount () {
        if (!this.isMounted()) return;

        this.setState({
            authors: AuthorApi.getAllAuthors()
        });
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