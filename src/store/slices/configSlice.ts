//cofig for toast
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    toast: {
        open: false,
        message: '',
        severity: ''
    }
}

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setToast: (state, action: PayloadAction<{open: boolean, message: string, severity: 'success' | 'error' | 'warning' | 'info'}>) => {
            state.toast = action.payload;
        },
        resetToast: (state) => {
            state.toast = initialState.toast;
        }
    }
})

export const { setToast, resetToast } = configSlice.actions;
export default configSlice.reducer;