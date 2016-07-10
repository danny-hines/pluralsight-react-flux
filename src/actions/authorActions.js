import Dispatcher from '../dispatcher/appDispatcher';
import AuthorApi from '../api/authorApi';
import { CREATE_AUTHOR, UPDATE_AUTHOR, DELETE_AUTHOR } from '../constants/actionTypes';

export default {
    createAuthor(author) {
        var newAuthor = AuthorApi.saveAuthor(author);

        Dispatcher.dispatch({
            actionType: CREATE_AUTHOR,
            author: newAuthor
        });
    },

    updateAuthor(author) {
        var updateAuthor = AuthorApi.saveAuthor(author);

        Dispatcher.dispatch({
            actionType: UPDATE_AUTHOR,
            author: updateAuthor
        })
    },

    deleteAuthor(id) {
        AuthorApi.deleteAuthor(id);

        Dispatcher.dispatch({
            actionType: DELETE_AUTHOR,
            id: id
        });
    }
};