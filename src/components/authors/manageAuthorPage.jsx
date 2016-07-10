import React from 'react';
import { hashHistory, withRouter } from 'react-router';
import AuthorForm from './authorForm';
import AuthorApi from '../../api/authorApi';
import toastr from 'toastr';

export default withRouter(
    React.createClass({
        // Dirty needs to be an instance property, not in state.
        // Setting state is not guaranteed to happen synchronously,
        // and dirty doesn't belong there since it doesn't affect
        // rendering.
        dirty: false,

        routerWillLeave(nextLocation) {
            if (this.dirty) {
                return 'Leave without saving?';
            }
            return true;
        },

        componentWillMount() {
            var authorId = this.props.params.id;

            if (authorId) {
                this.setState({
                    author: AuthorApi.getAuthorById(authorId)
                });
            }
        },

        componentDidMount() {
            this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);  
        },

        getInitialState() {
            return {
                author: {
                    id: '',
                    firstName: '',
                    lastName: ''
                },
                errors: {}
            };
        },

        setAuthorState(ev) {
            this.dirty = true;
            var field = ev.target.name;
            var value = ev.target.value;
            this.state.author[field] = value;
            return this.setState({
                author: this.state.author
            });
        },

        authorFormIsValid() {
            var formIsValid = true;
            this.state.errors = {}; // clear any previous errors

            this.state.author.firstName = (this.state.author.firstName || '').trim();
            this.state.author.lastName = (this.state.author.lastName || '').trim();

            if (!this.state.author.firstName) {
                this.state.errors.firstName = 'First name must be provided.';
                formIsValid = false;
            }

            if (!this.state.author.lastName) {
                this.state.errors.lastName = 'Last name must be provided.';
                formIsValid = false;
            }

            this.setState({
                errors: this.state.errors
            });

            return formIsValid;
        },

        saveAuthor(ev) {
            ev.preventDefault();

            if (!this.authorFormIsValid()) {
                return;
            }

            AuthorApi.saveAuthor(this.state.author);
            this.dirty = false;
            toastr.success('Author saved.');
            hashHistory.push('/authors');
        },

        render() {
            return (
                <AuthorForm 
                    author={this.state.author}
                    onChange={this.setAuthorState}
                    onSave={this.saveAuthor}
                    errors={this.state.errors}
                />
            );
        }
    })
);