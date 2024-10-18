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

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/signin', { email, password });
      localStorage.setItem('token', response.data.accessToken);
      setSuccess('Login successful!');
      setOpen(true);
      navigate('/home');
      setError('');
      setTimeout(() => navigate('/home'), 2000); // Redirect to home
    } catch (err) {
      setError('Login failed. Please check your credentials.');
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
    <Grid container justifyContent="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={8} md={5}>
        <Paper elevation={10} style={{ padding: '20px', borderRadius: '15px' }}>
          <Grid container justifyContent="center">
            <Avatar style={{ backgroundColor: '#1976d2' }}>
              <LockOutlinedIcon />
            </Avatar>
          </Grid>
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            Log In
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
              Log In
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

export default Login;
