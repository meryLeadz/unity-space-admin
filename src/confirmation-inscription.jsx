import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios'; // N'oubliez pas d'importer axios

export default function ConfirmationPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state || {};

    // Ajoutez un nouvel état pour gérer l'état de la vérification et les messages
    const [verificationStatus, setVerificationStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
    const [verificationMessage, setVerificationMessage] = useState('');

    // const handleSimulateVerification = async () => {
    //     setVerificationStatus('loading');

    //     // Simule la vérification avec un token "x" (réussite)
    //     const tokenToTest = 'x';

    //     try {
    //         const response = await axios.get(`http://localhost:8008/verify-email/${tokenToTest}`);

    //         if (response.status === 200 && response.data.message === 'confirmed') {
    //             setVerificationStatus('success');
    //             setVerificationMessage('Votre e-mail a été vérifié avec succès!');
    //         } else {
    //             setVerificationStatus('error');
    //             setVerificationMessage('La vérification a échoué. Réponse invalide du serveur.');
    //         }
    //     } catch (err) {
    //         setVerificationStatus('error');
    //         setVerificationMessage('Erreur de connexion au serveur de vérification.');
    //     }
    // };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Inscription réussie !
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
                Un e-mail de confirmation a été envoyé à l'adresse suivante :
            </Typography>
            <Typography variant="body1" fontWeight="bold" sx={{ mt: 1, mb: 3 }}>
                {email}
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
                Veuillez vérifier votre boîte de réception et cliquer sur le lien pour valider votre compte.
            </Typography>

            {/* Affichez les messages de vérification ici */}
            {verificationStatus === 'loading' && <Typography color="text.secondary">Vérification en cours...</Typography>}
            {verificationStatus === 'success' && <Typography color="green" sx={{ my: 2 }}>{verificationMessage}</Typography>}
            {verificationStatus === 'error' && <Typography color="error" sx={{ my: 2 }}>{verificationMessage}</Typography>}

            {/* Le nouveau bouton pour simuler la vérification */}
            {/* <Button
                variant="contained"
                color="secondary"
                onClick={handleSimulateVerification}
                sx={{ mt: 2 }}
                disabled={verificationStatus === 'loading' || verificationStatus === 'success'}
            >
                Simuler la vérification
            </Button> */}

            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/login')}
                sx={{ mt: 2 }}
            >
                Retour à la page de connexion
            </Button>
        </Box>
    );
}