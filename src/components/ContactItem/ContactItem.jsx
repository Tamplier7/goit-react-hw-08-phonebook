import PropTypes from 'prop-types';
import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

import { ModalEditContact } from 'components/ModalEditContact';
import { ModalDeleteContact } from 'components/ModalDeleteContact';

export const ContactItem = ({ contact }) => {
    const { name, number } = contact;
  const editModalHandler = useDisclosure();
  const deleteModalHandler = useDisclosure();

    return (
        <Flex
        as="li"
        justify="space-between"
        align="center"
        w='100%'
        maxW='xl'
        gap={6}
        px={8}
        py={3}
        borderRadius="16px"
        boxShadow="0px 4px 18px -2px #c3d0dd"
      >
        <Box>
          <Text fontSize="18px" fontWeight="600">
            {name}
          </Text>
          <Text>{number}</Text>
        </Box>
        <Flex gap={3}>
          <Button
            size="sm"
            borderRadius="70% 30% 56% 44% / 44% 61% 39% 56%"
            onClick={deleteModalHandler.onOpen}
          >
            <AiOutlineDelete />
          </Button>
          <Button
            size="sm"
            borderRadius="28% 72% 52% 48% / 44% 53% 47% 56%"
            onClick={editModalHandler.onOpen}
          >
            <AiOutlineEdit />
          </Button>
        </Flex>
      {editModalHandler.isOpen && (
        <ModalEditContact contact={contact} modalHandler={editModalHandler} />
      )}
      {deleteModalHandler.isOpen && (
          <ModalDeleteContact contact={contact} modalHandler={deleteModalHandler} />)}
        </Flex>
)
}

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};