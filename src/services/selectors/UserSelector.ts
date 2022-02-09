import State from "../../models/State";
import { SortDirection } from "@mui/material";

export const getSortedUsers = (state: State) => {
  const direction = state.sortDirection;

  if (direction === 'asc'  as SortDirection) {
    return state.userList.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
  } else if (direction === 'desc'  as SortDirection) {
    return state.userList.sort((a,b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0));
  }

  return state.userList;
}