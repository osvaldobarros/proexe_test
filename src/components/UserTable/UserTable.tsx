import { CircularProgress, Paper, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, SortDirection } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import State from '../../models/State';
import User from '../../models/User';
import { getUserList, sortUsers } from '../../services/actions/UserActions';
import { getSortedUsers } from '../../services/selectors/UserSelector';
import styles from './UserTable.module.css';

interface Props {
    onAddUserClick: () => void;
    onEditUserClick: (user: User) => void;
    onDeleteUserClick: (user: User) => void;
}

const UserTable: React.FC<Props> = (props) => {
    const { onAddUserClick, onDeleteUserClick, onEditUserClick } = props;
    const dispatch = useDispatch();
    const userProps = useSelector((state: State) => state);
    const userList = useSelector(getSortedUsers);
    const { errorUserList, loadingUserList, sortDirection } = userProps;

    useEffect(() => {
        dispatch(getUserList());
    }, [dispatch]);

    const changeSortDirection = (sortDirection: SortDirection) => {
        if (sortDirection === 'asc' as SortDirection) {
            dispatch(sortUsers('desc'));
        } else {
            dispatch(sortUsers('asc'));
        }
    }

    if (loadingUserList) {
        return (
            <div className={styles.centerContainer}>
                <CircularProgress />
            </div>
        );
    }

    if (!!errorUserList) {
        return  (
            <div className={styles.centerContainer}>
                <Typography variant="h4" component="h4" className={styles.header}>{errorUserList}</Typography>
            </div>
        );
    }

    return (
        <div className={styles.tableContainer}>
            {!userList.length ? (
                <div className={styles.centerContainer}>
                    <Typography id="modal-modal-title" variant="h4" component="h2" className={styles.header}>
                        There are no users registered
                    </Typography>
                </div>
            ) : (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650}} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Id</TableCell>
                                <TableCell align="right">
                                    Name
                                    <TableSortLabel
                                        direction={sortDirection ? sortDirection : undefined}
                                        active={true}
                                        onClick={() => changeSortDirection(sortDirection)}
                                    />
                                </TableCell>
                                <TableCell align="right">Username</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">City</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userList.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell align="right">{user.id}</TableCell>
                                    <TableCell align="right">{user.name}</TableCell>
                                    <TableCell align="right">{user.username}</TableCell>
                                    <TableCell align="right">{user.email}</TableCell>
                                    <TableCell align="right">{user.address.city}</TableCell>
                                    <TableCell align="right">
                                        <div>
                                            <Button variant="contained" onClick={() => onEditUserClick(user)} style={{marginRight: 15}}>Edit</Button>
                                            <Button variant="outlined" onClick={() => onDeleteUserClick(user)} color="error">Delete</Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Button variant="contained" onClick={onAddUserClick} style={{float: 'right', marginTop: 10}}>Add user</Button>
        </div>
    );
}

export default UserTable;