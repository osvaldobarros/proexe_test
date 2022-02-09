import { SortDirection } from "@mui/material";
import User from "./User";

interface State {
    userList: User[];
    sortDirection: SortDirection;
    errorUserList: string;
    loadingUserList: boolean;
    deleteUserError: string;
    deletingUser: boolean;
    editUserError: string;
    editingUser: boolean;
    addUserError: string;
    addingUser: boolean;
}

export default State;