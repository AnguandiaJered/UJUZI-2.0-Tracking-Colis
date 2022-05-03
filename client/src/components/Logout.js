import React,{ Fragment } from 'react';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from 'react-router-dom';
import Jered from '../images/Jered.JPG';


export const Logout = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Link to='#' variant="outlined" className='ml-2' onClick={handleClickOpen}>
        <i className="fa fa-sign-out"></i>
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className='text-center log'>
            <img className="rounded-circle" src={Jered} width={150} height={150} alt="" />
        </DialogTitle>
        <DialogContent  className="log">
          <DialogContentText className='text-center' id="alert-dialog-description">
            <h3 className='text-white'>
                <i className='fa fa-sign-out text-green'></i> Ready to go?
            </h3>
            <p className='text-white'>Select "Logout" below if you are ready<br/> to end your current session.</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions  className="log">
          <Link to='/login' className='btn btn-success mr-2' onClick={handleClose}>Logout</Link>
          <Link className='btn btn-success mr-5' to='/' onClick={handleClose} autoFocus>
            Cancel
          </Link>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}