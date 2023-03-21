import PropTypes from 'prop-types';
import {
  Button,
  Grid,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/auth/authOperations';


export const ModalLogOut = ({modalHandler}) => {
    const { isOpen, onClose } = modalHandler;
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        onClose();
    }
    return (
    <Modal size="md" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={3}>
        <ModalCloseButton />
        <ModalHeader>Are you sure you want to log out?</ModalHeader>
        <Grid templateColumns="repeat(2, 1fr)" gap={3}>
          <Button onClick={handleLogout}>Logout</Button>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
        </Grid>
      </ModalContent>
    </Modal>
  );
};

ModalLogOut.propTypes = {
  modalHandler: PropTypes.object.isRequired,
};