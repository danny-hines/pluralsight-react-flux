import React from 'react';
import { IndexLink, Link } from 'react-router';

export default React.createClass({
    render: function () {
        return (
            <div>
                <h1>Page Not Found</h1>
                <p>Whoops! Sorry, there is nothing to see here.</p>
                <p><IndexLink to="/">Back to Home</IndexLink></p>
            </div>
        );
    }
});