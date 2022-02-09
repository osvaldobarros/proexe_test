import { Box, Modal } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usePrevious from '../../hooks/usePrevious';
import State from '../../models/State';
import User from '../../models/User';
import { addUser } from '../../services/actions/UserActions';
import UserForm from '../UserForm';
import styles from './AddUserModal.module.css';

interface Props {
    opened: boolean;
    closeModal: () => void;
} 

const AddUserModal: React.FC<Props> = (props: Props) => {
    const dispatch = useDispatch();
    const userState = useSelector((state: State) => state);
    const { addingUser, addUserError } = userState;
    const wasAddingUser = usePrevious(addingUser);
    const { closeModal, opened } = props;

    useEffect(() => {
        if (!!addUserError) {
            alert(addUserError);
        } else if (wasAddingUser) {
            closeModal();
        }
    }, [addUserError, addingUser]);

    const add = (user: User) => {
        dispatch(addUser(user));
    }

    return (
        <Modal open={opened} onClose={closeModal}>
            <Box className={styles.card}>
                <UserForm
                    loading={addingUser}
                    buttonSendTitle='Add user'
                    sendform={(user) => add(user)}
                />
            </Box>
        </Modal>
    );
}

export default AddUserModal;