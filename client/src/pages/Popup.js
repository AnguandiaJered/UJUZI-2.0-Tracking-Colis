import React from "react";
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';

export default function Popup(props) {
    const { title,children, openPopup, setOpenPopup} = props;

    const handleClose = () => {
      setOpenPopup(false);
    };
    return (
        <Dialog open={openPopup}>
            <DialogTitle>
                <div>{title}</div>
                <button className="btn btn-danger offset-10" onClick={handleClose}>X</button>
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}