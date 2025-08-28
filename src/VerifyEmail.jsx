import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import authProvider from './authProvider';

export default function VerifyEmail() {
    const { token } = useParams();
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            try {
                await authProvider.verifyEmail(token);
                setStatus('success');
                setMessage('Your email has been verified successfully!');
            } catch (err) {
                setStatus('error');
                setMessage(err.message || 'Verification failed');
            }
        };

        verify();
    }, [token]);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
            {status === 'verifying' && <Typography>Verifying your email...</Typography>}
            {status === 'success' && (
                <>
                    <Typography color="green" variant="h6">{message}</Typography>
                    <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => navigate('/login')}>
                        Go to Login
                    </Button>
                </>
            )}
            {status === 'error' && (
                <>
                    <Typography color="error" variant="h6">{message}</Typography>
                    <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => navigate('/register')}>
                        Try Register Again
                    </Button>
                </>
            )}
        </Box>
    );
}
