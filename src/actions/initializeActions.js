import Dispatcher from '../dispatcher/appDispatcher';
import { INITIALIZE } from '../constants/actionTypes';
import AuthorApi from '../api/authorApi';

export default {
    initApp() {
        Dispatcher.dispatch({
            actionType: INITIALIZE,
            initialData: {
                authors: AuthorApi.getAllAuthors()
            }
        });
    }
};