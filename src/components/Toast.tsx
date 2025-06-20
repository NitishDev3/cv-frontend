// TODO: add a toast component

import { Snackbar, Alert } from '@mui/material';
import type { AlertColor } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetToast } from '../store/slices/configSlice';
import type { AppDispatch, RootState } from '../store/index';


const Toast : React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const toast = useSelector((state: RootState) => state.config.toast);

    useEffect(() => {
        if(toast.open){
            setTimeout(() => {
                dispatch(resetToast());
            }, 3000);
        }
    }, [toast.open]);


  
    return (
        <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={() => dispatch(resetToast())}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Recommended
      >
        <Alert
          onClose={() => dispatch(resetToast())}
          severity={toast.severity as AlertColor}
          sx={{
            width: 'fit-content',
            zIndex: 10000,
            mx: 'auto', // horizontal margin auto
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>      
  );
};


export default Toast;