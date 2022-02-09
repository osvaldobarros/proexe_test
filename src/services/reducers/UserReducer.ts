import { SortDirection } from "@mui/material";
import Action from "../../models/Action";
import State from "../../models/State";
import User from "../../models/User";
import { UserActions } from "../actions/UserActions";

export const initialState: State = {
    userList: [],
    sortDirection: false,
    errorUserList: '',
    loadingUserList: false,
    deleteUserError: '',
    deletingUser: false,
    editUserError: '',
    editingUser: false,
    addUserError: '',
    addingUser: false
};

const reducer = (state: State = initialState, action: Action<UserActions, User | User[] | string | SortDirection>): State => {
    switch (action.type) {
        // GET USER
        case UserActions.getUserList:
           return { ...state, loadingUserList: true, errorUserList: '' };
        case UserActions.getUserListError:
            return { ...state, loadingUserList: false, errorUserList: action.payload as string };
        case UserActions.gatheredUserList:
            return { ...state, loadingUserList: false, userList: action.payload as User[] };

        // ADD USER
        case UserActions.addUser:
            return { ...state, addingUser: true, addUserError: '' };
        case UserActions.addUserError:
            return { ...state, addingUser: false, addUserError: action.payload as string };
        case UserActions.addedUser:
            return { ...state, addingUser: false, userList: [...state.userList, action.payload as User] };

        // EDIT USER
        case UserActions.editUser:
            return { ...state, editingUser: true, editUserError: '' };
        case UserActions.editUserError:
            return { ...state, editingUser: false, editUserError: action.payload as string };
        case UserActions.editedUser:
            const editedUser = action.payload as User;
            return { ...state, editingUser: false, userList: [...state.userList.map(user => user.id === editedUser.id as string ? editedUser : user)] };

        // DELETE USER
        case UserActions.deleteUser:
            return { ...state, deletingUser: true, deleteUserError: '' };
        case UserActions.deleteUserError:
            return { ...state, deletingUser: false, deleteUserError: action.payload as string };
        case UserActions.deletedUser:
            return { ...state, deletingUser: false, userList: [...state.userList.filter(user => user.id !== action.payload)] };

        // SORTING
        case UserActions.sortDirection:
            return { ...state, sortDirection: action.payload as SortDirection };

        default: 
           return state;
    }
};

export default reducer;