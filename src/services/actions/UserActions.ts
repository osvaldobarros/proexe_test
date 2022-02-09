import { SortDirection } from "@mui/material";
import Action from "../../models/Action";
import User from "../../models/User";

export enum UserActions {
    // GET USER
    getUserList =  'GET_USER_LIST',
    gatheredUserList =  'GATHERED_USER_LIST',
    getUserListError = 'GET_USER_ERROR',

    // ADD USER
    addUser = 'ADD_USER',
    addedUser = 'ADDED_USER',
    addUserError = 'ADD_USER_ERROR',

    // EDIT USER
    editUser = 'EDIT_USER',
    editedUser = 'EDITED_USER',
    editUserError = 'EDIT_USER_ERROR',

    // DELETE USER
    deleteUser = 'DELETE_USER',
    deletedUser = 'DELETED_USER',
    deleteUserError = 'DELETE_USER_ERROR',

    // SORTING
    sortDirection = 'SET_SORTING_DIRECTION'
};

// GET USER
export const getUserList = (): Action<UserActions, void> => ({ type: UserActions.getUserList });
export const gatheredUserList = (userList: User[]): Action<UserActions, User[]> => ({ type: UserActions.gatheredUserList, payload: userList });
export const getUserListError = (errorMessage: string): Action<UserActions, string> => ({ type: UserActions.getUserListError, payload: errorMessage });

// ADD USER
export const addUser = (user: User): Action<UserActions, User> => ({ type: UserActions.addUser, payload: user });
export const addedUser = (user: User): Action<UserActions, User> => ({ type: UserActions.addedUser, payload: user });
export const addUserError = (errorMessage: string): Action<UserActions, string> => ({ type: UserActions.addUserError, payload: errorMessage });

// EDIT USER
export const editUser = (user: User): Action<UserActions, User> => ({ type: UserActions.editUser, payload: user });
export const editedUser = (user: User): Action<UserActions, User> => ({ type: UserActions.editedUser, payload: user });
export const editUserError = (errorMessage: string): Action<UserActions, string> => ({ type: UserActions.editUserError, payload: errorMessage });

// DELETE USER
export const deleteUser = (userId: string): Action<UserActions, string> => ({ type: UserActions.deleteUser, payload: userId });
export const deletedUser = (userId: string): Action<UserActions, string> => ({ type: UserActions.deletedUser, payload: userId });
export const deleteUserError = (errorMessage: string): Action<UserActions, string> => ({ type: UserActions.deleteUserError, payload: errorMessage });

// SORTING
export const sortUsers = (sortDirection: SortDirection): Action<UserActions, SortDirection> => ({ type: UserActions.sortDirection, payload: sortDirection });