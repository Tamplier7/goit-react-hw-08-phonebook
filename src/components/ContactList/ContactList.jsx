import { useSelector } from 'react-redux';
import { Flex,  } from '@chakra-ui/react';
import { selectFilteredContacts } from 'redux/selectors';
import { ContactItem } from 'components/ContactItem';

export const ContactList = () => {
  const filtered = useSelector(selectFilteredContacts);  
  const sortedContacts = [...filtered].sort((a, b) =>
    a.name.localeCompare(b.name)
  );


  return (
      <Flex as="ul" direction="column" gap={4} alignItems='center' justifyContent='center'>
        {sortedContacts?.map(contact => (
          <ContactItem key={contact.id} contact={contact}></ContactItem>
        ))}
      </Flex>
  );
};

