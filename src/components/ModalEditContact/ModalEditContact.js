import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';

import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { AiOutlineUser, AiOutlinePhone } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { updateContact } from 'redux/contacts/contactsOperations';
import { useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';


const modalRoot = document.querySelector('#modal-root');

export const ModalEditContact = ({contact, modalHandler}) => {
    const dispatch = useDispatch();
    const { id, name, number } = contact;
    const { isOpen, onClose } = modalHandler;

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            name,
            number,
        },
    });
  
    const contacts = useSelector(selectContacts);

    const onSubmit = data => {

        const isNameUnique = contacts.every(
          ({ id: contactId, name: contactName }) =>
            contactName.toLowerCase() !== data.name.toLowerCase() ||
            contactId === id
        );

        const isNumberUnique = contacts.every(
          ({ id: contactId, number: contactNumber }) =>
            contactNumber !== data.number || contactId === id
        );

        if (!isNameUnique) {
          Notiflix.Notify.failure('This name already exists in your phonebook');
          return;
        }

        if (!isNumberUnique) {
          Notiflix.Notify.failure('This number already exists in your phonebook');
          return;
        }

        dispatch(updateContact({ id, data }));
        reset();
        onClose();
  }
  
  const handleConfirmClose = () => {
    const shouldClose = window.confirm('Are you sure you want to discard changes?');

    if (shouldClose) {
      onClose();
    }
  };
  
    return createPortal(
    <Modal size="md" isOpen={isOpen} onClose={handleConfirmClose} >
      <ModalOverlay />
      <ModalContent p={3}>
        <ModalCloseButton zIndex="docked" onClick={onClose}/>
        <Stack as="form" gap={3} onSubmit={handleSubmit(onSubmit)}>
          <Box pos="relative">
            <FormLabel>
              Name
              <InputGroup mt={3}>
                <Input
                  {...register('name', {
                    required: 'Name is required',
                    pattern: {
                      value:
                        /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
                      message:
                        'Name may contains only letters, apostrophe, dash and spaces.',
                    },
                  })}
                  type="text"
                />
                <InputLeftElement pointerEvents="none">
                    <AiOutlineUser color="gray.300" />
                </InputLeftElement>
              </InputGroup>
            </FormLabel>
            <Box position="absolute" top="95%">
              {errors?.name && (
                <Text
                  fontSize="xs"
                  color="#ff001b"
                  textShadow="rgb(0 0 0 / 25%) 0px 2px 2px"
                >
                  {errors?.name?.message || 'Error'}
                </Text>
              )}
            </Box>
          </Box>
          <Box pos="relative">
            <FormLabel>
              Number
              <InputGroup mt={3}>
                <Input
                  {...register('number', {
                    required: 'Number is required',
                    pattern:
                      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
                    message:
                      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
                  })}
                  type="tel"
                />
                <InputLeftElement pointerEvents="none" transform="rotate(-90deg) scale(-1)">
                  <AiOutlinePhone color="gray.300" />
                </InputLeftElement>
              </InputGroup>
            </FormLabel>

            <Box position="absolute" top="95%">
              {errors?.number && (
                <Text
                  fontSize="xs"
                  color="#ff001b"
                  textShadow="rgb(0 0 0 / 25%) 0px 2px 2px"
                >
                  {errors?.number?.message || 'Error'}
                </Text>
              )}
            </Box>
          </Box>
          <Button type="submit">Save</Button>
        </Stack>
      </ModalContent>
    </Modal>,
    modalRoot
  );
};

ModalEditContact.propTypes = {
  contact: PropTypes.object.isRequired,
  modalHandler: PropTypes.object.isRequired,
};