import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Box, Flex, Heading, Spinner } from '@chakra-ui/react';

import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "redux/contacts/contactsOperations";
import { selectContactsAmount, selectError, selectFilter, selectFilteredTotalAmount, selectIsLoading } from "redux/selectors";

import { ContactForm } from "components/ContactForm";
import {ContactList} from "components/ContactList";
import { Filter } from "components/Filter";


export default function ContactsPage() {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
    const contactsAmount = useSelector(selectContactsAmount);
    const filter = useSelector(selectFilter);  
    const filteredAmount = useSelector(selectFilteredTotalAmount);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    return (
        <Fragment>
            <Helmet>
                <title>Contacts list</title>
            </Helmet>
            <Heading as='h1' mb={5} mt={5}>
                My Contacts Profile
            </Heading>
            <ContactForm />
            <Box>
            <Filter />
            <Flex alignItems='center' justifyContent='center' mb={2}>
            {isLoading && <Spinner color="gray.300" mb={2} />}
            </Flex>
            {error && <Flex alignItems='center' justifyContent='center' color="red">{error}</Flex>}
            {contactsAmount > 0 ? <ContactList />
            : <Flex alignItems='center' justifyContent='center' color="red">Contacts list is empty</Flex>}
            {filter.length !== 0 && filteredAmount === 0 && <Flex alignItems='center' justifyContent='center' color="red">Contact not found. Please try again or add a new one</Flex> }
            </Box>
        </Fragment>
    )
}