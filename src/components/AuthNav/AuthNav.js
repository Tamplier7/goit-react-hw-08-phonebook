import { Button, Flex } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

export const AuthNav = () => {
  return (
    <Flex gap={4}>
      <Button
        as={NavLink}
        to="/register" 
        fontSize="lg"
        py={5}
        borderRadius="0.5em"
        _hover={{ boxShadow: '0px 4px 18px -2px #c3d0dd' }}
      >
        Sign Up
      </Button>
      <Button
        as={NavLink}
        to="/login" 
        fontSize="lg"
        py={5}
         borderRadius="0.5em"
        _hover={{ boxShadow: '0px 4px 18px -2px #c3d0dd' }}
      >
        Sign in
      </Button>
    </Flex>
  );
};
