import {createSlice, current} from '@reduxjs/toolkit';
const initialState = {
    currentUser: null,
    error   : null,
    loading : false,
};
const userSlice = createSlice({
    name :'user',
    initialState,
    reducers :{
        signInstart : (state)=>{
            state.loading = true;
        },
        signInsuccess : (state, action)=>
            {
                state.loading = false;
                state.currentUser = action.payload;
                state.error = null;
            },
        signInfailure : (state, action)=>
            {
                state.loading = false;
                state.error = action.payload;
            },
      
    }
});

export const {signInstart, signInsuccess, signInfailure} = userSlice.actions;
export default userSlice.reducer;
