import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button, Typography, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function Update() {
  const { user_id } = useParams();

  const [user_fname, setFname] = useState('');
  const [user_lname, setLname] = useState('');
  const [user_email, setEmail] = useState('');
  const [user_img, setProfile] = useState('');

  useEffect(() => {
    fetch(`http://localhost:1975/user/${user_id}`)
    
      .then((response) => response.json())
      .then((result) => {
        setFname(result.user.user_fname);
        setLname(result.user.user_lname);
        setEmail(result.user.user_email);
        setProfile(result.user.user_img);
        alert('แก้ไขข้อมูลแล้ว')
        
        
      })
      .catch((error) => console.log('error', error));
  }, [user_id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      user_fname,
      user_lname,
      user_email,
      user_img,
      user_id: user_id,
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:1975/user/update', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert('Update ข้อมูลเรียบร้อยแล้ว');
        window.location.href = '/';
      })
      .catch((error) => console.log('error', error));
  };

  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="sm" sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom component="div">
        Update User
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="user_fname"
              name="user_fname"
              label={`First Name (${user_fname})`}
              variant="outlined"
              fullWidth
              required
              onChange={(e) => setFname(e.target.value)}
              value={user_fname}
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
            value={user_lname}
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
                    value={user_email}
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
                   value={user_img}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" sx={{ bgcolor: 'primary', color: 'white' }}>
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
}