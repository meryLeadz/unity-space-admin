import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, InputAdornment, IconButton, Snackbar, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // Fonction de validation de l'email
    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    // Fonction de validation du mot de passe (8 caractères min, alpha-numérique)
    const validatePassword = (password) => {
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
        return regex.test(password);
    };

    // Fonction de gestion du changement d'email avec validation en temps réel
    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        if (newEmail && !validateEmail(newEmail)) {
            setEmailError("Please enter a valid email address.");
        } else {
            setEmailError("");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Efface tous les messages d'erreur au début de la soumission
        setError('');
        setEmailError('');
        setPasswordError('');

        // 1. Validation du format de l'e-mail
        if (!validateEmail(email)) {
            // L'erreur est maintenant gérée par le `TextField` grâce à `emailError`
            setEmailError("Please enter a valid email address.");
            return;
        }

        // 2. Validation du format du mot de passe
        if (!validatePassword(password)) {
            setPasswordError("Password must be at least 8 characters long and include letters and numbers.");
            return;
        }

        // 3. Vérification de la correspondance des mots de passe
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }

        // Si toutes les validations côté client sont passées, on envoie la requête
        try {
            const response = await axios.post('https://68b18b6da860fe41fd5ecec5.mockapi.io/users', {
                email: email,
                password: password,
            });
            console.log('User registered:', response.data);
            navigate('/confirmation-inscription', {
                state: { email: email }
            })
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
            <Typography variant="h5">Register</Typography>
            <form onSubmit={handleRegister} style={{ width: '300px', marginTop: '1rem' }}>
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    error={!!emailError}
                    helperText={emailError}
                    fullWidth
                    margin='normal'
                    required
                />

                <TextField
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    error={!!passwordError}
                    helperText={passwordError}
                    fullWidth
                    margin="normal"
                    required
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    error={!!passwordError}
                    helperText={passwordError}
                    fullWidth
                    margin="normal"
                    required
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Le message d'erreur générique est maintenant réservé aux erreurs de requête API */}
                {error && <Typography color="error">{error}</Typography>}

                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Register
                </Button>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                message={successMessage} />
            <Alert severity='success' sx={{ width: '100%' }}>
                {successMessage}
            </Alert>
        </Box>
    );
}