import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/app';
import HomePage from './components/homePage';
import AuthorPage from './components/authors/authorPage';
import ManageAuthorPage from './components/authors/manageAuthorPage';
import AboutPage from './components/about/aboutPage';
import NotFoundPage from './components/common/notFoundPage';

export default (
    <Router history={ hashHistory }>
        <Route path="/" component={ App }>
            <IndexRoute component={ HomePage } />
            <Route path="authors" component={ AuthorPage } />
            <Route path="author" component={ ManageAuthorPage } />
            <Route path="author/:id" component={ ManageAuthorPage } />
            <Route path="about" component={ AboutPage } />
            <Route path="*" component={ NotFoundPage } />
        </Route>
    </Router>
);