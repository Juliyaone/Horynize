import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: undefined,
};

export const contactsSlice = createSlice({
  name: 'contactsSlice',
  initialState,
  reducers: {
    setContacts: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.info = action.payload
    },
  },
});

export const {
  setContacts,
} = contactsSlice.actions;
