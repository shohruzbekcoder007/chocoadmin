import React, { useState } from 'react';
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const anchorOrigin1 = {
  vertical: 'top',
  horizontal: "right"
}

const anchorOrigin2 = {
  vertical: 'top',
  horizontal: "left"
}

export default function AlertMessage({alertMessage, _openAlert, type}){
    const [openAlert, setOpenAlert] = useState(_openAlert)
    const handleCloseAlert = () => setOpenAlert(false);
    return (
        <Snackbar open={openAlert} anchorOrigin={type ? anchorOrigin1 : anchorOrigin2} autoHideDuration={6000} onClose={handleCloseAlert} style={{top: "75px", right: "5px", maxWidth: "300px"}}>
            <Alert onClose={handleCloseAlert} severity={type == "success" ? "success" : "error"} sx={{ width: '100%', zIndex: 1000 }}>
                {alertMessage}
            </Alert>
        </Snackbar>
    )
}