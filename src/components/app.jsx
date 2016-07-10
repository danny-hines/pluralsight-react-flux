import React from 'react';
import Header from './common/header';

export default React.createClass({
    render: function () {
        return (
            <div>
                <Header />
                <div className="container-fluid">
                    {this.props.children}
                </div>
            </div>
        );
    }
});