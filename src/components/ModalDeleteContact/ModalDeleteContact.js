import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteContact } from 'redux/contacts/contactsOperations';

import {
  Button,
  Grid,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

const modalRoot = document.querySelector('#modal-root');

export const ModalDeleteContact = ({ contact, modalHandler }) => {
  const dispatch = useDispatch();
  const { id, name } = contact;
  const { isOpen, onClose } = modalHandler;

  return createPortal(
    <Modal size="md" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={3}>
        <ModalCloseButton zIndex="docked" />
        <ModalHeader>
          Are you sure to delete <b> {name}</b>?
        </ModalHeader>
        <Grid templateColumns="repeat(2, 1fr)" gap={3}>
          <Button onClick={() => dispatch(deleteContact(id))}>Delete</Button>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
        </Grid>
      </ModalContent>
    </Modal>,
    modalRoot
  );
};

ModalDeleteContact.propTypes = {
  contact: PropTypes.object.isRequired,
  modalHandler: PropTypes.object.isRequired,
};