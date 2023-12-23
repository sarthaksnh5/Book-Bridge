import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  name: '',
  token: '',
  id: '',
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = action['payload'];
      return state;
    },
    userLogout: state => {
      return {name: '', token: '', id: '', isLoggedIn: false};
    },
  },
});

export const {setUser, userLogout} = userSlice.actions;
export const getUser = state => state;
export default userSlice.reducer;
