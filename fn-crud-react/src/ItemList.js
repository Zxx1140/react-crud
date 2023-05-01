import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Avatar } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';


export default function ItemList() {
    const { user_id } = useParams();


  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:1975/item/'+user_id)
      .then(response => response.json())
      .then(data => setUsers(data))
    
  }, [user_id]);

  const handleDelete = item_id =>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "item_id": item_id
    });
    
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:1975/item/delete", requestOptions)
      .then(response => response.json())
      .then((result) => {
        alert('ลบข้อมูลแล้ว')
        window.location.reload();
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
            <Link to={`create/${user_id}`}>
            <Box> 
              <Button variant="contained">Create</Button>
            </Box>
            </Link>
          </Box>
          <Box sx={{ height: 400, width: '100%', p:2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor:'#7d6d99' }}>
                  <TableCell>ID</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>IMAGE Profile</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
      
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.item_id}>
                    <TableCell>{user.item_id}</TableCell>
                    <TableCell>{user.item_name}</TableCell>
                  
                    <TableCell>
                      <Avatar alt={user.item_name} src={user.item_img} />
                    </TableCell>
                    <TableCell>
                    <Button variant="contained" sx={{ backgroundColor:'#a31545'}} onClick={() => handleDelete(user.item_id)}>Delete</Button> {/* ปุ่ม Delete */}
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