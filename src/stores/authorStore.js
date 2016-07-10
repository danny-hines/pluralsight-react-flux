import Dispatcher from '../dispatcher/appDispatcher';
import { INITIALIZE, CREATE_AUTHOR, UPDATE_AUTHOR, DELETE_AUTHOR } from '../constants/actionTypes';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

var _authors = [];

var AuthorStore = Object.assign({}, EventEmitter.prototype, {
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    getAllAuthors() {
        return _authors;
    },

    getAuthorById(id) {
        for (let i in _authors) {
            if (_authors[i].id === id) return _authors[i];
        }
    }
});

Dispatcher.register(function (action) {
    var existingAuthorIndex = -1;

    switch(action.actionType) {
        case INITIALIZE:
            _authors = action.initialData.authors;
            AuthorStore.emitChange();
            break;
        case CREATE_AUTHOR:
            _authors.push(action.author);
            AuthorStore.emitChange();
            break;
        case UPDATE_AUTHOR:
            for (let i in _authors) {
                if (_authors[i].id === action.author.id) {
                    existingAuthorIndex = i;
                    break;
                }
            }
            if (existingAuthorIndex > -1) {
                _authors.splice(existingAuthorIndex, 1, action.author);
                AuthorStore.emitChange();
            }
            break;
        case DELETE_AUTHOR:
            for (let i in _authors) {
                if (_authors[i].id === action.id) {
                    existingAuthorIndex = i;
                    break;
                }
            }
            if (existingAuthorIndex > -1) {
                _authors.splice(existingAuthorIndex, 1);
                AuthorStore.emitChange();
            }
    }
});

export default AuthorStore;