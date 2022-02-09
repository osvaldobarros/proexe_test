import { Button, Box, Modal, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usePrevious from '../../hooks/usePrevious';
import State from '../../models/State';
import User from '../../models/User';
import { deleteUser } from '../../services/actions/UserActions';
import LoadingButton from '../LoadingButton';
import styles from './DeleteUserModal.module.css';

interface Props {
    user?: User;
    opened: boolean;
    closeModal: () => void;
}

const DeleteUserModal: React.FC<Props> = (props: Props) => {
    const dispatch = useDispatch();
    const userState = useSelector((state: State) => state);
    const { deletingUser, deleteUserError } = userState;
    const wasDeletingUser = usePrevious(deletingUser);
    const { opened, user, closeModal } = props;

    useEffect(() => {
        if (!!deleteUserError) {
            alert(deleteUserError);
        } else if (wasDeletingUser) {
            closeModal();
        }
    }, [deleteUserError, deletingUser, closeModal, wasDeletingUser]);

    const remove = (userId: string) => {
        dispatch(deleteUser(userId));
    }

    return (
        <Modal open={opened} onClose={closeModal}>
            <Box className={styles.card}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Delete user
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Are you sure that you want to delete user {user?.username}?
                </Typography>
                <div style={{marginTop: 20}}>
                    <Button variant="contained" onClick={closeModal} style={{marginRight: 15}}>Cancel</Button>
                    <LoadingButton title='Delete' loading={deletingUser} onClick={() => remove(user!.id)}/>
                </div>
            </Box>
        </Modal>
    );
}

export default DeleteUserModal;