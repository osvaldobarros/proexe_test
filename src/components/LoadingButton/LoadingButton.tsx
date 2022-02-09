import { Button, CircularProgress } from '@mui/material';
import React from 'react';

interface Props {
    loading: boolean;
    disabled?: boolean;
    title: string;
    onClick: () => void;
}

const LoadingButton: React.FC<Props> = (props: Props) => {
    const { disabled, loading, title, onClick } = props;
    return (
        <Button variant="outlined" onClick={onClick} disabled={loading || disabled} style={{minWidth: 90}}>
            {loading ? (
                <CircularProgress size={25}/>
            ) : title}
        </Button>
    );
}

export default LoadingButton;