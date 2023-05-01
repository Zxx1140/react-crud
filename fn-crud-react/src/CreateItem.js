import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button, Typography, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CreateItem() {
  const { user_id } = useParams();


 
  const [item_name, setName] = useState('');
  const [item_img, setImg] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify({
        item_name,
        item_img,
        user_id:user_id
        
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:1975/items/create', requestOptions)
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
          Create Item
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="item_name"
                name="item_name"
                label="Name"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="item_img"
                name="item_img"
                label="Profile"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setImg(e.target.value)}
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