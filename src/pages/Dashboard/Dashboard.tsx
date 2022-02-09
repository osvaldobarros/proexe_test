import { Typography } from '@mui/material';
import React, { useState } from 'react';
import AddUserModal from '../../components/AddUserModal';
import DeleteUserModal from '../../components/DeleteUserModal';
import EditUserModal from '../../components/EditUserModal';
import UserTable from '../../components/UserTable';
import User from '../../models/User';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
    const [addUserModalOpened, setAddUserModalOpened] = useState(false);
    const [editUserModalOpened, setEditUserModalOpened] = useState(false);
    const [deleteUserModalOpened, setDeleteUserModalOpened] = useState(false);

    const handleAddUserModal = () => {
        setAddUserModalOpened(true);
    }

    const handleEditUserModal = (user: User) => {
        setSelectedUser(user);
        setEditUserModalOpened(true);
    }

    const handleDeleteUserModal = (user: User) => {
        setSelectedUser(user);
        setDeleteUserModalOpened(true);
    }
    
    return (
        <div className={styles.mainContainer}>
            <Typography id="modal-modal-title" variant="h3" component="h1" className={styles.dashboardTitle}>
                Dashboard
            </Typography>

            <UserTable
                onAddUserClick={handleAddUserModal}
                onEditUserClick={handleEditUserModal}
                onDeleteUserClick={handleDeleteUserModal}
            />

            <AddUserModal
                opened={addUserModalOpened}
                closeModal={() => setAddUserModalOpened(false)}
            />
            <EditUserModal
                opened={editUserModalOpened}
                user={selectedUser}
                closeModal={() => setEditUserModalOpened(false)}
            />
            <DeleteUserModal
                opened={deleteUserModalOpened}
                user={selectedUser}
                closeModal={() => setDeleteUserModalOpened(false)}
            />
        </div>
    );
}

export default Dashboard;