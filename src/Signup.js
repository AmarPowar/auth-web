import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Grid,
  Avatar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

function Signup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const minLength = 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return (
      password.length >= minLength &&
      hasLetter &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long, contain at least one letter, one number, and one special character.');
      setOpen(true);
      return;
    }

    try {
      await axios.post('http://localhost:3001/signup', { email, name, password });
      setSuccess('Signup successful! Redirecting...');
      setOpen(true);
      setError('');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError('Signup failed. Please try again.');
      setOpen(true);
      setSuccess('');
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Grid container justifyContent="center" style={{ minHeight: '100%' }}>
      <Grid item xs={12} sm={8} md={5}>
        <Paper elevation={10} style={{ padding: '20px', borderRadius: '15px' }}>
          <Grid container justifyContent="center">
            <Avatar style={{ backgroundColor: '#1976d2' }}>
              <LockOutlinedIcon />
            </Avatar>
          </Grid>
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            Sign Up
          </Typography>
          {error && <Alert severity="error" onClose={handleClose}>{error}</Alert>}
          {success && <Alert severity="success" onClose={handleClose}>{success}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Name"
              type="text"
              fullWidth
              margin="normal"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Sign Up
            </Button>
          </form>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={error ? 'error' : 'success'}>
              {error || success}
            </Alert>
          </Snackbar>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Signup;
