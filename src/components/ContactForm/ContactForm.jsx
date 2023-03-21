import * as Yup from 'yup';

import Notiflix from 'notiflix';

import { Formik } from 'formik';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text
} from '@chakra-ui/react';
import {InputControl} from "formik-chakra-ui"; 

import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contacts/contactsOperations';
import { selectContacts } from 'redux/selectors';
import { useEffect } from 'react';

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Name is required field'),
  number: Yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8)
    .required('A phone number is required'),
});

const INITIAL_VALUES = {
  name: '',
  number: '',
};

export function ContactForm() {
        const dispatch = useDispatch();
        const contacts = useSelector(selectContacts);

        const handleSubmit = async (values, { resetForm }) => {
        try {
        const nameExists = contacts.some(
            ({ name }) => name.toLowerCase() === values.name.toLowerCase()
        );
        const numberExists = contacts.some(({ number }) => number === values.number);

        if (nameExists) {
            Notiflix.Notify.warning(`Contact ${values.name} is already in the phonebook`);
        } else if (numberExists) {
            Notiflix.Notify.warning(`Contact with number ${values.number} is already in the phonebook`);
        } else {
            dispatch(addContact(values));
            resetForm();
        }
        } catch (error) {
        console.error(error);
        }
    };

    useEffect(() => {
        if (alert) {
            return;
        }
    }, [alert]);
            
    return (
        <Box>
            <Formik initialValues={INITIAL_VALUES} validationSchema={schema} onSubmit={handleSubmit}>
                {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                    <Flex alignItems="center" justifyContent="center">
                        <Box w="xl" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
                            <Box textAlign="center">
                                <Heading>Add contact</Heading>
                            </Box>
                            <Box my={4} textAlign="left">
                                <form onSubmit={handleSubmit}>
                                    <Stack spacing={4}>
                                        <FormControl isRequired>
                                            <FormLabel htmlFor="name">Name</FormLabel>
                                            <InputGroup>
                                                <InputLeftElement pointerEvents="none" />
                                                <InputControl 
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    placeholder="Enter name..."
                                                    value={values.name}
                                                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                                                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </InputGroup>
                                            <Text fontSize="sm" color="red.500">
                                                {isSubmitting && values.name === '' && 'Name is required'}
                                            </Text>
                                        </FormControl>

                                        <FormControl isRequired>
                                            <FormLabel htmlFor="number">Number</FormLabel>
                                            <InputGroup>
                                                <InputLeftElement pointerEvents="none" />
                                                <InputControl
                                                    type="tel"
                                                    id="number"
                                                    name="number"
                                                    placeholder="Enter phone number..."
                                                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                                                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                                                    value={values.number}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <InputRightElement pointerEvents="none" />
                                            </InputGroup>
                                            <Text fontSize="sm" color="red.500">
                                                {isSubmitting && values.number === '' && 'A phone number is required'}
                                            </Text>
                                        </FormControl>

                                        <Button
                                            mt={4}
                                            colorScheme="teal"
                                            isLoading={isSubmitting}
                                            loadingText='Adding contact to phonebook'
                                            type="submit"
                                            isDisabled={!values.name || !values.number}
                                        >
                                            Add contact
                                        </Button>
                                    </Stack>
                                </form>
                            </Box>
                        </Box>
                    </Flex>)}
            </Formik>
        </Box>)
}
            