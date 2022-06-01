import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
// import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import StadiumIcon from '@mui/icons-material/Stadium';
import FaxIcon from '@mui/icons-material/Fax';

export const SidebarData = [
    {
        title: "Dashboard",
        path: "/",
        icon: <HomeIcon />     
    },
    {
        title: "Clients",
        path: "/client",
        icon: <AccountCircleIcon />     
    },   
    {
        title: "Destination",
        path: "/destination",
        icon: <AddLocationAltIcon />,
    },
    {
        title: "Colis",
        path: "/colis",
        icon: <StadiumIcon />,
    },
    {
        title: "Expedition",
        path: "/expedition",
        icon: <FaxIcon />,
    },
    // {
    //     title: "Localisation",
    //     path: "/localisation",
    //     icon: <ShareLocationIcon />,
    // } , 
    {
        title: "Paiements",
        path: "/paiement",
        icon: <MonetizationOnIcon />     
    },
    {
        title: "Agents",
        path: "/agent",
        icon: <PersonIcon />     
    }, 
    {
        title: "Nos utilisateurs",
        path: "/users",
        icon: <PersonOutlineIcon />,
    },
    {
        title: "Message",
        path: "/message",
        icon: <AttachEmailIcon />,
    },
  
];