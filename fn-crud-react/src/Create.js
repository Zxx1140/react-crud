import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button, Typography, Grid, TextField } from '@mui/material';
import { useState } from 'react';

export default function Create() {
  const [user_fname, setFname] = useState('');
  const [user_lname, setLname] = useState('');
  const [user_email, setEmail] = useState('');
  const [user_img, setProfile] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify({
      user_fname,
      user_lname,
      user_email,
      user_img,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:1975/user/create', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert('สร้างข้อมูลเรียบร้อยแล้ว')
        window.location.href = '/';
      })
      .catch((error) => console.log('error', error));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom component="div">
          Create User
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="user_fname"
                name="user_fname"
                label="First Name"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setFname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="user_lname"
                name="user_lname"
                label="Last Name"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setLname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="user_email"
                name="user_email"
                label="Email"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="user_img"
                name="user_img"
                label="Profile"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setProfile(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" sx={{ bgcolor: 'primary', color: 'white' }}>
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
}