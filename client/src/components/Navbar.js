import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import { Logout } from "../components/Logout";


const Nav = () => {


  return (
    <AppBar position="static" className='navbar-top'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >          
          
        </Typography>          
          <Box sx={{ flexGrow: 0 }} id="setting">
            <Tooltip title="Open settings">
              <IconButton >
                <i className="fa fa-user text-white mt-2"> Jered Anguandia</i>
                <Logout />
              </IconButton>             
            </Tooltip>                       
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Nav;
