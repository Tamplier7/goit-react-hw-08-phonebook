import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, updateContact, deleteContact } from './contactsOperations';

const initialState = {
    items: [],
    isLoading: false,
    error: null,
    currentContact: {},
};

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(fetchContacts.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchContacts.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.items = payload;
                state.error = null;
            })
            .addCase(fetchContacts.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(addContact.pending, state => {
                state.isLoading = true;
            })
            .addCase(addContact.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
                state.items.push(payload);
            })
            .addCase(addContact.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(deleteContact.pending, state => {
                state.isLoading = true;
            })
            .addCase(deleteContact.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
                const index = state.items.findIndex(item => item.id === payload.id);
                state.items.splice(index, 1);
            })
            .addCase(deleteContact.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(updateContact.pending, state => {
                state.isLoading = true;
            })
            .addCase(updateContact.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
                const index = state.items.findIndex(item => item.id === payload.id);
                state.items.splice(index, 1, payload);
                })
            .addCase(updateContact.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            });
    },
});

export default contactsSlice.reducer;