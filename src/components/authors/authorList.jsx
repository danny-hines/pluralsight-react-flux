import React from 'react';
import { Link } from 'react-router';
import AuthorApi from '../../api/authorApi';

export default React.createClass({
    propTypes: {
        authors: React.PropTypes.array.isRequired
    },

    render: function () {
        return (
            <div>
                <table className="table">
                    <thead>
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
                    <td><Link to={ `/author/${author.id}` }>{author.id}</Link></td>
                    <td>{author.firstName} {author.lastName}</td>
                </tr>
            );
        }
    }
});