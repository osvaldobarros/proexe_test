import { Box, Modal } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usePrevious from '../../hooks/usePrevious';
import State from '../../models/State';
import User from '../../models/User';
import { editUser } from '../../services/actions/UserActions';
import UserForm from '../UserForm';
import styles from './EditUserModal.module.css';

interface Props {
    user?: User;
    opened: boolean;
    closeModal: () => void;
}

const EditUserModal: React.FC<Props> = (props: Props) => {
    const dispatch = useDispatch();
    const userState = useSelector((state: State) => state);
    const { editingUser, editUserError } = userState;
    const wasEditingUser = usePrevious(editingUser);
    const { closeModal, opened, user } = props;

    useEffect(() => {
        if (!!editUserError) {
            alert(editUserError);
        } else if (wasEditingUser) {
            closeModal();
        }
    }, [editUserError, editingUser, wasEditingUser, closeModal]);

    const edit = (user: User) => {
        dispatch(editUser(user));
    }

    return (
        <Modal open={opened} onClose={closeModal}>
            <Box className={styles.card}>
                <UserForm
                    id={user?.id}
                    name={user?.name}
                    email={user?.email}
                    userName={user?.username}
                    city={user?.address.city}
                    loading={editingUser}
                    buttonSendTitle='Edit user'
                    sendform={(user) => edit(user)}
                />
            </Box>
        </Modal>
    );
}

export default EditUserModal;