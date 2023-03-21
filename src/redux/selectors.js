import { createSelector } from "@reduxjs/toolkit";


//auth selectors

export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const selectUser = state => state.auth.user;

export const selectIsRefreshing = state => state.auth.isRefreshing;

//contacts selectors
export const selectContacts = ({contacts}) => contacts.items;

export const selectContactsAmount = createSelector(
  [selectContacts],
  contacts => contacts.length
);

export const selectIsLoading = state => state.contacts.isLoading;

export const selectError = state => state.contacts.error;


//filter selectors

export const selectFilter = ({ filter }) => filter;

export const selectFilteredContacts = createSelector([selectContacts, selectFilter], (contacts, filter) => {
    if (filter === '') {
        return contacts;
    }
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(normalizedFilter)
    );
  }
);

export const selectFilteredTotalAmount = createSelector(
  [selectFilteredContacts],
  filteredContacts => filteredContacts.length
);
