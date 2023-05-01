import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Avatar } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:1975/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  const handleDelete = user_id =>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "user_id": user_id
    });
    
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:1975/user/delete", requestOptions)
      .then(response => response.json())
      .then((result) => {
        alert('ลบข้อมูลแล้ว')
        window.location.href = '/';
      })
      .catch(error => console.log('error', error));

  }
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={ { p:2}}>
        <Paper sx={ { p:3 } }>
          <Box display="flex">
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                User
              </Typography> 
            </Box>
            <Link to="create">
            <Box> 
              <Button variant="contained">Create</Button>
            </Box>
            </Link>
          </Box>
          <Box sx={{ height: 400, width: '100%', p:2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor:'#9adcfb' }}>
                  <TableCell>ID</TableCell>
                  <TableCell>FirstName</TableCell>
                  <TableCell>LastName</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Profile</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.user_id}>
                    <TableCell>{user.user_id}</TableCell>
                    <TableCell>{user.user_fname}</TableCell>
                    <TableCell>{user.user_lname}</TableCell>
                    <TableCell>{user.user_email}</TableCell>
                    <Link to={`/item/${user.user_id}`}>
                    <TableCell>
                      <Avatar alt={user.user_fname} src={user.user_img} />
                    </TableCell>
                   </Link>
                    <TableCell> 
                    <Link to={`/update/${user.user_id}`}>
                    <Button variant="contained" sx={{ backgroundColor:'#b26a00',  mr:2}} >Edit</Button> 
                    </Link>
                    </TableCell>                
                     <TableCell>
                    <Button variant="contained" sx={{ backgroundColor:'#a31545'}} onClick={() => handleDelete(user.user_id)}>Delete</Button> {/* ปุ่ม Delete */}
                 </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
}