import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios'; // Assurez-vous d'importer axios

export default function VerifyEmail() {
    const { token } = useParams();
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            try {
                // REMPLACER cette ligne :
                // await authProvider.verifyEmail(token);
                // PAR cette ligne :
                const response = await axios.post(`http://localhost:8008/verify-email/${token}`);

                if (response.status === 200 && response.data.message === 'confirmed') {
                    setStatus('success');
                    setMessage('Your email has been verified successfully!');
                } else {
                    // Gérer les cas où le statut HTTP est OK, mais la réponse n'est pas celle attendue
                    setStatus('error');
                    setMessage('Verification failed. Invalid response from server.');
                }
            } catch (err) {
                // Gérer les erreurs de requête HTTP (ex: 400 Bad Request)
                setStatus('error');
                if (err.response && err.response.data && err.response.data.message) {
                    setMessage(err.response.data.message); // Récupère le message d'erreur du serveur
                } else {
                    setMessage('Verification failed. Server is unreachable.');
                }
            }
        };

        verify();
    }, [token]);

    // Le reste du code de votre composant est parfait, pas besoin de le modifier.
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