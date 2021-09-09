import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios-config';

const initialState = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    currenState: false,
    token: '',
}



export const registerTheUser = createAsyncThunk(
    'user/register',
    async (body) => {
        try {
            const response = await axios.post('/register', body);
            const data = response.data;
            return data;
        }
        catch (e) {
            console.log(e.message);
        }

    }
)

export const loginTheUser = createAsyncThunk(
    'user/login',
    async (body) => {
        try {
            const response = await axios.post('/login', body);
            const data = response.data;
            return data;
        } catch (error) {
            console.log(error.message);
        }
    }
)




const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        settingTheValue: (state, action) => {
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.email = action.payload.email;
            state.password = action.payload.password;
        }
    },
    extraReducers: {
        [registerTheUser.fulfilled]: (state, action) => {

            console.log(action.payload);
        },
        [registerTheUser.rejected]: state => {
            console.log('Rejected');
        },
        [registerTheUser.pending]: state => {
            console.log('Pending');
        },
        [loginTheUser.fulfilled]: (state, action) => {
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.currentState = true;
            state.token = action.payload.token;
        },
        [loginTheUser.rejected]: state => {
            console.log('Rejected');
        },
        [loginTheUser.pending]: state => {
            console.log('pending');
        }
    }
});

export default userSlice.reducer;