import React from 'react';
import { Link } from 'react-router';
import AuthorActions from '../../actions/authorActions';
import toastr from 'toastr';

export default React.createClass({
    propTypes: {
        authors: React.PropTypes.array.isRequired
    },

    deleteAuthor(id, ev) {
        ev.preventDefault();
        AuthorActions.deleteAuthor(id);
        toastr.success('Author deleted.');
    },

    render: function () {
        return (
            <div>
                <table className="table">
                    <thead>
                        <th></th>
                        <th>ID</th>
                        <th>Name</th>
                    </thead>
                    <tbody>
                        {this.props.authors.map(createAuthorRow, this)}
                    </tbody>
                </table>
            </div>
        );

        function createAuthorRow (author) {
            return (
                <tr key={author.id}>
                    <td><a href="#" onClick={this.deleteAuthor.bind(this, author.id)}>Delete</a></td>
                    <td><Link to={ `/author/${author.id}` }>{author.id}</Link></td>
                    <td>{author.firstName} {author.lastName}</td>
                </tr>
            );
        }
    }
});