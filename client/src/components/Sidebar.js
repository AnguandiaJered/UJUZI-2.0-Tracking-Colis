import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IconContext } from "react-icons/lib";
import {SidebarData} from './SidebarData';
import { Link } from "react-router-dom";



const drawerWidth = 250;

export const Sidebar = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
    
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background:'#0098A5!important',
          },
        }}
        variant="permanent"
        anchor="left" 
        
      >
          <div className="navbar-brand">
                <Link to="/" className="nav-link">
                <h5 className='text-white'>TRACKING COLIS</h5>
                </Link>
          </div>    
        <Divider />   
            <IconContext.Provider value={{color:'#fff'}}>
                <List>
                  {
                    SidebarData.map((item,index) => {
                      return <ListItem key={index} onClick={() => {window.location.pathname = item.path; } } className="listeitem">
                        <ListItemIcon className="text-white listtext">{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} className="text-white listtext" />
                      </ListItem>
                    })
                  }
                </List>
            </IconContext.Provider>   
      </Drawer>
     
    </Box>
  );
}