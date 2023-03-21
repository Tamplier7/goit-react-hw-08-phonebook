import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import Notiflix from 'notiflix';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const setToken = token => {
  if (token) {
    return (axios.defaults.headers.common.authorization = `Bearer ${token}`);
  }
  axios.defaults.headers.common.authorization = '';
};

export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/signup', credentials);
      setToken(response.data.token);
      return response.data;
    } catch (error) {
      const { code } = error.response.data;
      if (code === 11000) {
        Notiflix.Notify.failure('User with this email already exists.');
        return thunkAPI.rejectWithValue({
          message: 'User with this email already exists.',
        });
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/login', credentials);
      setToken(response.data.token);
      return response.data;
    } catch (error) {
      Notiflix.Notify.failure('Invalid email or password');
      return thunkAPI.rejectWithValue({ message: 'Email or password is incorrect.' });
    }
  }
);


export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await axios.post('/users/logout');
      setToken();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const current = createAsyncThunk(
  'auth/current',
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const currentToken = state.auth.token;

    if (currentToken === null) return rejectWithValue('Unable to fetch user')

    try {
      setToken(currentToken);
      const response = await axios.get('/users/current');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

