import {  TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Utils from '../../helpers/Utils';
import User from '../../models/User';
import LoadingButton from '../LoadingButton';
import styles from './UserForm.module.css';

interface Props {
    id?: string;
    name?: string;
    email?: string;
    userName?: string;
    city?: string;
    loading: boolean;
    buttonSendTitle: string;
    sendform: (user: User) => void;
}

const UserForm: React.FC<Props> = (props: Props) => {
    const [nameValidationMessage, setNameValidationMessage] = useState('');
    const [emailValidationMessage, setEmailValidationMessage] = useState('');
    const [name, setName] = useState(props.name ?? '');
    const [email, setEmail] = useState(props.email ?? '');
    const [username, setUsername] = useState(props.userName ?? '');
    const [city, setCity] = useState(props.city ?? '');
    const { buttonSendTitle, id, loading, sendform } = props;

    const onSend = () => {
        sendform({
            id: id ?? Math.floor(Math.random() * 100).toString(),
            name,
            email,
            username,
            address: {
                city
            }
        });
    }

    const onNameChange = (name: string) => {
        setName(name);
        
        if (!name) {
            setNameValidationMessage("Name is required");
        } else if (!!nameValidationMessage) {
            setNameValidationMessage("");
        }
    }

    const onEmailChange = (email: string) => {
        setEmail(email);
        
        if (!email) {
            setEmailValidationMessage("Email is required");
        } else if (!Utils.validateEmail(email)) {
            setEmailValidationMessage("Email should be valid");
        } else if (!!emailValidationMessage) {
            setEmailValidationMessage("");
        }
    }

    return (
        <div>
            <Typography id="modal-modal-title" variant="h4" component="h2" className={styles.title}>
                User Form
            </Typography>
            <div>
                <TextField
                    required
                    className={styles.input}
                    error={!!nameValidationMessage}
                    helperText={nameValidationMessage}
                    label={"Name"}
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                />
                <TextField
                    required
                    className={styles.input}
                    error={!!emailValidationMessage}
                    label={"Email"}
                    type={"email"}
                    helperText={emailValidationMessage}
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                />
                <TextField
                    className={styles.input}
                    label={"Username"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    className={styles.input}
                    label={"City"}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>
            <div className={styles.buttonContainer}>
                <LoadingButton onClick={onSend} disabled={!name || !email || !!emailValidationMessage} loading={loading} title={buttonSendTitle}/>
            </div>
        </div>
    );
}

export default UserForm;