import { put, takeLatest, all, call } from 'redux-saga/effects';
import UserApi from '../../api/UserApi';
import User from '../../models/User';
import Response from '../../models/Response';
import { addedUser, addUserError, deletedUser, deleteUserError, editedUser, editUserError, gatheredUserList, getUserListError, UserActions } from '../actions/UserActions';
import Action from '../../models/Action';

function* fetchUserList(): Generator<any, void, any> {
    const response: Response<User[]> = yield call(UserApi.getUserList);

    if (!!response.errorMessage) {
        yield put(getUserListError(response.errorMessage as string));
        return;
    }

    yield put(gatheredUserList(response.data as User[]));
}

function* addUser(action: Action<UserActions, User>): Generator<any, void, any> {
    const response: Response<User> = yield call(UserApi.addUser, action.payload as User);

    if (!!response.errorMessage) {
        yield put(addUserError(response.errorMessage as string));
        return;
    }

    yield put(addedUser(action.payload as User));
}

function* editUser(action: Action<UserActions, User>): Generator<any, void, any> {
    const response: Response<User> = yield call(UserApi.editUser, action.payload as User);

    if (!!response.errorMessage) {
        yield put(editUserError(response.errorMessage as string));
        return;
    }

    yield put(editedUser(action.payload as User));
}

function* deleteUser(action: Action<UserActions, string>): Generator<any, void, any> {
    const response: Response<void> = yield call(UserApi.deleteUser, action.payload as string);

    if (!!response.errorMessage) {
        yield put(deleteUserError(response.errorMessage as string));
        return;
    }

    yield put(deletedUser(action.payload as string));
}

function* actionWatcher() {
    yield takeLatest(UserActions.getUserList, fetchUserList);
    yield takeLatest(UserActions.addUser, addUser);
    yield takeLatest(UserActions.editUser, editUser);
    yield takeLatest(UserActions.deleteUser, deleteUser);
}

export default function* rootSaga() {
    yield all([actionWatcher(), ]);
}